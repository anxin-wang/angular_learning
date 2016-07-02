var app=angular.module('linkdirectives', []);
app.controller('LinkCtrl', function($scope) {

})
app.directive('linkFunction', function () {
    return {
        restrict: 'AE',
        replace: true,
        template: '<p style="background-color:{{colorName}}">Link Function Directive</p>',
        link: function (scope, element, attribute) {
            element.bind('click', function () {
                element.css('background-color', 'yellow');
                scope.$apply(function () {
                    scope.color = "yellow";
                });
            });
            element.bind('mouseover', function () {
                element.css('cursor', 'pointer');
            });
        }
    }
});