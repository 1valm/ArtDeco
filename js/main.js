let currentLanguage = 'ru';

function switchLanguage() {
    currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    document.documentElement.lang = currentLanguage;
    const langBtn = document.getElementById('langSwitcher');
    if (langBtn) langBtn.textContent = currentLanguage === 'ru' ? 'EN' : 'RU';

    document.querySelectorAll('[data-ru][data-en]').forEach(el => {
        const text = currentLanguage === 'ru' ? el.getAttribute('data-ru') : el.getAttribute('data-en');
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = text;
            else el.textContent = text;
        }
    });

    const navTexts = { 'index.html': { ru: 'Главная', en: 'Home' }, 'about.html': { ru: 'О компании', en: 'About' }, 'catalog.html': { ru: 'Каталог', en: 'Catalog' }, 'actions.html': { ru: 'Акции', en: 'Promotions' } };
    document.querySelectorAll('.nav a').forEach(link => {
        const href = link.getAttribute('href');
        for (const [page, texts] of Object.entries(navTexts)) {
            if (href && href.includes(page)) { link.textContent = currentLanguage === 'ru' ? texts.ru : texts.en; break; }
        }
    });
    localStorage.setItem('language', currentLanguage);
}

function initLanguage() {
    const savedLang = localStorage.getItem('language');
    if (savedLang && (savedLang === 'ru' || savedLang === 'en')) currentLanguage = savedLang;
    document.documentElement.lang = currentLanguage;
    const langBtn = document.getElementById('langSwitcher');
    if (langBtn) {
        langBtn.textContent = currentLanguage === 'ru' ? 'EN' : 'RU';
        langBtn.addEventListener('click', switchLanguage);
    }
    document.querySelectorAll('[data-ru][data-en]').forEach(el => {
        const text = currentLanguage === 'ru' ? el.getAttribute('data-ru') : el.getAttribute('data-en');
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = text;
            else el.textContent = text;
        }
    });
    const navTexts = { 'index.html': { ru: 'Главная', en: 'Home' }, 'about.html': { ru: 'О компании', en: 'About' }, 'catalog.html': { ru: 'Каталог', en: 'Catalog' }, 'actions.html': { ru: 'Акции', en: 'Promotions' } };
    document.querySelectorAll('.nav a').forEach(link => {
        const href = link.getAttribute('href');
        for (const [page, texts] of Object.entries(navTexts)) {
            if (href && href.includes(page)) { link.textContent = currentLanguage === 'ru' ? texts.ru : texts.en; break; }
        }
    });
}

const modalHTML = `<div id="consultModal" class="modal"><div class="modal-content"><span class="modal-close">&times;</span><div id="modal-body"><h2 data-ru="Запись на онлайн-консультацию" data-en="Online Consultation Booking">Запись на онлайн-консультацию</h2><form id="consultForm"><div class="form-group"><label data-ru="Ваше имя *" data-en="Your name *">Ваше имя *</label><input type="text" id="modalName" placeholder="Иван Иванов"><span class="error-message" id="nameError"></span></div><div class="form-group"><label data-ru="Ваш email *" data-en="Your email *">Ваш email *</label><input type="email" id="modalEmail" placeholder="ivan@example.com"><span class="error-message" id="emailError"></span></div><div class="form-group"><label data-ru="Ваш телефон *" data-en="Your phone *">Ваш телефон *</label><input type="tel" id="modalPhone" placeholder="+7 999 123-45-67"><span class="error-message" id="phoneError"></span></div><button type="submit" class="modal-btn" data-ru="Отправить заявку" data-en="Submit request">Отправить заявку</button></form></div></div></div>`;
document.body.insertAdjacentHTML('beforeend', modalHTML);

const modal = document.getElementById('consultModal');
const closeBtn = document.querySelector('.modal-close');
let currentLangForModal = 'ru';

