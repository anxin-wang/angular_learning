// Creating a simple Modal Directive
app = angular.module('SimpleModal', []);
app.directive('modalWindow', function() {
        return {
            restrict: 'E',
            scope: {
                show: '='
            },
            replace: true, // Replace with template
            transclude: true, // To use custom content
            link: function(scope, element, attrs) {
                scope.windowStyle = {};
                if (attrs.width) {
                    scope.windowStyle.width = attrs.width;
                }
                if (attrs.height) {
                    scope.windowStyle.height = attrs.height;
                }
                scope.hideModal = function() {
                    scope.show = false;
                };
            },
            templateUrl: "modal.html"
};
});
app.controller('ModalCtrl', ['$scope', function($scope) {
    $scope.modalShown = false;
    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
    };
}
]);