'use strict'

angular.module('adminPanel',[
    'productAuction'
])
    .component('adminPanel',{
        templateUrl: 'angular/admin/templates/adminPanel.template.html',
        controller: ['$scope','$http','$localStorage',function ($scope, $http,$localStorage) {

            $scope.singleProduct = singleProduct;
            $scope.allProduct    = allProduct;
            $scope.createProduct = createProduct;
            $scope.products = [];
            $scope.showCont = [];
            var config = {headers: {
                'page': 'loaded',
                'Authorization': $localStorage.user ? 'Bearer ' + $localStorage.user.user_token: null
            }};

            init()
           

           function init() {
               getAllProducts();
           }

            function getAllProducts(){
                $http.get('/admin/product',config).then(function (result) {
                    $scope.products =  result.data.data;
                });
            }
          

            function allProduct() {
                $http.get('/admin/product',config).then(function (result) {
                    $scope.products =  result.data.data;
                });
                allDisable();
                $scope.showCont['allProduct'] =  true;

            }

            function createProduct() {

                allDisable();
                $scope.showCont['createProduct'] =  true;

            }

            function  singleProduct($id) {
 debugger;
                allDisable();
                $scope.showCont['singleProduct'] =  true;
                console.log($id);

            }

            
            function allDisable() {
                console.log($scope.showCont);
                for(var value in $scope.showCont ) {
                    $scope.showCont[value] = false;
                }
            }
        }]
});
