angular.module('adminPanel').controller('LoginController',['$scope','$http','$state','$localStorage',function ($scope,$http,$state,$localStorage) {

    var config = {headers: {
        'page': 'loaded',
        'Authorization': $localStorage.user ? 'Bearer ' + $localStorage.user.user_token: null
    }};


    $scope.login = function (data) {
        $http.post('/login',data,config).then(function (response) {
            console.log(response);
            if(response.status >= 200 && response.status <= 300){
                console.log(response);
                $localStorage.user = {
                    user_token: response.data.token,
                    user_name: response.data.name,
                    user_email: response.data.email,
                    user_type: response.data.type,
                    user_logined: true
                };
                console.log($localStorage.user);
                if(response.data.type == "admin"){
                    $state.go('auction');
                }else{
                    $state.go('login');
                }

            }
        })
    }
}]);