var fnAnajustra = {
    init: () => this.fnAnajustra.buscar(), 
    permutas: null,
    buscar: params => {
        var url = window.location.origin, view = "/permuta-e-redistribuicao/listar/";
        jQuery.ajax({
            url: url + "/index.php",
            type: 'GET',
            data:  {...params || [], id: view} ,
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: response => {
                if(params && params.editar == true)
                    this.fnAnajustra.loadHtmlEditais(response);
                else
                    this.fnAnajustra.loadHtml(response);
            },
            error: () => console.error("ajax")
        });
    },
    loadHtml: data => { 
        var json = (typeof data == "string")?JSON.parse(data):data;
        for (i in json) {  
            var cl = $('#permuta-individual-modelo').clone()
            cl.removeAttr('id').removeClass('esconder-item'),
            aux = cl,
            {
                ds_anaju_pered_nome:nome, ds_anaju_cargo:cargo, ds_estdo, ds_anaju_lotac, 
                ds_anaju_pered_tel, ds_anaju_pered_email,ds_anaju_pered_mensg:msg,estdo,
                orgao,dt_anaju_pered_create,id_anaju_pered_permuta:isPermuta,id_anaju_pered_redistri:isRedistribuicao
            } = json[i],
            origem = `<i class="fas fa-map-marker-alt"></i><strong>Está em:</strong> ${ds_estdo}<br /><strong>Lotação de origem:</strong> ${ds_anaju_lotac}`,
            info = `<i class="fas fa-user"></i><strong>Informações de contato</strong><br />Telefone: ${ds_anaju_pered_tel}<br />E-mail: ${ds_anaju_pered_email}`,
            mensagem = `<i class="fas fa-comment"></i>${msg}`,
            estados = "", orgaos = "", destino = "", publicacao = new Date(dt_anaju_pered_create),
            format_publi = this.fnAnajustra.zeroPad(publicacao.getDate(),2) + "/" + this.fnAnajustra.zeroPad(publicacao.getMonth() + 1, 2) + "/" + publicacao.getFullYear()  + " " + this.fnAnajustra.zeroPad(publicacao.getHours(),2) + ":" + this.fnAnajustra.zeroPad(publicacao.getMinutes(),2); 
            if(isPermuta == '1')
                aux.addClass('item-permuta');
            if(isRedistribuicao == '1')
                aux.addClass('item-redistribuicao');
            if(estdo && estdo.length > 0)
                for (j in estdo) 
                    estados += (j > 0 ? ", " : "") + estdo[j].ds_estdo;
            if(orgao && orgao.length > 0) 
                for (k in orgao) 
                    orgaos += (k > 0 ? ", " : "") + orgao[k].ds_anaju_orgao;
            destino = `<i class="fas fa-phone"></i><strong>Quer ir para:</strong> ${estados}<br /><strong>Lotação destino:</strong> ${orgaos}`;
            aux.find('.pered-nome').text(nome);
            aux.find('.pered-cargo').text(cargo);
            aux.find('.pered-origem').html(origem);
            aux.find('.pered-destino').html(destino);
            aux.find('.pered-infos').html(info);
            aux.find('.pered-msg').html(mensagem);
            aux.find('.pared-publi').text(`Publicado em: ${format_publi}`);
            
            $('#permuta-lista').append(aux);
        }
    },
    cadastro: params => {
        if(!this.validar('frm-permuta-cadastro'))
            return false;
        var url = window.location.origin, view = "/permuta-e-redistribuicao/criar/",
        ID_ASSOCIADO = this.fnAnajustra.getCookie('ID_ASSOCIADO');
        if(ID_ASSOCIADO){
            var ID_ASS =  {name: 'id_pered_exter', value: ID_ASSOCIADO};
            jQuery.ajax({
                url: url + "/index.php",
                type: 'GET',
                data:  {...params || [], ID_ASS, id: view} ,
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                success: response => {
                    if(response.msg) {
                        alert(response.msg);
                        location.reload();
                     } else {
                        alert('Cadastro enviado!');
                     }                    
                },
                error: e => console.error(e)
            });
        } else {
            alert('Login não encontrado!');
        }
        
    },
    zeroPad: (num, places) => String(num).padStart(places, '0'),
    getCookie: name => {
        var cookieArr = document.cookie.split(";");
        for(var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");
            if(name == cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    },
    listarEditaveis: () => {
        var ID_ASSOCIADO = this.fnAnajustra.getCookie('ID_ASSOCIADO'); 
        if(ID_ASSOCIADO){ 
            var ID_ASS =  {name: 'id_pered_exter', value: ID_ASSOCIADO};
            this.fnAnajustra.buscar({editar:true, ID_ASS});
        }else {
            alert('Login não encontrado!');
        }
    },
    loadHtmlEditais: data => {
        var json = (typeof data == "string")?JSON.parse(data):data, html = "";
        this.fnAnajustra.permutas = json;
        for (i in json) {
            var {cd_anaju_pered, ds_anaju_cargo, estdo, orgao} = json[i], estados = "", orgaos = "";
            if(estdo && estdo.length > 0)
                for (j in estdo) 
                    estados += (j > 0 ? ", " : "") + estdo[j].ds_estdo;
            if(orgao && orgao.length > 0) 
                for (k in orgao) 
                    orgaos += (k > 0 ? ", " : "") + orgao[k].ds_anaju_orgao;
            html += `
            <div class="row lita-edicao-opcoes">
                <div class="col-sm-4">
                    <a href="#" data-id="${i}" class="js-editar-item" onclick="fnAnajustra.editarItem(${i})">
                        <img src="/img/botao-permutas-3.png"/>
                    </a>${ds_anaju_cargo}
                </div>
                <div class="col-sm-4">${estados}</div>
                <div class="col-sm-4">${orgaos}</div>
            </div>`;            
        }
        $('.box-lita-edicao-opcoes').html(html);
    },
    editarItem: id => {
        var item = (this.fnAnajustra.permutas) ?    this.fnAnajustra.permutas[id] : null;
        if(item){
            for(j in item){
                $(`input[name="${j}"], select[name="${j}"]`).val(item[j]);
                switch(j) {
                    case 'ds_anaju_pered_mensg':
                        $('textarea[name="ds_anaju_pered_mensg"]').text(item[j]);
                        break;
                    case 'estdo':
                    case 'orgao':
                        var flag = (j == 'estdo') ? 'estado' : 'orgao';
                        if(item[j].length > 0){
                            for(k in item[j]){
                                var vl = (j == 'estdo') ? item[j][k].cd_estdo : item[j][k].cd_anaju_orgao;
                                $(`#${flag}${vl}`).trigger( "click" );
                            }
                        }
                        break;
                    case 'id_anaju_pered_permuta':
                    case 'id_anaju_pered_redistri':
                        if(item[j] == '1')
                            $(`#${j}`).trigger( "click" );
                        break;
                    default:
                        // code block
                }
            }
        }
    },
    edicao: params => {
        var url = window.location.origin, view = "/permuta-e-redistribuicao/editar/",
        ID_ASSOCIADO = this.fnAnajustra.getCookie('ID_ASSOCIADO');
        if(ID_ASSOCIADO){
            var ID_ASS =  {name: 'id_pered_exter', value: ID_ASSOCIADO};
            jQuery.ajax({
                url: url + "/index.php",
                type: 'GET',
                data:  {...params || [], ID_ASS, id: view} ,
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                success: response => {
                    if(response.msg) {
                        alert(response.msg);
                     } else {
                        alert('Edição enviado!');
                     }                    
                },
                error: e => console.error(e)
            });
        } else {
            alert('Login não encontrado!');
        }
        
    }
},
fnContatos = {
    init: () => {
        $('#contato-formulario-btn').click(event => {
            if(this.fnContatos.validar())
                this.fnContatos.enviar();
            event.preventDefault();
        });
        $('#ramo').change(event => {
            var base = "https://www.anajustra.org.br", //base = window.location.origin,
                view = "/api/formularios/get_lotacao.ashx",
                url = base + view,
                opVal = $('#ramo').val(),
                opcao =   $(`#ramo option[value="${opVal}"]`).attr('data-id'); 
            jQuery.ajax({
                url: url,
                type: 'GET',
                data: {id_orgao: opcao},
                success: response => {
                    $('#lotacao').html(""); 
                    var lista = $(response);
                    $.each(lista, function(i, field) {
                        var opt = $(field);
                        if(opt.val() != ""){
                            opt.attr('data-id', opt.val());
                            opt.val(opt.text());
                        }
                        $('#lotacao').append(opt);
                    });             
                },
                error: e => console.error(e)
            });
            event.preventDefault();
        });
    },
    validar: () => { return this.validar('contato-formulario') },
    enviar: () => {
        var base = $('#contato-formulario').attr('action'),
            data = [],
            x = $('#contato-formulario').serializeArray(),
            url = base + "?" + $('#contato-formulario').serialize();
            $.each(x, function(i, field) {
                data[field.name] =  field.value; 
            });  
        jQuery.ajax({
            url,
            type: 'GET',
            data,
            success: response => {
                //if(response != ""){
                    alert('Contato Enviado');
                    location.reload();
                //}
            },
            error: e => console.error(e)
        });
    }
},
fnBuscar = {
    init: () => {
        var urlParams = new URLSearchParams(window.location.search);
        if(urlParams.has('q')){
            var _q = urlParams.get('q');
            this.fnBuscar.busca(_q, null);
            if($('input[name="q"]') && _q != ""){
                $('input[name="q"]').val(_q);
            }
        }
        $('.btn-search, .lista-search-btn').click(event => {
            if(this.fnBuscar.validar()){
                var q = $('input[name="q"]')[1].value, site = null;
                if($('input[name="site"]').length > 0)
                    site = $('input[name="site"]').val();
                this.fnBuscar.busca(q, site);
            }
            event.preventDefault();
        });
        $('.menu-busca a').click( event => {
            $('.menu-busca a').removeClass( "menu-ativo" );
            var obj = $(event.target).eq(0),  dest = obj.attr('data-ref');
            obj.addClass("menu-ativo");
            $('.lista-noticias').each((i, l) => {
                if(!$('.lista-noticias').eq(i).hasClass("hide"))
                    $('.lista-noticias').eq(i).addClass("hide");
            });
            $(`#${dest}`).removeClass("hide");
            event.preventDefault();
        });
    },
    page: 1,
    validar: () => { return this.validar('frm-search') },
    busca: (q, site) => {
        var url = window.location.origin,
            p = this.fnBuscar.page;
        
        $('#frm-search input[name="q"]').attr("value", q);
        $('#lista-todos').html('<div style="text-align: center;"><img src="/img/loader.gif" style="height: 55px;"></div>');
        $('#lista-noticias').html('<div style="text-align: center;"><img src="/img/loader.gif" style="height: 55px;"></div>');
        $('#lista-acoes').html('<div style="text-align: center;"><img src="/img/loader.gif" style="height: 55px;"></div>');
        
        jQuery.ajax({
            url: url + "/index.php",
            type: 'GET',
            data:  {router: '/search/', q, p, site} ,
            dataType: "html",
            success: response => {
                response = response.replace(/<script>.*<\/script>/s, "");
                var acoes = ''; 
                var noticias = ''; 
                $(response).each(function(a){
                    if($(this).find('h4').data("site")=="acoes")
                        acoes += $(this).html();
                    else if($(this).html() != undefined)
                        noticias += $(this).html();
                })

                $('#lista-todos').html(response);
                $('#lista-noticias').html(noticias);
                $('#lista-acoes').html(acoes);
            },
            error: e => console.error(e)
        });
        return false;
    }
},
validar = id => {
    var form = document.getElementById(id), 
        isRequired = false,
        msgs = "";
    for(var i=0; i < form.elements.length; i++){
        if(form.elements[i].value === '' && form.elements[i].hasAttribute('required')){
            msgs += " * " + form.elements[i].getAttribute('data-name') + "\n";
            isRequired = true;
        }
    } 
    if(isRequired){
        alert("Preencher campos: \n" + msgs);
        return false;
    }
    return true;
}
jQuery(document).ready(function(){
    if($('#permuta-lista').length > 0) fnAnajustra.init();
    if($('#frm-permuta-edicao').length > 0) fnAnajustra.listarEditaveis();
    $('.js-carregar-permuta').click(event => {
        $('.filtros-permuta a').removeClass('btn-outline-dark');
        $('.js-carregar-permuta').addClass('btn-outline-dark');
        $('#permuta-lista').removeClass('box-permuta box-redistribuicao').addClass('box-permuta');
        $('.item-redistribuicao').addClass('esconder-item');
        $('.item-permuta').removeClass('esconder-item');
        event.preventDefault();
    });
    $('.js-carregar-redistribuicao').click(event => {
        $('.filtros-permuta a').removeClass('btn-outline-dark');
        $('.js-carregar-redistribuicao').addClass('btn-outline-dark');
        $('#permuta-lista').removeClass('box-permuta box-redistribuicao').addClass('box-redistribuicao');
        $('.item-permuta').addClass('esconder-item');
        $('.item-redistribuicao').removeClass('esconder-item');
        event.preventDefault();
    });
    $('.js-permuta-busca').click(event => {
        event.preventDefault();
        $('#permuta-busca-filtros').show(1000);
        $('#permuta-lista div').remove();
    });
    $('.js-btn-permuta-busca').click(event => {
        event.preventDefault();
        var params = $('.js-btn-permuta-busca').parent().serializeArray();
        fnAnajustra.buscar(params);
        $('#permuta-lista div').remove();
    });
    $('#frm-permuta-cadastro .js-btn-permuta-cadastro').click(event => {
        event.preventDefault();
        var params = $('.js-btn-permuta-cadastro').parent().serializeArray();
        fnAnajustra.cadastro(params);
    });
    $('#frm-permuta-edicao .js-btn-permuta-cadastro').click(event => {
        event.preventDefault();
        var params = $('.js-btn-permuta-cadastro').parent().serializeArray();
        fnAnajustra.edicao(params);
    });
    if( $('#contato-formulario').length > 0 ) fnContatos.init();
    if( $('#frm-search').length > 0 ) fnBuscar.init();
});