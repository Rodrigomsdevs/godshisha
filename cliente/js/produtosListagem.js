
//$("#produtosTable").DataTable();
var table;
loadProdutos();

function loadProdutos() {
   

   if (table) {
      table.destroy();
   }

   $.ajax({
      url: '/api/produtos',
      method: 'GET',
      dataType: 'json',
      success: (result) => {
         if (result.success) {

            var retorno = result.retorno;

            $("#bodyProdutosListagem tr").remove();

            for (var i = 0; i < retorno.length; i++) {

               var produto = retorno[i];

               $("#bodyProdutosListagem").append(`
                  <tr>
                     <td>${produto.id}</td>
                     <td>${produto.sku}</td>
                     <td><img src='/servidor/fotos/${produto.imagem}' style="max-width: 50px"/></td>
                     <td>${produto.nome}</td>
                     <td>R$ ${produto.preco}</td>
                     <td>${produto.estoque}</td>
                     <td>${(produto.ativo ? '<button class="default-btn" onclick="ativadesativa(' + produto.id + ')" >SIM</button>' : '<button class="default-btn" onclick="ativadesativa(' + produto.id + ')">NÃO</button>')}</td>
                     <td><a href="#">Alterar</a></td>
                  </tr>
               `);

            }

            table = $("#produtosTable").DataTable({
               "language": {
                  "url": "//cdn.datatables.net/plug-ins/1.11.5/i18n/pt-BR.json"
               }
            });

         }
      }
   });

}

function ativadesativa(produtoID) {

   $.ajax({
      url: '/api/produtos/ativadesativa',
      method: 'PUT',
      dataType: 'json',
      data: {
         produtoID: produtoID
      },
      success: (result) => {
         if (result.success) {
            loadProdutos();
         }
      }
   });

}

