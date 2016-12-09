var auctionModule = angular.module('auctionModule');

auctionModule.directive('customCarousel',function ($interval,$window) {
    return {
        templateUrl: 'template/customCarousel.html',
        link: function ($scope,$element,$attrs) {
            $scope.ClassActive = 'active';
            $scope.ClassLeft = 'left';
            $scope.ClassRight = 'right';
            $scope.turnLeft = turnLeft;
            $scope.turnRight = turnRight;

            $scope.itemCount = 0;
            $scope.indexActive = 1;
            $scope.images = [
                'http://www.planwallpaper.com/static/images/518079-background-hd.jpg',
                'http://www.planwallpaper.com/static/images/518084-background-hd.jpg',
                'http://www.wallpaperscharlie.com/wp-content/uploads/2016/11/Background-Photos-8.jpg',
                'http://www.planwallpaper.com/static/images/Fall-Nature-Background-Pictures.jpg',
                'https://i.ytimg.com/vi/A7ZkZazfvao/maxresdefault.jpg'
            ];

            init();

            function init() {
                angular.element(document).ready(function () {
                    $scope.itemCount = $element.children().eq(0).children().length;
                    firstAddClass();
                    $element.css('height', $window.innerWidth/2 + 'px');
                })
            }

            // $interval(function () {
            //     turnLeft();
            // },2000);

            function firstAddClass() {
                $element.children().eq(0).children().eq(0).addClass($scope.ClassRight);
                $element.children().eq(0).children().eq(1).addClass($scope.ClassActive);
                $element.children().eq(0).children().eq(2).addClass($scope.ClassLeft);
            }

            function turnLeft() {
                removeClass();
                checkIndex();
                $element.children().eq(0).children().eq($scope.indexActive++).addClass($scope.ClassLeft);
                $element.children().eq(0).children().eq($scope.indexActive >= $scope.itemCount ?  $scope.indexActive - $scope.itemCount : $scope.indexActive).addClass($scope.ClassActive);
                $element.children().eq(0).children().eq($scope.indexActive + 1 >= $scope.itemCount ?  $scope.indexActive - $scope.itemCount + 1 : $scope.indexActive + 1).addClass($scope.ClassRight);

            }

            function turnRight() {
                removeClass();
                checkIndex();
                $element.children().eq(0).children().eq($scope.indexActive--).addClass($scope.ClassRight);
                $element.children().eq(0).children().eq($scope.indexActive < 0 ? $scope.itemCount -1 : $scope.indexActive ).addClass($scope.ClassActive);
                $element.children().eq(0).children().eq($scope.indexActive < 0 ? $scope.itemCount - 2 : $scope.indexActive - 1 ).addClass($scope.ClassLeft);
            }

            function removeClass() {
                $element.children().eq(0).children().removeClass($scope.ClassRight);
                $element.children().eq(0).children().removeClass($scope.ClassActive);
                $element.children().eq(0).children().removeClass($scope.ClassLeft);
            }

            function checkIndex() {
                if($scope.indexActive < 0){
                    $scope.indexActive = $scope.itemCount -1;
                }else if($scope.indexActive >= $scope.itemCount ){
                    $scope.indexActive = 0;
                }
            }
        }
    }

});