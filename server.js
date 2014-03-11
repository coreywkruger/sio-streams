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

io.configure(function () { 
	io.set("transports", ["xhr-polling"]); 
  	io.set("polling duration", 10); 
});

var users = [];
var userPlaces = {};
var phrases = [
	"Lorem ipsum dolor sit amet...",
	"...consectetur adipisicing elit...",
	"...sed do eiusmod tempor incididunt...",
	"...ut labore et dolore magna aliqua.",
	"Ut enim ad minim veniam...",
	"quis nostrud exercitation ullamco laboris...",
	"nisi ut aliquip ex ea commodo consequat.",
	"Duis aute irure dolor in reprehenderit...",
	"in voluptate velit esse cillum...",
	"dolore eu fugiat nulla pariatur."
];	

var phr = 0;

function update(id){

	for (var i = 0; i < users.length; i++) {

		io.sockets.in(users[i]).emit('update', {time: "" + new Date(), message: phrases[userPlaces[users[i]]] });
		userPlaces[users[i]]++;
		userPlaces[users[i]] %= phrases.length;	
	};	
	setTimeout(update, 1000);
}

io.sockets.on('connection', function (socket) {

	socket.join(socket.id);
	socket.emit('update', {time: "" + new Date(), message: "Init..." });
});

io.sockets.on("disconnect", function(socket){

    socket.removeListener("message");
    users.splice(users.indexOf(socket.id), 1);
    delete userPlaces[socket.id];
});

var count = 0;
app.post( '/updates', function(req, res){

	res.send({ 
		start:req.body.start, 
		greeting: "Hello user!!! Welcome! Testing, testing..."
	});

	if(!req.body.start){

		users.splice(users.indexOf(req.body.id), 1);
		delete userPlaces[req.body.id];
	}else{
		users.push(req.body.id);
		userPlaces[req.body.id] = 0;
	}
});

update();






