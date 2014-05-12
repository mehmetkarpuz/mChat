/// <reference path="Helper.js" />
/// <reference path="GlobalScope.js" />

var appLogin = angular.module('LoginApp', []);

appLogin.factory('userFactory', function ($http) {
    return {
        AuthUser: function (user) {
            return $http.post("http://" + GLOBALS.serviceUrl + "mLogin/AuthenticateUser", "{ UserModel : " + JSON.stringify(user) + "}");
            //return $http.post("http://" + GLOBALS.serviceUrl + "mLogin/TestSrv", JSON.stringify("param1:1"), JSON.stringify("param2:2"));
        }
    };
});

//Notification'lar için toastr ile mesaj verecek factory
appLogin.factory('notificationFactory', function () {
    return {
        success: function (message) {
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "positionClass": "toast-top-full-width",
                "onclick": null,
                "showDuration": "1000",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            },
            toastr.success(message);
        },

        warning: function (message) {
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "positionClass": "toast-top-full-width",
                "onclick": null,
                "showDuration": "1000",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            },
            toastr.warning(message, "Uyarı!");
        },

        error: function (message) {
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "positionClass": "toast-top-full-width",
                "onclick": null,
                "showDuration": "1000",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            },
            toastr.error(message, "Hata!");
        },

        loading: function () {
            var opts = {
                lines: 12, // The number of lines to draw
                length: 20, // The length of each line
                width: 10, // The line thickness
                radius: 30, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 0, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: '#000', // #rgb or #rrggbb or array of colors
                speed: 1, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: 'auto', // Top position relative to parent in px
                left: 'auto' // Left position relative to parent in px
            };
            var target = document.getElementById('loadingdiv');
            var spinner = new Spinner(opts).spin(target);
        }
    };
});

appLogin.controller('LoginCtrl', function ($scope, userFactory, notificationFactory) {

    //Field'lerı boş bırakınca hata veriyor.
    //Bu sorunu aşmak için burada model tanımlamak zorunda mıyım? ARAŞTIR!!!!!!!!!!!!
    $scope.User = {
        UserName: "",
        Password: "",
        Type:1
    }
    $scope.isDisabled = false;
    $scope.AuthenticateUser = function (event) {
        if ($scope.User.UserName == "" || $scope.User.Password == "")
            notificationFactory.warning("Kullanıcı adı ve Şifre griniz.");
        else {
            $scope.isDisabled = true;
            notificationFactory.loading();
            userFactory.AuthUser($scope.User).success(successCallback).error(errorCallback);
        }
    }
    var authUserSuccessCallback = function (data, status) {
        if (data != 'null') {
            $scope.User = data.d;
            var fullUrl = "MainChatPage.html?UserName=" + $scope.User.UserName;
            location.href = fullUrl;
        }
        else {
            $scope.User.Password = "";
            notificationFactory.warning("Hatalı Kullanıcı Adı veya Şifre Girdiniz.");
        }
    };

    var authUserErrorCallback = function (data, status) {
        notificationFactory.error(data.ExceptionMessage);
    };

    var successCallback = function (data, status, headers, config) {
        authUserSuccessCallback(data, status);
    };

    var errorCallback = function (data, status, headers, config) {
        authUserErrorCallback(data, status);
    };
});
