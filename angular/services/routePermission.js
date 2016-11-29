(function () {
    var auctionModule = angular.module('auctionModule')
    auctionModule.service('routePermission',routePermission);

    function routePermission() {
        var routeData = {
            user  : ['index','product','logout','404'],
            guest : ['login','register','404','index','logout']
        };
        

        return {
            check:check
        };

        function check(type,toParams,$state ,event) {

            console.log(routeData[type]);
            if(!routeData[type] && routeData[type].indexOf(toParams.name) == -1 && toParams.name != 'login'){
                event.preventDefault();
                $state.go('login');
            }else if(routeData[type] && routeData[type].indexOf(toParams.name) == -1 && toParams.name != '404'){
                event.preventDefault();
                $state.go('404');
            }
            if(type == 'admin' && toParams.name != 'logout'){
                event.preventDefault();
                $state.go('logout');
            }
            console.log(toParams.name);
        }
    }
})();