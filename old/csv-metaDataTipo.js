//Script parsea el archivo csv que recibe como parametro "inter_tipo_.csv" para generar el archivo json que es el metadata
//este archivo luego es llamado por los script demanda, intercambio, generacion, trafo y generaInter

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
                    console.log(arrayinter[i]);
                     var objMetaData = {
                        'punto':arrayinter[i][0], 
                        'medicion':arrayinter[i][1],
                        'tension':arrayinter[i][2],
                        'elemento':arrayinter[i][3],
                        'tipo':arrayinter[i][4],
                        'utilidad':arrayinter[i][5],
                        'estacion':arrayinter[i][6],
                        'nombreEstacion':arrayinter[i][7],
                        'provincia':arrayinter[i][8],
                        'zona':arrayinter[i][9]
                }
                plainObjects.push(objMetaData);
                };
                console.log(plainObjects);
                
fs.writeFile("types/tipoMedicion.json", JSON.stringify(plainObjects), function(err) {
   if(err) {
       return console.log(err);
       }
          console.log("The file was saved!");
        });     
        });
                stream.pipe(csvStream);
