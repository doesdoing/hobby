var app = angular.module('myApp', []);
app.controller('siteCtrl',
    function ($scope, $http, $interval, $timeout) {
        $scope.server_ip = 'localhost';
        $scope.URL1 = 'http://' + $scope.server_ip + '/sql/info?callback=JSON_CALLBACK&sql=network_info';
        $http.get($scope.URL1).success(function (response) {
            $scope.info = response;
            $scope.page = ($scope.info.length % 15) == 0 ? parseInt($scope.info.length / 15) : parseInt($scope.info.length / 15) + 1;
        });
        $scope.range = function (n) {
            return new Array(n);
        };
        $scope.arr_options = ['型号', 'IP地址', '设备位置'];
        $scope.selectValue = $scope.arr_options[0];
        $scope.which = 'model'
        $scope.selectedChange = function (v) {
            $scope.selectValue = v
            if ($scope.selectValue == '设备位置') {
                $scope.which = 'address'
            }
            if ($scope.selectValue == 'IP地址') {
                $scope.which = 'hosts_ip'
            }
            if ($scope.selectValue == '型号') {
                $scope.which = 'model'
            }
            console.log($scope.which);
        }
        
        $scope.input = (e) => {
            $scope.word = $scope.word_input;
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.btn1();
            }
        }
        $scope.page_num = 0;
        $scope.btn1 = () => {
            $scope.URL1 = 'http://' + $scope.server_ip + '/sql/info?callback=JSON_CALLBACK&sql=network_info&which=' + $scope.which + '&word=' + $scope.word;
            $http.get($scope.URL1).success(function (response) {
                $scope.info = response;
                $scope.page = ($scope.info.length % 15) == 0 ? parseInt($scope.info.length / 15) : parseInt($scope.info.length / 15) + 1;
            });
            $scope.page_num = 0;
            $scope.focus = 0;
        }
        $scope.edit = (i) => {
            $scope.model = i.model;
            $scope.ID = i.ID;
            $scope.hosts_ip = i.hosts_ip;
            $scope.admin_name = i.admin_name;
            $scope.password = i.password;
            $scope.address = i.address;
            $scope.status = i.status;
        }
        $scope.focus = 0;
        $scope.btn = function (i) {
            $scope.page_num = i * 15;
            $scope.focus = i;
        };
        $scope.filter_page = 15;

        $scope.btnExport = () => {
            $scope.filter_page = 999;
            $timeout(function () {
                $scope.filter_page = 15;
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