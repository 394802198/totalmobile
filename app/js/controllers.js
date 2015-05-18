var tmAppControllers = angular.module('tmApp.controllers', []);

tmAppControllers.controller('indexController', ['$scope', function($scope) {

    $.scrollUp({
        scrollName: 'scrollUp',
        topDistance: '300',
        topSpeed: 300,
        animation: 'fade',
        animationInSpeed: 200,
        animationOutSpeed: 200,
        scrollText: '',
        activeOverlay: false
    });

}]);

