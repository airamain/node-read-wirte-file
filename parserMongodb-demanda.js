//Los archivos a utilizar del INTER son a partir del 01/09/2017, lo anterior tiene otro numero de ROWS y cambian en la Metadata
//Script parsea el archivo csv inter_DD-MM-AA.csv que lo recibe como parametro
//Se crea una collection con el dia del archivo a procesar
//Motor de Base de Datos MongoDB

medicionTypes = require('./types/tipoMedicion.json');
fs = require("fs");
csv = require("fast-csv");
const args = process.argv;
var MongoClient = require('mongodb').MongoClient;
var stream = fs.createReadStream(args[2]);
var arrayinter = [];
var csvStream = csv()
.on("data", function (data) {
    arrayinter.push(data);
})
.on("end", function () {
    console.log('end');
    arrayinter.splice(0, 3);//se elimina los registros del 0 al 3
    MongoClient.connect("mongodb://localhost:27017/inter", function (err, db) {
        if (!err) {
            var plainObjects = [];

                    // ?
                for (i = 0; i < arrayinter.length; i++) {
                    if(!medicionTypes[arrayinter[i][0]]){
                        console.log(arrayinter[i][0]);
                    }                    
                    //Filtro para seleccionar la Potencia Activa = P                    
                    else if(medicionTypes[arrayinter[i][0]].tipo === 'P' && (medicionTypes[arrayinter[i][0]].utilidad === 'T' || 
                    medicionTypes[arrayinter[i][0]].utilidad === 'G') &&  (medicionTypes[arrayinter[i][0]].tension === '13,2' ||
                    medicionTypes[arrayinter[i][0]].tension === '33')) {                
                                                
                        var headerValues = [arrayinter[i][0], arrayinter[i][1]];                        
                        arrayinter[i].splice(0, 2);
                        console.log(arrayinter[i].length);
                     
                        for(j=0;j<=arrayinter[i].length;j++) {                  
                         if(arrayinter[i][j]) {
                            arrayinter[i][j] = arrayinter[i][j].replace('.',',');
                                                }
                                            }               
                        var obj = Object.assign({}, arrayinter[i], medicionTypes[headerValues[0]]);                       
                        
                        obj.estacionNumero = parseInt( headerValues[0].substring(0,3) );                                                
                        obj.punto = parseInt(headerValues[0]);
                        obj.medicion = headerValues[1];
                        obj.fechaStamp = new Date();
                        obj.fileProcesado = args[2].substring(15,35);                        
                        plainObjects.push(obj);
                    }                    
                }                
                var collection = db.collection('medicion-demanda-'+ args[2].substring(21,29));
                collection.insertMany(plainObjects).then(function (err) {
                    console.log(err);
                    db.close();
                    process.exit(1);
                });
            }
            else {
                console.err(err);
            }
        })
    });
    stream.pipe(csvStream);