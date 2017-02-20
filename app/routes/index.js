let apiRouter = require('./api.js');

module.exports = function(app){	

	app.get('/', function(req,res){
		res.render('index');
	});

	app.use('/api', apiRouter);

	app.use(function(req,res){		
		if(!res.headersSent){
			res.json({error: "Invalid URL"});
		}		
	});
}