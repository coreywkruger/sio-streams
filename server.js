#!/usr/bin/env node

var express = require('express');
var http = require('http');
var app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/app'));
app.set('port', process.env.PORT || 5000);

var server = http.createServer(app).listen(app.get('port'), function(){
	
	console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

	socket.emit('server', { name: 'server', message: 'welcome to the chat' });

	socket.on('message', function (data) {
		
		io.sockets.emit('server', data);
	});
});

io.sockets.on("disconnect", function(socket){
    socket.removeListener("message");
});

