/// <reference path="workschedule/work-schedule.controller.js" />
/// <reference path="workschedule/work-schedule.controller.js" />
(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());

    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/dashboard' });
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/dashboard',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    controller: 'dashboard as vm',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }, {
                url: '/workschedule',
                config: {
                    title: 'workschedule',
                    templateUrl: 'app/workschedule/work-schedule.html',
                    controller: 'workSchedule as vm',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i>Work Schedule'
                    }
                }
            }, {
                url: '/order/:id/edit',
                config: {
                    title: 'editOrder',
                    templateUrl: 'app/orders/edit-order.html',
                    controller: 'editOrder as vm'
                }
            }, {
                url: '/order/new',
                config: {
                    title: 'editOrder',
                    templateUrl: 'app/orders/edit-order.html',
                    controller: 'editOrder as vm'
                }
            }
        ];
    }
})();