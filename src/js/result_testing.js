import template from './lib/template'
import meta, { settings } from './lib/meta'


const resultContainer = document.querySelector('.result-container')
let metaDataContainer = document.querySelector('.meta')
let settingsDataContainer = document.querySelector('.settings')

const exifData = {
	"Bits Per Sample": {
	  "value": 8,
	  "description": "8"
	},
	"Image Height": {
	  "value": 7952,
	  "description": "7952px"
	},
	"Image Width": {
	  "value": 5304,
	  "description": "5304px"
	},
	"Color Components": {
	  "value": 3,
	  "description": "3"
	},
	"Subsampling": {
	  "value": [
		[
		  0,
		  17,
		  0
		],
		[
		  1,
		  17,
		  1
		],
		[
		  2,
		  17,
		  1
		]
	  ],
	  "description": "YCb4:4:4 (1 1)"
	},
	"Thumbnail": {
	  "Compression": {
		"id": 259,
		"value": 6,
		"description": 6
	  },
	  "XResolution": {
		"id": 282,
		"value": [
		  72,
		  1
		],
		"description": "72"
	  },
	  "YResolution": {
		"id": 283,
		"value": [
		  72,
		  1
		],
		"description": "72"
	  },
	  "ResolutionUnit": {
		"id": 296,
		"value": 2,
		"description": "inches"
	  },
	  "JPEGInterchangeFormat": {
		"id": 513,
		"value": 890,
		"description": 890
	  },
	  "JPEGInterchangeFormatLength": {
		"id": 514,
		"value": 9753,
		"description": 9753
	  },
	  "type": "image/jpeg",
	  "image": {}
	},
	"Make": {
	  "id": 271,
	  "value": [
		"SONY"
	  ],
	  "description": "SONY"
	},
	"Model": {
	  "id": 272,
	  "value": [
		"ILCE-7RM2"
	  ],
	  "description": "ILCE-7RM2"
	},
	"XResolution": {
	  "id": 282,
	  "value": [
		240,
		1
	  ],
	  "description": "240"
	},
	"YResolution": {
	  "id": 283,
	  "value": [
		240,
		1
	  ],
	  "description": "240"
	},
	"ResolutionUnit": {
	  "id": 296,
	  "value": 2,
	  "description": "inches"
	},
	"Software": {
	  "id": 305,
	  "value": [
		"Adobe Photoshop Lightroom Classic 11.0.1 (Windows)"
	  ],
	  "description": "Adobe Photoshop Lightroom Classic 11.0.1 (Windows)"
	},
	"DateTime": {
	  "id": 306,
	  "value": [
		"2022:03:12 18:46:47"
	  ],
	  "description": "2022:03:12 18:46:47"
	},
	"Exif IFD Pointer": {
	  "id": 34665,
	  "value": 214,
	  "description": 214
	},
	"ExposureTime": {
	  "id": 33434,
	  "value": [
		1,
		80
	  ],
	  "description": "1/80"
	},
	"FNumber": {
	  "id": 33437,
	  "value": [
		14,
		10
	  ],
	  "description": "f/1.4"
	},
	"ExposureProgram": {
	  "id": 34850,
	  "value": 1,
	  "description": "Manual"
	},
	"ISOSpeedRatings": {
	  "id": 34855,
	  "value": 800,
	  "description": 800
	},
	"SensitivityType": {
	  "id": 34864,
	  "value": 2,
	  "description": "Recommended Exposure Index"
	},
	"RecommendedExposureIndex": {
	  "id": 34866,
	  "value": 800,
	  "description": 800
	},
	"ExifVersion": {
	  "id": 36864,
	  "value": [
		48,
		50,
		51,
		49
	  ],
	  "description": "0231"
	},
	"DateTimeOriginal": {
	  "id": 36867,
	  "value": [
		"2022:02:26 19:41:55"
	  ],
	  "description": "2022:02:26 19:41:55"
	},
	"DateTimeDigitized": {
	  "id": 36868,
	  "value": [
		"2022:02:26 19:41:55"
	  ],
	  "description": "2022:02:26 19:41:55"
	},
	"OffsetTime": {
	  "id": 36880,
	  "value": [
		"+01:00"
	  ],
	  "description": "+01:00"
	},
	"ShutterSpeedValue": {
	  "id": 37377,
	  "value": [
		6321928,
		1000000
	  ],
	  "description": "1/80"
	},
	"ApertureValue": {
	  "id": 37378,
	  "value": [
		970854,
		1000000
	  ],
	  "description": "1.40"
	},
	"BrightnessValue": {
	  "id": 37379,
	  "value": [
		-2296,
		2560
	  ],
	  "description": "-0.896875"
	},
	"ExposureBiasValue": {
	  "id": 37380,
	  "value": [
		0,
		10
	  ],
	  "description": "0"
	},
	"MaxApertureValue": {
	  "id": 37381,
	  "value": [
		248,
		256
	  ],
	  "description": "1.40"
	},
	"MeteringMode": {
	  "id": 37383,
	  "value": 5,
	  "description": "Pattern"
	},
	"LightSource": {
	  "id": 37384,
	  "value": 0,
	  "description": "Unknown"
	},
	"Flash": {
	  "id": 37385,
	  "value": 16,
	  "description": "Flash did not fire, compulsory flash mode"
	},
	"FocalLength": {
	  "id": 37386,
	  "value": [
		350,
		10
	  ],
	  "description": "35 mm"
	},
	"ColorSpace": {
	  "id": 40961,
	  "value": 1,
	  "description": "sRGB"
	},
	"FileSource": {
	  "id": 41728,
	  "value": 3,
	  "description": "DSC"
	},
	"SceneType": {
	  "id": 41729,
	  "value": 1,
	  "description": "A directly photographed image"
	},
	"CustomRendered": {
	  "id": 41985,
	  "value": 0,
	  "description": "Normal process"
	},
	"ExposureMode": {
	  "id": 41986,
	  "value": 1,
	  "description": "Manual exposure"
	},
	"WhiteBalance": {
	  "value": "Custom",
	  "attributes": {},
	  "description": "Custom"
	},
	"DigitalZoomRatio": {
	  "id": 41988,
	  "value": [
		16,
		16
	  ],
	  "description": "1"
	},
	"FocalLengthIn35mmFilm": {
	  "id": 41989,
	  "value": 35,
	  "description": 35
	},
	"SceneCaptureType": {
	  "id": 41990,
	  "value": 0,
	  "description": "Standard"
	},
	"Contrast": {
	  "id": 41992,
	  "value": 0,
	  "description": "Normal"
	},
	"Saturation": {
	  "value": "-15",
	  "attributes": {},
	  "description": "-15"
	},
	"Sharpness": {
	  "value": "37",
	  "attributes": {},
	  "description": "37"
	},
	"LensSpecification": {
	  "id": 42034,
	  "value": [
		[
		  350,
		  10
		],
		[
		  350,
		  10
		],
		[
		  14,
		  10
		],
		[
		  14,
		  10
		]
	  ],
	  "description": "35-35 mm f/1.4"
	},
	"LensModel": {
	  "value": "35mm F1.4 DG HSM | Art 012",
	  "attributes": {},
	  "description": "35mm F1.4 DG HSM | Art 012"
	},
	"Coded Character Set": {
	  "id": 346,
	  "value": [
		27,
		37,
		71
	  ],
	  "description": "UTF-8"
	},
	"Record Version": {
	  "id": 512,
	  "value": [
		0,
		4
	  ],
	  "description": "4"
	},
	"Date Created": {
	  "id": 567,
	  "value": [
		50,
		48,
		50,
		50,
		48,
		50,
		50,
		54
	  ],
	  "description": "2022-02-26"
	},
	"Time Created": {
	  "id": 572,
	  "value": [
		49,
		57,
		52,
		49,
		53,
		53
	  ],
	  "description": "19:41:55"
	},
	"Digital Creation Date": {
	  "id": 574,
	  "value": [
		50,
		48,
		50,
		50,
		48,
		50,
		50,
		54
	  ],
	  "description": "2022-02-26"
	},
	"Digital Creation Time": {
	  "id": 575,
	  "value": [
		49,
		57,
		52,
		49,
		53,
		53
	  ],
	  "description": "19:41:55"
	},
	"about": {
	  "value": "",
	  "attributes": {},
	  "description": ""
	},
	"CreatorTool": {
	  "value": "Adobe Photoshop Lightroom Classic 11.0.1 (Windows)",
	  "attributes": {},
	  "description": "Adobe Photoshop Lightroom Classic 11.0.1 (Windows)"
	},
	"ModifyDate": {
	  "value": "2022-03-12T18:46:47+01:00",
	  "attributes": {},
	  "description": "2022-03-12T18:46:47+01:00"
	},
	"CreateDate": {
	  "value": "2022-02-26T19:41:55",
	  "attributes": {},
	  "description": "2022-02-26T19:41:55"
	},
	"MetadataDate": {
	  "value": "2022-03-12T18:46:47+01:00",
	  "attributes": {},
	  "description": "2022-03-12T18:46:47+01:00"
	},
	"LensInfo": {
	  "value": "350/10 350/10 14/10 14/10",
	  "attributes": {},
	  "description": "350/10 350/10 14/10 14/10"
	},
	"Lens": {
	  "value": "35mm F1.4 DG HSM | Art 012",
	  "attributes": {},
	  "description": "35mm F1.4 DG HSM | Art 012"
	},
	"DistortionCorrectionAlreadyApplied": {
	  "value": "True",
	  "attributes": {},
	  "description": "True"
	},
	"LateralChromaticAberrationCorrectionAlreadyApplied": {
	  "value": "True",
	  "attributes": {},
	  "description": "True"
	},
	"VignetteCorrectionAlreadyApplied": {
	  "value": "True",
	  "attributes": {},
	  "description": "True"
	},
	"DateCreated": {
	  "value": "2022-02-26T19:41:55",
	  "attributes": {},
	  "description": "2022-02-26T19:41:55"
	},
	"DocumentID": {
	  "value": "xmp.did:4dd10055-d6ff-2b4f-9e5a-ca51abf40900",
	  "attributes": {},
	  "description": "xmp.did:4dd10055-d6ff-2b4f-9e5a-ca51abf40900"
	},
	"PreservedFileName": {
	  "value": "_DSC4071.JPG",
	  "attributes": {},
	  "description": "_DSC4071.JPG"
	},
	"OriginalDocumentID": {
	  "value": "9B62E6AD847AFFECAD15BD705E129D6B",
	  "attributes": {},
	  "description": "9B62E6AD847AFFECAD15BD705E129D6B"
	},
	"InstanceID": {
	  "value": "xmp.iid:4dd10055-d6ff-2b4f-9e5a-ca51abf40900",
	  "attributes": {},
	  "description": "xmp.iid:4dd10055-d6ff-2b4f-9e5a-ca51abf40900"
	},
	"format": {
	  "value": "image/jpeg",
	  "attributes": {},
	  "description": "image/jpeg"
	},
	"RawFileName": {
	  "value": "",
	  "attributes": {},
	  "description": ""
	},
	"Version": {
	  "value": "14.0",
	  "attributes": {},
	  "description": "14.0"
	},
	"ProcessVersion": {
	  "value": "11.0",
	  "attributes": {},
	  "description": "11.0"
	},
	"IncrementalTemperature": {
	  "value": "-21",
	  "attributes": {},
	  "description": "-21"
	},
	"IncrementalTint": {
	  "value": "+15",
	  "attributes": {},
	  "description": "+15"
	},
	"Exposure2012": {
	  "value": "-0.09",
	  "attributes": {},
	  "description": "-0.09"
	},
	"Contrast2012": {
	  "value": "+11",
	  "attributes": {},
	  "description": "+11"
	},
	"Highlights2012": {
	  "value": "-45",
	  "attributes": {},
	  "description": "-45"
	},
	"Shadows2012": {
	  "value": "+13",
	  "attributes": {},
	  "description": "+13"
	},
	"Whites2012": {
	  "value": "-15",
	  "attributes": {},
	  "description": "-15"
	},
	"Blacks2012": {
	  "value": "+32",
	  "attributes": {},
	  "description": "+32"
	},
	"Texture": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"Clarity2012": {
	  "value": "+55",
	  "attributes": {},
	  "description": "+55"
	},
	"Dehaze": {
	  "value": "+25",
	  "attributes": {},
	  "description": "+25"
	},
	"Vibrance": {
	  "value": "+8",
	  "attributes": {},
	  "description": "+8"
	},
	"ParametricShadows": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"ParametricDarks": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"ParametricLights": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"ParametricHighlights": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"ParametricShadowSplit": {
	  "value": "25",
	  "attributes": {},
	  "description": "25"
	},
	"ParametricMidtoneSplit": {
	  "value": "50",
	  "attributes": {},
	  "description": "50"
	},
	"ParametricHighlightSplit": {
	  "value": "75",
	  "attributes": {},
	  "description": "75"
	},
	"SharpenRadius": {
	  "value": "+1.1",
	  "attributes": {},
	  "description": "+1.1"
	},
	"SharpenDetail": {
	  "value": "17",
	  "attributes": {},
	  "description": "17"
	},
	"SharpenEdgeMasking": {
	  "value": "9",
	  "attributes": {},
	  "description": "9"
	},
	"LuminanceSmoothing": {
	  "value": "10",
	  "attributes": {},
	  "description": "10"
	},
	"LuminanceNoiseReductionDetail": {
	  "value": "39",
	  "attributes": {},
	  "description": "39"
	},
	"LuminanceNoiseReductionContrast": {
	  "value": "12",
	  "attributes": {},
	  "description": "12"
	},
	"ColorNoiseReduction": {
	  "value": "4",
	  "attributes": {},
	  "description": "4"
	},
	"ColorNoiseReductionDetail": {
	  "value": "38",
	  "attributes": {},
	  "description": "38"
	},
	"ColorNoiseReductionSmoothness": {
	  "value": "40",
	  "attributes": {},
	  "description": "40"
	},
	"HueAdjustmentRed": {
	  "value": "+18",
	  "attributes": {},
	  "description": "+18"
	},
	"HueAdjustmentOrange": {
	  "value": "-14",
	  "attributes": {},
	  "description": "-14"
	},
	"HueAdjustmentYellow": {
	  "value": "+7",
	  "attributes": {},
	  "description": "+7"
	},
	"HueAdjustmentGreen": {
	  "value": "-7",
	  "attributes": {},
	  "description": "-7"
	},
	"HueAdjustmentAqua": {
	  "value": "+13",
	  "attributes": {},
	  "description": "+13"
	},
	"HueAdjustmentBlue": {
	  "value": "-20",
	  "attributes": {},
	  "description": "-20"
	},
	"HueAdjustmentPurple": {
	  "value": "+34",
	  "attributes": {},
	  "description": "+34"
	},
	"HueAdjustmentMagenta": {
	  "value": "-21",
	  "attributes": {},
	  "description": "-21"
	},
	"SaturationAdjustmentRed": {
	  "value": "+11",
	  "attributes": {},
	  "description": "+11"
	},
	"SaturationAdjustmentOrange": {
	  "value": "-14",
	  "attributes": {},
	  "description": "-14"
	},
	"SaturationAdjustmentYellow": {
	  "value": "+20",
	  "attributes": {},
	  "description": "+20"
	},
	"SaturationAdjustmentGreen": {
	  "value": "-14",
	  "attributes": {},
	  "description": "-14"
	},
	"SaturationAdjustmentAqua": {
	  "value": "+16",
	  "attributes": {},
	  "description": "+16"
	},
	"SaturationAdjustmentBlue": {
	  "value": "-11",
	  "attributes": {},
	  "description": "-11"
	},
	"SaturationAdjustmentPurple": {
	  "value": "+13",
	  "attributes": {},
	  "description": "+13"
	},
	"SaturationAdjustmentMagenta": {
	  "value": "-26",
	  "attributes": {},
	  "description": "-26"
	},
	"LuminanceAdjustmentRed": {
	  "value": "+13",
	  "attributes": {},
	  "description": "+13"
	},
	"LuminanceAdjustmentOrange": {
	  "value": "-14",
	  "attributes": {},
	  "description": "-14"
	},
	"LuminanceAdjustmentYellow": {
	  "value": "+9",
	  "attributes": {},
	  "description": "+9"
	},
	"LuminanceAdjustmentGreen": {
	  "value": "-9",
	  "attributes": {},
	  "description": "-9"
	},
	"LuminanceAdjustmentAqua": {
	  "value": "+14",
	  "attributes": {},
	  "description": "+14"
	},
	"LuminanceAdjustmentBlue": {
	  "value": "-16",
	  "attributes": {},
	  "description": "-16"
	},
	"LuminanceAdjustmentPurple": {
	  "value": "+11",
	  "attributes": {},
	  "description": "+11"
	},
	"LuminanceAdjustmentMagenta": {
	  "value": "-13",
	  "attributes": {},
	  "description": "-13"
	},
	"SplitToningShadowHue": {
	  "value": "180",
	  "attributes": {},
	  "description": "180"
	},
	"SplitToningShadowSaturation": {
	  "value": "9",
	  "attributes": {},
	  "description": "9"
	},
	"SplitToningHighlightHue": {
	  "value": "11",
	  "attributes": {},
	  "description": "11"
	},
	"SplitToningHighlightSaturation": {
	  "value": "30",
	  "attributes": {},
	  "description": "30"
	},
	"SplitToningBalance": {
	  "value": "-39",
	  "attributes": {},
	  "description": "-39"
	},
	"ColorGradeMidtoneHue": {
	  "value": "223",
	  "attributes": {},
	  "description": "223"
	},
	"ColorGradeMidtoneSat": {
	  "value": "41",
	  "attributes": {},
	  "description": "41"
	},
	"ColorGradeShadowLum": {
	  "value": "+18",
	  "attributes": {},
	  "description": "+18"
	},
	"ColorGradeMidtoneLum": {
	  "value": "+13",
	  "attributes": {},
	  "description": "+13"
	},
	"ColorGradeHighlightLum": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"ColorGradeBlending": {
	  "value": "58",
	  "attributes": {},
	  "description": "58"
	},
	"ColorGradeGlobalHue": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"ColorGradeGlobalSat": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"ColorGradeGlobalLum": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"AutoLateralCA": {
	  "value": "1",
	  "attributes": {},
	  "description": "1"
	},
	"LensProfileEnable": {
	  "value": "1",
	  "attributes": {},
	  "description": "1"
	},
	"LensManualDistortionAmount": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"VignetteAmount": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"DefringePurpleAmount": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"DefringePurpleHueLo": {
	  "value": "30",
	  "attributes": {},
	  "description": "30"
	},
	"DefringePurpleHueHi": {
	  "value": "70",
	  "attributes": {},
	  "description": "70"
	},
	"DefringeGreenAmount": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"DefringeGreenHueLo": {
	  "value": "40",
	  "attributes": {},
	  "description": "40"
	},
	"DefringeGreenHueHi": {
	  "value": "60",
	  "attributes": {},
	  "description": "60"
	},
	"PerspectiveUpright": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"PerspectiveVertical": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"PerspectiveHorizontal": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"PerspectiveRotate": {
	  "value": "0.0",
	  "attributes": {},
	  "description": "0.0"
	},
	"PerspectiveAspect": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"PerspectiveScale": {
	  "value": "100",
	  "attributes": {},
	  "description": "100"
	},
	"PerspectiveX": {
	  "value": "0.00",
	  "attributes": {},
	  "description": "0.00"
	},
	"PerspectiveY": {
	  "value": "0.00",
	  "attributes": {},
	  "description": "0.00"
	},
	"GrainAmount": {
	  "value": "8",
	  "attributes": {},
	  "description": "8"
	},
	"GrainSize": {
	  "value": "21",
	  "attributes": {},
	  "description": "21"
	},
	"GrainFrequency": {
	  "value": "44",
	  "attributes": {},
	  "description": "44"
	},
	"PostCropVignetteAmount": {
	  "value": "-4",
	  "attributes": {},
	  "description": "-4"
	},
	"PostCropVignetteMidpoint": {
	  "value": "54",
	  "attributes": {},
	  "description": "54"
	},
	"PostCropVignetteFeather": {
	  "value": "54",
	  "attributes": {},
	  "description": "54"
	},
	"PostCropVignetteRoundness": {
	  "value": "-8",
	  "attributes": {},
	  "description": "-8"
	},
	"PostCropVignetteStyle": {
	  "value": "1",
	  "attributes": {},
	  "description": "1"
	},
	"PostCropVignetteHighlightContrast": {
	  "value": "10",
	  "attributes": {},
	  "description": "10"
	},
	"ShadowTint": {
	  "value": "-11",
	  "attributes": {},
	  "description": "-11"
	},
	"RedHue": {
	  "value": "-2",
	  "attributes": {},
	  "description": "-2"
	},
	"RedSaturation": {
	  "value": "+13",
	  "attributes": {},
	  "description": "+13"
	},
	"GreenHue": {
	  "value": "+43",
	  "attributes": {},
	  "description": "+43"
	},
	"GreenSaturation": {
	  "value": "+8",
	  "attributes": {},
	  "description": "+8"
	},
	"BlueHue": {
	  "value": "-15",
	  "attributes": {},
	  "description": "-15"
	},
	"BlueSaturation": {
	  "value": "-55",
	  "attributes": {},
	  "description": "-55"
	},
	"OverrideLookVignette": {
	  "value": "False",
	  "attributes": {},
	  "description": "False"
	},
	"ToneCurveName2012": {
	  "value": "Custom",
	  "attributes": {},
	  "description": "Custom"
	},
	"CameraProfile": {
	  "value": "Embedded",
	  "attributes": {},
	  "description": "Embedded"
	},
	"CameraProfileDigest": {
	  "value": "54650A341B5B5CCAE8442D0B43A92BCE",
	  "attributes": {},
	  "description": "54650A341B5B5CCAE8442D0B43A92BCE"
	},
	"LensProfileSetup": {
	  "value": "Custom",
	  "attributes": {},
	  "description": "Custom"
	},
	"LensProfileName": {
	  "value": "Adobe (Sony DT 18-200mm f/3.5-6.3)",
	  "attributes": {},
	  "description": "Adobe (Sony DT 18-200mm f/3.5-6.3)"
	},
	"LensProfileFilename": {
	  "value": "DSLR-A700 (Sony DT 18-200mm f3.5-6.3).lcp",
	  "attributes": {},
	  "description": "DSLR-A700 (Sony DT 18-200mm f3.5-6.3).lcp"
	},
	"LensProfileDigest": {
	  "value": "824C50E51E1B56BEF36BC0E5173AD334",
	  "attributes": {},
	  "description": "824C50E51E1B56BEF36BC0E5173AD334"
	},
	"LensProfileIsEmbedded": {
	  "value": "False",
	  "attributes": {},
	  "description": "False"
	},
	"LensProfileDistortionScale": {
	  "value": "55",
	  "attributes": {},
	  "description": "55"
	},
	"LensProfileVignettingScale": {
	  "value": "134",
	  "attributes": {},
	  "description": "134"
	},
	"GrainSeed": {
	  "value": "445468034",
	  "attributes": {},
	  "description": "445468034"
	},
	"HasSettings": {
	  "value": "True",
	  "attributes": {},
	  "description": "True"
	},
	"CropTop": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"CropLeft": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"CropBottom": {
	  "value": "1",
	  "attributes": {},
	  "description": "1"
	},
	"CropRight": {
	  "value": "1",
	  "attributes": {},
	  "description": "1"
	},
	"CropAngle": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"CropConstrainToWarp": {
	  "value": "0",
	  "attributes": {},
	  "description": "0"
	},
	"HasCrop": {
	  "value": "False",
	  "attributes": {},
	  "description": "False"
	},
	"AlreadyApplied": {
	  "value": "True",
	  "attributes": {},
	  "description": "True"
	},
	"History": {
	  "value": [
		{
		  "action": {
			"value": "derived",
			"attributes": {},
			"description": "derived"
		  },
		  "parameters": {
			"value": "saved to new location",
			"attributes": {},
			"description": "saved to new location"
		  }
		},
		{
		  "action": {
			"value": "saved",
			"attributes": {},
			"description": "saved"
		  },
		  "instanceID": {
			"value": "xmp.iid:4dd10055-d6ff-2b4f-9e5a-ca51abf40900",
			"attributes": {},
			"description": "xmp.iid:4dd10055-d6ff-2b4f-9e5a-ca51abf40900"
		  },
		  "when": {
			"value": "2022-03-12T18:46:47+01:00",
			"attributes": {},
			"description": "2022-03-12T18:46:47+01:00"
		  },
		  "softwareAgent": {
			"value": "Adobe Photoshop Lightroom Classic 11.0.1 (Windows)",
			"attributes": {},
			"description": "Adobe Photoshop Lightroom Classic 11.0.1 (Windows)"
		  },
		  "changed": {
			"value": "/",
			"attributes": {},
			"description": "/"
		  }
		}
	  ],
	  "attributes": {},
	  "description": "action: derived; parameters: saved to new location, action: saved; instanceID: xmp.iid:4dd10055-d6ff-2b4f-9e5a-ca51abf40900; when: 2022-03-12T18:46:47+01:00; softwareAgent: Adobe Photoshop Lightroom Classic 11.0.1 (Windows); changed: /"
	},
	"DerivedFrom": {
	  "value": {
		"documentID": {
		  "value": "9B62E6AD847AFFECAD15BD705E129D6B",
		  "attributes": {},
		  "description": "9B62E6AD847AFFECAD15BD705E129D6B"
		},
		"originalDocumentID": {
		  "value": "9B62E6AD847AFFECAD15BD705E129D6B",
		  "attributes": {},
		  "description": "9B62E6AD847AFFECAD15BD705E129D6B"
		}
	  },
	  "attributes": {},
	  "description": "documentID: 9B62E6AD847AFFECAD15BD705E129D6B; originalDocumentID: 9B62E6AD847AFFECAD15BD705E129D6B"
	},
	"ToneCurvePV2012": {
	  "value": [
		{
		  "value": "0, 7",
		  "attributes": {},
		  "description": "0, 7"
		},
		{
		  "value": "44, 41",
		  "attributes": {},
		  "description": "44, 41"
		},
		{
		  "value": "160, 164",
		  "attributes": {},
		  "description": "160, 164"
		},
		{
		  "value": "255, 255",
		  "attributes": {},
		  "description": "255, 255"
		}
	  ],
	  "attributes": {},
	  "description": "0, 7, 44, 41, 160, 164, 255, 255"
	},
	"ToneCurvePV2012Red": {
	  "value": [
		{
		  "value": "2, 17",
		  "attributes": {},
		  "description": "2, 17"
		},
		{
		  "value": "40, 48",
		  "attributes": {},
		  "description": "40, 48"
		},
		{
		  "value": "150, 141",
		  "attributes": {},
		  "description": "150, 141"
		},
		{
		  "value": "255, 255",
		  "attributes": {},
		  "description": "255, 255"
		}
	  ],
	  "attributes": {},
	  "description": "2, 17, 40, 48, 150, 141, 255, 255"
	},
	"ToneCurvePV2012Green": {
	  "value": [
		{
		  "value": "0, 8",
		  "attributes": {},
		  "description": "0, 8"
		},
		{
		  "value": "63, 62",
		  "attributes": {},
		  "description": "63, 62"
		},
		{
		  "value": "190, 192",
		  "attributes": {},
		  "description": "190, 192"
		},
		{
		  "value": "255, 235",
		  "attributes": {},
		  "description": "255, 235"
		}
	  ],
	  "attributes": {},
	  "description": "0, 8, 63, 62, 190, 192, 255, 235"
	},
	"ToneCurvePV2012Blue": {
	  "value": [
		{
		  "value": "11, 0",
		  "attributes": {},
		  "description": "11, 0"
		},
		{
		  "value": "45, 45",
		  "attributes": {},
		  "description": "45, 45"
		},
		{
		  "value": "113, 117",
		  "attributes": {},
		  "description": "113, 117"
		},
		{
		  "value": "255, 255",
		  "attributes": {},
		  "description": "255, 255"
		}
	  ],
	  "attributes": {},
	  "description": "11, 0, 45, 45, 113, 117, 255, 255"
	},
	"Look": {
	  "value": {
		"Name": {
		  "value": "Vintage 08",
		  "attributes": {},
		  "description": "Vintage 08"
		},
		"Amount": {
		  "value": "0.28",
		  "attributes": {},
		  "description": "0.28"
		},
		"Cluster": {
		  "value": "Adobe",
		  "attributes": {},
		  "description": "Adobe"
		},
		"UUID": {
		  "value": "8AC303446BAD50DBAE693845AEAFD3B2",
		  "attributes": {},
		  "description": "8AC303446BAD50DBAE693845AEAFD3B2"
		},
		"SupportsMonochrome": {
		  "value": "false",
		  "attributes": {},
		  "description": "false"
		},
		"Group": {
		  "value": [
			{
			  "value": "Vintage",
			  "attributes": {
				"lang": "x-default"
			  },
			  "description": "Vintage"
			}
		  ],
		  "attributes": {},
		  "description": "Vintage"
		},
		"Parameters": {
		  "value": {
			"Version": {
			  "value": "14.0",
			  "attributes": {},
			  "description": "14.0"
			},
			"ProcessVersion": {
			  "value": "11.0",
			  "attributes": {},
			  "description": "11.0"
			},
			"ConvertToGrayscale": {
			  "value": "False",
			  "attributes": {},
			  "description": "False"
			},
			"LookTable": {
			  "value": "E1095149FDB39D7A057BAB208837E2E1",
			  "attributes": {},
			  "description": "E1095149FDB39D7A057BAB208837E2E1"
			},
			"RGBTable": {
			  "value": "09D1205B0E6C1CB5BAD4DC92239622BF",
			  "attributes": {},
			  "description": "09D1205B0E6C1CB5BAD4DC92239622BF"
			},
			"RGBTableAmount": {
			  "value": "0.5",
			  "attributes": {},
			  "description": "0.5"
			}
		  },
		  "attributes": {},
		  "description": "Version: 14.0; ProcessVersion: 11.0; ConvertToGrayscale: False; LookTable: E1095149FDB39D7A057BAB208837E2E1; RGBTable: 09D1205B0E6C1CB5BAD4DC92239622BF; RGBTableAmount: 0.5"
		}
	  },
	  "attributes": {},
	  "description": "Name: Vintage 08; Amount: 0.28; Cluster: Adobe; UUID: 8AC303446BAD50DBAE693845AEAFD3B2; SupportsMonochrome: false; Group: Vintage; Parameters: Version: 14.0; ProcessVersion: 11.0; ConvertToGrayscale: False; LookTable: E1095149FDB39D7A057BAB208837E2E1; RGBTable: 09D1205B0E6C1CB5BAD4DC92239622BF; RGBTableAmount: 0.5"
	},
	"Preferred CMM type": {
	  "value": "Lino",
	  "description": "Lino"
	},
	"Profile Version": {
	  "value": "2.1.0",
	  "description": "2.1.0"
	},
	"Profile/Device class": {
	  "value": "mntr",
	  "description": "Display Device profile"
	},
	"Color Space": {
	  "value": "RGB ",
	  "description": "RGB "
	},
	"Connection Space": {
	  "value": "XYZ ",
	  "description": "XYZ "
	},
	"ICC Profile Date": {
	  "value": "1998-02-09T06:49:00.000Z",
	  "description": "1998-02-09T06:49:00.000Z"
	},
	"ICC Signature": {
	  "value": "acsp",
	  "description": "acsp"
	},
	"Primary Platform": {
	  "value": "MSFT",
	  "description": "Microsoft"
	},
	"Device Manufacturer": {
	  "value": "IEC ",
	  "description": "IEC "
	},
	"Device Model Number": {
	  "value": "sRGB",
	  "description": "sRGB"
	},
	"Rendering Intent": {
	  "value": 0,
	  "description": "Perceptual"
	},
	"Profile Creator": {
	  "value": "HP  ",
	  "description": "HP  "
	},
	"ICC Copyright": {
	  "value": "Copyright (c) 1998 Hewlett-Packard C",
	  "description": "Copyright (c) 1998 Hewlett-Packard C"
	},
	"ICC Description": {
	  "value": "sRGB IEC61966-2.1",
	  "description": "sRGB IEC61966-2.1"
	},
	"ICC Device Manufacturer for Display": {
	  "value": "IEC http://www.iec.ch",
	  "description": "IEC http://www.iec.ch"
	},
	"ICC Device Model Description": {
	  "value": "IEC 61966-2.1 Default RGB colour space - sRGB",
	  "description": "IEC 61966-2.1 Default RGB colour space - sRGB"
	},
	"ICC Viewing Conditions Description": {
	  "value": "Reference Viewing Condition in IEC61966-2.1",
	  "description": "Reference Viewing Condition in IEC61966-2.1"
	},
	"Technology": {
	  "value": "CRT ",
	  "description": "CRT "
	},
	"UUID": {
	  "description": "47B737A1D19D49C48208282F5674C73D"
	}
  }

const filename = 'TestingThisSite.jpg'

let metaData = meta(exifData, filename)
metaDataContainer.innerHTML = metaData
let settingsData = settings(exifData)
settingsDataContainer.innerHTML = settingsData
let filledTemplate = template(exifData, filename)

