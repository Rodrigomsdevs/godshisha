const mysql = require('mysql');

async function sqlQuery(query, queryVar = []) {
   return new Promise((resolve, reject) => {

      var con = mysql.createConnection({
         host: "localhost",
         user: "godshisha",
         password: "godshisha",
         database: "godshisha"
      });

      var teste = con.query(query, queryVar, function (err, result) {
         if (err) {
            console.log(teste.sql);
            return reject(err);
         }
         console.log("MYSQL: " + teste.sql);
         con.end();
         resolve(Object.values(JSON.parse(JSON.stringify(result))));
      });
   });
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


var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function isEmailValid(email) {
   if (!email)
      return false;

   if (email.length > 254)
      return false;

   var valid = emailRegex.test(email);
   if (!valid)
      return false;

   // Further checking of some things regex can't handle
   var parts = email.split("@");
   if (parts[0].length > 64)
      return false;

   var domainParts = parts[1].split(".");
   if (domainParts.some(function (part) { return part.length > 63; }))
      return false;

   return true;
}


function isEmailValid(email) {

   var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

   if (!email)
      return false;

   if (email.length > 254)
      return false;

   var valid = emailRegex.test(email);
   if (!valid)
      return false;

   // Further checking of some things regex can't handle
   var parts = email.split("@");
   if (parts[0].length > 64)
      return false;

   var domainParts = parts[1].split(".");
   if (domainParts.some(function (part) { return part.length > 63; }))
      return false;

   return true;
}


function verificarDeslogado() {
   return function (req, res, next) {
       if (!req || !res) {
           return;
       }
       if (!req.session.conta || !req.session.conta.id) {
           next();
       } else {
           res.redirect('/conta');
       }
   }
}

function verificarLogado(admin = false) {
   return async (req, res, next) => {

       if (!req || !res || !req.session.conta || !req.session.conta.id) {
           res.redirect('/entrar');
           return;
       }

       if (req.session.conta && req.session.conta.id) {
           next();
       } else {
           res.redirect('/entrar');
       }

   }
}

module.exports = {
   sqlQuery,
   validCPF,
   isEmailValid,
   verificarDeslogado,
   verificarLogado
}