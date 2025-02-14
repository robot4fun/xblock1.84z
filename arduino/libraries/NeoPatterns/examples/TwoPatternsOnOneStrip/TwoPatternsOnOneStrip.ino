/*
 *  TwoPatternsOnOneStrip.cpp
 *
 *  STILL EXPERIMENTAL
 *  Runs 2 patterns simultaneously on a 144 NeoPixel strip. One is the main background pattern
 *  and the other is the fast moves pattern intended to be more random and quite seldom.
 *
 *  The speed is controlled by a potentiometer at pin A0.
 *  The pattern stops if the button at pin 2 is pressed.
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
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/gpl.html>.
 *
 */

#include <Arduino.h>

#include "ArduinoUtils.h"
#include <NeoPatterns.h>

#define VERSION_EXAMPLE "1.0"

#define PIN_STOP_BUTTON     4
#define PIN_TIMING_BUTTON   3
#define PIN_SPEED_POTI     A0
// Which pin on the Arduino is connected to the NeoPixels?
#define PIN_NEOPIXEL_STRIP  2

#define INTERVAL_BACKGROUND_MIN 10
#define INTERVAL_FAST_MOVES_MIN 2 // measured 4.3 ms for 144 pixel, but the 1ms clock interrupt is disabled while sending so 2-3 interrupts/ms-ticks are lost.

#define DELAY_MILLIS_BACKGROUND_MIN 500
#define DELAY_MILLIS_FAST_MOVES_MIN 4000
uint16_t sSpeed; // goes from 1 to 10k in exponential scale

// onComplete callback functions
void PatternsBackground(NeoPatterns * aLedsPtr);
void PatternsFastMoves(NeoPatterns * aLedsPtr);

// construct the NeoPatterns instances
NeoPatterns NeoPatternsBackground = NeoPatterns(144, PIN_NEOPIXEL_STRIP, NEO_GRB + NEO_KHZ800, &PatternsBackground);
NeoPatterns NeoPatternsFastMoves = NeoPatterns(144, PIN_NEOPIXEL_STRIP, NEO_GRB + NEO_KHZ800, &PatternsFastMoves);

/*
 * converts value read at analog pin into exponential scale between 1 and 28
 */
void getSpeed() {

    // convert linear to logarithmic scale
    float tSpeedValue = analogRead(PIN_SPEED_POTI);
    Serial.print("SpeedValue=");
    Serial.print(tSpeedValue);
    tSpeedValue /= 700; // 700 gives value 0.0 to 1.46
    sSpeed = pow(10, tSpeedValue); // gives value 1 to 28
    Serial.print(" -> ");
    Serial.println(sSpeed);
}

void setup() {
    pinMode(LED_BUILTIN, OUTPUT);

    Serial.begin(115200);
    while (!Serial)
        ; //delay for Leonardo
    // Just to know which program is running on my Arduino
    Serial.println(F("START " __FILE__ "\r\nVersion " VERSION_EXAMPLE " from  " __DATE__));

    NeoPatternsBackground.begin(); // This initializes the NeoPixel library.
    // This initializes the NeoPixel library and checks if enough memory was available
    if (!NeoPatternsFastMoves.begin(&Serial)) {
        // Blink forever
        while (true) {
            digitalWrite(LED_BUILTIN, HIGH);
            delay(500);
            digitalWrite(LED_BUILTIN, LOW);
            delay(500);
        }
    }

    extern void *__brkval;
    Serial.print(F("Free Ram/Stack[bytes]="));
    Serial.println(SP - (uint16_t) __brkval);

    // replace the NeoPatternsFastMoves pixel buffer with the NeoPatternsBackground buffer in order to have 2 Patterns on the same strip
    NeoPatternsFastMoves.setPixelBuffer(NeoPatternsBackground.getPixels());

    pinMode(PIN_STOP_BUTTON, INPUT_PULLUP);
    pinMode(PIN_TIMING_BUTTON, OUTPUT);
    NeoPatternsBackground.ColorWipe(COLOR32_GREEN_HALF, 8); // start the pattern
//    NeoPatternsBackground.ColorSet(COLOR32_RED); // start the pattern
    NeoPatternsFastMoves.ScannerExtended(COLOR32_BLUE_HALF, 16, 8, 0, 0, DIRECTION_DOWN); // start the pattern
//    NeoPatternsFastMoves.Delay(2 * DELAY_MILLIS_FAST_MOVES_MIN); // start the pattern
}

