'use strict';

angular.module('app.weather', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/weather', {
    templateUrl: 'components/weather/weather.html',
    controller: 'WeatherController'
  });
}])
/*
.controller('WeatherController', ['$scope', 'sharedData',  function ($scope, sharedData) {
  
  sharedData.weather.activ.index = Math.floor(Math.random() * 8);
  $scope.weather = sharedData.weather;
  $scope.actualweather= sharedData.weather.weath
  
}]);*/

.controller('WeatherController', ['$scope', 'sharedData', function ($scope, sharedData) {

    var currentdate = new Date();
    var hour = currentdate.getHours();

    if(hour>= 21 || hour<=5)
    {
        sharedData.weather.dayData[0].iconName = 'w_partly_cloudy_night';
    }
    $scope.weather = sharedData.weather;



}]);

function initializeWeather(sharedData, weatherData){
  var date = new Date();
    var month= date.getMonth()+1;
        month = month.toString();
    if(month.length==1) {
        month = "0"+month;
    }


}
function AssignIcon(weatherdata){

    //prüfen if zweige alle, und nacht hinzufügen anhand uhrzeit
    for(var i =0; i<weatherdata.length;i++)
    {
        if(weatherdata.weather.dayData[i].rain != '')
        {
            //Regen = 0
            if(weatherdata.weather.dayData[i].rain < 3)
            {
                weatherdata.weather.dayData[i].icon = 0;
            }
            else //Sturm = 1
            {
                weatherdata.weather.dayData[i].icon = 1;
            }
        }
        else
        {
            var date = new Date();
            var time = date.getTime();
            console.log(time);
            // klare nacht, bewölkte nacht
            if(weatherdata.weather.dayData[i].actualtemperature < '15') //leicht bewölkt = 2
            {
                weatherdata.weather.dayData[i].icon = 2;
            }
            if(weatherdata.weather.dayData[i].actualtemperature < '10') // bewölkt = 3
            {
                weatherdata.weather.dayData[i].icon = 2;
            }
            if(weatherdata.weather.dayData[i].actualtemperature >= '15') //sonnig = 4
            {
                weatherdata.weather.dayData[i].icon = 4;
            }
            if(weatherdata.weather.dayData[i].actualtemperature >= '10'  ) //klare nacht = 5
            {
                weatherdata.weather.dayData[i].icon = 5;
            }


        }
    }
}