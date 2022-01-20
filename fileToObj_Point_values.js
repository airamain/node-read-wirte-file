
fs = require("fs");
csv = require("fast-csv");
const args = process.argv;
var stream = fs.createReadStream(args[2]);
var arrayinter = [];
const outputFile = 'types/filePointValues.json';
var csvStream = csv()
    .on("data", function (data) {
        arrayinter.push(data);
    })
    .on("end", function () {
        console.log('end');

         var plainObjects = [];
         var objMetaData = {};         
                for (i = 0; i < arrayinter.length; i++) {
                    console.log(arrayinter[i]);
                    var horaPeriodo = arrayinter[i][0];
                    objMetaData[horaPeriodo] = {
                            'medicion':arrayinter[i][1],                            
                        }
                };                
fs.writeFile(outputFile, JSON.stringify(objMetaData), function(err) {
   if(err) {
   return console.log(err);
    }
    console.log("The file was saved!");
        });
});
stream.pipe(csvStream);