function showSuccessMessage(name) {
    const thanksText = currentLangForModal === 'en' ? `Thank you, ${name}!` : `Спасибо, ${name}!`;
    const acceptedText = currentLangForModal === 'en' ? 'Your request has been accepted. We will contact you soon.' : 'Ваша заявка принята. Мы свяжемся с вами в ближайшее время.';
    document.getElementById('modal-body').innerHTML = `<div class="success-message"><i class="fas fa-check-circle"></i><h2>${thanksText}</h2><p>${acceptedText}</p><button class="modal-btn close-success-btn">${currentLangForModal === 'en' ? 'Close' : 'Закрыть'}</button></div>`;
    document.querySelector('.close-success-btn').addEventListener('click', () => { closeModal(); resetModalToForm(); });
}

function resetModalToForm() {
    currentLangForModal = document.documentElement.lang || 'ru';
    const titleText = currentLangForModal === 'en' ? 'Online Consultation Booking' : 'Запись на онлайн-консультацию';
    document.getElementById('modal-body').innerHTML = `<h2>${titleText}</h2><form id="consultForm"><div class="form-group"><label>${currentLangForModal === 'en' ? 'Your name *' : 'Ваше имя *'}</label><input type="text" id="modalName" placeholder="${currentLangForModal === 'en' ? 'Ivan Ivanov' : 'Иван Иванов'}"><span class="error-message" id="nameError"></span></div><div class="form-group"><label>${currentLangForModal === 'en' ? 'Your email *' : 'Ваш email *'}</label><input type="email" id="modalEmail" placeholder="ivan@example.com"><span class="error-message" id="emailError"></span></div><div class="form-group"><label>${currentLangForModal === 'en' ? 'Your phone *' : 'Ваш телефон *'}</label><input type="tel" id="modalPhone" placeholder="+7 999 123-45-67"><span class="error-message" id="phoneError"></span></div><button type="submit" class="modal-btn">${currentLangForModal === 'en' ? 'Submit request' : 'Отправить заявку'}</button></form>`;
    document.getElementById('consultForm').addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('modalName').value.trim();
    const email = document.getElementById('modalEmail').value.trim();
    const phone = document.getElementById('modalPhone').value.trim();
    currentLangForModal = document.documentElement.lang || 'ru';
    let isValid = true;
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z\s]{2,}$/;
    if (!name || !nameRegex.test(name)) {
        document.getElementById('nameError').textContent = currentLangForModal === 'en' ? 'Name must contain at least 2 characters (letters only)' : 'Имя должно содержать минимум 2 символа (только буквы)';
        document.getElementById('modalName').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = '';
        document.getElementById('modalName').classList.remove('error');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        document.getElementById('emailError').textContent = currentLangForModal === 'en' ? 'Enter a valid email (containing @)' : 'Введите корректный email (содержащий @)';
        document.getElementById('modalEmail').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
        document.getElementById('modalEmail').classList.remove('error');
    }
    const phoneDigits = phone.replace(/[^0-9]/g, '');
    if (!phone || phoneDigits.length !== 11) {
        document.getElementById('phoneError').textContent = currentLangForModal === 'en' ? 'Enter a valid phone number (11 digits)' : 'Введите корректный номер телефона (11 цифр)';
        document.getElementById('modalPhone').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('phoneError').textContent = '';
        document.getElementById('modalPhone').classList.remove('error');
    }
    if (isValid) { console.log('Заявка:', { name, email, phone }); showSuccessMessage(name); }
}

function closeModal() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}

window.openConsultModal = function () {
    resetModalToForm();
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
};

if (closeBtn) closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.style.display === 'flex') closeModal(); });

document.querySelectorAll('.btn-primary, .video-btn .btn-primary').forEach(btn => {
    if (btn.textContent.includes('Записаться') || btn.textContent.includes('онлайн-консультацию') || btn.textContent.includes('Book')) {
        btn.addEventListener('click', (e) => { e.preventDefault(); window.openConsultModal(); });
    }
});

document.querySelectorAll('.btn-call').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert(currentLanguage === 'en' ? 'Thank you! Our managers will contact you soon.' : 'Спасибо! Скоро с вами свяжутся наши менеджеры.');
    });
});

