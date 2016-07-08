'use strict';

angular.module('app.header', ['ngRoute'])
    .directive('shTopHeader', function () {
        // DirectiveName: CamelCase in .js , hyphen separated in .html
        // see attr-normalization: https://docs.angularjs.org/guide/directive
        return {
            restrict: 'A',
            templateUrl: 'components/header/header.html',
            controllerAs: '$ctrl',
            controller: ['breadcrumbs', 'sharedData', '$mdDialog', '$window', '$scope', '$interval', 
			function (breadcrumbs, sharedData, $mdDialog, $window, $scope, $interval) {
                var self = this;
                this.breadcrumbs = breadcrumbs;

                $scope.actualweather = sharedData.weather.dayData[0];
                this.users = sharedData.users;
                this.activeProfile = sharedData.users.find(function (u) {
                    return u.active;

                });
                this.setActiveProfile = function (user, ev) {
                    if(user.active)
                        return
                    var confirm = $mdDialog.confirm()
                        .title('Profil wechseln')
                        .textContent('Für den Wechsel zu ' + user.name + 's Profil ist ein Neustart der Anwendung nötig. Jetzt neustarten?')
                        .ariaLabel('Dialog - Neustart für Profilwechsel')
                        .targetEvent(ev)
                        .ok('Neustart')
                        .cancel('Abbrechen');
                    $mdDialog.show(confirm).then(function () {
                        self.activeProfile.active = false;
                        user.active = true;
                        self.activeProfile = user;
                        $window.location.reload();
                    });
                }
				$scope.infoShow = false;
				$scope.info = 0;
				getTime();
				$interval(function(){getTime();}, 1000);
				
				var a = new Date();
				var day = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
				var month = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sept", "Okt", "Nov", "Dez"];
				var date = a.getDate()
				if(date < 10){date = '0'+date;} 
				$scope.date = day[a.getDay() - 1] + "., " + date + " " + month[a.getMonth()];			

				function getTime(){
					var a = new Date();
					var b = a.getHours(), c = a.getMinutes();
					if(b < 10){b = '0'+b;} 
					if(c < 10){c = '0'+c;} 
					$scope.time = b+':'+c;
					
					if(sharedData.messagesShow==true){
						$scope.info = sharedData.messagesShowCount;
						$scope.infoShow = true;
					}
					else
						$scope.infoShow = false;
				}
            }]
        };
    });