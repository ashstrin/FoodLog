var mysql = require('mysql');

console.log("Testing?");

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "band_db",
	port: 8889
});

con.connect(function(err){
	if(err) throw err;
	console.log("Connected");
});

