// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/exifreader/src/dataview.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class DataView {
  constructor(buffer) {
    if (bufferTypeIsUnsupported(buffer)) {
      throw new Error('DataView: Passed buffer type is unsupported.');
    }

    this.buffer = buffer;
    this.byteLength = this.buffer.length;
  }

  getUint8(offset) {
    return this.buffer.readUInt8(offset);
  }

  getUint16(offset, littleEndian) {
    if (littleEndian) {
      return this.buffer.readUInt16LE(offset);
    }

    return this.buffer.readUInt16BE(offset);
  }

  getUint32(offset, littleEndian) {
    if (littleEndian) {
      return this.buffer.readUInt32LE(offset);
    }

    return this.buffer.readUInt32BE(offset);
  }

  getInt32(offset, littleEndian) {
    if (littleEndian) {
      return this.buffer.readInt32LE(offset);
    }

    return this.buffer.readInt32BE(offset);
  }

}

exports.default = DataView;

function bufferTypeIsUnsupported(buffer) {
  return typeof buffer !== 'object' || buffer.length === undefined || buffer.readUInt8 === undefined || buffer.readUInt16LE === undefined || buffer.readUInt16BE === undefined || buffer.readUInt32LE === undefined || buffer.readUInt32BE === undefined || buffer.readInt32LE === undefined || buffer.readInt32BE === undefined;
}
},{}],"../node_modules/exifreader/src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStringFromDataView = getStringFromDataView;

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
function getStringFromDataView(dataView, offset, length) {
  const chars = [];

  for (let i = 0; i < length && offset + i < dataView.byteLength; i++) {
    chars.push(dataView.getUint8(offset + i, false));
  }

  return getAsciiValue(chars).join('');
}

function getAsciiValue(charArray) {
  return charArray.map(charCode => String.fromCharCode(charCode));
}
},{}],"../node_modules/exifreader/src/image-header.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
const MIN_DATA_BUFFER_LENGTH = 2;
const JPEG_ID = 0xffd8;
const JPEG_ID_SIZE = 2;
const APP_ID_OFFSET = 4;
const APP_MARKER_SIZE = 2;
const TIFF_HEADER_OFFSET = 10; // From start of APP1 marker.

const IPTC_DATA_OFFSET = 18; // From start of APP13 marker.

const XMP_DATA_OFFSET = 33; // From start of APP1 marker.

const SOF0_MARKER = 0xffc0;
const SOF2_MARKER = 0xffc2;
const DHT_MARKER = 0xffc4;
const DQT_MARKER = 0xffdb;
const DRI_MARKER = 0xffdd;
const SOS_MARKER = 0xffda;
const APP0_MARKER = 0xffe0;
const APP1_MARKER = 0xffe1;
const APP13_MARKER = 0xffed;
const APP15_MARKER = 0xffef;
const COMMENT_MARKER = 0xfffe;
const APP1_EXIF_IDENTIFIER = 'Exif';
const APP1_XMP_IDENTIFIER = 'http://ns.adobe.com/xap/1.0/';
const APP13_IPTC_IDENTIFIER = 'Photoshop 3.0';
var _default = {
  check,
  parseAppMarkers
};
exports.default = _default;

function check(dataView) {
  if (dataView.byteLength < MIN_DATA_BUFFER_LENGTH || dataView.getUint16(0, false) !== JPEG_ID) {
    throw new Error('Invalid image format');
  }
}

function parseAppMarkers(dataView) {
  let appMarkerPosition = JPEG_ID_SIZE;
  let fieldLength;
  let sof0DataOffset;
  let sof2DataOffset;
  let tiffHeaderOffset;
  let iptcDataOffset;
  let xmpDataOffset;
  let xmpFieldLength;

  while (appMarkerPosition + APP_ID_OFFSET + 5 <= dataView.byteLength) {
    if (isSOF0Marker(dataView, appMarkerPosition)) {
      sof0DataOffset = appMarkerPosition + APP_MARKER_SIZE;
    } else if (isSOF2Marker(dataView, appMarkerPosition)) {
      sof2DataOffset = appMarkerPosition + APP_MARKER_SIZE;
    } else if (isApp1ExifMarker(dataView, appMarkerPosition)) {
      fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE, false);
      tiffHeaderOffset = appMarkerPosition + TIFF_HEADER_OFFSET;
    } else if (isApp1XMPMarker(dataView, appMarkerPosition)) {
      fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE, false);
      xmpDataOffset = appMarkerPosition + XMP_DATA_OFFSET;
      xmpFieldLength = fieldLength - (XMP_DATA_OFFSET - APP_MARKER_SIZE);
    } else if (isApp13PhotoshopMarker(dataView, appMarkerPosition)) {
      fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE, false);
      iptcDataOffset = appMarkerPosition + IPTC_DATA_OFFSET;
    } else if (isAppMarker(dataView, appMarkerPosition)) {
      fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE, false);
    } else {
      break;
    }

    appMarkerPosition += APP_MARKER_SIZE + fieldLength;
  }

  return {
    hasAppMarkers: appMarkerPosition > JPEG_ID_SIZE,
    fileDataOffset: sof0DataOffset || sof2DataOffset,
    tiffHeaderOffset,
    iptcDataOffset,
    xmpDataOffset,
    xmpFieldLength
  };
}

function isSOF0Marker(dataView, appMarkerPosition) {
  return dataView.getUint16(appMarkerPosition, false) === SOF0_MARKER;
}

function isSOF2Marker(dataView, appMarkerPosition) {
  return dataView.getUint16(appMarkerPosition, false) === SOF2_MARKER;
}

function isApp1ExifMarker(dataView, appMarkerPosition) {
  const markerIdLength = APP1_EXIF_IDENTIFIER.length;
  return dataView.getUint16(appMarkerPosition, false) === APP1_MARKER && (0, _utils.getStringFromDataView)(dataView, appMarkerPosition + APP_ID_OFFSET, markerIdLength) === APP1_EXIF_IDENTIFIER && dataView.getUint8(appMarkerPosition + APP_ID_OFFSET + markerIdLength, false) === 0x00;
}

function isApp1XMPMarker(dataView, appMarkerPosition) {
  const markerIdLength = APP1_XMP_IDENTIFIER.length;
  return dataView.getUint16(appMarkerPosition, false) === APP1_MARKER && (0, _utils.getStringFromDataView)(dataView, appMarkerPosition + APP_ID_OFFSET, markerIdLength) === APP1_XMP_IDENTIFIER && dataView.getUint8(appMarkerPosition + APP_ID_OFFSET + markerIdLength, false) === 0x00;
}

function isApp13PhotoshopMarker(dataView, appMarkerPosition) {
  const markerIdLength = APP13_IPTC_IDENTIFIER.length;
  return dataView.getUint16(appMarkerPosition, false) === APP13_MARKER && (0, _utils.getStringFromDataView)(dataView, appMarkerPosition + APP_ID_OFFSET, markerIdLength) === APP13_IPTC_IDENTIFIER && dataView.getUint8(appMarkerPosition + APP_ID_OFFSET + markerIdLength, false) === 0x00;
}

function isAppMarker(dataView, appMarkerPosition) {
  const appMarker = dataView.getUint16(appMarkerPosition, false);
  return appMarker >= APP0_MARKER && appMarker <= APP15_MARKER || appMarker === COMMENT_MARKER || appMarker === SOF0_MARKER || appMarker === SOF2_MARKER || appMarker === DHT_MARKER || appMarker === DQT_MARKER || appMarker === DRI_MARKER || appMarker === SOS_MARKER;
}
},{"./utils":"../node_modules/exifreader/src/utils.js"}],"../node_modules/exifreader/src/byte-order.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
const LITTLE_ENDIAN = 0x4949;
const BIG_ENDIAN = 0x4d4d;
var _default = {
  BIG_ENDIAN,
  LITTLE_ENDIAN,
  getByteOrder
};
exports.default = _default;

function getByteOrder(dataView, tiffHeaderOffset) {
  if (dataView.getUint16(tiffHeaderOffset) === LITTLE_ENDIAN) {
    return LITTLE_ENDIAN;
  } else if (dataView.getUint16(tiffHeaderOffset) === BIG_ENDIAN) {
    return BIG_ENDIAN;
  }

  throw new Error('Illegal byte order value. Faulty image.');
}
},{}],"../node_modules/exifreader/src/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _byteOrder = _interopRequireDefault(require("./byte-order"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
const typeSizes = {
  1: 1,
  // BYTE
  2: 1,
  // ASCII
  3: 2,
  // SHORT
  4: 4,
  // LONG
  5: 8,
  // RATIONAL
  7: 1,
  // UNDEFINED
  9: 4,
  // SLONG
  10: 8 // SRATIONAL

};
const tagTypes = {
  'BYTE': 1,
  'ASCII': 2,
  'SHORT': 3,
  'LONG': 4,
  'RATIONAL': 5,
  'UNDEFINED': 7,
  'SLONG': 9,
  'SRATIONAL': 10
};
var _default = {
  getAsciiValue,
  getByteAt,
  getAsciiAt,
  getShortAt,
  getLongAt,
  getRationalAt,
  getUndefinedAt,
  getSlongAt,
  getSrationalAt,
  typeSizes,
  tagTypes,
  getTypeSize
};
exports.default = _default;

function getAsciiValue(charArray) {
  return charArray.map(charCode => String.fromCharCode(charCode));
}

function getByteAt(dataView, offset) {
  return dataView.getUint8(offset);
}

function getAsciiAt(dataView, offset) {
  return dataView.getUint8(offset);
}

function getShortAt(dataView, offset, byteOrder) {
  return dataView.getUint16(offset, byteOrder === _byteOrder.default.LITTLE_ENDIAN);
}

function getLongAt(dataView, offset, byteOrder) {
  return dataView.getUint32(offset, byteOrder === _byteOrder.default.LITTLE_ENDIAN);
}

function getRationalAt(dataView, offset, byteOrder) {
  return getLongAt(dataView, offset, byteOrder) / getLongAt(dataView, offset + 4, byteOrder);
}

function getUndefinedAt(dataView, offset) {
  return getByteAt(dataView, offset);
}

function getSlongAt(dataView, offset, byteOrder) {
  return dataView.getInt32(offset, byteOrder === _byteOrder.default.LITTLE_ENDIAN);
}

function getSrationalAt(dataView, offset, byteOrder) {
  return getSlongAt(dataView, offset, byteOrder) / getSlongAt(dataView, offset + 4, byteOrder);
}

function getTypeSize(typeName) {
  if (tagTypes[typeName] === undefined) {
    throw new Error('No such type found.');
  }

  return typeSizes[tagTypes[typeName]];
}
},{"./byte-order":"../node_modules/exifreader/src/byte-order.js"}],"../node_modules/exifreader/src/tag-names-0th-ifd.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
var _default = {
  0x0100: 'ImageWidth',
  0x0101: 'ImageLength',
  0x0102: 'BitsPerSample',
  0x0103: 'Compression',
  0x0106: 'PhotometricInterpretation',
  0x010e: 'ImageDescription',
  0x010f: 'Make',
  0x0110: 'Model',
  0x0111: 'StripOffsets',
  0x0112: {
    name: 'Orientation',
    description: value => {
      if (value === 1) {
        return 'top-left';
      }

      if (value === 2) {
        return 'top-right';
      }

      if (value === 3) {
        return 'bottom-right';
      }

      if (value === 4) {
        return 'bottom-left';
      }

      if (value === 5) {
        return 'left-top';
      }

      if (value === 6) {
        return 'right-top';
      }

      if (value === 7) {
        return 'right-bottom';
      }

      if (value === 8) {
        return 'left-bottom';
      }

      return 'Undefined';
    }
  },
  0x0115: 'SamplesPerPixel',
  0x0116: 'RowsPerStrip',
  0x0117: 'StripByteCounts',
  0x011a: 'XResolution',
  0x011b: 'YResolution',
  0x011c: 'PlanarConfiguration',
  0x0128: {
    name: 'ResolutionUnit',
    description: value => {
      if (value === 2) {
        return 'inches';
      }

      if (value === 3) {
        return 'centimeters';
      }

      return 'Unknown';
    }
  },
  0x012d: 'TransferFunction',
  0x0131: 'Software',
  0x0132: 'DateTime',
  0x013b: 'Artist',
  0x013e: 'WhitePoint',
  0x013f: 'PrimaryChromaticities',
  0x0201: 'JPEGInterchangeFormat',
  0x0202: 'JPEGInterchangeFormatLength',
  0x0211: 'YCbCrCoefficients',
  0x0212: 'YCbCrSubSampling',
  0x0213: {
    name: 'YCbCrPositioning',
    description: value => {
      if (value === 1) {
        return 'centered';
      }

      if (value === 2) {
        return 'co-sited';
      }

      return 'undefined ' + value;
    }
  },
  0x0214: 'ReferenceBlackWhite',
  0x8298: {
    name: 'Copyright',
    description: value => value.join('; ')
  },
  0x8769: 'Exif IFD Pointer',
  0x8825: 'GPS Info IFD Pointer'
};
exports.default = _default;
},{}],"../node_modules/exifreader/src/tag-names-utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStringValue = getStringValue;
exports.getEncodedString = getEncodedString;
exports.getCharacterArray = getCharacterArray;

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
function getStringValue(value) {
  return value.map(charCode => String.fromCharCode(charCode)).join('');
}

