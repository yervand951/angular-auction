'use strict';

angular.module('userAccount',[])
    .component('userAccount',{
        templateUrl: 'template/account.template.html',
        controller:['$http','$localStorage',function ($http,$localStorage) {
            var config = {headers: {
                'page': 'loaded',
                'Authorization': $localStorage.user ? 'Bearer ' + $localStorage.user.user_type: null
            }};
            var self = this;
            self.email = localStorage.getItem("user_email");
            self.name  = localStorage.getItem("user_name");
            
            self.test = function () {
                $http.get('/test',config).then(function (result) {
                    console.log(result);
                })
            }
        }]
});
