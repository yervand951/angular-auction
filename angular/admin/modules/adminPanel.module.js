'use strict'

angular.module('adminPanel',[
    'ui.router',
    'ngAria',
    'ngStorage',
    'ngAnimate',
    'ngMaterial',
    // 'imageupload',
    'productAuction'
]);

angular.module('adminPanel').run([
    '$rootScope', '$state', '$stateParams','routePermission','$localStorage',
    function ($rootScope, $state, $stateParams, routePermission,$localStorage) {

        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                var type = $localStorage.user ? $localStorage.user.user_type : 'guest'
                routePermission.check(type,toState,$state,event);
            }
        );
    }
]);
