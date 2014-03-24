'use strict';

describe('Directive: fullVideo', function () {

  // load the directive's module
  beforeEach(module('sprintMdotprotoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<full-video></full-video>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fullVideo directive');
  }));
});
