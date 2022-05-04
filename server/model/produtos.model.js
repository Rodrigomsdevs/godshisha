const { system } = require('nodemon/lib/config');
const functions = require('../functions');

function getProdutos(ordem) {
   return new Promise((resolve, reject) => {

      var sql = "";

      if(ordem == 'novos'){
         sql += ' order by p.id desc';
      }

      functions.sqlQuery('select * from produtos p inner join produtos_imagens pi on(pi.idProduto = p.id) group by p.id ' + sql).then((result) => {
         resolve(result);
      }).catch((err) => {
         reject(err);
      });

   });
}

function ativaDesativa(produtoID) {
   return new Promise((resolve, reject) => {

      functions.sqlQuery('UPDATE produtos SET ativo = !ativo WHERE id = ?', [produtoID]).then(() => {
         resolve(true);
      }).catch((err) => {
         reject(err);
      })

   });
}

function cadastraPproduto(files, sku, nome, descricao, preco, estoque, categoria) {
   return new Promise((resolve, reject) => {

      functions.sqlQuery('INSERT INTO `produtos`(`sku`, `nome`, `descricao`, `preco`, `ativo`, `estoque`) VALUES (?, ?, ?, ?, ?, ?)', [
         sku, nome, descricao, preco, estoque, categoria]).then(async (result) => {

            var produtoID = result[2];

            var keys = Object.keys(files);

            for(var i = 0; i < keys.length; i++){

               var nomeIMG = Date.now() + ".jpg";

               files[keys[i]].mv(process.cwd() + '/server/fotos/' + nomeIMG);
               await functions.sqlQuery('INSERT INTO `produtos_imagens`(`idProduto`, `imagem`) VALUES (?, ?)', [produtoID, nomeIMG]);
            }

            resolve(result);
         }).catch((err) => {
            reject(err);
         })

   });
}

module.exports = {
   getProdutos,
   ativaDesativa,
   cadastraPproduto
}