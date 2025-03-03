const $ = jQuery;
const wind = $(window);
const body = $("body");
const i = $(window);
const o = $("body");

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
            }, 100); // تاخیر کوتاه برای اطمینان از اتمام کامل preloader
            
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
    // تمام توابع dsn-grid.js
    backgroundPosition: function (e, n, t) {
        var o, i, a, s, r;
        return e instanceof jQuery == !1 && (e = jQuery(e)), t = this.getUndefinedVal(t, {}), o = this.getUndefinedVal(t.sizeX, "105%"), i = this.getUndefinedVal(t.sizeY, "105%"), s = this.getUndefinedVal(t.left, "-5%"), r = this.getUndefinedVal(t.top, "-5%"), a = this.getUndefinedVal(t.move, 100), e.css({
            width: o,
            height: i,
            left: s,
            top: r,
            backgroundPositionX: "calc(50% - " + -2 * a + "px)",
            backgroundPositionY: "calc(50% - " + -2 * a + "px)"
        }), n = this.getUndefinedVal(n, 1), e.parent().on("mousemove", function (o) {
            if (void 0 !== t.dataActive && jQuery(this).find(e).hasClass(t.dataActive)) return !1;
            var i = o.clientX / jQuery(this).width() - .5,
                s = o.clientY / jQuery(this).height() - .5;
            TweenLite.to(jQuery(this).find(e), n, {
                transformPerspective: 100,
                x: a * i + a + " ",
                y: a * s + a + ""
            }), void 0 !== t.onEnter && t.onEnter(jQuery(this), o)
        }).on("mouseleave", function (o) {
            TweenMax.to(jQuery(this).find(e), n, {
                x: a,
                y: a,
                ease: Back.easeOut.config(4)
            }), void 0 !== t.onLeave && t.onLeave(jQuery(this), o)
        }), dsnGrid
    },
    mouseMove: function (e) {
        if (e.length <= 0) return;
        
        const cursor = $(e);
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        let fadeTimeout;
        
        // اطمینان از اینکه cursor قابل مشاهده است
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
    },
    // ... سایر توابع dsn-grid.js
};

// Custom Code
(function($) {
    "use strict";

    function t(n) {
        function n() {
            dsnGrid.elementHover(i, "a.link-pop , a > img", "cursor-view"), 
            dsnGrid.elementHover(i, ".close-wind", "cursor-close"), 
            dsnGrid.elementHover(i, "a:not(> img) , .dsn-button-sidebar,  button", "cursor-link");
        }
        const i = ".cursor";
        if (a().isMobiles()) return;
        if (void 0 !== t && !0 === t) return void n();
        if (e("body").hasClass("dsn-large-mobile")) return;
        dsnGrid.mouseMove(i), n();
    }

    function n() {
        i.off("scroll");
        let t = $(".dsn-nav-bar");
        t.removeClass("header-stickytop");
        let n = 0;
        var a = $(".wrapper").offset(),
            o = $(".header-single-post .container").offset(),
            s = $(".post-full-content").offset(),
            l = 0;
        void 0 !== o ? a = o : a.top <= 70 && (a = s), r.getListener(function(e) {
            n = "scroll" === e.type ? i.scrollTop() : e.offset.y;
            let o = 70;
            void 0 !== a && (o = a.top - 100), n > o ? l < n ? t.addClass("nav-bg").addClass("hide-nave") : t.removeClass("hide-nave") : t.removeClass("nav-bg").removeClass("hide-nave"), l = n
        });
    }

    // ... سایر توابع custom.js

    // Initialize
    $(document).ready(function() {
        t();
        n();
        // ... سایر توابع initialize
    });

})(jQuery); 