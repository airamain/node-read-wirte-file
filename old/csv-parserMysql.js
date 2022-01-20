var mysql      = require('mysql');
fs = require("fs");
csv = require("fast-csv");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'a2006drian',
  database : 'inter'
});

connection.connect();

var stream = fs.createReadStream("inter_26-07-17.csv");
var arrayinter=[];
var csvStream = csv()
   .on("data", function(data){
       arrayinter.push(data);
   })
   .on("end", function(){
     //console.log(arrayinter[270]);
       arrayinter.splice(0,270);
     for(i=0;  i<arrayinter.length; i++){
     var headerValues = [arrayinter[i][0],arrayinter[i][1]];
       arrayinter[i].splice(0,2);   
         for(j=0; j<arrayinter[i].length; j++){
              //console.log(data12[i][j]);
                connection.query('INSERT INTO `inter`.`medicion`('+
                    '`puntoScada`,`bloqueTiempo`,`datoMedicion`,`valor`,`time`,`date`) VALUES(?,?,?,?,sysdate(),sysdate())',
                    [
                        headerValues[0],
                        j,
                        headerValues[1],
                        arrayinter[i][j]                    
                    ], function (error, results, fields) {
                        if (error) throw error;
                        //console.log('The solution is: ', results[0].name);                     
                        });
        }       
    }   
        console.log("done");
   });
stream.pipe(csvStream);