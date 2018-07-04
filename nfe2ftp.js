/*
NFe2Ftp
Entrada principal da aplicação.

Thiago Bignotto
09/06/2018
*/

/*
Estratégia
1. [✓] Criar aquivo para configuração
2. [✓] Criar thread para monitorar a pasta
3. [✓] Obter lista de arquivos para enviar
4. [✓] Conectar ao FTP
5. [ ] Enviar arquivos
6. [ ] Apagar arquivos originais depois de enviados
*/


var _config = require('./config');
var fs = require('fs');
var Client = require('ftp');

//var EvL = require('node-windows').EventLogger;
//var log = new EvL('Hello World2');

//container
var app = {};

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
    //array com os nomes dos arquivos para upload
    var xmlFiles = [];

    //pattern para extensão do arqivo
    var pattern=/\.[0-9a-z]+$/i;

    fs.readdir(_config.originFolder,(err,files) => {
        if(!err && files) {
            //log.warn('Funcionando!! leu ' + files.length + ' arquivos!');
            files.forEach(function(file) {
                //aplica o padrão no nome do arquivo para retirar a extensão
                var ext = file.match(pattern);
                if(ext.toString().toLowerCase() == '.xml') {
                    xmlFiles.push(file);
                   // console.log(file + ' e a extensão é XML');
                } else {
                   // console.log(file + ' e a extensão NÃO É XML');
                }
            });//forEach

            if(xmlFiles.length > 0) {
                app.uploadFiles(xmlFiles,function(err) {
                    if(!err) {
                        console.log('foram enviados ' + xmlFiles.length + ' com sucesso');
                    } else {
                        console.log(err);
                    }
                });
                xmlFiles.length = 0;
            }
        } else {
            console.log('1: erro obtendo lista de arquivos');
        }
    });
    //app.loop();
};//app.checkFolder

//TODO: implementar upload do arquivo
app.uploadFiles = function(files,callback) {
    //console.log(files);
    var c = new Client();
    c.on('ready',function() {
        console.log('READYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY');
        files.forEach(function(file) {
            console.log('nao_processado\\' + file);
            c.put(file,'nao_processado\\' + file, function(err) {
                if(!err) {
                    console.log('deu certo');
                }
                else throw err;
            });
        });
        c.end();
    });
    c.connect(ftpConfig);
};//app.uploadFiles


var ftpConfig = {
    'host' : _config.ftpServer,
    'port' : _config.ftpPort,
    'user' : _config.ftpUser,
    'password' : _config.ftpPass
};

// var Client = require('ftp');
 
// var c = new Client();
// c.on('ready', function() {
//   c.list(function(err, list) {
//     if (err) throw err;
//     list.forEach(function(file) {
//         console.log(file.name);
//     });
//     c.end();
//   });
// });
// c.connect(ftpConfig);

//define a função que vai ser executada no tempo pré definido em config.js
setInterval(app.checkFolder,_config.time);
console.log(JSON.stringify(_config));
module.exports = app;

//TODO: implementar gerador de arquivos de log