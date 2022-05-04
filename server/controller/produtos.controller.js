const model = require('../model/produtos.model');
const config = require('../config.json');

function getProdutos(req, res) {

   var ordem = req.query.ordem ? req.query.ordem : '';

   model.getProdutos(ordem).then((result) => {
      res.send(JSON.stringify({ success: true, retorno: result }));
   }).catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false, msg: 'Erro ao buscar produtos!' }));
   })

}

function ativaDesativa(req, res) {

   if (!req.body.produtoID) {
      res.send(JSON.stringify({ success: false, msg: 'Dados invalidos' }));
      return;
   }

   var produtoID = req.body.produtoID;
   model.ativaDesativa(produtoID).then(() => {
      res.send(JSON.stringify({ success: true }));
   }).catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false, msg: 'Ocorreu um erro ao atualizar produto' }));
   })
}

function novoProduto(req, res) {
   res.render(process.cwd() + "/cliente/telas/produtosCadastro.ejs", {
      config: config,
      local: 'produtos',
      sessao: req.session
   });
}

function cadastraPproduto(req, res) {

   var files = req.files;

   if (!req.body.sku || !req.body.nome || !req.body.descricao || !req.body.preco || !req.body.estoque || !req.body.categoria) {
      res.send(JSON.stringify({ success: false, msg: 'Dados invalidos!' }));
      return;
   }

   var sku = req.body.sku;
   var nome = req.body.nome;
   var descricao = req.body.descricao;
   var preco = req.body.preco;
   var estoque = req.body.estoque;
   var categoria = req.body.categoria;

   model.cadastraPproduto(files, sku, nome, descricao, preco, estoque, categoria).then(() => {
      res.send(JSON.stringify({ success: true, msg: 'Produto inserido!' }));
   }).catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false, msg: 'Erro ao cadastrar produto' }));
   })

}

module.exports = {
   getProdutos,
   ativaDesativa,
   novoProduto,
   cadastraPproduto
}