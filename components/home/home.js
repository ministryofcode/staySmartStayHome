'use strict';

angular.module('app.home', ['ngRoute', 'app.details'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'components/home/home.html',
            controller: 'HomeController',
            controllerAs: "$ctrl"
        });
    }])

    .controller('HomeController', ['$scope', 'sharedData', '$interval',  function ($scope, sharedData,  $interval) {
        this.updateFavorites = function () {
			var self = this;
            this.favorites = sharedData.allRoomFunctionalities.filter(function (f) {
                return f.isFavorite;
            });
            var roomOrder = Object.keys(sharedData.rooms);
            this.favorites.sort(function (a, b) {
                var aOrder = roomOrder.indexOf(a.key),bOrder = roomOrder.indexOf(b.key);
                return aOrder < bOrder? -1 : (aOrder > bOrder ? 1 : 0);
            });

			sharedData.scenes.forEach(function (s) {
				if( s.isFavorite){
					self.favorites.push(s);
					s.nogotoicon = true;
				}
			});
        }

        this.updateFavorites();

        this.removeFromArr = function (m1, arr) {
            var i = arr.indexOf(m1);
            arr.splice(i,1);
        };
        this.removeNews = function (m1) {
            this.removeFromArr(m1, $scope.news);
        };
        this.removeMsg = function (m1) {
            this.removeFromArr(m1, $scope.messages);
        };

		
		
        $scope.localStorageSettings = sharedData.localStorageSettings;
        $scope.news = [
            {
                face: "img/icons/WashingMachine.svg",
                what: 'Waschmaschine',
                details: 'Bin fertig',
                when: 'in 10min',
                expanded: true,
				timestamp: -1
            }];
			
        $scope.messages = sharedData.messages;
        $scope.news = sharedData.news;
		sharedData.messagesShow= false;
		sharedData.messagesShowCount= 0;
		
		var arrayLength = sharedData.messages.length;
		var currentDate = new Date().getTime();
		for (var i = 0; i < arrayLength; i++) {
			
			var message = sharedData.messages[i]
			
			if(message.timestamp != -1){
				var timeSpan = Math.round(currentDate - message.timestamp)/1000;
				if(timeSpan < 60)
					message.when = "jetzt";
				else if(timeSpan > 60 && timeSpan < 3600)
					message.when = "vor " + Math.round(timeSpan / 60) + " min";
				else if(timeSpan > 3600 && timeSpan < 86400)
					message.when = "vor " + Math.round(timeSpan / 3600) + " h";
				else
					message.when = "vor " + Math.round(timeSpan / 86400) + " d";
			}
		}
		
		$interval(function(){setMessage();setNews();}, 120000);
		function setMessage() {
			sharedData.messagesShow=true;
			sharedData.messagesShowCount++;
			var imageA = ["CoffeeMaker", "Bathtub", "BabyMonitor", "Door", "TV", "Security", "Energy_1", "WashingMachine", "WashingMachine"];
			var whatA = ["Kaffeemaschine", "Badewanne", "BabyMonitor", "Tür", "TV", "Sicherheit", "Energie", "Waschmaschine", "Trockner"];		
			var details0 = ["Reinige mich gerade selbst!", "Bin voll.", "Das Baby lacht!", "Mach mich bitte zu!", "Auf Pro7 kommt dein Lieblingsfilm.", "Die Fenster wurde verriegelt", "Achte bitte mehr auf die Umwelt.", "Drehe mich im Kreis!", "Bin trocken!"];		
			var details1 = ["Brauche Wasser und Kaffeebohnen!", "Blubber ist an.", "Das Baby lacht!", "Jemand unbekanntes wollte hinein.", "Hab den Wunschilm aufgenommen.", "Die Tür ist verriegelt", "Heute sehr lobenswert!", "Trenne bitte Bunt und Weißes!", "Noch viel zu nass!"];		
			var details2 = ["Chef. Dein morgendlicher Kaffee steht bereit.", "Bin auf deiner Wunschtemperatur.", "Das Baby schläft ruhig. Alles in Ordnung!", "Keine besonderen Vorkommnisse.", "Hab mich in den StandBy Modus geschalten.", "Keine besonderen Vorkommnisse.", "Alles im 'grünen' Bereich", "Gestartet. Ich wasch für dich!", "Nur noch trocknen. Dann geschafft."];	
			
			var index = Math.floor((Math.random() * 9));
			var textNumber = Math.floor((Math.random() * 100))%3;
			var imageText = "img/icons/" + imageA[index] + ".svg";
			var detailsE = details0;
			if(textNumber == 1)
				detailsE = details1;
			else if(textNumber == 1)
				detailsE = details2;
			var timestamp = new Date().getTime();
			
			var objekt = {face:imageText, what: whatA[index], details: detailsE[index], when: "jetzt", 'expanded':'true', timestamp: timestamp};
			
			sharedData.messages.unshift(objekt);
		}
		
		function setNews() {
			
			var whatA = ["Sport", "EuroVision Songcontest", "Welt", "Politik", "Regional"];	
			var details0 = ["Deutschland ist Europameister 2016", "Deutschland 0 Punkte!", "Hof als neue Hauptstadt?", "Wer schafft es in den Bundestag?", "Landgartenschau in Rehau"];	
			var details1 = ["Public Viewing platz aus allen Nähten", "Überraschung! Letzter...", "Hof zeigt sich Weltoffen!", "Wer wird Bürgermeister?", "Diät! Was hilft?"];	
			var details2 = ["Ist Fussball out?", "Wie jetzt? Erster?", "Hof als neue Hauptstadt?", "Jetzt wirds ernst!", "In 3 Tagen fit!"];	
			
			var index = Math.floor((Math.random() * 5));
			var textNumber = Math.floor((Math.random() * 100))%3;
			var imageText = "img/icons/Information.svg";
			var detailsE = details0;
			if(textNumber == 1)
				detailsE = details1;
			else if(textNumber == 1)
				detailsE = details2;
			var timestamp = new Date().getTime();
			
			var objekt = {face:imageText, what: whatA[index], details: detailsE[index], when: "jetzt", 'expanded':'true', timestamp: timestamp};
			
			sharedData.news.unshift(objekt);
		}
    }]);