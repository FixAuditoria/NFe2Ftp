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

var app = {};

// Timer 
app.loop = function(){
    setInterval(function(){
        app.checkFolder();
    },_config.time);
};

app.checkFolder = function() {
    fs.readdir('./xml',function(err,files) {
        if(!err && files) {
            files.forEach(function(file) {
                //TODO: implementar upload do arquivo
                console.log(file);
            })//
        } else {
            console.log('1: erro obtendo lista de arquivos');
        }
    });
    app.loop();
};//app.checkFolder

/*
Clean up function.
Delete all expired tokens on startup!

fs.readdir('./data/token',function(err,files) {
    if(!err && files) {
        files.forEach(function(file) {
            _data.read('./token/',file.slice(0,-5),function(err,tokenData) {
                if(!err) { 
                    if(tokenData.expires < Date.now()) {
                        _data.delete('./token/',file.slice(0,-5),function(err) {
                            if(err) {
                                console.log('could not delete old token ' + err);
                            }
                        });
                    } else {
                        console.log('token still valid: ' + tokenData.id);
                    }
                } else {
                    console.log('could not delete token ' + err);
                }
            });
        })//files.forEach
    }
});//fs.readdir */

//app.init = function() {
    //fazer a primeira leitura
    
    app.checkFolder();

    //iniciar o loop
    //app.loop();
//};//app.init

module.exports = app;