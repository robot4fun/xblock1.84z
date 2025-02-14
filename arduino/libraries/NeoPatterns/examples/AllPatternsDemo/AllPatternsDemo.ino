/*
 *  NeoPatternsDemo.cpp
 *
 *  Shows all patterns for strips rings and matrixes included in the NeoPattern MatrixNeoPattern and Snake library.
 *
 *  You need to install "Adafruit NeoPixel" library under "Tools -> Manage Libraries..." or "Ctrl+Shift+I" -> use "neoPixel" as filter string
 *
 *  Copyright (C) 2018  Armin Joachimsmeyer
 *  armin.joachimsmeyer@gmail.com
 *
 *  This file is part of NeoPatterns https://github.com/ArminJo/NeoPatterns.
 *
 *  NeoPatterns is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.

 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/gpl.html>.
 *
 */

// Version 1.2 Added low battery voltage shutdown
#define VERSION_EXAMPLE "1.2"

#include <Arduino.h>

#include <MatrixSnake.h>
#ifdef __AVR__
#include "ADCUtils.h"
#include <avr/power.h>
#include <avr/pgmspace.h>

#define VOLTAGE_CHECK_THRESHOLD_MILLIVOLT 3600
#define VOLTAGE_CHECK_PERIOD_MILLIS 2000
#define VOLTAGE_CHECK_PERIOD_REPETITIONS 9
#define FALLING_STAR_DURATION 12
#endif

// Which pin on the Arduino is connected to the NeoPixels?
#define PIN_NEOPIXEL_BAR_24     2
#define PIN_NEOPIXEL_BAR_16     3

#define PIN_NEOPIXEL_RING_16    4
#define PIN_NEOPIXEL_RING_24    5
#define PIN_NEOPIXEL_RING_12    6

#define PIN_NEOPIXEL_MATRIX     8

// onComplete callback functions
void TestPatterns(NeoPatterns * aLedsPtr);

// construct the NeoPatterns instances
NeoPatterns bar16 = NeoPatterns(16, PIN_NEOPIXEL_BAR_16, NEO_GRB + NEO_KHZ800, &allPatternsRandomExample);
NeoPatterns bar24 = NeoPatterns(24, PIN_NEOPIXEL_BAR_24, NEO_GRB + NEO_KHZ800, &TestPatterns);
NeoPatterns ring12 = NeoPatterns(12, PIN_NEOPIXEL_RING_12, NEO_GRB + NEO_KHZ800, &allPatternsRandomExample);
NeoPatterns ring16 = NeoPatterns(16, PIN_NEOPIXEL_RING_16, NEO_GRB + NEO_KHZ800, &allPatternsRandomExample);
NeoPatterns ring24 = NeoPatterns(24, PIN_NEOPIXEL_RING_24, NEO_GRB + NEO_KHZ800, &allPatternsRandomExample);
/*
 * Specify your matrix geometry as 4th parameter.
 * ....BOTTOM ....RIGHT specify the position of the zeroth pixel.
 * See MatrixNeoPatterns.h for further explanation.
 */
MatrixSnake NeoPixelMatrix = MatrixSnake(8, 8, PIN_NEOPIXEL_MATRIX,
NEO_MATRIX_BOTTOM | NEO_MATRIX_RIGHT | NEO_MATRIX_ROWS | NEO_MATRIX_PROGRESSIVE, NEO_GRB + NEO_KHZ800, &MatrixAndSnakePatternsDemo);

void setup() {
    pinMode(LED_BUILTIN, OUTPUT);

    Serial.begin(115200);
    while (!Serial)
        ; //delay for Leonardo
    // Just to know which program is running on my Arduino
    Serial.println(F("START " __FILE__ "\r\nVersion " VERSION_EXAMPLE " from " __DATE__));

    // This initializes the NeoPixel library and checks if enough memory was available
    // check the last object defined
    if (!NeoPixelMatrix.begin(&Serial)) {
        // Blink forever
        while (true) {
            digitalWrite(LED_BUILTIN, HIGH);
            delay(500);
            digitalWrite(LED_BUILTIN, LOW);
            delay(500);
        }
    }

    // setup ADC reference and channel
    getVCCVoltageMillivoltSimple();

    extern void *__brkval;
    Serial.print(F("Free Ram/Stack[bytes]="));
    Serial.println(SP - (uint16_t) __brkval);

    bar16.begin(); // This initializes the NeoPixel library.
    bar24.begin(); // This initializes the NeoPixel library.
    ring12.begin(); // This initializes the NeoPixel library.
    ring16.begin(); // This initializes the NeoPixel library.
    ring24.begin(); // This initializes the NeoPixel library.

    bar16.PatternsGeometry = GEOMETRY_BAR;
    bar24.PatternsGeometry = GEOMETRY_BAR;
    ring12.ColorWipe(COLOR32_PURPLE, 50);
    ring16.ColorWipe(COLOR32_RED, 50, DIRECTION_DOWN);
    ring24.ColorWipe(COLOR32_GREEN, 50);
    bar16.ColorWipe(COLOR32_BLUE, 50, DIRECTION_DOWN);
    bar24.Stripes(COLOR32_BLUE, 5, COLOR32_RED, 3, 50, 48);
//    bar24.ScannerExtended(COLOR32_BLUE, 5, 50, 1,
//            FLAG_SCANNER_EXT_ROCKET | FLAG_SCANNER_EXT_VANISH_COMPLETE | FLAG_SCANNER_EXT_START_AT_BOTH_ENDS);
    NeoPixelMatrix.clear(); // Clear matrix
    NeoPixelMatrix.show();
    NeoPixelMatrix.Delay(5000); // start later
    setMatrixAndSnakePatternsDemoTickerText(F("I love R&C4Kids"));
    Serial.println("started");
}