bool sRunning = true;

void loop() {
    if (sRunning) {
        bool tMustUpdate = NeoPatternsBackground.CheckForUpdate();
        tMustUpdate |= NeoPatternsFastMoves.CheckForUpdate();
        if (tMustUpdate) {
#ifdef DEBUG
            uint32_t tStartMillis = millis();
#endif
            NeoPatternsBackground.UpdateOrRedraw();
            NeoPatternsFastMoves.UpdateOrRedraw();
#ifdef DEBUG

            uint32_t tEndMillis = millis();
            if ((tEndMillis - tStartMillis) > 2) {
                Serial.print("millis needed=");
                Serial.println((tEndMillis - tStartMillis));
            }
#endif
//        digitalWrite(PIN_TIMING_BUTTON, HIGH);
            NeoPatternsBackground.show(); // 4.5 ms for 144 pixel
//        digitalWrite(PIN_TIMING_BUTTON, LOW);
        }
    }
//    NeoPixelTest.Debug(false);
    if (wasButtonJustPressed(PIN_STOP_BUTTON)) {
        sRunning = !sRunning;
    }

}

/*
 * Handler for background pattern
 * since sState starts with (0++) scanner is the first pattern you see
 */
void PatternsBackground(NeoPatterns * aLedsPtr) {
    static int8_t sState = 0;
    static bool sNoDelay = false;

    /*
     * implement a random delay between each case
     */
    getSpeed();
    long tRandomDelay = random(DELAY_MILLIS_BACKGROUND_MIN * sSpeed, DELAY_MILLIS_BACKGROUND_MIN * sSpeed * 4);
    uint16_t tInterval = random(INTERVAL_BACKGROUND_MIN, INTERVAL_BACKGROUND_MIN * 2);

    if ((sState & 1) == 1) {
        /*
         * Insert a random delay if sState is odd
         * is disabled by "sNoDelay"
         */
        sState++;
        if (!sNoDelay) {
            aLedsPtr->Delay(tRandomDelay); // to separate each pattern
            return;
        }
    }

    int8_t tState = sState / 2;
    switch (tState) {
    case 0:
        // STRIPES
        aLedsPtr->Stripes(COLOR32_GREEN_HALF, 15, COLOR32_BLACK, 25, tInterval, 400);
        sNoDelay = true;
        break;
    case 1:
        // clear pattern
        aLedsPtr->ColorWipe(COLOR32_BLACK, INTERVAL_FAST_MOVES_MIN, FLAG_DO_NOT_CLEAR, DIRECTION_DOWN);
        sNoDelay = false;
#ifdef DEBUG
        aLedsPtr->Debug(true);
#endif
        break;
    case 2:
        aLedsPtr->RainbowCycle(tInterval);
        break;
    case 3:
        aLedsPtr->clear();
        aLedsPtr->ScannerExtended(COLOR32_GREEN, 32, tInterval, 1, FLAG_SCANNER_EXT_CYLON | FLAG_SCANNER_EXT_VANISH_COMPLETE);
        break;
    case 4:
        // old TheaterChase
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Woverflow" // of 2 * aLedsPtr->numPixels()
        aLedsPtr->Stripes(COLOR32_RED_HALF, 2, COLOR32_GREEN_HALF, 4, tInterval * 3, aLedsPtr->numPixels() * 2);
        sNoDelay = true;
        break;
#pragma GCC diagnostic pop
    case 5:
        aLedsPtr->ColorWipe(COLOR32_BLACK, INTERVAL_FAST_MOVES_MIN, FLAG_DO_NOT_CLEAR);
        sNoDelay = false;
        sState = -2; // Start from beginning
        break;
    default:
        Serial.println("ERROR");
        break;
    }

    Serial.print("Pin=");
    Serial.print(aLedsPtr->getPin());
    Serial.print(" Length=");
    Serial.print(aLedsPtr->numPixels());
    Serial.print(" ActivePattern=");
    Serial.print(aLedsPtr->ActivePattern);
    Serial.print(" Speed=");
    Serial.print(sSpeed);
    Serial.print(" Interval=");
    Serial.print(tInterval);
    Serial.print(" sNoDelay=");
    Serial.print(sNoDelay);
    Serial.print(" StateBack=");
    Serial.println(tState);

    sState++;
}
/*
 * Handler for test pattern
 * since sState starts with (0++) scanner is the first pattern you see
 */
