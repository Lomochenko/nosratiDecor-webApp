const $ = jQuery;
const wind = $(window);
const body = $("body");

// تابع برای آپدیت درصد preloader
function updatePreloaderPercentage() {
    let count = 0;
    const preloader = $('.preloader');
    const percentElement = preloader.find('.percent');
    
    const interval = setInterval(() => {
        count++;
        percentElement.text(count);
        
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
        preloader.fadeOut(1000);
        setTimeout(() => {
            preloader.remove();
            enableScroll();
            
            // فعال‌سازی cursor بعد از preloader
            setTimeout(() => {
                $('.cursor').css({
                    'visibility': 'visible',
                    'display': 'block',
                    'opacity': '1'
                });
                handleCursorVisibility();
            }, 100);
        }, 1000);
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
        cursor.hide();
        $(document).off('mousemove mouseleave mouseenter');
    } else {
        cursor.show();
        initializeCursor();
    }
}

// اجرای کد بعد از لود کامل صفحه
$(window).on('load', function() {
    // غیرفعال کردن اسکرول در شروع
    $('body').css({
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
    
    updatePreloaderPercentage();
});

// اجرای مجدد تابع در هنگام تغییر سایز صفحه
$(window).on('resize', function() {
    handleCursorVisibility();
});

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
            'transition': 'width 0.2s ease-in-out, height 0.2s ease-in-out'
        });
        
        // راه‌اندازی mouse move
        dsnGrid.mouseMove('.cursor');
        
        // راه‌اندازی hover effect ساده
        dsnGrid.elementHover('.cursor', 'a, button', 'cursor-hover');
    } else {
        // برگرداندن cursor به حالت عادی در موبایل و تبلت
        $('*').css('cursor', '');
    }
}

// DSN Grid Library
const dsnGrid = {
    backgroundPosition: function (e, n, t) {
        if (!(e instanceof jQuery)) {
            e = jQuery(e);
        }
        
        t = t || {};
        const o = t.sizeX || "105%";
        const i = t.sizeY || "105%";
        const s = t.left || "-5%";
        const r = t.top || "-5%";
        const a = t.move || 100;
        
        e.css({
            width: o,
            height: i,
            left: s,
            top: r,
            backgroundPositionX: `calc(50% - ${-2 * a}px)`,
            backgroundPositionY: `calc(50% - ${-2 * a}px)`
        });
        
        n = n || 1;
        
        e.parent().on("mousemove", function (o) {
            if (t.dataActive && jQuery(this).find(e).hasClass(t.dataActive)) return false;
            
            const i = o.clientX / jQuery(this).width() - 0.5;
            const s = o.clientY / jQuery(this).height() - 0.5;
            
            gsap.to(jQuery(this).find(e), {
                duration: n,
                transformPerspective: 100,
                x: `${a * i + a}px`,
                y: `${a * s + a}px`
            });
            
            if (t.onEnter) t.onEnter(jQuery(this), o);
        }).on("mouseleave", function (o) {
            gsap.to(jQuery(this).find(e), {
                duration: n,
                x: `${a}px`,
                y: `${a}px`,
                ease: "back.out(4)"
            });
            
            if (t.onLeave) t.onLeave(jQuery(this), o);
        });
        
        return dsnGrid;
    },
    mouseMove: function (e) {
        if (!e.length) return;
        
        const cursor = $(e);
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        let fadeTimeout;
        
        cursor.css({
            'display': 'block',
            'opacity': 1,
            'transform': 'translate(-50%, -50%)',
            'transition': 'width 0.2s ease-in-out, height 0.2s ease-in-out, opacity 0.3s ease-in-out'
        });
        
        function lerp(start, end, factor) {
            return start + (end - start) * factor;
        }
        
        function fadeOutCursor() {
            cursor.css('opacity', 0);
        }
        
        function fadeInCursor() {
            cursor.css('opacity', 1);
        }
        
        function resetFadeTimer() {
            clearTimeout(fadeTimeout);
            fadeInCursor();
            fadeTimeout = setTimeout(fadeOutCursor, 700);
        }
        
        function updateCursorPosition() {
            currentX = lerp(currentX, targetX, 0.15);
            currentY = lerp(currentY, targetY, 0.15);
            
            cursor.css({
                'left': `${currentX}px`,
                'top': `${currentY}px`
            });
            
            requestAnimationFrame(updateCursorPosition);
        }
        
        updateCursorPosition();
        resetFadeTimer();
        
        $(document).on('mousemove', function (event) {
            targetX = event.clientX;
            targetY = event.clientY;
            resetFadeTimer();
        });
    },
    elementHover: function(selector, elementTarget, className) {
        if (!elementTarget.length) return;
        
        const cursor = $(selector);
        
        $(elementTarget).on('mouseenter', function() {
            cursor.css({
                'width': '45px',
                'height': '45px'
            });
        }).on('mouseleave', function() {
            cursor.css({
                'width': '30px',
                'height': '30px'
            });
        });
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
        if (n === true) return initHover();
        if ($("body").hasClass("dsn-large-mobile")) return;
        
        dsnGrid.mouseMove(i);
        initHover();
    }

    function initScroll() {
        const $navBar = $(".dsn-nav-bar");
        $navBar.removeClass("header-stickytop");
        
        let lastScroll = 0;
        const $wrapper = $(".wrapper");
        const $headerSinglePost = $(".header-single-post .container");
        const $postFullContent = $(".post-full-content");
        
        let offset = $wrapper.offset();
        if ($headerSinglePost.length) {
            offset = $headerSinglePost.offset();
        } else if (offset.top <= 70) {
            offset = $postFullContent.offset();
        }
        
        $(window).on("scroll", function() {
            const scrollTop = $(window).scrollTop();
            const threshold = offset ? offset.top - 100 : 70;
            
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
            if (!$('body').hasClass('nav-active')) {
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
            if (!$('body').hasClass('nav-active')) {
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
            $('body').addClass('nav-active');
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
            $('body').removeClass('nav-active');
            
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
            if ($('body').hasClass('nav-active')) {
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

    // Initialize
    $(document).ready(function() {
        initCursor();
        initScroll();
        navigation();
    });

})(jQuery); 