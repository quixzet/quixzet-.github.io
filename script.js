// Инициализация AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Прелоадер
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);
});

// Анимация логотипа при клике
const logo = document.getElementById('logo');
if (logo) {
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        logo.style.transform = 'scale(0.95)';
        setTimeout(() => {
            logo.style.transform = 'scale(1)';
        }, 150);
        
        // Прокрутка наверх при клике на логотип
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Мобильное меню
const burgerMenu = document.getElementById('burger-menu');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function toggleMobileMenu() {
    burgerMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

burgerMenu.addEventListener('click', toggleMobileMenu);
closeMenu.addEventListener('click', toggleMobileMenu);

// Закрытие меню при клике на ссылку
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleMobileMenu();
    });
});

// Закрытие меню при клике вне его
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !burgerMenu.contains(e.target)) {
        toggleMobileMenu();
    }
});

// Кастомный курсор (только для десктопа)
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorCircle = document.getElementById('cursor-circle');

    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorCircle.style.left = e.clientX - 15 + 'px';
            cursorCircle.style.top = e.clientY - 15 + 'px';
        }, 100);
    });

    // Эффект наведения для интерактивных элементов
    const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .story-card, .logo');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(2)';
            cursorCircle.style.transform = 'scale(1.5)';
            cursorCircle.style.borderColor = '#ff0033';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorCircle.style.transform = 'scale(1)';
            cursorCircle.style.borderColor = '#ff0033';
        });
    });
} else {
    // Скрываем курсор на мобильных устройствах
    document.getElementById('cursor-dot').style.display = 'none';
    document.getElementById('cursor-circle').style.display = 'none';
}

// Плавная прокрутка для всех ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Параллакс эффект (только для десктопа)
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const parallaxBg = document.querySelector('.parallax-bg');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        parallaxBg.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    });
}

// Анимация кнопки исследования
const exploreBtn = document.getElementById('explore-btn');
exploreBtn.addEventListener('click', () => {
    document.getElementById('story').scrollIntoView({
        behavior: 'smooth'
    });
});

// Переключение темы
const themeBtn = document.getElementById('theme-btn');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeBtn.textContent = document.body.classList.contains('light-theme') ? '🌞' : '🌙';
});

// Форма обратной связи
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Отправлено!';
            submitBtn.style.background = '#00ff00';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Социальные кнопки
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('https://web.telegram.org/a/#6684815090');
    });
});

// Случайные эффекты для логотипа при скролле
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const logo = document.querySelector('.logo');
    
    if (logo && scrolled > 100) {
        logo.style.transform = `scale(${1 - Math.min(scrolled * 0.001, 0.1)})`;
    }
});

// Эффект печатания для логотипа в прелоадере
function typeLoaderText() {
    const loaderText = document.querySelector('.loader-text');
    if (loaderText) {
        const text = 'quixzet loading...';
        let i = 0;
        
        loaderText.textContent = '';
        
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                loaderText.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    }
}

// Запускаем эффект печатания при загрузке
window.addEventListener('load', typeLoaderText);