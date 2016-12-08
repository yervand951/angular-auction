var adminPanel = angular.module('adminPanel');

adminPanel.controller('CreateProductController',CreateProductController)

CreateProductController.$inject = ['$http','$scope','$localStorage','$rootScope'];

function CreateProductController($http,$scope,$localStorage,$rootScope) {
    $scope.Product = {};
    $scope.validator = ProductValidator;
    $scope.validData = {};
    $scope.create = create;
    $scope.uploadComplete = uploadComplete;
    $scope.auctionActive = true;
    $scope.rating = 5;
    $scope.isReadonly = true;
    $scope.rateFunction = function(rating) {
        console.log('Rating selected: ' + rating);
    };

    var config = {
        headers: {
            'page': 'loaded',
            'Authorization': $localStorage.user ? 'Bearer ' + $localStorage.user.user_token : null
        }
    };

    function create(Product) {
        console.log(Product);
        $http.post('admin/product',Product, config);
        $scope.auctionActive = true;
        // $rootScope.$broadcast('openAuctionCreateForm',{
        //     formInvalid : true
        // })
    };

    function uploadComplete(content) {
        $scope.response = JSON.parse(content);
        console.log('test');
    };

    function ProductValidator() {
        if($scope.validData.name && $scope.validData.price && $scope.validData.description){
            $rootScope.$broadcast('createProductFormValid',{
                formInvalid : true
            })
        }else {
            $rootScope.$broadcast('createProductFormValid',{
                formInvalid : false
            })
        }
    }

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
};