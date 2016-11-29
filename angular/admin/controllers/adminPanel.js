angular.module('adminPanel')
    .controller('adminPanelController',['$scope','$http','$rootScope','$localStorage',function ($scope, $http,$rootScope,$localStorage) {

            $scope.singleProduct = singleProduct;
            $scope.allProduct    = allProduct;
            $scope.createProduct = createProduct;
            $scope.showAuction = menuAuction;
            $scope.showProduct = menuProduct;
            $scope.allAuction = allAuction;
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
            }

            function getAllProducts(){
                $http.get('/admin/product',config).then(function (result) {
                    $scope.products =  result.data.data;
                    $localStorage.products =  result.data.data;
                });
            }

            function menuAuction() {
                allDisable();
                $scope.showCont['auction'] =  true;
            }

            function menuProduct() {
                allDisable();
                $scope.showCont['product'] =  true;
            }


            function allProduct() {
                $http.get('/admin/product',config).then(function (result) {
                    $scope.products =  result.data.data;
                });
                allDisable();
                $scope.showCont['allProduct'] =  true;

            }

            function allAuction() {
                $http.get('/admin/auction',config).then(function (result) {
                    $localStorage.auctions = result.data.data;
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
    );
