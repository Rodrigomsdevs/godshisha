$(document).ready(function () {

   $("#formLogin").submit((e) => {
      e.preventDefault();

      if (document.getElementById('btn').disabled) {
         return;
      }

      document.getElementById('btn').disabled = true;

      var email = $("#email").val();
      var senha = $("#senha").val();

      if (!email || !senha) {
         Swal.fire({
            title: 'ATENÇÃO',
            text: 'Email e Senha são obrigatorios',
            icon: 'info',
            confirmButtonText: 'OK'
         });
         return;
      }

      var ajaxLogin = $.ajax({
         url: '/api/loginCliente',
         method: 'POST',
         dataType: 'json',
         data: {
            email: email,
            senha: senha
         }
      });

      ajaxLogin.done((result) => {

         document.getElementById('btn').disabled = false;

         Swal.fire({
            title: result.msg,
            text: '',
            icon: (result.success ? 'success' : 'error'),
            confirmButtonText: 'OK'
         });


         if (result.success) {
            setTimeout(() => {
               window.location.href = '/conta';
            });
         }

      });

      ajaxLogin.fail(() => {

         document.getElementById('btn').disabled = false;

         Swal.fire({
            title: 'ATENÇÃO',
            text: 'Ocorreu um erro, tente novamente',
            icon: 'error',
            confirmButtonText: 'OK'
         });
      });

   });

});

