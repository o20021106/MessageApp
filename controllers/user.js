

var User = require("../src/models/user.js");
var utility = require("../utility/utility.js")
var User = require('../src/models/user');  
var jwt = require('jsonwebtoken');  
var config = require("../config/main")
var multer  = require('multer');
var crypto = require('crypto');
var cloudinary = require('cloudinary');
var path = require('path');
import EditProfile from '../editProfile';
import Testing from '../testing';
import template from '../template';
import { renderToString } from 'react-dom/server';
import React from 'react';
const PORT = process.env.PORT || 6000;
const hostname = process.env.host || `localhost:${PORT}/`;
const hostRe = 'https://'+hostname;




exports.register = {
	post: function(req,res,next){
		req.assert('email','Please provide a valid email address').isEmail();
		req.check('password', 'Please enter a password longer than 6 characters').len({min:6});
		console.log(req.body.email);
		console.log(req.body.password);
		var errors = req.validationErrors();

		if (errors){
			return res.json({message: errors});
		}

		var user = new User({
			email : req.body.email,
			password: req.body.password,
			name : req.body.name,
			avatarURL: config.avatarDefault
		});
		User.findOne({email:req.body.email}, function(err,existingUser){
			if(existingUser){
				return res.json({error:'exist'});
			}
			user.save(function(err, newUser){
				if(err){
					return res.json({error:'failed'});
				}
				else{
					var token = jwt.sign({id : newUser._id}, config.secret, {
			            expiresIn: 86400 // in seconds
	 	          	});
	 	//          	req.session.user = newUser;
		          //res.json({ success: true, data:{token: 'bearer ' + token, user : user }});
		          	return res.cookie('token', token).json({ success: true, data:{token: 'bearer ' + token}, url: hostRe+'editProfile'});

				}
			});
		});


/*		

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
		    	req.assert('email','Please provide a valid email address').isEmail();
				req.check('password', 'Please enter a password longer than 6 characters').len({min:6});

		    	console.log("No file received");
		    	console.log(req.body.email);
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
							console.log(err);
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

		})*/
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
		

		  User.findOne({email: req.body.email}, function(err, user) {
		  	if (err) throw err;
		    if (!user) {
		      res.send({ success: false, message: 'Authentication failed. User not found.' });
		    } else {
		    	console.log('password');
		    	console.log(req.body.password);
		      // Check if password matches
		      user.comparePassword(req.body.password, function(err, isMatch) {
		      	if(err){
		      		console.log(err);
		      	}
		        if (isMatch && !err) {
		        	//req.session.user = user;
		        	console.log("match!");
		          	// Create token if the password matched and no error was thrown
		          	var token = jwt.sign({id : user._id}, config.secret, {

		          		//var token = jwt.sign({email : user.email}, config.secret, {
		            	expiresIn: 86400 // in seconds
		          	});
		          	//res.json({ success: true, data:{token: 'bearer ' + token, user : user }});
		          	res.cookie('token', token).json({ success: true, data:{token: 'bearer ' + token, user : user }, url: hostRe});

		          	//res.cookie('token', token).json({ success: true, data:{token: 'bearer ' + token, user : user }});
		        } else {
		          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
		        }
		      });
		    }
		  });
		}
}

exports.editProfile = {
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
		    	console.log('error upload');
		       console.log(err);
		    }
		    else if (!req.file) { 
		    	
		    	console.log("No picture received");
		    	console.log(req.body.name);
		    	console.log('name');

				User.findOne({email:req.user.email}, function(err,user){
					if(err){
						return res.json({error:err});
					}
					var profileItems = ['name','birthday','aboutMe','height','weight','role'];
					profileItems.forEach(function(profileItem){
						console.log(req.body[profileItem]);
						if(req.body[profileItem]){
							var data = profileItem === 'birthday'? new Date(req.body[profileItem]): req.body[profileItem]
							user[profileItem] = data;
								
						}
					});
					user.save(function(err, updatedUser){
						if(err){
							return res.json({error:err});
						}
						else{
							//req.session.user = updatedUser;
							return res.json({user: updatedUser, url:hostRe+'message'})
						}
					});
				})
				
		    } 
		    else {
			    

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
				
					User.findOne({email:req.user.email}, function(err,user){
						if(err){
							return res.json({error:err});
						}
						user.avatarURL = avatarURL;


						var profileItems = ['name','birthday','aboutMe','height','weight','role'];
						profileItems.forEach(function(profileItem){
							console.log(req.body[profileItem]);
							if(req.body[profileItem]){
								var data = profileItem === 'birthday'? new Date(req.body[profileItem]): req.body[profileItem]
								user[profileItem] = data;
								
							}
						});



						user.save(function(err, updatedUser){
							if(err){
								return res.json({error:err});
							}
							else{
								//req.session.user = updatedUser;
								return res.json({user: updatedUser, url:hostRe+'message'});
							}

						});
						

					});
			    });
			      
			
			}

		})
	}
}


exports.editProfileTesting = {
	get: function(req,res){
		const user = req.user;
		var initialState = { user };
  		initialState = {...initialState, radiumConfig:{userAgent: req.headers['user-agent']}}
		const appString = renderToString(<EditProfile {...initialState}/>);	
  		res.send(template({
    		body: appString,
    		title: 'Hello World from the server!',
   			initialState: initialState
  		}));
	}
}

exports.updateGeolocation = function(req,res){
	const user = req.user;
	User.findOne({email:req.user.email}, function(err,foundUser){
		if(err){
			return res.json({error:err});
		}

		foundUser'loc']={type:'Point',user: foundUseru}
		foundUser.save(function(err, updateUser){
			if(err){
				return res.json({error:err, });
			}
			return res.json({user:updateUser})
		})
	})
}
