let request = require('request');
let strftime = require('strftime');
let Bing = require('node-bing-api')({accKey : 'c2ba2590831b4bcfbbfeadcf6a11ea6c'});

exports.handleSearchQuery = function(req,res){
	let search_term = req.params.searchterm;
	let time_stamp = strftime('%D %T',req.time);	
	let offset = req.query.offset >= 1 ? req.query.offset : 0;
	let limit = 10;
	let results = [];
	let db = req.app.get('mongo');
	db.collection('image_search_queries').insert({search_term , time_stamp});	

	Bing.images(search_term,{
  					top: limit,  // Number of results (max 50) 
  					skip: offset    // Skip first 3 result 
  				}, function(error, response, body){
  					if(error){
  						console.error(error);
  						res.json({error: "Search error. Try again."});
  					}

  					body.value.forEach(function(searchResult){  						
  						results.push({
  							url: searchResult.contentUrl,
  							snippet: searchResult.name,
  							thumbnail: searchResult.thumbnailUrl,
  							context: searchResult.hostPageUrl 
  						});
  					});
    	res.json(results);    	
  	});
}

exports.handleLatestQuery = function(req,res,next){
	let db = req.app.get('mongo');	
	let projection = {
		_id: 0,
		term: "$search_term",
		when: "$time_stamp"
	};
	
	let cursor = db.collection('image_search_queries').aggregate([]);
	cursor.project(projection);
	cursor.sort({when: -1});

	cursor.toArray(function(err,results){
		if(err)
			throw new Error(err);
		if(results.length < 1){
				res.json({error: "There are no search queries in the database."});
				return next();
			}
		res.json(results);
	});
}