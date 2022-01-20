//Script parsea el archivo csv que recibe como parametro "inter_tipo_.csv" para generar el archivo json que es el metadata
//este archivo luego es llamado por los script demanda, intercambio, generacion, trafo y generaInter
var _ = require('underscore');
fs = require("fs");
csv = require("fast-csv");
const args = process.argv;
var stream = fs.createReadStream(args[2]);
var arrayinter = [];
var csvStream = csv()
    .on("data", function (data) {
        arrayinter.push(data);
    })
    .on("end", function () {
        console.log('end');

         var plainObjects = [];

                for (i = 0; i < arrayinter.length; i++) {
                    if(arrayinter[i][6] && arrayinter[i][6] !=''){
                        var objMetaData = {
                            'estacion':arrayinter[i][6],
                            'nombreEstacion':arrayinter[i][7],
                            'provincia':arrayinter[i][8],
                            'zona':arrayinter[i][9]
                        };                
                        plainObjects.push(objMetaData);
                    
                    }
                }    
                var uniqueList = _.uniq(plainObjects, function (item, key, a) {
                    return item.estacion.toString();
                });
                 
              //  console.log(plainObjects);
              console.log(uniqueList.length);
                
fs.writeFile("types/tipoEstacion.json", JSON.stringify(uniqueList), function(err) {
   if(err) {
       return console.log(err);
       }
          console.log("The file was saved!");
        });     
        });
                stream.pipe(csvStream);