function getEncodedString(value) {
  if (value.length >= 8) {
    const encoding = getStringValue(value.slice(0, 8));

    if (encoding === 'ASCII\x00\x00\x00') {
      return getStringValue(value.slice(8));
    } else if (encoding === 'JIS\x00\x00\x00\x00\x00') {
      return '[JIS encoded text]';
    } else if (encoding === 'UNICODE\x00') {
      return '[Unicode encoded text]';
    } else if (encoding === '\x00\x00\x00\x00\x00\x00\x00\x00') {
      return '[Undefined encoding]';
    }
  }

  return 'Undefined';
}

function getCharacterArray(string) {
  return string.split('').map(character => character.charCodeAt(0));
}
},{}],"../node_modules/exifreader/src/tag-names-exif-ifd.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagNamesUtils = require("./tag-names-utils");

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
var _default = {
  0x829a: 'ExposureTime',
  0x829d: 'FNumber',
  0x8822: {
    'name': 'ExposureProgram',
    'description': value => {
      if (value === 0) {
        return 'Undefined';
      } else if (value === 1) {
        return 'Manual';
      } else if (value === 2) {
        return 'Normal program';
      } else if (value === 3) {
        return 'Aperture priority';
      } else if (value === 4) {
        return 'Shutter priority';
      } else if (value === 5) {
        return 'Creative program';
      } else if (value === 6) {
        return 'Action program';
      } else if (value === 7) {
        return 'Portrait mode';
      } else if (value === 8) {
        return 'Landscape mode';
      }

      return 'Unknown';
    }
  },
  0x8824: 'SpectralSensitivity',
  0x8827: 'ISOSpeedRatings',
  0x8828: {
    'name': 'OECF',
    'description': () => '[Raw OECF table data]'
  },
  0x9000: {
    'name': 'ExifVersion',
    'description': value => (0, _tagNamesUtils.getStringValue)(value)
  },
  0x9003: 'DateTimeOriginal',
  0x9004: 'DateTimeDigitized',
  0x9101: {
    'name': 'ComponentsConfiguration',
    'description': value => {
      return value.map(character => {
        if (character === 0x31) {
          return 'Y';
        } else if (character === 0x32) {
          return 'Cb';
        } else if (character === 0x33) {
          return 'Cr';
        } else if (character === 0x34) {
          return 'R';
        } else if (character === 0x35) {
          return 'G';
        } else if (character === 0x36) {
          return 'B';
        }
      }).join('');
    }
  },
  0x9102: 'CompressedBitsPerPixel',
  0x9201: 'ShutterSpeedValue',
  0x9202: 'ApertureValue',
  0x9203: 'BrightnessValue',
  0x9204: 'ExposureBiasValue',
  0x9205: 'MaxApertureValue',
  0x9206: 'SubjectDistance',
  0x9207: {
    'name': 'MeteringMode',
    'description': value => {
      if (value === 1) {
        return 'Average';
      } else if (value === 2) {
        return 'CenterWeightedAverage';
      } else if (value === 3) {
        return 'Spot';
      } else if (value === 4) {
        return 'MultiSpot';
      } else if (value === 5) {
        return 'Pattern';
      } else if (value === 6) {
        return 'Partial';
      } else if (value === 255) {
        return 'Other';
      }

      return 'Unknown';
    }
  },
  0x9208: {
    'name': 'LightSource',
    'description': value => {
      if (value === 1) {
        return 'Daylight';
      } else if (value === 2) {
        return 'Fluorescent';
      } else if (value === 3) {
        return 'Tungsten (incandescent light)';
      } else if (value === 4) {
        return 'Flash';
      } else if (value === 9) {
        return 'Fine weather';
      } else if (value === 10) {
        return 'Cloudy weather';
      } else if (value === 11) {
        return 'Shade';
      } else if (value === 12) {
        return 'Daylight fluorescent (D 5700 – 7100K)';
      } else if (value === 13) {
        return 'Day white fluorescent (N 4600 – 5400K)';
      } else if (value === 14) {
        return 'Cool white fluorescent (W 3900 – 4500K)';
      } else if (value === 15) {
        return 'White fluorescent (WW 3200 – 3700K)';
      } else if (value === 17) {
        return 'Standard light A';
      } else if (value === 18) {
        return 'Standard light B';
      } else if (value === 19) {
        return 'Standard light C';
      } else if (value === 20) {
        return 'D55';
      } else if (value === 21) {
        return 'D65';
      } else if (value === 22) {
        return 'D75';
      } else if (value === 23) {
        return 'D50';
      } else if (value === 24) {
        return 'ISO studio tungsten';
      } else if (value === 255) {
        return 'Other light source';
      }

      return 'Unknown';
    }
  },
  0x9209: {
    'name': 'Flash',
    'description': value => {
      if (value === 0x00) {
        return 'Flash did not fire';
      } else if (value === 0x01) {
        return 'Flash fired';
      } else if (value === 0x05) {
        return 'Strobe return light not detected';
      } else if (value === 0x07) {
        return 'Strobe return light detected';
      } else if (value === 0x09) {
        return 'Flash fired, compulsory flash mode';
      } else if (value === 0x0d) {
        return 'Flash fired, compulsory flash mode, return light not detected';
      } else if (value === 0x0f) {
        return 'Flash fired, compulsory flash mode, return light detected';
      } else if (value === 0x10) {
        return 'Flash did not fire, compulsory flash mode';
      } else if (value === 0x18) {
        return 'Flash did not fire, auto mode';
      } else if (value === 0x19) {
        return 'Flash fired, auto mode';
      } else if (value === 0x1d) {
        return 'Flash fired, auto mode, return light not detected';
      } else if (value === 0x1f) {
        return 'Flash fired, auto mode, return light detected';
      } else if (value === 0x20) {
        return 'No flash function';
      } else if (value === 0x41) {
        return 'Flash fired, red-eye reduction mode';
      } else if (value === 0x45) {
        return 'Flash fired, red-eye reduction mode, return light not detected';
      } else if (value === 0x47) {
        return 'Flash fired, red-eye reduction mode, return light detected';
      } else if (value === 0x49) {
        return 'Flash fired, compulsory flash mode, red-eye reduction mode';
      } else if (value === 0x4d) {
        return 'Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected';
      } else if (value === 0x4f) {
        return 'Flash fired, compulsory flash mode, red-eye reduction mode, return light detected';
      } else if (value === 0x59) {
        return 'Flash fired, auto mode, red-eye reduction mode';
      } else if (value === 0x5d) {
        return 'Flash fired, auto mode, return light not detected, red-eye reduction mode';
      } else if (value === 0x5f) {
        return 'Flash fired, auto mode, return light detected, red-eye reduction mode';
      }

      return 'Unknown';
    }
  },
  0x920a: 'FocalLength',
  0x9214: {
    'name': 'SubjectArea',
    'description': value => {
      if (value.length === 2) {
        return `Location; X: ${value[0]}, Y: ${value[1]}`;
      } else if (value.length === 3) {
        return `Circle; X: ${value[0]}, Y: ${value[1]}, diameter: ${value[2]}`;
      } else if (value.length === 4) {
        return `Rectangle; X: ${value[0]}, Y: ${value[1]}, width: ${value[2]}, height: ${value[3]}`;
      }

      return 'Unknown';
    }
  },
  0x927c: {
    'name': 'MakerNote',
    'description': () => '[Raw maker note data]'
  },
  0x9286: {
    'name': 'UserComment',
    'description': _tagNamesUtils.getEncodedString
  },
  0x9290: 'SubSecTime',
  0x9291: 'SubSecTimeOriginal',
  0x9292: 'SubSecTimeDigitized',
  0xa000: {
    'name': 'FlashpixVersion',
    'description': value => value.map(charCode => String.fromCharCode(charCode)).join('')
  },
  0xa001: {
    'name': 'ColorSpace',
    'description': value => {
      if (value === 1) {
        return 'sRGB';
      } else if (value === 0xffff) {
        return 'Uncalibrated';
      }

      return 'Unknown';
    }
  },
  0xa002: 'PixelXDimension',
  0xa003: 'PixelYDimension',
  0xa004: 'RelatedSoundFile',
  0xa005: 'Interoperability IFD Pointer',
  0xa20b: 'FlashEnergy',
  0xa20c: {
    'name': 'SpatialFrequencyResponse',
    'description': () => '[Raw SFR table data]'
  },
  0xa20e: 'FocalPlaneXResolution',
  0xa20f: 'FocalPlaneYResolution',
  0xa210: {
    'name': 'FocalPlaneResolutionUnit',
    'description': value => {
      if (value === 2) {
        return 'inches';
      } else if (value === 3) {
        return 'centimeters';
      }

      return 'Unknown';
    }
  },
  0xa214: {
    'name': 'SubjectLocation',
    'description': ([x, y]) => `X: ${x}, Y: ${y}`
  },
  0xa215: 'ExposureIndex',
  0xa217: {
    'name': 'SensingMethod',
    'description': value => {
      if (value === 1) {
        return 'Undefined';
      } else if (value === 2) {
        return 'One-chip color area sensor';
      } else if (value === 3) {
        return 'Two-chip color area sensor';
      } else if (value === 4) {
        return 'Three-chip color area sensor';
      } else if (value === 5) {
        return 'Color sequential area sensor';
      } else if (value === 7) {
        return 'Trilinear sensor';
      } else if (value === 8) {
        return 'Color sequential linear sensor';
      }

      return 'Unknown';
    }
  },
  0xa300: {
    'name': 'FileSource',
    'description': value => {
      if (value === 3) {
        return 'DSC';
      }

      return 'Unknown';
    }
  },
  0xa301: {
    'name': 'SceneType',
    'description': value => {
      if (value === 1) {
        return 'A directly photographed image';
      }

      return 'Unknown';
    }
  },
  0xa302: {
    'name': 'CFAPattern',
    'description': () => '[Raw CFA pattern table data]'
  },
  0xa401: {
    'name': 'CustomRendered',
    'description': value => {
      if (value === 0) {
        return 'Normal process';
      } else if (value === 1) {
        return 'Custom process';
      }

      return 'Unknown';
    }
  },
  0xa402: {
    'name': 'ExposureMode',
    'description': value => {
      if (value === 0) {
        return 'Auto exposure';
      } else if (value === 1) {
        return 'Manual exposure';
      } else if (value === 2) {
        return 'Auto bracket';
      }

      return 'Unknown';
    }
  },
  0xa403: {
    'name': 'WhiteBalance',
    'description': value => {
      if (value === 0) {
        return 'Auto white balance';
      } else if (value === 1) {
        return 'Manual white balance';
      }

      return 'Unknown';
    }
  },
  0xa404: {
    'name': 'DigitalZoomRatio',
    'description': value => {
      if (value === 0) {
        return 'Digital zoom was not used';
      }

      return value;
    }
  },
  0xa405: {
    'name': 'FocalLengthIn35mmFilm',
    'description': value => {
      if (value === 0) {
        return 'Unknown';
      }

      return value;
    }
  },
  0xa406: {
    'name': 'SceneCaptureType',
    'description': value => {
      if (value === 0) {
        return 'Standard';
      } else if (value === 1) {
        return 'Landscape';
      } else if (value === 2) {
        return 'Portrait';
      } else if (value === 3) {
        return 'Night scene';
      }

      return 'Unknown';
    }
  },
  0xa407: {
    'name': 'GainControl',
    'description': value => {
      if (value === 0) {
        return 'None';
      } else if (value === 1) {
        return 'Low gain up';
      } else if (value === 2) {
        return 'High gain up';
      } else if (value === 3) {
        return 'Low gain down';
      } else if (value === 4) {
        return 'High gain down';
      }

      return 'Unknown';
    }
  },
  0xa408: {
    'name': 'Contrast',
    'description': value => {
      if (value === 0) {
        return 'Normal';
      } else if (value === 1) {
        return 'Soft';
      } else if (value === 2) {
        return 'Hard';
      }

      return 'Unknown';
    }
  },
  0xa409: {
    'name': 'Saturation',
    'description': value => {
      if (value === 0) {
        return 'Normal';
      } else if (value === 1) {
        return 'Low saturation';
      } else if (value === 2) {
        return 'High saturation';
      }

      return 'Unknown';
    }
  },
  0xa40a: {
    'name': 'Sharpness',
    'description': value => {
      if (value === 0) {
        return 'Normal';
      } else if (value === 1) {
        return 'Soft';
      } else if (value === 2) {
        return 'Hard';
      }

      return 'Unknown';
    }
  },
  0xa40b: {
    'name': 'DeviceSettingDescription',
    'description': () => '[Raw device settings table data]'
  },
  0xa40c: {
    'name': 'SubjectDistanceRange',
    'description': value => {
      if (value === 1) {
        return 'Macro';
      } else if (value === 2) {
        return 'Close view';
      } else if (value === 3) {
        return 'Distant view';
      }

      return 'Unknown';
    }
  },
  0xa420: 'ImageUniqueID'
};
exports.default = _default;
},{"./tag-names-utils":"../node_modules/exifreader/src/tag-names-utils.js"}],"../node_modules/exifreader/src/tag-names-gps-ifd.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagNamesUtils = require("./tag-names-utils");

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
var _default = {
  0x0000: {
    'name': 'GPSVersionID',
    'description': value => {
      if (value[0] === 2 && value[1] === 2 && value[2] === 0 && value[3] === 0) {
        return 'Version 2.2';
      }

      return 'Unknown';
    }
  },
  0x0001: {
    'name': 'GPSLatitudeRef',
    'description': value => {
      const ref = value.join('');

      if (ref === 'N') {
        return 'North latitude';
      } else if (ref === 'S') {
        return 'South latitude';
      }

      return 'Unknown';
    }
  },
  0x0002: {
    'name': 'GPSLatitude',
    'description': value => {
      return value[0] + value[1] / 60 + value[2] / 3600;
    }
  },
  0x0003: {
    'name': 'GPSLongitudeRef',
    'description': value => {
      const ref = value.join('');

      if (ref === 'E') {
        return 'East longitude';
      } else if (ref === 'W') {
        return 'West longitude';
      }

      return 'Unknown';
    }
  },
  0x0004: {
    'name': 'GPSLongitude',
    'description': value => {
      return value[0] + value[1] / 60 + value[2] / 3600;
    }
  },
  0x0005: {
    'name': 'GPSAltitudeRef',
    'description': value => {
      if (value === 0) {
        return 'Sea level';
      } else if (value === 1) {
        return 'Sea level reference (negative value)';
      }

      return 'Unknown';
    }
  },
  0x0006: {
    'name': 'GPSAltitude',
    'description': value => {
      return value + ' m';
    }
  },
  0x0007: {
    'name': 'GPSTimeStamp',
    'description': value => {
      return value.map(num => {
        if (`${num}`.length === 1) {
          return `0${num}`;
        }

        return num;
      }).join(':');
    }
  },
  0x0008: 'GPSSatellites',
  0x0009: {
    'name': 'GPSStatus',
    'description': value => {
      const status = value.join('');

      if (status === 'A') {
        return 'Measurement in progress';
      } else if (status === 'V') {
        return 'Measurement Interoperability';
      }

      return 'Unknown';
    }
  },
  0x000a: {
    'name': 'GPSMeasureMode',
    'description': value => {
      const mode = value.join('');

      if (mode === '2') {
        return '2-dimensional measurement';
      } else if (mode === '3') {
        return '3-dimensional measurement';
      }

      return 'Unknown';
    }
  },
  0x000b: 'GPSDOP',
  0x000c: {
    'name': 'GPSSpeedRef',
    'description': value => {
      const ref = value.join('');

      if (ref === 'K') {
        return 'Kilometers per hour';
      } else if (ref === 'M') {
        return 'Miles per hour';
      } else if (ref === 'N') {
        return 'Knots';
      }

      return 'Unknown';
    }
  },
  0x000d: 'GPSSpeed',
  0x000e: {
    'name': 'GPSTrackRef',
    'description': value => {
      const ref = value.join('');

      if (ref === 'T') {
        return 'True direction';
      } else if (ref === 'M') {
        return 'Magnetic direction';
      }

      return 'Unknown';
    }
  },
  0x000f: 'GPSTrack',
  0x0010: {
    'name': 'GPSImgDirectionRef',
    'description': value => {
      const ref = value.join('');

      if (ref === 'T') {
        return 'True direction';
      } else if (ref === 'M') {
        return 'Magnetic direction';
      }

      return 'Unknown';
    }
  },
  0x0011: 'GPSImgDirection',
  0x0012: 'GPSMapDatum',
  0x0013: {
    'name': 'GPSDestLatitudeRef',
    'description': value => {
      const ref = value.join('');

      if (ref === 'N') {
        return 'North latitude';
      } else if (ref === 'S') {
        return 'South latitude';
      }

      return 'Unknown';
    }
  },
  0x0014: {
    'name': 'GPSDestLatitude',
    'description': value => {
      return value[0] + value[1] / 60 + value[2] / 3600;
    }
  },
  0x0015: {
    'name': 'GPSDestLongitudeRef',
    'description': value => {
      const ref = value.join('');

      if (ref === 'E') {
        return 'East longitude';
      } else if (ref === 'W') {
        return 'West longitude';
      }

      return 'Unknown';
    }
  },
  0x0016: {
    'name': 'GPSDestLongitude',
    'description': value => {
      return value[0] + value[1] / 60 + value[2] / 3600;
    }
  },
  0x0017: {
    'name': 'GPSDestBearingRef',
    'description': value => {
      const ref = value.join('');

      if (ref === 'T') {
        return 'True direction';
      } else if (ref === 'M') {
        return 'Magnetic direction';
      }

      return 'Unknown';
    }
  },
  0x0018: 'GPSDestBearing',
  0x0019: {
    'name': 'GPSDestDistanceRef',
    'description': value => {
      const ref = value.join('');

      if (ref === 'K') {
        return 'Kilometers';
      } else if (ref === 'M') {
        return 'Miles';
      } else if (ref === 'N') {
        return 'Knots';
      }

      return 'Unknown';
    }
  },
  0x001a: 'GPSDestDistance',
  0x001b: {
    'name': 'GPSProcessingMethod',
    'description': _tagNamesUtils.getEncodedString
  },
  0x001c: {
    'name': 'GPSAreaInformation',
    'description': _tagNamesUtils.getEncodedString
  },
  0x001d: 'GPSDateStamp',
  0x001e: {
    'name': 'GPSDifferential',
    'description': value => {
      if (value === 0) {
        return 'Measurement without differential correction';
      } else if (value === 1) {
        return 'Differential correction applied';
      }

      return 'Unknown';
    }
  }
};
exports.default = _default;
},{"./tag-names-utils":"../node_modules/exifreader/src/tag-names-utils.js"}],"../node_modules/exifreader/src/tag-names-interoperability-ifd.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
var _default = {
  0x0001: 'InteroperabilityIndex'
};
exports.default = _default;
},{}],"../node_modules/exifreader/src/tag-names.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagNames0thIfd = _interopRequireDefault(require("./tag-names-0th-ifd"));

