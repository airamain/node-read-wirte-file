// Nuevo Servicio para generar inter.
// se recibiran los archivos directamente desde Oracle...

medicionTypes = require('./types/tipoMedicion.json'); //
fs = require("fs");
csv = require("fast-csv");
const shell = require('child_process').execSync; //
const args = process.argv;
var _ = require('underscore'); //
var moment = require('moment'); //
const outputFile = 'types/filePointValues.json';

var arrayMeta = [];
_(medicionTypes).each(function(elem, key){
    //console.log(elem);
    arrayMeta.push(elem);
  });
var stream = fs.createReadStream(args[2]);
var arrayNew = [];
var csvStream = csv()
    .on("data", function (data) {
        arrayNew.push(data);
    })
    .on("end", function () {
          var hora = 'HORA=00:00';
          var objects = [];
          var addPuntos = true;
          var puntos = [];
        for(i=0;i<=arrayNew.length;i++){
            addPuntos = (arrayNew[i] && i>0 && arrayNew[i][0] === 'HORA=00:15') ? false : addPuntos;
            if(i>0 && arrayNew[i] && addPuntos) {
              puntos.push(arrayNew[i][1]);
            }     
            if(arrayNew[i] && arrayNew[i].length<=1){
              hora = arrayNew[i][0];
                }
                if(arrayNew[i] && arrayNew[i].length>1){
                  var objMeta = {
                    hora: hora,
                    punto: arrayNew[i][1],
                    valor: arrayNew[i][2]
                  }
              objects.push(objMeta);
            }
        }
      //  console.log(puntos);
      //  process.exit(1);
    //   var puntos = _.allKeys(_.groupBy(objects,'punto'))
        var flattenArray = [];
        console.log('start puntos, waiting...');

        for(i=0;i<puntos.length;i++){
             flattenArray.push(_.where(objects,{punto:puntos[i]}));
        }
        console.log('finish puntos, End!');
        console.log(flattenArray);

        fs.writeFile(outputFile, JSON.stringify(objects), function(err) {
          if(err) {
            return console.log(err);
        }
      console.log("The file was saved!");
      });        
    });
    stream.pipe(csvStream);
