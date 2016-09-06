$(document).ready(function () {

    /******************************
     ******* init scripts *********
     ******************************/

    if ($(window).width() < '981'){
        $('nav > ul > li ul').fadeOut();
        $('nav > ul > li p').removeClass('opened');
    } else {

    }

    $(window).resize(function(){
        if ($(window).width() < '981'){
            $('nav > ul > li ul').fadeOut();
            $('nav > ul > li p').removeClass('opened');
        } else {

        }
    });

    /******************************
     ******* other scripts ********
     ******************************/

    $('nav > ul > li').hover(
        function() {
            if ($(window).width() > '980'){
                $(this).addClass('active');
                $(this).find('p').addClass('opened');
                $(this).find('ul').stop().slideDown();
            }
        },
        function() {
            if ($(window).width() > '980'){
                $(this).removeClass('active');
                $(this).find('p').removeClass(' opened');
                $(this).find('ul').stop().slideUp();
            }
        }
    );

    $('nav > ul > li p').click(function() {
            if ($(window).width() < 981){
                $(this).toggleClass('opened');
                $(this).siblings('ul').stop().slideToggle();
            }
        }
    );

    $('.burger').click(function() {
        $(this).toggleClass('active');
        $(this).siblings('nav').slideToggle();
    });

    $(function($) {
        $('form').validatr({
            showall: true,
            valid: function() {
                // Получение ID формы
                var formID = $(this).attr('id');
                // Добавление решётки к имени ID
                var formNm = $('#' + formID);
                var scriptFile;
                if (formID == 'form-order') scriptFile = 'mail-order.php';
                if (formID == 'form-callback') scriptFile = 'mail-callback.php';
                $.ajax({
                    type: "POST",
                    url: scriptFile,
                    data: formNm.serialize(),
                    success: function (data) {
                        $('.window-order').fadeOut();
                        $('.window-successful').fadeIn();
                    },
                    error: function (data) {
                        $('.window-order').fadeOut();
                        $('.window-error').fadeIn();
                    }
                });
                return false;
            }
        });
    });

    $('.form-submit').click(function() {
        $(this).parents('form').find('.form-field:invalid').addClass('invalid-field');
        $(this).parents('form').find('.custom-checkbox:invalid').addClass('invalid-field');
        $(this).parents('form').find('.no-validation').removeClass('invalid-field');
    });

    $('.callback').click(function () {
        $('.window-callback').fadeIn();
    });
    $('.window-callback').click(function (event) {
        $target = $(event.target);
        if (!$target.closest($('#form-callback')).length) $('.window-callback').fadeOut();
        if ($target.hasClass('close-marker')) $('.window-callback').fadeOut();
    });
    $('.window-successful').click(function (event) {
        $target = $(event.target);
        if (!$target.closest($('.message-successful')).length) $('.window-successful').fadeOut();
    });
    $('.message-successful button').click(function() {
        $('.window-successful').fadeOut();
        $('.window-callback').fadeOut();

    });
    $('.window-error').click(function (event) {
        $target = $(event.target);
        if (!$target.closest($('.message-error')).length) $('.window-error').fadeOut();
    });
    $('.message-error button').click(function() {
        $('.window-error').fadeOut();
        $('.window-callback').fadeOut();
    });

    $('input').on('focus', function() {
        $(this).removeClass('valid-field invalid-field');
    });
    $('input[type="checkbox"]').on('change', function() {
        $(this).removeClass('valid-field invalid-field');
    });

    var inputTel = $('input[type="tel"]');
    inputTel.mask("+7 ( 999 ) 999 - 99 - 99");
    inputTel.click(function() {
        $(this).focus();
    });

    /*******************************
     ******* slider scripts ********
     ******************************/

    $('.main-slider').slick({
        arrows: false,
        fade: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 6000
    });

});

