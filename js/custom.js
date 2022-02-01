var DateF = DateF || {};
DateF = {
	init: function () { },
	monthNames: [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro"
	],
	dayOfWeekNames: [
		"Domingo",
		"Segunda",
		"Terça",
		"Quarta",
		"Quinta",
		"Sexta",
		"Sábado"
	],
	formatDate: function (datefull, patternStr) {
		date = new Date(datefull);
		if (!patternStr) {
			patternStr = "M/d/yyyy";
		}
		var day = date.getDate(),
			month = date.getMonth(),
			year = date.getFullYear(),
			hour = date.getHours(),
			minute = date.getMinutes(),
			second = date.getSeconds(),
			miliseconds = date.getMilliseconds(),
			h = hour % 12,
			hh = this.twoDigitPad(h),
			HH = this.twoDigitPad(hour),
			mm = this.twoDigitPad(minute),
			ss = this.twoDigitPad(second),
			aaa = hour < 12 ? "AM" : "PM",
			EEEE = this.dayOfWeekNames[date.getDay()],
			EEE = (typeof EEEE === "undefined") ? null : EEEE.substr(0, 3),
			dd = this.twoDigitPad(day),
			M = month + 1,
			MM = this.twoDigitPad(M),
			MMMM = this.monthNames[month],
			MMM = (typeof MMMM === "undefined") ? null : MMMM.substr(0, 3),
			yyyy = year + "",
			yy = (typeof yyyy === "undefined") ? null : yyyy.substr(2, 2);
		return patternStr
			.replace("hh", hh)
			.replace("h", h)
			.replace("HH", HH)
			.replace("H", hour)
			.replace("mm", mm)
			.replace("m", minute)
			.replace("ss", ss)
			.replace("s", second)
			.replace("S", miliseconds)
			.replace("dd", dd)
			.replace("d", day)
			.replace("MMMM", MMMM)
			.replace("MMM", MMM)
			.replace("MM", MM)
			.replace("M", M)
			.replace("EEEE", EEEE)
			.replace("EEE", EEE)
			.replace("yyyy", yyyy)
			.replace("yy", yy)
			.replace("aaa", aaa);
	},
	twoDigitPad: function (num) {
		return num < 10 ? "0" + num : num;
	},
	removeAccents: function (str) {
		var aux = str;
		var accents = {
			a: /[\xE0-\xE6]/g,
			A: /[\xC0-\xC6]/g,
			e: /[\xE8-\xEB]/g,
			E: /[\xC8-\xCB]/g,
			i: /[\xEC-\xEF]/g,
			I: /[\xCC-\xCF]/g,
			o: /[\xF2-\xF6]/g,
			O: /[\xD2-\xD6]/g,
			u: /[\xF9-\xFC]/g,
			U: /[\xD9-\xDC]/g,
			c: /\xE7/g,
			C: /\xC7/g,
			n: /\xF1/g,
			N: /\xD1/g
		};
		for (var letter in accents) {
			var reg = accents[letter];
			aux = aux.replace(reg, letter);
		}
		return aux;
	},
	encode_utf8: function (s) {
		return unescape(encodeURIComponent(s));
	},
	decode_utf8: function (s) {
		return decodeURIComponent(escape(s));
	},
};

function paginacao() {
	var vermais = document.getElementsByClassName('lista-noticias-btn');
	if (vermais.length > 0)
		for (var i in vermais)
			if (typeof vermais[i] == 'object') {
				var _idSesit = vermais[i].getAttribute('data-sesit'),
					_listBox = document.getElementById('lista-noticias-sesit-' + _idSesit) || null;
				if (_listBox && _listBox.innerText.length == 0) {
					vermais[i].remove();
				} else {
					vermais[i].addEventListener('click', function (event) {
						var btn = this,
							site = btn.getAttribute('data-site'),
							sesit = btn.getAttribute('data-sesit'),
							p = btn.getAttribute('data-page'),
							base = window.location.origin,
							router = "/webparts/",
							xhttp = new XMLHttpRequest();
						btn.text = 'carregando...';
						xhttp.onreadystatechange = function () {
							if (this.readyState == 4 && this.status == 200) {
								var strId = "lista-noticias-sesit-" + sesit,
									texto = document.getElementById(strId).innerHTML;
								texto = texto + this.responseText;
								document.getElementById(strId).innerHTML = texto;
								if (texto && texto.length < 26) {
									btn.remove();
								}
							}
							//else {
							//	btn.remove();
							//}
							btn.text = 'Veja mais';
						};
						var url = base + "/index.php?router=" + router + "&site=" + site + "&sesit=" + sesit + "&p=" + p;
						xhttp.open("GET", url, true);
						xhttp.send();
						this.setAttribute('data-page', ++p);
					});
				}
			}

}

