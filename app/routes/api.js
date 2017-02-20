let express = require('express')
let router = express.Router();

router.use(function(req,res,next){	
	req.time = new Date();
	next();
});

router.route('/imagesearch/:searchterm')
		.get(function(req,res){
			console.log(req.time);
			let db = req.app.get('mongo');
			db.collection('images').insert({name: req.params.searchterm, type: "xxx"});
			res.send(`So you're looking for ${req.params.searchterm}`);
		});

router.route('/latest/imagesearch')
		.get(function(req,res){
			res.send(`Base URL: ${req.baseUrl}, Original URL: ${req.originalUrl}`);
		});

module.exports = router;