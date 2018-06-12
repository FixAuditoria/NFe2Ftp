/*
NFe2Ftp
Arquivo de configurações.

Thiago Bignotto
09/06/2018
*/

//container
var appConfig = {};

appConfig.production = {
    'envName' : 'production',
    'hashSecret' : 'nonono',
    'originFolder' : '', //pasta onde os xmls são criados
    'ftpFolder' : '', //pasta para enviar arquivos xmls
    'time' : 1000 * 60 * 5, //tempo para verificar a pasta por novos xmls
    'ftpServer' : '',
    'ftpPort' : '',
    'ftpUser' : '',
    'ftpPass' : ''
};

appConfig.testing = {
    'envName' : 'testing',
    'hashSecret' : 'nonono',
    'originFolder' : '', //pasta onde os xmls são criados
    'ftpFolder' : '', //pasta para enviar arquivos xmls
    'time' : 1000 * 5, //tempo para verificar a pasta por novos xmls
    'ftpServer' : '',
    'ftpPort' : '',
    'ftpUser' : '',
    'ftpPass' : ''
};

//determining wich config variables to export based on the environment variable
var chosenConfig = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//check if there is a config variables for the chosen environment otherwise default testing environment
var configToExport = typeof(appConfig[chosenConfig]) == 'object' ? appConfig[chosenConfig] : appConfig.testing;

//export config
module.exports = configToExport;