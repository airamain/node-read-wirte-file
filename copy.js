fs = require("fs");
//csv = require("fast-csv");
const shell = require('child_process').execSync; 
var moment = require('moment');

var yesteday = moment().subtract(1, 'day').format('DD-MM-YY');

if (fs.existsSync( 'Z:\\inter_'+yesteday+'.csv') && !(fs.existsSync( 'f:\\inter\\inter_'+yesteday+'.csv')) ) {
     shell('copy Z:\\inter_'+yesteday+'.csv f:\\inter' );
      console.log('Copiado! inter_' + yesteday);
     //shell('node metaData2csvUpdate.js '+' f:\\inter\\inter_'+yesteday+'.csv');
      //console.log(' MetaData ');   
     shell('node generaInterNuevo.js '+' f:\\inter\\inter_'+yesteday+'.csv');
      console.log(' Inter xls, OK! ');              
} else {
    console.log("Verificar si existe archivo fuente o Archivo ya esta copiado desde origen !! - inter_" + yesteday );
}