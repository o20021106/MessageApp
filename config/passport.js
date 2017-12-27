var JwtStrategy = require('passport-jwt').Strategy;  
var ExtractJwt = require('passport-jwt').ExtractJwt;  
var User = require('../src/models/user');  
var config = require('../config/main');

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['token'];
    }
    return token;
};

module.exports = function(passport) {  
  var opts = {};
  //opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.jwtFromRequest = cookieExtractor;
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

    console.log('in payload');
    console.log(jwt_payload.email)
    User.findOne({_id: jwt_payload.id}, function(err, user) {
      if (err) {
        console.log('err');
        return done(err, false);
      }
      if (user) {
        console.log('success');
        done(null, user);
      } else {
          console.log('false')
        done(null, false);
      }
    });
  }));
};