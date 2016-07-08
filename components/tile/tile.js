'use strict';

angular.module('app.tile', [])

    .directive('shTile', [function () {
        return {
            restrict: 'E',
            scope: {
                tile: '=tileData',
                // set singleExpand to array with all tiles from which only 1 can expanded, optional
                singleExpand: '=?singleExpand',
                onExpandChange: '&onExpandChange',
                onFavoriteChange: '&',
                iconOptions: '=?',
                injCtrl : '=?'
            },
            transclude: true,
            templateUrl: 'components/tile/tile.html',
            controllerAs: '$tileCtrl',
            controller: ['$scope', 'bookmarking', '$element', '$location', '$mdDialog',
                function ($scope, bookmarking, $element, $location, $mdDialog) {
                    $scope.tile.isExpanded = false;
                    $scope.iconOptions = angular.merge(($scope.tile.iconOptions || {}),$scope.iconOptions);



                    var tile = $scope.tile;

                    $scope.bookmarking = bookmarking;

                    $scope.watchinroom = function () {
                        //location.search sets get parameter
                        $location.search('expandTile', tile.id).path('/rooms/' + tile.room.key);
                    };

                    $scope.$watch('tile.isExpanded', function (newValue, oldValue) {
                        updateCssClasses();
                        if (newValue) {
                            if ($scope.singleExpand) {
                                $scope.singleExpand.forEach(function (tile) {
                                    tile.isExpanded = $scope.tile == tile;
                                });
                            }
                        }
                        if ($scope.onExpandChange && newValue !== oldValue) {
                            $scope.onExpandChange();

                        }
                    });
                    if ($scope.onFavoriteChange) {
                        $scope.$watch('tile.isFavorite', function (newValue, oldValue) {
                            if (newValue != oldValue)
                                $scope.onFavoriteChange($scope.tile);
                        });
                    }

                    updateCssClasses();

                    function updateCssClasses() {
                        $element.addClass($scope.tile.isExpanded ? 'sh-expanded' : 'sh-collapsed');
                        $element.removeClass(!$scope.tile.isExpanded ? 'sh-expanded' : 'sh-collapsed');
                    }

                    $scope.altBookmarkText = tile.label + " zu Regel oder Szenario hinzufügen";
                    $scope.altCollapseText = "Anischt " + tile.label + " minimiert";
                    $scope.altExpandText = "Ansicht " + tile.label + " erweitert";
                    $scope.altFavoriteText = tile.label + " als Favorit " + (tile.isFavorite ? 'entfernen' : 'aufnehmen');
                    $scope.altFavoriteText = tile.label + " als Favorit " + (tile.isFavorite ? 'entfernen' : 'aufnehmen');
                    if(tile.room)
                        $scope.altWatchinroomText = "Zu " + tile.label + " in der Raumansicht '" + tile.room.label + "' springen";
                    $scope.$watch('tile.isFavorite', function (newValue, oldValue) {
                        if (newValue !== oldValue)
                            $scope.altFavoriteText = tile.label + " als Favorit " + (tile.isFavorite ? 'entfernen' : 'aufnehmen');
                    });

                    this.getRolloCls = function (rollo) {
                        var cssClass = '';
                        if (!rollo || !rollo.options.length)
                            return cssClass;
                        if (rollo.options[0].state.value < 17)
                            cssClass = 'perc0_17';
                        else if (rollo.options[0].state.value < 34 && rollo.options[0].state.value >= 17)
                            cssClass = 'perc17_34';
                        else if (rollo.options[0].state.value < 50 && rollo.options[0].state.value >= 34)
                            cssClass = 'perc34_50';
                        else if (rollo.options[0].state.value < 64 && rollo.options[0].state.value >= 50)
                            cssClass = 'perc50_64';
                        else if (rollo.options[0].state.value < 83 && rollo.options[0].state.value >= 64)
                            cssClass = 'perc64_83';
                        else if (rollo.options[0].state.value >= 83)
                            cssClass = 'perc83_100';
                        return cssClass;
                    }

                    
                    this.getCoffee = function (coffeem) {
                        var cssClass = '';
                        if (!coffeem || !coffeem.options.length)
                            return cssClass;
                        if(!coffeem.options[0].state.empty)
                        {
                            debugger;
                            cssClass = 'coffeefull';
                        }
                        else 
                        {
                            debugger;
                            cssClass = 'coffeeempty';
                        }
                        
                        
                        return cssClass;
                    }

                    this.temperatureClick = function (heating) {

                        if (heating.options[0].state.value == 0) {
                            heating.options[0].state.value += 15;
                        }
                        else {
                            heating.options[0].state.value += 5;
                        }
                        if (heating.options[0].state.value > 35) {
                            heating.options[0].state.value = 0;
                        }

                    }
                    this.addtile = function(tile)
                    {
                        tile.instanceType = 'rollo';
                        tile.options[0].instanceType = 'rolloOption';
                    }

                    this.showAlert = function(ev) {

                        
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Neues Gerät hinzufügen')
                                .textContent('Für diesen Raum wurde nur ein elektronischer Bilderrahmen gefunden')
                                .ariaLabel('Elektronischer Bilderrahmen hinzufügen')
                                .ok('Hinzufügen')
                                .targetEvent(ev)
                        );
                    };

                    this.showAlert = function (tile, ev) {
                        var confirm = $mdDialog.confirm()
                            .title('Neues Gerät hinzufügen')
                            .textContent('Für diesen Raum wurde ein elektronischer Bilderrahmen gefunden.')
                            .ariaLabel('Dialog - Hinzufuegen neues Geraet')
                            .targetEvent(ev)
                            .ok('Hinzufügen')
                            .cancel('Abbrechen');
                        $mdDialog.show(confirm).then(function () {
                            tile.instanceType = 'electronicpic';
                            tile.options[0].instanceType = 'electronicpicOptions';
                            tile.label = 'Bilderrahmen';


                        });
                    }



                    this.rolloClick = function (rollo) {

                        rollo.options[0].state.value += 20;
                        if (rollo.options[0].state.value > 100) {
                            rollo.options[0].state.value = 0;
                        }

                    }
                    this.WashingmachineClick = function (washingmachine) {
                        washingmachine.options[0].state.on = !washingmachine.options[0].state.on;
                        if (washingmachine.options[0].state.on) {
                            washingmachine.options[0].state.time = washingmachine.options[1].state[washingmachine.options[0].state.isactiv].time;
                        }
                    }


                    this.getTubCls = function (tub) {
                        var cssClass = '';

                        if (!tub || !tub.options.length)
                            return cssClass;
                        if (tub.options[0].state.temperature < 20)
                            cssClass = 'temp15_20';
                        else if (tub.options[0].state.temperature < 25 && tub.options[0].state.temperature >= 20)
                            cssClass = 'temp20_25';
                        else if (tub.options[0].state.temperature < 30 && tub.options[0].state.temperature >= 25)

                            cssClass = 'temp25_30';
                        else if (tub.options[0].state.temperature < 35 && tub.options[0].state.temperature >= 30)
                            cssClass = 'temp30_35';
                        else if (tub.options[0].state.temperature < 45 && tub.options[0].state.temperature >= 35)
                            cssClass = 'perc35_40';

                        return cssClass;
                    }

                    this.getHeating = function (heating) {
                        var cssClass = '';
                        if (!heating || !heating.options.length)
                            return cssClass;
                        if (heating.options[0].state.value >= 0 && heating.options[0].state.value < 15)
                            cssClass = 'perc0_0';
                        else if (heating.options[0].state.value < 20 && heating.options[0].state.value >= 15)
                            cssClass = 'perc10_17';
                        else if (heating.options[0].state.value < 25 && heating.options[0].state.value >= 20)
                            cssClass = 'perc117_34';
                        else if (heating.options[0].state.value < 30 && heating.options[0].state.value >= 25)
                            cssClass = 'perc234_50';
                        else if (heating.options[0].state.value < 34 && heating.options[0].state.value >= 30)
                            cssClass = 'perc350_64';
                        else if (heating.options[0].state.value < 39 && heating.options[0].state.value >= 35)
                            cssClass = 'perc464_83';
                        else if (heating.options[0].state.value >= 39)
                            cssClass = 'perc83_100';
                        return cssClass;
                    }

                    this.doFunctionalityBookmark  = function (functionality) {
                        debugger;
                    }
                }]


        };
    }]);