var _tagNamesExifIfd = _interopRequireDefault(require("./tag-names-exif-ifd"));

var _tagNamesGpsIfd = _interopRequireDefault(require("./tag-names-gps-ifd"));

var _tagNamesInteroperabilityIfd = _interopRequireDefault(require("./tag-names-interoperability-ifd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
var _default = {
  '0th': _tagNames0thIfd.default,
  'exif': _tagNamesExifIfd.default,
  'gps': _tagNamesGpsIfd.default,
  'interoperability': _tagNamesInteroperabilityIfd.default
};
exports.default = _default;
},{"./tag-names-0th-ifd":"../node_modules/exifreader/src/tag-names-0th-ifd.js","./tag-names-exif-ifd":"../node_modules/exifreader/src/tag-names-exif-ifd.js","./tag-names-gps-ifd":"../node_modules/exifreader/src/tag-names-gps-ifd.js","./tag-names-interoperability-ifd":"../node_modules/exifreader/src/tag-names-interoperability-ifd.js"}],"../node_modules/exifreader/src/tags.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _byteOrder = _interopRequireDefault(require("./byte-order"));

var _types = _interopRequireDefault(require("./types"));

var _tagNames = _interopRequireDefault(require("./tag-names"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
const EXIF_IFD_POINTER_KEY = 'Exif IFD Pointer';
const GPS_INFO_IFD_POINTER_KEY = 'GPS Info IFD Pointer';
const INTEROPERABILITY_IFD_POINTER_KEY = 'Interoperability IFD Pointer';
const getTagValueAt = {
  1: _types.default.getByteAt,
  2: _types.default.getAsciiAt,
  3: _types.default.getShortAt,
  4: _types.default.getLongAt,
  5: _types.default.getRationalAt,
  7: _types.default.getUndefinedAt,
  9: _types.default.getSlongAt,
  10: _types.default.getSrationalAt
};
var _default = {
  read
};
exports.default = _default;

function read(dataView, tiffHeaderOffset) {
  const byteOrder = _byteOrder.default.getByteOrder(dataView, tiffHeaderOffset);

  let tags = read0thIfd(dataView, tiffHeaderOffset, byteOrder);
  tags = readExifIfd(tags, dataView, tiffHeaderOffset, byteOrder);
  tags = readGpsIfd(tags, dataView, tiffHeaderOffset, byteOrder);
  tags = readInteroperabilityIfd(tags, dataView, tiffHeaderOffset, byteOrder);
  return tags;
}

function read0thIfd(dataView, tiffHeaderOffset, byteOrder) {
  return readIfd(dataView, '0th', tiffHeaderOffset, get0thIfdOffset(dataView, tiffHeaderOffset, byteOrder), byteOrder);
}

function get0thIfdOffset(dataView, tiffHeaderOffset, byteOrder) {
  return tiffHeaderOffset + _types.default.getLongAt(dataView, tiffHeaderOffset + 4, byteOrder);
}

function readExifIfd(tags, dataView, tiffHeaderOffset, byteOrder) {
  if (tags[EXIF_IFD_POINTER_KEY] !== undefined) {
    return Object.assign(tags, readIfd(dataView, 'exif', tiffHeaderOffset, tiffHeaderOffset + tags[EXIF_IFD_POINTER_KEY].value, byteOrder));
  }

  return tags;
}

function readGpsIfd(tags, dataView, tiffHeaderOffset, byteOrder) {
  if (tags[GPS_INFO_IFD_POINTER_KEY] !== undefined) {
    return Object.assign(tags, readIfd(dataView, 'gps', tiffHeaderOffset, tiffHeaderOffset + tags[GPS_INFO_IFD_POINTER_KEY].value, byteOrder));
  }

  return tags;
}

function readInteroperabilityIfd(tags, dataView, tiffHeaderOffset, byteOrder) {
  if (tags[INTEROPERABILITY_IFD_POINTER_KEY] !== undefined) {
    return Object.assign(tags, readIfd(dataView, 'interoperability', tiffHeaderOffset, tiffHeaderOffset + tags[INTEROPERABILITY_IFD_POINTER_KEY].value, byteOrder));
  }

  return tags;
}

function readIfd(dataView, ifdType, tiffHeaderOffset, offset, byteOrder) {
  const FIELD_COUNT_SIZE = _types.default.getTypeSize('SHORT');

  const FIELD_SIZE = 12;
  const tags = {};

  const numberOfFields = _types.default.getShortAt(dataView, offset, byteOrder);

  offset += FIELD_COUNT_SIZE;

  for (let fieldIndex = 0; fieldIndex < numberOfFields; fieldIndex++) {
    const tag = readTag(dataView, ifdType, tiffHeaderOffset, offset, byteOrder);

    if (tag !== undefined) {
      tags[tag.name] = {
        'id': tag.id,
        'value': tag.value,
        'description': tag.description
      };
    }

    offset += FIELD_SIZE;
  }

  return tags;
}

function readTag(dataView, ifdType, tiffHeaderOffset, offset, byteOrder) {
  const TAG_TYPE_OFFSET = _types.default.getTypeSize('SHORT');

  const TAG_COUNT_OFFSET = TAG_TYPE_OFFSET + _types.default.getTypeSize('SHORT');

  const TAG_VALUE_OFFSET = TAG_COUNT_OFFSET + _types.default.getTypeSize('LONG');

  const tagCode = _types.default.getShortAt(dataView, offset, byteOrder);

  const tagType = _types.default.getShortAt(dataView, offset + TAG_TYPE_OFFSET, byteOrder);

  const tagCount = _types.default.getLongAt(dataView, offset + TAG_COUNT_OFFSET, byteOrder);

  let tagValue;

  if (_types.default.typeSizes[tagType] === undefined) {
    return undefined;
  }

  if (tagValueFitsInOffsetSlot(tagType, tagCount)) {
    tagValue = getTagValue(dataView, offset + TAG_VALUE_OFFSET, tagType, tagCount, byteOrder);
  } else {
    const tagValueOffset = _types.default.getLongAt(dataView, offset + TAG_VALUE_OFFSET, byteOrder);

    if (tagValueFitsInDataView(dataView, tiffHeaderOffset, tagValueOffset, tagType, tagCount)) {
      tagValue = getTagValue(dataView, tiffHeaderOffset + tagValueOffset, tagType, tagCount, byteOrder);
    } else {
      tagValue = '<faulty value>';
    }
  }

  if (tagType === _types.default.tagTypes['ASCII']) {
    tagValue = splitNullSeparatedAsciiString(tagValue);
    tagValue = decodeAsciiValue(tagValue);
  }

  if (_tagNames.default[ifdType][tagCode] !== undefined) {
    let tagName, tagDescription;

    if (_tagNames.default[ifdType][tagCode]['name'] !== undefined && _tagNames.default[ifdType][tagCode]['description'] !== undefined) {
      tagName = _tagNames.default[ifdType][tagCode]['name'];
      tagDescription = _tagNames.default[ifdType][tagCode]['description'](tagValue);
    } else {
      tagName = _tagNames.default[ifdType][tagCode];

      if (tagValue instanceof Array) {
        tagDescription = tagValue.join(', ');
      } else {
        tagDescription = tagValue;
      }
    }

    return {
      id: tagCode,
      name: tagName,
      value: tagValue,
      description: tagDescription
    };
  }

  return {
    id: tagCode,
    name: `undefined-${tagCode}`,
    value: tagValue,
    description: tagValue
  };
}

function tagValueFitsInOffsetSlot(tagType, tagCount) {
  return _types.default.typeSizes[tagType] * tagCount <= _types.default.getTypeSize('LONG');
}

function getTagValue(dataView, offset, type, count, byteOrder) {
  let value = [];

  for (let valueIndex = 0; valueIndex < count; valueIndex++) {
    value.push(getTagValueAt[type](dataView, offset, byteOrder));
    offset += _types.default.typeSizes[type];
  }

  if (type === _types.default.tagTypes['ASCII']) {
    value = _types.default.getAsciiValue(value);
  } else if (value.length === 1) {
    value = value[0];
  }

  return value;
}

function tagValueFitsInDataView(dataView, tiffHeaderOffset, tagValueOffset, tagType, tagCount) {
  return tiffHeaderOffset + tagValueOffset + _types.default.typeSizes[tagType] * tagCount <= dataView.byteLength;
}

function splitNullSeparatedAsciiString(string) {
  const tagValue = [];
  let i = 0;

  for (const character of string) {
    if (character === '\x00') {
      i++;
      continue;
    }

    if (tagValue[i] === undefined) {
      tagValue[i] = '';
    }

    tagValue[i] += character;
  }

  return tagValue;
}

function decodeAsciiValue(asciiValue) {
  try {
    return asciiValue.map(value => decodeURIComponent(escape(value)));
  } catch (error) {
    return asciiValue;
  }
}
},{"./byte-order":"../node_modules/exifreader/src/byte-order.js","./types":"../node_modules/exifreader/src/types.js","./tag-names":"../node_modules/exifreader/src/tag-names.js"}],"../node_modules/exifreader/src/file-tags.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = _interopRequireDefault(require("./types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
var _default = {
  read
};
exports.default = _default;

