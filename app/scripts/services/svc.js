'use strict';

sioStreamsApp.provider("svc", function(){
	
	this.startUpdates = {value: false};
	this.serverMessage = {message: ''};
	this.outputs = {outs: []}
	this.status = {value: false};

    this.$get = ["$rootScope", "$http", function( $http, $rootScope ){
        
		var self = this;

        return {

        	startUpdates: self.startUpdates,

        	serverMessage: self.serverMessage,

        	status: self.status,

			start: function( start, callback){

				$http({	
					method: 'POST',
					url: '/updates',
					data: {start: start},
					headers: {'Content-Type': 'application/json'}
				}).success(function (data, status, headers, config) { 

					self.startUpdates.value = data.start;

					if(callback !==undefined) callback(start);

					if(data.callback !== undefined){

						data.callback(self.status);
					}
				});
			},

			openSioConn: function(){

				//var socket = io.connect('http://chat1-0.herokuapp.com');
				var socket = io.connect('localhost:5000');

				socket.on('update', function (data) {
					
					scope.outputs.outs.push( data );
					$rootScope.$apply();
				});

				socket.on('disconnect', function(){

					socket.removeEventListener('update');
				});
			}
        }
    } ];
});