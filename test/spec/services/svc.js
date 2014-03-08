'use strict';

describe('Service: Svc', function () {

  // load the service's module
  beforeEach(module('sioStreamsApp'));

  // instantiate service
  var Svc;
  beforeEach(inject(function (_Svc_) {
    Svc = _Svc_;
  }));

  it('should do something', function () {
    expect(!!Svc).toBe(true);
  });

});
