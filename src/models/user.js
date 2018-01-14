var bcrypt = require('bcrypt');
var mongoose =require('mongoose');

var userSchema = new mongoose.Schema({
	email: { type: String, unique:true,required:true},
	password: {type: String,required:true},
	name: {type: String, required: true},
	avatarURL: {type: String},
	birthday: {type: Date},
	aboutMe:{type:String},
	height:{type:String},
	weight:{type:String},
	role:{type:String}
});

/*
userSchema.pre('save', function(next) {
	var user = this;
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			console.log(err);
			req.flash('errors', { msg: 'There was an error generating your password salt.' });
			return res.redirect('/');
		}
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) {
				console.log(err);
				req.flash('errors', { msg: 'There was an error hashing your password.' });
				return res.redirect('/');
			}
			user.password = hash;
			next();
		});
	});
});
*/

userSchema.pre('save',function(next){

	var user = this;
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(10, function(err,salt){
		if(err){
			console.log('error in gensalt');
			console.log(err);
			return res.json(err);
		}

		bcrypt.hash(user.password,salt,function(err,hash){
			if(err){
				console.log('error in hash');
				console.log(err);
				return res.json(err);
			}

			user.password = hash;
			next();
		});

	});

});


userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);

    });
};

module.exports = mongoose.model('User', userSchema, 'User');