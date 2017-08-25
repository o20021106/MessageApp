/*const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
dbUrl = "mongodb://ipingou:mlab800203@ds153123.mlab.com:53123/ipingou";

var db;
MongoClient.connect(dbUrl,(err,database)=>{
	if (err) return console.log(err)
	db = database;
	app.listen(3000,()=>{
		console.log('listening on 3000');
	});
})


*/


const mongoose = require('mongoose');

const dbUrl = "mongodb://ipingou:mlab800203@ds153123.mlab.com:53123/ipingou";

mongoose.connect(dbUrl);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('starting');
});

/*
var Cat = mongoose.model('Cat',
  { name: String }
);

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});
*/



var blogPostSchema = mongoose.Schema({
		title : String,
		post : String,
		author: String
	});

var blogPost = mongoose.model('blogPost',blogPostSchema, 'blogPost');

var newPost = new blogPost({title:'First Post', post:'this is my secod!!!!! post', author:'me'});

newPost.save(function(err,newPost){
	if(err) return console.log(err);
	console.log(newPost);
});



