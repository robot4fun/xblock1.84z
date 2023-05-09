/**
 * Created by tony on 2019/8/30.
 */
const DHT = require('./dht11.js');
const TCS34725 = require('./tcs34725.js');

const ArgumentType = Scratch.ArgumentType;
const BlockType = Scratch.BlockType;
const formatMessage = Scratch.formatMessage;
const log = Scratch.log;

async function timeout(ms) {
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

function cutHex(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h };
function hexToR(h) { return parseInt((cutHex(h)).substring(0, 2), 16) };
function hexToG(h) { return parseInt((cutHex(h)).substring(2, 4), 16) };
function hexToB(h) { return parseInt((cutHex(h)).substring(4, 6), 16) };

class cSensorsExtension {
    constructor(runtime) {
        this.runtime = runtime;
    }
    getInfo() {
        return {
            id: 'cSensors',
            name: formatMessage({
                id: 'Sensors.categoryName',
                default: 'Sensors'
            }),
            color1: '#4CBFE6',
            color2: '#3C95B2',
            color3: '#3C95B2',
            //menuIconURI: board.menuIconURI,
            blockIconURI: board.blockIconURI,

            blocks: [
                {
                    opcode: 'sensorDigit',
                    blockType: BlockType.BOOLEAN,
                    text: 'digital sensor [SENSOR] at port [PIN] is triggered?',
                    arguments: {
                        SENSOR: {
                            type: ArgumentType.STRING,
                            defaultValue: 'rir',
                            menu: 'digi'//'#digiList'
                        },
                        PIN: {
                            type: ArgumentType.STRING,
                            defaultValue: '2',
                            menu: 'dPort'
                        }
                    },
                    func: 'sensorDigit',
                    gen: {
                        arduino: this.sensorDigiGen
                    }
                },
                {
                    opcode: 'sensorDigit2',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'cSensors.sensorAnalog',
                        default: 'digital sensor reading at port [PIN]'
                    }),
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            defaultValue: '2',
                            menu: 'dPort'
                        }
                    },
                    func: 'sensorDigit',
                    gen: {
                        arduino: this.sensorDigiGen
                    }
                },
                /*{
                    opcode: 'rir',
                    blockType: BlockType.BOOLEAN,

                    text: formatMessage({
                        id: 'cSensors.rir',
                        default: 'reflective IR sensor at port [PIN] is triggered?'
                    }),
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            defaultValue: '2',
                            menu: 'dPort'
                        }
                    },
                    func: 'rir',
                    gen: {
                        arduino: this.rirGen
                    }
                },*/
                /*{
                    opcode: 'tilt',
                    blockType: BlockType.BOOLEAN,

                    text: formatMessage({
                        id: 'cSensors.tilt',
                        default: 'tilt switch at port [PIN] is triggered?'
                    }),
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            defaultValue: '2',
                            menu: 'dPort'
                        }
                    },
                    func: 'sensorDigit',
                    gen: {
                        arduino: this.sensorDigiGen
                    }
                },*/

                /*{
                    opcode: 'analogKeypad',
                    blockType: BlockType.BOOLEAN,

                    text: formatMessage({
                        id: 'cSensors.analogKeypad',
                        default: 'keypad at port [PIN]  button [BUT] pressed?'
                    }),
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            defaultValue: board._port.p2[2],
                            menu: 'aPort'
                        },
                        BUT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 4,
                            menu: 'aButton'
                        }
                    },
                    func: 'analogKeypad',
                    gen: {
                        arduino: this.analogKeypadGen
                    }
                },*/
                '---',
                {
                    opcode: 'sensorAnalog',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'cSensors.sensorAnalog',
                        default: 'analog sensor reading at port [PIN]'
                    }),
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            defaultValue: '2',
                            menu: 'aPort'
                        }
                    },
                    func: 'sensorAnalog',
                    gen: {
                        arduino: this.sensorAnalogGen
                    }
                },

                {
                    opcode: 'sensorAnalog2',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'cSensors.sensorAnalog2',
                        default: 'analog sensor reading at port [PORT][PIN]'
                    }),
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            defaultValue: '3',
                            menu: 'aPort2'
                        },
                        PIN: {
                            type: ArgumentType.STRING,
                            defaultValue: 1,
                            menu: 'aPin'
                        }
                    },
                    func: 'sensorAnalog',
                    gen: {
                        arduino: this.sensorAnalogGen
                    }
                },
                '---',
                {
                    opcode: 'ultrasonic',
                    blockType: BlockType.REPORTER,
                    text: 'ultrasonic sensor distance reading at port [PIN] (mm)',
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            defaultValue: '1',
                            menu: 'dPort'
                        }
                    },
                    func: 'ultrasonic',
                    gen: {
                        arduino: this.ultrasonicGen
                    }
                },
                '---',
                {
                    opcode: 'dht',
                    blockType: BlockType.REPORTER,
                    text: 'DHT sensor [FUNC] reading at port [PIN]',
                    arguments: {
                        FUNC: {
                            type: ArgumentType.STRING,
                            defaultValue: 'temperature',
                            menu: 'dht11function'
                        },
                        PIN: {
                            type: ArgumentType.STRING,
                            defaultValue: '3',
                            menu: 'dPort'
                        }
                    },
                    func: 'dht11',
                    gen: {
                        arduino: this.dht11Gen
                    }
                },
                '---',
                {
                    func: 'noop',
                    blockType: BlockType.DIVLABEL,
                    text: 'color sensor'
                },
                {
                    opcode: 'getLux',
                    blockType: BlockType.REPORTER,
                    text: 'get [LIGHT] illuminance from port 3 (lux)',
                    arguments: {
                        LIGHT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'reflected',
                            menu: 'light'
                        },
                    },
                    func: 'tcs34725lux',
                    gen: {
                        arduino: this.tcs34725luxGen
                    }
                },
                {
                    opcode: 'colorSensor',
                    blockType: BlockType.REPORTER,
                    text: 'get color from port 3 (hex)',
                    func: 'tcs34725',
                    gen: {
                        arduino: this.tcs34725Gen
                    }
                },
                {
                    opcode: 'colorMatch',
                    blockType: BlockType.BOOLEAN,
                    text: '[SENCOL] is [COLOR]?',
                    arguments: {
                        SENCOL: {
                            type: ArgumentType.STRING,
                            defaultValue: '#FFFFFF',
                        },
                        COLOR: {
                            type: ArgumentType.STRING,
                            defaultValue: '0',
                            menu: '#colorList'
                        },
                    },
                    func: 'colormatchHEX',
                    gen: {
                        arduino: this.colormatchHEXGen //colormatchGen
                    }
                },
                {
                    opcode: 'hex2rgb',
                    blockType: BlockType.REPORTER,
                    text: '[SENCOL] (hex color) to [RGB] of RGB',
                    arguments: {
                        SENCOL: {
                            type: ArgumentType.STRING,
                            defaultValue: '#FFFFFF',
                        },
                        RGB: {
                            type: ArgumentType.STRING,
                            defaultValue: 0,
                            menu: 'rgb'
                        },
                    },
                    func: 'hex2rgb',
                    gen: {
                        arduino: this.hex2rgbGen
                    }
                },
                /*{
                    opcode: 'colorCal',
                    blockType: BlockType.COMMAND,
                    text: 'set [WB] balance for color sensor at port 3',
                    arguments: {
                        WB: {
                            type: ArgumentType.STRING,
                            defaultValue: 'bright',
                            menu: 'wb'
                        },
                    },
                    func: 'tcs34725cal',
                    gen: {
                        arduino: this.tcs34725calGen
                    }
                },*/
                {
                    opcode: 'tcsLight',
                    blockType: BlockType.COMMAND,
                    text: 'turn [ONOFF] the light',
                    arguments: {
                        ONOFF: {
                            type: ArgumentType.STRING,
                            defaultValue: 'ON',
                            menu: 'onoff'
                        },
                    },
                    func: 'tcs34725led',
                    gen: {
                        arduino: this.tcs34725ledGen
                    }
                },
                {
                    opcode: 'setIT',
                    blockType: BlockType.COMMAND,
                    text: 'set TCS34725_INTEGRATIONTIME to [IT]ms',
                    arguments: {
                        IT: {
                            type: ArgumentType.STRING,
                            defaultValue: 0xC0, // 154ms
                            menu: 'it'
                        },
                    },
                    func: 'tcs34725it',
                    gen: {
                        arduino: this.tcs34725itGen
                    }
                },
                {
                    opcode: 'setGain',
                    blockType: BlockType.COMMAND,
                    text: 'set TCS34725_GAIN to [GAIN]X',
                    arguments: {
                        GAIN: {
                            type: ArgumentType.STRING,
                            defaultValue: 0x03, // 60X
                            menu: 'gain'
                        },
                    },
                    func: 'tcs34725gain',
                    gen: {
                        arduino: this.tcs34725gainGen
                    }
                },
                '---',
                /*{
                    opcode: 'imuYPR',
                    blockType: BlockType.REPORTER,
                    text: 'IMU [IMU] reading at port 3',
                    arguments: {
                        IMU: {
                            type: ArgumentType.STRING,
                            defaultValue: 'yaw',
                            menu: 'ypr'
                        }
                    },
                    func: 'imuRead',
                    gen: {
                        arduino: this.imuReadGen
                    }
                },
                {
                    opcode: 'imuAcc',
                    blockType: BlockType.REPORTER,
                    text: 'IMU [IMU] reading at port 3',
                    arguments: {
                        IMU: {
                            type: ArgumentType.STRING,
                            defaultValue: 'ax',
                            menu: 'acc'
                        }
                    },
                    func: 'imuRead',
                    gen: {
                        arduino: this.imuReadGen
                    }
                },
                {
                    opcode: 'imuAV',
                    blockType: BlockType.REPORTER,
                    text: 'IMU [IMU] reading at port 3',
                    arguments: {
                        IMU: {
                            type: ArgumentType.STRING,
                            defaultValue: 'gx',
                            menu: 'av'
                        }
                    },
                    func: 'imuRead',
                    gen: {
                        arduino: this.imuReadGen
                    }
                },
                '---',*/
                {
                    func: 'noop',
                    blockType: BlockType.DIVLABEL,
                    text: 'line follow'
                },
                {
                    opcode: '2tracers',
                    blockType: BlockType.BOOLEAN,
                    text: 'tracers status at port [PA] is [PAT]?',
                    arguments: {
                        PAT: {
                            type: ArgumentType.STRING,
                            defaultValue: 0b00,
                            menu: 'pat2'
                        },
                        PA: {
                            type: ArgumentType.STRING,
                            defaultValue: '8',
                            menu: 'dPort'
                        }
                    },
                    func: 'tracers2',
                    gen: {
                        arduino: this.tracers2Gen
                    }
                },
                {
                    opcode: '2tracersArray',
                    blockType: BlockType.REPORTER,
                    text: 'tracers reading at port [PA] (binary)',
                    arguments: {
                        PA: {
                            type: ArgumentType.STRING,
                            defaultValue: '8',
                            menu: 'dPort'
                        }
                    },
                    func: 'tracers2array',
                    gen: {
                        arduino: this.tracers2arrayGen
                    }
                },
                {
                    opcode: '2tracersMatch',
                    blockType: BlockType.BOOLEAN,
                    text: '[SENREAD] is [PAT]?',
                    arguments: {
                        SENREAD: {
                            type: ArgumentType.STRING,
                            defaultValue: 0b00,
                        },
                        PAT: {
                            type: ArgumentType.STRING,
                            defaultValue: 0b00,
                            menu: 'pat2'
                        }
                    },
                    func: 'tracers_match',
                    gen: {
                        arduino: this.tracers_matchGen
                    }
                },
                '---',
                {
                    opcode: '3tracers',
                    blockType: BlockType.BOOLEAN,
                    text: 'tracers status at port [PA] is [PAT]?',
                    arguments: {
                        PAT: {
                            type: ArgumentType.STRING,
                            defaultValue: 0b010,
                            menu: 'pat3'
                        },
                        PA: {
                            type: ArgumentType.STRING,
                            defaultValue: '6',
                            menu: 'dPort3'
                        }
                    },
                    func: 'tracers3',
                    gen: {
                        arduino: this.tracers3Gen
                    }
                },
                {
                    opcode: '3tracersArray',
                    blockType: BlockType.REPORTER,
                    text: 'tracers reading at port [PA] (binary)',
                    arguments: {
                        PA: {
                            type: ArgumentType.STRING,
                            defaultValue: '6',
                            menu: 'dPort3'
                        }
                    },
                    func: 'tracers3array',
                    gen: {
                        arduino: this.tracers3arrayGen
                    }
                },
                {
                    opcode: '3tracersMatch',
                    blockType: BlockType.BOOLEAN,
                    text: '[SENREAD] is [PAT]?',
                    arguments: {
                        SENREAD: {
                            type: ArgumentType.STRING,
                            defaultValue: 0b010,
                        },
                        PAT: {
                            type: ArgumentType.STRING,
                            defaultValue: 0b010,
                            menu: 'pat3'
                        }
                    },
                    func: 'tracers_match',
                    gen: {
                        arduino: this.tracers_matchGen
                    }
                },
                '---',
                {
                    opcode: '4tracers',
                    blockType: BlockType.BOOLEAN,
                    text: 'tracers status at port [PA]+[PB] is [PAT]?',
                    arguments: {
                        PAT: {
                            type: ArgumentType.STRING,
                            defaultValue: 0b0110,
                            menu: 'pat4'
                        },
                        PA: {
                            type: ArgumentType.STRING,
                            defaultValue: '3',
                            menu: 'dPort'
                        },
                        PB: {
                            type: ArgumentType.STRING,
                            defaultValue: '5',
                            menu: 'dPort'
                        }
                    },
                    func: 'tracers4',
                    gen: {
                        arduino: this.tracers4Gen
                    }
                },
                {
                    opcode: '4tracersArray',
                    blockType: BlockType.REPORTER,
                    text: 'tracers reading at port [PA]+[PB] (binary)',
                    arguments: {
                        PA: {
                            type: ArgumentType.STRING,
                            defaultValue: '3',
                            menu: 'dPort'
                        },
                        PB: {
                            type: ArgumentType.STRING,
                            defaultValue: '5',
                            menu: 'dPort'
                        }
                    },
                    func: 'tracers4array',
                    gen: {
                        arduino: this.tracers4arrayGen
                    }
                },
                {
                    opcode: '4tracersMatch',
                    blockType: BlockType.BOOLEAN,
                    text: '[SENREAD] is [PAT]?',
                    arguments: {
                        SENREAD: {
                            type: ArgumentType.STRING,
                            defaultValue: 0b0110,
                        },
                        PAT: {
                            type: ArgumentType.STRING,
                            defaultValue: 0b0110,
                            menu: 'pat4'
                        }
                    },
                    func: 'tracers_match',
                    gen: {
                        arduino: this.tracers_matchGen
                    }
                },
                '---',
                {
                    opcode: 'qtrSet',
                    blockType: BlockType.COMMAND,
                    text: 'set QTR-[TYPE] at port [PA]+[PB]+[PC]+[PD] has [CNT] sensors',
                    arguments: {
                        TYPE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'RC',
                            menu: 'qtr_type'
                        },
                        PA: {
                            type: ArgumentType.STRING,
                            defaultValue: '3',
                            menu: 'dPort'
                        },
                        PB: {
                            type: ArgumentType.STRING,
                            defaultValue: '5',
                            menu: 'dPort'
                        },
                        PC: {
                            type: ArgumentType.STRING,
                            defaultValue: '8',
                            menu: 'dPort'
                        },
                        PD: {
                            type: ArgumentType.STRING,
                            defaultValue: '2',
                            menu: 'dPort'
                        },
                        CNT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                    },
                    func: 'noop',//'qtrset',
                    gen: {
                        arduino: this.qtrsetGen
                    }
                },
                {
                    opcode: 'qtrCal',
                    blockType: BlockType.COMMAND,
                    text: 'calibrate QTR- line sensor',
                    func: 'noop',//'qtrcal',
                    gen: {
                        arduino: this.qtrcalGen
                    }
                },
                {
                    opcode: 'qtrRead',
                    blockType: BlockType.REPORTER,
                    text: '[WB] line reading (x1000)',
                    arguments: {
                        WB: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Black',
                            menu: 'lcolor'
                        }
                    },
                    func: 'noop',//'qtread',
                    gen: {
                        arduino: this.qtreadlineGen
                    }
                },
                {
                    opcode: 'qtrReadRaw',
                    blockType: BlockType.COMMAND,
                    text: 'read the raw data of line sensors',
                    func: 'noop',
                    gen: {
                        arduino: this.qtreadrawGen
                    }
                },
                {
                    opcode: 'qtrReadCal',
                    blockType: BlockType.COMMAND,
                    text: 'read the calibrated data of line sensors',
                    func: 'noop',
                    gen: {
                        arduino: this.qtreadcalGen
                    }
                },
                {
                    opcode: 'qtrRaw',
                    blockType: BlockType.REPORTER,
                    text: 'the raw data of the [I] IR sensor',
                    arguments: {
                        I: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1,
                        }
                    },
                    func: 'noop',
                    gen: {
                        arduino: this.qtrawGen
                    }
                },

                /*
                                {
                                    opcode: 'ds18b20Setup',
                                    blockType: BlockType.COMMAND,
                
                                    text: formatMessage({
                                        id: 'sensors.ds18b20Setup',
                                        default: 'Setup 18B20 Pin [PIN]'
                                    }),
                                    arguments: {
                                        PIN: {
                                            type: ArgumentType.STRING,
                                            defaultValue: '4',
                                            menu: 'digiPin'
                                        }
                                    },
                                    func: 'ds18b20Setup',
                                    gen: {
                                        arduino: this.ds18b20SetupGen
                                    }
                                },
                                {
                                    opcode: 'ds18b20Read',
                                    blockType: BlockType.COMMAND,
                
                                    text: formatMessage({
                                        id: 'sensors.ds18b20Read',
                                        default: '18B20 Read'
                                    }),
                                    func: 'ds18b20Read',
                                    gen: {
                                        arduino: this.ds18b20ReadGen
                                    }
                                },
                                {
                                    opcode: 'ds18b20',
                                    blockType: BlockType.REPORTER,
                
                                    text: formatMessage({
                                        id: 'sensors.ds18b20',
                                        default: '18B20 Temperature [INDEX]'
                                    }),
                                    arguments: {
                                        INDEX: {
                                            type: ArgumentType.NUMBER,
                                            defaultValue: 0
                                        }
                                    },
                                    func: 'ds18b20',
                                    gen: {
                                        arduino: this.ds18b20Gen
                                    }
                                },
                                '---',
                
                                {
                                    opcode: 'infraen',
                                    blockType: BlockType.COMMAND,
                                    text: formatMessage({
                                        id: 'sensors.infraen',
                                        default: 'Infra Enable Pin[RXPIN]'
                                    }),
                                    func: 'noop',
                                    arguments: {
                                        RXPIN: {
                                            type: ArgumentType.STRING,
                                            defaultValue: '2',
                                            menu: 'dPort'
                                        }
                                    },
                                    gen: {
                                        arduino: this.infraenGen
                                    }
                                },
                                {
                                    opcode: 'infraloop',
                                    blockType: BlockType.CONDITIONAL,
                                    text: formatMessage({
                                        id: 'sensors.infraloop',
                                        default: 'Infra Read Loop'
                                    }),
                                    func: 'noop',
                                    gen: {
                                        arduino: this.infraloopGen
                                    }
                                },
                                {
                                    opcode: 'infraresult',
                                    blockType: BlockType.REPORTER,
                                    text: formatMessage({
                                        id: 'sensors.infradata',
                                        default: 'Infra Result'
                                    }),
                                    func: 'noop',
                                    gen: {
                                        arduino: this.infraresultGen
                                    }
                                },
                                {
                                    opcode: 'infrasend',
                                    blockType: BlockType.COMMAND,
                                    text: formatMessage({
                                        id: 'sensors.infrasend',
                                        default: 'Infra Send [DATA]'
                                    }),
                                    arguments: {
                                        DATA: {
                                            type: ArgumentType.STRING,
                                            defaultValue: 'abcd'
                                        }
                                    },
                                    func: 'noop',
                                    gen: {
                                        arduino: this.infrasend
                                    }
                                }*/
            ],

            menus: {
                /*'#analogList': [
                    {src: 'static/extension-assets/arduino/SoundSensor.png',
                        value: 'Sound', width: 128, height: 128, alt: 'Sound'},
                    {src: 'static/extension-assets/arduino/LightSensor.png',
                        value: 'Light', width: 128, height: 128, alt: 'Light'},
                    {src: 'static/extension-assets/arduino/Potential.png',
                        value: 'Potential', width: 128, height: 128, alt: 'Potential'},
                    {src: 'static/extension-assets/arduino/SoilSensor.png',
                        value: 'Soil', width: 128, height: 128, alt: 'Soil'},
                    {src: 'static/extension-assets/arduino/RainDrop.png',
                        value: 'RainDrop', width: 128, height: 128, alt: 'RainDrop'},
                    {src: 'static/extension-assets/arduino/FlameSensor.png',
                        value: 'Flame', width: 128, height: 128, alt: 'Flame'},
                    {src: 'static/extension-assets/arduino/GasSensor.png',
                        value: 'Smoke', width: 128, height: 128, alt: 'Smoke'},
                    {src: 'static/extension-assets/arduino/SlidePotential.png',
                        value: 'SlidePotential', width: 128, height: 128, alt: 'SlidePotential'},
                ],*/
                /*'#digiList': [
                    {src: 'static/extension-assets/Robot4FUN-cBrain-assets/rir.png',
                        value: '0', width: 128, height: 128, alt: 'Reflective IR'},
                    {src: 'static/extension-assets/arduino/linefollow_1x.png',
                        value: '1', width: 128, height: 128, alt: 'TRACER'},
                    {src: 'static/extension-assets/arduino/Touch.png',
                        value: 'TOUCH', width: 128, height: 128, alt: 'TOUCH'},
                    {src: 'static/extension-assets/arduino/SoilSensor.png',
                        value: 'Soil', width: 128, height: 128, alt: 'Soil'},
                    {src: 'static/extension-assets/arduino/FlameSensor.png',
                        value: 'Flame', width: 128, height: 128, alt: 'Flame'},
                    {src: 'static/extension-assets/arduino/GasSensor.png',
                        value: 'Smoke', width: 128, height: 128, alt: 'Smoke'},
                    {src: 'static/extension-assets/arduino/Button.png',
                        value: 'Button', width: 128, height: 128, alt: 'Button'},
                    {src: 'static/extension-assets/arduino/Bumper.png',
                        value: 'Bumper', width: 128, height: 128, alt: 'Bumper'},
                    {src: 'static/extension-assets/arduino/ViberateSensor.png',
                        value: 'Viberate', width: 128, height: 128, alt: 'Viberate'},
                ],*/
                digi: ['button', 'tilt', 'rir'],
                pat2: [ // block文字會反白
                    { text: '■■', value: 0b00 }, // 白白
                    { text: '□■', value: 0b10 }, // 黑白
                    { text: '■□', value: 0b01 }, // 白黑
                    { text: '□□', value: 0b11 }, // 黑黑
                ],
                pat3: [ // block文字會反白
                    { text: '■■■', value: 0b000 }, // 白白白
                    { text: '□■■', value: 0b100 }, // 黑白白
                    { text: '■□■', value: 0b010 }, // 白黑白
                    { text: '□□■', value: 0b110 }, // 黑黑白
                    { text: '■■□', value: 0b001 }, // 白白黑
                    { text: '□■□', value: 0b101 }, // 黑白黑
                    { text: '■□□', value: 0b011 }, // 白黑黑
                    { text: '□□□', value: 0b111 }, // 黑黑黑
                ],
                pat4: [ // block文字會反白
                    { text: '■■■■', value: 0b0000 }, // 白白白白
                    { text: '□■■■', value: 0b1000 }, // 黑白白白
                    { text: '■□■■', value: 0b0100 }, // 白黑白白
                    { text: '■■□■', value: 0b0010 }, // 白白黑白
                    { text: '■■■□', value: 0b0001 }, // 白白白黑
                    { text: '□□■■', value: 0b1100 }, // 黑黑白白
                    { text: '■□□■', value: 0b0110 }, // 白黑黑白
                    { text: '■■□□', value: 0b0011 }, // 白白黑黑
                    { text: '□■□■', value: 0b1010 }, // 黑白黑白
                    { text: '□■■□', value: 0b1001 }, // 黑白白黑
                    { text: '■□■□', value: 0b0101 }, // 白黑白黑
                    { text: '□□□■', value: 0b1110 }, // 黑黑黑白
                    { text: '□□■□', value: 0b1101 }, // 黑黑白黑
                    { text: '□■□□', value: 0b1011 }, // 黑白黑黑
                    { text: '■□□□', value: 0b0111 }, // 白黑黑黑
                    { text: '□□□□', value: 0b1111 }, // 黑黑黑黑
                ],
                lcolor: ['Black', 'White'],
                onoff: ['ON', 'OFF'],
                it: [
                    { text: '2.4', value: 0xFF },
                    { text: '24', value: 0xF6 },
                    { text: '50', value: 0xEB },
                    { text: '60', value: 0xE7 },
                    { text: '101', value: 0xD5 },
                    { text: '120', value: 0xCE },
                    { text: '154', value: 0xC0 },
                    { text: '180', value: 0xB5 },
                    { text: '199', value: 0xAD },
                    { text: '240', value: 0x9C },
                    { text: '300', value: 0x83 },
                    { text: '360', value: 0x6A },
                    { text: '401', value: 0x59 },
                    { text: '420', value: 0x51 },
                    { text: '480', value: 0x38 },
                    { text: '499', value: 0x30 },
                    { text: '540', value: 0x1F },
                    { text: '600', value: 0x06 },
                    { text: '614', value: 0x00 },
                ],
                gain: [
                    { text: '1', value: 0x00 },
                    { text: '4', value: 0x01 },
                    { text: '16', value: 0x02 },
                    { text: '60', value: 0x03 },
                ],
                rgb: [
                    { text: 'R', value: 0 },
                    { text: 'G', value: 1 },
                    { text: 'B', value: 2 },
                ],
                qtr_type: ['RC', 'Analog'],
                dht11function: ['temperature', 'humidity'],
                /*aButton: ['1','2','3','4','5','6','7','8'],
                aPort: [
                  {text: '1', value: board._port.p1[2]},
                  {text: '2', value: board._port.p2[2]},
                  {text: '3', value: board._port.p3[2]},
                  //{text: '4', value: board._port.p4[2]}
                ],*/
                dPort: ['1', '2', '3', '5', '6', '7', '8'],
                dPort3: ['5', '6', '7', '8'],
                aPort: ['2', '3'],
                aPort2: ['3'],
                aPin: [
                    { text: 'A', value: 1 },
                    { text: 'B', value: 2 },
                ],
                '#colorList': [
                    {
                        src: 'static/extension-assets/Robot4FUN-cBrain-assets/black.png',
                        value: '0', width: 95, height: 95, alt: ''
                    },
                    {
                        src: 'static/extension-assets/Robot4FUN-cBrain-assets/white.png',
                        value: '1', width: 95, height: 95, alt: ''
                    },
                    {
                        src: 'static/extension-assets/Robot4FUN-cBrain-assets/red.png',
                        value: '2', width: 95, height: 95, alt: ''
                    },
                    {
                        src: 'static/extension-assets/Robot4FUN-cBrain-assets/green.png',
                        value: '3', width: 95, height: 95, alt: ''
                    },
                    {
                        src: 'static/extension-assets/Robot4FUN-cBrain-assets/blue.png',
                        value: '4', width: 95, height: 95, alt: ''
                    },
                    {
                        src: 'static/extension-assets/Robot4FUN-cBrain-assets/yellow.png',
                        value: '5', width: 95, height: 95, alt: ''
                    },
                    {
                        src: 'static/extension-assets/Robot4FUN-cBrain-assets/orange.png',
                        value: '6', width: 95, height: 95, alt: ''
                    },
                    {
                        src: 'static/extension-assets/Robot4FUN-cBrain-assets/purple.png',
                        value: '7', width: 95, height: 95, alt: ''
                    },
                    {
                        src: 'static/extension-assets/Robot4FUN-cBrain-assets/cyan.png',
                        value: '8', width: 95, height: 95, alt: ''
                    },
                    {
                        src: 'static/extension-assets/Robot4FUN-cBrain-assets/brown.png',
                        value: '9', width: 95, height: 95, alt: ''
                    },
                ],
                wb: ['dark', 'bright'],
                light: ['reflected', 'ambient'],
                ypr: ['pitch', 'roll', 'yaw'],
                acc: ['ax', 'ay', 'az'],
                av: ['gx', 'gy', 'gz'],
                imumenu: ['ax', 'ay', 'az', 'pitch', 'roll', 'yaw', 'gx', 'gy', 'gz'],
            },

            translation_map: {
                'zh-tw': {
                    'sensorAnalog': '接口[PIN]的類比感應器讀值 (0~1023)',
                    'sensorAnalog2': '接口[PORT][PIN]的類比感應器讀值 (0~1023)',
                    'sensorDigit': '接口[PIN]的[SENSOR]被觸發？',
                    'sensorDigit2': '接口[PIN]的數位感應器讀值 (0/1)',
                    '2tracers': '接口[PA]的2眼循線感應器讀值是[PAT]？',
                    '2tracersArray': '接口[PA]的2眼循線感應器讀值 (二進制)',
                    '2tracersMatch': '[SENREAD]是[PAT]？',
                    '3tracers': '接口[PA]的3眼循線感應器讀值是[PAT]？',
                    '3tracersArray': '接口[PA]的3眼循線感應器讀值 (二進制)',
                    '3tracersMatch': '[SENREAD]是[PAT]？',
                    '4tracers': '接口[PA]+[PB]的4眼循線感應器讀值是[PAT]？',
                    '4tracersArray': '接口[PA]+[PB]的4眼循線感應器讀值 (二進制)',
                    '4tracersMatch': '[SENREAD]是[PAT]？',
                    'qtrSet': '接口[PA]+[PB]+[PC]+[PD]的QTR-[TYPE]循線感應器共[CNT]眼',
                    'qtrCal': '校正QTR循線感應器',
                    'qtrRead': '[WB]線位置(x1000)',
                    'qtrReadRaw': '讀取循線感應器數據',
                    'qtrReadCal': '讀取循線感應器校正後數據',
                    'qtrRaw': '第[I]個循線感應器的讀值',
                    'rir': '接口[PIN]的反射式紅外線感應器被觸發？',
                    'tilt': '接口[PIN]的傾斜開關被觸發？',
                    'analogKeypad': '接口[PIN]的鍵盤 按下按鈕[BUT]?',
                    'ultrasonic': '接口[PIN]的超音波感應器距離讀值 (公厘)',
                    'colorSensor': '接口 3 的顏色感應器顏色讀值 (hex)',
                    'colorMatch': '[SENCOL]是[COLOR]?',
                    'hex2rgb': '[SENCOL] (hex顏色) 的 [RGB]量',
                    'getLux': '接口 3 的顏色感應器[LIGHT]照度讀值 (lux)',
                    'colorCal': '校正接口 3 的顏色感應器[WB]平衡',
                    'tcsLight': '[ONOFF] LED 燈',
                    'setIT': '設定曝光時間為[IT]毫秒',
                    'setGain': '設定感光度為[GAIN]倍',
                    'dht': '接口[PIN]的溫溼度感應器[FUNC]讀值',
                    'imuYPR': '接口 3 的姿態感應器[IMU]角度(°)',
                    'imuAcc': '接口 3 的姿態感應器[IMU]讀值',
                    'imuAV': '接口 3 的姿態感應器[IMU]讀值',
                    //'rgb': {'R':'紅','G':'綠','B':'藍'},
                    'digi': { 'button': '按鈕', 'tilt': '傾斜開關', 'rir': '紅外線感應器' },
                    'dht11function': { 'temperature': '溫度(°C)', 'humidity': '濕度(%)' },
                    'wb': { 'dark': '黑', 'bright': '白' },
                    'qtr_type': { 'RC': '數位', 'Analog': '類比' },
                    'lcolor': { 'Black': '黑', 'White': '白' },
                    'light': { 'reflected': '反射光', 'ambient': '環境光' },
                    'onoff': { 'ON': '打開', 'OFF': '關閉' },
                    'ypr': { 'pitch': '俯仰', 'roll': '橫滾', 'yaw': '偏航' },
                    'acc': { 'ax': '加速度x軸分量', 'ay': '加速度y軸分量', 'az': '加速度z軸分量' },
                    'av': { 'gx': '角速度x軸分量', 'gy': '角速度y軸分量', 'gz': '角速度z軸分量' },
                },
                'zh-cn': {
                    'sensorAnalog': '端口[PIN]的模拟传感器读数 (0~1023)',
                    'sensorAnalog2': '端口[PORT][PIN]的模拟传感器读数 (0~1023)',
                    'sensorDigit': '端口[PIN]的[SENSOR]被触发？',
                    'sensorDigit2': '端口[PIN]的数字传感器读数 (0/1)',
                    '2tracers': '端口[PA]的2路循迹传感器读值是[PAT]？',
                    '2tracersArray': '端口[PA]的2路循迹传感器读值 (二进制)',
                    '2tracersMatch': '[SENREAD]是[PAT]？',
                    '3tracers': '端口[PA]的3路循迹传感器读值是[PAT]？ ',
                    '3tracersArray': '端口[PA]的3路循迹传感器读值 (二进制)',
                    '3tracersMatch': '[SENREAD]是[PAT]？',
                    '4tracers': '端口[PA]+[PB]的4路循迹传感器读值是[PAT]？',
                    '4tracersArray': '端口[PA]+[PB]的4路循迹传感器读值 (二进制)',
                    '4tracersMatch': '[SENREAD]是[PAT]？',
                    'qtrSet': '端口[PA]+[PB]+[PC]+[PD]的QTR-[TYPE]循迹传感器共[CNT]路',
                    'qtrCal': '校正QTR循迹传感器',
                    'qtrRead': '[WB]线位置(x1000)',
                    'qtrReadRaw': '读循迹传感器读数',
                    'qtrReadCal': '读循迹传感器校正读数',
                    'qtrRaw': '第[I]个循迹传感器读数',
                    'rir': '端口[PIN]的反射式红外传感器被触发？ ',
                    'tilt': '端口[PIN]的倾斜传感器被触发？',
                    'analogKeypad': '端口[PIN]的键盘 按下按钮[BUT]?',
                    'ultrasonic': '端口[PIN]的超声音传感器距离读数 (毫米)',
                    'colorSensor': '端口 3 的颜色传感器颜色读数 (hex)',
                    'colorMatch': '[SENCOL]是[COLOR]?',
                    'hex2rgb': '[SENCOL] (hex颜色) 的 [RGB]量',
                    'getLux': '端口 3 的颜色传感器[LIGHT]照度读数 (lux)',
                    'colorCal': '校正端口 3 的颜色传感器[WB]平衡',
                    'tcsLight': '[ONOFF] LED 灯',
                    'setIT': '设定曝光时间为[IT]毫秒',
                    'setGain': '设定感光度为[GAIN]倍',
                    'dht': '端口[PIN]的温湿度传感器[FUNC]读值',
                    'imuYPR': '端口 3 的姿态传感器[IMU]角度(°)',
                    'imuAcc': '端口 3 的姿态传感器[IMU]读值',
                    'imuAV': '端口 3 的姿态传感器[IMU]读值',
                    'digi': { 'button': '按钮', 'tilt': '倾斜开关', 'rir': '红外传感器' },
                    'dht11function': { 'temperature': '温度(°C)', 'humidity': '湿度(%)' },
                    'wb': { 'dark': '黑', 'bright': '白' },
                    'light': { 'reflected': '反射光', 'ambient': '环境光' },
                    'qtr_type': { 'RC': '数字', 'Analog': '模拟' },
                    'lcolor': { 'Black': '黑', 'White': '白' },
                    'onoff': { 'ON': '打开', 'OFF': '关闭' },
                    //'rgb': {'R':'红','G':'绿','B':'蓝'},
                    'ypr': { 'pitch': '俯仰', 'roll': '橫滚', 'yaw': '航向' },
                    'acc': { 'ax': '加速度x轴分量', 'ay': '加速度y轴分量', 'az': '加速度z轴分量' },
                    'av': { 'gx': '角速度x轴分量', 'gy': '角速度y轴分量', 'gz': '角速度z轴分量' },
                }
            }

        };
    }

    noop() {
        return Promise.reject(formatMessage({
            id: 'kblock.notify.nosupportonlinemode',
            defaultMessage: 'Not support in online mode'
        }));
    }
    /*
    analogKeypad (args){
        let keypad = new five.Keypad({
          pin: args.PIN, //in johnny-five.js, analogPin with 'A'
          length: 8 // button number
        });
        keypad.on("change", function(event) {
            return event.which == args.BUT;
        });

        return new Promise(resolve => {
            board.analogRead(pin, ret => {
                board.reportAnalogPin(pin, 0);
                resolve(ret);
            })
        });
    }

    analogKeypadGen (gen, block){
        gen.definitions_['whichkey'] = `
int whichkey(int sensorValue) {
        int keyValue = 0;
        //Serial.println(sensorValue);
        //switch(sensorValue)
        if(sensorValue<930 && sensorValue>880)
          keyValue=1;
        else if(sensorValue<820 && sensorValue>780)
          keyValue=2;
        else if(sensorValue<700 && sensorValue>660)
          keyValue=3;
        else if(sensorValue<590 && sensorValue>550)
          keyValue=4;
        else if(sensorValue<470 && sensorValue>430)
          keyValue=5;
        else if(sensorValue<360 && sensorValue>320)
          keyValue=6;
        else if(sensorValue<240 && sensorValue>200)
          keyValue=7;
        else if(sensorValue<130 && sensorValue>90)
          keyValue=8;
        else keyValue=0;
        //Serial.print("KeyPress is = AD Key " );
        return keyValue;
 }`;
        const pin = gen.valueToCode(block, 'PIN');
        const s = gen.valueToCode(block, 'BUT');
        gen.setupCodes_['keypad'+pin] = `pinMode(${pin},INPUT)`;

        return [`whichkey(analogRead(${pin}))==${s}`, gen.ORDER_ATOMIC];
    }*/

    sensorAnalog(args) {
        const port = parseInt(args.PORT);
        let pin = parseInt(args.PIN);
        if (port) {
            pin = board.pin2firmata(board._port[port - 1][pin], 1);
        } else {
            pin = board.pin2firmata(board._port[pin - 1][2], 1);
        } // 1: in firmata.js, analogPin with no "A"

        if (board.pins[board.analogPins[pin]].mode != board.MODES.ANALOG) {
            //in Firmata.js, all analog pins are set to board.MODES.ANALOG (analog input) by default.
            board.pinMode(board.analogPins[pin], board.MODES.ANALOG);
            //console.log('pin2firmata=',pin); //for debug
            //console.log('pin=',board.analogPins[pin]); //for debug
            //console.log('mode=',board.pins[board.analogPins[pin]].mode); //for debug
        }
        return new Promise(resolve => {
            board.analogRead(pin, ret => {    //firmata will report data every 19 ms unless the sampling interval is changed.
                board.reportAnalogPin(pin, 0);//stop reporting analog value because need it just once
                resolve(ret);
            })
        });
    }

    sensorAnalogGen(gen, block) {
        const port = gen.valueToCode(block, 'PORT');
        let pin = gen.valueToCode(block, 'PIN');
        if (port) {
            pin = board._port[port - 1][pin];
        } else {
            pin = board._port[pin - 1][2];
        }
        /*      gen.definitions_['analog_raw'] = `
        uint16_t analogRaw(){
        
        }
        `;*/
        gen.setupCodes_['aSensor' + pin] = `pinMode(${pin},INPUT)`;
        return [`analogRead(${pin})`, gen.ORDER_ATOMIC];
        //return [`analogRaw(${pin})`, gen.ORDER_ATOMIC];
    }

    /*    rir (args){
            const pin = board.pin2firmata(board._port[parseInt(args.PIN)-1][2]);
            if (board.pins[pin].mode != board.MODES.INPUT ){
                board.pinMode(pin, board.MODES.INPUT);
            }
            if (board.eventNames().indexOf(`digital-read-${pin}`) === -1){ // just call once
                board.digitalRead(pin, value => {   //只要call一次,即使沒執行此block仍會一直回報..
                });
            }
    
            return board.pins[pin].value? 0:1;//RIR is normal on
        }
    
        rirGen (gen, block){
            const pin = board.pin2firmata(board._port[gen.valueToCode(block,'PIN')-1][2]);
            gen.setupCodes_['sensor'+pin] = `pinMode(${pin},INPUT)`;
            return [`!digitalRead(${pin})`, gen.ORDER_ATOMIC]; //RIR is normal on
        }
        */
    sensorDigit(args) {
        //const pin = board.pin2firmata(args.PIN);
        const pin = board.pin2firmata(board._port[parseInt(args.PIN) - 1][2]);
        if (board.pins[pin].mode != board.MODES.INPUT) {
            //vm.emit('showAlert', {msg: 'Wrong PinMode defined'});
            board.pinMode(pin, board.MODES.INPUT);
            //in firmata.js, All digital pins are set to board.MODES.OUTPUT by default
        }
        /*return new Promise(resolve => {   // 會卡住block till pin mode changes
            board.digitalRead(pin, ret => {     //only report data when it changes.所以會有時間差
                board.reportDigitalPin(pin, 0); //stop reporting value because need it just once
                resolve(ret);
            });
        });*/

        if (board.eventNames().indexOf(`digital-read-${pin}`) === -1) { // just call once
            board.digitalRead(pin, value => {   //只要call一次,即使沒執行此block仍會一直回報..
                //console.log('pin value=', value); // let the data being fresh
            });
        }
        if (args.SENSOR && args.SENSOR == 'rir') {
            return board.pins[pin].value ? 0 : 1;//RIR is normal HIGH
        } else {
            return board.pins[pin].value;
        }
    }

    sensorDigiGen(gen, block) {
        //const pin = board.pin2firmata(gen.valueToCode(block, 'PIN'));
        const pin = board.pin2firmata(board._port[gen.valueToCode(block, 'PIN') - 1][2]);
        const sen = gen.valueToCode(block, 'SENSOR');
        console.log('sen=', typeof sen, sen);
        gen.setupCodes_['sensor' + pin] = `pinMode(${pin},INPUT)`;

        if (sen && sen == 'rir') {
            return [`!digitalRead(${pin})`, gen.ORDER_ATOMIC]; //RIR is normal on
        } else {
            return [`digitalRead(${pin})`, gen.ORDER_ATOMIC];
        }
    }

    tracers2(args) {
        let se_rir = [];
        const pin1 = board.pin2firmata(board._port[parseInt(args.PA) - 1][1]);
        const pin2 = board.pin2firmata(board._port[parseInt(args.PA) - 1][2]);

        if (board.pins[pin1].mode != board.MODES.INPUT) {
            board.pinMode(pin1, board.MODES.INPUT);
        }
        if (board.pins[pin2].mode != board.MODES.INPUT) {
            board.pinMode(pin2, board.MODES.INPUT);
        }

        if (board.eventNames().indexOf(`digital-read-${pin1}`) === -1) { // just call once
            board.digitalRead(pin1, value => { });
        }
        if (board.eventNames().indexOf(`digital-read-${pin2}`) === -1) { // just call once
            board.digitalRead(pin2, value => { });
        }
        // RIR HIGH: white line; LOW: black line
        se_rir[0] = board.pins[pin1].value;//? 0:1;
        se_rir[1] = board.pins[pin2].value;//? 0:1;
        // convert to HIGH: black line; LOW: white line

        switch (args.PAT) {
            case 0b11:
                return (se_rir[0] && se_rir[1]);
                break;
            case 0b01:
                return (!se_rir[0] && se_rir[1]);
                break;
            case 0b10:
                return (se_rir[0] && !se_rir[1]);
                break;
            case 0b00:
                return (!se_rir[0] && !se_rir[1]);
                break;
        }
    }

    tracers2Gen(gen, block) {
        const pin1 = board.pin2firmata(board._port[gen.valueToCode(block, 'PA') - 1][1]);
        const pin2 = board.pin2firmata(board._port[gen.valueToCode(block, 'PA') - 1][2]);
        const pat = gen.valueToCode(block, 'PAT');
        gen.setupCodes_['sensor' + pin1] = `pinMode(${pin1},INPUT)`;
        gen.setupCodes_['sensor' + pin2] = `pinMode(${pin2},INPUT)`;

        switch (pat) { // RIR HIGH: white line; LOW: black line
            case '0b00': // 0: white line, 1: black line
                return [`(!digitalRead(${pin1}) && !digitalRead(${pin2}))`, gen.ORDER_ATOMIC];
                break;
            case '0b10':
                return [`(digitalRead(${pin1}) && !digitalRead(${pin2}))`, gen.ORDER_ATOMIC];
                break;
            case '0b01':
                return [`(!digitalRead(${pin1}) && digitalRead(${pin2}))`, gen.ORDER_ATOMIC];
                break;
            case '0b11':
                return [`(digitalRead(${pin1}) && digitalRead(${pin2}))`, gen.ORDER_ATOMIC];
                break;
        }
    }

    tracers2array(args) {
        let se_rir = [];
        const pin1 = board.pin2firmata(board._port[parseInt(args.PA) - 1][1]);
        const pin2 = board.pin2firmata(board._port[parseInt(args.PA) - 1][2]);

        if (board.pins[pin1].mode != board.MODES.INPUT) {
            board.pinMode(pin1, board.MODES.INPUT);
        }
        if (board.pins[pin2].mode != board.MODES.INPUT) {
            board.pinMode(pin2, board.MODES.INPUT);
        }

        if (board.eventNames().indexOf(`digital-read-${pin1}`) === -1) { // just call once
            board.digitalRead(pin1, value => { });
        }
        if (board.eventNames().indexOf(`digital-read-${pin2}`) === -1) { // just call once
            board.digitalRead(pin2, value => { });
        }

        se_rir[0] = board.pins[pin1].value;//? 0:1;
        se_rir[1] = board.pins[pin2].value;//? 0:1;
        // convert to HIGH: black line; LOW: white line
        return (se_rir[0] << 1 | se_rir[1]);
    }

    tracers2arrayGen(gen, block) {
        const pin1 = board.pin2firmata(board._port[gen.valueToCode(block, 'PA') - 1][1]);
        const pin2 = board.pin2firmata(board._port[gen.valueToCode(block, 'PA') - 1][2]);
        gen.definitions_['readline2sens'] = `
uint8_t readline2sens(uint8_t p1, uint8_t p2) {
  uint8_t se_rir[2];

  // make sensor line an output (drives low briefly, but doesn't matter)
  pinMode(p1, OUTPUT);
  pinMode(p2, OUTPUT);
  // drive sensor line high
  digitalWrite(p1, HIGH);
  digitalWrite(p2, HIGH);

  delayMicroseconds(10); // charge lines for 10 us

  // disable interrupts so we can switch all the pins as close to the same
  // time as possible
  noInterrupts();

  // make sensor line an input (should also ensure pull-up is disabled)
  pinMode(p1, INPUT);
  pinMode(p2, INPUT);
  // convert to -> HIGH: black line; LOW: white line;
  se_rir[0] = digitalRead(p1);
  se_rir[1] = digitalRead(p2);

  interrupts(); // re-enable

  return (se_rir[0] << 1 | se_rir[1]);
  // example: 0b01
}
`;
        return [`readline2sens(${pin1}, ${pin2})`, gen.ORDER_ATOMIC];

    }

    tracers3(args) {
        const pin1 = board.pin2firmata(board._port[parseInt(args.PA) - 1][0]);
        const pin2 = board.pin2firmata(board._port[parseInt(args.PA) - 1][1]);
        const pin3 = board.pin2firmata(board._port[parseInt(args.PA) - 1][2]);
        let se_rir = [];

        if (board.pins[pin1].mode != board.MODES.INPUT) {
            board.pinMode(pin1, board.MODES.INPUT);
        }
        if (board.pins[pin2].mode != board.MODES.INPUT) {
            board.pinMode(pin2, board.MODES.INPUT);
        }
        if (board.pins[pin3].mode != board.MODES.INPUT) {
            board.pinMode(pin3, board.MODES.INPUT);
        }

        if (board.eventNames().indexOf(`digital-read-${pin1}`) === -1) { // just call once
            board.digitalRead(pin1, value => { });
        }
        if (board.eventNames().indexOf(`digital-read-${pin2}`) === -1) { // just call once
            board.digitalRead(pin2, value => { });
        }
        if (board.eventNames().indexOf(`digital-read-${pin3}`) === -1) { // just call once
            board.digitalRead(pin3, value => { });
        }
        se_rir[0] = board.pins[pin1].value;//? 0:1;
        se_rir[1] = board.pins[pin2].value;//? 0:1;
        se_rir[2] = board.pins[pin3].value;//? 0:1;
        // convert to -> HIGH: black line; LOW: white line

        switch (args.PAT) {
            case 0b000:
                return (!se_rir[0] && !se_rir[1] && !se_rir[2]);
                break;
            case 0b100:
                return (se_rir[0] && !se_rir[1] && !se_rir[2]);
                break;
            case 0b010:
                return (!se_rir[0] && se_rir[1] && !se_rir[2]);
                break;
            case 0b110:
                return (se_rir[0] && se_rir[1] && !se_rir[2]);
                break;
            case 0b001:
                return (!se_rir[0] && !se_rir[1] && se_rir[2]);
                break;
            case 0b101:
                return (se_rir[0] && !se_rir[1] && se_rir[2]);
                break;
            case 0b011:
                return (!se_rir[0] && se_rir[1] && se_rir[2]);
                break;
            case 0b111:
                return (se_rir[0] && se_rir[1] && se_rir[2]);
                break;
        }
    }

    tracers3Gen(gen, block) {
        const pinA = board.pin2firmata(board._port[gen.valueToCode(block, 'PA') - 1][0]);
        const pinB = board.pin2firmata(board._port[gen.valueToCode(block, 'PA') - 1][1]);
        const pinC = board.pin2firmata(board._port[gen.valueToCode(block, 'PA') - 1][2]);
        const pat = gen.valueToCode(block, 'PAT');
        gen.setupCodes_['sensor' + pinA] = `pinMode(${pinA},INPUT)`;
        gen.setupCodes_['sensor' + pinB] = `pinMode(${pinB},INPUT)`;
        gen.setupCodes_['sensor' + pinC] = `pinMode(${pinC},INPUT)`;
        // convert to -> HIGH: black line; LOW: white line;
        switch (pat) {
            case '0b000':
                return [`(!digitalRead(${pinA}) && !digitalRead(${pinB}) && !digitalRead(${pinC}))`, gen.ORDER_ATOMIC];
                break;
            case '0b100':
                return [`(digitalRead(${pinA}) && !digitalRead(${pinB}) && !digitalRead(${pinC}))`, gen.ORDER_ATOMIC];
                break;
            case '0b010':
                return [`(!digitalRead(${pinA}) && digitalRead(${pinB}) && !digitalRead(${pinC}))`, gen.ORDER_ATOMIC];
                break;
            case '0b110':
                return [`(digitalRead(${pinA}) && digitalRead(${pinB}) && !digitalRead(${pinC}))`, gen.ORDER_ATOMIC];
                break;
            case '0b001':
                return [`(!digitalRead(${pinA}) && !digitalRead(${pinB}) && digitalRead(${pinC}))`, gen.ORDER_ATOMIC];
                break;
            case '0b101':
                return [`(digitalRead(${pinA}) && !digitalRead(${pinB}) && digitalRead(${pinC}))`, gen.ORDER_ATOMIC];
                break;
            case '0b011':
                return [`(!digitalRead(${pinA}) && digitalRead(${pinB}) && digitalRead(${pinC}))`, gen.ORDER_ATOMIC];
                break;
            case '0b111':
                return [`(digitalRead(${pinA}) && digitalRead(${pinB}) && digitalRead(${pinC}))`, gen.ORDER_ATOMIC];
                break;
        }
    }

    tracers3array(args) {
        let se_rir = [];
        const pin1 = board.pin2firmata(board._port[parseInt(args.PA) - 1][0]);
        const pin2 = board.pin2firmata(board._port[parseInt(args.PA) - 1][1]);
        const pin3 = board.pin2firmata(board._port[parseInt(args.PA) - 1][2]);

        if (board.pins[pin1].mode != board.MODES.INPUT) {
            board.pinMode(pin1, board.MODES.INPUT);
        }
        if (board.pins[pin2].mode != board.MODES.INPUT) {
            board.pinMode(pin2, board.MODES.INPUT);
        }
        if (board.pins[pin3].mode != board.MODES.INPUT) {
            board.pinMode(pin3, board.MODES.INPUT);
        }

        if (board.eventNames().indexOf(`digital-read-${pin1}`) === -1) { // just call once
            board.digitalRead(pin1, value => { });
        }
        if (board.eventNames().indexOf(`digital-read-${pin2}`) === -1) { // just call once
            board.digitalRead(pin2, value => { });
        }
        if (board.eventNames().indexOf(`digital-read-${pin3}`) === -1) { // just call once
            board.digitalRead(pin3, value => { });
        }

        se_rir[0] = board.pins[pin1].value;//? 0:1;
        se_rir[1] = board.pins[pin2].value;//? 0:1;
        se_rir[2] = board.pins[pin3].value;//? 0:1;
        // convert to -> HIGH: black line; LOW: white line
        return (se_rir[0] << 2 | se_rir[1] << 1 | se_rir[2]);
        // 回傳0b0110
    }

    tracers3arrayGen(gen, block) {
        const pin1 = board.pin2firmata(board._port[gen.valueToCode(block, 'PA') - 1][0]);
        const pin2 = board.pin2firmata(board._port[gen.valueToCode(block, 'PA') - 1][1]);
        const pin3 = board.pin2firmata(board._port[gen.valueToCode(block, 'PA') - 1][2]);
        gen.definitions_['readline3sens'] = `
uint8_t readline3sens(uint8_t p1, uint8_t p2, uint8_t p3) {
  uint8_t se_rir[3];
  uint8_t se_rir_state;

  // make sensor line an output (drives low briefly, but doesn't matter)
  pinMode(p1, OUTPUT);
  pinMode(p2, OUTPUT);
  pinMode(p3, OUTPUT);
  // drive sensor line high
  digitalWrite(p1, HIGH);
  digitalWrite(p2, HIGH);
  digitalWrite(p3, HIGH);

  delayMicroseconds(10); // charge lines for 10 us

  // disable interrupts so we can switch all the pins as close to the same
  // time as possible
  noInterrupts();

  // make sensor line an input (should also ensure pull-up is disabled)
  pinMode(p1, INPUT);
  pinMode(p2, INPUT);
  pinMode(p3, INPUT);
  // convert to -> HIGH: black line; LOW: white line;
  se_rir[0] = digitalRead(p1);
  se_rir[1] = digitalRead(p2);
  se_rir[2] = digitalRead(p3);

  interrupts(); // re-enable

  se_rir_state = (se_rir[0] << 2 | se_rir[1] << 1 | se_rir[2]);
  return se_rir_state; // example: 0b010
}
`;
        return [`readline3sens(${pin1}, ${pin2}, ${pin3})`, gen.ORDER_ATOMIC];

    }

    tracers4(args) {
        const pin1 = board.pin2firmata(board._port[parseInt(args.PA) - 1][1]);
        const pin2 = board.pin2firmata(board._port[parseInt(args.PA) - 1][2]);
        const pin3 = board.pin2firmata(board._port[parseInt(args.PB) - 1][1]);
        const pin4 = board.pin2firmata(board._port[parseInt(args.PB) - 1][2]);

        if (board.pins[pin1].mode != board.MODES.INPUT) {
            board.pinMode(pin1, board.MODES.INPUT);
        }
        if (board.pins[pin2].mode != board.MODES.INPUT) {
            board.pinMode(pin2, board.MODES.INPUT);
        }
        if (board.pins[pin3].mode != board.MODES.INPUT) {
            board.pinMode(pin3, board.MODES.INPUT);
        }
        if (board.pins[pin4].mode != board.MODES.INPUT) {
            board.pinMode(pin4, board.MODES.INPUT);
        }

        if (board.eventNames().indexOf(`digital-read-${pin1}`) === -1) { // just call once
            board.digitalRead(pin1, value => { });
        }
        if (board.eventNames().indexOf(`digital-read-${pin2}`) === -1) { // just call once
            board.digitalRead(pin2, value => { });
        }
        if (board.eventNames().indexOf(`digital-read-${pin3}`) === -1) { // just call once
            board.digitalRead(pin3, value => { });
        }
        if (board.eventNames().indexOf(`digital-read-${pin4}`) === -1) { // just call once
            board.digitalRead(pin4, value => { });
        }

        switch (args.PAT) { // HIGH: black line; LOW: white line
            case 0b0000:
                return (!board.pins[pin1].value && !board.pins[pin2].value && !board.pins[pin3].value && !board.pins[pin4].value);
                break;
            case 0b1000:
                return (board.pins[pin1].value && !board.pins[pin2].value && !board.pins[pin3].value && !board.pins[pin4].value);
                break;
            case 0b0100:
                return (!board.pins[pin1].value && board.pins[pin2].value && !board.pins[pin3].value && !board.pins[pin4].value);
                break;
            case 0b0010:
                return (!board.pins[pin1].value && !board.pins[pin2].value && board.pins[pin3].value && !board.pins[pin4].value);
                break;
            case 0b0001:
                return (!board.pins[pin1].value && !board.pins[pin2].value && !board.pins[pin3].value && board.pins[pin4].value);
                break;
            case 0b1100:
                return (board.pins[pin1].value && board.pins[pin2].value && !board.pins[pin3].value && !board.pins[pin4].value);
                break;
            case 0b0110:
                return (!board.pins[pin1].value && board.pins[pin2].value && board.pins[pin3].value && !board.pins[pin4].value);
                break;
            case 0b0011:
                return (!board.pins[pin1].value && !board.pins[pin2].value && board.pins[pin3].value && board.pins[pin4].value);
                break;
            case 0b1010:
                return (board.pins[pin1].value && !board.pins[pin2].value && board.pins[pin3].value && !board.pins[pin4].value);
                break;
            case 0b1001:
                return (board.pins[pin1].value && !board.pins[pin2].value && !board.pins[pin3].value && board.pins[pin4].value);
                break;
            case 0b0101:
                return (!board.pins[pin1].value && board.pins[pin2].value && !board.pins[pin3].value && board.pins[pin4].value);
                break;
            case 0b1110:
                return (board.pins[pin1].value && board.pins[pin2].value && board.pins[pin3].value && !board.pins[pin4].value);
                break;
            case 0b1101:
                return (board.pins[pin1].value && board.pins[pin2].value && !board.pins[pin3].value && board.pins[pin4].value);
                break;
            case 0b1011:
                return (board.pins[pin1].value && !board.pins[pin2].value && board.pins[pin3].value && board.pins[pin4].value);
                break;
            case 0b0111:
                return (!board.pins[pin1].value && board.pins[pin2].value && board.pins[pin3].value && board.pins[pin4].value);
                break;
            case 0b1111:
                return (board.pins[pin1].value && board.pins[pin2].value && board.pins[pin3].value && board.pins[pin4].value);
                break;
        }
    }

    tracers4Gen(gen, block) {
        const pin1 = board.pin2firmata(board._port[gen.valueToCode(block, 'PA') - 1][1]);
        const pin2 = board.pin2firmata(board._port[gen.valueToCode(block, 'PA') - 1][2]);
        const pin3 = board.pin2firmata(board._port[gen.valueToCode(block, 'PB') - 1][1]);
        const pin4 = board.pin2firmata(board._port[gen.valueToCode(block, 'PB') - 1][2]);
        const pat = gen.valueToCode(block, 'PAT');
        gen.setupCodes_['sensor' + pin1] = `pinMode(${pin1},INPUT)`;
        gen.setupCodes_['sensor' + pin2] = `pinMode(${pin2},INPUT)`;
        gen.setupCodes_['sensor' + pin3] = `pinMode(${pin3},INPUT)`;
        gen.setupCodes_['sensor' + pin4] = `pinMode(${pin4},INPUT)`;

        switch (pat) { // HIGH: black line; LOW: white line
            case '0b0000':
                return [`(!digitalRead(${pin1}) && !digitalRead(${pin2}) && !digitalRead(${pin3}) && !digitalRead(${pin4}))`, gen.ORDER_ATOMIC];
                break;
            case '0b1000':
                return [`(digitalRead(${pin1}) && !digitalRead(${pin2}) && !digitalRead(${pin3}) && !digitalRead(${pin4}))`, gen.ORDER_ATOMIC];
                break;
            case '0b0100':
                return [`(!digitalRead(${pin1}) && digitalRead(${pin2}) && !digitalRead(${pin3}) && !digitalRead(${pin4}))`, gen.ORDER_ATOMIC];
                break;
            case '0b0010':
                return [`(!digitalRead(${pin1}) && !digitalRead(${pin2}) && digitalRead(${pin3}) && !digitalRead(${pin4}))`, gen.ORDER_ATOMIC];
                break;
            case '0b0001':
                return [`(!digitalRead(${pin1}) && !digitalRead(${pin2}) && !digitalRead(${pin3}) && digitalRead(${pin4}))`, gen.ORDER_ATOMIC];
                break;
            case '0b1100':
                return [`(digitalRead(${pin1}) && digitalRead(${pin2}) && !digitalRead(${pin3}) && !digitalRead(${pin4}))`, gen.ORDER_ATOMIC];
                break;
            case '0b0110':
                return [`(!digitalRead(${pin1}) && digitalRead(${pin2}) && digitalRead(${pin3}) && !digitalRead(${pin4}))`, gen.ORDER_ATOMIC];
                break;
            case '0b0011':
                return [`(!digitalRead(${pin1}) && !digitalRead(${pin2}) && digitalRead(${pin3}) && digitalRead(${pin4}))`, gen.ORDER_ATOMIC];
                break;
            case '0b1010':
                return [`(digitalRead(${pin1}) && !digitalRead(${pin2}) && digitalRead(${pin3}) && !digitalRead(${pin4}))`, gen.ORDER_ATOMIC];
                break;
            case '0b1001':
                return [`(digitalRead(${pin1}) && !digitalRead(${pin2}) && !digitalRead(${pin3}) && digitalRead(${pin4}))`, gen.ORDER_ATOMIC];
                break;
            case '0b0101':
                return [`(!digitalRead(${pin1}) && digitalRead(${pin2}) && !digitalRead(${pin3}) && digitalRead(${pin4}))`, gen.ORDER_ATOMIC];
                break;
            case '0b1110':
                return [`(digitalRead(${pin1}) && digitalRead(${pin2}) && digitalRead(${pin3}) && !digitalRead(${pin4}))`, gen.ORDER_ATOMIC];
                break;
            case '0b1101':
                return [`(digitalRead(${pin1}) && digitalRead(${pin2}) && !digitalRead(${pin3}) && digitalRead(${pin4}))`, gen.ORDER_ATOMIC];
                break;
            case '0b1011':
                return [`(digitalRead(${pin1}) && !digitalRead(${pin2}) && digitalRead(${pin3}) && digitalRead(${pin4}))`, gen.ORDER_ATOMIC];
                break;
            case '0b0111':
                return [`(!digitalRead(${pin1}) && digitalRead(${pin2}) && digitalRead(${pin3}) && digitalRead(${pin4}))`, gen.ORDER_ATOMIC];
                break;
            case '0b1111':
                return [`(digitalRead(${pin1}) && digitalRead(${pin2}) && digitalRead(${pin3}) && digitalRead(${pin4}))`, gen.ORDER_ATOMIC];
                break;
        }
    }

    tracers4array(args) {
        let se_rir = [];
        const pin1 = board.pin2firmata(board._port[parseInt(args.PA) - 1][1]);
        const pin2 = board.pin2firmata(board._port[parseInt(args.PA) - 1][2]);
        const pin3 = board.pin2firmata(board._port[parseInt(args.PB) - 1][1]);
        const pin4 = board.pin2firmata(board._port[parseInt(args.PB) - 1][2]);

        if (board.pins[pin1].mode != board.MODES.INPUT) {
            board.pinMode(pin1, board.MODES.INPUT);
        }
        if (board.pins[pin2].mode != board.MODES.INPUT) {
            board.pinMode(pin2, board.MODES.INPUT);
        }
        if (board.pins[pin3].mode != board.MODES.INPUT) {
            board.pinMode(pin3, board.MODES.INPUT);
        }
        if (board.pins[pin4].mode != board.MODES.INPUT) {
            board.pinMode(pin4, board.MODES.INPUT);
        }

        if (board.eventNames().indexOf(`digital-read-${pin1}`) === -1) { // just call once
            board.digitalRead(pin1, value => { });
        }
        if (board.eventNames().indexOf(`digital-read-${pin2}`) === -1) { // just call once
            board.digitalRead(pin2, value => { });
        }
        if (board.eventNames().indexOf(`digital-read-${pin3}`) === -1) { // just call once
            board.digitalRead(pin3, value => { });
        }
        if (board.eventNames().indexOf(`digital-read-${pin4}`) === -1) { // just call once
            board.digitalRead(pin4, value => { });
        }

        se_rir[0] = board.pins[pin1].value;//? 0:1;
        se_rir[1] = board.pins[pin2].value;//? 0:1;
        se_rir[2] = board.pins[pin3].value;//? 0:1;
        se_rir[3] = board.pins[pin4].value;//? 0:1;
        // HIGH: black line; LOW: white line
        const se_rir_state = (se_rir[0] << 3 | se_rir[1] << 2 | se_rir[2] << 1 | se_rir[3]);
        return se_rir_state;// 回傳0b0110
        //return se_rir; // 回傳字串: 0,1,1,0
    }

    tracers4arrayGen(gen, block) {
        const pin1 = board.pin2firmata(board._port[gen.valueToCode(block, 'PA') - 1][1]);
        const pin2 = board.pin2firmata(board._port[gen.valueToCode(block, 'PA') - 1][2]);
        const pin3 = board.pin2firmata(board._port[gen.valueToCode(block, 'PB') - 1][1]);
        const pin4 = board.pin2firmata(board._port[gen.valueToCode(block, 'PB') - 1][2]);
        //gen.setupCodes_['sensor'+pin1] = `pinMode(${pin1},INPUT)`;
        //gen.setupCodes_['sensor'+pin2] = `pinMode(${pin2},INPUT)`;
        //gen.setupCodes_['sensor'+pin3] = `pinMode(${pin3},INPUT)`;
        //gen.setupCodes_['sensor'+pin4] = `pinMode(${pin4},INPUT)`;
        gen.definitions_['readline4sens'] = `
uint8_t readline4sens(uint8_t p1, uint8_t p2, uint8_t p3, uint8_t p4) {
  uint8_t se_rir[4];
  uint8_t se_rir_state;

  // make sensor line an output (drives low briefly, but doesn't matter)
  pinMode(p1, OUTPUT);
  pinMode(p2, OUTPUT);
  pinMode(p3, OUTPUT);
  pinMode(p4, OUTPUT);
  // drive sensor line high
  digitalWrite(p1, HIGH);
  digitalWrite(p2, HIGH);
  digitalWrite(p3, HIGH);
  digitalWrite(p4, HIGH);

  delayMicroseconds(10); // charge lines for 10 us

  // disable interrupts so we can switch all the pins as close to the same
  // time as possible
  noInterrupts();

  // make sensor line an input (should also ensure pull-up is disabled)
  pinMode(p1, INPUT);
  pinMode(p2, INPUT);
  pinMode(p3, INPUT);
  pinMode(p4, INPUT);
  // HIGH: black line; LOW: white line
  se_rir[0] = digitalRead(p1);
  se_rir[1] = digitalRead(p2);
  se_rir[2] = digitalRead(p3);
  se_rir[3] = digitalRead(p4);

  interrupts(); // re-enable

  se_rir_state = (se_rir[0] << 3 | se_rir[1] << 2 | se_rir[2] << 1 | se_rir[3]);
  return se_rir_state; // example: 0b0110
}
`;
        return [`readline4sens(${pin1}, ${pin2}, ${pin3}, ${pin4})`, gen.ORDER_ATOMIC];

    }

    tracers_match(args) {
        return (parseInt(args.SENREAD) == parseInt(args.PAT));
    }

    tracers_matchGen(gen, block) {
        const _senread = gen.valueToCode(block, 'SENREAD');
        const _pat = gen.valueToCode(block, 'PAT');
        return [`${_senread} == ${_pat}`, gen.ORDER_ATOMIC];
    }

    qtrsetGen(gen, block) {
        const pA = gen.valueToCode(block, 'PA');
        const pB = gen.valueToCode(block, 'PB');
        const pC = gen.valueToCode(block, 'PC');
        const pD = gen.valueToCode(block, 'PD');
        const qtrType = gen.valueToCode(block, 'TYPE');
        const qtrCount = gen.valueToCode(block, 'CNT');
        let pin1 = board._port[pA - 1][1];
        let pin2 = board._port[pA - 1][2];
        let pin3 = board._port[pB - 1][1];
        let pin4 = board._port[pB - 1][2];
        let pin5 = board._port[pC - 1][1];
        let pin6 = board._port[pC - 1][2];
        let pin7 = board._port[pD - 1][1];
        let pin8 = board._port[pD - 1][2];
        if (qtrType === 'RC') {
            pin1 = board.pin2firmata(pin1);
            pin2 = board.pin2firmata(pin2);
            //if (pB) {
            pin3 = board.pin2firmata(pin3);
            pin4 = board.pin2firmata(pin4);
            //}
            //if (pC) {
            pin5 = board.pin2firmata(pin5);
            pin6 = board.pin2firmata(pin6);
            //}
            //if (pD) {
            pin7 = board.pin2firmata(pin7);
            pin8 = board.pin2firmata(pin8);
            //}
        }
        gen.includes_['qtr'] = `#include <QTRSensors.h>\n`;
        gen.definitions_['qtr'] = `
QTRSensors qtr;

#define qtrCount ${qtrCount}
uint16_t qtrValues[qtrCount];

`;
        gen.setupCodes_['qtrType'] = `qtr.setType${qtrType}()`;
        gen.setupCodes_['qtrPins'] = `qtr.setSensorPins((const uint8_t[]){${pin1},${pin2},${pin3},${pin4},${pin5},${pin6},${pin7},${pin8}}, qtrCount)`;
    }

    qtrcalGen(gen, block) {
        /*  gen.setupCodes_['qtrCal'] = `
        for (uint8_t i = 0; i < 250; i++) {
          qtr.calibrate();
        }`;*/
        return gen.line(`qtr.calibrate()`);
    }

    qtreadlineGen(gen, block) {
        const lineColor = gen.valueToCode(block, 'WB');
        return [`qtr.readLine${lineColor}(qtrValues)`, gen.ORDER_ATOMIC];
    }

    qtreadrawGen(gen, block) {
        return gen.line(`qtr.read(qtrValues)`);
    }

    qtreadcalGen(gen, block) {
        return gen.line(`qtr.readCalibrated(qtrValues)`);
    }

    qtrawGen(gen, block) {
        const i = gen.valueToCode(block, 'I') - 1;
        return [`qtrValues[${i}]`, gen.ORDER_ATOMIC];
    }

    ultrasonic(args) {
        //const pin = board.pin2firmata(board._port[parseInt(args.PIN)-1][2]);
        const trig = board.pin2firmata(board._port[parseInt(args.PIN) - 1][1]);
        const echo = board.pin2firmata(board._port[parseInt(args.PIN) - 1][2]);
        //board.pinMode(pin, board.MODES.PING_READ);
        board.pinMode(trig, board.MODES.PING_READ);
        return new Promise(resolve => {
            board.pingRead({
                //pin: pin, // trig & echo have to short
                trigPin: trig,
                echoPin: echo,
                value: board.HIGH,
                pulseOut: 10,//5,
            }, ms => {
                ms = ms || 0;
                let mm = ms / 29.1 / 2 * 10;
                resolve(mm.toFixed(0)); // mm
            });
        });
    }

    ultrasonicGen(gen, block) {
        gen.definitions_['ultrasonic'] = `
uint16_t ultrasonicSensor(uint8_t trigPin, uint8_t echoPin){
  float distance;
  uint16_t duration;

  pinMode(trigPin, OUTPUT);
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  pinMode(echoPin, INPUT);
  duration = pulseIn(echoPin, HIGH, 30000);
  distance = (float)duration / 58.2 *10.0; // mm
  // un-comm this for nekomimi ultrasonic
  /*
  if(distance > 6){
    distance *= 1.28;
  }
  */
  if(distance <= 0.0){ // timeout
    distance = 9999.9;
  }
  return int(distance);
}
`;
        const trig = board.pin2firmata(board._port[gen.valueToCode(block, 'PIN') - 1][1]);
        const echo = board.pin2firmata(board._port[gen.valueToCode(block, 'PIN') - 1][2]);
        return [`ultrasonicSensor(${trig}, ${echo})`, gen.ORDER_ATOMIC];
    }
    /*
    tcs3200Gen (gen, block){
      // pin out must connect to D5
        const pin = gen.valueToCode(block, 'PIN');
        let pinArray = pin.split(",");
        const s3 = board.pin2firmata(pinArray[0]);
        const s2 = board.pin2firmata(pinArray[2]);
        gen.includes_['tcs230'] = `#include <MD_TCS230.h>
#include <FreqCount.h>`;
        gen.includes_['colormatch'] = `#include "ColorMatch.h"`;

        gen.definitions_['tcs230'] = `MD_TCS230  CS(${s2}, ${s3});
colorData rgb;`;
        gen.definitions_['tcs230read'] = `
void ScanColor(){
  CS.read();
  do{
    delay(1000);
    //Serial.println(".... wait....");
  } while(!CS.available());
  CS.getRGB(&rgb);
  //Serial.println("   done!!  ");
  //Serial.print("RGB [");
  //Serial.print(rgb.value[TCS230_RGB_R]);
  //Serial.print(",");
  //Serial.print(rgb.value[TCS230_RGB_G]);
  //Serial.print(",");
  //Serial.print(rgb.value[TCS230_RGB_B]);
  //Serial.println("]");
}`;

       gen.setupCodes_['tcs230_begin'] = `CS.begin();
  CS.setDarkCal(&sdBlack);
  CS.setWhiteCal(&sdWhite);`;
       //return [`readSensor_${s2}()`, gen.ORDER_ATOMIC];
       return gen.line(`ScanColor()`);
    }
    */
    async tcs34725cal(args) {
        if (!this.i2cTCS) {
            this.i2cTCS = new TCS34725({
                board: board,
                //i2cAddr: 0x29,
                it: 0xC0, // TCS34725_INTEGRATIONTIME_154MS
                gain: 0x03, // TCS34725_GAIN_60X  // for indoor
            });
        };
        if (await this.i2cTCS.init()) {
            //if (this.i2cTCS._tcs34725IntegrationTime != 0xC0) this.i2cTCS.setIntegrationTime(0xC0);
            //if (this.i2cTCS._tcs34725Gain != 0x03) this.i2cTCS.setGain(0x03);
            await this.i2cTCS.setInterrupt(false);  // turn on LED
            await timeout((256 - this.i2cTCS._tcs34725IntegrationTime) * 12 / 5 + 1);  // takes time to read
            const rgbc = await this.i2cTCS.getRawData();
            this.i2cTCS.setInterrupt(true);  // turn off LED

            if (args.WB === 'dark') {
                this.i2cTCS.dark = rgbc;
            } else if (args.WB === 'bright') {
                this.i2cTCS.bright = rgbc;
            } else {
                vm.emit('showAlert', { msg: 'wrong input' });
            }
        } else {
            vm.emit('showAlert', { msg: 'color sensor failed to connect' });
        }
    }

    tcs34725calGen(gen, block) {
        let add = gen.valueToCode(block, 'WB');
        if (add === 'dark') {
            add = 1;
        } else if (add === 'bright') {
            add = 3;
        }
        gen.includes_['eeprom'] = `#include <EEPROM.h>`;
        gen.includes_['tcs34725'] = `#include "Adafruit_TCS34725.h"`;
        gen.includes_['colormatchHEX'] = `#include "ColorSample.h"`;
        gen.definitions_['tcs34725'] = `
Adafruit_TCS34725 tcs34725 = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_154MS, TCS34725_GAIN_60X);`;
        gen.definitions_['tcs34725cal'] = `
void cal_TCS34725(uint8_t add){
  uint16_t r, g, b, c, c_eeprom;

  tcs34725.setInterrupt(false);  // turn on LED
  delay(256-tcs34725.getIntegrationTime())*12/5 + 1); // takes time to read
  tcs34725.getRawData(&r, &g, &b, &c);
  tcs34725.setInterrupt(true);  // turn off LED

  // EEPROM add0-1: dark; add2-3: bright
  EEPROM.get(add, c_eeprom);
  if (c_eeprom != c) {
    EEPROM.put(add, c);
    delay(10);
  }

}`;

        gen.setupCodes_['tcs34725'] = `
  if (tcs34725.begin()) {
    //Serial.println("Found sensor");
  } else {
    Serial.println("No TCS34725 found ... check your connections");
  };`;

        return gen.line(`cal_TCS34725(${add})`);
    }

    async tcs34725led(args) {
        let onoff = null;
        if (args.ONOFF == 'ON') {
            onoff = false;
        } else {
            onoff = true;
        }

        if (!this.i2cTCS) {
            this.i2cTCS = new TCS34725({
                board: board,
                //i2cAddr: 0x29,
                it: 0xC0, // TCS34725_INTEGRATIONTIME_154MS
                gain: 0x03, // TCS34725_GAIN_60X  // for indoor
            });
        };

        if (await this.i2cTCS.init()) this.i2cTCS.setInterrupt(onoff);
    }

    tcs34725ledGen(gen, block) {
        let onoff = gen.valueToCode(block, 'ONOFF');
        if (onoff == 'ON') {
            onoff = 0;
        } else {
            onoff = 1;
        }

        gen.includes_['tcs34725'] = `#include "Adafruit_TCS34725.h"`;
        gen.definitions_['tcs34725'] = `
Adafruit_TCS34725 tcs34725 = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_154MS, TCS34725_GAIN_60X);`;
        gen.setupCodes_['tcs34725'] = `
    if (!tcs34725.begin())
        //{ Serial.println("TCS34725 connection failed"); }
`;
        return gen.line(`tcs34725.setInterrupt(${onoff});`);
    }

    tcs34725it(args) {
        if (!this.i2cTCS) {
            this.i2cTCS = new TCS34725({
                board: board,
                //i2cAddr: 0x29,
                it: 0xC0, // TCS34725_INTEGRATIONTIME_154MS
                gain: 0x03, // TCS34725_GAIN_60X  // for indoor
            });
        };
        if (this.i2cTCS._tcs34725IntegrationTime != args.IT) this.i2cTCS.setIntegrationTime(args.IT);
        console.log('it=', this.i2cTCS._tcs34725IntegrationTime);
    }

    tcs34725itGen(gen, block) {
        const it = gen.valueToCode(block, 'IT');

        gen.includes_['tcs34725'] = `#include "Adafruit_TCS34725.h"`;
        gen.definitions_['tcs34725'] = `
Adafruit_TCS34725 tcs34725 = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_154MS, TCS34725_GAIN_60X);`;
        gen.setupCodes_['tcs34725'] = `
    if (!tcs34725.begin())
        //{ Serial.println("TCS34725 connection failed"); }
`;
        return gen.line(`tcs34725.setIntegrationTime(${it})`);
    }

    tcs34725gain(args) {
        if (!this.i2cTCS) {
            this.i2cTCS = new TCS34725({
                board: board,
                //i2cAddr: 0x29,
                it: 0xC0, // TCS34725_INTEGRATIONTIME_154MS
                gain: 0x03, // TCS34725_GAIN_60X  // for indoor
            });
        };
        if (this.i2cTCS._tcs34725Gain != args.GAIN) this.i2cTCS.setGain(args.GAIN);
        console.log('gain=', this.i2cTCS._tcs34725Gain);
    }

    tcs34725gainGen(gen, block) {
        const gain = gen.valueToCode(block, 'GAIN');

        gen.includes_['tcs34725'] = `#include "Adafruit_TCS34725.h"`;
        gen.definitions_['tcs34725'] = `
Adafruit_TCS34725 tcs34725 = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_154MS, TCS34725_GAIN_60X);`;
        gen.setupCodes_['tcs34725'] = `
    if (!tcs34725.begin())
        //{ Serial.println("TCS34725 connection failed"); }
`;
        return gen.line(`tcs34725.setGain(${gain})`);
    }

    async tcs34725(args) { //i2c color sensor
        if (!this.i2cTCS) {
            this.i2cTCS = new TCS34725({
                board: board,
                //i2cAddr: 0x29,
                it: 0xC0, // TCS34725_INTEGRATIONTIME_154MS
                gain: 0x03, // TCS34725_GAIN_60X  // for indoor
            });
        };
        console.log('tsc object=', this.i2cTCS);
        if (await this.i2cTCS.init()) {
            //this.i2cTCS.setInterrupt(false);  // turn on LED
            await timeout((256 - this.i2cTCS._tcs34725IntegrationTime) * 12 / 5 + 1);  // takes time to read
            const rgb = await this.i2cTCS.getRGB();
            console.log('rgb1=', rgb);
            await timeout((256 - this.i2cTCS._tcs34725IntegrationTime) * 12 / 5 + 1);  // takes time to read
            const rgb2 = await this.i2cTCS.getRGB2();
            console.log('rgb2=', rgb2);
            //await timeout((256 - this.i2cTCS._tcs34725IntegrationTime) * 12 / 5 + 1);
            //const rgb3 = await this.i2cTCS.getRGB3();
            //console.log('rgb3=',rgb3);
            //this.i2cTCS.setInterrupt(true);  // turn off LED

            return five.Fn.uint24(rgb2.R, rgb2.G, rgb2.B); // RGB2HEX. type:number; without '#'

        } else {
            vm.emit('showAlert', { msg: 'color sensor failed to connect' });
        }
    }

    tcs34725Gen(gen, block) {
        //gen.includes_['eeprom'] = `#include <EEPROM.h>`;
        gen.includes_['tcs34725'] = `#include "Adafruit_TCS34725.h"`;
        gen.definitions_['tcs34725'] = `Adafruit_TCS34725 tcs34725 = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_154MS, TCS34725_GAIN_60X);`;
        //gen.includes_['tcs34725'] = `#include "tcs34725.h"`;
        //gen.definitions_['tcs34725'] = `tcs34725 tcs34725;`;
        //gen.includes_['tcs34725'] = `#include "TCS34725AutoGain.h"`;
        //gen.definitions_['tcs34725'] = `TCS34725 tcs34725;`;

        gen.definitions_['tcs34725read'] = `
uint32_t scanColor(){
  float i, cf, R, G, B;
  uint16_t r, g, b, c, c_dark, c_bright;
  uint32_t hex;

  //EEPROM.get(1, c_dark);
  //EEPROM.get(3, c_bright);
  c_dark = 0;
  c_bright = 65535;

  // Adafruit_TCS34725.h
  //tcs34725.setInterrupt(false);  // turn on LED
  //delay(2*(256-tcs34725.getIntegrationTime())*12/5 + 1); // Delay for one new integ. time period (to allow new reading)
  delay((256-tcs34725.getIntegrationTime())*12/5 + 1); // Delay for one old integ. time period (to allow old reading)
  tcs34725.getRawData(&r, &g, &b, &c);
  if (c == 0) {
    R = G = B = 0;
  } else {
    R = (float)r / c * 255.0;
    G = (float)g / c * 255.0;
    B = (float)b / c * 255.0;
  }

  // tcs34725.h
  /*tcs34725.getData();
  r=tcs34725.r;
  g=tcs34725.g;
  b=tcs34725.b;
  c=tcs34725.c;*/

  // TCS34725AutoGain.h
  /*while(!tcs34725.autoGain(50000)) {
    delayMicroseconds(100);
  }
  r=tcs34725.raw().r;
  g=tcs34725.raw().g;
  b=tcs34725.raw().b;
  c=tcs34725.raw().c;
  R=tcs34725.color().r;
  G=tcs34725.color().g;
  B=tcs34725.color().b;*/

  //Serial.println("RGB: " + String(R) + ", " + String(G) + ", " + String(B) );
  //Serial.println();

  //tcs34725.setInterrupt(true);  // turn off LED
  //Serial.println("rgbc: " + String(r) + ", " + String(g) + ", " + String(b) + ", " + String(c));

  //cf = (float)(c - dark[3]) / (float)(bright[3] - dark[3]);
  cf = (float)(c - c_dark) / (float)(c_bright - c_dark);
  if(r >= g && r >= b){
    i = (float)r / 255.0 + 1.0;
  } else if(g >= r && g >= b){
    i = (float)g / 255.0 + 1.0;
  } else if(b >=  g && b >= r){
    i = (float)b / 255.0 + 1.0;
  } else {
    i = 1.0;
  }
  if(i!=0.0) {
      R = (float)r / i;
      G = (float)g / i;
      B = (float)b / i;
  }
  if(R > 30.0) R = R - 30.0;
  if(G > 30.0) G = G - 30.0;
  if(B > 30.0) B = B - 30.0;
  R = R * 255.0 / 225.0 * cf;
  G = G * 255.0 / 225.0 * cf;
  B = B * 255.0 / 225.0 * cf;

  r = constrain(round(R), 0,255);
  g = constrain(round(G), 0,255);
  b = constrain(round(B), 0,255);
  //Serial.println("rgb: " + String(r) + ", " + String(g) + ", " + String(b));

  hex = (long(r) << 16 | long(g) << 8 | long(b));   // rgb to hex
  return hex; // type:number; without '#'
}`;

        gen.setupCodes_['tcs34725'] = `
    // TCS34725AutoGain.h
    //Wire.begin();
    //if (!tcs34725.attach())
    if (!tcs34725.begin())
        //{ Serial.println("TCS34725 connection failed"); }
`;
        return [`scanColor()`, gen.ORDER_ATOMIC];
    }

    hex2rgb(args) {
        let se_rgb = [];

        if (args.SENCOL) {
            //console.log('SENCOL=',typeof args.SENCOL,args.SENCOL);
            if (typeof args.SENCOL === 'number') { // hex number, without '#'
                se_rgb[0] = parseInt('0x' + args.SENCOL.toString(16).substring(0, 2));
                se_rgb[1] = parseInt('0x' + args.SENCOL.toString(16).substring(2, 4));
                se_rgb[2] = parseInt('0x' + args.SENCOL.toString(16).substring(4, 6));
                //console.log('r=',args.SENCOL.toString(16).substring(0,2));
                //console.log('g=',args.SENCOL.toString(16).substring(2,4));
                //console.log('b=',args.SENCOL.toString(16).substring(4,6));
            } else if (typeof args.SENCOL === 'string') { // with # hex string
                se_rgb[0] = hexToR(args.SENCOL);
                se_rgb[1] = hexToG(args.SENCOL);
                se_rgb[2] = hexToB(args.SENCOL);
            }
        } else {
            vm.emit('showAlert', { msg: 'wrong input' });
            return;
        }

        return se_rgb[args.RGB];
    }

    hex2rgbGen(gen, block) {
        const rgb = gen.valueToCode(block, 'RGB');
        let se_color = gen.valueToCode(block, 'SENCOL');
        //console.log('SENCOL=',typeof se_color,se_color);
        if (typeof se_color === 'string') { // hex string with '#' ?
            se_color = (se_color.charAt(0) == '\"') ? se_color.substr(1, se_color.length - 2) : se_color;
            //console.log('se_color1=',typeof se_color,se_color);
            se_color = (se_color.charAt(0) == '#') ? parseInt(se_color.substr(1, 6), 16) : se_color;
        }
        //console.log('se_color=',typeof se_color,se_color);

        gen.definitions_['hex2rgb'] = `
uint8_t hex2rgb(uint32_t hex, uint8_t rgb){
    uint8_t se_rgb[3];

    se_rgb[0] = byte(hex >> 16);       //red
    se_rgb[1] = byte(hex >> 8 & 0xFF); //green
    se_rgb[2] = byte(hex & 0xFF);      //blue

    return se_rgb[rgb];
}`

        return [`hex2rgb(${se_color}, ${rgb})`, gen.ORDER_ATOMIC];
    }

    colormatchHEX(args) {
        let se_rgb = [];
        if (!this.cSample) {
            this.cSample = require('./colorSample.js');
        }
        if (args.SENCOL) {
            //console.log('SENCOL=',typeof args.SENCOL,args.SENCOL);
            if (typeof args.SENCOL === 'number') { // hex number, without '#'
                se_rgb[0] = parseInt('0x' + args.SENCOL.toString(16).substring(0, 2));
                se_rgb[1] = parseInt('0x' + args.SENCOL.toString(16).substring(2, 4));
                se_rgb[2] = parseInt('0x' + args.SENCOL.toString(16).substring(4, 6));
                //console.log('r=',args.SENCOL.toString(16).substring(0,2));
                //console.log('g=',args.SENCOL.toString(16).substring(2,4));
                //console.log('b=',args.SENCOL.toString(16).substring(4,6));
            } else if (typeof args.SENCOL === 'string') { // with # hex string
                se_rgb[0] = hexToR(args.SENCOL);
                se_rgb[1] = hexToG(args.SENCOL);
                se_rgb[2] = hexToB(args.SENCOL);
            }
        } else {
            vm.emit('showAlert', { msg: 'wrong input' });
            return;
        }
        //console.log('hex to r:',se_rgb[0]);
        //console.log('hex to g:',se_rgb[1]);
        //console.log('hex to b:',se_rgb[2]);
        let sampleID = 0xFF; //that means not included in Sample table;
        let d, minV = 999999;
        for (let i = 0; i < this.cSample.length; i++) {
            d = Math.sqrt(Math.pow((se_rgb[0] - this.cSample[i][0]), 2) +
                Math.pow((se_rgb[1] - this.cSample[i][1]), 2) +
                Math.pow((se_rgb[2] - this.cSample[i][2]), 2));

            if (d < minV) {	// new best
                minV = d;
                sampleID = i;
            }
            if (d == 0)		// perfect match, no need to search more
                break;
        }
        console.log('sampleID=', sampleID);

        return (sampleID == parseInt(args.COLOR));
    }

    colormatchHEXGen(gen, block) {
        const color_no = gen.valueToCode(block, 'COLOR');
        let se_color = gen.valueToCode(block, 'SENCOL');
        //console.log('SENCOL=',typeof se_color,se_color);
        if (typeof se_color === 'string') { // hex string with '#' ?
            se_color = (se_color.charAt(0) == '\"') ? se_color.substr(1, se_color.length - 2) : se_color;
            //console.log('se_color1=',typeof se_color,se_color);
            se_color = (se_color.charAt(0) == '#') ? parseInt(se_color.substr(1, 6), 16) : se_color;
        }
        //console.log('se_color=',typeof se_color,se_color);

        gen.includes_['colormatchHEX'] = `#include "ColorSample.h"`;
        gen.definitions_['colorMatchHEX'] = `
uint8_t ColorMatchHEX(uint32_t se_color){
  uint8_t   se_rgb[3];
  uint8_t   sampleID = 0xFF;
  uint32_t  d;
  uint32_t  minV = 999999;

  se_rgb[0] = byte(se_color >> 16);       //red
  se_rgb[1] = byte(se_color >> 8 & 0xFF); //green
  se_rgb[2] = byte(se_color & 0xFF);      //blue

  for (uint8_t i=0; i<(sizeof(ct)/sizeof(ct[0])); i++){
    // Root mean square distance between the color and colors in the table.
    d = sqrt(pow(se_rgb[0] - ct[i][0], 2) +
              pow(se_rgb[1] - ct[i][1], 2) +
              pow(se_rgb[2] - ct[i][2], 2));
    if (d < minV){	// new best
        minV = d;
        sampleID = i;
    }
    if (d == 0)		// perfect match, no need to search more
        break;
  }

  return(sampleID);
}`;

        return [`ColorMatchHEX(${se_color}) == ${color_no}`, gen.ORDER_ATOMIC];
    }
    /*
    colormatchGen (gen, block){
        const iscolor = gen.valueToCode(block, 'COLOR');
        gen.includes_['colormatch'] = `#include "ColorMatch.h"`;
        gen.definitions_['colorMatch'] = `
uint8_t colorMatch(uint8_t *rgb){
// Root mean square distance between the color and colors in the table.
// FOr a limited range of colors this method works ok using RGB
// We don't work out the square root or the mean as it has no effect on the
// comparison for minimum. Square of the distance is used to ensure that
// negative distances do not subtract from the total.

    int32_t		d;
    uint32_t	v, minV = 999999L;
    uint8_t		minI;

    for (uint8_t i=0; i<(sizeof(ct)/sizeof(ct[0])); i++){
        v = 0;
        for (uint8_t j=0; j<3; j++){
            d = ct[i].rgb.value[j] - rgb->value[j];
            v += (d * d);
        }
        if (v < minV){	// new best
            minV = v;
            minI = i;
        }
        if (v == 0)		// perfect match, no need to search more
            break;
    }

    return(minI);
}`;

       return [`colorMatch(&rgb) == ${iscolor}`, gen.ORDER_ATOMIC];
    }
    */
    async tcs34725lux(args) {
        if (!this.i2cTCS) {
            this.i2cTCS = new TCS34725({
                board: board,
                //i2cAddr: 0x29,
                it: 0xC0, // TCS34725_INTEGRATIONTIME_154MS
                gain: 0x03, // TCS34725_GAIN_60X
            });
        };

        if (await this.i2cTCS.init()) {
            if (args.LIGHT === 'ambient') {
                this.i2cTCS.setInterrupt(true);  // turn off LED
            } else {
                this.i2cTCS.setInterrupt(false);  // turn on LED
            }
            //await timeout((256 - this.i2cTCS._tcs34725IntegrationTime) * 12 / 5 + 1);  // takes time to read
            //const lux = await this.i2cTCS.getLux();
            //console.log('lux1=',lux);
            await timeout(2 * (256 - this.i2cTCS._tcs34725IntegrationTime) * 12 / 5 + 1);  // takes time to read
            const lux2 = await this.i2cTCS.getLux2();
            console.log('lux2=', lux2);
            //this.i2cTCS.setInterrupt(true);  // turn off LED

            return lux2;

        } else {
            vm.emit('showAlert', { msg: 'color sensor failed to connect' });
        }
    }

    tcs34725luxGen(gen, block) {
        const light = gen.valueToCode(block, 'LIGHT');
        //console.log('light', typeof light, light);
        let l = 'false'; // turn on LED
        if (light === 'ambient') l = 'true';  // turn off LED
        //console.log('l', typeof l, l);
        //gen.includes_['tcs34725'] = `#include "TCS34725AutoGain.h"`;
        //gen.definitions_['tcs34725'] = `TCS34725 tcs34725;`;
        gen.includes_['tcs34725'] = `#include "Adafruit_TCS34725.h"`;
        gen.definitions_['tcs34725'] = `Adafruit_TCS34725 tcs34725 = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_154MS, TCS34725_GAIN_60X);`;
        gen.definitions_['tcs34725lux'] = `
#define TCS34725_R_Coef 0.136
#define TCS34725_G_Coef 1.000
#define TCS34725_B_Coef -0.444
#define TCS34725_GA 1.0
#define TCS34725_DF 310.0
#define TCS34725_CT_Coef 3810.0
#define TCS34725_CT_Offset 1391.0

uint16_t lux(boolean l){
  uint16_t r, g, b, c, lx;
  float atime_ms, ir, r_comp, g_comp, b_comp, cpl;
  uint8_t Gain_temp;
  tcs34725Gain_t gain = tcs34725.getGain();
  uint8_t it = tcs34725.getIntegrationTime();

  switch (gain) {
    case TCS34725_GAIN_1X:
        Gain_temp = 1;
        break;
    case TCS34725_GAIN_4X:
        Gain_temp = 4;
        break;
    case TCS34725_GAIN_16X:
        Gain_temp = 16;
        break;
    case TCS34725_GAIN_60X:
        Gain_temp = 60;
        break;
  }

  tcs34725.setInterrupt(l);  // turn on/off LED
  delay(2*(256-it)*12/5 + 1); // takes time to read
  tcs34725.getRawData(&r, &g, &b, &c);
  //tcs34725.setInterrupt(true);  // turn off LED

  atime_ms = ((256 - it) * 2.4);
  ir = ((r + g + b) > c) ? ((float)(r + g + b - c) / 2.0) : 0;
  r_comp = r - ir;
  g_comp = g - ir;
  b_comp = b - ir;
  cpl = (atime_ms * (float)Gain_temp) / (TCS34725_GA * TCS34725_DF);
  lx = word(round((TCS34725_R_Coef * r_comp + TCS34725_G_Coef * g_comp + TCS34725_B_Coef * b_comp) / cpl));

  return lx;
}`;

        gen.setupCodes_['tcs34725'] = `
    // TCS34725AutoGain.h
    //Wire.begin();
    //if (!tcs34725.attach())
    if (!tcs34725.begin())
        //{ Serial.println("TCS34725 connection failed"); }
`;

        return [`lux(${l})`, gen.ORDER_ATOMIC];
    }

    async dht11(args) {
        const pin = board.pin2firmata(board._port[parseInt(args.PIN) - 1][2]);
        if (!this.dht) {
            this.dht = new DHT({
                //pin: pin,
                board: board,
            });
            //console.log(`dht attached as`, this.dht);//for debug
        }
        //console.log(`dht status:`, this.dht);//for debug

        this.dht.read(pin);

        await timeout(500);

        if (args.FUNC == 'temperature') {
            return this.dht.temperature;
        } else if (args.FUNC == 'humidity') {
            return this.dht.humidity;
        }
    }

    dht11Gen(gen, block) {
        gen.includes_['dht11'] = '#include <dht11.h>';
        gen.definitions_['dht11'] = 'dht11 DHT11;';
        const dht11func = gen.valueToCode(block, 'FUNC');
        const pin = board.pin2firmata(board._port[gen.valueToCode(block, 'PIN') - 1][2]);
        if (dht11func === 'temperature') {
            gen.definitions_['dht11tempread'] = 'int dht11temp(int pin){\n\tDHT11.read(pin);\n\treturn DHT11.temperature;\n}\n';
            return [`dht11temp(${pin})`, gen.ORDER_ATOMIC];
        } else { // should be humidity
            gen.definitions_['dht11humiread'] = 'int dht11humi(int pin){\n\tDHT11.read(pin);\n\treturn DHT11.humidity;\n}\n';
            return [`dht11humi(${pin})`, gen.ORDER_ATOMIC];
        }
    }

    /*
    ds18b20Setup (args){
        const pin = board.pin2firmata(args.PIN);
        this.thm = new five.Thermometer({
            controller: "DS18B20",
            pin: pin,
            board: j5board
        });
        this.thm.on('change', function(data){
            this.thmdata = data;
        });
    }

    ds18b20SetupGen (gen, block){
        gen.includes_['ds18b20'] = '#include "OneWire.h"\n' +
            '#include "DallasTemperature.h"';
        gen.definitions_['ds18b20'] = 'OneWire onewire;\n' +
            'DallasTemperature ds18b20(&onewire);';
        const pin = gen.valueToCode(block, 'PIN');
        return gen.line(`onewire.updatePin(${pin})`) + gen.line(`ds18b20.begin()`);
    }

    ds18b20Read (args){

    }

    ds18b20ReadGen (gen, block){
        return gen.line('ds18b20.requestTemperatures()');
    }

    ds18b20 (args){
        return this.thmdata ? this.thmdata.C : -273;
    }

    ds18b20Gen (gen, block){
        const index = gen.valueToCode(block, 'INDEX');
        return [`ds18b20.getTempCByIndex(${index})`, gen.ORDER_ATOMIC];
    }
    */
    /*
    infraenGen (gen, block){
        const pin = gen.valueToCode(block, 'RXPIN');

        gen.includes_['infra'] = '#include <IRremote.h>';
        gen.definitions_['infra'] = `IRrecv irrecv(${pin});\n` +
            'decode_results results;';

        return `irrecv.enableIRIn()`;
    }

    infraloopGen (gen, block){
        const branch = gen.statementToCode(block, 'SUBSTACK');
        const code = `if (irrecv.decode(&results)) {
    if (results.value != 0xFFFFFFFF)
    {
    ${branch}
    }
    irrecv.resume();
}`;
        return code;
    }


    infraresultGen (gen, block){
        return ['results.value', gen.ORDER_ATOMIC];
    }

    infrasend (gen, block){
        const data = gen.valueToCode(block, 'DATA');
        gen.includes_['infra'] = '#include <IRremote.h>';
        gen.definitions_['infratx'] = `IRsend irsend;`;

        return `irsend.sendNEC(${data}, 32)`;
    }
    */

}

module.exports = cSensorsExtension;
