/*
NFe2Ftp
Entrada principal da aplicação.

Thiago Bignotto
09/06/2018
*/

/*
Estratégia
1. Criar aquivo para configuração
2. Criar thread para monitorar a pasta
3. Obter lista de arquivos para enviar
4. Conectar ao FTP
5. Enviar arquivos
6. Apagar arquivos originais depois de enviados
*/


var _config = require('./config');
var fs = require('fs');

//var EvL = require('node-windows').EventLogger;
//var log = new EvL('Hello World2');

var app = {};

var xmlFiles = [];
// Timer 
app.loop = function(){
    setInterval(function(){
        app.checkFolder();
    },_config.time);
};

/*
Verifica a pasta configurada em config.originFolder, lista os arquivos, cria um array somente com arquivos .xml e repassa
esse array para a função app.uploadFiles
*/
app.checkFolder = function() {
    //pattern para extensão do arqivo
    var pattern=/\.[0-9a-z]+$/i;

    fs.readdir(_config.originFolder,(err,files) => {
        if(!err && files) {
            //log.warn('Funcionando!! leu ' + files.length + ' arquivos!');
            files.forEach(function(file) {
                //aplica o padrão no nome do arquivo para retirar a extensão
                var ext = file.match(pattern);
                if(ext.toString().toLowerCase() == '.xml') {
                    //TODO: implementar upload do arquivo
                    xmlFiles.push(file);
                   // console.log(file + ' e a extensão é XML');
                } else {
                   // console.log(file + ' e a extensão NÃO É XML');
                }
            });//
            app.uploadFiles(xmlFiles);
            //TODO: limpar o array pra não reenviar nenhum arquivo
        } else {
            console.log('1: erro obtendo lista de arquivos');
        }
    });
    //app.loop();
};//app.checkFolder

app.uploadFiles = function(files) {
    console.log(files);
};//app.uploadFiles


var ftpConfig = {
    'host' : _config.ftpServer,
    'port' : _config.ftpPort,
    'user' : _config.ftpUser,
    'password' : _config.ftpPass
};

var Client = require('ftp');
var c = new Client();
c.on('ready', function() {
  c.list(function(err, list) {
    if (err) {
        console.log(err.name);
        c.end();
    } else {
    list.forEach(function(file) {
        console.log(file.name);
    });
    //console.dir(list);
    c.end(); }
  });
});
c.connect(ftpConfig);
//app.checkFolder();

//define a função que vai ser executada no tempo pré definido em config.js
setInterval(app.checkFolder,_config.time);
console.log(JSON.stringify(_config));
module.exports = app;

//TODO: implementar gerador de arquivos de log