'use strict';

describe('Directive: tablealign', function () {

  // load the directive's module
  beforeEach(module('amatistaTrenesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tablealign></tablealign>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tablealign directive');
  }));
});
