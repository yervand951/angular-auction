// angular.module('auctionModule')
//     .config(['$locationProvider' ,'$routeProvider',
//     function config($locationProvider, $routeProvider) {
//         $locationProvider.hashPrefix('!');
//         var Admin = 1;
//
//         if(localStorage.getItem('user_type') == 1 || localStorage.getItem('user_type') == 0) {
//
//             if (localStorage.getItem('user_type') == Admin) {
//                 $routeProvider.when('/admin', {
//                     template: '<admin-panel></admin-panel>',
//                     controller: 'newCtrl'
//                 }).when('/product/create', {
//                     template: '<product-create></product-create>'
//                 }).when('/product/all', {
//                     template: '<product-all></product-all>'
//                 }).when('/index', {
//                     template: '<index-module></index-module>'
//                 }).when('/login', {
//                     template: '<login-module></login-module>'
//                 })
//             } else {
//                 $routeProvider.when('/login', {
//                     template: '<login-module></login-module>'
//                 }).when('/register', {
//                     template: '<register-module></register-module>'
//                 }).when('/account', {
//                     template: '<user-account></user-account>'
//                 }).when('/index', {
//                     template: '<index-module></index-module>'
//                 }).otherwise('/index');
//             }
//         }
//         $routeProvider.when('/login', {
//             template: '<login-module></login-module>'
//         }).when('/register', {
//             template: '<register-module></register-module>'
//         }).when('/product/:id', {
//             template: function (params) {
//                 return '<single-product-module ng-init="prodId = '+ params.id +'"></single-product-module>';
//             }
//         }).when('/index', {
//             template: '<index-module></index-module>'
//         }).otherwise('/index');
//
//     }
// ]);
//
// angular.module('auctionModule').controller('newCtrl',function ($scope) {
//
// });