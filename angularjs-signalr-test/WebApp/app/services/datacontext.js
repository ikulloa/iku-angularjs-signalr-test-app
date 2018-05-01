(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['common', datacontext]);

    function datacontext(common) {
        var $q = common.$q;
        var $http = common.$http;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount,
            getAllOrders: getAllOrders,
            getScheduledOrders: getScheduledOrders,
            getOrdersInProgress: getOrdersInProgress,
            getCompletedOrders: getCompletedOrders,
            setOrdersPriority: setOrdersPriority,
            getOrderById: getOrderById,
            saveOrder: saveOrder,
            cancelOrder: cancelOrder
        };

        return service;

        function cancelOrder(order) {
            var defer = $q.defer();
            $http.delete(`/api/order/${order.id}`)
                .then(
                    function (response) { defer.resolve(response); },
                    function (err, status) { defer.reject(err); }
                );
            return defer.promise;
        }

        function saveOrder(order) {
            var defer = $q.defer();
            if (order.id !== 0) {
                $http.put(
                    `/api/order/${order.id}`,
                    order,
                    config).then(
                    function (response) { defer.resolve(response.data); },
                    function (err, status) { defer.reject(err); }
                );
            } else {
                $http.post(
                    '/api/order',
                    order,
                    config).then(
                    function (response) { defer.resolve(response.data); },
                    function (err, status) { defer.reject(err); }
                    );
            }
            return defer.promise;
        }

        function getAllOrders() {
            var defer = $q.defer();
            $http.get('/api/orders')
                .then(
                function (response) { defer.resolve(response.data); },
                function (err, status) { defer.reject(err); }
                );
            return defer.promise;
        }


        // TODO: Refactor method to single function with status parameter?
        function getScheduledOrders() {
            var defer = $q.defer();
            $http.get('/api/orders?status=scheduled')
                .then(
                function (response) { defer.resolve(response.data); },
                function (err, status) { defer.reject(err); }
                );
            return defer.promise;
        }

        function getCompletedOrders() {
            var defer = $q.defer();
            $http.get('/api/orders?status=completed')
                .then(
                function (response) { defer.resolve(response.data); },
                function (err, status) { defer.reject(err); }
                );
            return defer.promise;
        }

        function getOrdersInProgress() {
            var defer = $q.defer();
            $http.get('/api/orders?status=inprogress')
                .then(
                function (response) { defer.resolve(response.data); },
                function (err, status) { defer.reject(err); }
                );
            return defer.promise;
        }

        function setOrdersPriority(orders) {
            var defer = $q.defer();
            $http.post(
                '/api/orders/setpriority',
                orders,
                config).then(
                function (response) { defer.resolve(response); },
                function (err, status) { defer.reject(err); }
                );
            return defer.promise;
        }

        function getOrderById(id) {
            var defer = $q.defer();
            $http.get(`api/Order/${id}`)
                .then(
                function (response) { defer.resolve(response.data); },
                function (err, status) { defer.reject(err); }
                );
            return defer.promise;
        }


        function getMessageCount() { return $q.when(72); }

        function getPeople() {
            var people = [
                { firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
                { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
                { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
                { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
                { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
                { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
                { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
            ];
            return $q.when(people);
        }


    }
})();