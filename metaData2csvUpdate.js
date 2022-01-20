//Script parsea el archivo csv que recibe como parametro

medicionTypes = require('./types/tipoMedicion.json');
fs = require("fs");
csv = require("fast-csv");
const shell = require('child_process').execSync; 
const args = process.argv;
var _ = require('underscore');
var moment = require('moment');
const outputFile = 'types/tipoMedicion.json';
const fileBackup = 'backup\\tipoMedicion-BK_'+ moment().format('DD-MM-YY') +'.json';
var arrayMeta = [];
var nrc = require('node-run-cmd');
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
        //var objMetaData = {}; se utiliza para cargar los datos al encontrar firencias en la validacion
        var execCommand = true;        
                //informa cantidad de Rows
                if (arrayinter.length !== arrayMeta.length) {
                      console.log('Error: Rows MISMATCH');
                      console.log('FILE: inter_'+ args[2].substring(21,29)); 
                      console.log('   Cantidad Rows: ' + arrayinter.length);                      
                      console.log('MetaDataType');
                      var rowsTypes = arrayMeta.length;
                      console.log('   Cantidad Rows: ' + rowsTypes);                     
                }
                var newMetaObject = {};//nuevo objeto

                for (i = 0; i < arrayinter.length; i++) {                                                                           
                    var headerValues = [arrayinter[i][0], arrayinter[i][1], arrayinter[i][2]]; //punto[0], estacion[1], medicion[2] csv 
                    
                    var key = arrayinter[i][0];
                    arrayinter[i].splice(0, 2);                                     
                    var obj = Object.assign({}, arrayinter[i]); 
                                                       
                    //Valida que los puntos sean los mismos, en la meta data y en el archivo csv inter...
                    if(medicionTypes[headerValues[0]]) {
                        newMetaObject[headerValues[0]] = {
                            'punto':headerValues[0],
                            'medicion':  medicionTypes[headerValues[0]].medicion,
                            'tension': medicionTypes[headerValues[0]].tension,
                            'elemento': medicionTypes[headerValues[0]].elemento,
                            'tipo': medicionTypes[headerValues[0]].tipo, 
                            'utilidad':medicionTypes[headerValues[0]].utilidad,
                            'estacion':medicionTypes[headerValues[0]].estacion,
                            'nombreEstacion':medicionTypes[headerValues[0]].nombreEstacion,
                            'provincia':medicionTypes[headerValues[0]].provincia,
                            'zona':medicionTypes[headerValues[0]].zona,
                            'isOutdated': false,
                        };      
                    }

                    //agrega punto nuevo con su "medicion" para luego ser evaluado en el frond
                    if (!medicionTypes[headerValues[0]]) {                        
                        console.log('ERROR !, failed at Punto: '+ headerValues[0]);
                        console.log('-------------------------------------------------');
                        execCommand = false;
                        newMetaObject[headerValues[0]] = {
                            'punto':headerValues[0],
                            'medicion': headerValues[2].substring(0,16),
                            'tension':'',
                            'elemento':'',
                            'tipo':'',
                            'utilidad':'',
                            'estacion':headerValues[1],
                            'nombreEstacion':'',
                            'provincia':'',
                            'zona':'',
                            'isOutdated': true
                        };
                    }        
                                
                    //Valida que las mediciones sean las mismas
                    //Punto es la Key, si aparece una medicion que no es la misma que la metaData se agrega para ser evaluada posteriormente en el Frond                                                   
                    else if (medicionTypes[headerValues[0]].medicion.substring(0,16)!== headerValues[2].substring(0,16)) {
                        console.log('ERROR Medicion MISMATCH!, failed in row: '+ (i));
                        console.log('PUNTO: ' + headerValues[0]);
                        console.log('inter MEDICION: ' + headerValues[2]);
                        console.log('metadata MEDICION: ' + medicionTypes[headerValues[0]].medicion);
                        console.log('Verificar!');
                        console.log('-------------------------------------------------');  
                        execCommand = false;
                        newMetaObject[headerValues[0]] = {
                            'punto': headerValues[0],
                            'medicion': medicionTypes[headerValues[0]].medicion,
                            'medicionNew': headerValues[2].substring(0,16),
                            'tension': medicionTypes[headerValues[0]].tension,
                            'elemento': medicionTypes[headerValues[0]].elemento,
                            'tipo': medicionTypes[headerValues[0]].tipo, 
                            'utilidad':medicionTypes[headerValues[0]].utilidad,
                            'estacion':headerValues[1].substring(0,16), //medicionTypes[headerValues[0]].estacion,
                            'nombreEstacion':medicionTypes[headerValues[0]].nombreEstacion,
                            'provincia':medicionTypes[headerValues[0]].provincia,
                            'zona':medicionTypes[headerValues[0]].zona,
                            'isOutdated': true
                        };             
                    }                    
                }
                console.log('End OK!');
                console.log('FILE: inter_'+ args[2].substring(21,29)); 
                console.log('   Cantidad Rows: ' + arrayinter.length);
                console.log('MetaDataType');
                var rowsTypes = arrayMeta.length;
                console.log('   Cantidad Rows: ' + rowsTypes);               
                if (execCommand) {
                    var yesteday = moment().subtract(1, 'day').format('DD-MM-YY');
                    //shell('node xlsFromInter-Demanda.js csv-para-carga/inter_'+yesteday+'.csv');
                   
                    setTimeout(function() {
                        nrc.run('node csvFromInter-P.js csv-para-carga/inter_' + args[2].substring(21,29) + '.csv');
                        //nrc.run('node csvFromInter-P.js csv-para-carga/inter_' + yesteday + '.csv');
                        console.log('shell command');                     
                   
                    },10000);
                }     
             
                 shell('copy types\\tipoMedicion.json ' + fileBackup);                    
                    fs.writeFile(outputFile, JSON.stringify(newMetaObject), function(err) {
                        if(err) {
                            return console.log(err);
                            }
                               console.log("The file was saved!");
                             });                     
                          
    });
    stream.pipe(csvStream);