var app = angular.module('myApp', []);
app.controller('siteCtrl',
    function ($scope, $http, $interval,$timeout) {
        $scope.server_ip='localhost';

        $scope.URL1 = 'http://' + $scope.server_ip + '/contacts/info?callback=JSON_CALLBACK&word=';
        $http.get($scope.URL1).success(function (response) {
            $scope.info = response;
            $scope.page = ($scope.info.length % 15) == 0 ? parseInt($scope.info.length / 15) : parseInt($scope.info.length / 15) + 1;
        });
        $scope.range = function (n) {
            return new Array(n);
        };
        $scope.input = (e) => {
            $scope.word = $scope.word_input;
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.btn1();
            }
        }
        $scope.btn1 = () => {
            $scope.URL1 = 'http://' + $scope.server_ip + '/contacts/info?callback=JSON_CALLBACK&word=' + $scope.word;
            $http.get($scope.URL1).success(function (response) {
                $scope.info = response;
                $scope.page = ($scope.info.length % 15) == 0 ? parseInt($scope.info.length / 15) : parseInt($scope.info.length / 15) + 1;
            });
            $scope.page_num = 0;
            $scope.focus = 0;
        }
        $scope.edit = (i) => {
            $scope.ID = i.ID;
            $scope.vandor = i.vandor;
            $scope.qq = i.qq;
            $scope.phone = i.phone;
            $scope.name = i.name;
            $scope.system = i.system;
            $scope.duty = duty;
        }
        $scope.page_num = 0;

        $scope.focus = 0;
        $scope.btn = function (i) {
            $scope.page_num = i * 15;
            $scope.focus = i;
        };
        $scope.filter_page=15;
        
        $scope.btnExport = () => {
            $scope.filter_page=999;
            $timeout(function() {
                $scope.filter_page=15;
            }, 300);

        };
        $(document).ready(function () { 
            $("#btnExport").click(function () {
                setTimeout(() => {
                    $("#tableExcel").table2excel({
                        exclude: ".noExl", 
                        filename: new Date().getTime(), 
                        exclude_img: true,
                        exclude_links: true,
                        exclude_inputs: true
                    });
                }, 100);
            });
        });
        
    });