const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const rotas = require('./server/rotas');
const cookieSession = require('cookie-session');
const fileupload = require("express-fileupload");

/*let certCredentials = { key: null, cert: null, ca: null };

certCredentials.key = fs.readFileSync(process.cwd() + '/certificados/private.key', 'utf8');
certCredentials.cert = fs.readFileSync(process.cwd() + '/certificados/certificate.crt', 'utf8');
certCredentials.ca = fs.readFileSync(process.cwd() + '/certificados/ca_bundle.crt', 'utf8');


const httpsServer = https.createServer(certCredentials, app);*/
const httpServer = http.createServer(app);

app.use('/template/', express.static(path.join(__dirname, '/', 'template')));
app.use('/cliente/', express.static(path.join(__dirname, '/', 'cliente')));
app.use('/servidor/', express.static(path.join(__dirname, '/', 'server')));


app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({
   extended: true
}));

app.use(fileupload());

app.use(cookieSession({
   name: 'session',
   keys: ['digao', 'io'],
   maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

//rotas
app.use('/', rotas);



httpServer.listen(4000, () => {
   console.log(`Servidor rodando na porta 80`);
});

/*httpsServer.listen(443, () => {
   console.log(`Servidor rodando na porta 443`);
});*/


module.exports = app;