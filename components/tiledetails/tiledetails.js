'use strict';

angular.module('app.details', ['color.picker'])

    .directive('shTileDetails', function () {
        return {
            scope: {
                functionality: '=shFunc'
            },
            
            restrict: 'E',
            template: "<div ng-include='functionality.template'></div>"
        };
    });
