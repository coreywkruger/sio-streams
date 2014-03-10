'use strict';

'use strict';

sioStreamsApp.directive('openConn', [ 'svc', function (svc) {
    return {
		    templateUrl: './views/openConn.html',
		    restrict: 'A',
		    link: function postLink(scope, element, attrs) {

		    	scope.mainSocket = svc.mainSocket;

		    	scope.mainSocket = io.connect('http://chat1-0.herokuapp.com');
		    	scope.$apply();
		    	
		    	svc.openSioConn();

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
