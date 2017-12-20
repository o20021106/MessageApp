var User = require("../src/models/user.js");
var utility = require("../utility/utility.js")
var User = require('../src/models/user');  
var jwt = require('jsonwebtoken');  
var config = require("../config/main")
var multer  = require('multer');
var crypto = require('crypto');
var cloudinary = require('cloudinary');
var path = require('path');


exports.register = {
	post: function(req,res,next){
        
		

		const storage = multer.diskStorage({
  			destination: 'images',
  			filename: function (req, file, callback) {
	    		crypto.pseudoRandomBytes(16, function(err, raw) {
		  			if (err) return callback(err);
		 			callback(null, raw.toString('hex') + path.extname(file.originalname));
				});
  			}
		});
		var upload = multer({ storage: storage }).single('avatar');
  		upload(req, res, function (err) {
		    if (err) {
		       console.log('err');
		    }
		    else if (!req.file) { 
		    	console.log("No file received");
     		    var avatarURL= config.avatarDefault;

		      	var user = new User({
					email : req.body.email,
					password: req.body.password,
					name : req.body.name,
					avatarURL: avatarURL
				})

				User.findOne({email:req.body.email}, function(err,existingUser){
					if(existingUser){
						return res.json({message:'an user with a same email adress already exists.'});
					}
					user.save(function(err, newUser){
						if(err){
							return res.json({message:'creating new user failed'});
						}
						else{
							return res.redirect("/login");
						}
					});
				})
		    } 
		    else {
			    req.assert('email','Please provide a valid email address').isEmail();
				req.check('password', 'Please enter a password longer than 6 characters').len({min:6});

				var errors = req.validationErrors();

				if (errors){
					return res.json({message: errors});
				}


			    const host = req.hostname;
	  		    const filePath = req.protocol + "://" + host + '/' + req.file.path;
			    console.log('file received');
			    cloudinary.config(config.cloudinary);

			      //cloudinary.v2.uploader.upload_stream( (result) => console.log(result) ).end( req.file.buffer ); 

			    var avatarURL= config.avatarDefault;

			    cloudinary.v2.uploader.upload(req.file.path, function (err, response) {
			    	if (err) {
				        console.log('failed to send to cloud')
				        console.log(err);
			    	} 
			    	else {
			    		avatarURL = response.url;
				        console.log('success sending to cloud');
				        console.log(response);
				    }
					var user = new User({
						email : req.body.email,
						password: req.body.password,
						name : req.body.name,
						avatarURL: avatarURL
					})

					User.findOne({email:req.body.email}, function(err,existingUser){
						if(existingUser){
							return res.json({message:'an user with a same email adress already exists.'});
						}

						user.save(function(err, newUser){
							if(err){
								return res.json({message:'creating new user failed'});
							}
							else{
								return res.redirect("/login");
							}

						});

					});
			    });
			      
			
			}

		})
	}
}

	/*
	exports.login = {
		post: function(req, res, next){
			var user = new User({
				email : req.body.email,
			password : req.body.password
		})

		User.findOne({email: user.email}, function(err, existingUser){
			if(err){
				return res.json({message:" an err occured"})
			}

			existingUser.comparePassword(user.password, function(err, isMatch){
				if(err){
					return res.json({message:" an err occured"})
				}

				if (isMatch){
					return res.redirect('/authenticate')
				} 
				else return res.json({message: "wrong password"})
			})

		})
	}

}
*/
exports.login = {
	post : function(req, res) {  

		  req.assert('email','Please provide a valid email address').isEmail();
		  req.check('password', 'Please enter a password longer than 6 characters').len({min:6});
		  var errors = req.validationErrors();
		  if (errors){
			return res.json({message: errors});
		  }
		

		  User.findOne({
		    email: req.body.email
		  }, function(err, user) {
		    if (err) throw err;
		    if (!user) {
		      res.send({ success: false, message: 'Authentication failed. User not found.' });
		    } else {
		      // Check if password matches
		      user.comparePassword(req.body.password, function(err, isMatch) {
		        if (isMatch && !err) {
		        	console.log("match!");
		          // Create token if the password matched and no error was thrown
		          var token = jwt.sign({id : user._id}, config.secret, {

		          //var token = jwt.sign({email : user.email}, config.secret, {
		            expiresIn: 86400 // in seconds
		          });
		          //res.json({ success: true, data:{token: 'bearer ' + token, user : user }});
		          res.cookie('token', token).json({ success: true, data:{token: 'bearer ' + token, user : user }, url: 'http://localhost:8000/'});

		          //res.cookie('token', token).json({ success: true, data:{token: 'bearer ' + token, user : user }});
		        } else {
		          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
		        }
		      });
		    }
		  });
		}
}
