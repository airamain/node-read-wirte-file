var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('moment');
var estaciones = require('./types/tipoEstacion.json');
var _ = require('underscore');
fs = require("fs");

//var MongoClient = require('mongodb').MongoClient;
const outputFile = 'types/tipoMedicion.json';

function requireUncached(module){
  delete require.cache[require.resolve(module)]
  return require(module)
}


// middleware to use for all requests
app.use(function(req, res, next) {
  // do logging
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

  console.log('Something is happening.');
  //next();
});

app.get('/demanda', function (req, res) {
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader( "Access-Control-Allow-Origin", req.headers.origin );
  MongoClient.connect("mongodb://localhost:27017/inter", function (err, db) {
    if (err) {
      res.json({ 'error': 'No connect!' + err });
    }
    var collectionName = 'medicion-demanda-' + moment().format('DD-MM-YY');
    var collection = db.collection(collectionName);

    db.collection(collectionName).find({}).toArray(function (err, result) {
      if (err) throw err;
      //console.log(result);

      res.json(result);
      //console.log(result);
      db.close();

    });

  });

});

app.get('/intercambio', function (req, res) {
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader( "Access-Control-Allow-Origin", req.headers.origin ); 
  MongoClient.connect("mongodb://localhost:27017/inter", function (err, db) {
    if (err) {
      res.json({ 'error': 'No connect!' + err });
    }
    var collectionName = 'medicion-intercambio-' + moment().format('DD-MM-YY');
    var collection = db.collection(collectionName);

    db.collection(collectionName).find({}).toArray(function (err, result) {
      if (err) throw err;
      //console.log(result);

      res.json(result);
      //console.log(result);
      db.close();

    });

  });

});

app.get('/generacion', function (req, res) {
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader( "Access-Control-Allow-Origin", req.headers.origin ); 
  MongoClient.connect("mongodb://localhost:27017/inter", function (err, db) {
    if (err) {
      res.json({ 'error': 'No connect!' + err });
    }
    var collectionName = 'medicion-generacion-' + moment().format('DD-MM-YY');
    var collection = db.collection(collectionName);

    db.collection(collectionName).find({}).toArray(function (err, result) {
      if (err) throw err;
      //console.log(result);

      res.json(result);
      //console.log(result);
      db.close();

    });

  });

});

app.get('/trafo', function (req, res) {
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader( "Access-Control-Allow-Origin", req.headers.origin ); 
  MongoClient.connect("mongodb://localhost:27017/inter", function (err, db) {
    if (err) {
      res.json({ 'error': 'No connect!' + err });
    }
    var collectionName = 'medicion-trafo-' + moment().format('DD-MM-YY');
    var collection = db.collection(collectionName);

    db.collection(collectionName).find({}).toArray(function (err, result) {
      if (err) throw err;
      //console.log(result);

      res.json(result);
      //console.log(result);
      db.close();

    });

  });

});



app.get('/estacion', function (req, res) {
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader( "Access-Control-Allow-Origin", req.headers.origin ); 

      res.json(estaciones);  
});


app.get('/metaData', function (req, res) {
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader( "Access-Control-Allow-Origin", req.headers.origin );
  var medicionTypes = requireUncached('./types/tipoMedicion.json');
  var arrayMeta = [];
  _(medicionTypes).each(function(elem, key){
      //console.log(elem);
      arrayMeta.push(elem);
    });
      res.json(arrayMeta); 

});
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb'}));
app.patch('/metaData', function (req, res) {
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader( "Access-Control-Allow-Origin", req.headers.origin );
  console.log('test');
  var metadataArray = req.body;
  var objMetaData = {};
  for (i = 0; i < metadataArray.length; i++) {
    //console.log(arrayinter[i]);
    var key = metadataArray[i].punto;
    objMetaData[key] = {
            'punto':metadataArray[i].punto,
            'medicion':metadataArray[i].medicion,
            'tension':metadataArray[i].tension,
            'elemento':metadataArray[i].elemento,
            'tipo':metadataArray[i].tipo,
            'utilidad':metadataArray[i].utilidad,
            'estacion':metadataArray[i].estacion,
            'nombreEstacion':metadataArray[i].nombreEstacion,
            'provincia':metadataArray[i].provincia,
            'zona':metadataArray[i].zona            
        }
}; 
//console.log(objMetaData);
fs.writeFile(outputFile, JSON.stringify(objMetaData), function(err) {
  if(err) {
      return console.log(err);
      }
         console.log("The file was saved!");
         res.json({save: true}); 
       });    

});


app.listen(4001, function () {
  console.log('app listening on port 4001!');
});

