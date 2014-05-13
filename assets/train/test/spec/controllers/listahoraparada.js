'use strict';

describe('Controller: ListahoraparadaCtrl', function () {

  // load the controller's module
  beforeEach(module('amatistaTrenesApp'));

  var ListahoraparadaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListahoraparadaCtrl = $controller('ListahoraparadaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
