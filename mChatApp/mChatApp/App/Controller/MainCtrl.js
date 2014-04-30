/// <reference path="GlobalScope.js" />

var appMainChat = angular.module('MainChatApp', []);

appMainChat.factory('chatServiceFactory', function () {
    //var queryStrngs = getQueryStrings();
    //var userName = queryStrngs["UserName"];
    //var url = "ws://" + "192.168.1.35/mChatApp" + "/SocketMsgHandler.ashx" + "?UserName=" + userName;
    //var service = {};

    //service.connect = function () {
    //    if (service.socket) { return; }
    //    var socket = new WebSocket(url);
    //    socket.onopen = function () {
    //        service.callback("Succeeded to open a connection");
    //    };
    //    socket.onerror = function () {
    //        service.callback("Failed to open a connection");
    //    }
    //    socket.onmessage = function (message) {
    //        service.callback(message.data);
    //    };
    //    service.socket = socket;
    //}
    //service.send = function (message) {
    //    service.socket.send(message);
    //}
    //service.subscribe = function (callback) {
    //    service.callback = callback;
    //}
    //return service;
});

appMainChat.directive('ngEnter', function () {
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

appMainChat.controller('MainChatPanelCtrl', function ($scope) {
    //$scope.Users = [];
    //ChatService.subscribe(function (message) {
    //    $scope.Users.push(message);
    //    $scope.$apply();
    //});

    //$scope.connect = function () {
    //    ChatService.connect();
    //}

    //$scope.send = function () {
    //    ChatService.send($scope.text);
    //    $scope.text = "";
    //}

    $scope.NewUserMessage = "";
    var ConnectedUsers = $scope.ConnectedUsers = [];
    var chatMsgs = $scope.chatMsgs = [];

    var queryStrngs = getQueryStrings();
    var urlUserName = queryStrngs["UserName"];
    //var url = "ws://" + "192.168.2.4/mChatApp/SocketMsgHandler.ashx?UserName=" + urlUserName;
    var url = "ws://" + "mehmetkarpuz/mChatIceApp/api/mChat/ConnectUser?username=" + urlUserName;
    //var url = "ws://" + "84.51.18.91/mChatApp/SocketMsgHandler.ashx?UserName=" + urlUserName;
    var socket = new WebSocket(url);

    $scope.Initialize = function () {
        socket.onopen = function (e) {
            $("#txtNewMessage").focus();
            //$scope.SendConnectedUser();
        };
        socket.onmessage = function (e) {

            if (e.data.split("#")[0] == "ConnectedUserList") {
                ConnectedUsers = $scope.ConnectedUsers = [];
                var userListArry = JSON.parse(e.data.split("#")[1]);
                for (var i = 0; i < userListArry.length; i++) {
                    var connectedUser = {
                        UserName: "",
                        UserLogo: ""
                    }
                    connectedUser.UserName = userListArry[i].UserName;
                    connectedUser.UserLogo = userListArry[i].UserLogo;
                    ConnectedUsers.push(connectedUser);
                }
            }
            else {
                var msgname = e.data.split("|")[0];
                var msg = e.data.split("|")[1];

                var chatMsg = {
                    UserName: "",
                    Message: "",
                    ChatLiClass: "",
                    ChatLiSpanClass: "",
                    UserLogo: "",
                    MsgDate: "",
                    Type: "" //0-ben 1-karşı taraf
                }

                var currentDate = moment().format('LLL');
                if (msgname == urlUserName) {
                    chatMsg.UserName = msgname;
                    chatMsg.Message = msg;
                    chatMsg.ChatLiClass = "left clearfix";
                    chatMsg.ChatLiSpanClass = "chat-img pull-left";
                    chatMsg.UserLogo = "http://placehold.it/50/FA6F57/fff&text=ME",
                    chatMsg.MsgDate = currentDate,
                    chatMsg.Type = "0";
                    chatMsgs.push(chatMsg);
                }
                else {
                    chatMsg.UserName = msgname;
                    chatMsg.Message = msg;
                    chatMsg.ChatLiClass = "right clearfix";
                    chatMsg.ChatLiSpanClass = "chat-img pull-right";
                    chatMsg.UserLogo = "http://placehold.it/50/55C1E7/fff&text=U",
                    chatMsg.MsgDate = currentDate,
                    chatMsg.Type = "1";
                    chatMsgs.push(chatMsg);
                }
            }
            $scope.$apply();
            $("#chatpnl").prop({ scrollTop: $("#chatpnl").prop("scrollHeight") });
        };
        socket.onclose = function () {
            socket.close();
        };
        socket.onerror = function (e) {
            notificationFactory.warning('Hata oluştu : ' + e.currentTarget);
        };
    }

    $scope.SendMessage = function () {
        if ($scope.NewUserMessage == null || $scope.NewUserMessage.trim() == "") {
            notificationFactory.warning("Mesaj giriniz!");
        }
        else {
            socket.send($scope.NewUserMessage);
        }
        $scope.NewUserMessage = "";
    }

    $scope.SendConnectedUser = function () {
        socket.send("NewConnectedUser:" + urlUserName);
    }

    $scope.OpenConversationWin = function (conversationusername) {
        if (urlUserName != conversationusername) {
            $(function () {
                $("#ConversationModal")
                .dialog({
                    width: 600,
                    height: 430,
                    title: conversationusername,
                    modal: true
                }).dialogExtend({
                    "maximizable": true,
                    "minimizable": true,
                    "dblclick": "maximize",
                    "closable": true,
                    "minimizeLocation": "right",
                    "icons": { "maximize": "ui-icon-arrow-4-diag" }
                });
            });
            $("#ConversationModal").empty();
            $("#ConversationModal").dialog("open");
            var _frame = document.createElement("iframe");
            _frame.src = "Conversation.html";
            _frame.id = "frameConversation";
            _frame.width = "100%";
            _frame.height = "98%";
            $("#ConversationModal").append(_frame);
        }
        else {
            alert("kendi kendinle özel sohbet başlatamazsın");
        }
    }
});

//Notification'lar için toastr ile mesaj verecek factory
appMainChat.factory('notificationFactory', function () {
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