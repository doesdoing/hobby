var app = angular.module('myApp', []);
app.controller('siteCtrl',
    function ($scope, $http, $interval, $timeout) {
        $scope.server_ip='localhost';

        $scope.URL1 = 'http://' + $scope.server_ip + '/sql/info?callback=JSON_CALLBACK&sql=sql_info';
        $http.get($scope.URL1).success(function (response) {
            $scope.info = response;
            $scope.page = ($scope.info.length % 15) == 0 ? parseInt($scope.info.length / 15) : parseInt($scope.info.length / 15) + 1;

        });
        $scope.range = function (n) {
            return new Array(n);
        };

        $scope.arr_options = ['应用', 'IP地址', '设备位置'];
        $scope.selectValue = $scope.arr_options[0];
        $scope.which = 'system_name'
        $scope.selectedChange = function (v) {
            $scope.selectValue = v
            if ($scope.selectValue == '设备位置') {
                $scope.which = 'address'
            }
            if ($scope.selectValue == 'IP地址') {
                $scope.which = 'hosts_ip'
            }
            if ($scope.selectValue == '应用') {
                $scope.which = 'system_name'
            }
            console.log($scope.which)
        }
        $scope.input = (e) => {
            $scope.word = $scope.word_input;
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.btn1();
            }
        }
        $scope.btn1 = () => {
            $scope.URL1 = 'http://' + $scope.server_ip + '/sql/info?callback=JSON_CALLBACK&sql=sql_info&which=' + $scope.which + '&word=' + $scope.word;
            $http.get($scope.URL1).success(function (response) {
                $scope.info = response;
                $scope.page = ($scope.info.length % 15) == 0 ? parseInt($scope.info.length / 15) : parseInt($scope.info.length / 15) + 1;
            });
            $scope.page_num = 0;
            $scope.focus = 0;
        }
        $scope.edit = (index) => {
            $scope.model = index.model;
            $scope.ID = index.ID;
            $scope.hosts_ip = index.hosts_ip;
            $scope.admin_name = index.admin_name;
            $scope.password = index.password;
            $scope.OS = index.OS;
            $scope.address = index.address;
            $scope.status = index.state;
            $scope.instance=index.instance;
            $scope.system_name = index.system_name;
            $scope.system_software = index.system_software;
            $scope.port = index.port;
            $scope.connect_link1 = index.connect_link1;
            $scope.connect_link2 = index.connect_link2;
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