function read(dataView, fileDataOffset) {
  const length = getLength(dataView, fileDataOffset);
  const numberOfColorComponents = getNumberOfColorComponents(dataView, fileDataOffset, length);
  return {
    'Bits Per Sample': getDataPrecision(dataView, fileDataOffset, length),
    'Image Height': getImageHeight(dataView, fileDataOffset, length),
    'Image Width': getImageWidth(dataView, fileDataOffset, length),
    'Color Components': numberOfColorComponents,
    'Subsampling': numberOfColorComponents && getSubsampling(dataView, fileDataOffset, numberOfColorComponents.value, length)
  };
}

function getLength(dataView, fileDataOffset) {
  return _types.default.getShortAt(dataView, fileDataOffset);
}

function getDataPrecision(dataView, fileDataOffset, length) {
  const OFFSET = 2;
  const SIZE = 1;

  if (OFFSET + SIZE > length) {
    return undefined;
  }

  const value = _types.default.getByteAt(dataView, fileDataOffset + OFFSET);

  return {
    value,
    description: '' + value
  };
}

function getImageHeight(dataView, fileDataOffset, length) {
  const OFFSET = 3;
  const SIZE = 2;

  if (OFFSET + SIZE > length) {
    return undefined;
  }

  const value = _types.default.getShortAt(dataView, fileDataOffset + OFFSET);

  return {
    value,
    description: `${value}px`
  };
}

function getImageWidth(dataView, fileDataOffset, length) {
  const OFFSET = 5;
  const SIZE = 2;

  if (OFFSET + SIZE > length) {
    return undefined;
  }

  const value = _types.default.getShortAt(dataView, fileDataOffset + OFFSET);

  return {
    value,
    description: `${value}px`
  };
}

function getNumberOfColorComponents(dataView, fileDataOffset, length) {
  const OFFSET = 7;
  const SIZE = 1;

  if (OFFSET + SIZE > length) {
    return undefined;
  }

  const value = _types.default.getByteAt(dataView, fileDataOffset + OFFSET);

  return {
    value,
    description: '' + value
  };
}

function getSubsampling(dataView, fileDataOffset, numberOfColorComponents, length) {
  const OFFSET = 8;
  const SIZE = 3 * numberOfColorComponents;

  if (OFFSET + SIZE > length) {
    return undefined;
  }

  const components = [];

  for (let i = 0; i < numberOfColorComponents; i++) {
    const componentOffset = fileDataOffset + OFFSET + i * 3;
    components.push([_types.default.getByteAt(dataView, componentOffset), _types.default.getByteAt(dataView, componentOffset + 1), _types.default.getByteAt(dataView, componentOffset + 2)]);
  }

  return {
    value: components,
    description: components.length > 1 ? getComponentIds(components) + getSamplingType(components) : ''
  };
}

function getComponentIds(components) {
  const ids = {
    0x01: 'Y',
    0x02: 'Cb',
    0x03: 'Cr',
    0x04: 'I',
    0x05: 'Q'
  };
  return components.map(compontent => ids[compontent[0]]).join('');
}

