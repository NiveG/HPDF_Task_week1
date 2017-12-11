var express = require('express');
var app = express();

var path = require('path');
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
var request = require('request');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.set('view engine', 'ejs');

//Task1
app.get('/', (req, res) => res.send('Hello World'));

//Task2
app.get('/authors', function(req, res){
	request('https://jsonplaceholder.typicode.com/users', function (error,response,body) {
	var x = JSON.parse(body);
	var message="";
	for(var i=0;i<10;i++){
		message += ("<li>" + x[i].name + "</li>");
	}
	res.send(message);
	})
});

app.get('/posts', function(req, res){
	request('https://jsonplaceholder.typicode.com/posts', function (error,response,body) {
	var x = JSON.parse(body);
	var msg="";
	for(var i=0;i<100;i++){
		msg+= ("<li>" + x[i].title + "</li>");
	}
	res.send(msg);
	})
});

app.get('/count', function(req, res){
request('https://jsonplaceholder.typicode.com/users', function (error,response,body) {
	var x = JSON.parse(body);
request('https://jsonplaceholder.typicode.com/posts', function (error,response,body) {
	var y = JSON.parse(body);
var message="";
var i;
for(i=0;i<10;i++){
	var j,count=0;
	message += ("<p>" + x[i].name);
	var z=x[i].id;

for(j=0;j<100;j++){
	var z1=y[j].userId;
	if(z == z1)
	{count++;}	
}
	message += ("=>     Count of posts: "+count + "</p>");
}
	res.send(message);
})
})
});

//Task3
app.get('/setcookie',function(req, res){  
	res.cookie('name', 'nive');  
	res.cookie('age', '19');  
	res.status(200).send('Cookie is set');  
});  

//Task4
app.get('/getcookies', function(req, res) {  
	res.status(200).send(req.cookies);  
});

//Task5
app.get('/robots.txt', (req, res) => {
	res.status(400).send('Bad Request');
});

//Task6
app.get('/html', (req,res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/image', (req,res) => {
	res.sendFile(__dirname + '/madi.png');
});

//Task7
var bodyParser = require('body-parser');   
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('public'));  
app.get('/input', function (req, res) {  
	res.sendFile( __dirname + "/" + "input.html" );  
})
app.post('/form_post', urlencodedParser, function (req, res) {   
   response = {  
       user_name:req.body.user_name,  
       age:req.body.age  
   };  
   console.log(response);  
   res.end(JSON.stringify(response));  
})  

app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...');
  next();
});

app.listen(3000, () => console.log('Server started on port 3000'));
