'use strict';

angular.module('loginModule',[])
    .component('loginModule',{
    templateUrl: 'template/login.template.html',
    controller:['$http','$location','$localStorage','$rootScope',function ($http,$location,$localStorage,$rootScope) {
        var self =  this;
        var config = {headers: {
            'page': 'loaded',
            'Authorization': $localStorage.user ? 'Bearer ' + $localStorage.user.user_token: null
        }};


        self.login = function (data) {
            $http.post('/login',data,config).then(function (response) {
                console.log(response);
                if(response.status >= 200 && response.status <= 300){

                    $localStorage.user = {
                        user_token: response.data.token,
                        user_name: response.data.name,
                        user_email: response.data.email,
                        user_type: response.data.type,
                        user_logined: true
                    };
                    console.log($localStorage);
                    $rootScope.$broadcast('auth');
                    
                    if(response.data.type == 1){
                        $location.path('/adminPanel');
                        // $location.path('/account');
                    }else{
                        $location.path('/account');
                    }

                }
            })
        }
    }]
});