function getSamplingType(components) {
  const types = {
    0x11: '4:4:4 (1 1)',
    0x12: '4:4:0 (1 2)',
    0x14: '4:4:1 (1 4)',
    0x21: '4:2:2 (2 1)',
    0x22: '4:2:0 (2 2)',
    0x24: '4:2:1 (2 4)',
    0x41: '4:1:1 (4 1)',
    0x42: '4:1:0 (4 2)'
  };

  if (components.length === 0 || components[0][1] === undefined || types[components[0][1]] === undefined) {
    return '';
  }

  return types[components[0][1]];
}
},{"./types":"../node_modules/exifreader/src/types.js"}],"../node_modules/exifreader/src/iptc-tag-names.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagNamesUtils = require("./tag-names-utils");

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
var _default = {
  'iptc': {
    0x0100: {
      'name': 'Model Version',
      'description': value => {
        return ((value[0] << 8) + value[1]).toString();
      }
    },
    0x0105: {
      'name': 'Destination',
      'repeatable': true
    },
    0x0114: {
      'name': 'File Format',
      'description': value => {
        return ((value[0] << 8) + value[1]).toString();
      }
    },
    0x0116: {
      'name': 'File Format Version',
      'description': value => {
        return ((value[0] << 8) + value[1]).toString();
      }
    },
    0x011e: 'Service Identifier',
    0x0128: 'Envelope Number',
    0x0132: 'Product ID',
    0x013c: 'Envelope Priority',
    0x0146: {
      'name': 'Date Sent',
      'description': getCreationDate
    },
    0x0150: {
      'name': 'Time Sent',
      'description': getCreationTime
    },
    0x015a: {
      'name': 'Coded Character Set',
      'description': getEncodingName,
      'encoding_name': getEncodingName
    },
    0x0164: 'UNO',
    0x0178: {
      'name': 'ARM Identifier',
      'description': value => {
        return ((value[0] << 8) + value[1]).toString();
      }
    },
    0x017a: {
      'name': 'ARM Version',
      'description': value => {
        return ((value[0] << 8) + value[1]).toString();
      }
    },
    0x0200: {
      'name': 'Record Version',
      'description': value => {
        return ((value[0] << 8) + value[1]).toString();
      }
    },
    0x0203: 'Object Type Reference',
    0x0204: 'Object Attribute Reference',
    0x0205: 'Object Name',
    0x0207: 'Edit Status',
    0x0208: {
      'name': 'Editorial Update',
      'description': value => {
        if ((0, _tagNamesUtils.getStringValue)(value) === '01') {
          return 'Additional Language';
        }

        return 'Unknown';
      }
    },
    0x020a: 'Urgency',
    0x020c: {
      'name': 'Subject Reference',
      'repeatable': true,
      'description': value => {
        const parts = (0, _tagNamesUtils.getStringValue)(value).split(':');
        return parts[2] + (parts[3] ? '/' + parts[3] : '') + (parts[4] ? '/' + parts[4] : '');
      }
    },
    0x020f: 'Category',
    0x0214: {
      'name': 'Supplemental Category',
      'repeatable': true
    },
    0x0216: 'Fixture Identifier',
    0x0219: {
      'name': 'Keywords',
      'repeatable': true
    },
    0x021a: {
      'name': 'Content Location Code',
      'repeatable': true
    },
    0x021b: {
      'name': 'Content Location Name',
      'repeatable': true
    },
    0x021e: 'Release Date',
    0x0223: 'Release Time',
    0x0225: 'Expiration Date',
    0x0226: 'Expiration Time',
    0x0228: 'Special Instructions',
    0x022a: {
      'name': 'Action Advised',
      'description': value => {
        const string = (0, _tagNamesUtils.getStringValue)(value);

        if (string === '01') {
          return 'Object Kill';
        } else if (string === '02') {
          return 'Object Replace';
        } else if (string === '03') {
          return 'Object Append';
        } else if (string === '04') {
          return 'Object Reference';
        }

        return 'Unknown';
      }
    },
    0x022d: {
      'name': 'Reference Service',
      'repeatable': true
    },
    0x022f: {
      'name': 'Reference Date',
      'repeatable': true
    },
    0x0232: {
      'name': 'Reference Number',
      'repeatable': true
    },
    0x0237: {
      'name': 'Date Created',
      'description': getCreationDate
    },
    0x023c: {
      'name': 'Time Created',
      'description': getCreationTime
    },
    0x023e: {
      'name': 'Digital Creation Date',
      'description': getCreationDate
    },
    0x023f: {
      'name': 'Digital Creation Time',
      'description': getCreationTime
    },
    0x0241: 'Originating Program',
    0x0246: 'Program Version',
    0x024b: {
      'name': 'Object Cycle',
      'description': value => {
        const string = (0, _tagNamesUtils.getStringValue)(value);

        if (string === 'a') {
          return 'morning';
        } else if (string === 'p') {
          return 'evening';
        } else if (string === 'b') {
          return 'both';
        }

        return 'Unknown';
      }
    },
    0x0250: {
      'name': 'By-line',
      'repeatable': true
    },
    0x0255: {
      'name': 'By-line Title',
      'repeatable': true
    },
    0x025a: 'City',
    0x025c: 'Sub-location',
    0x025f: 'Province/State',
    0x0264: 'Country/Primary Location Code',
    0x0265: 'Country/Primary Location Name',
    0x0267: 'Original Transmission Reference',
    0x0269: 'Headline',
    0x026e: 'Credit',
    0x0273: 'Source',
    0x0274: 'Copyright Notice',
    0x0276: {
      'name': 'Contact',
      'repeatable': true
    },
    0x0278: 'Caption/Abstract',
    0x027a: {
      'name': 'Writer/Editor',
      'repeatable': true
    },
    0x027d: {
      'name': 'Rasterized Caption',
      'description': value => value
    },
    0x0282: 'Image Type',
    0x0283: {
      'name': 'Image Orientation',
      'description': value => {
        const string = (0, _tagNamesUtils.getStringValue)(value);

        if (string === 'P') {
          return 'Portrait';
        } else if (string === 'L') {
          return 'Landscape';
        } else if (string === 'S') {
          return 'Square';
        }

        return 'Unknown';
      }
    },
    0x0287: 'Language Identifier',
    0x0296: {
      'name': 'Audio Type',
      'description': value => {
        const stringValue = (0, _tagNamesUtils.getStringValue)(value);
        const character0 = stringValue.charAt(0);
        const character1 = stringValue.charAt(1);
        let description = '';

        if (character0 === '1') {
          description += 'Mono';
        } else if (character0 === '2') {
          description += 'Stereo';
        }

        if (character1 === 'A') {
          description += ', actuality';
        } else if (character1 === 'C') {
          description += ', question and answer session';
        } else if (character1 === 'M') {
          description += ', music, transmitted by itself';
        } else if (character1 === 'Q') {
          description += ', response to a question';
        } else if (character1 === 'R') {
          description += ', raw sound';
        } else if (character1 === 'S') {
          description += ', scener';
        } else if (character1 === 'V') {
          description += ', voicer';
        } else if (character1 === 'W') {
          description += ', wrap';
        }

        if (description !== '') {
          return description;
        }

        return stringValue;
      }
    },
    0x0297: {
      'name': 'Audio Sampling Rate',
      'description': value => parseInt((0, _tagNamesUtils.getStringValue)(value), 10) + ' Hz'
    },
    0x0298: {
      'name': 'Audio Sampling Resolution',
      'description': value => {
        const bits = parseInt((0, _tagNamesUtils.getStringValue)(value), 10);
        return bits + (bits === 1 ? ' bit' : ' bits');
      }
    },
    0x0299: {
      'name': 'Audio Duration',
      'description': value => {
        const duration = (0, _tagNamesUtils.getStringValue)(value);

        if (duration.length >= 6) {
          return duration.substr(0, 2) + ':' + duration.substr(2, 2) + ':' + duration.substr(4, 2);
        }

        return duration;
      }
    },
    0x029a: 'Audio Outcue',
    0x02ba: 'Short Document ID',
    0x02bb: 'Unique Document ID',
    0x02bc: 'Owner ID',
    0x02c8: {
      'name': value => {
        return value.length === 2 ? 'ObjectData Preview File Format' : 'Record 2 destination';
      },
      'description': value => {
        if (value.length === 2) {
          const intValue = (value[0] << 8) + value[1];

          if (intValue === 0) {
            return 'No ObjectData';
          } else if (intValue === 1) {
            return 'IPTC-NAA Digital Newsphoto Parameter Record';
          } else if (intValue === 2) {
            return 'IPTC7901 Recommended Message Format';
          } else if (intValue === 3) {
            return 'Tagged Image File Format (Adobe/Aldus Image data)';
          } else if (intValue === 4) {
            return 'Illustrator (Adobe Graphics data)';
          } else if (intValue === 5) {
            return 'AppleSingle (Apple Computer Inc)';
          } else if (intValue === 6) {
            return 'NAA 89-3 (ANPA 1312)';
          } else if (intValue === 7) {
            return 'MacBinary II';
          } else if (intValue === 8) {
            return 'IPTC Unstructured Character Oriented File Format (UCOFF)';
          } else if (intValue === 9) {
            return 'United Press International ANPA 1312 variant';
          } else if (intValue === 10) {
            return 'United Press International Down-Load Message';
          } else if (intValue === 11) {
            return 'JPEG File Interchange (JFIF)';
          } else if (intValue === 12) {
            return 'Photo-CD Image-Pac (Eastman Kodak)';
          } else if (intValue === 13) {
            return 'Microsoft Bit Mapped Graphics File [*.BMP]';
          } else if (intValue === 14) {
            return 'Digital Audio File [*.WAV] (Microsoft & Creative Labs)';
          } else if (intValue === 15) {
            return 'Audio plus Moving Video [*.AVI] (Microsoft)';
          } else if (intValue === 16) {
            return 'PC DOS/Windows Executable Files [*.COM][*.EXE]';
          } else if (intValue === 17) {
            return 'Compressed Binary File [*.ZIP] (PKWare Inc)';
          } else if (intValue === 18) {
            return 'Audio Interchange File Format AIFF (Apple Computer Inc)';
          } else if (intValue === 19) {
            return 'RIFF Wave (Microsoft Corporation)';
          } else if (intValue === 20) {
            return 'Freehand (Macromedia/Aldus)';
          } else if (intValue === 21) {
            return 'Hypertext Markup Language "HTML" (The Internet Society)';
          } else if (intValue === 22) {
            return 'MPEG 2 Audio Layer 2 (Musicom), ISO/IEC';
          } else if (intValue === 23) {
            return 'MPEG 2 Audio Layer 3, ISO/IEC';
          } else if (intValue === 24) {
            return 'Portable Document File (*.PDF) Adobe';
          } else if (intValue === 25) {
            return 'News Industry Text Format (NITF)';
          } else if (intValue === 26) {
            return 'Tape Archive (*.TAR)';
          } else if (intValue === 27) {
            return 'Tidningarnas Telegrambyrå NITF version (TTNITF DTD)';
          } else if (intValue === 28) {
            return 'Ritzaus Bureau NITF version (RBNITF DTD)';
          } else if (intValue === 29) {
            return 'Corel Draw [*.CDR]';
          }

          return `Unknown format ${intValue}`;
        }

        return (0, _tagNamesUtils.getStringValue)(value);
      }
    },
    0x02c9: {
      'name': 'ObjectData Preview File Format Version',
      'description': (value, tags) => {
        // Format ID, Version ID, Version Description
        const formatVersions = {
          '00': {
            '00': '1'
          },
          '01': {
            '01': '1',
            '02': '2',
            '03': '3',
            '04': '4'
          },
          '02': {
            '04': '4'
          },
          '03': {
            '01': '5.0',
            '02': '6.0'
          },
          '04': {
            '01': '1.40'
          },
          '05': {
            '01': '2'
          },
          '06': {
            '01': '1'
          },
          '11': {
            '01': '1.02'
          },
          '20': {
            '01': '3.1',
            '02': '4.0',
            '03': '5.0',
            '04': '5.5'
          },
          '21': {
            '02': '2.0'
          }
        };
        const stringValue = (0, _tagNamesUtils.getStringValue)(value);

        if (tags['ObjectData Preview File Format']) {
          const objectDataPreviewFileFormat = (0, _tagNamesUtils.getStringValue)(tags['ObjectData Preview File Format'].value);

          if (formatVersions[objectDataPreviewFileFormat] && formatVersions[objectDataPreviewFileFormat][stringValue]) {
            return formatVersions[objectDataPreviewFileFormat][stringValue];
          }
        }

        return stringValue;
      }
    },
    0x02ca: 'ObjectData Preview Data',
    0x070a: {
      'name': 'Size Mode',
      'description': value => {
        return value[0].toString();
      }
    },
    0x0714: {
      'name': 'Max Subfile Size',
      'description': value => {
        let n = 0;

        for (let i = 0; i < value.length; i++) {
          n = (n << 8) + value[i];
        }

        return n.toString();
      }
    },
    0x075a: {
      'name': 'ObjectData Size Announced',
      'description': value => {
        let n = 0;

        for (let i = 0; i < value.length; i++) {
          n = (n << 8) + value[i];
        }

        return n.toString();
      }
    },
    0x075f: {
      'name': 'Maximum ObjectData Size',
      'description': value => {
        let n = 0;

        for (let i = 0; i < value.length; i++) {
          n = (n << 8) + value[i];
        }

        return n.toString();
      }
    }
  }
};
exports.default = _default;

function getCreationDate(value) {
  const date = (0, _tagNamesUtils.getStringValue)(value);

  if (date.length >= 8) {
    return date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2);
  }

  return date;
}

function getCreationTime(value) {
  const time = (0, _tagNamesUtils.getStringValue)(value);
  let parsedTime = time;

  if (time.length >= 6) {
    parsedTime = time.substr(0, 2) + ':' + time.substr(2, 2) + ':' + time.substr(4, 2);

    if (time.length === 11) {
      parsedTime += time.substr(6, 1) + time.substr(7, 2) + ':' + time.substr(9, 2);
    }
  }

  return parsedTime;
}

function getEncodingName(value) {
  const string = (0, _tagNamesUtils.getStringValue)(value);

  if (string === '\x1b%G') {
    return 'UTF-8';
  } else if (string === '\x1b%5') {
    return 'Windows-1252';
  } else if (string === '\x1b%/G') {
    return 'UTF-8 Level 1';
  } else if (string === '\x1b%/H') {
    return 'UTF-8 Level 2';
  } else if (string === '\x1b%/I') {
    return 'UTF-8 Level 3';
  } else if (string === '\x1B/A') {
    return 'ISO-8859-1';
  } else if (string === '\x1B/B') {
    return 'ISO-8859-2';
  } else if (string === '\x1B/C') {
    return 'ISO-8859-3';
  } else if (string === '\x1B/D') {
    return 'ISO-8859-4';
  } else if (string === '\x1B/@') {
    return 'ISO-8859-5';
  } else if (string === '\x1B/G') {
    return 'ISO-8859-6';
  } else if (string === '\x1B/F') {
    return 'ISO-8859-7';
  } else if (string === '\x1B/H') {
    return 'ISO-8859-8';
  }

  return 'Unknown';
}
},{"./tag-names-utils":"../node_modules/exifreader/src/tag-names-utils.js"}],"../node_modules/exifreader/src/text-decoder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
var _default = {
  get
};
exports.default = _default;

function get() {
  if (typeof TextDecoder !== 'undefined') {
    return TextDecoder;
  }

  return undefined;
}
},{}],"../node_modules/exifreader/src/tag-decoder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _textDecoder = _interopRequireDefault(require("./text-decoder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
const TAG_HEADER_SIZE = 5;
var _default = {
  decode,
  TAG_HEADER_SIZE
};
exports.default = _default;

function decode(encoding, tagValue) {
  const Decoder = _textDecoder.default.get();

  if (typeof Decoder !== 'undefined' && encoding !== undefined) {
    try {
      return new Decoder(encoding).decode(Uint8Array.from(tagValue));
    } catch (error) {// Pass through and fall back to ASCII decoding.
    }
  }

  const stringValue = tagValue.map(charCode => String.fromCharCode(charCode)).join('');
  return decodeAsciiValue(stringValue);
}

function decodeAsciiValue(asciiValue) {
  try {
    return decodeURIComponent(escape(asciiValue));
  } catch (error) {
    return asciiValue;
  }
}
},{"./text-decoder":"../node_modules/exifreader/src/text-decoder.js"}],"../node_modules/exifreader/src/iptc-tags.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _iptcTagNames = _interopRequireDefault(require("./iptc-tag-names"));

