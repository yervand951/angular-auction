(function () {

    var auctionModule = angular.module('auctionModule')
        auctionModule.service('Auth',Auth);
    
    function Auth() {
        
        return {
           isLoginedUser:isLoginedUser,
           isUser:isUser,
           isLAdmin:isAdmin
        }
        
        
        function isLoginedUser(){
            
        }
        
        function isUser() {
            
        }
        
        function isAdmin() {
            
        }
    } 
    
})();
