#!/usr/bin/env node

var express = require('express');
var http = require('http');
//var tools = require('./extras/ArrayUtils.js');
var app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/app'));
app.set('port', process.env.PORT || 5000);

var server = http.createServer(app).listen(app.get('port'), function(){
	
	console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);
var users = [];

function update(id){

	for (var i = 0; i < users.length; i++) {

		io.sockets.in(users[i]).emit('update', {time: "" + new Date(), message: 'hello world'});
	};			
	setTimeout(update, 1000);
}

io.sockets.on('connection', function (socket) {

	socket.join(socket.id);
});

io.sockets.on("disconnect", function(socket){

    socket.removeListener("message");
    users.splice(users.indexOf(socket.id), 1);
});

app.post( '/updates', function(req, res){

	res.send(JSON.stringify({ start:req.body.start }));

	if(!req.body.start){

		users.splice(users.indexOf(req.body.id), 1);
	}else{
		users.push(req.body.id);
	}
});

update();






