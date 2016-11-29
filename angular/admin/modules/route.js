angular.module('adminPanel').config(['$stateProvider' ,'$urlRouterProvider',function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('product', {
            url: "/product",
            templateUrl: "template/admin/product.html",
            controller: ['$localStorage','$rootScope',function ($localStorage,$rootScope) {
                console.log('test product');
            }]
        })
        .state('auction', {
            url: "/auction",
            templateUrl: "template/admin/auction.html",
            controller: 'auctionController'
        })
        .state('index', {
            url: "/index",
            templateUrl: "template/admin/auction.html",
            controller: 'auctionController'
        })
        .state('login', {
            url: "/login",
            templateUrl: "template/admin/login.html",
            controller: 'LoginController'
        })
        .state('404', {
            url: "/404",
            template: "<login-module></login-module>"
        })
        .state('logout', {
            url: "/logout",
            controller: ['$localStorage','$rootScope','$scope','$state','$http',function ($localStorage,$rootScope,$scope,$state,$http) {

                var config = {headers: {
                    'page': 'loaded',
                    'Authorization': $localStorage.user ? 'Bearer ' + $localStorage.user.user_token: null
                }};

                $http.get('/logout',config).then(function (result) {
                });
                $localStorage.$reset();
                $rootScope.$broadcast('auth');
                $state.go('login');
            }]
        })

}]);