$(document).ready(function () {
	var urlPortal = ""; //window.location.origin;
	var iFrameDetection = !(window === window.parent);

	$(".loadMore")
		.off()
		.on("click", function () {
			var btn = $(this);
			var page = parseInt($(this).attr("data-page"));
			var site = parseInt($(this).attr("data-site"));
			var sesit = parseInt($(this).attr("data-sesit"));

			btn.addClass("loading-load");
			$.ajax({
				url: window.location.origin + "/webparts/" + site + "/" + sesit + "/?p=" + page,

				success: function (html) {
					btn.removeClass("loading-load");
					//Verificar o tamanho do HTML para poder definir quando remover o botão
					if (html.length <= 76) btn.remove();
					else {
						btn.attr("data-page", parseInt(page) + 1);
						btn
							.parent()
							.prev()
							.append(html);
					}
				}
			}).fail(function () {
				console.log("error");
			});
		});
	function ultimas() {
		var request = new XMLHttpRequest();
		var dataUrl = jQuery(".json_ultimas").attr("data-url");
		if (typeof dataUrl == 'undefined') return null;
		url = urlPortal + dataUrl;
		if (typeof window.parent.FiveliveUtil == "object") return null;

		if (typeof FiveliveUtil != "object") {
			try {
				request.open("GET", url, true);
				request.onload = function () {
					if (this.status >= 200 && this.status < 400) {
						var json = JSON.parse(this.responseText.replace("<!-- PORTAL:FINISH -->", ""));
						itens = json;
						if (typeof json == "string") {
							itens = JSON.parse(json);
						}
						var materias = itens["matia"];
						var html;


						html += `<h3 class="titulo-menor">ÚLTIMAS NOTÍCIAS</h3>`;

						for (i in materias) {
							materias[i].dt_matia_publi = materias[i].dt_matia_publi.replace(/\s+/g, 'T');
							html += `<div class="chamada-noticia-individual">
										<a href="`+ materias[i].url + `"><h3>` + materias[i].title + `</h3></a>
										<span>`+ DateF.formatDate(materias[i].dt_matia_publi, "dd/MM/yyyy") + `</span> <a href="` + materias[i].url + `" class="text-uppercase">` + materias[i].channel + `</a>
									</div>`;


						}
						html += `<div><a href="/noticias">VER TODAS</a></div>`;
						jQuery(".json_ultimas_itens").html(
							html.replace("undefined", "").replace("null", "")
						);
					} else {
						console.log('this.response2');
					}
				};

				request.onerror = function () {
					console.log('this.response3');
				};

				request.send();
			} catch (error) {
				console.error(error);
			}
		}
	}
	ultimas();

	function maislidas() {
		var request = new XMLHttpRequest();
		var dataUrl = jQuery(".json_ultimas").attr("data-url");
		if (typeof dataUrl == 'undefined') return null;
		if (typeof window.parent.FiveliveUtil == "object") return null;
		url = urlPortal + dataUrl;
		request.open("GET", url, true);

		request.onload = function () {
			if (this.status >= 200 && this.status < 400) {
				var json = JSON.parse(this.responseText.replace("<!-- PORTAL:FINISH -->", ""));
				itens = json;
				if (typeof json == "string") {
					itens = JSON.parse(json);
				}
				var materias = itens["matia"];
				var html;

				html += `<div class="penci-block-heading"><h3 class="penci-block__title"><a href="/noticias/florida">Florida</a></h3></div>
					<div id="penci_block_6__27957343block_content" class="penci-block_content">
						<div class="penci-block_content__items penci-block-items__1">`;

				for (i in materias) {
					materias[i].dt_matia_publi = materias[i].dt_matia_publi.replace(/\s+/g, 'T');




					html += `<article class="hentry penci-post-item">
								<div class="penci_media_object ">
								`
					materias[i].img = materias[i].images['125x94'];
					if (materias[i].img != undefined) {
						html += `<a class="penci-image-holder  penci-lazy penci_mobj__img penci-image_has_icon" data-src="` + materias[i].img + `" data-delay="" href="` + materias[i].title + `" style="display: block; background-image: url('` + materias[i].img + `');" title="` + materias[i].title + `"></a>`;
					}
					html += `<div class="penci_post_content penci_mobj__body">									
										
										<h3 class="penci__post-title entry-title"><a href="`+ materias[i].url + `" title="` + materias[i].title + `">` + materias[i].title + `</a></h3>
										
										<div class="penci-schema-markup"><span class="author vcard"><a class="url fn n" href="http://pennews.pencidesign.com/author/admin/">Penci Design</a></span>
											<time class="entry-date published" datetime="2017-07-11T07:14:36+00:00">`+ DateF.formatDate(materias[i].dt_matia_publi, "dd/MM") + `</time>
											<time class="updated" datetime="2018-01-24T01:49:54+00:00">January 24, 2018</time>
										</div>
										
										<div class="penci_post-meta">
											<span class="entry-meta-item penci-posted-on"><i class="fa fa-clock-o"></i>
											<time class="entry-date published" datetime="2017-07-11T07:14:36+00:00">`+ DateF.formatDate(materias[i].dt_matia_publi, "dd/MM") + `</time>
											<time class="updated" datetime="2018-01-24T01:49:54+00:00">January 24, 2018</time>
											</span>
											<span class="entry-meta-item penci-comment-count">
												<a class="penci_pmeta-link" href="`+ materias[i].url + `/#comments"><i class="la la-comments"></i>3 </a>
											</span>
										</div>
										
									</div>
								</div>
							</article>`;


					if (materias[i].img != undefined) {
						materias[i].img;
					}
					materias[i].url;
					materias[i].title;
					DateF.formatDate(materias[i].dt_matia_publi, "dd/MM");
					DateF.formatDate(materias[i].dt_matia_publi, "HH:mm");

				}

				html += `	</div>
					</div>
					<div class="penci-pagination penci-ajax-more ">
						<a href="/noticias/florida" class="penci-block-ajax-more-button button"> <span class="ajax-more-text">Veja mais</span><span class="ajaxdot"></span></a>
					</div>`;

				jQuery(".json_maislidas_itens").html(
					html.replace("undefined", "").replace("null", "")
				);
			} else {
				console.log('this.response2');
			}
		};

		request.onerror = function () {
			console.log('this.response3');
		};

		request.send();
	}
	maislidas();


	function galeriadefotos() {
		var request = new XMLHttpRequest();
		url = urlPortal + jQuery(".json_galeriadefotos").attr("data-url");
		request.open("GET", url, true);

		request.onload = function () {
			if (this.status >= 200 && this.status < 400) {
				var json = JSON.parse(this.responseText.replace("<!-- PORTAL:FINISH -->", ""));
				itens = json;
				if (typeof json == "string") {
					itens = JSON.parse(json);
				}
				var materias = itens["matia"];
				var html;
				for (i in materias) {
					if (materias[i].images['x'] != undefined) {
						html += '<a href="' + materias[i].url + '" title="' + materias[i].title + '"><img class="image_fade" src="' + materias[i].images['300x225'] + '" alt="' + materias[i].title + '"></a>';
					}
				}
				jQuery(".json_galeriadefotos_itens").html(
					html.replace("undefined", "").replace("null", "")
				);
			} else {
				console.log('this.response2');
			}
		};

		request.onerror = function () {
			console.log('this.response3');
		};

		request.send();
	}

	if (jQuery(".json_galeriadefotos").length > 0)
		galeriadefotos();

	function relacionadas() {
		var request = new XMLHttpRequest();
		url = jQuery(".json_relacionadas").attr("data-url");
		request.open("GET", url, true);

		request.onload = function () {
			if (this.status >= 200 && this.status < 400) {
				var json = JSON.parse(this.responseText.replace("<!-- PORTAL:FINISH -->", ""));
				itens = json;
				if (typeof json == "string") {
					itens = JSON.parse(json);
				}
				var materias = itens;
				var html = "";


				html += '<div class="penci-inline-related-posts penci-irp-type-grid penci-irp-align-none ">';
				html += '		<div class="penci-irp-heading"><span>Relacionadas</span></div>';
				html += '		<ul>';

				for (i in materias) {
					materias[i].dt_matia_publi = materias[i].dt_matia_publi.replace(/\s+/g, 'T');
					if (materias[i].img == "")
						materias[i].img = "/_midias/png/2020/04/29/300x225/1_logo-1055.png";
					else {
						var img = materias[i].img;
						img = img.replace(/(.*\/)/ig, '$1300x225/1_');
						materias[i].img = img;
					}


					html += '<li class="penci-post-item penci-imgtype-landscape">';
					html += '	<div class="penci_media_object ">';
					html += '		<div class="penci_mobj__img">';
					html += '			<a class="penci-image-holder  penci-lazy" style="display: block; background-image:url(\'' + materias[i].img + '\');" data-src="' + materias[i].img + '" data-delay="" href="' + materias[i].url + '" title="' + materias[i].title + '"></a>';
					html += '		</div>';
					html += '		<div class="penci_post_content penci_mobj__body">';
					html += '			<div class="penci__post-title-wrapper"><a class="penci__post-title" href="' + materias[i].url + '">' + materias[i].title + '</a></div>';
					html += '			<div class="penci_post-meta"><span class="entry-meta-item penci-posted-on"><i class="fa fa-clock-o"></i><time class="entry-date published" datetime="">' + DateF.formatDate(materias[i].dt_matia_publi, "dd/MM") + ' ' + DateF.formatDate(materias[i].dt_matia_publi, "HH:mm") + '</time></span><span class="entry-meta-item penci-post-countview penci_post-meta_item"><i class="fa fa-eye"></i><span class="penci-post-countview-number penci-post-countview-p1990">0</span></span>';
					html += '			</div>';
					html += '		</div>';
					html += '	</div>';
					html += '</li>';

				}


				html += '</ul>';
				html += '	</div>';


				html = html.replace(/undefined/g, "").replace(/null/g, "");
				jQuery(".json_relacionadas_itens").html(html);

			} else {
				console.log('this.response2');
			}
		};

		request.onerror = function () {
			console.log('this.response3');
		};

		request.send();
	}

	if (jQuery(".json_relacionadas").length > 0) {
		relacionadas();

		//leia mais

	}

	const params = new URLSearchParams(window.location.search)
	if (params.has('v') && typeof window.parent.FiveliveUtil != "object") {
		var jq = jQuery(".js-video");
		console.log(jq);
		jq.find("iframe").attr("src", "//www.youtube.com/embed/" + params.get('v') + "?autoplay=1&amp;rel=1&amp;showinfo=1&amp;controls=1");
		//jq.show();
	}
	//else 
	//	jQuery(".js-video").show();

	function instaJson(jqi) {
		var request = new XMLHttpRequest();
		url = jqi.attr("data-url");
		if (typeof window.parent.FiveliveUtil == "object") return null;
		try {
			if (typeof FiveliveUtil == "object") return null;
			request.open("GET", url, true);

			request.onload = function () {
				if (this.status >= 200 && this.status < 400) {
					var json = JSON.parse(this.responseText.replace("<!-- PORTAL:FINISH -->", ""));
					itens = json;
					if (typeof json == "string") {
						itens = JSON.parse(json);
					}
					var materias = itens.data;
					var html = "";

					for (i in materias) {
						if (i <= 3) {
							html += '<a href="' + materias[i].permalink + '" target="_blank" class="imagem-instagram">';

							if (materias[i].media_url.includes('.mp4')) {
								html += '	<img style="object-fit: cover; aspect-ratio: 1/1; height: 356px; width: 356px;" src="' + materias[i].thumbnail_url + '" alt="">';
								html += '	<svg style="position: absolute;fill: white;height: 23px;width: 23px;margin-top: 10px;left: ' + (((parseInt(i) + 1) * 25) - 2) + '%;" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="163.861px" height="163.861px" viewBox="0 0 163.861 163.861" xml:space="preserve"><path d="M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z"></path></svg>';
							} else {
								html += '	<img style="object-fit: cover; height: 356px; width: 356px;" src="' + materias[i].media_url + '" alt="">';
							}

							html += '</a>';
						}
					}

					html = html.replace(/undefined/g, "").replace(/null/g, "");
					jqi.html(html);

				} else {
					console.log('this.response2');
				}
			};

			request.onerror = function () {
				console.log('this.response3');
			};

			request.send();
		} catch (error) {
			console.error(error);
		}
	}
	var jqinsta;
	if ((jqinsta = jQuery('.insta-json')).length > 0)
		instaJson(jqinsta);
	//Ver Mais	
	paginacao();
	if ((ultimaMateria = jQuery('#ultimas-materia')).length > 0) {
		var ultFile = window.location.origin + ultimaMateria.attr('data-url'),
			request = new XMLHttpRequest();
		request.open("GET", ultFile, true);
		request.onload = function () {
			if (this.status >= 200 && this.status < 400) {
				var json = JSON.parse(this.responseText.replace("<!-- PORTAL:FINISH -->", "")),
					html = "";
				itens = json;
				if (typeof json == "string") {
					itens = JSON.parse(json);
				}
				for (const i in itens.matia) {
					var { url, title, channel } = itens.matia[i];
					html += `
					<a href="${url}" class="espaco-individual-baixo">
						<span class="categoria-noticia">${channel}</span>
						${title}
					</a>
					<hr />`;
				}
				//html+=`<div style="font-size: 14px;"><a href="/noticias">VER TODAS</a></div>`;
				ultimaMateria.append(html);
			} else {
				console.log('this.response2');
			}
		};

		request.onerror = function () {
			console.log('this.response3');
		};

		request.send();
	}
	if ((convenios = jQuery('#informacoes-convenios-lista')).length > 0) {
		var urlConvenios = "https://www.anajustrafederal.org.br/api/convenios/top10.ashx",
			request = new XMLHttpRequest();
		request.open("GET", urlConvenios, true);
		request.onload = function () {
			if (this.status >= 200 && this.status < 400) {
				var json = JSON.parse(this.responseText.replace("<!-- PORTAL:FINISH -->", "")),
					html = "", count = 0;
				itens = json;
				if (typeof json == "string") {
					itens = JSON.parse(json);
				}
				for (const i in itens) {
					var { DESCRICAO, IMAGEM, LINK } = itens[i],

					// var { TITULO, DESCONTO, LINK } = itens[i],
						_LINK = (LINK == '#') ? 'https://anajustrabeneficios.com.br/' : LINK;

					// html += `
					// 		<div class="col-xs-4 d-flex espaco-banner">
					// 			<div class="col-xs-4 d-flex">
					// 				<span class="nome-convenio">${TITULO}</span>
					// 			</div>
					// 			<div style="width: 100%"></div>
					// 			<div class="col-xs-8 d-flex ">
					// 				<div class="categoria-convenio categoria-convenio-top">${DESCONTO}</div>
					// 			</div>
					// 		</div>
					// 		<hr>`;


					html += `
					<div class="col-lg-3 col-6 informacoes-convenio-individual">
						<a href="${_LINK}" target="_blank">
							<div class="img-informacao-individual">
								<img src="${IMAGEM}" alt="Convênio" title="Convênio">
							</div>
							<p>${DESCRICAO}</p>
						</a>
					</div>`;

					if (count >= 3) break;
					count++;
				}
				convenios.append(html);
			} else {
				console.log('convenios');
			}
		};
		request.onerror = function () {
			console.log('convenios');
		};

		request.send();
	}

	$.getJSON("https://www.anajustrafederal.org.br/api/convenios/top10.ashx", function (data) {
		html = "";
		classe = "";
		for (const i in data) {

			if (i !== 0) {
				classe = "is-hidden";
			}

			var { DESCRICAO, IMAGEM, LINK, POSICAO } = data[i],
				_LINK = (LINK == '#') ? 'https://anajustrabeneficios.com.br/' : LINK;
			html += `<div class="simple-slider_item ${classe}">
                <a href="${LINK}" target="_blank"><img src="${IMAGEM}" width="150"></a>
            </div>`;
		}
		$('#top10Convenios').append(html);

	});


	$('.area-restrita-topo svg').click(function (event) {
		event.preventDefault();
		//alert('Área restrita');
		//$(".login").addClass("menu-active"); $(".menu-area-restrita").addClass("menu-active");
	});

	if (document.location.pathname === "/" || document.location.pathname === "/index.html") {
		function simpleSlider() {
			var options = arguments[0] || {};
			var sliderSelector = options.selector || '.js-simple-slider';
			var sliderHiddenClass = options.classHidden || 'is-hidden';
			var sliderInterval = options.interval || 3000;

			var slider = document.querySelector(sliderSelector);
			var slidesCount = slider.children.length;
			var i = 0;

			setInterval(function () {
				slider.children[i].classList.add(sliderHiddenClass);
				i++;
				if (i >= slider.children.length) { i = 0; }
				slider.children[i].classList.remove(sliderHiddenClass);
			}, sliderInterval);

		};
		simpleSlider();
	}

});



