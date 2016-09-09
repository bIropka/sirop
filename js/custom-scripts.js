$(document).ready(function () {

    /******************************
     ******* init scripts *********
     ******************************/

    if ($(window).width() < '981'){
        $('nav > ul > li ul').fadeOut();
        $('nav > ul > li p').removeClass('opened');
        $('.custom-select .current-value').removeClass('active');
        $('.custom-select ul').slideUp();
    } else {

    }

    $(window).resize(function(){
        if ($(window).width() < '981'){
            $('nav > ul > li ul').fadeOut();
            $('nav > ul > li p').removeClass('opened');
        } else {

        }
    });

    initCounters();

    function initCounters() {
        var counters = document.getElementsByClassName('dish-counter');
        for (var i = 0; i < counters.length; i++) {
            var amount = parseInt($(counters[i]).find('input').val());
            $(counters[i]).find('.current-value').html(amount);
        }
    }

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

    $('.filter li').click(function() {
        $('.filter .active').removeClass('active');
        $(this).addClass('active');
    });

    $('.dish-counter .control').click(function() {

        var inputValue = parseInt($(this).siblings('label').find('input').val());

        if($(this).hasClass('increment')) {
            inputValue++;
        } else if($(this).hasClass('decrement') && inputValue > 1) {
            inputValue--;
        }

        $(this).siblings('.current-value').html(inputValue);
        $(this).siblings('label').find('input').val(inputValue);

    });

    $('.custom-select').hover(
        function(){
            if ($(window).width() > '980'){
                $(this).find('.current-value').addClass('active');
                $(this).find('ul').stop().slideDown();
            }
        },
    function() {
        if ($(window).width() > '980'){
            $(this).find('.current-value').removeClass('active');
            $(this).find('ul').stop().slideUp();
        }
    });

    $('.custom-select .current-value').click(function() {
        if ($(window).width() < '981'){
            $(this).toggleClass('active');
            $(this).siblings('ul').stop().slideToggle();
        }
    });

    $('.custom-select ul li').click(function() {
        $(this).parents('.custom-select').find('.current-value').removeClass('active');
        $(this).parents('ul').slideUp();
        var value = $(this).html();
        $(this).parent().siblings('.current-value').html(value);
        $(this).parent().next().find('input').val(value);
    });

    $(document).click(function() {

        $target = $(event.target);

        if (!$target.closest($('.custom-select')).length){
            $('.custom-select .current-value').removeClass('active');
            $('.custom-select ul').slideUp();
        }

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

    var customSlider = $('.slider');
    customSlider.slick({
        fade: true,
        autoplay: true,
        autoplaySpeed: 6000
    });

    customSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.slider-dots .active').removeClass('active');
        $('.slider-dots li').eq(nextSlide).addClass('active');
    });

    $('.slider-dots li a').click(function() {
        var newIndex = $(this).parents('li').index();
        customSlider.slick('slickGoTo', newIndex);
        return false;
    });

});

