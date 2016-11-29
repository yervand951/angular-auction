var auctionModule = angular.module('auctionModule',[
    // 'restangular',
    'ui.router',
    'ngAria',
    'ngRoute',
    'ngStorage',
    'ngAnimate',
    'loginModule',
    'indexModule',
    'registerModule',
    'userAccount',
    'imageupload',
    'ngMaterial'
    // 'jkAngularCarousel'
]);
auctionModule.run([
    '$rootScope', '$state', '$stateParams','Auth','routePermission','$localStorage',
    function ($rootScope, $state, $stateParams, Auth, routePermission,$localStorage) {
        
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                var type = $localStorage.user ? $localStorage.user.user_type : 'guest';
                routePermission.check(type,toState,$state,event);

                // if(!Auth.isLoginedUser() && fromState.name == 'login' ){
                //     $state.go('login')
                // }

                // if(localStorage.getItem('user_type') !== undefined){
                //     if(localStorage.getItem('user_type') == 1){
                //         middlewareAuth('admin',toState.name);
                //     }else if(localStorage.getItem('user_type') == 0){
                //         if(!middlewareAuth('user',toState.name)){
                //             // console.log(toState.name);
                //             $state.go('404');
                //             $rootScope.$on('$stateChangeSuccess',
                //                 function(event, toState, toParams, fromState, fromParams){
                //                     console.log(toState.name);
                //                     console.log(event.preventDefault());
                //                 })
                //         }
                //     }
                // }else{
                //     if(!middlewareAuth('user',toState.name)){
                //         // console.log(toState.name);
                //         $state.go('404');
                //         $rootScope.$on('$stateChangeSuccess',
                //             function(event, toState, toParams, fromState, fromParams){
                //                 console.log(toState.name);
                //                 console.log(event.preventDefault());
                //             })
                //     }
                // }


            }
        );
    }
]);

auctionModule.controller('auctionController',['$localStorage','$scope','$http','$rootScope',function ($localStorage,$scope,$http,$rootScope) {

    var config = {headers: {
        'page': 'loaded',
        'Authorization': $localStorage.user ? 'Bearer ' + $localStorage.user.user_token : null
    }};


    // $scope.user_logined = $localStorage.user.user_logined;
    $rootScope.$on('auth',function () {
        AuthCheck();
    });



    console.log('test----------');
    console.log($scope.user_logined);
    console.log('test-----------');

    function init() {
        getAllAuctions();
        AuthCheck();
        getAllProducts();
    }

    function AuthCheck() {
        if($localStorage.user){
            $scope.user_logined = $localStorage.user.user_logined;
        }else{
            $scope.user_logined = false;
        }
    }

    function getAllAuctions(){
        $http.get('/auctions',config).then(function (result) {
            $localStorage.auctions = result.data.data;
            $scope.auctions = result.data.data;
        });
    }

    function getAllProducts(){
        $http.get('/products',config).then(function (result) {
            $localStorage.products = result.data.data;
            $scope.products = result.data.data;
        });
    }

    init();

}]);