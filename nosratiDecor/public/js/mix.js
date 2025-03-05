// تعریف متغیرهای اصلی
const $ = window.jQuery;
const wind = $(window);
const body = $("body");

// تابع برای آپدیت درصد preloader
function updatePreloaderPercentage() {
    let count = 0;
    const preloader = $('.preloader');
    const percentElement = preloader.find('.percent');
    const progressBar = preloader.find('.preloader-progress');
    
    const interval = setInterval(() => {
        count++;
        percentElement.text(count);
        progressBar.css('width', count + '%');
        
        if (count >= 100) {
            clearInterval(interval);
            removePreloader();
        }
    }, 20);
}

// تابع برای حذف preloader
function removePreloader() {
    const preloader = $('.preloader');
    if (preloader.length) {
        preloader.fadeOut(800, function() {
            preloader.remove();
            enableScroll();
            
            // فعال‌سازی cursor بلافاصله بعد از preloader
            initializeCursor();
            
            // شروع انیمیشن‌های متن با تاخیر
            setTimeout(() => {
                initHeroTextAnimation();
            }, 500);
        });
    }
}

// تابع برای فعال کردن اسکرول
function enableScroll() {
    $('body').css({
        'overflow': 'visible',
        'height': 'auto',
        'position': 'static'
    }).removeClass('dsn-effect-scroll');
    
    $('.wrapper').css({
        'overflow': 'visible',
        'position': 'static'
    });
    
    // فعال کردن اسکرول برای همه المنت‌های اصلی
    $('main, .wrapper, #app, body').each(function() {
        $(this).css({
            'overflow': 'visible',
            'height': 'auto'
        });
    });
}

// تابع برای تشخیص سایز دستگاه
function isMobileOrTablet() {
    return window.innerWidth < 1024;
}

// تابع برای مدیریت نمایش/مخفی کردن cursor بر اساس سایز صفحه
function handleCursorVisibility() {
    const cursor = $('.cursor');
    if (isMobileOrTablet()) {
        cursor.fadeOut(300);
        $(document).off('mousemove mouseleave mouseenter');
    } else {
        cursor.fadeIn(300);
        initializeCursor();
    }
}

// تابع راه‌اندازی cursor
function initializeCursor() {
    const cursor = $('.cursor');
    if (cursor.length && !isMobileOrTablet()) {
        // مخفی کردن cursor پیش‌فرض مرورگر در کل صفحه
        $('*').css('cursor', 'none');
        
        // تنظیمات اولیه cursor
        cursor.css({
            'display': 'block',
            'position': 'fixed',
            'pointer-events': 'none',
            'z-index': '9999',
            'width': '30px',
            'height': '30px',
            'background-color': '#fff',
            'border-radius': '50%',
            'mix-blend-mode': 'exclusion',
            'transform': 'translate(-50%, -50%)',
            'transition': 'width 0.2s ease-in-out, height 0.2s ease-in-out',
            'opacity': '1',
            'visibility': 'visible'
        });
        
        // راه‌اندازی mouse move با تنظیمات بهینه‌شده
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        const speed = 0.15; // افزایش سرعت حرکت cursor
        
        function updateCursor() {
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;
            
            cursor.css({
                'transform': `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`
            });
            
            requestAnimationFrame(updateCursor);
        }
        
        $(document).on('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!cursor.is(':visible')) {
                cursor.show();
            }
        });
        
        updateCursor();
        
        // راه‌اندازی hover effect با تنظیمات بهینه‌شده
        $('a, button').on({
            mouseenter: function() {
                gsap.to(cursor, {
                    duration: 0.2,
                    width: '60px',
                    height: '60px'
                });
            },
            mouseleave: function() {
                gsap.to(cursor, {
                    duration: 0.2,
                    width: '30px',
                    height: '30px'
                });
            }
        });
    } else {
        // برگرداندن cursor به حالت عادی در موبایل و تبلت
        $('*').css('cursor', '');
    }
}

