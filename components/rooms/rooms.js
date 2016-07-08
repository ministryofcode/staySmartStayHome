'use strict';

angular.module('app.rooms', ['ngRoute', 'app.details'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/rooms', {
                templateUrl: 'components/rooms/rooms.html',
                controller: 'RoomsController'
            })
            .when('/rooms/:activeRoom', {
                templateUrl: 'components/rooms/selectedroom.html',
                controller: 'SelectedRoomController',
                controllerAs: '$ctrl'

            })
    }])

    .controller('RoomsController', ['$scope', 'sharedData', 'bookmarking', function ($scope, sharedData, bookmarking) {
        $scope.bookmark_running = bookmarking.running;
        $scope.rooms = sharedData.rooms;
    }])

    .controller("ChartController", ['$scope', 'sharedData', function ($scope, sharedData) {

        this.labelsWaterMonth = sharedData.rooms.energy.functionalities[0].options[0].state.labels;
        this.seriesWaterMonth = sharedData.rooms.energy.functionalities[0].options[0].state.series;
        this.dataWaterMonth = [
            [120, 220, 130, 190, 130]
        ];

        this.datasetOverrideWaterMonth = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
        this.optionsWaterMonth = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            }
        };


        this.labels = sharedData.rooms.energy.functionalities[0].options[0].state.labels;
        this.series = sharedData.rooms.energy.functionalities[0].options[0].state.series;
        this.dataElectroDay = [
            [9.0, 4.3, 6.3, 3.2, 5.3]
        ];

        this.datasetOverrideElectroDay = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
        this.optionsElectroDay = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            }
        };
        var indexmargin = sharedData.rooms.energy.functionalities[3].options[0].state.tipps.length;
        var randomIndex = Math.floor(Math.random() * indexmargin);

        sharedData.rooms.energy.functionalities[3].options[0].state.activ = randomIndex;

        this.dataphotovoltaik = [
            [14.9, 17.3, 10.3, 14.7, 12.6]
        ];

        this.datasetOverrideWaterMonth = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
        this.optionsWaterMonth = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            }
        };
    }])

    .controller('SelectedRoomController', [
        '$scope', '$routeParams', 'sharedData', '$location',
        function ($scope, $routeParams, sharedData, $location) {

            this.activeRoom = sharedData.rooms[$routeParams.activeRoom];

            this.gotoRooms = function () {
                $location.path('/rooms');
            };

            var expandTile = $routeParams.expandTile;
            if (expandTile >= 0) {
                this.activeRoom.functionalities.forEach(function (f) {
                    f.isExpanded = expandTile == f.id;
                });
            }


            /* 			var expandedNum = -1;


             angular.element(document).ready(function () {
             gridSystem.initialize(expandedNum);
             }); */
        }]);





