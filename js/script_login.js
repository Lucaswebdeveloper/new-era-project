$(function () {

	if (getCookie("LOGADO") == "true") {
		$(".js-user").html(getCookie("APELIDO"));
		$(".js-logged").show();
        $(".js-unlogged").hide();
        $('p:contains("Já é associado? Faça seu")').remove();

        $('.bloco-acoes-logado').show();
        $('.bloco-acoes-nlogado').hide();
	}
	else {
		$(".js-logged").hide();
        $(".js-unlogged").show();
        
        $('.bloco-acoes-logado').hide();
        $('.bloco-acoes-nlogado').show();
	}
	
    $("#acessar").click(function () {
        actionLogin();
    });
    
    $("#cpf").keypress(function (e) {
        if (e.which === 13) {
            e.preventDefault();
			actionLogin();
        }
    });
    $("#senha").keypress(function (e) {
        if (e.which === 13) {
            e.preventDefault();
        	actionLogin();
        }
    });
       
    function actionLogin(tipoForm) {
        if ($("#cpf").val() !== "" && $("#senha").val() !== "") {
			var manter_logado = "";
			if ($("#logado").get(0).checked == true)
				manter_logado = 1;
            $.ajax({
                url: "/ar/login/login.ashx?cpf=" + $("#cpf").val() + "&senha=" + $("#senha").val() + "&manter_logado=" + manter_logado + "",
                success: function (result) {
                    
           			console.log(result);
                    switch(result){
                        case 'SREC' : 
                            //window.document.location.href='/';
                            window.document.location.href= "/";
                            break;
                        case 'S' : 
                            //window.document.location.href='/';
                            window.document.location.href= "/ar/meus-dados/";
                            break;
                            
                        case 'FP' : 
                            window.document.location.href= "/ar/meus-dados/";
                            break;

                        case 'FUN' : 
                            window.document.location.href='/';
                            break;      
                            
                        //LOGIN BLOQUEADO COM ATÉ 3 BOLETOS E COM MENOS DE 90 DIAS VENCIDOS
                        case 'B3' : 
                            setTimeout(function () {
                                $(location).attr('href', "/ar/pagamento-debitos.aspx");
                            }, 200);
                            break;

                        //LOGIN BLOQUEADO COM MAIS DE 1 BOLETO, COM MENOS DE 90 DIAS VENCIDOS
                        case 'B2':
                            setTimeout(function () {
                                $(location).attr('href', "/ar/pagamento-debitos.aspx");
                            }, 200);
                            break;

                        //LOGIN BLOQUEADO COM 1 BOLETO, COM MENOS DE 90 DIAS VENCIDO
                        case 'B1':
                            setTimeout(function () {
                                $(location).attr('href', "/ar/pagamento-debitos.aspx");
                            }, 200);
                            break;

                        //LOGIN AGUARDADNDO CONTRATO
                        case 'A' : 
                        setTimeout(function () {
                            $(location).attr('href', "/ar/pagamento-debitos.aspx");
                        }, 200);
                        break;

                        //LOGIN NÃO FILIADO
                        case 'N' : 
                        setTimeout(function () {
                            $(location).attr('href', "/ar/pagamento-debitos.aspx");
                        }, 200);
                        break;

                        
                        //LOGIN NÃO FILIADO
                        case 'NREC' : 
                        setTimeout(function () {
                            $(location).attr('href', "/ar/pagamento-debitos.aspx");
                        }, 200);
                        break;
                      
                        //ERRO NO LOGIN
                        default : 
                        Notiflix.Report.Failure('Não foi possível acessar', 'Os dados informados são inválidos', 'Fechar');
                        break;
                    }

                },
                error: function () {
                    Notiflix.Report.Failure('Não foi possível acessar', 'Os dados informados são inválidos', 'Fechar');
                }
            });		
            
        }
    }
    


    $(".bt_forgot").click(function (event) {
        event.preventDefault();
        $(this).attr("disabled", 'disabled');
        RecuperaSenha();
    });
    $("#cpf2").keypress(function (e) {
        if (e.which === 13) {
            RecuperaSenha();
        }
    });
    $("#dt_nasc").keypress(function (e) {
        if (e.which === 13) {
            RecuperaSenha();
        }
    });
    $(document).on("click","#NXReportButton",function() {
        window.document.location.href='/';
    });
    function RecuperaSenha() {	
        if ($("#cpf2").val() != "" && $("#dt_nasc").val() != "") {

            Notiflix.Loading.Circle('Aguarde, validando seus dados.');

            //console.log("Aguarde, validando seus dados!");
            $.ajax({
                url: "/ar/login/recuperar-senha.ashx?cpf=" + $("#cpf2").val() + "&dtnasc=" + $("#data-nasc").val() + "&email=" + $("#email").val(),
                success: function (result) {
                    if (result != 0 && result != 2 ) { 
                        var email = result.split(",");
                        Notiflix.Loading.Remove();
                        Notiflix.Report.Success('Suas informações foram confirmadas', 'Em instantes você receberá no e-mail <b>'+email[0]+'</b>, as instruções de acesso. <br/><br/> OBS: Caso o e-mail esteja incorreto, entre em contato com cadastro@anajustra.org.br e solicite a alteração.', 'OK');
                        //getMensages("Suas informações foram validadas com sucesso. Em instantes você receberá no e-mail "+email[0]+", as instruções de acesso. \nOBS: Caso o e-mail esteja incorreto, entre em contato com cadastro@anajustra.org.br e solicite a alteração.");
                    } else {
                        if (result == 0 && result == 2 ) {
                            
                            Notiflix.Loading.Remove();
                            Notiflix.Report.Failure('Erro ao recuperar a senha', 'Não foi possível validar seus dados. <br/><br/>Por favor, entre em contato pelo e-mail webmaster@anajustra.org.br', 'Fechar');
                        } else {
                            
                            Notiflix.Loading.Remove();
                            Notiflix.Report.Failure('Erro ao recuperar a senha', 'Por favor, entre em contato pelo e-mail webmaster@anajustra.org.br', 'Fechar');
                        }
                    }
                },
                error: function () {
                    
                    Notiflix.Loading.Remove();
                    Notiflix.Report.Failure('Erro ao recuperar a senha', 'Por favor, entre em contato pelo e-mail webmaster@anajustra.org.br', 'Fechar');
                        
                }
            });
        } else {
            
            Notiflix.Loading.Remove();
            Notiflix.Report.Failure('Erro ao recuperar a senha', 'Não foi possível validar seus dados. <br/><br/>Por favor, entre em contato pelo e-mail webmaster@anajustra.org.br', 'Fechar');
        }
    }
   
	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
    }
    
    function getMensages(str){

        alert(str);

        $(".msg_error2").show();
        $(".msg_error2").html(str);

        setTimeout(function () {

            $(".msg_error2").hide();
            $(".msg_error2").html("");

        }, 4000);
    }
});