// DSN Grid Library
const dsnGrid = {
    backgroundPosition: function (element, duration, options) {
        if (!(element instanceof jQuery)) {
            element = jQuery(element);
        }
        
        if (!element.length) return this;
        
        options = options || {};
        duration = duration || 0.5;
        
        const defaults = {
            sizeX: "105%",
            sizeY: "105%",
            left: "-5%",
            top: "-5%",
            move: 100
        };
        
        options = {...defaults, ...options};
        
        element.css({
            width: options.sizeX,
            height: options.sizeY,
            left: options.left,
            top: options.top,
            backgroundPosition: '50% 50%'
        });
        
        const parent = element.parent();
        
        parent.on("mousemove", function(e) {
            if (options.dataActive && element.hasClass(options.dataActive)) return;
            
            const rect = this.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            const x = (relX / rect.width - 0.5) * 2;
            const y = (relY / rect.height - 0.5) * 2;
            
            gsap.to(element, {
                duration: duration,
                x: options.move * x,
                y: options.move * y,
                backgroundPositionX: 50 + 10 * x + '%',
                backgroundPositionY: 50 + 10 * y + '%',
                ease: "power2.out"
            });
        }).on("mouseleave", function() {
            gsap.to(element, {
                duration: duration,
                x: 0,
                y: 0,
                backgroundPositionX: '50%',
                backgroundPositionY: '50%',
                ease: "power2.out"
            });
        });
        
        return this;
    },

    mouseMove: function(selector) {
        if (!selector) return;
        
        const cursor = $(selector);
        if (!cursor.length) return;
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let speed = 0.1; // سرعت حرکت cursor
        
        // تنظیمات اولیه cursor
        cursor.css({
            'position': 'fixed',
            'pointer-events': 'none',
            'z-index': '9999',
            'opacity': '1',
            'transform': 'translate(-50%, -50%)',
            'transition': 'width 0.3s ease-in-out, height 0.3s ease-in-out'
        });
        
        function updateCursor() {
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;
            
            cursor.css({
                'left': cursorX + 'px',
                'top': cursorY + 'px'
            });
            
            requestAnimationFrame(updateCursor);
        }
        
        $(document).on('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }).on('mouseleave', function() {
            cursor.css('opacity', '0');
        }).on('mouseenter', function() {
            cursor.css('opacity', '1');
        });
        
        updateCursor();
        return this;
    },

    elementHover: function(cursorSelector, targetSelector, className) {
        const cursor = $(cursorSelector);
        if (!cursor.length) return this;
        
        $(targetSelector).each(function() {
            const element = $(this);
            
            element.on('mouseenter', function() {
                cursor.addClass(className);
                gsap.to(cursor, {
                    duration: 0.3,
                    width: '65px',
                    height: '65px',
                    ease: "power2.out"
                });
            }).on('mouseleave', function() {
                cursor.removeClass(className);
                gsap.to(cursor, {
                    duration: 0.3,
                    width: '30px',
                    height: '30px',
                    ease: "power2.out"
                });
            });
        });
        
        return this;
    }
};

