angular.module('adminPanel')
    .controller('auctionController',['$localStorage','$scope','$http',function ($localStorage,$scope, $http) {

            $scope.create = create;
            $scope.auctions = $localStorage.auction;

            var config = {headers: {
                'page': 'loaded',
                'Authorization': $localStorage.user ? 'Bearer ' + $localStorage.user.user_token: null
            }};

            init()


            function init() {
                allAuctions();
            }

            function create(Auction){
                console.log($scope.Auction);
                $http.post('admin/auction', Auction, config)
            }

            function allAuctions() {
                $http.get('/admin/auction',config).then(function (result) {
                    $scope.auction =  result.data.data;
                    $localStorage.auction =  result.data.data;
                });
            }
        }]
    );