uint8_t sWheelPosition = 0; // hold the color index for the changing ticker colors

void loop() {
#ifdef __AVR__
    /*
     * Check VCC every 2 seconds
     */
    static long sLastMillisOfVoltageCheck;
    static uint8_t sVoltageTooLowCounter;
    static bool sVoltageTooLow = false;
    static char sStringBufferForVCC[7] = "xxxxmV";

    if (millis() - sLastMillisOfVoltageCheck >= VOLTAGE_CHECK_PERIOD_MILLIS) {
        sLastMillisOfVoltageCheck = millis();
        uint16_t tVCC = getVCCVoltageMillivoltSimple();
        Serial.print(F("VCC="));
        Serial.print(tVCC);
        Serial.println(F("mV"));

        /*
         * Print voltage once on matrix
         */
        if (millis() < 3000 && tVCC < 4300) {
            itoa(tVCC, sStringBufferForVCC, 10);
            NeoPixelMatrix.Ticker(sStringBufferForVCC, NeoPatterns::Wheel(0), COLOR32_BLACK, 80, DIRECTION_LEFT);
        }

        if (!sVoltageTooLow) {
            if (tVCC < VOLTAGE_CHECK_THRESHOLD_MILLIVOLT) {
                /*
                 * Voltage too low, wait VOLTAGE_CHECK_PERIOD_REPETITIONS (5) times and then shut down.
                 */
                sVoltageTooLowCounter++;
                if (sVoltageTooLowCounter == VOLTAGE_CHECK_PERIOD_REPETITIONS) {
                    Serial.println(F("Voltage < 3.6 Volt detected, shut down NeoPixel"));
                    sVoltageTooLow = true;

                    initMultipleFallingStars(&bar16, COLOR32_WHITE_HALF, FALLING_STAR_DURATION, 1, NULL);
                    bar24.clear();
                    bar24.show();
                    ring12.clear();
                    ring12.show();
                    ring16.clear();
                    ring16.show();
                    ring24.clear();
                    ring24.show();
                    NeoPixelMatrix.clear();
                    NeoPixelMatrix.show();
                    return;
                }
            } else {
                sVoltageTooLowCounter = 0;
            }
        }
    }
    if (sVoltageTooLow) {
        bar16.Update();
        delay(FALLING_STAR_DURATION);
        return;
    }
#endif
    bar16.Update();
    bar24.Update();
    ring12.Update();
    ring16.Update();
    ring24.Update();
    if (NeoPixelMatrix.Update()) {
        if (NeoPixelMatrix.ActivePattern == PATTERN_TICKER) {
            // change color of ticker after each update
            NeoPixelMatrix.Color1 = NeoPatterns::Wheel(sWheelPosition);
            sWheelPosition += 4;
        } else if (NeoPixelMatrix.ActivePattern == PATTERN_SNAKE) {
            if (NeoPixelMatrix.Index == 4) {
                NeoPixelMatrix.Direction = DIRECTION_LEFT;
            } else if (NeoPixelMatrix.Index == 8) {
                NeoPixelMatrix.Direction = DIRECTION_DOWN;
            }
        }
    }
}

/*
 * Handler for testing fire patterns
 */
void TestPatterns(NeoPatterns * aLedsPtr) {
    static int8_t sState = 0;

    switch (sState) {
    case 0:
        aLedsPtr->Delay(10);
        break;
    case 1:
        aLedsPtr->Delay(10);
        break;
    case 2:
        aLedsPtr->ColorWipe(COLOR32_GREEN, 5);
        break;
    case 3:
        aLedsPtr->Delay(400);
        break;
    case 4:
        aLedsPtr->Fire(20, 400); // OK
        break;
    case 5:
        aLedsPtr->ColorWipe(COLOR32_GREEN, 5);
        break;
    case 6:
        aLedsPtr->Delay(400);
        break;
    case 7:
        aLedsPtr->Fire(30, 260); // OK
        break;
    case 8:
        // switch to random
        initMultipleFallingStars(aLedsPtr, COLOR32_WHITE_HALF, 30, 3, &allPatternsRandomExample);
        sState = -1; // Start from beginning
        break;
    default:
        Serial.println("ERROR");
        break;
    }

    Serial.print("TestPatterns: Pin=");
    Serial.print(aLedsPtr->getPin());
    Serial.print(" Length=");
    Serial.print(aLedsPtr->numPixels());
    Serial.print(" ActivePattern=");
    Serial.print(aLedsPtr->ActivePattern);
    Serial.print(" State=");
    Serial.println(sState);

    sState++;

}
