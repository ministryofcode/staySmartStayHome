'use strict';

/*
 *
 * flaw : no idea which directive depends on what
 * lightDetails.html -> 'color.picker'
 */

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
