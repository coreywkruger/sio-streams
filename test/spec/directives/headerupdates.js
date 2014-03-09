'use strict';

describe('Directive: headerUpdates', function () {

  // load the directive's module
  beforeEach(module('sioStreamsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<header-updates></header-updates>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the headerUpdates directive');
  }));
});
