'use strict';

describe('Directive: startUpdates', function () {

  // load the directive's module
  beforeEach(module('sioStreamsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<start-updates></start-updates>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the startUpdates directive');
  }));
});
