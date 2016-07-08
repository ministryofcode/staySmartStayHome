'use strict';

angular.module('app.rules', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/rules', {
            templateUrl: 'components/rules/rules.html',
            controller: 'RulesController',
            controllerAs: '$ctrl'
        });
    }])

    .controller('RulesController', ['sharedData', '$mdDialog', '$scope', '$mdMedia', '$mdToast','$mdBottomSheet',

        function (sharedData, $mdDialog, $scope, $mdMedia, $mdToast,$mdBottomSheet) {
            var self = this;

            this.selectedRule = false;


            this.rules = sharedData.rules;

            this.rules.forEach(function (r) {

                this.selectedRule = r.selected ? r : this.selectedRule;
            }, this);

            this.createRule = function () {
                var rule = sharedData.createOne('rule', null, true);
                this.setSelected(rule);
            };

            this.deleteRule = function (rule) {
                if (!rule)
                    return;
                var self = this;
                var confirm = $mdDialog.confirm()
                    .title('Regel löschen ?')
                    .textContent('Soll die Regel `' + ( rule.label ? rule.label : 'ohne Bezeichnung') + '` gelöscht werden?')
                    .ariaLabel('Regel löschen - Confirm')
                    // .targetEvent(ev)
                    .ok('Ja')
                    .cancel('Nein');
                $mdDialog.show(confirm).then(function () {
                    var i = self.rules.indexOf(rule);
                    if (i >= 0) {
                        self.rules.splice(i, 1);

                        self.selectedRule = false;

                    }
                });
            }

            this.setSelected = function (r1) {
                this.selectedRule = r1;
                this.rules.forEach(function (r2) {
                    r2.selected = r2 == r1;
                });
            };

            this.removeConditionFromSelectedRule = function (condition) {
                var i = this.selectedRule.conditionCollection.indexOf(condition);
                if(i >= 0)
                    this.selectedRule.conditionCollection.splice(i,1);
            }

            this.startContitionEdit = function(condition_){
                $mdBottomSheet.show({
                    template: [
                        '<sh-condition-edit condition="$ctrl.condition" flex>',
                        '</sh-condition-edit>'
                    ].join(),
                    clickOutsideToClose: false
                })
            };


            this.addNewCondidionToSelectedRule = function () {
                var newCondition = sharedData.createOne('condition', {label: 'Bedingung ' + (sharedData.conditions.length + 1)});
                this.selectedRule.conditionCollection.unshift(newCondition);
            };

            this.showConditionConnectDialog = function (ev) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $scope.$watch(function () {
                    return $mdMedia('xs') || $mdMedia('sm');
                }, function (wantsFullScreen) {
                    $scope.customFullscreen = (wantsFullScreen === true);
                });
                $mdDialog.show({
                    controller: ['$scope', '$mdDialog', 'sharedData', function ($scope, $mdDialog, sharedData) {
                        var self = this;

                        this.conditions = sharedData.conditions.slice();

                        this.cancel = function () {
                            $mdDialog.cancel();
                        };
                        this.returnSelection = function (condition) {
                            $mdDialog.hide(condition);
                        };
                    }],
                    controllerAs: '$ctrl',
                    templateUrl: 'components/rules/select-condition-dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen
                })
                    .then(function (condition) {
                        var collection = self.selectedRule.conditionCollection;
                        var index = collection.indexOf(condition);
                        if (index >= 0) {
                            var msg = 'Bedingung "' +condition.label  + '" bereits mit Regel "' + self.selectedRule.label + '" verknüpft';
                            $mdToast.showSimple(msg);
                            return;
                        }
                        collection.unshift(condition);
                    });
            };


        }]);


angular.module('app.rules').component('shRule', {
        templateUrl: 'components/rules/rule.html',
        bindings: {
            rule: '=',
            // onDelete: '&onDelete'
        }
    }
);

angular.module('app.rules').component('shConditionEdit', {
        templateUrl: 'components/rules/condition-edit.html',
        bindings: {
            condition: '='
        },
        controller: ['$scope', function ($scope) {
            this.fromTimePlaceholder = new Date(0);
            this.toTimePlaceholder = new Date(24 * 60 * 60 * 1000 - 1);
            this.conditionTypes = ['Zeit', 'Anwesenheit', 'Wetter'];
            this.narrowBySelection = [];
            this.narrowBy = {
                'Zeit': ['Uhrzeit', 'Tage', 'Monate'],
                'Wetter': ['Regen', 'Windgeschwindigkeit', 'Temperatur']
            };

            this.days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
            this.months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'Oktober', 'November', 'Dezember'];
        }]
    }
);

angular.module('app.rules').component('shCondition', {
        templateUrl: 'components/rules/condition.html',
        bindings: {
            condition: '='
        },
        controller: ['$scope', function ($scope) {
        }]
    }
);