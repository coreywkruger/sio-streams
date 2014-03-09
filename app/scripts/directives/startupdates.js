'use strict';

sioStreamsApp.directive('startUpdates', [ 'svc', function (svc) {
    return {
		    templateUrl: './views/updates.html',
		    restrict: 'A',
		    link: function postLink(scope, element, attrs) {

				scope.outputs = svc.outputs;
				
		    	//element.text('this is the startUpdates directive');
	    }
    };
}]);
