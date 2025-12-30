$(function () {
    "use strict";

    // Navbar Sticky
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            $(".stick").addClass("sticky");
        } else {
            $(".stick").removeClass("sticky");
        }
    });

    // Scroll Navbar
    $('body').scrollspy({
        target: ".navbar",
        offset: 75
    });

    $("#navbarSupported a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1500, function () {
                window.location.hash = hash;
            });
        }
    });

    // Navbar Mobile
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

    // Navbar Dropdown
    $(document).ready(function () {
        $('.navbar .dropdown').hover(function () {
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown(150);
        }, function () {
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp(105)
        });
    });

    // Swiper Portfolio
    var swiper = new Swiper('.swiper-home', {
        loop: true,
        slidesPerView: 1,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            200: {
                slidesPerView: 1,
            }
        },
    });

    // Swiper Shop
    var swiper = new Swiper('.swiper-shop', {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 16,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            200: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1000: {
                slidesPerView: 3,
            },
        },
    });

    // Swiper Testimonial
    var swiper = new Swiper('.swiper-testimonial', {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 10,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            200: {
                slidesPerView: 1,
            },
            1000: {
                slidesPerView: 2,
            },
        },
    });

});