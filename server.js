'use strict';

let express = require('express');
let mongo = require('mongodb').MongoClient;

let app = express();
let mongoURL = 'mongodb://localhost:27017/image_search_api'


mongo.connect(mongoURL, function(err,db){

	if(err)
		throw new Error(err);

	console.log(`Successfully connected to database`);

	db.collection('images').insert({name: "first entry", type: "test"});



	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'pug');
	app.use('/public/styles', express.static(__dirname + '/public/styles'));

	app.get('/', function(req,res){
		res.render('index');
	});

	app.listen(app.get('port'), function(){
		console.log(`Now listening on port ${app.get('port')}`);
	});

});