document.querySelectorAll('.subscribe-form button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const input = e.target.parentElement.querySelector('input');
        const email = input?.value.trim() || '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && emailRegex.test(email)) {
            alert(currentLanguage === 'en' ? 'Thank you for subscribing!' : 'Спасибо за подписку!');
            if (input) input.value = '';
        } else {
            alert(currentLanguage === 'en' ? 'Please enter a valid email address.' : 'Пожалуйста, введите корректный email адрес.');
        }
    });
});

function initCarousel() {
    const slides = document.getElementById('carouselSlides');
    if (!slides) return;
    const realCards = [...document.querySelectorAll('.review-card')];
    if (realCards.length === 0) return;
    const firstClone = realCards[0].cloneNode(true);
    const lastClone = realCards[realCards.length - 1].cloneNode(true);
    slides.appendChild(firstClone);
    slides.insertBefore(lastClone, realCards[0]);
    const allSlides = document.querySelectorAll('.review-card');
    const total = allSlides.length;
    let current = 1;
    let autoInterval;
    let isMoving = false;
    const dotsContainer = document.getElementById('carouselDots');
    const prev = document.getElementById('prevBtn');
    const next = document.getElementById('nextBtn');

    function buildDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < realCards.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === current - 1) dot.classList.add('active');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        }
    }
    function updateDots() {
        const realIndex = (current - 1 + realCards.length) % realCards.length;
        document.querySelectorAll('.dot').forEach((dot, idx) => dot.classList.toggle('active', idx === realIndex));
    }
    function update(instant = false) {
        if (instant) {
            slides.style.transition = 'none';
            slides.style.transform = `translateX(-${current * 100}%)`;
            slides.offsetHeight;
            slides.style.transition = 'transform 0.5s ease';
        } else {
            slides.style.transform = `translateX(-${current * 100}%)`;
        }
        updateDots();
    }
    function goTo(index) { if (isMoving) return; isMoving = true; current = index + 1; update(false); setTimeout(() => isMoving = false, 500); resetAuto(); }
    function nextSlide() { if (isMoving) return; isMoving = true; current++; update(false); setTimeout(() => { isMoving = false; if (current >= total - 1) { current = 1; update(true); } }, 500); resetAuto(); }
    function prevSlide() { if (isMoving) return; isMoving = true; current--; update(false); setTimeout(() => { isMoving = false; if (current <= 0) { current = total - 2; update(true); } }, 500); resetAuto(); }
    function startAuto() { autoInterval = setInterval(nextSlide, 5000); }
function resetAuto() { clearInterval(autoInterval); startAuto(); }
    slides.style.transform = `translateX(-${current * 100}%)`;
    buildDots();
    if (prev) prev.addEventListener('click', prevSlide);
    if (next) next.addEventListener('click', nextSlide);
    startAuto();
    const wrapper = document.querySelector('.carousel-wrapper');
    if (wrapper) { wrapper.addEventListener('mouseenter', () => clearInterval(autoInterval)); wrapper.addEventListener('mouseleave', startAuto); }
}

function animateNumbers() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.innerText);
        if (!isNaN(target) && !el.hasAttribute('data-animated')) {
            el.setAttribute('data-animated', 'true');
            let current = 0;
            const duration = 1800, stepTime = 25;
            const increment = target / (duration / stepTime);
            const updateNumber = () => {
                current += increment;
                if (current < target) { el.innerText = Math.floor(current); setTimeout(updateNumber, stepTime); }
                else { el.innerText = target; }
            };
            const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { updateNumber(); observer.unobserve(entry.target); } }); }, { threshold: 0.5 });
            observer.observe(el);
        }
    });
}

