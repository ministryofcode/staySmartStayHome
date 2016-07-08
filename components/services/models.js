angular.module('app').factory('models', [function () {
    var modelID = 0;
    var constructors = {
        light: Functionality,
        awning: Functionality,
        awningOptions: Option,
        audio: Functionality,
        audioOptions: Option,
        heating: Functionality,
        heatingtemperature: Option,
        heatingwarning: Option,
        window: Functionality,
        fridge: Functionality,
        fridgeOptions: Option,
        oven: Functionality,
        ovenOptions: Option,
        coffeemachine: Functionality,
        coffeemachineOptions: Option,
        coffeeTypes: Option,
        beamer: Functionality,
        beamerOptions: Option,
        beamerProgramm: Option,
        tv: Functionality,
        tvOptions: Option,
        tvProgramm: Option,
        screen: Functionality,
        screenOptions: Option,
        air: Functionality,
        tub: Functionality,
        tubOptions: Option,
        washingmachine: Functionality,
        washingmachineOptions: Option,
        washingmachineModeOptions: Option,
        dryer: Functionality,
        dryerOptions: Option,
        dryerOptionsMode: Option,
        babymonitoring: Functionality,
        babymonitoringOptions: Option,
        sprinkler: Functionality,
        sprinklerOptions: Option,
        rollo: Functionality,
        rolloOption: Option,
        lawnmower: Functionality,
        lawnmowerOptions: Option,
        lawnmowerModi: Option,
        pool: Functionality,
        poolOptions: Option,
        specificwindow: Option,
        lamp: Option,
        waterconsumption: Functionality,
        waterconsumptionOption: Option,
        electroconsumption: Functionality,
        electroconsumptionOption: Option,
        energytipp: Functionality,
        energytippOptions: Option,
        door: Functionality,
        doorOptions: Option,
        additionalfunc: Functionality,
        additionalfuncOptions: Option,
        electronicpic: Functionality,
        electronicpicOptions: Option,

        photovol: Functionality,
        photovolOptions: Option,
        securitycam: Functionality,
        securitycamOptions: Option,
        motiondetector: Functionality,
        motiondetectorOptions: Option,

        scene: Scene,
        rule: Rule,
        condition: Condition
    };

    function getFuncTemplate(type) {
        return '/components/tiledetails/' + type + 'details.html';
    }

    var FuncLabels = {
        light: 'Beleuchtung',
        awning: 'Markise',
        audio: 'Audio',
        heating: 'Heizung',
        window: 'Fenster',
        fridge: 'Kühlschrank',
        oven: 'Backofen',
        coffeemachine: 'Kaffeemaschine',
        beamer: 'Beamer',
        tv: 'TV',
        screen: 'Leinwand',
        air: 'Luft',
        tub: 'Badewanne',
        washingmachine: 'Waschmaschine',
        dryer: 'Trockner',
        babymonitoring: 'Babyüberwachung',
        sprinkler: 'Bewässerungsanlage',
        rollo: 'Rollos',
        lawnmower: 'Rasenmäher',
        pool: 'Pool',
        waterconsumption: 'Wasserverbrauch',
        electroconsumption: 'Stromverbrauch',
        door: 'Haustüre',
        securitycam: 'Überwachungskamera',
        motiondetector: 'Bewegungsmelder',
        photovol: 'Photovoltaik',
        additionalfunc: 'neues Gerät gefunden'
    };


    var OptionStates = {
        lamp: {
            on: true,
            color: '#ffffff',
            intensity: 100.0

        },
        poolOptions: {
            value: 25.0,
            on: false
        },
        heatingtemperature: {
            value: 20.0
        },
        heatingwarning: {
            warning: 'Heizung ist intakt'
        },
        specificwindow: {
            kipped: true
        },
        screenOptions: {
            on: true
        },
        fridgeOptions: {
            temperature: 7.0,
            picUp: 'img/fridgeUp.jpg',
            picdoor: 'img/fridgeUp2.jpg',
            picVegie: 'img/fridgeVeggie.jpg'
        },
        beamerOptions: {
            on: true,
            isactiv: 0
        },
        beamerProgramm: [
            {value: 'Spaceballs'},
            {value: 'Star Wars'},
            {value: 'Ice Age'},
            {value: 'Titanic'},
            {value: 'Zoomania'},
            {value: 'Batman'}
        ],


        tvOptions: {
            on: false,
            isactiv: 0,
        },
        tvProgramm: [
            {value: 'ARD'},
            {value: 'ZDF'},
            {value: 'Pro 7'},
            {value: 'RTL'},
            {value: 'RTL 2'},
            {value: 'Sat 1'}

        ],
        rolloOption: {
            on: false,
            value: 25,
        },
        coffeemachineOptions: {
            isactiv: 0,
            empty: true
        },
        coffeeTypes: [
            {value: 'Milchkaffee'},
            {value: 'Espresso'},
            {value: 'Cappuccino'},
            {value: 'Latte macchiato'},
        ],
        ovenOptions: {
            on: false,
            temperatur: 0,
            alarm: true,
            alarmtime: '0'
        },
        sprinklerOptions: {
            on: false,
            duration: '10'
        },
        lawnmowerOptions: {
            on: false,
            mowermodus: 0,
        },
        lawnmowerModi: [
            {value: '3mm'},
            {value: '5mm'},
            {value: '9mm'}
        ],
        babymonitoringOptions: {
            on: true,
            source: 'img/babycampic.jpg'

        },
        awningOptions: {
            on: true,
        },
        audioOptions: {
            on: false,
            play: false,
            volume: 15,
            activ: 0,
            songs: [
                {value: 'abc.mp4', name: 'Lemon Tree - Fools Garden', img: 'img/foolsgarden.jpg', duration: 10},
                {value: 'abc.mp4', name: 'Ice Ice Baby - Vanilla Ice', img: 'img/vanillaice.jpg', duration: 120},
                {value: 'abc.mp4', name: 'Rhythm Is A Dancer - Snap', img: 'img/snap.jpg', duration: 200},
                {value: 'abc.mp4', name: 'Barbie Girl - Aqua', img: 'img/barbie.jpg', duration: 150},
                {value: 'abc.mp4', name: 'Bailando - Loona', img: 'img/loona.jpg', duration: 300}
            ]
        },
        tubOptions: {
            blubberon: false,
            temperature: 30
        },
        waterconsumptionOption: {
            today: 130,

            data: ['120', '220', '130', '190', '130'],


            labels: ["Donnerstag", "Freitag", "Samstag", "Sonntag", "Heute"],

            series: ['Wasserverbrauch'],
            datasetOverride: [
                {
                    yAxisID: 'y-axis-1',
                    xAxisID: 'x-axis1'
                }
            ]
        },
        electroconsumptionOption: {
            today: 5.3,
            labels: ["Donnerstag", "Freitag", "Samstag", "Sonntag", "Heute"]

        },
        energytippOptions: {
            activ: 0,
            tipps: [
                {value: 'Du hast die letzten Tage das Licht im Wohnzimmer Nachts angelassen. Bitte Achte darauf'},
                {
                    value: 'Die Waschmaschine war beim letzten Waschgang nicht voll'
                },
                {value: 'Die Hauptlampe im Wohnzimmer ist noch keine Energiesparlampe'},
                {value: 'Du verbrauchst zu viel Wasser am Tag'}
            ]
        },
        photovolOptions: {
            today: 12.6,
            labels: [["Donnerstag", "Freitag", "Samstag", "Sonntag", "Heute"]]

        },
        securitycamOptions: {
            on: true,
            source: 'abc.mp4'
        },
        electronicpicOptions: {
            on: true
        },
        motiondetectorOptions: {
            on: true,
            person: true,
            log: [
                {value: '08.07.2016 13:30 Uhr'},
                {value: '08.07.2016 11:53 Uhr'},
                {value: '08.07.2016 10:27 Uhr'},
                {value: '07.07.2016 23:09 Uhr'},
                {value: '07.07.2016 21:20 Uhr'},
                {value: '07.07.2016 07:33 Uhr'},
                {value: '07.07.2016 11:03 Uhr'},
                {value: '07.07.2016 12:30 Uhr'}

            ]
        },
        washingmachineOptions: {
            on: false,
            time: 0,
            isactiv: 0,
        },
        washingmachineModeOptions: [
            {value: 'Normal', time: 45},
            {value: 'Vorwäsche', time: 15},
            {value: 'Pflegeleicht-Wäsche', time: 25},
            {value: 'Seide', time: 10},
            {value: 'Feinwäsche', time: 35}


        ],
        doorOptions: {
            closed: true
        },
        dryerOptions: {
            on: false,
            time: 0,
            isactiv: 1,
        },
        dryerOptionsMode: [
            {value: 'Trocken', time: 15},
            {value: 'Schrank-Trocken', time: 10},
            {value: 'Schrank-Extra', time: 45},
            {value: 'Extra-Trocken', time: 25}
        ],
        additionalfuncOptions: {
            type: '',
            option: '',
        }


    };

    var OptionInputModi = { //Steuerelemente
        lamp: {
            colorRange: false,// colorRange: [0xff0000, 0x00ff00, 0x0000ff],
            colorPicker: true,
            intensity: true
        },
        pooltemperature: {
            slider: true,
            numberfield: false
        },
        heatingtemperature: {
            slider: true
        },


    };

    var FuncDefaultSpans = {
        unknown: {row: 1, col: 2},
        rollo: {row: 1, col: 1},
        heating: {row: 1, col: 1},
        sprinkler: {row: 1, col: 1},
        audio: {row: 2, col: 2},
        washingmachine: {row: 1, col: 1},
        dryer: {row: 1, col: 1},
        fridge: {row: 2, col: 2},
        babymonitoring: {row: 2, col: 2},
        coffeemachine: {row: 1, col: 1},
        securitycam: {row: 2, col:2}
    }

    function Functionality(type, options) {
        this.instanceType = type;
        this.label = FuncLabels[type];
        this.template = getFuncTemplate(type);
        this.mainIconAction = null;
        this.tileMainIconTmpl = '/components/tile/tilemainicontmpl.html';
        this.hideBookmarkIcon = false;
        this.hideCollapseIcon = false;
        this.hideExpandedIcon = false;
        this.hideFavoriteIcon = false;
        this.isFavorite = false;
        this.isExpanded = false;
        this.id = modelID++;
        this.options = [];
        this.bookmarksAllowed = true;
        this.expDisallowed = false;
        this.isBookmarked = false;
        this.span = angular.copy(FuncDefaultSpans[type] || FuncDefaultSpans['unknown']);
        angular.merge(this, options);
    }

    function Option(type, additionaldata) {
        this.instanceType = type;
        this.id = modelID++;
        this.state = angular.copy(OptionStates[type]);
        this.inputmodi = angular.copy(OptionInputModi[type]); //Steuerelemente
        angular.merge(this, additionaldata);
    }

    function Scene(type, additionaldata) {
        this.type = type;
        this.label = null;
        this.id = modelID++;
        this.optionMementos = [];
        this.attachedFunctionalities =[];
        this.tileMainIconTmpl = '/components/scenarios/tilemainicontmpl.html';
        this.isFavorite = false;
        this.isExpanded = false;
        this.id = modelID++;
        this.bookmarksAllowed = false;
        this.span = {row:2, col: 2};
        this.iconOptions = {nobookmark : true};
        angular.merge(this, additionaldata);
    }

    function Rule(type, additionaldata) {
        this.type = type;
        this.id = modelID++;
        this.conditionCollection = [];
        this.optionCollection = [];
        this.sceneCollection = [];
        this.label = null;
        this.optionMementos = [];
        this.active = false;
        angular.merge(this, additionaldata);
    }

    function Condition(type, additionaldata) {
        this.id = modelID++;
        this.type = type;
        this.label = null;
        this.startTime = null;
        this.endTime = null;
        angular.merge(this, additionaldata);
    }

    var _create = function (type, additionaldata) {
        if (!constructors[type]) {
            throw("models.js :: [" + type + ']: unknow type, typo?');
        }
        return new constructors[type](type, additionaldata || {});
    };

    return {
        create: function () {
            var result = [];
            for (var i = 0; i < arguments.length; i++) {
                if (angular.isArray(arguments[i]))
                    result.push(_create(arguments[i][0], arguments[i][1]));
                else
                    result.push(_create(arguments[i], {}));
            }
            return result;
        },
        getnextID: function () {
            return modelID;
        },
        setnextID: function (id) {
            modelID = id;
        }
    };
}]);