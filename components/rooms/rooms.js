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

    .controller('RoomsController', ['$scope', 'sharedData','bookmarking', function ($scope, sharedData, bookmarking) {
        $scope.bookmark_running = bookmarking.running;
        $scope.rooms = sharedData.rooms;
    }])

    .controller('progressController', ['$scope', '$interval', function($scope, $interval) {
        var self = this, j= 0, counter = 0;
        self.mode = 'query';
        self.activated = true;
        self.determinateValue = 30;
        self.determinateValue2 = 30;
        self.showList = [ ];
        /**
         * Turn off or on the 5 themed loaders
         */
        self.toggleActivation = function() {
            if ( !self.activated ) self.showList = [ ];
            if (  self.activated ) {
                j = counter = 0;
                self.determinateValue = 30;
                self.determinateValue2 = 30;
            }
        };
        $interval(function() {
            self.determinateValue += 1;
            self.determinateValue2 += 1.5;
            if (self.determinateValue > 100) self.determinateValue = 30;
            if (self.determinateValue2 > 100) self.determinateValue2 = 30;
            // Incrementally start animation the five (5) Indeterminate,
            // themed progress circular bars
            if ( (j < 2) && !self.showList[j] && self.activated ) {
                self.showList[j] = true;
            }
            if ( counter++ % 4 == 0 ) j++;
            // Show the indicator in the "Used within Containers" after 200ms delay
            if ( j == 2 ) self.contained = "indeterminate";
        }, 100, 0, true);
        $interval(function() {
            self.mode = (self.mode == 'query' ? 'determinate' : 'query');
        }, 7200, 0, true);
    }])

.controller("ChartController", ['$scope','sharedData',function ($scope, sharedData) {
    debugger;

        $scope.labelsWaterMonth = sharedData.rooms.energy.functionalities[0].options[0].state.labels;
        $scope.seriesWaterMonth = sharedData.rooms.energy.functionalities[0].options[0].state.series;
        $scope.dataWaterMonth = [
            [120, 220, 130, 190, 130]
        ];

       // $scope.dataWaterMonth = sharedData.rooms.energy.functionalities[0].options[0].state.data;
       // $scope.datasetOverrideWaterMonth = sharedData.rooms.energy.functionalities[0].options[0].state.datasetOverride;
    $scope.datasetOverrideWaterMonth = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.optionsWaterMonth = {
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


        $scope.labels = sharedData.rooms.energy.functionalities[0].options[0].state.labels;
        $scope.series = sharedData.rooms.energy.functionalities[0].options[0].state.series;
        $scope.dataElectroDay = [
            [9.0, 4.3, 6.3, 3.2, 5.3]
        ];

        // $scope.dataWaterMonth = sharedData.rooms.energy.functionalities[0].options[0].state.data;
        // $scope.datasetOverrideWaterMonth = sharedData.rooms.energy.functionalities[0].options[0].state.datasetOverride;
        $scope.datasetOverrideElectroDay = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        $scope.optionsElectroDay = {
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
        var indexmargin= sharedData.rooms.energy.functionalities[3].options[0].state.tipps.length;
        var randomIndex = Math.floor(Math.random() * indexmargin);

        sharedData.rooms.energy.functionalities[3].options[0].state.activ = randomIndex;





        $scope.dataphotovoltaik = [
            [14.9, 17.3, 10.3, 14.7, 12.6]
        ];

        // $scope.dataWaterMonth = sharedData.rooms.energy.functionalities[0].options[0].state.data;
        // $scope.datasetOverrideWaterMonth = sharedData.rooms.energy.functionalities[0].options[0].state.datasetOverride;
        $scope.datasetOverrideWaterMonth = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        $scope.optionsWaterMonth = {
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