var _tagDecoder = _interopRequireDefault(require("./tag-decoder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
const BYTES_8BIM = 0x3842494d;
const BYTES_8BIM_SIZE = 4;
const RESOURCE_BLOCK_HEADER_SIZE = BYTES_8BIM_SIZE + 8;
const NAA_RESOURCE_BLOCK_TYPE = 0x0404;
const TAG_HEADER_SIZE = 5;
var _default = {
  read
};
exports.default = _default;

function read(dataView, dataOffset) {
  try {
    const {
      naaBlock,
      dataOffset: newDataOffset
    } = getNaaResourceBlock(dataView, dataOffset);
    return parseTags(dataView, naaBlock, newDataOffset);
  } catch (error) {
    return {};
  }
}

function getNaaResourceBlock(dataView, dataOffset) {
  while (dataOffset + RESOURCE_BLOCK_HEADER_SIZE <= dataView.byteLength) {
    const resourceBlock = getResourceBlock(dataView, dataOffset);

    if (isNaaResourceBlock(resourceBlock)) {
      return {
        naaBlock: resourceBlock,
        dataOffset
      };
    }

    dataOffset += RESOURCE_BLOCK_HEADER_SIZE + resourceBlock.size + getBlockPadding(resourceBlock);
  }

  throw new Error('No IPTC NAA resource block.');
}

function getResourceBlock(dataView, dataOffset) {
  const RESOURCE_BLOCK_SIZE_OFFSET = 10;

  if (dataView.getUint32(dataOffset, false) !== BYTES_8BIM) {
    throw new Error('Not an IPTC resource block.');
  }

  return {
    type: dataView.getUint16(dataOffset + BYTES_8BIM_SIZE, false),
    size: dataView.getUint16(dataOffset + RESOURCE_BLOCK_SIZE_OFFSET, false)
  };
}

function isNaaResourceBlock(resourceBlock) {
  return resourceBlock.type === NAA_RESOURCE_BLOCK_TYPE;
}

function getBlockPadding(resourceBlock) {
  if (resourceBlock.size % 2 !== 0) {
    return 1;
  }

  return 0;
}

function parseTags(dataView, naaBlock, dataOffset) {
  const tags = {};
  let encoding = undefined;
  dataOffset += RESOURCE_BLOCK_HEADER_SIZE;
  const endOfBlockOffset = dataOffset + naaBlock['size'];

  while (dataOffset < endOfBlockOffset && dataOffset < dataView.byteLength) {
    const {
      tag,
      tagSize
    } = readTag(dataView, dataOffset, tags, encoding);

    if (tag === null) {
      break;
    }

    if ('encoding' in tag) {
      encoding = tag.encoding;
    }

    if (tags[tag.name] === undefined || tag['repeatable'] === undefined) {
      tags[tag.name] = {
        id: tag.id,
        value: tag.value,
        description: tag.description
      };
    } else {
      if (!(tags[tag.name] instanceof Array)) {
        tags[tag.name] = [{
          id: tags[tag.name].id,
          value: tags[tag.name].value,
          description: tags[tag.name].description
        }];
      }

      tags[tag.name].push({
        id: tag.id,
        value: tag.value,
        description: tag.description
      });
    }

    dataOffset += TAG_HEADER_SIZE + tagSize;
  }

  return tags;
}

function readTag(dataView, dataOffset, tags, encoding) {
  const TAG_CODE_OFFSET = 1;
  const TAG_SIZE_OFFSET = 3;

  if (leadByteIsMissing(dataView, dataOffset)) {
    return {
      tag: null,
      tagSize: 0
    };
  }

  const tagCode = dataView.getUint16(dataOffset + TAG_CODE_OFFSET, false);
  const tagSize = dataView.getUint16(dataOffset + TAG_SIZE_OFFSET, false);
  const tagValue = getTagValue(dataView, dataOffset + TAG_HEADER_SIZE, tagSize);
  const tag = {
    id: tagCode,
    name: getTagName(_iptcTagNames.default['iptc'][tagCode], tagCode, tagValue),
    value: tagValue,
    description: getTagDescription(_iptcTagNames.default['iptc'][tagCode], tagValue, tags, encoding)
  };

  if (tagIsRepeatable(tagCode)) {
    tag['repeatable'] = true;
  }

  if (tagContainsEncoding(tagCode)) {
    tag['encoding'] = _iptcTagNames.default['iptc'][tagCode]['encoding_name'](tagValue);
  }

  return {
    tag,
    tagSize
  };
}

function leadByteIsMissing(dataView, dataOffset) {
  const TAG_LEAD_BYTE = 0x1c;
  return dataView.getUint8(dataOffset) !== TAG_LEAD_BYTE;
}

function getTagValue(dataView, offset, size) {
  const value = [];

  for (let valueIndex = 0; valueIndex < size; valueIndex++) {
    value.push(dataView.getUint8(offset + valueIndex));
  }

  return value;
}

function getTagName(tag, tagCode, tagValue) {
  if (!tag) {
    return `undefined-${tagCode}`;
  }

  if (tagIsName(tag)) {
    return tag;
  }

  if (hasDynamicName(tag)) {
    return tag['name'](tagValue);
  }

  return tag['name'];
}

function tagIsName(tag) {
  return typeof tag === 'string';
}

function hasDynamicName(tag) {
  return typeof tag['name'] === 'function';
}

function getTagDescription(tag, tagValue, tags, encoding) {
  if (hasDescriptionProperty(tag)) {
    return tag['description'](tagValue, tags);
  }

  if (tagValueIsText(tag, tagValue)) {
    return _tagDecoder.default.decode(encoding, tagValue);
  }

  return tagValue;
}

function tagValueIsText(tag, tagValue) {
  return tag && tagValue instanceof Array;
}

function hasDescriptionProperty(tag) {
  return tag && tag['description'] !== undefined;
}

function tagIsRepeatable(tagCode) {
  return _iptcTagNames.default['iptc'][tagCode] && _iptcTagNames.default['iptc'][tagCode]['repeatable'];
}

function tagContainsEncoding(tagCode) {
  return _iptcTagNames.default['iptc'][tagCode] && _iptcTagNames.default['iptc'][tagCode]['encoding_name'] !== undefined;
}
},{"./iptc-tag-names":"../node_modules/exifreader/src/iptc-tag-names.js","./tag-decoder":"../node_modules/exifreader/src/tag-decoder.js"}],"../node_modules/exifreader/src/xmp-tag-names.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
var _default = {
  'tiff:Orientation'(value) {
    if (value === '1') {
      return 'Horizontal (normal)';
    }

    if (value === '2') {
      return 'Mirror horizontal';
    }

    if (value === '3') {
      return 'Rotate 180';
    }

    if (value === '4') {
      return 'Mirror vertical';
    }

    if (value === '5') {
      return 'Mirror horizontal and rotate 270 CW';
    }

    if (value === '6') {
      return 'Rotate 90 CW';
    }

    if (value === '7') {
      return 'Mirror horizontal and rotate 90 CW';
    }

    if (value === '8') {
      return 'Rotate 270 CW';
    }

    return value;
  },

  'exif:GPSLatitude': calculateGPSValue,
  'exif:GPSLongitude': calculateGPSValue
};
exports.default = _default;

function calculateGPSValue(value) {
  const [degreesString, minutesString] = value.split(',');

  if (degreesString !== undefined && minutesString !== undefined) {
    const degrees = parseFloat(degreesString);
    const minutes = parseFloat(minutesString);
    const ref = minutesString.charAt(minutesString.length - 1);

    if (!Number.isNaN(degrees) && !Number.isNaN(minutes)) {
      return '' + (degrees + minutes / 60) + ref;
    }
  }

  return value;
}
},{}],"../node_modules/exifreader/src/dom-parser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
var _default = {
  get
};
exports.default = _default;

function get() {
  if (typeof DOMParser !== 'undefined') {
    return DOMParser;
  }

  try {
    return eval('require')('xmldom').DOMParser; // This stops Webpack from replacing the require with a generic import and bundling the module.
  } catch (error) {
    return undefined;
  }
}
},{}],"../node_modules/exifreader/src/xmp-tags.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

var _xmpTagNames = _interopRequireDefault(require("./xmp-tag-names"));

var _domParser = _interopRequireDefault(require("./dom-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
var _default = {
  read
};
exports.default = _default;

function read(dataView, dataOffset, metadataSize) {
  try {
    const doc = getDocument(dataView, dataOffset, metadataSize);
    const rdf = getRDF(doc);
    return parseXMPObject(convertToObject(rdf, true));
  } catch (error) {
    return {};
  }
}

function getDocument(dataView, dataOffset, metadataSize) {
  const Parser = _domParser.default.get();

  if (!Parser) {
    console.warn('Warning: DOMParser is not available. It is needed to be able to parse XMP tags.'); // eslint-disable-line no-console

    throw new Error();
  }

  const domParser = new Parser();
  const xmlSource = (0, _utils.getStringFromDataView)(dataView, dataOffset, metadataSize);
  const doc = domParser.parseFromString(xmlSource, 'application/xml');

  if (doc.documentElement.nodeName === 'parsererror') {
    throw new Error(doc.documentElement.textContent);
  }

  return doc;
}

function getRDF(node) {
  for (let i = 0; i < node.childNodes.length; i++) {
    if (node.childNodes[i].tagName === 'x:xmpmeta') {
      return getRDF(node.childNodes[i]);
    }

    if (node.childNodes[i].tagName === 'rdf:RDF') {
      return node.childNodes[i];
    }
  }

  throw new Error();
}

function convertToObject(node, isTopNode = false) {
  const childNodes = getChildNodes(node);

  if (hasTextOnlyContent(childNodes)) {
    if (isTopNode) {
      return {};
    }

    return getTextValue(childNodes[0]);
  }

  return getElementsFromNodes(childNodes);
}

function getChildNodes(node) {
  const elements = [];

  for (let i = 0; i < node.childNodes.length; i++) {
    elements.push(node.childNodes[i]);
  }

  return elements;
}

function hasTextOnlyContent(nodes) {
  return nodes.length === 1 && nodes[0].nodeName === '#text';
}

function getTextValue(node) {
  return node.nodeValue;
}

function getElementsFromNodes(nodes) {
  const elements = {};
  nodes.forEach(node => {
    if (isElement(node)) {
      const nodeElement = getElementFromNode(node);

      if (elements[node.nodeName] !== undefined) {
        if (!Array.isArray(elements[node.nodeName])) {
          elements[node.nodeName] = [elements[node.nodeName]];
        }

        elements[node.nodeName].push(nodeElement);
      } else {
        elements[node.nodeName] = nodeElement;
      }
    }
  });
  return elements;
}

function isElement(node) {
  return node.nodeName && node.nodeName !== '#text';
}

function getElementFromNode(node) {
  return {
    attributes: getAttributes(node),
    value: convertToObject(node)
  };
}

function getAttributes(element) {
  const attributes = {};

  for (let i = 0; i < element.attributes.length; i++) {
    attributes[element.attributes[i].nodeName] = decodeURIComponent(escape(element.attributes[i].value));
  }

  return attributes;
}

function parseXMPObject(xmpObject) {
  const tags = {};

  if (typeof xmpObject === 'string') {
    return xmpObject;
  }

  for (const nodeName in xmpObject) {
    let nodes = xmpObject[nodeName];

    if (!Array.isArray(nodes)) {
      nodes = [nodes];
    }

    nodes.forEach(node => {
      Object.assign(tags, parseNodeAttributesAsTags(node.attributes));

      if (typeof node.value === 'object') {
        Object.assign(tags, parseNodeChildrenAsTags(node.value));
      }
    });
  }

  return tags;
}

function parseNodeAttributesAsTags(attributes) {
  const tags = {};

  for (const name in attributes) {
    if (isTagAttribute(name)) {
      tags[getLocalName(name)] = {
        value: attributes[name],
        attributes: {},
        description: getDescription(attributes[name], name)
      };
    }
  }

  return tags;
}

function isTagAttribute(name) {
  return name !== 'rdf:parseType' && !isNamespaceDefinition(name);
}

function isNamespaceDefinition(name) {
  return name.split(':')[0] === 'xmlns';
}

function getLocalName(name) {
  return name.split(':')[1];
}

function getDescription(value, name = undefined) {
  if (Array.isArray(value)) {
    return getDescriptionOfArray(value);
  }

  if (typeof value === 'object') {
    return getDescriptionOfObject(value);
  }

  try {
    if (name && typeof _xmpTagNames.default[name] === 'function') {
      return _xmpTagNames.default[name](value);
    }

    return decodeURIComponent(escape(value));
  } catch (error) {
    return value;
  }
}

function getDescriptionOfArray(value) {
  return value.map(item => {
    if (item.value !== undefined) {
      return getDescription(item.value);
    }

    return getDescription(item);
  }).join(', ');
}

function getDescriptionOfObject(value) {
  const descriptions = [];

  for (const key in value) {
    descriptions.push(`${getClearTextKey(key)}: ${value[key].value}`);
  }

  return descriptions.join('; ');
}

function getClearTextKey(key) {
  if (key === 'CiAdrCity') {
    return 'CreatorCity';
  }

  if (key === 'CiAdrCtry') {
    return 'CreatorCountry';
  }

  if (key === 'CiAdrExtadr') {
    return 'CreatorAddress';
  }

  if (key === 'CiAdrPcode') {
    return 'CreatorPostalCode';
  }

  if (key === 'CiAdrRegion') {
    return 'CreatorRegion';
  }

  if (key === 'CiEmailWork') {
    return 'CreatorWorkEmail';
  }

  if (key === 'CiTelWork') {
    return 'CreatorWorkPhone';
  }

  if (key === 'CiUrlWork') {
    return 'CreatorWorkUrl';
  }

  return key;
}

function parseNodeChildrenAsTags(children) {
  const tags = {};

  for (const name in children) {
    if (!isNamespaceDefinition(name)) {
      tags[getLocalName(name)] = parseNodeAsTag(children[name], name);
    }
  }

  return tags;
}

function parseNodeAsTag(node, name) {
  if (hasNestedSimpleRdfDescription(node)) {
    return parseNodeAsSimpleRdfDescription(node, name);
  } else if (hasNestedStructureRdfDescription(node)) {
    return parseNodeAsStructureRdfDescription(node, name);
  } else if (isCompactStructure(node)) {
    return parseNodeAsCompactStructure(node, name);
  } else if (isArray(node)) {
    return parseNodeAsArray(node, name);
  }

  return parseNodeAsSimpleValue(node, name);
}

function hasNestedSimpleRdfDescription(node) {
  return node.attributes['rdf:parseType'] === 'Resource' && node.value['rdf:value'] !== undefined || node.value['rdf:Description'] !== undefined && node.value['rdf:Description'].value['rdf:value'] !== undefined;
}

function parseNodeAsSimpleRdfDescription(node, name) {
  const attributes = parseNodeAttributes(node);

  if (node.value['rdf:Description'] !== undefined) {
    node = node.value['rdf:Description'];
  }

  Object.assign(attributes, parseNodeAttributes(node), parseNodeChildrenAsAttributes(node));
  const value = parseRdfValue(node);
  return {
    value,
    attributes,
    description: getDescription(value, name)
  };
}

function parseNodeAttributes(node) {
  const attributes = {};

  for (const name in node.attributes) {
    if (name !== 'rdf:parseType' && name !== 'rdf:resource' && !isNamespaceDefinition(name)) {
      attributes[getLocalName(name)] = node.attributes[name];
    }
  }

  return attributes;
}

function parseNodeChildrenAsAttributes(node) {
  const attributes = {};

  for (const name in node.value) {
    if (name !== 'rdf:value' && !isNamespaceDefinition(name)) {
      attributes[getLocalName(name)] = node.value[name].value;
    }
  }

  return attributes;
}

function parseRdfValue(node) {
  return getURIValue(node.value['rdf:value']) || node.value['rdf:value'].value;
}

function hasNestedStructureRdfDescription(node) {
  return node.attributes['rdf:parseType'] === 'Resource' || node.value['rdf:Description'] !== undefined && node.value['rdf:Description'].value['rdf:value'] === undefined;
}

function parseNodeAsStructureRdfDescription(node, name) {
  const tag = {
    value: {},
    attributes: {}
  };

  if (node.value['rdf:Description'] !== undefined) {
    Object.assign(tag.value, parseNodeAttributesAsTags(node.value['rdf:Description'].attributes));
    Object.assign(tag.attributes, parseNodeAttributes(node));
    node = node.value['rdf:Description'];
  }

  Object.assign(tag.value, parseNodeChildrenAsTags(node.value));
  tag.description = getDescription(tag.value, name);
  return tag;
}

function isCompactStructure(node) {
  return Object.keys(node.value).length === 0 && node.attributes['rdf:resource'] === undefined;
}

function parseNodeAsCompactStructure(node, name) {
  const value = parseNodeAttributesAsTags(node.attributes);
  return {
    value,
    attributes: {},
    description: getDescription(value, name)
  };
}

function isArray(node) {
  return getArrayChild(node.value) !== undefined;
}

function getArrayChild(value) {
  return value['rdf:Bag'] || value['rdf:Seq'] || value['rdf:Alt'];
}

function parseNodeAsArray(node, name) {
  let items = getArrayChild(node.value).value['rdf:li'];
  const attributes = parseNodeAttributes(node);
  const value = [];

  if (!Array.isArray(items)) {
    items = [items];
  }

  items.forEach(item => {
    value.push(parseArrayValue(item));
  });
  return {
    value,
    attributes,
    description: getDescription(value, name)
  };
}

function parseArrayValue(item) {
  if (hasNestedSimpleRdfDescription(item)) {
    return parseNodeAsSimpleRdfDescription(item);
  }

  if (hasNestedArrayValue(item)) {
    return parseNodeChildrenAsTags(item.value);
  }

  return {
    value: item.value,
    attributes: parseNodeAttributes(item),
    description: getDescription(item.value)
  };
}

function hasNestedArrayValue(node) {
  return node.attributes['rdf:parseType'] === 'Resource';
}

function parseNodeAsSimpleValue(node, name) {
  const value = getURIValue(node) || parseXMPObject(node.value);
  return {
    value,
    attributes: parseNodeAttributes(node),
    description: getDescription(value, name)
  };
}

function getURIValue(node) {
  return node.attributes && node.attributes['rdf:resource'];
}
},{"./utils":"../node_modules/exifreader/src/utils.js","./xmp-tag-names":"../node_modules/exifreader/src/xmp-tag-names.js","./dom-parser":"../node_modules/exifreader/src/dom-parser.js"}],"../node_modules/exifreader/src/errors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Thrown when no Exif metadata was found for the given image.
 *
 * @param {string} message The error message.
 */
