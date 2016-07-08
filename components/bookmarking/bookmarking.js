angular.module('app')
    .factory('bookmarking', ['$location', 'sharedData', function ($location, sharedData) {

        var _savePath;
        var _collectionContainer;
        var _mementoMap;
        var _attachedFunctionalities;
        return {
            selection: null,
            running: false,
            isAttached: function (option) {
                return !!this.selection && this.selection.indexOf(option) >= 0;
            },
            attach: function (option) {
                if (!this.isAttached(option))
                    this.selection.push(option);
            },
            detach: function (option) {
                this.selection = this.selection.filter(function (_option) {
                    return _option !== option;
                });
            },
            isFunctionalityAttached : function(functionality){
                
            },
            attachFunctionality : function(functionality){
                
            },
            detachFunctionality : function(functionality){

            },

            save: function () {
                _collectionContainer.optionCollection = this.selection;
                this.stop();
            },
            stop: function () {
                this.selection = null;
                _collectionContainer = null;
                $location.path(_savePath);
                _savePath = null;
                this.running = false;
                _mementoMap.forEach(function(item) {
                    item.o.restoreFromMemento(item.m);
                });
            },
            run: function (path, collectionContainer) {
                _mementoMap = sharedData.allOptions.map(function(option){
                   return {o : option, m : option.saveToMemento()};
                });
                this.running = true;
                _collectionContainer = collectionContainer;
                // shallow copy
                this.selection = collectionContainer.optionCollection.slice(0);
                _savePath = $location.path();
                $location.path(path);
            }
        };
    }])

    .directive('shBookmarkingControls', function () {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: '/components/bookmarking/sh-selection-for-bookmark.html',
            controller: ['$scope', 'bookmarking', function ($scope, bookmarking) {
                this.bookmarking = bookmarking;
                this.topDirections = ['left', 'up'];
                this.bottomDirections = ['down', 'right'];

                this.isOpen = true;

                this.availableModes = ['md-fling', 'md-scale'];
                this.selectedMode = 'md-fling';

                this.availableDirections = ['up', 'down', 'left', 'right'];
                this.selectedDirection = 'up';
            }],
            controllerAs : '$ctrl'
            //TODO: fehlt noch ausgabe zustand und zugehöriger raum/functionality irgendwie so:  {{option.room}} {{option.functionality}}
        };
    });