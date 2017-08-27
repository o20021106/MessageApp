const mongoose = require('mongoose');

const dbUrl = "mongodb://ipingou:mlab800203@ds153123.mlab.com:53123/ipingou";

mongoose.connect(dbUrl);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error here:'));
db.once('open', function() {
  console.log('starting');
});



var blogPostSchema = mongoose.Schema({
		title : String,
		post : String,
	});

var blogPost = mongoose.model('blogPost',blogPostSchema, 'blogPost');

module.exports = blogPost;