// Custom Code
(function($) {
    "use strict";

    function initCursor(n) {
        function initHover() {
            dsnGrid.elementHover(i, "a.link-pop , a > img", "cursor-view");
            dsnGrid.elementHover(i, ".close-wind", "cursor-close");
            dsnGrid.elementHover(i, "a:not(> img) , .dsn-button-sidebar, button", "cursor-link");
        }
        
        const i = ".cursor";
        if (isMobileOrTablet()) return;
        
        dsnGrid.mouseMove(i);
        initHover();
    }

    function initScroll() {
        const $navBar = $(".dsn-nav-bar");
        $navBar.removeClass("header-stickytop");
        
        let lastScroll = 0;
        const $wrapper = $(".wrapper");
        
        wind.on("scroll", function() {
            const scrollTop = wind.scrollTop();
            const threshold = 70;
            
            if (scrollTop > threshold) {
                if (scrollTop > lastScroll) {
                    $navBar.addClass("nav-bg hide-nave");
                } else {
                    $navBar.removeClass("hide-nave");
                }
            } else {
                $navBar.removeClass("nav-bg hide-nave");
            }
            
            lastScroll = scrollTop;
        });
    }

    function navigation() {
        const $menuIcon = $('.menu-icon');
        const $nav = $('.nav');
        const $navContent = $('.nav-content');
        const $navItems = $nav.find('.nav__list-item a');
        const $textMenu = $menuIcon.find('.text-menu');
        const $textButton = $textMenu.find('.text-button');
        const $textOpen = $textMenu.find('.text-open');
        const $textClose = $textMenu.find('.text-close');
        
        // تنظیمات اولیه
        $nav.css({
            'opacity': '0',
            'visibility': 'hidden'
        });
        
        $navContent.css({
            'opacity': '0',
            'visibility': 'hidden'
        });
        
        // تنظیم حالت اولیه آیتم‌های منو
        $navItems.css({
            'opacity': '0',
            'transform': 'translateX(-10px) scale(0.8) rotate(1deg)'
        });
        
        // تنظیم حالت اولیه متن‌های منو
        $textMenu.css({
            'top': '0'
        });
        
        $textOpen.css({
            'opacity': '0',
            'visibility': 'hidden',
            'position': 'absolute',
            'transform': 'translateY(-50%)'
        });
        $textClose.css({
            'opacity': '0',
            'visibility': 'hidden',
            'position': 'absolute',
            'top': '50%',
            'left': '0',
            'transform': 'translateY(-50%)'
        });
        $textButton.css({
            'position': 'relative',
            'top': '50%',
            'transform': 'translateY(-50%)'
        });
        
        // انیمیشن hover برای menu-icon
        $menuIcon.on('mouseenter', function() {
            if (!body.hasClass('nav-active')) {
                gsap.to($textButton, {
                    duration: 0.3,
                    opacity: 0,
                    y: -20,
                    onComplete: () => {
                        $textButton.css('visibility', 'hidden');
                        $textOpen.css('visibility', 'visible');
                        gsap.to($textOpen, {
                            duration: 0.3,
                            opacity: 1,
                            y: 0
                        });
                    }
                });
            }
        }).on('mouseleave', function() {
            if (!body.hasClass('nav-active')) {
                gsap.to($textOpen, {
                    duration: 0.3,
                    opacity: 0,
                    y: -20,
                    onComplete: () => {
                        $textOpen.css('visibility', 'hidden');
                        $textButton.css('visibility', 'visible');
                        gsap.to($textButton, {
                            duration: 0.3,
                            opacity: 1,
                            y: 0
                        });
                    }
                });
            }
        });
        
        // تابع باز کردن منو
        function openMenu() {
            body.addClass('nav-active');
            $nav.css({
                'opacity': '1',
                'visibility': 'visible'
            });
            $navContent.css({
                'opacity': '1',
                'visibility': 'visible'
            });
            
            // انیمیشن متن‌های منو
            gsap.to($textOpen, {
                duration: 0.3,
                opacity: 0,
                y: -20,
                onComplete: () => {
                    $textOpen.css('visibility', 'hidden');
                    $textClose.css('visibility', 'visible');
                    gsap.to($textClose, {
                        duration: 0.3,
                        opacity: 1,
                        y: 0
                    });
                }
            });
            
            // انیمیشن آیتم‌های منو
            $navItems.each(function(index) {
                gsap.to(this, {
                    duration: 0.5,
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    rotation: 0,
                    delay: 0.8 + (index * 0.15),
                    ease: "power2.out"
                });
            });
        }
        
        // تابع بستن منو
        function closeMenu() {
            body.removeClass('nav-active');
            
            // انیمیشن متن‌های منو
            gsap.to($textClose, {
                duration: 0.3,
                opacity: 0,
                y: -20,
                onComplete: () => {
                    $textClose.css('visibility', 'hidden');
                    $textButton.css('visibility', 'visible');
                    gsap.to($textButton, {
                        duration: 0.3,
                        opacity: 1,
                        y: 0
                    });
                }
            });
            
            // انیمیشن بستن آیتم‌های منو
            $navItems.each(function(index) {
                gsap.to(this, {
                    duration: 0.3,
                    opacity: 0,
                    x: -10,
                    scale: 0.8,
                    rotation: 1,
                    delay: index * 0.1,
                    ease: "power2.in",
                    onComplete: () => {
                        if (index === $navItems.length - 1) {
                            $nav.css({
                                'opacity': '0',
                                'visibility': 'hidden'
                            });
                            $navContent.css({
                                'opacity': '0',
                                'visibility': 'hidden'
                            });
                        }
                    }
                });
            });
        }
        
        // اضافه کردن event listener برای کلیک روی آیکون منو
        $menuIcon.on('click', function() {
            if (body.hasClass('nav-active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // بستن منو با کلیک روی لینک‌ها
        $nav.find('a').on('click', function() {
            closeMenu();
        });
    }

    function initHeroTextAnimation() {
        const heroContent = $('.header-hero');
        if (!heroContent.length) return;

        // تنظیم حالت اولیه
        heroContent.css({
            'opacity': '1',
            'visibility': 'visible'
        });

        // انیمیشن برای متن‌های داخل hero
        const title = heroContent.find('h1');
        const subtitle = heroContent.find('p');

        if (title.length) {
            // ذخیره متن اصلی
            const titleText = title.text();
            title.text(''); // پاک کردن متن فعلی

            // تنظیم حالت اولیه
            title.css({
                'opacity': '1',
                'transform': 'translateY(0)',
                'visibility': 'visible'
            });

            // انیمیشن تایپ متن
            gsap.to(title, {
                duration: 2,
                opacity: 1,
                onStart: () => {
                    let currentText = '';
                    titleText.split('').forEach((char, index) => {
                        setTimeout(() => {
                            currentText += char;
                            title.text(currentText);
                        }, index * 100); // تاخیر 100 میلی‌ثانیه برای هر کاراکتر
                    });
                }
            });
        }

        if (subtitle.length) {
            // ذخیره متن اصلی
            const subtitleText = subtitle.text();
            subtitle.text(''); // پاک کردن متن فعلی

            // تنظیم حالت اولیه
            subtitle.css({
                'opacity': '1',
                'transform': 'translateY(0)',
                'visibility': 'visible'
            });

            // انیمیشن تایپ متن با تاخیر بیشتر
            gsap.to(subtitle, {
                duration: 2,
                opacity: 1,
                delay: 1.5, // تاخیر 1.5 ثانیه بعد از عنوان
                onStart: () => {
                    let currentText = '';
                    subtitleText.split('').forEach((char, index) => {
                        setTimeout(() => {
                            currentText += char;
                            subtitle.text(currentText);
                        }, index * 80); // تاخیر 80 میلی‌ثانیه برای هر کاراکتر
                    });
                }
            });
        }
    }

    // Initialize
    function init() {
        console.log('Initializing...'); // برای دیباگ
        
        // غیرفعال کردن اسکرول در شروع
        body.css({
            'overflow': 'hidden',
            'height': '100vh',
            'position': 'fixed'
        });
        
        // مخفی کردن کامل cursor در ابتدا
        $('.cursor').css({
            'display': 'none',
            'opacity': '0',
            'visibility': 'hidden'
        }).hide();
        
        // غیرفعال کردن event listeners مربوط به cursor
        $(document).off('mousemove mouseenter mouseleave');
        
        // شروع preloader
        updatePreloaderPercentage();
    }

    // اجرای کد بعد از لود کامل صفحه
    $(function() {
        console.log('Document ready, initializing...'); // برای دیباگ
        initCursor();
        initScroll();
        navigation();
        init();
    });

})(jQuery); 