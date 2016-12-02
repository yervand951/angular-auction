(function () {
    
    var auctionModule  = angular.module('auctionModule');
    auctionModule.service('socketService',socketService);
    
    function socketService() {
        var socket = io.connect('auction.am:8080');

        socket.on('connect', function () {
            socket.emit('world', {my:'data'});
        });

        socket.on('message', function (data) {
            console.log(data);
        });
    }
})();