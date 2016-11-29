'use strict';

angular.module('registerModule',[])
    .component('registerModule',{
        templateUrl: 'template/register.template.html',
        controller:['$http',function ($http) {
            var self =  this;
            var config = {headers: {
                'page': 'loaded',
                'token': null
            }
            };

            self.register = function (data) {
                $http.post('/register',data,config).then(function (response) {
                    console.log(response);
                })
            }
        }]
    });