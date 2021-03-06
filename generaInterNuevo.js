//Los archivos a utilizar del INTER son a partir del 25/09/2017, lo anterior tiene otro numero de ROWS y cambian en la Metadata
//Script parsea el archivo csv inter_DD-MM-AA.csv que lo recibe como parametro
//CSV actualizado el 27-07-2018

medicionTypes = require('./types/tipoMedicion.json');
fs = require("fs");
csv = require("fast-csv");
var excelbuilder = require('msexcel-builder');
//import { createWorkbook } from 'msexcel-builder';
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
    
    // Create a newcreateWorkbookorking-path 
    var workbook = excelbuilder.createWorkbook('f:\\inter\\Informes\\Datos', 'interNuevo_' + args[2].substring(15,23) + '.xlsx');
    
    // Create a new worksheet with 106 columns and 3732 rows 
    var sheet1 = workbook.createSheet('Todo-' + args[2].substring(15,23), 186 , 4281);
    
   
 //ESTRUCTURA ESTATICA DE DATOS 
 sheet1.set(1, 1, 'PUNTO' ); 
 sheet1.set(2, 1, 'MEDICION');
 sheet1.set(3, 1, 'TENSION');
 sheet1.set(4, 1, 'ELEMENTO');
 sheet1.set(5, 1, 'TIPO');
 sheet1.set(6, 1, 'UTILIDAD');
 sheet1.set(7, 1, 'ESTACION');
 sheet1.set(8, 1, 'NOMBRE ESTACION');
 sheet1.set(9, 1, 'PROVINCIA');
 sheet1.set(10, 1, 'ZONA');
 //periodos de tiempo cada 15 minutos
 sheet1.set(11, 1, '0:00');
 sheet1.set(12, 1, '0:15');
 sheet1.set(13, 1, '0:30');
 sheet1.set(14, 1, '0:45');
 sheet1.set(15, 1, '1:00'); 
 sheet1.set(16, 1, '1:15');
 sheet1.set(17, 1, '1:30');
 sheet1.set(18, 1, '1:45');
 sheet1.set(19, 1, '2:00');
 sheet1.set(20, 1, '2:15');
 sheet1.set(21, 1, '2:30');
 sheet1.set(22, 1, '2:45');
 sheet1.set(23, 1, '3:00');
 sheet1.set(24, 1, '3:15');
 sheet1.set(25, 1, '3:30');
 sheet1.set(26, 1, '3:45');
 sheet1.set(27, 1, '4:00');
 sheet1.set(28, 1, '4:15');
 sheet1.set(29, 1, '4:30');
 sheet1.set(30, 1, '4:45');
 sheet1.set(31, 1, '5:00');
 sheet1.set(32, 1, '5:15');
 sheet1.set(33, 1, '5:30');
 sheet1.set(34, 1, '5:45');
 sheet1.set(35, 1, '6:00');
 sheet1.set(36, 1, '6:15');
 sheet1.set(37, 1, '6:30');
 sheet1.set(38, 1, '6:45');
 sheet1.set(39, 1, '7:00');
 sheet1.set(40, 1, '7:15');
 sheet1.set(41, 1, '7:30');
 sheet1.set(42, 1, '7:45');
 sheet1.set(43, 1, '8:00');
 sheet1.set(44, 1, '8:15');
 sheet1.set(45, 1, '8:30');
 sheet1.set(46, 1, '8:45');
 sheet1.set(47, 1, '9:00');
 sheet1.set(48, 1, '9:15');
 sheet1.set(49, 1, '9:30');
 sheet1.set(50, 1, '9:45');
 sheet1.set(51, 1, '10:00');
 sheet1.set(52, 1, '10:15');
 sheet1.set(53, 1, '10:30');
 sheet1.set(54, 1, '10:45');
 sheet1.set(55, 1, '11:00');
 sheet1.set(56, 1, '11:15');
 sheet1.set(57, 1, '11:30');
 sheet1.set(58, 1, '11:45');
 sheet1.set(59, 1, '12:00');
 sheet1.set(60, 1, '12:15');
 sheet1.set(61, 1, '12:30');
 sheet1.set(62, 1, '12:45');
 sheet1.set(63, 1, '13:00');
 sheet1.set(64, 1, '13:15');
 sheet1.set(65, 1, '13:30');
 sheet1.set(66, 1, '13:45');
 sheet1.set(67, 1, '14:00');
 sheet1.set(68, 1, '14:15');
 sheet1.set(69, 1, '14:30');
 sheet1.set(70, 1, '14:45');
 sheet1.set(71, 1, '15:00');
 sheet1.set(72, 1, '15:15');
 sheet1.set(73, 1, '15:30');
 sheet1.set(74, 1, '15:45');
 sheet1.set(75, 1, '16:00');
 sheet1.set(76, 1, '16:15');
 sheet1.set(77, 1, '16:30');
 sheet1.set(78, 1, '16:45');
 sheet1.set(79, 1, '17:00');
 sheet1.set(80, 1, '17:15');
 sheet1.set(81, 1, '17:30');
 sheet1.set(82, 1, '17:45'); 
 sheet1.set(83, 1, '18:00');
 sheet1.set(84, 1, '18:15');
 sheet1.set(85, 1, '18:30');
 sheet1.set(86, 1, '18:45');
 sheet1.set(87, 1, '19:00');
 sheet1.set(88, 1, '19:15');
 sheet1.set(89, 1, '19:30');
 sheet1.set(90, 1, '19:45'); 
 sheet1.set(91, 1, '20:00');
 sheet1.set(92, 1, '20:15');
 sheet1.set(93, 1, '20:30');
 sheet1.set(94, 1, '20:45'); 
 sheet1.set(95, 1, '21:00');
 sheet1.set(96, 1, '21:15');
 sheet1.set(97, 1, '21:30');
 sheet1.set(98, 1, '21:45');
 sheet1.set(99, 1, '22:00');
 sheet1.set(100, 1, '22:15');
 sheet1.set(101, 1, '22:30');
 sheet1.set(102, 1, '22:45');
 sheet1.set(103, 1, '23:00');
 sheet1.set(104, 1, '23:15');
 sheet1.set(105, 1, '23:30');
 sheet1.set(106, 1, '23:45');
