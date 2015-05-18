var tmApp = angular.module('tmApp', ['ui.router', 'duScroll', 'tmApp.controllers']);

tmApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'tpls/home.html',
                controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                    $rootScope.title = 'Home - Total Mobile Wholesale';
                }]

            })
            .state('broadband', {
                url: '/broadband',
                templateUrl: 'tpls/broadband.html',
                controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                    $rootScope.title = 'Broadband Service - Total Mobile Wholesale';
                }]
            })
            .state('wifi', {
                url: '/wifi',
                templateUrl: 'tpls/wifi.html',
                controller: ['$scope', '$rootScope', '$location', '$anchorScroll',
                    function($scope, $rootScope, $location, $anchorScroll) {
                        $rootScope.title = 'Wifi Coverage - Total Mobile Wholesale';
                        $scope.gotoAnchor = function(target) {
                            $location.hash(target);
                            $anchorScroll();
                        };
                        $('#wifiAffix').affix({
                            offset: {
                                top: 71
                            }
                        });
                    }
                ]
            })
            .state('mobile', {
                url: '/mobile',
                templateUrl: 'tpls/mobile.html',
                controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                    $rootScope.title = 'Mobile Application - Total Mobile Wholesale';
                    $('#carousel-example-generic').carousel();
                    $scope.slide = function(target) {
                        $('#carousel-example-generic').carousel(target);
                    };
                }]
            })
            .state('isp', {
                url: '/isp',
                templateUrl: 'tpls/isp.html',
                controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                    $rootScope.title = 'ISP Provider - Total Mobile Wholesale';
                }]
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'tpls/contact.html',
                controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                    $rootScope.title = 'Contact - Total Mobile Wholesale';
                }]
            });

        $locationProvider.html5Mode(true);
    }
]);
