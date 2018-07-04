/*
This script is used to test connection to ftp server.
*/

var _config = require('./config');
var fs = require('fs');
var Client = require('ftp');

var ftpConfig = {
    'host' : _config.ftpServer,
    'port' : _config.ftpPort,
    'user' : _config.ftpUser,
    'password' : _config.ftpPass
};
 
var c = new Client();

//TEST CONNECTION
// c.on('ready', function() {
//   c.list(function(err, list) {
//     if (err) console.log(err);
//     list.forEach(function(file) {
//         console.log(file.name);
//     });
//     c.end();
//   });
// });

//TEST UPLOAD SOME FILE
c.on('ready', function() {
    c.put('dummy.txt', 'dummy.txt', function(err) {
      if (err) throw err;
      console.log('uping');
      c.end();
    });
  });

c.connect(ftpConfig);
console.log('...................... end of file');