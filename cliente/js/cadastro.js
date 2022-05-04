$(document).ready(function () {
   $("#cpf").mask('999.999.999-99');
   $("#dataNascimento").mask('99/99/9999');
   $("#telefone").mask('(99) 9999-9999');
   $("#celular").mask('(99) 9 9999-9999');

   $("#cadastrar").click(() => {

      var nome = $("#nome").val();
      var sobrenome = $("#sobrenome").val();
      var cpf = $("#cpf").val();
      var sexo = $("#sexo").val();
      var email = $("#email").val();
      var senha = $("#senha").val();
      var senha2 = $("#senha2").val();
      var dataNascimento = $("#dataNascimento").val();
      var telefone = $("#telefone").val();
      var celular = $("#celular").val();

      if (!nome) {
         piscaReq("reqNome");
      }

      if (!sobrenome) {
         piscaReq("reqSobreNome");
      }

      if (!cpf) {
         piscaReq("reqCPF");
      }

      if (!sexo) {
         piscaReq("reqSEXO");
      }

      if (!email) {
         piscaReq("reqEmail");
      }

      if (!senha) {
         piscaReq("reqSenha");
      }

      if (!senha2) {
         piscaReq("reqSenha2");
      }

      if (!dataNascimento) {
         piscaReq('reqData');
      }

      if (!telefone) {
         piscaReq('reqTelefone');
      }


      if (!celular) {
         piscaReq('reqCelular');
      }

      if (senha && senha2 && (senha != senha2)) {
         piscaReq('reqSenha', 'Senhas Diferentes');
         piscaReq('reqSenha2', 'Senhas Diferentes');
      }

      if (!validCPF(cpf.split('.').join('').split('-').join(''))) {
         piscaReq('reqCPF', 'CPF invalido');
         return;
      }

      if (!nome || !sobrenome || !cpf || !sexo || !email || !senha || !senha2 || !dataNascimento) {
         return;
      }

      var cadastroAjax = $.ajax({
         url: '/api/cadastroCliente',
         method: 'POST',
         dataType: 'json',
         data: {
            nome: nome,
            sobrenome: sobrenome,
            cpf: cpf,
            dataNascimento: dataNascimento,
            sexo: sexo,
            email: email,
            senha: senha,
            telefone: telefone,
            celular: celular
         }
      });

      cadastroAjax.done((result) => {
         Swal.fire({
            title: result.msg,
            text: '',
            icon: (result.success ? 'success' : 'error'),
            confirmButtonText: 'OK'
         });

         if (result.success == true) {
            setTimeout(() => {
               window.location.href = "/entrar";
            }, 2000);
         }
      });

      cadastroAjax.fail(() => {
         Swal.fire({
            title: 'Putzz!',
            text: 'Ocorreu um erro ao se cadastrar, tente novamente!',
            icon: 'error',
            confirmButtonText: 'OK'
         });
      })

   });


   function piscaReq(id, text) {

      var controle = 0;
      var texto = $("#" + id).html();

      var taskPisca = setInterval(() => {

         controle++;

         if (controle >= 20) {
            $("#" + id).html(texto);
            clearInterval(taskPisca);
            return;
         }

         var cor = 'black';

         if (controle % 2 == 0) {
            cor = "red";
         }

         $("#" + id).html((text ? text : '* Obrigatorio'));
         $("#" + id).css('color', cor);

      }, 200);

   }

   function validCPF(strCPF) {
      var Soma;
      var Resto;
      Soma = 0;
      if (strCPF == "00000000000") return false;

      for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11)) Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10))) return false;

      Soma = 0;
      for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11)) Resto = 0;
      if (Resto != parseInt(strCPF.substring(10, 11))) return false;
      return true;
   }

});