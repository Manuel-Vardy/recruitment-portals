document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Adjust for fixed navbar height
                const navbarElement = document.getElementById('navbar');
                const navbarHeight = navbarElement ? navbarElement.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const faders = document.querySelectorAll('.fade-in-section');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Navbar background change on scroll
    const navbarElement = document.getElementById('navbar');
    if (navbarElement) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbarElement.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                navbarElement.classList.add('scrolled');
            } else {
                navbarElement.style.boxShadow = 'none';
                navbarElement.classList.remove('scrolled');
            }
        });
    }

    // Deprived Districts Logic
    const deprivedData = {
        "AHAFO": {
            display: "Ahafo",
            districts: ["ASUNAFO SOUTH", "ASUTIFI SOUTH", "ASUTIFI NORTH", "ASUNAFO NORTH", "TANO SOUTH", "TANO NORTH"]
        },
        "BONO": {
            display: "Bono",
            districts: ["Tain District", "Banda District", "Dormaa West District", "Brekum West District", "Jaman North District"]
        },
        "ASHANTI": {
            display: "Ashanti",
            districts: ["ADANSI SOUTH", "ADANSI ASOKWA", "ADANSI NORTH", "AFIGYA KWABRE", "AFIGYA KWABRE NORTH", "AHAFO ANO NORTH", "AHAFO ANO SOUTH EAST", "AHAFO ANO SOUTH WEST", "AKROFUOM", "AMANSIE CENTRAL", "AMANSIE SOUTH", "AMANSIE WEST", "ASANTE AKIM NORTH", "ASANTE AKIM SOUTH", "ATWIMA MPONUA", "ATWIMA NWABIAGYA NORTH", "BEKWAI MUNICIPAL", "BOSOME FREHO", "BOSOMTWE", "EJURA-SEKYEDUMASE", "OFFINSO NORTH", "SEKYERE AFRAM PLAINS", "SEKYERE CENTRAL", "SEKYERE KUMAWU", "JUABEN MUNICIPAL"]
        },
        "SAVANNAH": {
            display: "Savannah",
            districts: ["Bole", "Central Gonja", "East Gonja", "North East Gonja", "North Gonja", "Sawla-Tuna-Kalba", "West Gonja"]
        },
        "NORTHERN": {
            display: "Northern",
            districts: ["GUSHEGU", "KARAGA", "KPANDAI", "KUMBUNGU", "MION", "NANTON", "NANUMBA NORTH", "NANUMBA SOUTH", "SABOBA", "SAVELUGU", "TATALE", "TOLON", "YENDI", "ZABZUGU"]
        },
        "EASTERN": {
            display: "Eastern",
            districts: ["KWAHU AFRAM PLAINS SOUTH", "KWAHU AFRAM PLAINS NORTH", "UPPER MANYA KROBO", "AYENSUANO", "FANTEAKWA NORTH", "ACHIASE", "AKYEMANSA"]
        },
        "GREATER ACCRA": {
            display: "Greater Accra",
            districts: ["ADA EAST", "ADA WEST", "NINGO PRAMPRAM", "SHAI OSUDOKU", "GA SOUTH", "GA WEST"]
        },
        "UPPER WEST": {
            display: "Upper West",
            districts: ["WA EAST", "WA WEST", "NADOWLI KALEO", "DAFFIAMA-BUSSIE-ISSA", "LAMBUSSIE", "NANDOM MUNICIPAL", "LAWRA MUNICIPAL", "JIRAPA MUNICIPAL", "SISSALA EAST MUNICIPAL", "SISSALA WEST"]
        },
        "UPPER EAST": {
            display: "Upper East",
            districts: ["PUSIGA DISTRICT", "BINDURI DISTRICT", "BAWKU MUNICIPALITY", "BUILSA SOUTH DISTRICT", "TALENSI DISTRICT", "GARU DISTRICT", "BONGO DISTRICT", "TEMPANE DISTRICT", "KASSENA- NANKANA WEST DISTRICT", "BAWKU WEST DISTRICT", "BUILSA NORTH MUNICIPALITY", "NABDAM DISTRICT", "BOLGATANGA EAST DISTRICT", "KASSENA- NANKANA MUNICIPALITY"]
        },
        "OTI": {
            display: "Oti",
            districts: ["BIAKOYE", "GUAN", "JASIKAN", "KADJEBI", "KRACHI EAST", "KRACHI NCHUMURU", "KRACHI WEST", "NKWANTA NORTH", "NKWANTA SOUTH"]
        },
        "VOLTA": {
            display: "Volta",
            districts: ["ADAKLU", "AFADZATO SOUTH", "CENTRAL TONGU", "HO WEST", "SOUTH DAYI", "ANLOGA", "AGOTIME-ZIOPE", "NORTH DAYI", "NORTH TONGU", "KETU NORTH"]
        },
        "NORTH EAST": {
            display: "North East",
            districts: ["West Mamprusi", "East Mamprusi", "Bunkpurugu Nyanpanduri", "Mamprugu Moaduri", "Yunyoo-Nasuan", "Chereponi"]
        },
        "CENTRAL": {
            display: "Central",
            districts: ["Upper Denkyira West", "Abura Asebu Kwamankese", "Asikuma Odoben Brakwa", "Twifo Hemang Lower Denkyira", "Upper Denkyira East", "Assin South", "Assin North", "Ekumfi", "Twifo Atti-Morkwa", "Ajumako Enyan Essiam", "Agona East", "Awutu Senya", "Gomoa West", "Gomoa Central"]
        },
        "WESTERN": {
            display: "Western",
            districts: ["WASA AMENFI EAST", "WASA AMENFI WEST", "WASA AMENFI CENTRAL", "WASSA WEST", "PRESTEA HUNI-VALLEY", "JOMORO", "NZEMA EAST", "ELLEMBELLE", "MPOHOR-FIASE"]
        },
        "WESTERN NORTH": {
            display: "Western North",
            districts: ["AOWIN", "BIA EAST", "BIA WEST", "BIBIANI-ANHWIASO-BEKWAI", "BODI", "JUABOSO", "SEFWI AKONTOMBRA", "SEFWI WIAWSO", "SUAMAN"]
        },
        "BONO EAST": {
            display: "Bono East",
            districts: ["TECHIMAN NORTH", "KINTAMPO SOUTH", "NKORANZA NORTH", "PRU EAST", "PRU WEST", "SENE EAST", "SENE WEST"]
        }
    };

    // Deprived Districts Logic - Support Multiple Instances
    const toolContainers = document.querySelectorAll('.deprived-districts-tool');

    toolContainers.forEach(container => {
        const regionSelect = container.querySelector('.region-select');
        const districtsDisplay = container.querySelector('.districts-display');
        const districtsList = container.querySelector('.districts-list');
        const selectedRegionName = container.querySelector('.selected-region-name');

        if (regionSelect && districtsDisplay && districtsList && selectedRegionName) {
            // Populate select options
            Object.keys(deprivedData).forEach(key => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = deprivedData[key].display;
                regionSelect.appendChild(option);
            });

            regionSelect.addEventListener('change', (e) => {
                const regionKey = e.target.value;
                const data = deprivedData[regionKey];

                if (data) {
                    // Update text
                    selectedRegionName.textContent = data.display + " Region Districts";

                    // Clear and populate list with simple layout
                    districtsList.innerHTML = data.districts.map((district) => `
                        <li class="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                            <svg class="flex-shrink-0 w-4 h-4 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span class="text-gray-700 font-medium">${district}</span>
                        </li>
                    `).join('');

                    // Show
                    districtsDisplay.classList.remove('hidden');
                    districtsDisplay.style.opacity = '1';
                    districtsDisplay.style.transform = 'none';
                }
            });
        }
    });

    // How to Check Result Modal Logic
    const openModalBtn = document.getElementById('open-result-modal-btn');
    const closeModalBtn = document.getElementById('close-result-modal-btn');
    const closeModalFooterBtn = document.getElementById('close-result-modal-footer-btn');
    const modalBackdrop = document.getElementById('result-modal-backdrop');
    const resultModal = document.getElementById('result-modal');
    const modalContainer = document.getElementById('result-modal-container');

    function openModal() {
        if (resultModal && modalContainer) {
            resultModal.classList.remove('opacity-0', 'pointer-events-none');
            resultModal.classList.add('opacity-100', 'pointer-events-auto');
            modalContainer.classList.remove('scale-95');
            modalContainer.classList.add('scale-100');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (resultModal && modalContainer) {
            resultModal.classList.remove('opacity-100', 'pointer-events-auto');
            resultModal.classList.add('opacity-0', 'pointer-events-none');
            modalContainer.classList.remove('scale-100');
            modalContainer.classList.add('scale-95');
            document.body.style.overflow = '';
        }
    }

    const navbarCheckResultBtn = document.getElementById('navbar-check-result-btn');
    const mobileCheckResultBtn = document.getElementById('mobile-check-result-btn');
    const heroMobileCheckResultBtn = document.getElementById('hero-mobile-check-result-btn');

    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }
    // Green 'Check Results' buttons intentionally do nothing on click
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    if (closeModalFooterBtn) {
        closeModalFooterBtn.addEventListener('click', closeModal);
    }
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resultModal && !resultModal.classList.contains('opacity-0')) {
            closeModal();
        }
    });
});
