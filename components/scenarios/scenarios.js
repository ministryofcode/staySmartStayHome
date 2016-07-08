'use strict';

angular.module('app.scenarios', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/scenarios', {
            templateUrl: 'components/scenarios/scenarios.html',
            controller: 'ScenariosController',
            controllerAs: '$ctrl'
        });
    }])

    .controller('ScenariosController', [
        '$scope', 'sharedData', 'bookmarking','$mdDialog','$mdToast',
        function ($scope, sharedData, bookmarking,$mdDialog,$mdToast) {
            this.singleExpand = true;
            this.scenes = sharedData.scenes;

            sharedData.scenes.forEach(function(s){
                s.iconOptions.noexpand = false;
                s.iconOptions.nocollapse = false;
            });

            this.applyScene = function(scene){
                var msg = 'Szenarium "' + scene.label + "' nicht angewandt, enthält keine Funktionen.'";
                if(scene.attachedFunctionalities.length > 0){
                    scene.attachedFunctionalities.forEach(function(f){
                        var option = null,memento =null,optionmemento = null;
                        for(var i= 0; i < f.options.length;i++){
                            option = f.options[i];
                            optionmemento = scene.optionMementos.find(function(m){
                                return m.optionID == option.id;
                            });
                            if(optionmemento){
                                option.restoreFromMemento(optionmemento.memento);
                                msg = 'Szenarium "' + scene.label + "' angewandt'";
                            }
                        }
                    });
                }
                $mdToast.showSimple(msg);
            };

            this.startBookmark = function (scene) {
                bookmarking.run('/rooms', scene);
            };


            this.createScene = function () {
                var slabel = 'Szenario ' + (sharedData.scenes.length + 1);
                sharedData.createOne('scene', {label: slabel});
            };

            this.removeScene = function (scene) {
                scene.isExpanded = false;

                var i = this.scenes.indexOf(scene);
                if (i >= 0) {
                    var self = this;
                    var confirm = $mdDialog.confirm()
                        .title('Szenario löschen ?')
                        .textContent('Soll das Szenario `' + ( scene.label ? scene.label : 'ohne Bezeichnung') + '` gelöscht werden?')
                        .ariaLabel('Szenario löschen - Confirm')
                        // .targetEvent(ev)
                        .ok('Ja')
                        .cancel('Nein');
                    $mdDialog.show(confirm).then(function () {
                        self.scenes.splice(i, 1);
                    });
                }
            };

            this.removeFunctionalityFromScene = function(scene,functionality){
                var i = scene.attachedFunctionalities.indexOf(functionality);
                if(i >= 0)
                    scene.attachedFunctionalities.splice(i,1);
            };

        }
    ]);

