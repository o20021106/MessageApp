var User = require("../src/models/user.js");
var utility = require("../utility/utility.js")
var User = require('../src/models/user');  

exports.searchUser = {
	get: function(req,res,next){
		console.log('searchuser');
		console.log(req.body.keyword);

//		User.find({$or: [{name: {'$regex': req.body.keyword, '$options':'i'}}, 
//						{email: {$regex: `${req.body.keyword}`, $options:'i'}}]})
		User.find({name: {'$regex': req.query.keyword, '$options':'i'}})
			.select('name avatarURL _id') 
			.exec(function(err,users){
				if(err){
					console.log(err);
					return res.json({message:'creating new user failed'});
				}
				else if(users.length !== 0){
					console.log('users');
					return  res.status(200).json({ users: users})				
				}
				else{
					console.log('no users');
					console.log(users);
					return  res.status(200).json({message:'no users'})
				}
			})
		}
	}

exports.getNearbyUsers = {
	get: function(req,res,next){
		if(!req.user.loc){
			//if geolocation is undefined
			res.json({err})
		}
		else{

			Model.geoNear(req.user.loc, { maxDistance : 100000, spherical : true }, 
				function(err, results, stats) {
   					console.log(results);
   					console.log(stats);
   					res.json({users: results});
			});	
		}
	}
}