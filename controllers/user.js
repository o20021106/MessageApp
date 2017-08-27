var User = require("../src/models/user.js");


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
			password: req.body.password
		})

		User.findOne({email:req.body.email}, function(err,existingUser){
			if(existingUser){
				return res.json({message:'an user with a same email adress already exists.'});
			}

			user.save(function(err, newUser){
				if(err){
					return res.json({message:'creating new user failed'});
				}
				return res.json({messige: 'user created'});

			});

		});
	}
};