function MetadataMissingError(message) {
  this.name = 'MetadataMissingError';
  this.message = message || 'No Exif data';
  this.stack = new Error().stack;
}

MetadataMissingError.prototype = new Error();
var _default = {
  MetadataMissingError
};
exports.default = _default;
},{}],"../node_modules/exifreader/src/exif-reader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;
exports.loadView = loadView;
exports.errors = exports.default = void 0;

var _dataview = _interopRequireDefault(require("./dataview"));

var _imageHeader = _interopRequireDefault(require("./image-header"));

var _tags = _interopRequireDefault(require("./tags"));

var _fileTags = _interopRequireDefault(require("./file-tags"));

var _iptcTags = _interopRequireDefault(require("./iptc-tags"));

var _xmpTags = _interopRequireDefault(require("./xmp-tags"));

var _errors = _interopRequireDefault(require("./errors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ExifReader
 * http://github.com/mattiasw/exifreader
 * Copyright (C) 2011-2018  Mattias Wallander <mattias@wallander.eu>
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
var _default = {
  load,
  loadView,
  errors: _errors.default
};
exports.default = _default;
const errors = _errors.default;
exports.errors = errors;

function load(data, options = {
  expanded: false
}) {
  return loadView(getDataView(data), options);
}

function getDataView(data) {
  try {
    return new DataView(data);
  } catch (error) {
    return new _dataview.default(data);
  }
}

function loadView(dataView, options = {
  expanded: false
}) {
  let foundMetaData = false;
  let tags = {};

  _imageHeader.default.check(dataView);

  const {
    fileDataOffset,
    tiffHeaderOffset,
    iptcDataOffset,
    xmpDataOffset,
    xmpFieldLength
  } = _imageHeader.default.parseAppMarkers(dataView);

  if (hasFileData(fileDataOffset)) {
    foundMetaData = true;

    const readTags = _fileTags.default.read(dataView, fileDataOffset);

    if (options.expanded) {
      tags.file = readTags;
    } else {
      tags = Object.assign({}, tags, readTags);
    }
  }

  if (hasExifData(tiffHeaderOffset)) {
    foundMetaData = true;

    const readTags = _tags.default.read(dataView, tiffHeaderOffset);

    if (options.expanded) {
      tags.exif = readTags;
    } else {
      tags = Object.assign({}, tags, readTags);
    }
  }

  if (hasIptcData(iptcDataOffset)) {
    foundMetaData = true;

    const readTags = _iptcTags.default.read(dataView, iptcDataOffset);

    if (options.expanded) {
      tags.iptc = readTags;
    } else {
      tags = Object.assign({}, tags, readTags);
    }
  }

  if (hasXmpData(xmpDataOffset)) {
    foundMetaData = true;

    const readTags = _xmpTags.default.read(dataView, xmpDataOffset, xmpFieldLength);

    if (options.expanded) {
      tags.xmp = readTags;
    } else {
      tags = Object.assign({}, tags, readTags);
    }
  }

  if (!foundMetaData) {
    throw new _errors.default.MetadataMissingError();
  }

  return tags;
}

function hasFileData(fileDataOffset) {
  return fileDataOffset !== undefined;
}

function hasExifData(tiffHeaderOffset) {
  return tiffHeaderOffset !== undefined;
}

function hasIptcData(iptcDataOffset) {
  return iptcDataOffset !== undefined;
}

function hasXmpData(xmpDataOffset) {
  return xmpDataOffset !== undefined;
}
},{"./dataview":"../node_modules/exifreader/src/dataview.js","./image-header":"../node_modules/exifreader/src/image-header.js","./tags":"../node_modules/exifreader/src/tags.js","./file-tags":"../node_modules/exifreader/src/file-tags.js","./iptc-tags":"../node_modules/exifreader/src/iptc-tags.js","./xmp-tags":"../node_modules/exifreader/src/xmp-tags.js","./errors":"../node_modules/exifreader/src/errors.js"}],"template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _this = void 0;

exports.meta = function (exif) {
  return "\n\t<h3>Metadata</h3>\n\t<span class=\"label\">Camera</span>\n\t<div class=\"data\">".concat(exif.Make.description, " ").concat(exif.Model.description, "</div>\n\t<span class=\"label\">Lens</span>\n\t<div class=\"data\">").concat(exif.Lens.description, "</div>\n\t<span class=\"label\">Exposure Time</span>\n\t<div class=\"data\">1/").concat(1 / exif.ExposureTime.description, "s</div>\n\t<span class=\"label\">Aperture</span>\n\t<div class=\"data\">").concat(exif.MaxApertureValue.description, "</div>\n\t<span class=\"label\">ISO</span>\n\t<div class=\"data\">").concat(exif.ISOSpeedRatings.description, "</div>\n\t<span class=\"label\">White Balance</span>\n\t<div class=\"data\">").concat(exif.WhiteBalance.description, "</div>\n\t<span class=\"label\">Exposure Mode</span>\n\t<div class=\"data\">").concat(exif.ExposureMode.description, "</div>\n\t<span class=\"label\">Flash</span>\n\t<div class=\"data\">").concat(exif.Flash.description, "</div>\n");
};

