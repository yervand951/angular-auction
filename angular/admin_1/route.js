angular.module('adminPanel')
    .config(['$locationProvider' ,'$routeProvider',function ($locationProvider ,$routeProvider) {
        $locationProvider.hashPrefix('admin');

        if(true){
            $routeProvider.
            when('/product/all', {
                template: '<product-all></product-all>'
            }).
            otherwise('/admin');
        }
    }]);