const model = require('../model/usuario.model');
const config = require('../config.json');

function index(req, res) {
   res.render(process.cwd() + "/cliente/telas/index.ejs", {
      config: config
   });
}

function telaSignUP(req, res) {
   res.render(process.cwd() + "/cliente/telas/cadastro.ejs", {
      config: config
   });
}

function telaSignIN(req, res) {
   res.render(process.cwd() + "/cliente/telas/entrar.ejs", {
      config: config
   });
}

function telaConta(req, res) {
   res.render(process.cwd() + "/cliente/telas/conta.ejs", {
      config: config,
      local: 'conta',
      sessao: req.session
   });
}

function telaListagemProdutos(req, res){
   res.render(process.cwd() + "/cliente/telas/produtos.ejs", {
      config: config,
      local: 'produtos',
      sessao: req.session
   });
}

function telaEndereco(req, res) {
   res.render(process.cwd() + "/cliente/telas/endereco.ejs", {
      config: config,
      local: 'enderecos'
   });
}

function cadastroCliente(req, res) {

   if (!req.body.telefone || !req.body.celular || !req.body.nome || !req.body.sobrenome || !req.body.cpf || !req.body.dataNascimento || !req.body.sexo || !req.body.email || !req.body.senha) {
      res.send(JSON.stringify({
         success: false,
         msg: 'Dados invalidos!'
      }));
   }

   var nome = req.body.nome;
   var sobrenome = req.body.sobrenome;
   var cpf = req.body.cpf.split('.').join('').split('-').join('');
   var dataNascimento = req.body.dataNascimento;
   var sexo = req.body.sexo;
   var email = req.body.email;
   var senha = req.body.senha;
   var telefone = req.body.telefone;
   var celular = req.body.celular;

   model.cadastroCliente(nome, sobrenome, cpf, dataNascimento, sexo, email, senha, telefone, celular).then((result) => {
      res.send(JSON.stringify({
         success: true,
         msg: 'Cadastrado com sucesso!'
      }));
   }).catch((error) => {
      res.send(JSON.stringify({
         success: false,
         msg: error
      }));
   });

}

function loginCliente(req, res) {

   if (!req.body.email || !req.body.senha) {
      res.send(JSON.stringify({ success: false, msg: 'Dados invalidos' }));
      return;
   }

   var email = req.body.email;
   var senha = req.body.senha;

   model.loginCliente(email, senha).then((result) => {

      console.log(req.session);

      if (result.success) {
         req.session.conta = result.sessao[0];
         res.send(JSON.stringify({ success: true, msg: result.msg }));
      } else {
         res.send(JSON.stringify(result));
      }

   }).catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false, msg: 'SQL' }));
   })

}

function getEnderecos(req, res) {

   /* if(!req.query.idCliente){
       res.send(JSON.stringify({success: false, msg: 'Dados invalidos'}));
       return;
    }*/

   var idCliente = (req.query.idCliente ? req.query.idCliente : req.session.conta.id);

   model.getEnderecos(idCliente).then((result) => {
      res.send(JSON.stringify({ success: true, retorno: result }));
   }).catch((err) => {
      res.send(JSON.stringify({ success: false, msg: 'Ocorreu um erro ao buscar endereços!' }));
   })

}

function cadastroEndereco(req, res) {

   if (!req.body.cep || !req.body.rua || !req.body.numero || !req.body.bairro || !req.body.cidade || !req.body.estado) {
      res.send(JSON.stringify({ success: false, msg: 'Dados invalidos' }));
      return;
   }

   var idUsuario = req.session.conta.id;
   var cep = req.body.cep;
   var rua = req.body.rua;
   var numero = req.body.numero;
   var complemento = (req.body.complemento ? req.body.complemento : '');
   var bairro = req.body.bairro;
   var cidade = req.body.cidade;
   var estado = req.body.estado;

   model.cadastroEndereco(idUsuario, cep, rua, numero, complemento, bairro, cidade, estado).then((result) => {
      res.send(JSON.stringify({ success: true, msg: 'Cadastrado com sucesso' }));
   }).catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false, msg: 'Erro ao cadastrar, tente novamente!' }));
   });

}

function excluiEnderecoCliente(req, res) {

   if (!req.body.enderecoID) {
      res.send(JSON.stringify({ success: false, msg: 'Dados invalidos' }));
      return;
   }

   var enderecoID = req.body.enderecoID;
   var userID = req.session.conta.id;

   model.excluiEnderecoCliente(enderecoID, userID).then((result) => {
      res.send(JSON.stringify({ success: true, msg: 'Excluido com sucesso' }));
   }).catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false, msg: 'Erro ao excluir, tente novamente!' }));
   });

}

module.exports = {
   index,
   telaSignUP,
   cadastroCliente,
   telaSignIN,
   loginCliente,
   telaConta,
   telaEndereco,
   getEnderecos,
   cadastroEndereco,
   excluiEnderecoCliente,
   telaListagemProdutos
}