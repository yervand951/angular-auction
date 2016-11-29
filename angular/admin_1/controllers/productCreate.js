productAuction.controller('productCreateCtrl',['$http','$scope','$localStorage',function ($http,$scope,$localStorage) {
    $scope.Product = {};
    var config = {
        headers: {
            'page': 'loaded',
            'Authorization': $localStorage.user ? 'Bearer ' + $localStorage.user.user_token : null
        }
    };

    $scope.create = function () {
        console.log($scope.Product);
        $http.post('admin/product', $scope.Product, config)
    };

    $scope.uploadComplete = function (content) {
        $scope.response = JSON.parse(content);
        console.log('test');
    }
    }]
);