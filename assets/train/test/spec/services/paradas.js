'use strict';

describe('Service: Paradas', function () {

  // load the service's module
  beforeEach(module('sprintMdotprotoApp'));

  // instantiate service
  var Paradas;
  beforeEach(inject(function (_Paradas_) {
    Paradas = _Paradas_;
  }));

  it('should do something', function () {
    expect(!!Paradas).toBe(true);
  });

});
