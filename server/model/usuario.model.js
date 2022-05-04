const functions = require('../functions');


function cadastroCliente(nome, sobrenome, cpf, dataNascimento, sexo, email, senha, telefone, celular) {
   return new Promise((resolve, reject) => {


      if (!functions.validCPF(cpf)) {
         reject('CPF INVALIDO');
         return;
      }


      if (!functions.isEmailValid(email)) {
         reject('EMAIL INVALIDO!');
         return;
      }

      functions.sqlQuery('SELECT * FROM clientes WHERE cpf = ? OR email = ?', [cpf, email]).then((rV) => {

         if(rV.length > 0){

            reject('CPF e/ou Email já cadastrados');

         }else{
            functions.sqlQuery('INSERT INTO `clientes`(`nome_completo`, `data_nascimento`, `sexo`, `cpf`, `rg`, `telefone`, `celular`, `email`, `senha`, `endereco_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nome + " " + sobrenome, dataNascimento, sexo, cpf, '', telefone, celular, email, senha, 0]).then(() => {
               resolve(true);
            }).catch((error) => {
               console.log(error);
               reject('SQL');
            });
         }

      }).catch((err) => {
         console.log(err);
         reject('SQL2');
      });



   });
}

function loginCliente(email, senha){
   return new Promise((resolve, reject) => {

      functions.sqlQuery('SELECT * FROM clientes WHERE email = ? AND senha = ?', [email, senha]).then((result) => {

         if(result.length > 0){
            resolve({success: true, msg: 'Logado com sucesso', sessao: result});
         }else{
            resolve({success: false, msg: 'Email e/ou senha invalida!'});
         }

      }).catch((err) => {
         console.log(err);
         reject('SQL');
      })

   });
}

function getEnderecos(idCliente, idEndereco = 0){
   return new Promise((resolve, reject) => {

      functions.sqlQuery('SELECT * from enderecos WHERE idCliente = ?', [idCliente]).then((result) => {
         resolve(result);
      }).catch((err) => {
         console.log(err);
         reject(err);
      })

   });
}

function cadastroEndereco(idUsuario, cep, rua, numero, complemento, bairro, cidade, estado){
   return new Promise((resolve, reject) => {

      functions.sqlQuery('INSERT INTO `enderecos`(`idCliente`, `cep`, `rua`, `numero`, `complemento`, `bairro`, `cidade`, `estado`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
         idUsuario, cep, rua, numero, complemento, bairro, cidade, estado
      ]).then((result) => {
         resolve(true);
      }).catch((err) => {
         console.log('Erro ' + err);
         reject(err);
      })

   });
}

function excluiEnderecoCliente(enderecoID, userID){
   return new Promise((resolve, reject) => {

      functions.sqlQuery('DELETE FROM enderecos where id = ? AND idCliente = ?', [enderecoID, userID]).then(() => {
         resolve(true);
      }).catch((err) => {
         console.log(err);
         reject(true);
      })

   });
}

module.exports = {
   cadastroCliente,
   loginCliente,
   getEnderecos,
   cadastroEndereco,
   excluiEnderecoCliente
}