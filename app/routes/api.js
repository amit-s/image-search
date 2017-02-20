let express = require('express');
let router = express.Router();
let api = require('../controller/api-functions.js');

router.use(function(req,res,next){	
	req.time = new Date();
	next();
});

router.route('/imagesearch/:searchterm')
		.get(api.handleSearchQuery);

router.route('/latest/imagesearch')
		.get(api.handleLatestQuery);

module.exports = router;