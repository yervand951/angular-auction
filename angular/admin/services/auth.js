(function () {

    angular.module('adminPanel').service('Auth',Auth);
    
    function Auth() {
        
        return {
           isLoginedUser:isLoginedUser,
           isUser:isUser,
           isLAdmin:isAdmin
        };
        
        
        function isLoginedUser(){
            
        }
        
        function isUser() {
            
        }
        
        function isAdmin() {
            
        }
    } 
    
})();
