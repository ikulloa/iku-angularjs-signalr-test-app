(function() {
    'use strict';
   
    angular.module('common').factory('realtimeService', ['$rootScope', realtimeService]);

    function realtimeService($rootScope) {

        const connection = $.hubConnection();
        connection.logging = true;
        var proxy = connection.createHubProxy('ordersHub');
        proxy.on('subscribed', function () { });

        var service = {
            on: function (eventName, callback) {
                proxy.on(eventName, function (result) {
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback(result);
                        }
                    });
                });
            },
            off: function (eventName, callback) {
                proxy.off(eventName, function (result) {
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback(result);
                        }
                    });
                });
            },
            invoke: function (methodName, callback, params) {
                proxy.invoke(methodName, params)
                    .done(function(result) {
                        $rootScope.$apply(function() {
                            if (callback) {
                                callback(result);
                            }
                        });
                });
                //if (params) {
                //    proxy.invoke(methodName)
                //        .done(function(result) {
                //            $rootScope.$apply(function() {
                //                if (callback) {
                //                    callback(result);
                //                }
                //            });
                //        });
                //} else {
                    //proxy.invoke(methodName, params)
                    //    .done(function(result) {
                    //        $rootScope.$apply(function() {
                    //            if (callback) {
                    //                callback(result);
                    //            }
                    //        });
                    //    });
                //}
            }
            , connection: connection
        };

        connection.start().done(function () { });

        return service;
    }
})();