'use strict';

'use strict';

sioStreamsApp.directive('openConn', [ 'svc', function (svc) {
    return {
		    templateUrl: './views/openConn.html',
		    restrict: 'A',
		    link: function postLink(scope, element, attrs) {

		    	//svc.openSioConn();
		    	scope.outputs = svc.outputs;

		    	scope.openConnection = function(){

		    		svc.startStop( true, undefined, sock.sessionid );
		    	};
		    	scope.closeConnection = function(){

		    		svc.startStop( false, function(stopped){
		    			if(stopped) svc.closeSioConn();
		    		} );
		    	};
	    }
    };
}]);
