angular.module('app').component('shIcon', {
        template: [
            '<div ng-include="$ctrl.path">',
			'</div>'
        ].join(''),
        bindings: {
            name: '@',
            color: '='
        },
        controller: ['$scope', function ($scope) {
            this.path = 'img/icons/' + this.name + '.svg';
            // this.style = ".st0{ fill : " + (this.color || '#aaffee') + " !important}"
        }]
    }
);


/* ng-style="$ctrl.style" '<style type="text/css">{{$ctrl.style}}</style>', */