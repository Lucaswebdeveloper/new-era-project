$(document).ready(function () {
    $('.bt_forgot').on("click", '.bt_forgot', function (event) {
        event.preventDefault();

        if($("#cpf2").val() == "" || $("#data-nasc").val() == ""){
            alert("Preencher Campos!");
        }

		$.ajax({
            url: "https://homologacao.anajustra.org.br/login/recuperar-senha.ashx?cpf=" + $("#cpf2").val() + "&dtnasc=" + $("#data-nasc").val() ,
            success: function (result) {
                if (result != 0) {
                    
                    var email = result.split(",");
        
                    msg = "<div style='font-size:12px;font-weight:bold; color: #FFFFFF;background-color: #3F4567;padding:5px;line-height:160%;overflow:hidden'>Suas informações foram validadas com sucesso. Em instantes você receberá no e-mail <strong>"+email[0]+"</strong>, as instruções de acesso.<br/>";
                    msg += "<br/>OBS: Caso o e-mail esteja incorreto, entre em contato com cadastro@anajustra.org.br e solicite a alteração.</div>";
        
                } else {
                    if (result == 0) {
                        $(".msg_error2").show();
                        $(".msg_error2").html("Erro ao recuperar senha !");
                        setTimeout(function () {
                            $(".msg_error2").hide();
                            $(".msg_error2").html("");
                        }, 3000);
                    } else {
                        $(".msg_error2").show();
                        $(".msg_error2").html("Não foi possível recuperar sua senha. Os dados fornecidos são inválidos!");
                        setTimeout(function () {
                            $(".msg_error2").hide();
                            $(".msg_error2").html("");
                        }, 4000);
                    }
                }
            },
            error: function () {
                $(".msg_error2").show();
                $(".msg_error2").html("Não foi possível recuperar sua senha. Erro na conexão!");
                $btn.removeAttr('disabled').html('Recuperar senha');
                setTimeout(function () {
                    $(".msg_error2").hide();
                    $(".msg_error2").html("");
                }, 4000);
            }
        });
	});
});