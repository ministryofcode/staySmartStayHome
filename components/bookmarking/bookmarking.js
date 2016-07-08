angular.module('app')
    .factory('bookmarking', ['$location', 'sharedData', '$mdToast', function ($location, sharedData, $mdToast) {
        var _savePath;
        var _collectionContainer;
        var _mementoMap; // reset options to state they were when scene edit finished
        var _attachedFunctionalities;
        var getMsg = function (functionality, attach) {
            var msg = functionality.label + ' wurde';
            if (attach) {
                msg += _collectionContainer.type == 'rule' ? ' der Regel "' : ' dem Szenarium "';
                msg += _collectionContainer.label + '" hinzugefügt';
            } else {
                msg += _collectionContainer.type == 'rule' ? ' aus der Regel "' : ' aus dem Szenarium "';
                msg += _collectionContainer.label + '" entfernt';
            }
            return msg;
        }
        return {
            selection: null,
            running: false,
            isFunctionalityAttached: function (f) {
                return _attachedFunctionalities.indexOf(f) >= 0;
            },
            attachFunctionality: function (f) {
                if (this.isFunctionalityAttached(f))
                    return;
                _attachedFunctionalities.push(f);
                $mdToast.showSimple(getMsg(f, true));
            },
            detachFunctionality: function (f) {
                var i = _attachedFunctionalities.indexOf(f);
                if (i < 0)
                    return;
                _attachedFunctionalities.splice(i, 1);
                $mdToast.showSimple(getMsg(f, false));
            },

            save: function () {
                _collectionContainer.optionMementos = _attachedFunctionalities.reduce(function (res, curr) {
                    for (var i = 0; i < curr.options.length; i++)
                        res.push({optionID: curr.options[i].id, memento: curr.options[i].saveToMemento()});
                    return res;
                }, []);
                _collectionContainer.attachedFunctionalities = _attachedFunctionalities;
                this.stop();
            },
            stop: function () {
                this.selection = null;
                _attachedFunctionalities = null;
                _collectionContainer = null;
                $location.path(_savePath);
                _savePath = null;
                this.running = false;
                _mementoMap.forEach(function (item) {
                    item.o.restoreFromMemento(item.m);
                });
            },
            run: function (path, collectionContainer, scene) {
                sharedData.allRoomFunctionalities.forEach(function (f) {
                    f.isBookmarked = false;
                })
                _mementoMap = sharedData.allOptions.map(function (option) {
                    return {o: option, m: option.saveToMemento()};
                });
                this.running = true;
                _collectionContainer = collectionContainer;
                // shallow copy
                _attachedFunctionalities = collectionContainer.attachedFunctionalities.slice(0);
                _attachedFunctionalities.forEach(function (f) {
                    f.isBookmarked = true;
                })
                _savePath = $location.path();

                $location.path(path);
            }
        };
    }]);


angular.module('app').component('shBookmarkingControls', {
        templateUrl: "/components/bookmarking/sh-bookmarking-controls.html",
        bindings: {},
        controller: ['$scope', 'bookmarking', function ($scope, bookmarking) {
            this.bookmarking = bookmarking;
            this.topDirections = ['left', 'up'];
            this.bottomDirections = ['down', 'right'];

            this.isOpen = true;

            this.availableModes = ['md-fling', 'md-scale'];
            this.selectedMode = 'md-fling';
        }]

    }
);