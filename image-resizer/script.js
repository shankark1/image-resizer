document.addEventListener('DOMContentLoaded', () => {
    const uploadZone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('file-input');
    const uploadContent = document.querySelector('.upload-content');
    const previewImage = document.getElementById('preview-image');
    
    const controlsSection = document.getElementById('controls-section');
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const lockAspectBtn = document.getElementById('lock-aspect');
    
    const chips = document.querySelectorAll('.chip');
    const downloadBtn = document.getElementById('download-btn');
    const resetBtn = document.getElementById('reset-btn');

    let originalImage = null;
    let aspectRatio = 1;
    let isAspectLocked = true;
    let currentFile = null;

    // Toggle Aspect Ratio Lock
    lockAspectBtn.classList.add('active'); // Default active
    lockAspectBtn.addEventListener('click', () => {
        isAspectLocked = !isAspectLocked;
        lockAspectBtn.classList.toggle('active', isAspectLocked);
        if (isAspectLocked) {
            lockAspectBtn.innerHTML = '<i class="ph ph-link"></i>';
            if (widthInput.value) {
                heightInput.value = Math.round(widthInput.value / aspectRatio);
            }
        } else {
            lockAspectBtn.innerHTML = '<i class="ph ph-link-break"></i>';
        }
    });

    // Upload Zone Click
    uploadZone.addEventListener('click', () => {
        if (!originalImage) {
            fileInput.click();
        }
    });

    // Drag and Drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });

    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }

        currentFile = file;
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                originalImage = img;
                aspectRatio = img.width / img.height;
                
                // Show preview
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                uploadContent.style.display = 'none';
                
                // Set initial dimensions
                widthInput.value = img.width;
                heightInput.value = img.height;
                
                // Show controls
                controlsSection.style.display = 'block';
                uploadZone.style.padding = '10px';
                uploadZone.style.borderStyle = 'solid';
                uploadZone.style.cursor = 'default';
            };
            img.src = e.target.result;
        };
        
        reader.readAsDataURL(file);
    }

    // Input changes
    widthInput.addEventListener('input', () => {
        if (isAspectLocked && widthInput.value) {
            heightInput.value = Math.round(widthInput.value / aspectRatio);
        }
    });

    heightInput.addEventListener('input', () => {
        if (isAspectLocked && heightInput.value) {
            widthInput.value = Math.round(heightInput.value * aspectRatio);
        }
    });

    // Quick Sizes
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            if (!originalImage) return;
            const w = parseInt(chip.dataset.width);
            const h = parseInt(chip.dataset.height);
            
            widthInput.value = w;
            heightInput.value = h;
            
            // If they select a quick size, we might want to turn off aspect lock if it doesn't match
            // or we just temporarily disable it visually
            const targetRatio = w / h;
            if (Math.abs(targetRatio - aspectRatio) > 0.01) {
                isAspectLocked = false;
                lockAspectBtn.classList.remove('active');
                lockAspectBtn.innerHTML = '<i class="ph ph-link-break"></i>';
            }
        });
    });

    // Download
    downloadBtn.addEventListener('click', () => {
        if (!originalImage) return;

        const targetWidth = parseInt(widthInput.value) || originalImage.width;
        const targetHeight = parseInt(heightInput.value) || originalImage.height;

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        
        const ctx = canvas.getContext('2d');
        // Optional: you can add logic here for object-fit: cover if aspect ratio is changed
        ctx.drawImage(originalImage, 0, 0, targetWidth, targetHeight);

        // Get extension from original file
        let ext = currentFile.name.split('.').pop().toLowerCase();
        let mimeType = currentFile.type;
        
        if (ext === 'jpg') ext = 'jpeg';
        if (!['jpeg', 'png', 'webp'].includes(ext)) {
            mimeType = 'image/png';
            ext = 'png';
        }

        const dataUrl = canvas.toDataURL(mimeType, 0.9);
        
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `resized-${targetWidth}x${targetHeight}-${currentFile.name}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    // Reset
    resetBtn.addEventListener('click', () => {
        originalImage = null;
        currentFile = null;
        
        previewImage.src = '';
        previewImage.style.display = 'none';
        uploadContent.style.display = 'flex';
        controlsSection.style.display = 'none';
        
        uploadZone.style.padding = '40px 20px';
        uploadZone.style.borderStyle = 'dashed';
        uploadZone.style.cursor = 'pointer';
        
        widthInput.value = '';
        heightInput.value = '';
        fileInput.value = '';
        
        // Reset lock aspect ratio
        isAspectLocked = true;
        lockAspectBtn.classList.add('active');
        lockAspectBtn.innerHTML = '<i class="ph ph-link"></i>';
    });
});
