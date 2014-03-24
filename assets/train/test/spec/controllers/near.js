'use strict';

describe('Controller: NearCtrl', function () {

  // load the controller's module
  beforeEach(module('sprintMdotprotoApp'));

  var NearCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NearCtrl = $controller('NearCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
