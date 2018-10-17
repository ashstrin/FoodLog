var express = require('express');
var mysql = require('mysql');
var app = express();
var path = require('path');
var serveStatic = require('serve-static');

app.use(express.static(path.join(__dirname, 'dist'))); //<- this is correct

app.get('/', function(req,res){
        //res.send("Testing (?)");
//Error: Can't set headers after they are sent. -- caused by the code above (?)

        res.sendFile(path.join(__dirname + '/index.html'));
})

//app.use(express.static('client/'));
var server = app.listen(8081, function(){
        var host = server.address().address;
        var port = server.address().port;

        console.log("Listening (?)");
})
