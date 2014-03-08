'use strict';

sioStreamsApp.directive('startUpdates', function () {
    return {
		    template: 'views/updates.html',
		    restrict: 'A',
		    link: function postLink(scope, element, attrs) {
		    	element.text('this is the startUpdates directive');
	    }
    };
});
