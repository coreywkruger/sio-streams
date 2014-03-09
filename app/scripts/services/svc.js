'use strict';

sioStreamsApp.provider("svc", function(){
	
	this.startUpdates = {value: false};
	this.serverMessage = {message: ''};
	this.outputs = {outs:[
		{time: '', message: ''},
		{time: '', message: ''},
		{time: '', message: ''},
		{time: '', message: ''},
		{time: '', message: ''},
		{time: '', message: ''}
	]};
	this.status = {value: false};
	this.mainSocket = undefined;

    this.$get = ["$rootScope", "$http", function( $rootScope, $http ){
        
		var self = this;

        return {

        	startUpdates: self.startUpdates,

        	serverMessage: self.serverMessage,

        	outputs: self.outputs,

        	status: self.status,

        	mainSocket: self.mainSocket,

			startStop: function( start, callback){

				$http( {	
					method: 'POST',
					url: '/updates',
					data: {
						start: start,
						id: self.mainSocket.socket.sessionid
					},
					headers: {'Content-Type': 'application/json'}
				} ).success(function (data, status, headers, config) { 

					self.startUpdates.value = data.start;

					if(callback !==undefined) callback(data.start);

					if(data.callback !== undefined){

						data.callback(self.status);
					}
				});
			},

			openSioConn: function(){

				//var socket = io.connect('http://chat1-0.herokuapp.com');
				self.mainSocket = io.connect('192.168.0.2:5000');

				self.mainSocket.on('update', function (data) {
					
					self.outputs.outs.push( data );

					if( self.outputs.outs.length > 6 ){
						self.outputs.outs.splice(0, 1);
					}
					$rootScope.$apply();
				});

				self.mainSocket.on('disconnect', function(){

					self.mainSocket.removeEventListener('update');
				});

				self.mainSocket.on('close', function(){

					self.mainSocket.removeEventListener('update');
				});
			},

			closeSioConn: function(){

				self.mainSocket.removeEventListener('update');
			}
        }
    } ];
});