angular.module('app').factory('sharedData', ['$window', '$log', 'models', function ($window, $log, models) {


    var getFromLocalStorage = function (key) {
        var result = localStorage.getItem(key);
        return result ? JSON.parse(result) : undefined;
    };
    var usersInitial = [{
        name: 'Martin',
        surname: 'Schneider',
        lsKey: 'userdata0',
        active: true,
        image: '/img/profilepics/m_schneider.png'
    }, {
        name: 'Daniela',
        surname: 'Müller',
        lsKey: 'userdata1',
        active: false,
        image: '/img/profilepics/d_mueller.png'
    }, {
        name: 'Carsten',
        surname: 'Leipold',
        lsKey: 'userdata2',
        active: false,
        image: '/img/profilepics/c_leipold.png'
    }];

    var users = getFromLocalStorage('users');
    users = users || usersInitial;
    var activeUser = users.find(function (user) {
        return user.active;
    });

    var sharedData = getFromLocalStorage(activeUser.lsKey);

    if (sharedData) {
        models.setnextID(sharedData.nextModelID);
        sharedData.users = users;
    }

    var reset = !sharedData || (sharedData.localStorageSettings && sharedData.localStorageSettings.reset);
    if (reset) {
        models.setnextID(0);
        sharedData = {
            users: usersInitial,
            localStorageSettings: {
                reset: false
            },
            gridSystem: [],
            rooms: {
                living: {
                    label: 'Wohnzimmer',
                    iconName: 'r_livingroom',
                    functionalities: models.create(
                        ['light', {
                            label: 'Hauptlampe',
                            options: models.create(
                                ['lamp', {
                                    label: 'Hauptlampe',
                                    state: {
                                        on: false,
                                        color: '#cd3700'
                                    }
                                }]
                            )
                        }],
                        ['light', {
                            label: 'Esstischlampe',
                            options: models.create(
                                ['lamp', {
                                    label: 'Lampe Esstisch', state: {
                                        on: true,
                                        color: '#00CD66'
                                    }
                                }]
                            )
                        }],
                        ['light', {
                            label: 'Stehleuchte',
                            options: models.create(
                                ['lamp', {
                                    label: 'Lampe Stehleuchte', state: {
                                        on: false,
                                        color: '#b2dfee'
                                    }
                                }]
                            )
                        }],
                        ['rollo', {
                            options: models.create(
                                ['rolloOption', {label: 'Rollo', state: {value: 60}}]
                            )
                        }],
                        ['audio', {
                            options: models.create(
                                ['audioOptions', {label: 'Audio'}]
                            )
                        }],
                        ['heating', {
                            options: models.create(
                                ['heatingtemperature', {label: 'Temperatur'}]
                            )
                        }],
                        ['window', {
                            options: models.create(
                                ['specificwindow', {label: 'Fenster 1'}]
                            ),
                            expDisallowed: true,
                            label: "Fenster 1"
                        }],
                        ['window', {
                            options: models.create(
                                ['specificwindow', {label: 'Fenster 2', state: {kipped: false}}]
                            ),
                            expDisallowed: true,
                            label: "Fenster 2"
                        }],
                        ['beamer', {
                            options: models.create(
                                ['beamerOptions', {label: 'Beamer'}],
                                ['beamerProgramm', {label: 'DVD'}]
                            )
                        }],
                        ['screen', {
                            options: models.create(
                                ['screenOptions', {label: 'Leinwand'}]
                            ),
                            expDisallowed: true

                        }],
                        ['tv', {
                            options: models.create(
                                ['tvOptions', {label: 'Fernseher'}],
                                ['tvProgramm', {label: 'Fernsehprogramm'}]
                            )
                        }],
                        ['additionalfunc', {
                            expDisallowed: true,
                            iconOptions : {nofavorite : true},
                            options: models.create(
                                ['additionalfuncOptions', {label: 'Optionen'}]
                            )
                        }]
                    )
                },
                sleep: {
                    label: 'Schlafzimmer',
                    iconName: 'r_bedroom',
                    functionalities: models.create(
                        ['light', {
                            label: 'Hauptlampe',
                            options: models.create(
                                ['lamp', {
                                    label: 'Hauptlampe',
                                    state: {
                                        on: true,
                                        color: '#ffd700'
                                    }
                                }]
                            )
                        }],
                        ['light', {
                            label: 'Nachttisch 1',
                            options: models.create(
                                ['lamp', {
                                    label: 'Nachttisch 2', state: {
                                        on: true,
                                        color: '#ffd700'
                                    }
                                }]
                            )
                        }],
                        ['light', {
                            label: 'Nachttisch 2',
                            options: models.create(
                                ['lamp', {
                                    label: 'Nachttisch 2', state: {
                                        on: false,
                                        color: '#ffd700'
                                    }
                                }]
                            )
                        }],
                        ['rollo', {
                            options: models.create(
                                ['rolloOption', {label: 'Rollo', state: {value: 20}}]
                            )
                        }],
                        ['audio', {
                            options: models.create(
                                ['audioOptions', {label: 'Audio'}]
                            )
                        }],
                        ['heating', {
                            options: models.create(
                                ['heatingtemperature', {label: 'Temperatur'}]
                            )
                        }],
                        ['window', {
                            options: models.create(
                                ['specificwindow', {
                                    label: 'Fenster 2', state: {
                                        kipped: false
                                    }
                                }]
                            ),
                            expDisallowed: true
                        }],
                        ['tv', {
                            options: models.create(
                                ['tvOptions', {label: 'Fernseher', state: {isactiv: 1}}],
                                ['tvProgramm', {label: 'Fernsehprogramm'}]
                            )
                        }],
                        ['additionalfunc', {
                            options: models.create(
                                ['additionalfuncOptions', {label: 'Optionen'}]
                            ), expDisallowed: true
                        }]
                    )
                },
                kitchen: {
                    iconName: 'r_kitchen',
                    label: 'Küche',
                    functionalities: models.create(
                        ['light', {
                            label: 'Hauptlampe',
                            options: models.create(
                                ['lamp', {
                                    label: 'Hauptlampe',
                                    state: {
                                        on: false,
                                        color: '#ff0000'
                                    }
                                }]
                            )
                        }],
                        ['light', {
                            label: 'Arbeitsfläche',
                            options: models.create(
                                ['lamp', {
                                    label: 'Arbeitsfläche',
                                    state: {
                                        on: true,
                                        color: '#ffb90f'
                                    }
                                }]
                            )
                        }],
                        ['rollo', {
                            options: models.create(
                                ['rolloOption', {label: 'Rollo', state: {value: 60}}]
                            )
                        }],
                        ['audio', {
                            options: models.create(
                                ['audioOptions', {label: 'Audio'}]
                            )
                        }],
                        ['heating', {
                            options: models.create(
                                ['heatingtemperature', {label: 'Temperatur'}]
                            )
                        }],


                        ['window', {
                            options: models.create(
                                ['specificwindow', {label: 'Fenster 1'}]
                            ),
                            expDisallowed: true
                        }],
                        ['fridge', {
                            options: models.create(
                                ['fridgeOptions', {label: 'Kühlschrank-Innenleben'}]
                            )
                        }],
                        ['oven', {
                            options: models.create(
                                ['ovenOptions', {label: 'Backofen'}]
                            )
                        }],
                        ['coffeemachine', {
                            options: models.create(
                                ['coffeemachineOptions', {label: 'Kaffeemaschine'}],
                                ['coffeeTypes', {label: 'Arten:'}]
                            )
                        }]
                    )
                },

                bath: {
                    label: 'Bad',
                    iconName: 'r_bathroom',
                    functionalities: models.create(
                        ['light', {
                            label: 'Hauptlampe',
                            options: models.create(
                                ['lamp', {
                                    label: 'Hauptlampe',
                                    state: {
                                        on: true,
                                        color: '#bfefff'
                                    }
                                }]
                            )
                        }],
                        ['light', {
                            label: 'Waschtisch 1',
                            options: models.create(
                                ['lamp', {
                                    label: 'Waschtisch 1', state: {
                                        on: true,
                                        color: '#ffd700'
                                    }
                                }]
                            )
                        }],
                        ['light', {
                            label: 'Waschtisch 2',
                            options: models.create(
                                ['lamp', {
                                    label: 'Waschtisch 2', state: {
                                        on: true,
                                        color: '#ffd700'
                                    }
                                }]
                            )
                        }],
                        ['rollo', {
                            options: models.create(
                                ['rolloOption', {label: 'Rollo', state: {value: 60}}]
                            )
                        }],
                        ['audio', {
                            options: models.create(
                                ['audioOptions', {label: 'Audio'}]
                            )
                        }],
                        ['heating', {
                            options: models.create(
                                ['heatingtemperature', {label: 'Temperatur'}]
                            )
                        }],
                        ['window', {
                            options: models.create(
                                ['specificwindow', {label: 'Fenster 1'}]
                            ),
                            expDisallowed: true
                        }],
                        ['tub', {
                            options: models.create(
                                ['tubOptions', {label: 'Badewanne'}]
                            )
                        }]
                    )
                },
                cellar: {
                    label: 'Keller',
                    iconName: 'r_basement',
                    functionalities: models.create(
                        ['light', {
                            label: 'Hauptlampe',
                            options: models.create(
                                ['lamp', {
                                    label: 'Hauptlampe',
                                    state: {
                                        on: false,
                                        color: '#ffd700'
                                    }
                                }]
                            )
                        }],
                        ['light', {
                            label: 'Eingangsbereich',
                            options: models.create(
                                ['lamp', {
                                    label: 'Eingangsbereich', state: {
                                        on: false, color: '#ffd700'
                                    }
                                }]
                            )
                        }],

                        ['heating', {
                            options: models.create(
                                ['heatingtemperature', {label: 'Temperatur'}]
                            )
                        }],
                        ['washingmachine', {
                            options: models.create(
                                ['washingmachineOptions', {label: 'Waschmaschine'}],
                                ['washingmachineModeOptions', {label: 'Waschprogramme'}]
                            )
                        }],
                        ['dryer', {
                            options: models.create(
                                ['dryerOptions', {label: 'Trockner'}],
                                ['dryerOptionsMode', {label: 'Trocknerprogramme'}]
                            )
                        }]
                    )
                },
                child1: {
                    label: 'Kinderzimmer 1',
                    iconName: 'r_child_bedroom',
                    functionalities: models.create(
                        ['light', {
                            label: 'Hauptlampe',
                            options: models.create(
                                ['lamp', {
                                    label: 'Hauptlampe',
                                    state: {
                                        on: true,
                                        color: '#00cd66'
                                    }
                                }]
                            )
                        }],
                        ['light', {
                            label: 'Wickeltisch',
                            options: models.create(
                                ['lamp', {
                                    label: 'Wickeltisch', state: {
                                        on: false,
                                        color: '#ffa07a'
                                    }
                                }]
                            )
                        }],
                        ['rollo', {
                            options: models.create(
                                ['rolloOption', {label: 'Rollo', state: {value: 80}}]
                            )
                        }],
                        ['audio', {
                            options: models.create(
                                ['audioOptions', {label: 'Audio'}]
                            )
                        }],
                        ['heating', {
                            options: models.create(
                                ['heatingtemperature', {label: 'Temperatur'}]
                            )
                        }],
                        ['window', {
                            options: models.create(
                                ['specificwindow', {
                                    label: 'Fenster 1', state: {
                                        kipped: false
                                    }
                                }]
                            ),
                            expDisallowed: true
                        }],
                        ['babymonitoring', {
                            options: models.create(
                                ['babymonitoringOptions', {label: 'Babyüberwachung'}]
                            )
                        }],
                        ['additionalfunc', {
                            iconOptions : {nofavorite : true},
                            options: models.create(

                                ['additionalfuncOptions', {label: 'Optionen'}]
                            ), expDisallowed: true
                        }]
                    )
                },
                child2: {
                    label: 'Kinderzimmer 2',
                    iconName: 'r_child_bedroom',
                    functionalities: models.create(
                        ['light', {
                            label: 'Hauptlampe',
                            options: models.create(
                                ['lamp', {
                                    label: 'Hauptlampe',
                                    state: {
                                        on: false,
                                        color: '#00cd66'
                                    }
                                }]
                            )
                        }],
                        ['light', {
                            label: 'Arbeitstisch',
                            options: models.create(
                                ['lamp', {
                                    label: 'Arbeitstisch', state: {
                                        on: true,
                                        color: '#ffb90f'
                                    }
                                }]
                            )
                        }],
                        ['rollo', {
                            options: models.create(
                                ['rolloOption', {label: 'Rollo', state: {value: 40}}]
                            )
                        }],
                        ['audio', {
                            options: models.create(
                                ['audioOptions', {label: 'Audio'}]
                            )
                        }],
                        ['heating', {
                            options: models.create(
                                ['heatingtemperature', {label: 'Temperatur'}]
                            )
                        }],
                        ['window', {
                            options: models.create(
                                ['specificwindow', {label: 'Fenster 1'}]
                            ),
                            expDisallowed: true
                        }],
                        ['additionalfunc', {
                            iconOptions : {nofavorite : true},
                            options: models.create(
                                ['additionalfuncOptions', {label: 'Optionen'}]
                            ), expDisallowed: true
                        }]
                    )
                },
                hallway: {
                    label: 'Gang',
                    iconName: 'hallway',
                    functionalities: models.create(
                        ['light', {
                            options: models.create(
                                ['lamp', {label: 'Hauptlampe', state: {color: '#ffb90f'}}])
                        }],
                        ['audio', {
                            options: models.create(
                                ['audioOptions', {label: 'Audio'}]
                            )
                        }],
                        ['heating', {
                            options: models.create(
                                ['heatingtemperature', {label: 'Temperatur'}]
                            )
                        }],
                        ['door', {
                            options: models.create(
                                ['doorOptions', {label: 'Haustüre'}]
                            ),
                            expDisallowed: true
                        }],
                        ['additionalfunc', {
                            iconOptions : {nofavorite : true},
                            options: models.create(
                                ['additionalfuncOptions', {label: 'Optionen'}]
                            ), expDisallowed: true
                        }]
                    )
                },
                garden: {
                    label: 'Garten',
                    iconName: 'r_garden',
                    functionalities: models.create(
                        ['light', {
                            label: 'Hauptlampe',
                            options: models.create(
                                ['lamp', {
                                    label: 'Hauptlampe',
                                    state: {
                                        on: false,
                                        color: '#ffb90f'
                                    }
                                }]
                            )
                        }],
                        ['light', {
                            label: 'Blumenbeet',
                            options: models.create(
                                ['lamp', {
                                    label: 'Lampe Blumenbeet', state: {
                                        on: false,
                                        color: '#ffb90f'
                                    }
                                }]
                            )
                        }],
                        ['sprinkler', {
                            label: 'Bewässerungsanlage',
                            options: models.create(
                                ['sprinklerOptions', {
                                    label: 'Bewässerungsanlage'
                                }]
                            )
                        }],
                        ['awning', {
                            options: models.create(
                                ['awningOptions', {label: 'Markise'}]
                            ),
                            expDisallowed: true
                        }],
                        ['lawnmower', {
                            options: models.create(
                                ['lawnmowerOptions', {label: 'Rasenmäher'}],
                                ['lawnmowerModi', {label: 'Modi'}]
                            ),
                            expDisallowed: true
                        }],
                        ['pool', {
                            options: models.create(
                                ['poolOptions', {label: 'Pool'}]
                            ),
                            expDisallowed: true
                        }]
                    )
                },
                security: {
                    label: 'Sicherheit',
                    iconName: 'security',
                    functionalities: models.create(
                        ['securitycam', {
                            options: models.create(
                                ['securitycamOptions', {
                                    label: 'Überwachungskamera 1',
                                    state: {source: 'img/surveillance_day.jpg'}
                                }
                                ]),
                            label: "Kamera vorne"
                        }],
                        ['securitycam', {
                            options: models.create(
                                ['securitycamOptions', {
                                    label: 'Überwachungskamera 2',
                                    state: {source: 'img/ueberwachunggarten.jpg'}
                                }
                                ]),
                            label: "Kamera hinten"
                        }],
                        ['motiondetector', {
                            options: models.create(
                                ['motiondetectorOptions', {label: 'Bewegungsmelder'}
                                ])
                        }]
                    )
                },
                energy: {
                    label: 'Energie',
                    iconName: 'energy_1',
                    functionalities: models.create(
                        ['waterconsumption', {
                            options: models.create(
                                ['waterconsumptionOption', {label: 'Wasserverbrauch'}

                                ])
                        }],
                        ['electroconsumption', {
                            options: models.create(
                                ['electroconsumptionOption', {label: 'Stromverbrauch'}

                                ])
                        }],
                        ['photovol', {
                            options: models.create(
                                ['photovolOptions', {label: 'Photovoltaik'}
                                ])
                        }],
                        ['energytipp', {
                            options: models.create(
                                ['energytippOptions', {label: 'Tipps'}
                                ]),
                            expDisallowed: true
                        }]
                    )
                },
            },
            scenes: models.create(['scene', {label: 'Kinoabend'}], ['scene', {label: 'Aufriss'}]),

            weather: {
                weatherkinds: [
                    {value: 'leicht bewölkt'}, // 0
                    {value: 'Schauer'}, //1
                    {value: 'bewölkt'}, //2
                    {value: 'Regen'}, //3
                    {value: 'sonnig'}, //4
                    {value: 'leicht bewölkt - Nacht'}, //5
                    {value: 'klare Nacht'} //6

                ],
                dayData: [
                    {
                        day: 'Heute',
                        highesttemperature: '22',
                        lowesttemperature: '11',
                        actualtemperature: '16',
                        humidity: '70',
                        windspeed: '2',
                        rain: '0.03',
                        iconName: 'w_cloudy'
                    },
                    {
                        day: 'Morgen',
                        highesttemperature: '16',
                        lowesttemperature: '10',
                        actualtemperature: '12',
                        humidity: '64',
                        windspeed: '7',
                        rain: '2.03',
                        iconName: 'w_rainy'

                    },
                    {
                        day: 'Übermorgen',
                        highesttemperature: '16',
                        lowesttemperature: '7',
                        actualtemperature: '15',
                        humidity: '44',
                        windspeed: '6',
                        rain: '4.39',
                        iconName: 'w_stormy'

                    },
                    {
                        day: 'in 3 Tagen',
                        highesttemperature: '20',
                        lowesttemperature: '7',
                        actualtemperature: '13',
                        humidity: '84',
                        windspeed: '9',
                        rain: '1.7',
                        iconName: 'w_rainy'

                    },
                    {
                        day: 'in 4 Tagen',
                        highesttemperature: '30',
                        lowesttemperature: '18',
                        actualtemperature: '25',
                        humidity: '44',
                        windspeed: '3',
                        rain: '',
                        iconName: 'w_sunny'
                    },
                    {
                        day: 'in 5 Tagen',
                        highesttemperature: '29',
                        lowesttemperature: '22',
                        actualtemperature: '26',
                        humidity: '70',
                        windspeed: '0.3',
                        rain: '',
                        iconName: 'w_sunny'
                    }
                ]
            },

            messagesShow: false,
            messagesShowCount: 0,
            messages: [{
                face: "img/icons/Information.svg",
                what: 'Information',
                details: 'Herzlich Willkommen daheim!',
                when: '-',
                expanded: true,
                timestamp: -1
            },
                {
                    face: "img/icons/Information.svg",
                    what: 'Information',
                    details: 'Alle Systeme betriebsbereit.',
                    when: '-',
                    expanded: true,
                    timestamp: -1
                },
                {
                    face: "img/icons/Information.svg",
                    what: 'Information',
                    details: 'Denk immer daran: Stay Smart. Stay Home.',
                    when: '-',
                    expanded: true,
                    timestamp: -1
                }],
            news: [{
                face: "img/icons/Information.svg",
                what: 'Sport',
                details: 'Wer wird Europameister?',
                when: '-',
                expanded: true,
                timestamp: 0
            }],


            conditions: models.create(),
            scenes: models.create(['scene', {label: 'Szenario 1'}]),
            rules: models.create(['rule', {label: 'Regel 1'}], ['rule', {label: 'Regel 2'}])
        };
    }


    sharedData.allRoomFunctionalities = [];
    var id = 0;
    for (var key in sharedData.rooms) {
        sharedData.rooms[key].key = key;
        sharedData.rooms[key].functionalities.forEach(function (functionality) {
            sharedData.allRoomFunctionalities.push(functionality);
            functionality.room = sharedData.rooms[key]; // DELETE CIRCULAR REFERENCE BEFORE STRINGIFY
            functionality.options.forEach(function (option) {
                option.functionality = functionality;
            });
        });
    }

    var memento = {
        saveToMemento: function () {
            //TODO: whatif if state contains ref
            var memento = angular.merge({}, this.state);
            return memento;
        },
        restoreFromMemento: function (memento) {
            angular.merge(this.state, memento);
        }
    };

    sharedData.allOptions = sharedData.allRoomFunctionalities.reduce(function (result, current) {
        Array.prototype.push.apply(result, current.options);
        return result;
    }, []);

    sharedData.allOptions.forEach(function (option) {
        angular.merge(option, memento);
    });

    setObjectsAfterParse_forEach(sharedData.rules, 'conditionCollection', sharedData.conditions);
    setObjectsAfterParse_forEach(sharedData.rules, 'optionCollection', sharedData.allOptions);
    setObjectsAfterParse_forEach(sharedData.rules, 'sceneCollection', sharedData.scenes);
    setObjectsAfterParse_forEach(sharedData.scenes, 'optionCollection', sharedData.allOptions);

    var scenes_rules = sharedData.scenes.concat(sharedData.rules);
    scenes_rules.forEach(function (elem) {
        for (var i = 0; i < elem.optionCollection.length; i++) {
            elem.optionCollection[i] = sharedData.allOptions.find(function (option) {
                return option.id == elem.optionCollection[i];
            });
        }
    });

    var saveKey = activeUser = users.find(function (user) {
        return user.active;
    }).lsKey;

    function setObjectsAfterParse_forEach(arr, idArrKey, objArr) {
        var objMap = {};
        for (var i = 0; i < objArr.length; i++) {
            objMap[objArr[i].id] = objArr[i];
        }
        arr.forEach(function (idArrContainer) {
            setObjectsAfterParse(idArrContainer[idArrKey], objMap);
        });
    }

    function setObjectsAfterParse(idArr, objMap) {
        for (var i = 0; i < idArr.length; i++) {
            idArr[i] = objMap[idArr[i]];
        }
    }

    function writeIdsBeforeStringify_forEach(arr, objArrKey) {
        arr.forEach(function (objArrKeyContainer) {
            writeIdsBeforeStringify(objArrKeyContainer[objArrKey]);
        });
    }

    function writeIdsBeforeStringify(arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].id;
        }
    }

    var toLocalStorage = function (event) {
        writeIdsBeforeStringify_forEach(sharedData.rules, 'conditionCollection');
        writeIdsBeforeStringify_forEach(sharedData.rules, 'optionCollection');
        writeIdsBeforeStringify_forEach(sharedData.rules, 'sceneCollection');
        writeIdsBeforeStringify_forEach(sharedData.scenes, 'optionCollection');

        users = JSON.stringify(sharedData.users);
        sharedData.allOptions.forEach(function (o) {
            delete o.functionality;
        });
        delete sharedData.allOptions;
        sharedData.allRoomFunctionalities.forEach(function (f) {
            delete f.room;
        });
        delete sharedData.allRoomFunctionalities;
        delete sharedData.users;
        sharedData.nextModelID = models.getnextID();
        ;
        sharedData = JSON.stringify(sharedData);
        localStorage.setItem('users', users);
        localStorage.setItem(saveKey, sharedData);
    };
    window.addEventListener('unload', toLocalStorage);

    $log.log('sharedDataReset:', reset);
    $log.log('sharedData:', sharedData);

    sharedData.createOne = function (type, additionalData, pushFront) {
        additionalData = additionalData || {};
        var res = models.create([type, additionalData])[0];
        switch (type) {
            case 'condition':
                sharedData.conditions[pushFront ? 'unshift' : 'push'](res);
                break;
            case 'rule' :
                sharedData.rules[pushFront ? 'unshift' : 'push'](res);
                break;
            case 'scene':
                sharedData.scenes[pushFront ? 'unshift' : 'push'](res);
                break;
        }
        return res;
    }

    return sharedData;
}]);