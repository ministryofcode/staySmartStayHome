'use strict';

angular.module('app.settings', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/settings', {
		templateUrl: 'components/settings/settings.html',
		controllerAs: '$ctrl',
		controller: 'SettingsController'
	  });
	}])

    .controller('SettingsController', ['$scope', 'sharedData', function ($scope, sharedData) {
		$scope.users = sharedData.users;
		/* alert(sharedData.users[0].image); */
    }]);