'use strict'

angular.module('indexModule',[]).
    component('indexModule',{
    templateUrl: 'template/index.template.html',
    controller: ['$scope','$localStorage',function ($scope,$localStorage) {
        // console.log(localStorage.getItem('products'));
        $scope.auctions = $localStorage.auctions;
    }]
});