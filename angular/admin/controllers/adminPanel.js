angular.module('adminPanel')
    .controller('adminPanelController',['$scope','$http','$rootScope','$localStorage',function ($scope, $http,$rootScope,$localStorage) {

            $scope.singleProduct = singleProduct;
            $scope.allProduct    = allProduct;
            $scope.createProduct = createProduct;
            $scope.showAuction = menuAuction;
            $scope.showProduct = menuProduct;
            $scope.allAuction = allAuction;
            $scope.createAuction = createAuction;
            $scope.singleProductObj = {};
            $scope.products = [];
            $scope.showCont = [];
        
            if($localStorage.user){
                var config = {
                    headers: {
                        'page': 'loaded',
                        'Authorization': $localStorage.user.user_token ? 'Bearer ' + $localStorage.user.user_token: null
                    }
                };
            }

            $rootScope.$on('auth',function () {
                if($localStorage.user){
                    $scope.localStorage = $localStorage;
                    $scope.user_logined = $localStorage.user.user_logined;
                }else{
                    $scope.user_logined = false;
                }
            });

            init();


            function init() {
                getAllProducts();
                getAllAuction();
            }

            function getAllAuction() {
                $http.get('/admin/auction',config).then(function (result) {
                    result = sortById(result.data.data);
                    $localStorage.auctions = result;
                    $scope.auctions = result;
                });
            }

            function getAllProducts(){
                $http.get('/admin/product',config).then(function (result) {
                    result = sortById(result.data.data);
                    $scope.products =  result;
                    $localStorage.products =  result;
                });
            }

            function sortById(data) {
                var length =  data.length;
                var result = {};

                for(var i = 0; i < length; i++){
                    result[data[i].id] = data[i];
                }

                return result;
            }

            function allProduct() {
                getAllAuction();
                allDisable();
                $scope.showCont['allProduct'] =  true;
            }

            function createProduct() {
                allDisable();
                $scope.showCont['createProduct'] =  true;
            }

            function createAuction(){
                allDisable();
                $scope.showCont['createAuction'] =  true;
            }

            function allAuction() {
                getAllAuction();
                allDisable();
                $scope.showCont['allProduct'] =  true;
            }

            function menuAuction() {
                allDisable();
            }

            function menuProduct() {
                allDisable();
            }

            function  singleProduct(id) {
                $scope.singleProductObj = $scope.products[id];
                console.log($scope.singleProductObj);
                allDisable();
                $scope.showCont['singleProduct'] =  true;
            }


            function allDisable() {
                console.log($scope.showCont);
                for(var value in $scope.showCont ) {
                    $scope.showCont[value] = false;
                }
            }
        }]
    );
