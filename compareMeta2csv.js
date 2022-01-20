//Script parsea el archivo csv que recibe como parametro
//Motor de Base de Datos MongoDB

medicionTypes = require('./types/tipoMedicion.json');
fs = require("fs");
csv = require("fast-csv");
const shell = require('child_process').execSync; 
const args = process.argv;
var _ = require('underscore');
var moment = require('moment');

var arrayMeta = [];
_(medicionTypes).each(function(elem, key){
    //console.log(elem);
    arrayMeta.push(elem);
  }); 
var stream = fs.createReadStream(args[2]);
var arrayinter = [];
var csvStream = csv()
    .on("data", function (data) {
        arrayinter.push(data);
    })
    .on("end", function () {
        console.log('Validating...');
        arrayinter.splice(0, 3); //se elimina los registros del 0 al 3
        var plainObjects = [];
        var execCommand = true;
        //var medicionTypes_1  = medicionTypes.length - 1; //Se elimina el encabezado
                //valida cantidad de Rows               
                if (arrayinter.length !== arrayMeta.length) {
                      console.log('Error: Rows MISMATCH');
                      console.log('FILE: inter_'+ args[2].substring(21,29)); 
                      console.log('   Cantidad Rows: ' + arrayinter.length);                      
                      console.log('MetaDataType');
                      var rowsTypes = arrayMeta.length;
                      console.log('   Cantidad Rows: ' + rowsTypes);
                }
                
                for (i = 0; i < arrayinter.length; i++) {                                                       
                    var headerValues = [arrayinter[i][0], arrayinter[i][1]]; //punto[0], medicion[1] csv 
                    arrayinter[i].splice(0, 2);                    
                    var obj = Object.assign({}, arrayinter[i]);                                          
                    //Valida que los puntos sean los mismos
                    if(!medicionTypes[headerValues[0]]){                        
                        console.log('ERROR !, failed at Punto: '+ headerValues[0]);
                        console.log('-------------------------------------------------');
                        execCommand = false;
                        
                    }                    
                    //Valida que las mediciones sean las mismas
                    // headerValues[1] = medicion del arrayinter que es el archivo recibido por parametro.                                
                    else if (medicionTypes[headerValues[0]].medicion.substring(0,16)!== headerValues[1].substring(0,16)) {
                        console.log('ERROR Medicion MISMATCH!, failed in row: '+ (i));
                        console.log('PUNTO: ' + headerValues[0]);
                        console.log('inter MEDICION: ' + headerValues[1]);
                        console.log('metadata MEDICION: ' + medicionTypes[headerValues[0]].medicion);
                        console.log('Verificar!');
                        console.log('-------------------------------------------------');  
                        execCommand = false;                                             
                    }                    
                }
                console.log('End OK!');
                console.log('FILE: inter_'+ args[2].substring(21,29)); 
                console.log('   Cantidad Rows: ' + arrayinter.length);
                console.log('MetaDataType');
                var rowsTypes = arrayMeta.length;
                console.log('   Cantidad Rows: ' + rowsTypes);
                
                if(execCommand){
                    var yesteday = moment().subtract(1, 'day').format('DD-MM-YY');
                    //shell('node xlsFromInter-Demanda.js csv-para-carga/inter_'+yesteday+'.csv');
                    shell('node csvFromInter-P.js csv-para-carga/inter_'+yesteday+'.csv');
                }                
    });
    stream.pipe(csvStream);
