(function() {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['$scope', 'common', 'datacontext', 'realtimeService', 'notificationService', dashboard]);

    function dashboard($scope, common, datacontext, realtimeService, notificationService) {
        var vm = this;
        vm.scheduledOrders = [];
        vm.ordersInProgress = [];
        vm.completedOrders = [];

        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';
        var listeners = [];

        const getLogFn = common.logger.getLogFn;
        const events = notificationService.events;
        // ReSharper disable once UnusedLocals
        const log = getLogFn(controllerId);
        configureSortable();
        activate();
      
        vm.cancelOrder = cancelOrder;

        function activate() {
            const promises = [
                getScheduledOrdersSortedByPriorityAscending(),
                getInProgressOrders(),
                getCompletedOrdersSortedByCompletionDateDescending(),
                getMessageCount(),
                getPeople()
            ];

            common.activateController(promises, controllerId).then(function () {
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
                getCompletedOrdersSortedByCompletionDateDescending();
            }));

            listeners.push($scope.$on(events.orderStopped, function () {
                getInProgressOrders();
                getScheduledOrdersSortedByPriorityAscending();
            }));

            listeners.push($scope.$on('$routeChangeStart', function () {
                listeners.forEach(function (listener) { listener(); });
            }));
        }

        function configureSortable() {
            vm.sortableOptions = {
                handle: '.drag-handle',
                stop: function (event, element) {
                    
                    var movedOrder = vm.scheduledOrders.find(item => item.id === parseInt(element.item.attr('data-order-id').toString()));
                    console.log("Order: " + movedOrder);
                    datacontext.setOrdersPriority(vm.scheduledOrders).then(
                        function () { realtimeService.invoke('notifyPriorityChanged', function() {}, movedOrder); },
                        function (err) { console.error(err); }
                    );
                }
            };
        }

        
        function getScheduledOrdersSortedByPriorityAscending() {
            return datacontext.getScheduledOrders().then(
                function(data) {
                    vm.scheduledOrders = data.sort(function (a, b) { return a.priority - b.priority; });
                }, function(err) {
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

        function getCompletedOrdersSortedByCompletionDateDescending() {

            return datacontext.getCompletedOrders().then(
                function (data) {
                    vm.completedOrders = data.sort(function (a, b) {
                        var dateA = new Date(a.completionDate).getTime();
                        var dateB = new Date(b.completionDate).getTime();
                        return dateA > dateB ? 1 : -1; });
                }, function (err) {
                    common.logger.logError('Error retrieving Completed Orders', err, controllerId, true);
                }
            );
        }

        function getMessageCount() {
            return datacontext.getMessageCount().then(function (data) {
                return vm.messageCount = data;
            });
        }

        function getPeople() {
            return datacontext.getPeople().then(function (data) {
                return vm.people = data;
            });
        }

        function cancelOrder(order) {
            datacontext.cancelOrder(order).then(function () {

                // TODO: Refactor find and remove code into separated function.
                const index = vm.scheduledOrders.findIndex(o => parseInt(o.id) === parseInt(order.id));
                vm.scheduledOrders.splice(index, 1);
                realtimeService.invoke('notifyOrderCanceled', function () { }, order);
            });
        }
    }
})();