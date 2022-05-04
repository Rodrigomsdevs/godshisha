$(document).ready(function () {

   $("#cep").mask('99999-999');


   loadEnderecos();
   function loadEnderecos() {

      $("#appendEnderecos").html('');

      $("#appendEnderecos").append(`                           <div class="col-lg-4 col-md-4">
      <a href="javascript:;" id="novoEndereco">
         <div class="card" style="width: 100%;">
            <div class="card-body">
               <h5 class="card-title">Novo Endereço</h5>
            </div>
         </div>
      </a>
   </div>`);


      var ajaxGETEnderecos = $.ajax({
         url: '/api/getEnderecos?idCliente',
         method: 'GET',
         dataType: 'json'
      });

      ajaxGETEnderecos.done((result) => {

         if (result.success && result.retorno) {

            var retorno = result.retorno;

            for (var i = 0; i < retorno.length; i++) {

               var endereco = retorno[i];

               console.log(endereco);

               $("#appendEnderecos").append(`
               <div class="col-md-4">
                                    <div class="card" style="width: 100%;">
                                       <div class="card-body">
                                          <h5 class="card-title">Endereço (${(i + 1)})</h5>
                                          <p class="card-text">
                                             ${endereco.rua}, ${endereco.numero}, ${endereco.complemento}
                                          </p>
                                          <p class="card-text">
                                              ${endereco.bairro}, ${endereco.cidade}-${endereco.estado}
                                          </p>
                                          <button class="default-btn" style="width: 100%;" onclick="excluir(${endereco.id}, this)">Excluir</button>
                     
                                       </div>
                                    </div>
                                 </div>
               `);

            }

         }

      });
   }

   function excluir(id, botao) {
      botao.disabled = true;
      botao.innerHTML = '...';


      var ajaxDELETE = $.ajax({
         url: '/api/excluiEnderecoCliente',
         method: 'DELETE',
         dataType: 'json',
         data: {
            enderecoID: id
         },
         success: (result) => {

            if (result.success) {

               loadEnderecos();

            }

            Swal.fire({
               title: result.msg,
               text: '',
               icon: (result.success ? 'success' : 'error'),
               confirmButtonText: 'OK'
            });

         }
      });

      ajaxDELETE.fail(() => {
         Swal.fire({
            title: 'ERROR',
            text: 'Ocorreu um erro ao deletar endereço, tente novamente!',
            icon: 'error',
            confirmButtonText: 'OK'
         });
      });
   }

   $("#novoEndereco").click(() => {
      $("#modalNewEndereco").modal('show');
   });

   $("#salvarEndereco").click(() => {

      var cep = $("#cep").val();
      var rua = $("#rua").val();
      var numero = $("#numero").val();
      var complemento = $("#complemento").val();
      var bairro = $("#bairro").val();
      var cidade = $("#cidade").val();
      var estado = $("#estado").val();

      if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
         return;
      }

      if (document.getElementById('salvarEndereco').disabled == false) {
         document.getElementById('salvarEndereco').disabled = true;

         $.ajax({
            url: '/api/cadastroEndereco',
            method: 'POST',
            dataType: 'json',
            data: {
               cep: cep,
               rua: rua,
               numero: numero,
               complemento: complemento,
               bairro: bairro,
               cidade: cidade,
               estado: estado
            },
            success: (result) => {
               document.getElementById('salvarEndereco').disabled = false;
               if (result.success) {
                  $("#modalNewEndereco").modal('hide');
               }

               Swal.fire({
                  title: result.msg,
                  text: '',
                  icon: (result.success ? 'success' : 'error'),
                  confirmButtonText: 'OK'
               });

               loadEnderecos();

            },
            fail: (err) => {
               document.getElementById('salvarEndereco').disabled = false;
            }
         });

      }

   });


   $("#cep").on('keyup', () => {

      var cep = $("#cep").val();

      if (cep.length == 9) {

         if (document.getElementById('cep').disabled == false) {
            document.getElementById('cep').disabled = true;

            var ajaxCEP = $.ajax({
               url: `https://viacep.com.br/ws/${cep}/json/`,
               method: 'GET',
               dataType: 'json',
               success: (result) => {

                  if (result.logradouro) {

                     var rua = result.logradouro;
                     var bairro = result.bairro;
                     var cidade = result.localidade;
                     var estado = result.uf;

                     $("#rua").val(rua);
                     $("#bairro").val(bairro);
                     $("#cidade").val(cidade);
                     $("#estado").val(estado);

                     $("#numero").focus()

                  }

               }
            });

         }

      }

   });

});