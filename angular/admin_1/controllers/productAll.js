productAuction.controller('productAllCtrl',['$http','$scope','$localStorage',function ($http,$scope,$localStorage) {

    $scope.Product = {};
       var config = {headers: {
           'page': 'loaded',
           'Authorization': $localStorage.user ? 'Bearer ' + $localStorage.user.user_token: null
       }};

    $scope.products = function () {

        $http.get('/admin/product',config).then(function (result) {
            $scope.products =  result.data.data;
            console.log($scope.products);
        });
       }
   }]
);