void PatternsFastMoves(NeoPatterns * aLedsPtr) {
    static int8_t sState = 0;

    /*
     * implement a random delay between each case
     */
    getSpeed();
    long tRandomDelay = random(DELAY_MILLIS_FAST_MOVES_MIN * sSpeed, DELAY_MILLIS_FAST_MOVES_MIN * sSpeed * 4);
    uint16_t tInterval = random(INTERVAL_FAST_MOVES_MIN, INTERVAL_FAST_MOVES_MIN * 2);

    if ((sState & 1) == 1) {
        /*
         * Insert a random delay if sState is odd
         */
        aLedsPtr->Delay(tRandomDelay); // to separate each pattern
        sState++;
        return;
    }

    int8_t tState = sState / 2;
    switch (tState) {
    case 0:
        // falling star
        aLedsPtr->ScannerExtended(COLOR32_WHITE_HALF, 10, tInterval, 0, FLAG_SCANNER_EXT_VANISH_COMPLETE, DIRECTION_DOWN);
        break;
    case 1:
        // old scanner 2 times
        aLedsPtr->ScannerExtended(COLOR32_BLUE, 10, tInterval, 1,
        FLAG_SCANNER_EXT_VANISH_COMPLETE | FLAG_SCANNER_EXT_START_AT_BOTH_ENDS);
        break;
    case 2:
        aLedsPtr->ScannerExtended(COLOR32_CYAN, 10, INTERVAL_FAST_MOVES_MIN, 0, FLAG_SCANNER_EXT_VANISH_COMPLETE);
        break;
    case 3:
        aLedsPtr->ScannerExtended(COLOR32_GREEN, 8, tInterval, 0,
        FLAG_SCANNER_EXT_CYLON | FLAG_SCANNER_EXT_VANISH_COMPLETE);
#ifdef DEBUG
        aLedsPtr->Debug(true);
#endif
        break;
    case 4:
        aLedsPtr->ScannerExtended(COLOR32_GREEN, 6, tInterval, 0,
        FLAG_SCANNER_EXT_CYLON | FLAG_SCANNER_EXT_VANISH_COMPLETE | FLAG_SCANNER_EXT_START_AT_BOTH_ENDS);
        sState = -2; // Start from beginning
        break;
    default:
        Serial.println("ERROR");
        break;
    }

    Serial.print("Pin=");
    Serial.print(aLedsPtr->getPin());
    Serial.print(" Length=");
    Serial.print(aLedsPtr->numPixels());
    Serial.print(" ActivePattern=");
    Serial.print(aLedsPtr->ActivePattern);
    Serial.print(" Speed=");
    Serial.print(sSpeed);
    Serial.print(" Interval=");
    Serial.print(tInterval);
    Serial.print(" StateFast=");
    Serial.println(tState);

    sState++;
}
