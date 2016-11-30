angular.module('auctionModule').config(['$stateProvider' ,'$urlRouterProvider',function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index");

    $stateProvider
        .state('register', {
            url: "/register",
            template: "<register-module></register-module>"
        })
        .state('login', {
            url: "/login",
            template: "<login-module></login-module>"
        })
        .state('index', {
            url: "/index",
            template: "<index-module></index-module>"
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
                $state.go('index');


            }]
        })
        .state('product', {
            url: "/product/:id",
            template: "<single-product-module></single-product-module>",
            controller: ['$scope','$stateParams','socketService',function($scope,$stateParams,socketService){
                $scope.product =  JSON.parse(localStorage.getItem('products'))[$stateParams.id];
                console.log($scope.product);
            }]
        })
}]);