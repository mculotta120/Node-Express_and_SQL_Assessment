var express = require('express');
var app = express();
var quantityGen  = require("../modules/quantityGen.js");
var path=require('path');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded( { extended: false } );
var pg=require('pg');
// postgres must be running and you must have this db name correct
var connectionString = 'postgres://localhost:5432/zoodb';

// static public folder
app.use( express.static( 'public' ) );

// base url
app.get( '/', function( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'views/index.html' ) );
}); // end base url

// urlencodedParser "dependency injection" is needed for POST
app.post( '/createnew', urlencodedParser, function( req, res){
  var quantity = quantityGen(1,100);
  var animal = { type:req.body.type,
                 qty: quantity
                  };
  console.log(quantity);
  console.log(req.body.type + req.body.qty ) ;
pg.connect( connectionString, function( err, client, done ){
    client.query( 'INSERT INTO animal_tab ( type, qty) VALUES ( $1, $2 )', [ req.body.type, quantity] );
  });
}); // end createNew

// send back all records in users that conform to the query
app.get( '/getlist', function( req, res ){
  var results = [];
    pg.connect( connectionString, function( err, client, done ) {
        var query = client.query('SELECT * FROM animal_tab ORDER BY type DESC;');
        query.on( 'row', function( row ) {
            results.push( row );
        }); // end row
        // close connection
        query.on('end', function() {
            done();
            return res.json(results);
        }); // end onEnd
        if(err) {
            console.log(err);
        } // end error
  }); // end connect
});


//spin up server
app.listen( 8080, 'localhost', function( req, res ){
  console.log( 'listening on 8080' );
});
