var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public' ));



/////////////////////////////////////MONGOOSE START///////////////////////////////////
const mongoose = require('mongoose');
mongoose.connect('mongodb://utsav:utsav1@ds111059.mlab.com:11059/cs');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() 
{         
      console.log("Connected To MongoLab Cloud Database");
}); 

/////SCHEMA////
var urlSchema = mongoose.Schema(
{
	url: String,
	key: String
});
var Url = mongoose.model('Url',urlSchema);
/////////////////////////////////////MONGOOSE END///////////////////////////////////



/////////////////////////////////////BODY-PARSER START///////////////////////////////////
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/////////////////////////////////////BODY-PARSER END///////////////////////////////////



///////////////////////////////////// AJAX START ////////////////////////////////

app.post('/create',function(req,res)
{	
	var url = req.body.url;
	var key = req.body.key;
	
	var newUrl = new Url({ url: url,key: key});

	newUrl.save(function (err, testEvent)
	{
  		if (err) return console.error("err");
  			console.log("Short Url Created!!");
	});
	console.log( url + "     " + key + " " );
	res.send(key);
});

app.post('/keyAlreadyInUse',function (req, res)
{
	var k = req.body.key;
	console.log('checking for ' + k );
   	Url.find({key:k},function (err, url)
   	{
        if(url.length>0)
        {
          res.send('true');
        }
        else
          res.send('false');
	    if (err) return console.error('///////////////there was an error/////////////');
    });
});

///////////////////////////////////// AJAX END ////////////////////////////////



///////////////////////////////////// ROUTING START ///////////////////////////////////

app.get('/',function(req,res){
	res.sendFile('index.html',{root:__dirname})
});

app.get('/:key',function(req,res){
	var key = req.params.key;
	Url.findOne({key:key},function (err, url) 
	{
	    if (err) return console.error("eError");
	    if(url)
	    	res.redirect(url.url);
	   	else
		{	
			res.redirect('http://lillyme.herokuapp.com');
	   	}
    });
});

///////////////////////////////////// ROUTING END ///////////////////////////////////


app.listen(process.env.PORT || 80,function()
{
	console.log('server is up and running on port 80');
});