var _default = function _default(exif) {
  return "\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c140 79.160451, 2017/05/06-01:08:21        \">\n <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n  <rdf:Description rdf:about=\"\"\n    xmlns:crs=\"http://ns.adobe.com/camera-raw-settings/1.0/\"\n   crs:PresetType=\"Normal\"\n   crs:Cluster=\"\"\n   crs:UUID=\"".concat(exif.XXXX.description, "\"\n   crs:SupportsAmount=\"False\"\n   crs:SupportsColor=\"True\"\n   crs:SupportsMonochrome=\"True\"\n   crs:SupportsHighDynamicRange=\"True\"\n   crs:SupportsNormalDynamicRange=\"True\"\n   crs:SupportsSceneReferred=\"True\"\n   crs:SupportsOutputReferred=\"True\"\n   crs:CameraModelRestriction=\"\"\n   crs:Copyright=\"Preset created by Light Detective\"\n   crs:ContactInfo=\"\"\n   crs:Version=\"").concat(exif.XXXX.description, "\"\n   crs:ProcessVersion=\"").concat(exif.XXXX.description, "\"\n   crs:WhiteBalance=\"").concat(_this.Temperature.description === "0" && _this.Tint.description === "0" ? "As Shot" : "Custom", "\"\n   crs:Temperature=\"").concat(exif.XXXX.description, "\"\n   crs:Tint=\"").concat(exif.XXXX.description, "\"\n   crs:Saturation=\"").concat(exif.XXXX.description, "\"\n   crs:Sharpness=\"").concat(exif.XXXX.description, "\"\n   crs:LuminanceSmoothing=\"").concat(exif.XXXX.description, "\"\n   crs:ColorNoiseReduction=\"").concat(exif.XXXX.description, "\"\n   crs:VignetteAmount=\"").concat(exif.XXXX.description, "\"\n   crs:ShadowTint=\"").concat(exif.XXXX.description, "\"\n   crs:RedHue=\"").concat(exif.XXXX.description, "\"\n   crs:RedSaturation=\"").concat(exif.XXXX.description, "\"\n   crs:GreenHue=\"").concat(exif.XXXX.description, "8\"\n   crs:GreenSaturation=\"").concat(exif.XXXX.description, "6\"\n   crs:BlueHue=\"").concat(exif.XXXX.description, "3\"\n   crs:BlueSaturation=\"").concat(exif.XXXX.description, "\"\n   crs:Vibrance=\"").concat(exif.XXXX.description, "9\"\n   crs:HueAdjustmentRed=\"").concat(exif.XXXX.description, "\"\n   crs:HueAdjustmentOrange=\"").concat(exif.XXXX.description, "\"\n   crs:HueAdjustmentYellow=\"").concat(exif.XXXX.description, "\"\n   crs:HueAdjustmentGreen=\"").concat(exif.XXXX.description, "\"\n   crs:HueAdjustmentAqua=\"").concat(exif.XXXX.description, "\"\n   crs:HueAdjustmentBlue=\"").concat(exif.XXXX.description, "\"\n   crs:HueAdjustmentPurple=\"").concat(exif.XXXX.description, "\"\n   crs:HueAdjustmentMagenta=\"").concat(exif.XXXX.description, "\"\n   crs:SaturationAdjustmentRed=\"").concat(exif.XXXX.description, "\"\n   crs:SaturationAdjustmentOrange=\"").concat(exif.XXXX.description, "\"\n   crs:SaturationAdjustmentYellow=\"").concat(exif.XXXX.description, "\"\n   crs:SaturationAdjustmentGreen=\"").concat(exif.XXXX.description, "\"\n   crs:SaturationAdjustmentAqua=\"").concat(exif.XXXX.description, "\"\n   crs:SaturationAdjustmentBlue=\"").concat(exif.XXXX.description, "\"\n   crs:SaturationAdjustmentPurple=\"").concat(exif.XXXX.description, "\"\n   crs:SaturationAdjustmentMagenta=\"").concat(exif.XXXX.description, "\"\n   crs:LuminanceAdjustmentRed=\"").concat(exif.XXXX.description, "\"\n   crs:LuminanceAdjustmentOrange=\"").concat(exif.XXXX.description, "\"\n   crs:LuminanceAdjustmentYellow=\"").concat(exif.XXXX.description, "\"\n   crs:LuminanceAdjustmentGreen=\"").concat(exif.XXXX.description, "\"\n   crs:LuminanceAdjustmentAqua=\"").concat(exif.XXXX.description, "\"\n   crs:LuminanceAdjustmentBlue=\"").concat(exif.XXXX.description, "\"\n   crs:LuminanceAdjustmentPurple=\"").concat(exif.XXXX.description, "\"\n   crs:LuminanceAdjustmentMagenta=\"").concat(exif.XXXX.description, "\"\n   crs:SplitToningShadowHue=\"").concat(exif.XXXX.description, "\"\n   crs:SplitToningShadowSaturation=\"").concat(exif.XXXX.description, "\"\n   crs:SplitToningHighlightHue=\"").concat(exif.XXXX.description, "\"\n   crs:SplitToningHighlightSaturation=\"").concat(exif.XXXX.description, "\"\n   crs:SplitToningBalance=\"").concat(exif.XXXX.description, "8\"\n   crs:ParametricShadows=\"").concat(exif.XXXX.description, "\"\n   crs:ParametricDarks=\"").concat(exif.XXXX.description, "\"\n   crs:ParametricLights=\"").concat(exif.XXXX.description, "\"\n   crs:ParametricHighlights=\"").concat(exif.XXXX.description, "\"\n   crs:ParametricShadowSplit=\"").concat(exif.XXXX.description, "\"\n   crs:ParametricMidtoneSplit=\"").concat(exif.XXXX.description, "\"\n   crs:ParametricHighlightSplit=\"").concat(exif.XXXX.description, "\"\n   crs:SharpenRadius=\"").concat(exif.XXXX.description, "\"\n   crs:SharpenDetail=\"").concat(exif.XXXX.description, "\"\n   crs:SharpenEdgeMasking=\"").concat(exif.XXXX.description, "\"\n   crs:PostCropVignetteAmount=\"").concat(exif.XXXX.description, "\"\n   crs:PostCropVignetteMidpoint=\"").concat(exif.XXXX.description, "\"\n   crs:PostCropVignetteFeather=\"").concat(exif.XXXX.description, "\"\n   crs:PostCropVignetteRoundness=\"").concat(exif.XXXX.description, "\"\n   crs:PostCropVignetteStyle=\"").concat(exif.XXXX.description, "\"\n   crs:PostCropVignetteHighlightContrast=\"").concat(exif.XXXX.description, "\"\n   crs:GrainAmount=\"").concat(exif.XXXX.description, "\"\n   crs:GrainSize=\"").concat(exif.XXXX.description, "\"\n   crs:GrainFrequency=\"").concat(exif.XXXX.description, "\"\n   crs:LuminanceNoiseReductionDetail=\"").concat(exif.XXXX.description, "\"\n   crs:ColorNoiseReductionDetail=\"").concat(exif.XXXX.description, "\"\n   crs:LuminanceNoiseReductionContrast=\"").concat(exif.XXXX.description, "\"\n   crs:ColorNoiseReductionSmoothness=\"").concat(exif.XXXX.description, "\"\n   crs:LensProfileEnable=\"").concat(exif.XXXX.description, "\"\n   crs:LensManualDistortionAmount=\"").concat(exif.XXXX.description, "\"\n   crs:PerspectiveVertical=\"").concat(exif.XXXX.description, "\"\n   crs:PerspectiveHorizontal=\"").concat(exif.XXXX.description, "\"\n   crs:PerspectiveRotate=\"").concat(exif.XXXX.description, "\"\n   crs:PerspectiveScale=\"").concat(exif.XXXX.description, "\"\n   crs:PerspectiveAspect=\"").concat(exif.XXXX.description, "\"\n   crs:PerspectiveUpright=\"").concat(exif.XXXX.description, "\"\n   crs:PerspectiveX=\"").concat(exif.XXXX.description, "\"\n   crs:PerspectiveY=\"").concat(exif.XXXX.description, "\"\n   crs:AutoLateralCA=\"").concat(exif.XXXX.description, "\"\n   crs:Exposure2012=\"").concat(exif.XXXX.description, "\"\n   crs:Contrast2012=\"").concat(exif.XXXX.description, "\"\n   crs:Highlights2012=\"").concat(exif.XXXX.description, "\"\n   crs:Shadows2012=\"").concat(exif.XXXX.description, "\"\n   crs:Whites2012=\"").concat(exif.XXXX.description, "\"\n   crs:Blacks2012=\"").concat(exif.XXXX.description, "\"\n   crs:Clarity2012=\"").concat(exif.XXXX.description, "\"\n   crs:DefringePurpleAmount=\"").concat(exif.XXXX.description, "\"\n   crs:DefringePurpleHueLo=\"").concat(exif.XXXX.description, "\"\n   crs:DefringePurpleHueHi=\"").concat(exif.XXXX.description, "\"\n   crs:DefringeGreenAmount=\"").concat(exif.XXXX.description, "\"\n   crs:DefringeGreenHueLo=\"").concat(exif.XXXX.description, "\"\n   crs:DefringeGreenHueHi=\"").concat(exif.XXXX.description, "\"\n   crs:Dehaze=\"").concat(exif.XXXX.description, "\"\n   crs:OverrideLookVignette=\"").concat(exif.XXXX.description, "\"\n   crs:ToneCurveName2012=\"").concat(exif.XXXX.description, "\"\n   crs:LensProfileSetup=\"").concat(exif.XXXX.description, "\"\n   crs:LensProfileName=\"").concat(exif.XXXX.description, "\"\n   crs:LensProfileFilename=\"").concat(exif.XXXX.description, "\"\n   crs:LensProfileDigest=\"").concat(exif.XXXX.description, "\"\n   crs:LensProfileDistortionScale=\"").concat(exif.XXXX.description, "\"\n   crs:LensProfileChromaticAberrationScale=\"").concat(exif.XXXX.description, "\"\n   crs:LensProfileVignettingScale=\"").concat(exif.XXXX.description, "\"\n   crs:HasSettings=\"True\">\n   <crs:Name>\n    <rdf:Alt>\n     <rdf:li xml:lang=\"x-default\">").concat(_this.filename, "</rdf:li>\n    </rdf:Alt>\n   </crs:Name>\n   <crs:ShortName>\n    <rdf:Alt>\n     <rdf:li xml:lang=\"x-default\"/>\n    </rdf:Alt>\n   </crs:ShortName>\n   <crs:SortName>\n    <rdf:Alt>\n     <rdf:li xml:lang=\"x-default\"/>\n    </rdf:Alt>\n   </crs:SortName>\n   <crs:Group>\n    <rdf:Alt>\n     <rdf:li xml:lang=\"x-default\"/>\n    </rdf:Alt>\n   </crs:Group>\n   <crs:Description>\n    <rdf:Alt>\n     <rdf:li xml:lang=\"x-default\"/>\n    </rdf:Alt>\n   </crs:Description>\n   <crs:ToneCurvePV2012>\n    <rdf:Seq>\n     <rdf:li>0, 39</rdf:li>\n     <rdf:li>27, 43</rdf:li>\n     <rdf:li>97, 92</rdf:li>\n     <rdf:li>167, 163</rdf:li>\n     <rdf:li>233, 255</rdf:li>\n    </rdf:Seq>\n   </crs:ToneCurvePV2012>\n   <crs:ToneCurvePV2012Red>\n    <rdf:Seq>\n     <rdf:li>0, 13</rdf:li>\n     <rdf:li>71, 72</rdf:li>\n     <rdf:li>163, 165</rdf:li>\n     <rdf:li>208, 209</rdf:li>\n     <rdf:li>255, 238</rdf:li>\n    </rdf:Seq>\n   </crs:ToneCurvePV2012Red>\n   <crs:ToneCurvePV2012Green>\n    <rdf:Seq>\n     <rdf:li>0, 12</rdf:li>\n     <rdf:li>58, 61</rdf:li>\n     <rdf:li>169, 177</rdf:li>\n     <rdf:li>242, 255</rdf:li>\n    </rdf:Seq>\n   </crs:ToneCurvePV2012Green>\n   <crs:ToneCurvePV2012Blue>\n    <rdf:Seq>\n     <rdf:li>8, 0</rdf:li>\n     <rdf:li>59, 55</rdf:li>\n     <rdf:li>170, 169</rdf:li>\n     <rdf:li>241, 255</rdf:li>\n    </rdf:Seq>\n   </crs:ToneCurvePV2012Blue>\n   <crs:Look>\n    <rdf:Description\n     crs:Name=\"Adobe Color\"\n     crs:Amount=\"1.000000\"\n     crs:UUID=\"B952C231111CD8E0ECCF14B86BAA7077\"\n     crs:SupportsAmount=\"false\"\n     crs:SupportsMonochrome=\"false\"\n     crs:SupportsOutputReferred=\"false\"\n     crs:Stubbed=\"true\">\n    <crs:Group>\n     <rdf:Alt>\n      <rdf:li xml:lang=\"x-default\">Profiles</rdf:li>\n     </rdf:Alt>\n    </crs:Group>\n    </rdf:Description>\n   </crs:Look>\n  </rdf:Description>\n </rdf:RDF>\n</x:xmpmeta>\n");
};

exports.default = _default;
},{}],"scripts.js":[function(require,module,exports) {
"use strict";

var _exifreader = _interopRequireDefault(require("exifreader"));

var _template = _interopRequireWildcard(require("./template"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dropArea = document.querySelector("#drop");
var uploadForm = document.querySelector("#image-upload");
var resultContainer = document.querySelector(".result-container");
var preview = document.querySelector("#preview");
var result = document.querySelector("#result");
var retry = document.querySelector(".retry");
var download = document.querySelector(".download");
var link = document.querySelector(".download-link");
var headerImage = document.querySelector("#header-image");
var metaDataContainer = document.querySelector(".meta");
var exifDataReader = new FileReader();
var imageReader = new FileReader();
var filledTemplate;
var filename;
["dragenter", "dragover"].forEach(function (eventName) {
  dropArea.addEventListener(eventName, addHighlight, false);
});
["dragleave", "drop"].forEach(function (eventName) {
  dropArea.addEventListener(eventName, removeHighlight, false);
});
["dragenter", "dragover", "dragleave", "drop"].forEach(function (eventName) {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

dropArea.addEventListener("drop", processFile, false);
retry.addEventListener("click", function () {
  location.reload();
}, false);
download.addEventListener("click", downloadPreset, false);

function addHighlight(e) {
  dropArea.classList.add("highlight");
}

function removeHighlight(e) {
  dropArea.classList.remove("highlight");
}

function processFile(e) {
  var dt = e.dataTransfer; // TODO: add loading indicator

  filename = dt.files[0].name;
  imageReader.readAsDataURL(dt.files[0]);
  exifDataReader.readAsArrayBuffer(dt.files[0]);
}

imageReader.onload = function () {
  dropArea.classList.add("hidden");
  retry.classList.remove("hidden");
  resultContainer.classList.remove("hidden");
  headerImage.style.background = "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,1)) top center, url(".concat(imageReader.result, ") center");
  headerImage.style.backgroundSize = "cover, cover";
};

exifDataReader.onload = function () {
  var exifData = _exifreader.default.load(exifDataReader.result);

  console.log(exifData);
  var metaData = (0, _template.meta)(exifData);
  metaDataContainer.innerHTML = metaData;
  filledTemplate = (0, _template.default)(exifData);
  console.log(filledTemplate, metaData);
};

function downloadPreset() {
  var fileURL = null;
  link.href = null;
  var data = new Blob([filledTemplate], {
    type: 'text/plain'
  });

  if (fileURL !== null) {
    window.URL.revokeObjectURL(fileURL);
  }

  fileURL = window.URL.createObjectURL(data);
  link.href = fileURL;
  link.click();
}
},{"exifreader":"../node_modules/exifreader/src/exif-reader.js","./template":"template.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60881" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts.js"], null)
//# sourceMappingURL=/scripts.b71a6038.js.map