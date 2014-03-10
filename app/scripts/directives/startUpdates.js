'use strict';

sioStreamsApp.directive('startUpdates', [ 'svc', function (svc) {
    return {
		    templateUrl: './views/updates.html',
		    restrict: 'A',
		    link: function postLink(scope, element, attrs) {

		    	scope.startUpdates = svc.startUpdates;
				scope.outputs = svc.outputs;
	    }
    };
}]);
