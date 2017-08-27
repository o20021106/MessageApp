var express = require ('express');
var index = require('./routers/index.js');
var api = require('./routers/api.js');
var app = express();
var path = require('path');
var DIST_DIR = path.join(__dirname,'dist/');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var validator = require('express-validator');

const dbUrl = "mongodb://ipingou:mlab800203@ds153123.mlab.com:53123/ipingou";
mongoose.connect(dbUrl);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error here:'));
db.once('open', function() {
  console.log('starting');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(express.static(DIST_DIR));

app.use('/api',api);
app.use('/',index);

app.listen(8000,function(){
	console.log('server is up');
})