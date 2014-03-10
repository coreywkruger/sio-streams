'use strict';

sioStreamsApp.directive('headerUpdates', [ 'svc', function (svc) {
    return {
		    templateUrl: './views/headerUpdates.html',
		    restrict: 'A',
		    link: function postLink(scope, element, attrs) {

		    	scope.startUpdates = svc.startUpdates;
				scope.greeting = svc.greeting;
	    }
    };
}]);