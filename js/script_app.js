$(".noticia-interna-baixo .col-md-8").addClass("col-md-9");
$(".noticia-interna-baixo .col-md-9").removeClass("col-md-8");

var root = document.documentElement;
root.className += ' js';

function boxTop(idBox) {
    var boxOffset = $(idBox).offset().top;
    return boxOffset;
}

$(document).ready(function() {

    var behavior = function(val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        options = {
            onKeyPress: function(val, e, field, options) {
                field.mask(behavior.apply({}, arguments), options);
            }
        };

    $(document).on("click", '.area-restrita-topo', function() {
        $(".login").addClass("menu-active");
        $(".menu-area-restrita").addClass("menu-active");
    });

    $(document).on("click", '#recuperar-senha', function() {
        $(".menu-recuperar-senha").css({ "display": "block", "visibility": "initial", "margin-top": "25px" })
        $(".login").css({ "display": "none" })
    });

    $(document).on("click", '#back-login', function() {
        $(".menu-recuperar-senha").css({ "display": "none", "visibility": "hidden", "margin-top": "25px" })
        $(".login").css({ "display": "block" })
    });

    $(".open-navbar-left-acesso-rapido").click(function(event) {
        $(".bg-navbar-left").fadeIn('slow');
        $(".navbar-left-acesso-rapido").fadeIn('slow');
    });

    $(".close-navbar-left-acesso-rapido").click(function(event) {
        $(".bg-navbar-left").fadeOut('slow');
        $(".navbar-left-acesso-rapido").fadeOut('slow');
    });

    $(".open-navbar-left").click(function(event) {
        $(".bg-navbar-left").fadeIn('slow');
        $(".navbar-left").fadeIn('slow');
    });

    $(".close-navbar-left").click(function(event) {
        $(".bg-navbar-left").fadeOut('slow');
        $(".navbar-left").fadeOut('slow');
    });

    $(document).on("click", '.abrir-submenu', function(e) {
        e.preventDefault();
        $(this).next().addClass("menu-active");
    });


    $('.telefone').mask(behavior, options);

    $(".cep").mask("99999-999");

    $(".data").mask("99/99/9999");

    $(".validade").mask("99/9999");

    var options = {
        onKeyPress: function(cpfcnpj, e, field, options) {
            var masks = ['000.000.000-000', '00.000.000/0000-00'];
            var mask = (cpfcnpj.length > 14) ? masks[1] : masks[0];
            $('.cpfcnpj').mask(mask, options);
        }
    };

    $('.cpfcnpj').mask('000.000.000-000', options);
    $('.cpfLogin').mask('000.000.000-00');

    //enviar formulario de contato
    $("#enviarContato").click(function(e) {
        e.preventDefault();
        $.post("", $("#formContato").serialize(), function(EnviarForm) {
            complete: $("#retornoContato").html(EnviarForm);
        });
    });

    $(".abre-busca").click(function(event) {
        $("#box-search").show('slow');
    });

    $(".close-search").click(function(event) {
        $("#box-search").hide('slow');
    });

    $(".scroll-menu").click(function(e) {
        e.preventDefault();
        var target = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $(target).offset().top - 50
        }, 1000);
    });

    if ($('#owl-artigos-home').length) {
        var owl = $('#owl-artigos-home');
        owl.owlCarousel({
            nav: true,
            loop: false,
            slideBy: 1,
            autoplay: false,
            margin: 0,
            items: 1
        });
    }

    $(".abre-acesso").click(function(e) {
        e.preventDefault();
        var div = $(this).attr('data-acesso');
        $(".abre-acesso").removeClass('acesso-ativo');
        $(this).addClass('acesso-ativo');
        $(".acesso-individual").addClass('collapse');
        $("#acesso" + div).removeClass('collapse');
    });

    $(".abre-acesso").mouseover(function(e) {
        e.preventDefault();
        var div = $(this).attr('data-acesso');
        $(".abre-acesso").removeClass('acesso-ativo');
        $(this).addClass('acesso-ativo');
        $(".acesso-individual").addClass('collapse');
        $("#acesso" + div).removeClass('collapse');
    });

    $(".abre-acesso-mobile").click(function(e) {
        e.preventDefault();
        var div = $(this).attr('data-acesso');
        $(".abre-acesso-mobile").removeClass('acesso-ativo');
        $(this).addClass('acesso-ativo');
        $(".acesso-individual").addClass('collapse');
        $("#acesso" + div).removeClass('collapse');
    });

    $(".abre-acesso-mobile").mouseover(function(e) {
        e.preventDefault();
        var div = $(this).attr('data-acesso');
        $(".abre-acesso-mobile").removeClass('acesso-ativo');
        $(this).addClass('acesso-ativo');
        $(".acesso-individual").addClass('collapse');
        $("#acesso" + div).removeClass('collapse');
    });

    if ($('#slider').length) {
        $('#slider').sliderPro({
            width: 910,
            height: 550,
            fade: true,
            arrows: true,
            buttons: false,
            fullScreen: true,
            smallSize: 500,
            mediumSize: 1000,
            largeSize: 3000,
            thumbnailArrows: false,
            autoplay: true
        });
    }

    if ($('#owl-planos').length) {
        var owl = $('#owl-planos');
        owl.owlCarousel({
            nav: true,
            loop: true,
            slideBy: 1,
            autoplay: false,
            margin: 0,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                990: {
                    items: 3
                }
            }
        });
    }

    if ($('#owl-acoes-bemviver').length) {
        var owl = $('#owl-acoes-bemviver');
        owl.owlCarousel({
            nav: true,
            loop: false,
            slideBy: 1,
            autoplay: false,
            margin: 0,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                990: {
                    items: 3
                }
            }
        });
    }

    if ($('#owl-depoimentos-bemviver').length) {
        var owl = $('#owl-depoimentos-bemviver');
        owl.owlCarousel({
            nav: true,
            loop: false,
            slideBy: 1,
            autoplay: false,
            margin: 0,
            items: 1
        });
    }
});

$(window).on("load", function(e) {
    var $target = $('.anime'),
        animationClass = 'animacaoAtiva',
        windowHeight = $(window).height(),
        offset = windowHeight;

    function animeScroll() {
        var documentTop = $(document).scrollTop();
        $target.each(function() {
            if (documentTop > boxTop(this) - offset) {
                $(this).addClass(animationClass);
            }
        });
    }
    animeScroll();

    $(document).scroll(function() {
        animeScroll();
    });
});

///Global site tag (gtag.js) - Google Analytics -->
$.getScript('https://www.googletagmanager.com/gtag/js?id=G-DPRLYJTH2X', function() {
    window.dataLayer = window.dataLayer || [];

    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'G-DPRLYJTH2X');
});

$.getScript('https://www.googletagmanager.com/gtag/js?id=AW-764404410', function() {
    window.dataLayer = window.dataLayer || [];

    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'AW-764404410');
});