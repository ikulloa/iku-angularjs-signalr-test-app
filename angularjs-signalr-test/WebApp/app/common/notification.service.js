(function () {
	'use strict';

	var serviceId = 'notificationService';
	angular.module('common')
		.factory(serviceId, ['common', 'realtimeService', notificationService]);

	function notificationService(common, realtimeService) {

		const events = {
			priorityChanged : 'orderPriorityChanged',
			orderCreated: 'orderCreated',
			orderCompleted: 'orderCompleted',
			orderInProcess: 'orderInProcess',
			orderCanceled: 'orderCanceled',
            orderStopped: 'orderStopped',
            orderModified: 'orderModified'
		}
		
		// Convertir en provider para configurar en runtime?
		// Pasar lista de eventos  los que subscribirse?
        // Implementar los metodos de invocacion disponibles para centralizar la gestión.
		
       
        realtimeService.on(events.priorityChanged, function (data) {
            const ref = data ? `The order Ref: ${data.referenceNumber} has a new priority` : '';
            common.logger.logWarning(`There has been a change in the priority of the scheduled orders.<br/>${ref}`, '', serviceId, true);
			common.$broadcast(events.priorityChanged, data);
		});

        realtimeService.on(events.orderCreated, function (data) {
            const ref = data ? `Ref: ${data.referenceNumber}` : '';
            common.logger.logWarning(`A new order has been created.<br/>Ref: ${ref}`, '', serviceId, true);
            common.$broadcast(events.orderCreated, data);
		});

        realtimeService.on(events.orderCompleted, function (data) {
            const ref = data ? `Ref: ${data.referenceNumber}` : '';
            common.logger.logWarning(`An order has been completed.<br/>${ref}`, '', serviceId, true);
			common.$broadcast(events.orderCompleted, data);
		});

        realtimeService.on(events.orderInProcess, function (data) {
            const ref = data ? `Ref: ${data.referenceNumber}` : '';
            common.logger.logWarning(`An order is being processed.<br/>${ref}`, '', serviceId, true);
			common.$broadcast(events.orderInProcess, data);
		});

        realtimeService.on(events.orderCanceled, function (data) {
            const ref = data ? `Ref: ${data.referenceNumber}` : '';
            common.logger.logWarning(`An order has been canceled.<br/>${ref}`, '', serviceId, true);
			common.$broadcast(events.orderCanceled, data);
		});

        realtimeService.on(events.orderStopped, function (data) {
            const ref = data ? `Ref: ${data.referenceNumber}` : '';
            common.logger.logWarning(`An order has been stopped and is back in the schedule.<br/>${ref}`, '', serviceId, true);
			common.$broadcast(events.orderStopped, data);
        });

	    realtimeService.on(events.orderModified, function (data) {
	        const ref = data ? `Ref: ${data.referenceNumber}` : '';
	        common.logger.logWarning(`An order has been modified.<br/>${ref}`, '', serviceId, true);
	        common.$broadcast(events.priorityChanged, data);
	    });

		
		return { events: events };
	}




})();