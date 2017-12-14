var User = require("../src/models/user.js");
var utility = require("../utility/utility.js")
var User = require('../src/models/user');  
var jwt = require('jsonwebtoken');  
var config = require("../config/main")


exports.register = {
	post: function(req,res,next){
        
		req.assert('email','Please provide a valid email address').isEmail();
		req.check('password', 'Please enter a password longer than 6 characters').len({min:6});

		var errors = req.validationErrors();

		if (errors){
			return res.json({message: errors});
		}
		

		var user = new User({
			email : req.body.email,
			password: req.body.password,
			name : req.body.name
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


	}
};

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
		          res.json({ success: true, data:{token: 'bearer ' + token, user : user }});
		        } else {
		          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
		        }
		      });
		    }
		  });
		}
}