// Initialize Lucide icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card');
    const modal = document.getElementById('service-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalIconWrapper = document.querySelector('.modal-icon-wrapper');
    const modalDescription = document.getElementById('modal-description');
    const serviceForm = document.getElementById('service-form');

    // Stepper elements
    const steps = document.querySelectorAll('.form-step');
    const stepperItems = document.querySelectorAll('.step-item');
    const btnNext = document.querySelector('.btn-next');
    const btnBack = document.querySelector('.btn-back');

    // Upload elements
    const uploadZone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');

    // New features elements
    const themeToggle = document.getElementById('theme-toggle');
    const serviceSearch = document.getElementById('service-search');
    const trackBtn = document.getElementById('track-btn');
    const trackInput = document.getElementById('track-input');
    const trackerResult = document.getElementById('tracker-result');

    // Service data
    const serviceDetails = {
        'schedule-tribe': { description: 'Apply for Schedule Tribe certificates and related welfare schemes.', icon: 'file-text', color: 'icon-orange' },
        'voter-card': { description: 'Update your voter info or apply for a new Voter ID card.', icon: 'contact-2', color: 'icon-gray' },
        'pan-card': { description: 'Instant PAN card applications and corrections.', icon: 'credit-card', color: 'icon-blue' },
        'ration-card': { description: 'Manage your Ration Card details or apply for a new one.', icon: 'utensils', color: 'icon-red' },
        'driving-licence': { description: 'Book your slot or apply for a Driving Licence.', icon: 'car', color: 'icon-red-alt' },
        'passport': { description: 'Simplifying the passport application process.', icon: 'user-square', color: 'icon-blue-alt' },
        'pf-service': { description: 'Check your PF balance or apply for withdrawals.', icon: 'landmark', color: 'icon-purple' },
        'gas-booking': { description: 'Book your LPG cylinder refills from home.', icon: 'flame', color: 'icon-orange-alt' },
        'shopping': { description: 'Access exclusive digital shopping deals.', icon: 'shopping-cart', color: 'icon-gray' },
        'net-banking': { description: 'Securely access your banking portals.', icon: 'globe', color: 'icon-blue-light' },
        'recharge': { description: 'Instant mobile, DTH and utility recharges.', icon: 'smartphone', color: 'icon-indigo' }
    };

    function resetModal() {
        steps.forEach(s => s.classList.remove('active'));
        stepperItems.forEach(s => s.classList.remove('active'));
        steps[0].classList.add('active');
        stepperItems[0].classList.add('active');
        serviceForm.reset();
        fileList.innerHTML = '';
        const submitBtn = serviceForm.querySelector('.submit-btn');
        submitBtn.textContent = 'Submit Application';
        submitBtn.disabled = false;
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceId = card.getAttribute('data-service');
            
            // Redirect to specialized pages
            if (serviceId === 'pan-card') {
                window.location.href = 'pan_card.html';
                return;
            }

            const data = serviceDetails[serviceId];
            if (data) {
                resetModal();
                modalTitle.textContent = card.querySelector('h3').textContent;
                modalDescription.textContent = data.description;
                modalIconWrapper.innerHTML = `<i data-lucide="${data.icon}" class="${data.color}"></i>`;
                lucide.createIcons();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Navigation logic
    btnNext.addEventListener('click', () => {
        const name = document.getElementById('full-name').value;
        const contact = document.getElementById('contact').value;

        if (!name || !contact) {
            alert('Please fill in all personal details first.');
            return;
        }

        steps[0].classList.remove('active');
        steps[1].classList.add('active');
        stepperItems[1].classList.add('active');
    });

    btnBack.addEventListener('click', () => {
        steps[1].classList.remove('active');
        steps[0].classList.add('active');
        stepperItems[1].classList.remove('active');
    });

    // File Upload logic
    uploadZone.addEventListener('click', () => fileInput.click());

    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            const item = document.createElement('div');
            item.className = 'file-item';
            item.innerHTML = `
                <span>${file.name}</span>
                <i data-lucide="check-circle-2" style="color: #10b981; width: 16px;"></i>
            `;
            fileList.appendChild(item);
        });
        lucide.createIcons();
    }

    serviceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (fileList.children.length === 0) {
            alert('Please upload at least one document.');
            return;
        }

        const submitBtn = serviceForm.querySelector('.submit-btn');
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Great! Your application and documents have been received.');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }, 1500);
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Theme Toggle Logic
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.setAttribute('data-lucide', 'sun');
        } else {
            icon.setAttribute('data-lucide', 'moon');
        }
        lucide.createIcons();
    });

    // Search Logic
    serviceSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            if (title.includes(term)) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Tracking Logic
    trackBtn.addEventListener('click', () => {
        const ref = trackInput.value.trim();
        if (!ref) {
            alert('Please enter a reference number.');
            return;
        }

        trackerResult.style.display = 'block';
        trackerResult.style.background = '#f1f5f9';
        trackerResult.innerHTML = '<p>Searching...</p>';

        if (document.body.classList.contains('dark-mode')) {
            trackerResult.style.background = '#334155';
        }

        setTimeout(() => {
            const statuses = [
                { status: 'In Progress', color: '#f59e0b', msg: 'Documents are being verified by the department.' },
                { status: 'Approved', color: '#10b981', msg: 'Your application has been approved. Certificate will be sent shortly.' },
                { status: 'Pending Info', color: '#ef4444', msg: 'Additional documents required. Please contact support.' }
            ];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

            trackerResult.innerHTML = `
                <div style="font-weight: 700; color: ${randomStatus.color};">${randomStatus.status}</div>
                <div style="font-size: 0.85rem; margin-top: 5px;">${randomStatus.msg}</div>
            `;
        }, 1500);
    });

    // Animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s`;
        observer.observe(card);
    });
});
