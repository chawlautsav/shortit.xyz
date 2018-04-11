var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public' ));
const mongoose = require('mongoose');
var bodyParser = require('body-parser');


/////////////////////////////////////MONGOOSE START///////////////////////////////////
mongoose.connect('mongodb://utsav:utsav1@ds111059.mlab.com:11059/cs');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {         
      // we're connected!
      console.log("Connected To MongoLab Cloud Database :p");
}); 

/////SCHEMA////
var urlSchema = mongoose.Schema({
	url: String,
	key: String
})
var Url = mongoose.model('Url',urlSchema);




app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(bodyParser.json());
/////////////////////////////////////MONGOOSE START///////////////////////////////////


/////////////////////////////////////ROUTE///////////////////////////////////
var a = [];
app.get('/',function(req,res){
	res.sendFile('index.html',{root:__dirname})
});
app.listen(process.env.PORT || 3000,function()
{
	console.log('server is up and running');
});
app.post('/short',function(req,res)
{
	var url = req.body.url;
	var key = req.body.key;
	
	a[key] = url;
	var newUrl = new Url({ url: url,key: key});

	newUrl.save(function (err, testEvent) {
  if (err) return console.error(err);
  console.log("Short Url Created!!");
	});


	console.log( url + "     " + key + " " );
});
app.get('/:url',function(req,res){

	var key = req.params.url;
	
	Url.findOne({key:key},function (err, url) {
        console.log(url.url);
        if (err) return console.error(err);
    if(url)
    	res.redirect(url.url);
   	else
   		console.log( "Error on line 70");
    });


});
app.get('/*',function(req,res){
	res.send('Error 404 || File Not Found!');
});

