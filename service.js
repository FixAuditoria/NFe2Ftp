var Service = require('node-windows').Service;

var svc = new Service({
    name:'Hello World2',
    description:'The HelloWorld NodeWindows service example',
    script: 'D:\\Dropbox\\Programming\\NodeJS\\IUB\\NFe2Ftp\\nfe2ftp.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
    svc.start();
  });
   
  svc.install();