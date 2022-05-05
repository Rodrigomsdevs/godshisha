const router = require("express").Router();
const functions = require('./functions');
const usuario = require('./controller/usuario.controller');
const produtos = require('./controller/produtos.controller');

router.get('/', usuario.index);
router.get('/conta', functions.verificarLogado(), usuario.telaConta);
router.get('/enderecos', functions.verificarLogado(), usuario.telaEndereco);
router.get('/cadastro', functions.verificarDeslogado(), usuario.telaSignUP);
router.get('/entrar', functions.verificarDeslogado(), usuario.telaSignIN);
router.get('/produtos', functions.verificarLogado(), usuario.telaListagemProdutos);


router.post('/api/cadastroCliente', usuario.cadastroCliente);
router.post('/api/loginCliente', usuario.loginCliente);
router.get('/api/getEnderecos', functions.verificarLogado(), usuario.getEnderecos);
router.post('/api/cadastroEndereco', functions.verificarLogado(), usuario.cadastroEndereco);
router.delete('/api/excluiEnderecoCliente', functions.verificarLogado(), usuario.excluiEnderecoCliente);


router.get('/produtos/novo', functions.verificarLogado(), produtos.novoProduto);

router.get('/api/produtos', produtos.getProdutos);
router.put('/api/produtos/ativadesativa', functions.verificarLogado(), produtos.ativaDesativa);
router.post('/api/produtos', functions.verificarLogado(), produtos.cadastraPproduto);

module.exports = router;
