
if(document.location.host !== "anajustrafederal.org.br" && document.location.host !== "fivenews.anajustra.org.br" ){
	window.location.href = "https://anajustrafederal.org.br" + document.location.pathname;
	console.log( "https://anajustrafederal.org.br" + document.location.pathname);
}


$(".noticia-interna-baixo .col-md-8").addClass("col-md-9");
$(".noticia-interna-baixo .col-md-9").removeClass("col-md-8");
$(".js-unlogged a").attr("href","/porque-se-associar/");

var root = document.documentElement;
root.className += ' js';

function boxTop(idBox) {
	var boxOffset = $(idBox).offset().top;
	return boxOffset;
}

$(document).on("click", ".title-menu-mb", function () {
	$(".dropdown-menu").slideToggle();
});

$(document).ready(function () {

	var behavior = function (val) {
	    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
	},
	options = {
	    onKeyPress: function (val, e, field, options) {
	        field.mask(behavior.apply({}, arguments), options);
	    }
	};
	var controlaMenuDown = function(){
		$(".area-restrita-topo span").removeClass("mopen");
		$(".menu-area-restrita").removeClass("menu-active");
		$(".closeLogin").remove();

		$(".menu-area-restrita").prepend('<div style="width:100%;text-align:right;margin-bottom:10px;font-size:26px;cursor:pointer;margin-top: -17px;margin-left: 19px;" class="closeLogin mopen"><i class="fas fa-times"></i></div>');
		$(".area-restrita-topo span").addClass("mopen");
		$(".menu-area-restrita").addClass("menu-active");
	}

	$(document).on("click", 'div.area-restrita-topo span', function () {
		controlaMenuDown();
	});
	$(document).on("click", 'div.area-restrita-topo .fa-lock', function () {
		controlaMenuDown();
	});
	$(document).on("click", 'div.area-restrita-topo .fa-user-circle', function () {
		controlaMenuDown();
	});
	$(document).on("click", 'div.area-restrita-topo .fa-angle-down', function () {
		controlaMenuDown();
	});

	$(document).on("click", '.mopen', function () {
		$(".area-restrita-topo span").removeClass("mopen");
		$(".menu-area-restrita").removeClass("menu-active");
		$(".closeLogin").remove();
	});

	// $(document).on("click", 'div.area-restrita-topo', function () {
	// 	$(".closeLogin").remove();
	// 	$(".menu-area-restrita").prepend('<div style="width:100%;text-align:right;margin-bottom:10px;font-size:26px;cursor:pointer;margin-top: -17px;margin-left: 19px;" class="closeLogin mopen"><i class="fas fa-times"></i></div>');
	// 	$(".menu-area-restrita").addClass("menu-active");
	// });
	// $("div.closeLogin").click(function () {
	// 	$("div.menu-area-restrita").removeClass("menu-active");
	// 	$(".closeLogin").remove();
	// 	console.log("click closeLogin");
	// });
	// $(document).on("click", '.menu-area-restrita input', function (e) {
	// 	e.preventDefault();
	// 	console.log("click input");
	// });

	$(document).on("click", '#recuperar-senha', function () {
		$(".menu-recuperar-senha").css({"display":"block", "visibility":"initial", "margin-top":"25px"})
		$(".login").css({"display":"none"})
	});

	$(document).on("click", '#back-login', function () {
		$(".menu-recuperar-senha").css({"display":"none", "visibility":"hidden", "margin-top":"0px"})
		$(".login").css({"display":"block"})
	});
	
	$(".open-navbar-left-acesso-rapido").click(function (event) {
        $(".bg-navbar-left").fadeIn('slow');
        $(".navbar-left-acesso-rapido").fadeIn('slow');
	});
	
	$(".close-navbar-left-acesso-rapido").click(function(event) {
		$(".bg-navbar-left").fadeOut('slow');
		$(".navbar-left-acesso-rapido").fadeOut('slow');
	});

    $(".open-navbar-left").click(function (event) {
        $(".bg-navbar-left").fadeIn('slow');
        $(".navbar-left").fadeIn('slow');
	});

	$(".close-navbar-left").click(function(event) {
		$(".bg-navbar-left").fadeOut('slow');
		$(".navbar-left").fadeOut('slow');
	});

	$("#acesso-rapido-convenios").click(function(event) {
		$("#acesso1-mobile").css({"display":"block"})
		$("#acesso2-mobile").css({"display":"none"})
		$("#acesso3-mobile").css({"display":"none"})
		$("#acesso4-mobile").css({"display":"none"})
		$("#acesso5-mobile").css({"display":"none"})
		$("#acesso6-mobile").css({"display":"none"})
		$("#acesso7-mobile").css({"display":"none"})		
		$("navbar-left-acesso-rapido").fadeOut('slow')
	});

	$("#acesso-rapido-acoes").click(function(event) {
		$("#acesso1-mobile").css({"display":"none"})
		$("#acesso2-mobile").css({"display":"block"})
		$("#acesso3-mobile").css({"display":"none"})
		$("#acesso4-mobile").css({"display":"none"})
		$("#acesso5-mobile").css({"display":"none"})
		$("#acesso6-mobile").css({"display":"none"})
		$("#acesso7-mobile").css({"display":"none"})
		$(".navbar-left-acesso-rapido").fadeOut('slow');
	});

	$("#acesso-rapido-corretora").click(function(event) {
		$("#acesso1-mobile").css({"display":"none"})
		$("#acesso2-mobile").css({"display":"none"})
		$("#acesso3-mobile").css({"display":"block"})
		$("#acesso4-mobile").css({"display":"none"})
		$("#acesso5-mobile").css({"display":"none"})
		$("#acesso6-mobile").css({"display":"none"})
		$("#acesso7-mobile").css({"display":"none"})
		$(".navbar-left-acesso-rapido").fadeOut('slow');
	});

	$("#acesso-rapido-bem-viver").click(function(event) {
		$("#acesso1-mobile").css({"display":"none"})
		$("#acesso2-mobile").css({"display":"none"})
		$("#acesso3-mobile").css({"display":"none"})
		$("#acesso4-mobile").css({"display":"block"})
		$("#acesso5-mobile").css({"display":"none"})
		$("#acesso6-mobile").css({"display":"none"})
		$("#acesso7-mobile").css({"display":"none"})
		$(".navbar-left-acesso-rapido").fadeOut('slow');
	});

	$("#acesso-rapido-pro-saude").click(function(event) {
		$("#acesso1-mobile").css({"display":"none"})
		$("#acesso2-mobile").css({"display":"none"})
		$("#acesso3-mobile").css({"display":"none"})
		$("#acesso4-mobile").css({"display":"none"})
		$("#acesso5-mobile").css({"display":"block"})
		$("#acesso6-mobile").css({"display":"none"})
		$("#acesso7-mobile").css({"display":"none"})
		$(".navbar-left-acesso-rapido").fadeOut('slow');
	});

	$("#acesso-rapido-consultoria-financeira").click(function(event) {
		$("#acesso1-mobile").css({"display":"none"})
		$("#acesso2-mobile").css({"display":"none"})
		$("#acesso3-mobile").css({"display":"none"})
		$("#acesso4-mobile").css({"display":"none"})
		$("#acesso5-mobile").css({"display":"none"})
		$("#acesso6-mobile").css({"display":"block"})
		$("#acesso7-mobile").css({"display":"none"})
		$(".navbar-left-acesso-rapido").fadeOut('slow');
	});

	$("#acesso-rapido-espaco-cultural").click(function(event) {
		$("#acesso1-mobile").css({"display":"none"})
		$("#acesso2-mobile").css({"display":"none"})
		$("#acesso3-mobile").css({"display":"none"})
		$("#acesso4-mobile").css({"display":"none"})
		$("#acesso5-mobile").css({"display":"none"})
		$("#acesso6-mobile").css({"display":"none"})
		$("#acesso7-mobile").css({"display":"block"})
		$(".navbar-left-acesso-rapido").fadeOut('slow');
	});

	$(".abrir-submenu").click(function(e) {
		e.preventDefault();
		$(this).next().slideToggle('slow');
	});

	if($(window).width() > 768) {
		$('.bg-acesso-rapido-mobile').css({"display":"none"})
		$('.bg-acesso-rapido').css({"display":"block"})
	} else {
		$('.bg-acesso-rapido-mobile').css({"display":"block"})
		$('.bg-acesso-rapido').css({"display":"none"})
	}	

	$('.telefone').mask(behavior, options);

	$(".cep").mask("99999-999");

	$(".data").mask("99/99/9999");

	$(".validade").mask("99/9999");

	var options = {
		onKeyPress : function(cpfcnpj, e, field, options) {
			var masks = ['000.000.000-000', '00.000.000/0000-00'];
			var mask = (cpfcnpj.length > 14) ? masks[1] : masks[0];
			$('.cpfcnpj').mask(mask, options);
		}
	};

	$('.cpfcnpj').mask('000.000.000-000', options);
	$('.cpfLogin').mask('000.000.000-00');

	//enviar formulario de contato
	$("#enviarContato").click(function(e){
		e.preventDefault();
		$.post("", $("#formContato").serialize(),function(EnviarForm){
			complete:$("#retornoContato").html(EnviarForm);
		});
	});

	$(".abre-busca").click(function(event) {
		$("#box-search").show('slow');
	});

	$(".close-search").click(function(event) {
		$("#box-search").hide('slow');
	});

	$(".scroll-menu").click(function(e){
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
	        loop: true,
	        slideBy: 1,
	        autoplay: true,
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
		$("#acesso"+div).removeClass('collapse');
	});

	$(".abre-acesso-mobile").mouseover(function(e) {
		e.preventDefault();
		var div = $(this).attr('data-acesso');
		$(".abre-acesso-mobile").removeClass('acesso-ativo');
		$(this).addClass('acesso-ativo');
		$(".acesso-individual").addClass('collapse');
		$("#acesso"+div).removeClass('collapse');
	});	

	$(".abre-acesso-mobile").click(function(e) {
		e.preventDefault();
		var div = $(this).attr('data-acesso');
		$(".abre-acesso-mobile").removeClass('acesso-ativo');
		$(this).addClass('acesso-ativo');
		$(".acesso-individual").addClass('collapse');
		$("#acesso"+div).removeClass('collapse');
	});

	$(".abre-acesso").mouseover(function(e) {
		e.preventDefault();
		var div = $(this).attr('data-acesso');
		$(".abre-acesso").removeClass('acesso-ativo');
		$(this).addClass('acesso-ativo');
		$(".acesso-individual").addClass('collapse');
		$("#acesso"+div).removeClass('collapse');
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
	            }, 768: {
	                items: 2
	            }, 990: {
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
	            }, 768: {
	                items: 2
	            }, 990: {
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

$(window).on("load", function (e){
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


$.get("https://www.anajustra.org.br/api/convenios/destaques-saude.ashx", {
}).success(function (result) {
	var jsonResult = JSON.parse(result)
	console.log(jsonResult)
	jsonResult.map(index => {
		var html = `<div id="plano-individual">
				<a href="${index.LINK}">
				<div style="width: 150px;min-height: 150px;background-image: url(${index.IMAGEM});background-repeat:no-repeat;background-position:center;box-shadow: 0 2px 3px 1px rgba(0,0,0,0.15);margin: 10px;text-align: center;padding: 20px 30px 10px;">                                                      
				</div>
				<p style="padding: 20px;color:#707070;text-align: center;">${index.DESCRICAO}</p>
				</a>
			</div>`
		$('#owl-planos').append(html)
	})
});       

///Global site tag (gtag.js) - Google Analytics -->
$.getScript('https://www.googletagmanager.com/gtag/js?id=G-DPRLYJTH2X', function()
{
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
  
	gtag('config', 'G-DPRLYJTH2X');
});