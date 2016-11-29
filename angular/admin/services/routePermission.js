(function () {
    angular.module('adminPanel').service('routePermission',routePermission);

    function routePermission() {
        var routeData = {
            admin : ['adminPanel','index','404','auction','product','index','logout'],
            guest : ['404']
        };

        return {
            check:check
        };

        function check(type,toParams,$state ,event) {

            if( type != 'admin' && toParams.name != 'login'){
                event.preventDefault();
                $state.go('login');
            }
        }
    }
})();