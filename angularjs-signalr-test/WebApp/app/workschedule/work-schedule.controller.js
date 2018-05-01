(function () {
    'use strict';
    var controllerId = 'workSchedule';
    angular.module('app').controller(controllerId, ['$scope', 'common', 'datacontext', 'realtimeService', 'notificationService', workSchedule]);

    function workSchedule($scope, common, datacontext, realtimeService, notificationService) {
        var vm = this;
        var listeners = [];
        const events = notificationService.events;

        vm.subscribedNotifications = [];
        vm.scheduledOrders = [];
        vm.ordersInProgress = [];

        // TODO: Move realTimeService invocation to notificationService?
        vm.cancel = function (order) {
            order.status = "Scheduled";
            order.priority = 0; //TODO: should it be placed on top?
            datacontext.saveOrder(order).then(function (data) {
                const index = vm.ordersInProgress.findIndex(o => parseInt(o.id) === parseInt(order.id));
                vm.ordersInProgress.splice(index, 1);
                vm.scheduledOrders.splice(0, 0, data);
                realtimeService.invoke('notifyOrderStopped', function () { }, data);
            });
           
        };
        // TODO: Date logic should be on the backend's business rules.
        vm.complete = function (order) {
            order.status = "Completed";
            order.completionDate = new Date().toISOString();
            datacontext.saveOrder(order).then(function(data) {
                const index = vm.ordersInProgress.findIndex(o => parseInt(o.id) === parseInt(order.id));
                vm.ordersInProgress.splice(index, 1);
                realtimeService.invoke('notifyOrderCompleted', function () { }, data);
            });
           
        };
        // TODO: Date logic should be on the backend's business rules.
        vm.start = function (order) {
            order.status = "InProgress";
            order.startedDate = new Date().toISOString();
            datacontext.saveOrder(order).then(function (data) {
                const index = vm.scheduledOrders.findIndex(o => parseInt(o.id) === parseInt(order.id));
                vm.scheduledOrders.splice(index, 1);
                vm.ordersInProgress.push(data);

                realtimeService.invoke('notifyOrderInProcess', function () { }, data);
            });
           
        };
        
        activate();

        function activate() {
            const promises = [
                getScheduledOrdersSortedByPriorityAscending(),
                getInProgressOrders()
            ];

            common.activateController(promises, controllerId)
                .then(function () {
                    configureEventListeners();
                });
        }

        function configureEventListeners() {

            listeners.push($scope.$on(events.priorityChanged, function () {
                getScheduledOrdersSortedByPriorityAscending();
            }));

            // TODO: Avoid calling the api. Items can be removed or added using javascript only (and highlighted)
            listeners.push($scope.$on(events.orderModified, function () {
                getScheduledOrdersSortedByPriorityAscending();
            }));

            listeners.push($scope.$on(events.orderCreated, function () {
                getScheduledOrdersSortedByPriorityAscending();
            }));

            listeners.push($scope.$on(events.orderCanceled, function () {
                getScheduledOrdersSortedByPriorityAscending();
            }));

            listeners.push($scope.$on(events.orderInProcess, function () {
                getScheduledOrdersSortedByPriorityAscending();
                getInProgressOrders();
            }));

            listeners.push($scope.$on(events.orderCompleted, function () {
                getInProgressOrders();
                getScheduledOrdersSortedByPriorityAscending();
            }));

            listeners.push($scope.$on(events.orderStopped, function () {
                getInProgressOrders();
                getScheduledOrdersSortedByPriorityAscending();
            }));

            listeners.push($scope.$on('$routeChangeStart', function () {
                listeners.forEach(function (listener) { listener(); });
            }));
        }

        function getScheduledOrdersSortedByPriorityAscending() {
            return datacontext.getScheduledOrders().then(
                function (data) {
                    vm.scheduledOrders = data.sort(function (a, b) { return a.priority - b.priority });
                }, function (err) {
                    common.logger.logError('Error retrieving Scheduled Orders', err, controllerId, true);
                }
            );
        }

        function getInProgressOrders() {
            return datacontext.getOrdersInProgress().then(
                function (data) {
                    vm.ordersInProgress = data;

                }, function (err) {
                    common.logger.logError('Error retrieving InProgress Orders', err, controllerId, true);
                }
            );
        }
    }
})();