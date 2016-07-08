'use strict';

angular.module('app.navigation', [])
    .controller('NavigationController', ['$scope', 'routelabels', '$location', function ($scope, routelabels, $location) {

        $scope.$on('$locationChangeSuccess', function () {
            var cur_path = $location.path();
            $scope.menueItems.forEach(function (item) {
                var regex = item.regex || item.href.substr(1);
                if (!item.excludeHighlight)
                    item.highlight = cur_path.search(regex) > -1;
            });
        });

        $scope.menueItems = [{
            imgSrc: '/img/icons/m_home.svg',
            label: routelabels.lookup('home'),
            href: '#/home',
            highlight: true
        }, {
            imgSrc: '/img/icons/m_rooms.svg',
            label: routelabels.lookup('rooms'),
            href: '#/rooms',
            highlight: false,
            regex: /\/rooms(?!\/security|\/energy).*/i
        }, {
            imgSrc: '/img/icons/m_scenario.svg',
            label: routelabels.lookup('scenarios'),
            href: '#/scenarios',
            highlight: false
        }, {
            imgSrc: '/img/icons/m_rules.svg',
            label: routelabels.lookup('rules'),
            href: '#/rules',
            highlight: false
        }, {
            imgSrc: '/img/icons/m_weather.svg',
            label: routelabels.lookup('weather'),
            href: '#/weather',
            highlight: false
        }, {
            imgSrc: '/img/icons/m_energy.svg',
            label: routelabels.lookup('energy'),
            href: '#/rooms/energy',
            regex: /\/rooms\/energy.*/i
        }, {
            imgSrc: '/img/icons/m_security.svg',
            label: routelabels.lookup('security'),
            href: '#/rooms/security',
            regex: /\/rooms\/security.*/i
        }, {
            imgSrc: '/img/icons/m_options.svg',
            label: routelabels.lookup('settings'),
            href: '#/settings',
            highlight: false
        }, {
            imgSrc: '/img/icons/m_more.svg',
            label: '',
            href: "",
            id: 'sh-nav-menu-more',
            excludeHighlight: true
        }];
        $scope.menueItemsOverflow = $scope.menueItems.slice(0, $scope.menueItems.length - 1).reverse();
    }])


    .directive('shBottomNavigation', function () {
        // DirectiveName: CamelCase in .js , hyphen separated in .html
        // see attr-normalization: https://docs.angularjs.org/guide/directive
        return {
            restrict: 'A',
            templateUrl: 'components/navigation/navigation.html'
        };
    });
