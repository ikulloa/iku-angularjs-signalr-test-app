(function () {
    'use strict';
    var controllerId = 'editOrder';
    angular.module('app').controller(controllerId, ['$routeParams', '$location', 'common', 'datacontext', 'realtimeService', editOrder]);

    function editOrder($routeParams, $location, common, datacontext, realtimeService) {
        //var log = common.logger.getLogFn(controllerId);
        var vm = this;
        vm.mode = "new";
        vm.title = 'EditOrder';
        vm.topPriority = false;
        var orderId = $routeParams.id;
        activate();
        vm.order = {
            id: 0, priority: 999
        };

        function activate() {
            const promises = [];

            if (orderId) {
                vm.mode = "edit";
                promises.push(getOrderById(orderId));
            }

            common.activateController(promises, controllerId)
                .then(function () { });
        }

        function getOrderById(id) {
            datacontext.getOrderById(id).then(
                function (data) {
                    vm.order = data;
                },
                function (err) { console.error(err); }); // TODO: logError toastr
        }

        vm.save = function (order) {
            datacontext.saveOrder(order).then(
                function (data) {
                    if (vm.mode === 'new') {
                        realtimeService.invoke('notifyOrderCreated', function () { }, data);
                    } else {
                        realtimeService.invoke('notifyOrderModified', function () { }, data);
                    }
                    
                    $location.path('/dashboard');
                },
                function (err) { console.error(err) });
        }

    }
})();