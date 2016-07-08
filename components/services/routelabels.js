angular.module('app').factory('routelabels', ['sharedData', function (sharedData) {

    var routeLabels = {
        home: 'Startseite',
        rooms: 'Räume',
        scenarios: 'Szenarien',
        music: 'Musik',
        rules: 'Regeln',
        weather: 'Wetter',
        emergency: 'Notfall',
        energy: 'Energie',
        settings: 'Einstellungen'
    };

    for(var key in sharedData.rooms){
        routeLabels[key] = sharedData.rooms[key].label;
    }

    return {
        lookup : function(name){
            return routeLabels[name] || null;
        }
    };
}]);