/// <reference path="GlobalScope.js" />

var appConversation = angular.module('ConversationApp', []);


appConversation.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

appConversation.controller('ConversationCtrl', function ($scope) {

    $scope.NewUserMessage = "";
    var chatMsgs = $scope.chatMsgs = [];

    var queryStrngs = getQueryStrings();
    var userName = queryStrngs["UserName"];
    var url = "ws://" + "mehmetkarpuz/mChatApp/SocketMsgHandler.ashx?UserName=" + userName;
    var socket = new WebSocket(url);

    $scope.Initialize = function () {
        //socket.onopen = function (e) {
        //    $("#txtNewMessage").focus();
        //    //$scope.SendConnectedUser();
        //};
        //socket.onmessage = function (e) {
        //    var msgname = e.data.split("|")[0];
        //    var msg = e.data.split("|")[1];

        //    var chatMsg = {
        //        UserName: "",
        //        Message: "",
        //        ChatLiClass: "",
        //        ChatLiSpanClass: "",
        //        UserLogo: "",
        //        MsgDate: "",
        //        Type: "" //0-ben 1-karşı taraf
        //    }

        //    var currentDate = moment().format('LLL');
        //    if (msgname == userName) {
        //        chatMsg.UserName = msgname;
        //        chatMsg.Message = msg;
        //        chatMsg.ChatLiClass = "left clearfix";
        //        chatMsg.ChatLiSpanClass = "chat-img pull-left";
        //        chatMsg.UserLogo = "http://placehold.it/50/FA6F57/fff&text=ME",
        //        chatMsg.MsgDate = currentDate,
        //        chatMsg.Type = "0";
        //        chatMsgs.push(chatMsg);
        //    }
        //    else {
        //        chatMsg.UserName = msgname;
        //        chatMsg.Message = msg;
        //        chatMsg.ChatLiClass = "right clearfix";
        //        chatMsg.ChatLiSpanClass = "chat-img pull-right";
        //        chatMsg.UserLogo = "http://placehold.it/50/55C1E7/fff&text=U",
        //        chatMsg.MsgDate = currentDate,
        //        chatMsg.Type = "1";
        //        chatMsgs.push(chatMsg);
        //    }

        //    $scope.$apply();
        //    $("#chatpnl").prop({ scrollTop: $("#chatpnl").prop("scrollHeight") });
        //};
        //socket.onclose = function () {
        //    socket.close();
        //};
        //socket.onerror = function (e) {
        //    notificationFactory.warning('Hata oluştu : ' + e.currentTarget);
        //};
    }

    $scope.SendMessage = function () {
    //    if ($scope.NewUserMessage == null || $scope.NewUserMessage.trim() == "") {
    //        notificationFactory.warning("Mesaj giriniz!");
    //    }
    //    else {
    //        socket.send($scope.NewUserMessage);
    //    }
    //    $scope.NewUserMessage = "";
    //}
    
});

//Notification'lar için toastr ile mesaj verecek factory
appConversation.factory('notificationFactory', function () {
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
        }
    };
});