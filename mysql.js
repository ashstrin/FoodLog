//var mysql = require('mysql');

/*console.log("Testing?");

var http = require('http');

var dt = require('./myfirstmodule');

http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("The date and time are currently: " + dt.myDateTime());
	res.end();
}).listen(8080);

console.log("Huh?");*/

const express = require('express');
const app = express();
app.use('/static', express.static('public'));

app.get("/", function(req, res){
	res.send("Hey there!");
});

app.listen(3000);
/*var unique = require('uniq');

var data = [1, 2, 3, 4, 5];

console.log(unique(data));*/

/*var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "band_db",
	port: 8889
});

con.connect(function(err){
	if(err) throw err;
	console.log("Connected");
});*/

