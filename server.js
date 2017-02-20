'use strict';

let express = require('express');
let port = process.env.PORT || 3000;
let mongo = require('mongodb').MongoClient;
let mongoURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/image_search_api';
let routes = require('./app/routes/index.js');

let app = express();

mongo.connect(mongoURL, function(err,db){

	if(err)
		throw new Error(err);
	console.log(`Successfully connected to database`);

	app.set('port', port);
	//app.set('views', __dirname + '/views');
	app.set('view engine', 'pug');
	app.set('mongo', db);
	app.use('/public/styles', express.static(__dirname + '/public/styles'));

	routes(app);

	app.listen(app.get('port'), function(){
		console.log(`Now listening on port ${app.get('port')}`);
	});

});