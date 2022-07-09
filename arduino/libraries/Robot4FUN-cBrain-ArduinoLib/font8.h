#ifndef _font8_H_
#define _font8_H_

//#include <avr/pgmspace.h>

byte CH[][8] = {
{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}, // space
{0x04, 0x04, 0x04, 0x04, 0x00, 0x00, 0x04, 0x00}, // !
{0x0A, 0x0A, 0x0A, 0x00, 0x00, 0x00, 0x00, 0x00}, // "
{0x0A, 0x0A, 0x1F, 0x0A, 0x1F, 0x0A, 0x0A, 0x00}, // #
{0x04, 0x0F, 0x14, 0x0E, 0x05, 0x1E, 0x04, 0x00}, // $
{0x18, 0x19, 0x02, 0x04, 0x08, 0x13, 0x03, 0x00}, // %
{0x0C, 0x12, 0x14, 0x08, 0x15, 0x12, 0x0D, 0x00}, // &
{0x0C, 0x04, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00}, // '
{0x02, 0x04, 0x08, 0x08, 0x08, 0x04, 0x02, 0x00}, // (
{0x08, 0x04, 0x02, 0x02, 0x02, 0x04, 0x08, 0x00}, // )
{0x00, 0x04, 0x15, 0x0E, 0x15, 0x04, 0x00, 0x00}, // *
{0x00, 0x04, 0x04, 0x1F, 0x04, 0x04, 0x00, 0x00}, // +
{0x00, 0x00, 0x00, 0x00, 0x0C, 0x04, 0x08, 0x00}, // ,
{0x00, 0x00, 0x00, 0x1F, 0x00, 0x00, 0x00, 0x00}, // -
{0x00, 0x00, 0x00, 0x00, 0x00, 0x0C, 0x0C, 0x00}, // .
{0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x00, 0x00}, // /
{0x0E, 0x11, 0x13, 0x15, 0x19, 0x11, 0x0E, 0x00}, // 0
{0x04, 0x0C, 0x04, 0x04, 0x04, 0x04, 0x0E, 0x00}, // 1
{0x0E, 0x11, 0x01, 0x02, 0x04, 0x08, 0x1F, 0x00}, // 2
{0x1F, 0x02, 0x04, 0x02, 0x01, 0x11, 0x0E, 0x00}, // 3
{0x02, 0x06, 0x0A, 0x12, 0x1F, 0x02, 0x02, 0x00}, // 4
{0x1F, 0x10, 0x1E, 0x01, 0x01, 0x11, 0x0E, 0x00}, // 5
{0x06, 0x08, 0x10, 0x1E, 0x11, 0x11, 0x0E, 0x00}, // 6
{0x1F, 0x01, 0x02, 0x04, 0x04, 0x04, 0x04, 0x00}, // 7
{0x1E, 0x11, 0x11, 0x0E, 0x11, 0x11, 0x0E, 0x00}, // 8
{0x0E, 0x11, 0x11, 0x0F, 0x01, 0x02, 0x0C, 0x00}, // 9
{0x00, 0x0C, 0x0C, 0x00, 0x0C, 0x0C, 0x00, 0x00}, // :
{0x00, 0x0C, 0x0C, 0x00, 0x0C, 0x04, 0x08, 0x00}, // ;
{0x02, 0x04, 0x08, 0x10, 0x08, 0x04, 0x02, 0x00}, // <
{0x00, 0x00, 0x1F, 0x00, 0x1F, 0x00, 0x00, 0x00}, // =
{0x08, 0x04, 0x02, 0x01, 0x02, 0x04, 0x08, 0x00}, // >
{0x0E, 0x11, 0x01, 0x02, 0x04, 0x00, 0x04, 0x00}, // ?
{0x0E, 0x11, 0x01, 0x0D, 0x15, 0x15, 0x0E, 0x00}, // @
// A~Z
{0x08, 0x14, 0x22, 0x3E, 0x22, 0x22, 0x22, 0x22},
{0x3C, 0x22, 0x22, 0x3E, 0x22, 0x22, 0x3C, 0x00},
{0x3C, 0x40, 0x40, 0x40, 0x40, 0x40, 0x3C, 0x00},
{0x7C, 0x42, 0x42, 0x42, 0x42, 0x42, 0x7C, 0x00},
{0x7C, 0x40, 0x40, 0x7C, 0x40, 0x40, 0x40, 0x7C},
{0x7C, 0x40, 0x40, 0x7C, 0x40, 0x40, 0x40, 0x40},
{0x3C, 0x40, 0x40, 0x40, 0x40, 0x44, 0x44, 0x3C},
{0x44, 0x44, 0x44, 0x7C, 0x44, 0x44, 0x44, 0x44},
{0x7C, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x7C},
{0x3C, 0x08, 0x08, 0x08, 0x08, 0x08, 0x48, 0x30},
{0x00, 0x24, 0x28, 0x30, 0x20, 0x30, 0x28, 0x24},
{0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x7C},
{0x81, 0xC3, 0xA5, 0x99, 0x81, 0x81, 0x81, 0x81},
{0x00, 0x42, 0x62, 0x52, 0x4A, 0x46, 0x42, 0x00},
{0x3C, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x3C},
{0x3C, 0x22, 0x22, 0x22, 0x3C, 0x20, 0x20, 0x20},
{0x1C, 0x22, 0x22, 0x22, 0x22, 0x26, 0x22, 0x1D},
{0x3C, 0x22, 0x22, 0x22, 0x3C, 0x24, 0x22, 0x21},
{0x00, 0x1E, 0x20, 0x20, 0x3E, 0x02, 0x02, 0x3C},
{0x00, 0x3E, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08},
{0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x22, 0x1C},
{0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x24, 0x18},
{0x00, 0x49, 0x49, 0x49, 0x49, 0x2A, 0x1C, 0x00},
{0x00, 0x41, 0x22, 0x14, 0x08, 0x14, 0x22, 0x41},
{0x41, 0x22, 0x14, 0x08, 0x08, 0x08, 0x08, 0x08},
{0x00, 0x7F, 0x02, 0x04, 0x08, 0x10, 0x20, 0x7F},
{0x0E, 0x08, 0x08, 0x08, 0x08, 0x08, 0x0E, 0x00}, // [
{0x00, 0x10, 0x08, 0x04, 0x02, 0x01, 0x00, 0x00}, // \ backslash
{0x0E, 0x02, 0x02, 0x02, 0x02, 0x02, 0x0E, 0x00}, // ]
{0x04, 0x0A, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00}, // hat
{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1F, 0x00}, // _
{0x10, 0x08, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00}, // `
// a~z
{0x00, 0x00, 0x0E, 0x01, 0x0F, 0x11, 0x0F, 0x00},
{0x10, 0x10, 0x16, 0x19, 0x11, 0x11, 0x1E, 0x00},
{0x00, 0x00, 0x0E, 0x11, 0x10, 0x11, 0x0E, 0x00},
{0x01, 0x01, 0x0D, 0x13, 0x11, 0x11, 0x0F, 0x00},
{0x00, 0x00, 0x0E, 0x11, 0x1F, 0x10, 0x0E, 0x00},
{0x02, 0x05, 0x04, 0x0E, 0x04, 0x04, 0x04, 0x00},
{0x00, 0x0D, 0x13, 0x13, 0x0D, 0x01, 0x0E, 0x00},
{0x10, 0x10, 0x16, 0x19, 0x11, 0x11, 0x11, 0x00},
{0x04, 0x00, 0x0C, 0x04, 0x04, 0x04, 0x0E, 0x00},
{0x02, 0x00, 0x06, 0x02, 0x02, 0x12, 0x0C, 0x00},
{0x08, 0x08, 0x09, 0x0A, 0x0C, 0x0A, 0x09, 0x00},
{0x0C, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0E, 0x00},
{0x00, 0x00, 0x1A, 0x15, 0x15, 0x15, 0x15, 0x00},
{0x00, 0x00, 0x16, 0x19, 0x11, 0x11, 0x11, 0x00},
{0x00, 0x00, 0x0E, 0x11, 0x11, 0x11, 0x0E, 0x00},
{0x00, 0x16, 0x19, 0x19, 0x16, 0x10, 0x10, 0x00},
{0x00, 0x0D, 0x13, 0x13, 0x0D, 0x01, 0x01, 0x00},
{0x00, 0x00, 0x16, 0x19, 0x10, 0x10, 0x10, 0x00},
{0x00, 0x00, 0x0F, 0x10, 0x1E, 0x01, 0x1F, 0x00},
{0x08, 0x08, 0x1C, 0x08, 0x08, 0x09, 0x06, 0x00},
{0x00, 0x00, 0x12, 0x12, 0x12, 0x12, 0x0D, 0x00},
{0x00, 0x00, 0x11, 0x11, 0x11, 0x0A, 0x04, 0x00},
{0x00, 0x00, 0x11, 0x11, 0x15, 0x15, 0x0A, 0x00},
{0x00, 0x00, 0x11, 0x0A, 0x04, 0x0A, 0x11, 0x00},
{0x00, 0x00, 0x11, 0x11, 0x13, 0x0D, 0x01, 0x0E},
{0x00, 0x00, 0x1F, 0x02, 0x04, 0x08, 0x1F, 0x00},
{0x02, 0x04, 0x04, 0x08, 0x04, 0x04, 0x02, 0x00}, // {
{0x04, 0x04, 0x04, 0x00, 0x04, 0x04, 0x04, 0x00}, // |
{0x08, 0x04, 0x04, 0x02, 0x04, 0x04, 0x08, 0x00}, // }
{0x08, 0x15, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00}, // ~
};

#endif
