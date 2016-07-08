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


            this.applyScene = function(){
                var msg =" TODO: IMPLEMENT  - Fuck You Scenario not applyed , haha"
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

            this.expand = function (scene) {
                var self = this;
                if (this.singleExpand)
                    this.scenes.forEach(function (sceneOther) {
                        if (scene !== sceneOther)
                            self.collapse(scene)
                    });

                scene.span.expanded = true;

                if (this.growVal == 'both' || this.growVal == 'row')
                    scene.span.row = 2;
                if (this.growVal == 'both' || this.growVal == 'col')
                    scene.span.col = 2;
            };

            this.collapse = function (scene) {
        
            };

        }
    ]);

