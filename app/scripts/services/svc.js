'use strict';

sioStreamsApp.provider("svc", function(){
	
	this.startUpdates = {value: false};
	this.serverMessage = {message: ''};
	this.outputs = {outs:[] };
	this.maxMessages = {max: 8};
	this.mainSocket = undefined;
	this.greeting = {message: ''};

    this.$get = ["$rootScope", "$http", function( $rootScope, $http ){
        
		var self = this;

        return {

        	startUpdates: self.startUpdates,
        	serverMessage: self.serverMessage,
        	outputs: self.outputs,
        	maxMessages: self.maxMessages,
        	mainSocket: self.mainSocket,
        	greeting: self.greeting,

			startStop: function( start, callback){

				$http({	
					method: 'POST',
					url: '/updates',
					data: {
						start: start,
						id: self.mainSocket.socket.sessionid
					},
					headers: {'Content-Type': 'application/json'}
				}).success(function (data, status, headers, config) { 

					self.startUpdates.value = data.start;
					self.greeting.message = data.greeting;

					if(callback !==undefined) callback(data.start);
				});
			},

			openSioConn: function(){

				self.mainSocket = io.connect('http://chat1-0.herokuapp.com');
				//self.mainSocket = io.connect('192.168.0.2:5000');
				
				self.mainSocket.on('update', function (data) {
					console.log(data);
					self.outputs.outs.push( data );

					if( self.outputs.outs.length > self.maxMessages.max ){
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