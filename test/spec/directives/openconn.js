'use strict';

describe('Directive: openConn', function () {

  // load the directive's module
  beforeEach(module('sioStreamsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<open-conn></open-conn>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the openConn directive');
  }));
});
