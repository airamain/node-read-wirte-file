//Los archivos a utilizar del INTER son a partir del 25/09/2017, lo anterior tiene otro numero de ROWS y cambian en la Metadata
//Script parsea el archivo csv inter_DD-MM-AA.csv que lo recibe como parametro
medicionTypes = require('./types/tipoMedicion.json');
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
  console.log('loading...');
  arrayinter.splice(0, 3);//se elimina los registros del 0 al 2 
  
  var csvStream = csv.createWriteStream({headers: true}),
  //writableStream = fs.createWriteStream("./out/csv/Valores_Para_PW_"+ args[2].substring(21,29) + ".csv");
  writableStream = fs.createWriteStream("e:\\inter\\Informes\\PW\\Valores_Para_PW_"+ args[2].substring(15,29) );
  
  writableStream.on("finish", function(){
    console.log("DONE!");
    process.exit(0);
  });   
  // csvStream.write({a: "a0", b: "b0"});
  // csvStream.write({a: "a1", b: "b1"});
  // csvStream.write({a: "a2", b: "b2"});
  // csvStream.write({a: "a3", b: "b4"});
  // csvStream.write({a: "a3", b: "b4"});
  
  var columnIndex = 2;
  csvStream.pipe(writableStream);
  //ESTRUCTURA DINAMICA, suerce = archivo inter_DD-MM-AA.csv generado por Oracle/TSM-xa21
  for (var i = 0;  i < arrayinter.length ; i++) { 
    var punto = arrayinter[i][0];
    if(!medicionTypes[punto]){
      //console.log('punto'+arrayinter[i][7]);
    }   
  
  else if(medicionTypes[punto].tipo === 'P' && (medicionTypes[punto].utilidad === 'T' || 
  medicionTypes[punto].utilidad === 'G') &&  (medicionTypes[punto].tension === '13,2' ||
  medicionTypes[punto].tension === '33') || medicionTypes[punto].punto === '102500' ) {
        
      for(j=0;j<=arrayinter[i].length;j++) {                  
        if(arrayinter[i][j]) {
           //arrayinter[i][j] = arrayinter[i][j].replace('.',',');
                               }
                           }
                           arrayinter[i].splice(0, 1);                           
        //csvStream.write({'punto': medicionTypes[i-1].punto, '0:00': arrayinter[i][1]});        
        
        csvStream.write({
          '0:00': arrayinter[i][2],
          '0:15': arrayinter[i][3],          
          '0:30': arrayinter[i][4],
          '0:45': arrayinter[i][5],
          '1:00': arrayinter[i][6],
          '1:15': arrayinter[i][7],
          '1:30': arrayinter[i][8],
          '1:45': arrayinter[i][9],
          '2:00': arrayinter[i][10],
          '2:15': arrayinter[i][11],
          '2:30': arrayinter[i][12],
          '2:45': arrayinter[i][13],
          '3:00': arrayinter[i][14],
          '3:15': arrayinter[i][15],
          '3:30': arrayinter[i][16],
          '3:45': arrayinter[i][17],
          '4:00': arrayinter[i][18],
          '4:15': arrayinter[i][19],
          '4:30': arrayinter[i][20],
          '4:45': arrayinter[i][21],
          '5:00': arrayinter[i][22],
          '5:15': arrayinter[i][23],
          '5:30': arrayinter[i][24],
          '5:45': arrayinter[i][25],
          '6:00': arrayinter[i][26],
          '6:15': arrayinter[i][27],
          '6:30': arrayinter[i][28],
          '6:45': arrayinter[i][29],
          '7:00': arrayinter[i][30],
          '7:15': arrayinter[i][31],
          '7:30': arrayinter[i][32],
          '7:45': arrayinter[i][33],
          '8:00': arrayinter[i][34],
          '8:15': arrayinter[i][35],
          '8:30': arrayinter[i][36],
          '8:45': arrayinter[i][37],
          '9:00': arrayinter[i][38],
          '9:15': arrayinter[i][39],
          '9:30': arrayinter[i][40],
          '9:45': arrayinter[i][41],
          '10:00': arrayinter[i][42],
          '10:15': arrayinter[i][43],
          '10:30': arrayinter[i][44],
          '10:45': arrayinter[i][45],
          '11:00': arrayinter[i][46],
          '11:15': arrayinter[i][47],
          '11:30': arrayinter[i][48],
          '11:45': arrayinter[i][49],
          '12:00': arrayinter[i][50],
          '12:15': arrayinter[i][51],
          '12:30': arrayinter[i][52],
          '12:45': arrayinter[i][53],
          '13:00': arrayinter[i][54],
          '13:15': arrayinter[i][55],          
          '13:30': arrayinter[i][56],
          '13:45': arrayinter[i][57],
          '14:00': arrayinter[i][58],
          '14:15': arrayinter[i][59],
          '14:30': arrayinter[i][60],
          '14:45': arrayinter[i][61],
          '15:00': arrayinter[i][62],
          '15:15': arrayinter[i][63],
          '15:30': arrayinter[i][64],
          '15:45': arrayinter[i][65],
          '16:00': arrayinter[i][66],
          '16:15': arrayinter[i][67],
          '16:30': arrayinter[i][68],
          '16:45': arrayinter[i][69],
          '17:00': arrayinter[i][70],
          '17:15': arrayinter[i][71],
          '17:30': arrayinter[i][72],
          '17:45': arrayinter[i][73],
          '18:00': arrayinter[i][74],
          '18:15': arrayinter[i][75],
          '18:30': arrayinter[i][76],
          '18:45': arrayinter[i][77],
          '19:00': arrayinter[i][78],
          '19:15': arrayinter[i][79],
          '19:30': arrayinter[i][80],
          '19:45': arrayinter[i][81],
          '20:00': arrayinter[i][82],
          '20:15': arrayinter[i][83],
          '20:30': arrayinter[i][84],
          '20:45': arrayinter[i][85],
          '21:00': arrayinter[i][86],
          '21:15': arrayinter[i][87],
          '21:30': arrayinter[i][88],
          '21:45': arrayinter[i][89],
          '22:00': arrayinter[i][90],
          '22:15': arrayinter[i][91],
          '22:30': arrayinter[i][92],
          '22:45': arrayinter[i][93],
          '23:00': arrayinter[i][94],
          '23:15': arrayinter[i][95],
          '23:30': arrayinter[i][96],
          '23:45': arrayinter[i][97],      
        });
        //console.log(arrayinter[i]);        
      columnIndex++;    
    }
   } 
   csvStream.end();
//console.log('congratulations, your CSV:  Valores_Para_PW'+ args[2].substring(21,29) + '.csv');   
 console.log('congratulations, your CSV:  Valores_PARA_PW'+ args[2].substring(15,29) + '.csv'); 
});
stream.pipe(csvStream);
