'use strict';

'use strict';

sioStreamsApp.directive('openConn', [ 'svc', function (svc) {
    return {
		    templateUrl: './views/openConn.html',
		    restrict: 'A',
		    link: function postLink(scope, element, attrs) {

		    	//svc.openSioConn();
		    	scope.outputs = svc.outputs;

		    	var sock = io.connect('http://chat1-0.herokuapp.com');
				//sock = io.connect('192.168.0.2:5000');
				sock.on('update', function (data) {
					
					svc.outputs.outs.push( data );

					if( svc.outputs.outs.length > svc.maxMessages.max ){
						svc.outputs.outs.splice(0, 1);
					}
					$rootScope.$apply();
				});

				sock.on('disconnect', function(){
					sock.removeEventListener('update');
				});

				sock.on('close', function(){
					sock.removeEventListener('update');
				});

		    	scope.openConnection = function(){

		    		svc.startStop( true );
		    	};
		    	scope.closeConnection = function(){

		    		svc.startStop( false, function(stopped){
		    			if(stopped) svc.closeSioConn();
		    		} );
		    	};
	    }
    };
}]);
