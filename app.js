var express = require ('express');
var index = require('./routers/index.js');
var api = require('./routers/api.js');
var app = express();
var path = require('path');
var DIST_DIR = path.join(__dirname,'dist/');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(DIST_DIR));

app.use('/',index);
app.use('/api',api);

app.listen(8000,function(){
	console.log('server is up');
})