var columnIndex = 2;     


//ESTRUCTURA DINAMICA, suerce = archivo inter_DD-MM-AA.csv generado por Oracle/TSM-xa21
for (var i = 0;  i < arrayinter.length ; i++) {

      var punto = arrayinter[i][0];   
      
    if(!medicionTypes[punto]){      
      
    }    
        
    for(j=0;j<=arrayinter[i].length;j++) {                  
      if(arrayinter[i][j]) {
         arrayinter[i][j];
                             }
                         }                      
    arrayinter[i].splice(0, 1);//se elimina primer registro que contiene encabezados.   
    
      sheet1.set(1,columnIndex,punto);      
      sheet1.set(2,columnIndex,medicionTypes[punto].medicion);
      sheet1.set(3,columnIndex,medicionTypes[punto].tension);
      sheet1.set(4,columnIndex,medicionTypes[punto].elemento);
      sheet1.set(5,columnIndex,medicionTypes[punto].tipo);
      sheet1.set(6,columnIndex,medicionTypes[punto].utilidad);
      sheet1.set(7,columnIndex,medicionTypes[punto].estacion);
      sheet1.set(8,columnIndex,medicionTypes[punto].nombreEstacion);
      sheet1.set(9,columnIndex,medicionTypes[punto].provincia);      
      sheet1.set(10,columnIndex,medicionTypes[punto].zona);
      //valores... que vienen del inter el cual esta actualizado al 01/09/2017  - se actualiza inter al 29-11-17 - se acturaliza el 27-07-2018

      sheet1.set(11,columnIndex,arrayinter[i][2]);
      sheet1.set(12,columnIndex,arrayinter[i][3]);
      sheet1.set(13,columnIndex,arrayinter[i][4]);
      sheet1.set(14,columnIndex,arrayinter[i][5]);
      sheet1.set(15,columnIndex,arrayinter[i][6]);
      sheet1.set(16,columnIndex,arrayinter[i][7]);
      sheet1.set(17,columnIndex,arrayinter[i][8]);
      sheet1.set(18,columnIndex,arrayinter[i][9]);
      sheet1.set(19,columnIndex,arrayinter[i][10]);
      sheet1.set(20,columnIndex,arrayinter[i][11]);
      sheet1.set(21,columnIndex,arrayinter[i][12]);
      sheet1.set(22,columnIndex,arrayinter[i][13]);
      sheet1.set(23,columnIndex,arrayinter[i][14]);
      sheet1.set(24,columnIndex,arrayinter[i][15]);
      sheet1.set(25,columnIndex,arrayinter[i][16]);
      sheet1.set(26,columnIndex,arrayinter[i][17]);
      sheet1.set(27,columnIndex,arrayinter[i][18]);
      sheet1.set(28,columnIndex,arrayinter[i][19]);
      sheet1.set(29,columnIndex,arrayinter[i][20]);
      sheet1.set(30,columnIndex,arrayinter[i][21]);
      sheet1.set(31,columnIndex,arrayinter[i][22]);
      sheet1.set(32,columnIndex,arrayinter[i][23]);
      sheet1.set(33,columnIndex,arrayinter[i][24]);
      sheet1.set(34,columnIndex,arrayinter[i][25]);
      sheet1.set(35,columnIndex,arrayinter[i][26]);
      sheet1.set(36,columnIndex,arrayinter[i][27]);
      sheet1.set(37,columnIndex,arrayinter[i][28]);
      sheet1.set(38,columnIndex,arrayinter[i][29]);
      sheet1.set(39,columnIndex,arrayinter[i][30]);
      sheet1.set(40,columnIndex,arrayinter[i][31]);
      sheet1.set(41,columnIndex,arrayinter[i][32]);
      sheet1.set(42,columnIndex,arrayinter[i][33]);
      sheet1.set(43,columnIndex,arrayinter[i][34]);
      sheet1.set(44,columnIndex,arrayinter[i][35]);
      sheet1.set(45,columnIndex,arrayinter[i][36]);
      sheet1.set(46,columnIndex,arrayinter[i][37]);
      sheet1.set(47,columnIndex,arrayinter[i][38]);
      sheet1.set(48,columnIndex,arrayinter[i][39]);
      sheet1.set(49,columnIndex,arrayinter[i][40]);
      sheet1.set(50,columnIndex,arrayinter[i][41]);
      sheet1.set(51,columnIndex,arrayinter[i][42]);
      sheet1.set(52,columnIndex,arrayinter[i][43]);
      sheet1.set(53,columnIndex,arrayinter[i][44]);
      sheet1.set(54,columnIndex,arrayinter[i][45]);
      sheet1.set(55,columnIndex,arrayinter[i][46]);
      sheet1.set(56,columnIndex,arrayinter[i][47]);
      sheet1.set(57,columnIndex,arrayinter[i][48]);
      sheet1.set(58,columnIndex,arrayinter[i][49]);
      sheet1.set(59,columnIndex,arrayinter[i][50]);
      sheet1.set(60,columnIndex,arrayinter[i][51]);
      sheet1.set(61,columnIndex,arrayinter[i][52]);
      sheet1.set(62,columnIndex,arrayinter[i][53]);
      sheet1.set(63,columnIndex,arrayinter[i][54]);
      sheet1.set(64,columnIndex,arrayinter[i][55]);
      sheet1.set(65,columnIndex,arrayinter[i][56]);
      sheet1.set(66,columnIndex,arrayinter[i][57]);
      sheet1.set(67,columnIndex,arrayinter[i][58]);
      sheet1.set(68,columnIndex,arrayinter[i][59]);
      sheet1.set(69,columnIndex,arrayinter[i][60]);
      sheet1.set(70,columnIndex,arrayinter[i][61]);
      sheet1.set(71,columnIndex,arrayinter[i][62]);
      sheet1.set(72,columnIndex,arrayinter[i][63]);
      sheet1.set(73,columnIndex,arrayinter[i][64]);
      sheet1.set(74,columnIndex,arrayinter[i][65]);
      sheet1.set(75,columnIndex,arrayinter[i][66]);
      sheet1.set(76,columnIndex,arrayinter[i][67]);
      sheet1.set(77,columnIndex,arrayinter[i][68]);
      sheet1.set(78,columnIndex,arrayinter[i][69]);
      sheet1.set(79,columnIndex,arrayinter[i][70]);
      sheet1.set(80,columnIndex,arrayinter[i][71]);
      sheet1.set(81,columnIndex,arrayinter[i][72]);
      sheet1.set(82,columnIndex,arrayinter[i][73]);
      sheet1.set(83,columnIndex,arrayinter[i][74]);
      sheet1.set(84,columnIndex,arrayinter[i][75]);
      sheet1.set(85,columnIndex,arrayinter[i][76]);
      sheet1.set(86,columnIndex,arrayinter[i][77]);
      sheet1.set(87,columnIndex,arrayinter[i][78]);
      sheet1.set(88,columnIndex,arrayinter[i][79]);
      sheet1.set(89,columnIndex,arrayinter[i][80]);
      sheet1.set(90,columnIndex,arrayinter[i][81]);
      sheet1.set(91,columnIndex,arrayinter[i][82]);
      sheet1.set(92,columnIndex,arrayinter[i][83]);
      sheet1.set(93,columnIndex,arrayinter[i][84]);
      sheet1.set(94,columnIndex,arrayinter[i][85]);
      sheet1.set(95,columnIndex,arrayinter[i][86]);
      sheet1.set(96,columnIndex,arrayinter[i][87]);
      sheet1.set(97,columnIndex,arrayinter[i][88]);
      sheet1.set(98,columnIndex,arrayinter[i][89]);
      sheet1.set(99,columnIndex,arrayinter[i][90]);
      sheet1.set(100,columnIndex,arrayinter[i][91]);
      sheet1.set(101,columnIndex,arrayinter[i][92]);
      sheet1.set(102,columnIndex,arrayinter[i][93]);
      sheet1.set(103,columnIndex,arrayinter[i][94]);
      sheet1.set(104,columnIndex,arrayinter[i][95]);
      sheet1.set(105,columnIndex,arrayinter[i][96]);
      sheet1.set(106,columnIndex,arrayinter[i][97]);
      sheet1.set(107,columnIndex,arrayinter[i][98]);
      sheet1.set(108,columnIndex,arrayinter[i][99]);
      sheet1.set(109,columnIndex,arrayinter[i][100]);
      sheet1.set(110,columnIndex,arrayinter[i][101]);
      sheet1.set(110,columnIndex,arrayinter[i][102]);
      columnIndex++;    
    //}
   }
      
 // Save file.
 workbook.save(function(ok){
   if (!ok) 
     workbook.cancel();
   else
     console.log('congratulations, your workbook created');
 });
 console.log('congratulations, your workbook  interNuevo-Demanda_'+ args[2].substring(21,29) + '.xlsx');
 
});
stream.pipe(csvStream);
