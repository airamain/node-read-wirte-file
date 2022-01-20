// Nuevo Servicio para generar inter.
// se recibiran los archivos directamente desde Oracle...

medicionTypes = require('./types/tipoMedicion.json'); //
fs = require("fs");
csv = require("fast-csv");
const shell = require('child_process').execSync; //
const args = process.argv;
var _ = require('underscore'); //
var moment = require('moment'); //
const outputFile = 'types/fileNomNum.json';

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
      arrayNew.splice(0,1);             
          var objects = [];
        for(i=0;i<=arrayNew.length;i++){
                  
            if(arrayNew[i] && arrayNew[i].length<=1){              
                }
                if(arrayNew[i] && arrayNew[i].length>1){
                  var objMeta = {                  
                    punto: arrayNew[i][0],
                    nombre: arrayNew[i][1],
                    et: arrayNew[i][2]
                  }
              objects.push(objMeta);
            }
        }
        var puntos = _.allKeys(_.groupBy(objects,'punto'))
        var flattenArray = [];
        console.log('start , waiting...');

        for(i=0;i<puntos.length;i++){
             flattenArray.push(_.where(objects,{punto:puntos[i]}));
        }
        console.log('finish , End!');
        console.log(flattenArray);

        fs.writeFile(outputFile, JSON.stringify(objects), function(err) {
          if(err) {
            return console.log(err);
        }
      console.log("The file was saved!");
      });        
    });
    stream.pipe(csvStream);
