'use strict';

let express = require('express');

let app = express();

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