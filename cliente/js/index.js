

function loadNovosProdutos(){
   var produtosAjax = $.ajax({
      url: '/api/produtos',
      method: 'GET',
      dataType: 'json',
      data: {
         ordem: 'novos'
      },
      success: (result) => {
         console.log(result);

         if(result.success){

            var retorno = result.retorno;

            var total = (retorno.length > 9 ? 9 : retorno.length);

            for(var i = 0; i < total; i++){
               var produto = retorno[i];


               $("#listaNovos").append(`
               <div class="col-lg-4 col-md-6 col-sm-6">
               <div class="single-products-box">
                  <div class="products-image">
                     <a href="/${produto.nome.split(' ').join("_")}/${produto.id}">
                        <img src="/servidor/fotos/${produto.imagem}" class="main-image" alt="image">
                        <img src="/servidor/fotos/${produto.imagem}" class="hover-image" alt="image">
                     </a>

                     <div class="products-button">
                        <ul>

                           <li>
                              <div class="quick-view-btn">
                                 <a href="#" data-bs-toggle="modal" data-bs-target="#productsQuickView">
                                    <i class='bx bx-search-alt'></i>
                                    <span class="tooltip-label">Olhadinha</span>
                                 </a>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </div>

                  <div class="products-content">
                     <h3><a href="/${produto.nome.split(' ').join("_")}/${produto.id}">${produto.nome}</a></h3>
                     <div class="price">
                        <span class="old-price">R$ ${(produto.preco + (produto.preco * 0.2))}</span>
                        <span class="new-price">R$ ${produto.preco}</span>
                     </div>
                     <div class="star-rating">
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                     </div>
                     <a href="javascript:;" class="add-to-cart">Adicionar ao Carrinho</a>
                  </div>
               </div>
            </div>
               `);

            }

         }
      }
   });
}

loadNovosProdutos();