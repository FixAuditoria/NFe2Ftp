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

var EvL = require('node-windows').EventLogger;
var log = new EvL('Hello World2');

var app = {};

// Timer 
app.loop = function(){
    setInterval(function(){
        app.checkFolder();
    },_config.time);
};

app.checkFolder = function() {
    //patter para extensão do arqivo
    var pattern=/\.[0-9a-z]+$/i;

    fs.readdir('./xml',(err,files) => {
        if(!err && files) {
            log.warn('Funcionando!! leu ' + files.length + ' arquivos!');
            files.forEach(function(file) {
                //aplica o padrão no nome do arquivo para retirar a extensão
                var ext = file.match(pattern);
                if(ext.toString().toLowerCase() == '.xml') {
                    //TODO: implementar upload do arquivo
                    console.log(file + ' e a extensão é XML');
                } else {
                    console.log(file + ' e a extensão NÃO É XML');
                }
            })//
        } else {
            console.log('1: erro obtendo lista de arquivos');
        }
    });
    //app.loop();
};//app.checkFolder

//define a função que vai ser executada no tempo pré definido em config.js
setInterval(app.checkFolder,_config.time);
console.log(JSON.stringify(_config));
module.exports = app;

//TODO: implementar gerador de arquivos de log