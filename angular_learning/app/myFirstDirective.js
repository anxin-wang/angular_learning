//angular.module('myFirstDirective')
//    .directive('helloSimpleDirective', function () {
//        return {
//            scope: true, // inherits child scope from parent.
//            restrict: 'E', // An Element Directive.
//            replace: true,
//            template: '<h3>Hello Simple Directive</h3>'
//
//        };
//    });




angular.module('ngAppStrictDemo', [])
// BadController will fail to instantiate, due to relying on automatic function annotation,
// rather than an explicit annotation
    .controller('BadController', function($scope) {
        $scope.a = 1;
        $scope.b = 2;
    })
// Unlike BadController, GoodController1 and GoodController2 will not fail to be instantiated,
// due to using explicit annotations using the array style and $inject property, respectively.
    .controller('GoodController1', ['$scope', function($scope) {
        $scope.a = 1;
        $scope.b = 2;
    }])
    .controller('GoodController2', GoodController2)
    .directive('helloSimpleDirective', function () {
        return {
            //scope: true, // inherits child scope from parent.
            restrict: 'E', // An Element Directive.
            replace: true,
            template: '<h3>Hello Simple Directive</h3>'

        };
    });
function GoodController2($scope) {
    $scope.name = "World";
}
GoodController2.$inject = ['$scope'];