function initScrollAnimations() {
    const sections = document.querySelectorAll('.hero, .stats, .styles-section, .process-section, .video-section, .reviews-section, .catalog-section, .company-description, .why-choose-section, .mission-section, .actions-hero, .promo-banner, .middle-block, .subscribe-box');
    sections.forEach(el => { if (!el.classList.contains('scroll-animate')) el.classList.add('scroll-animate', 'scroll-animate-up'); });

    const titles = document.querySelectorAll('h1, h2, h3, .section-title, .section-title-center, .hero-title, .col-title, .mission-title');
    titles.forEach((title, index) => { if (!title.classList.contains('scroll-animate')) { title.classList.add('scroll-animate', 'scroll-animate-up'); if (index < 5) title.classList.add(`delay-${index + 1}`); } });

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => { if (!card.classList.contains('scroll-animate')) { card.classList.add('scroll-animate', 'scroll-animate-scale'); card.classList.add(`delay-${(index % 4) + 1}`); } });

    const styleCards = document.querySelectorAll('.style-card');
    styleCards.forEach((card, index) => { if (!card.classList.contains('scroll-animate')) { card.classList.add('scroll-animate', 'scroll-animate-scale'); card.classList.add(`delay-${(index % 3) + 1}`); } });

    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => { if (!step.classList.contains('scroll-animate')) { step.classList.add('scroll-animate', 'scroll-animate-right'); step.classList.add(`delay-${(index % 3) + 1}`); } });

    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => { if (!item.classList.contains('scroll-animate')) { item.classList.add('scroll-animate', 'scroll-animate-scale'); item.classList.add(`delay-${index + 1}`); } });

    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => { if (!card.classList.contains('scroll-animate')) card.classList.add('scroll-animate', 'scroll-animate-fade'); });

    const listItems = document.querySelectorAll('.why-list li, .mission-list li, .benefits-list li, .steps-list li, .details-list-actions li, .video-text ul li');
    listItems.forEach((item, index) => { if (!item.classList.contains('scroll-animate')) { item.classList.add('scroll-animate', 'scroll-animate-left'); item.classList.add(`delay-${Math.min((index % 5) + 1, 5)}`); } });

    const textBlocks = document.querySelectorAll('.company-text, .why-choose-content, .mission-wrapper p, .video-text');
    textBlocks.forEach(block => { if (!block.classList.contains('scroll-animate')) block.classList.add('scroll-animate', 'scroll-animate-left'); });

    const images = document.querySelectorAll('.company-image, .why-choose-image, .hero-photo');
    images.forEach(image => { if (!image.classList.contains('scroll-animate')) image.classList.add('scroll-animate', 'scroll-animate-right'); });

    const twoColumns = document.querySelectorAll('.two-columns .col');
    twoColumns.forEach((col, index) => { if (!col.classList.contains('scroll-animate')) { col.classList.add('scroll-animate', 'scroll-animate-up'); if (index === 0) col.classList.add('delay-1'); if (index === 1) col.classList.add('delay-2'); } });

    const footer = document.querySelector('.footer');
    if (footer && !footer.classList.contains('scroll-animate')) footer.classList.add('scroll-animate', 'scroll-animate-fade');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('animated'); observer.unobserve(entry.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

    setTimeout(() => {
        document.querySelectorAll('.scroll-animate').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('animated');
        });
    }, 200);
}

function initPageScrollBehavior() {
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        if (link.getAttribute('href').startsWith('#')) return;
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');
            const separator = targetUrl.includes('?') ? '&' : '?';
            window.location.href = targetUrl + separator + 'scroll=top';
        });
    });
}

function handleScrollParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('scroll') && urlParams.get('scroll') === 'top') {
        window.scrollTo(0, 0);
        window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
    }
}

function initBurgerMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const navMenu = document.getElementById('navMenu');

    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener('click', function () {
            burgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

const productsData = {
    grace: { nameRu: 'Грация', nameEn: 'Grace', price: '118 700 ₽', rating: '★★★★★', descriptionRu: 'Кухня "Грация" — воплощение элегантности.', descriptionEn: 'Grace kitchen is the embodiment of elegance.', featuresRu: ['Материал фасадов: МДФ с эмалью', 'Столешница: искусственный камень', 'Фурнитура: Blum', 'Система хранения: доводчики'], featuresEn: ['Facade material: MDF with enamel', 'Countertop: artificial stone', 'Fittings: Blum', 'Storage system: soft closers'], image: 'images/Grace.png' },
    enli: { nameRu: 'Энли', nameEn: 'Enli', price: '118 000 ₽', rating: '★★★★★', descriptionRu: 'Кухня "Энли" сочетает стиль и функциональность.', descriptionEn: 'Enli kitchen combines style and functionality.', featuresRu: ['Материал фасадов: пластик', 'Столешница: кварцевый агломерат', 'Фурнитура: Hettich', 'Подсветка: светодиодная'], featuresEn: ['Facade material: plastic', 'Countertop: quartz agglomerate', 'Fittings: Hettich', 'Lighting: LED'], image: 'images/Enli.png' },
    astoria: { nameRu: 'Астория', nameEn: 'Astoria', price: '106 750 ₽', rating: '★★★★☆', descriptionRu: 'Кухня "Астория" — гармония стиля и комфорта.', descriptionEn: 'Astoria kitchen is harmony of style and comfort.', featuresRu: ['Материал фасадов: массив дерева', 'Столешница: натуральный камень', 'Фурнитура: Boyard', 'Ручки: латунные'], featuresEn: ['Facade material: solid wood', 'Countertop: natural stone', 'Fittings: Boyard', 'Handles: brass'], image: 'images/Astoria.png' },
    grandezza: { nameRu: 'Грандецца', nameEn: 'Grandezza', price: '83 090 ₽', rating: '★★★★☆', descriptionRu: 'Кухня "Грандецца" воплощает величие.', descriptionEn: 'Grandezza kitchen embodies grandeur.', featuresRu: ['Материал фасадов: шпон ценных пород', 'Столешница: искусственный камень', 'Фурнитура: Blum', 'Декор: резные элементы'], featuresEn: ['Facade material: precious wood veneer', 'Countertop: artificial stone', 'Fittings: Blum', 'Decor: carved elements'], image: 'images/Grandezza.png' },
    mono: { nameRu: 'Моно', nameEn: 'Mono', price: '82 720 ₽', rating: '★★★★★', descriptionRu: 'Кухня "Моно" — минимализм и функциональность.', descriptionEn: 'Mono kitchen is minimalism and functionality.', featuresRu: ['Материал фасадов: акрил', 'Столешница: постформинг', 'Фурнитура: Hettich', 'Цвета: матовые и глянцевые'], featuresEn: ['Facade material: acrylic', 'Countertop: postforming', 'Fittings: Hettich', 'Colors: matte and glossy'], image: 'images/Mono.png' },
    farrini: { nameRu: 'Фаррини', nameEn: 'Farrini', price: '126 400 ₽', rating: '★★★★★', descriptionRu: 'Кухня "Фаррини" — итальянский стиль.', descriptionEn: 'Farrini kitchen is Italian style.', featuresRu: ['Материал фасадов: МДФ с эмалью', 'Столешница: кварцевый агломерат', 'Фурнитура: Blum', 'Форма: радиусные фасады'], featuresEn: ['Facade material: MDF with enamel', 'Countertop: quartz agglomerate', 'Fittings: Blum', 'Shape: radius facades'], image: 'images/Farrini.png' },
    delvento: { nameRu: 'Дельванто', nameEn: 'Delvento', price: '130 600 ₽', rating: '★★★★★', descriptionRu: 'Кухня "Дельванто" — современные технологии.', descriptionEn: 'Delvento kitchen is modern technology.', featuresRu: ['Материал фасадов: пластик премиум', 'Столешница: натуральный камень', 'Фурнитура: Blum', 'Системы: выдвижные ящики'], featuresEn: ['Facade material: premium plastic', 'Countertop: natural stone', 'Fittings: Blum', 'Systems: full extension drawers'], image: 'images/Delvento.png' },
    sherman: { nameRu: 'Шерман', nameEn: 'Sherman', price: '76 280 ₽', rating: '★★★★☆', descriptionRu: 'Кухня "Шерман" — стильный и практичный выбор.', descriptionEn: 'Sherman kitchen is a stylish and practical choice.', featuresRu: ['Материал фасадов: ЛДСП', 'Столешница: постформинг', 'Фурнитура: Boyard', 'Цвета: пастельные тона'], featuresEn: ['Facade material: chipboard', 'Countertop: postforming', 'Fittings: Boyard', 'Colors: pastel shades'], image: 'images/Sherman.png' },
    cashmere: { nameRu: 'Кашемире', nameEn: 'Cashmere', price: '90 180 ₽', rating: '★★★★☆', descriptionRu: 'Кухня "Кашемире" — мягкость натуральных оттенков.', descriptionEn: 'Cashmere kitchen is softness of natural shades.', featuresRu: ['Материал фасадов: МДФ пленка', 'Столешница: искусственный камень', 'Фурнитура: Hettich', 'Стиль: неоклассика'], featuresEn: ['Facade material: MDF film', 'Countertop: artificial stone', 'Fittings: Hettich', 'Style: neoclassical'], image: 'images/Cashmere.png' },
    ivory: { nameRu: 'Айвори', nameEn: 'Ivory', price: '98 500 ₽', rating: '★★★★★', descriptionRu: 'Кухня "Айвори" — элегантность слоновой кости.', descriptionEn: 'Ivory kitchen is elegance of ivory.', featuresRu: ['Материал фасадов: шпон', 'Столешница: кварцевый агломерат', 'Фурнитура: Blum', 'Освещение: встроенная подсветка'], featuresEn: ['Facade material: veneer', 'Countertop: quartz agglomerate', 'Fittings: Blum', 'Lighting: built-in backlight'], image: 'images/Ivory.png' }
};

function openProductModal(productId) {
    const p = productsData[productId];
    if (!p) return;
    const lang = document.documentElement.lang || 'ru';
    document.getElementById('modalProductImage').src = p.image;
    document.getElementById('modalProductTitle').textContent = lang === 'ru' ? p.nameRu : p.nameEn;
    document.getElementById('modalProductRating').textContent = p.rating;
    document.getElementById('modalProductPrice').textContent = `от ${p.price}`;
    document.getElementById('modalProductDescription').textContent = lang === 'ru' ? p.descriptionRu : p.descriptionEn;
    const features = lang === 'ru' ? p.featuresRu : p.featuresEn;
    document.getElementById('modalProductFeatures').innerHTML = `<h4>${lang === 'ru' ? 'Характеристики:' : 'Features:'}</h4><ul>${features.map(f => `<li>${f}</li>`).join('')}</ul>`;
    const btn = document.getElementById('modalOrderBtn');
    btn.textContent = lang === 'ru' ? 'Заказать консультацию' : 'Order consultation';
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.onclick = (e) => { e.preventDefault(); closeProductModal(); window.openConsultModal(); };
    const modalEl = document.getElementById('productModal');
    modalEl.style.display = 'flex';
    document.body.classList.add('modal-open');
}

function closeProductModal() {
    const modalEl = document.getElementById('productModal');
    if (modalEl) { modalEl.style.display = 'none'; document.body.classList.remove('modal-open'); }
}

document.querySelectorAll('.product-card').forEach(card => {
    const id = card.getAttribute('data-product-id');
    if (id) card.addEventListener('click', (e) => { if (!e.target.closest('.btn-call')) openProductModal(id); });
});
document.querySelector('.product-modal-close')?.addEventListener('click', closeProductModal);
document.getElementById('productModal')?.addEventListener('click', (e) => { if (e.target === document.getElementById('productModal')) closeProductModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.getElementById('productModal')?.style.display === 'flex') closeProductModal(); });

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initCarousel();
    animateNumbers();
    initScrollAnimations();
    initPageScrollBehavior();
    handleScrollParameter();
    initBurgerMenu();
});