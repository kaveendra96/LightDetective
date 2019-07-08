export default (exif) => {
	let props = ''
	Object.keys(exif).forEach(key => {
		if (properties.includes(key)) {
			props += `crs:${key}="${exif[key].description}"\n`
		}
	})
	props = props.replace(/\n$/, "")
	return props
}

const properties = [
	"UUID",
	"WhiteBalance",
	"Temperature",
	"Tint",
	"Saturation",
	"Sharpness",
	"LuminanceSmoothing",
	"ColorNoiseReduction",
	"VignetteAmount",
	"ShadowTint",
	"RedHue",
	"RedSaturation",
	"GreenHue",
	"GreenSaturation",
	"BlueHue",
	"BlueSaturation",
	"Vibrance",
	"HueAdjustmentRed",
	"HueAdjustmentOrange",
	"HueAdjustmentYellow",
	"HueAdjustmentGreen",
	"HueAdjustmentAqua",
	"HueAdjustmentBlue",
	"HueAdjustmentPurple",
	"HueAdjustmentMagenta",
	"SaturationAdjustmentRed",
	"SaturationAdjustmentOrange",
	"SaturationAdjustmentYellow",
	"SaturationAdjustmentGreen",
	"SaturationAdjustmentAqua",
	"SaturationAdjustmentBlue",
	"SaturationAdjustmentPurple",
	"SaturationAdjustmentMagenta",
	"LuminanceAdjustmentRed",
	"LuminanceAdjustmentOrange",
	"LuminanceAdjustmentYellow",
	"LuminanceAdjustmentGreen",
	"LuminanceAdjustmentAqua",
	"LuminanceAdjustmentBlue",
	"LuminanceAdjustmentPurple",
	"LuminanceAdjustmentMagenta",
	"SplitToningShadowHue",
	"SplitToningShadowSaturation",
	"SplitToningHighlightHue",
	"SplitToningHighlightSaturation",
	"SplitToningBalance",
	"ParametricShadows",
	"ParametricDarks",
	"ParametricLights",
	"ParametricHighlights",
	"ParametricShadowSplit",
	"ParametricMidtoneSplit",
	"ParametricHighlightSplit",
	"SharpenRadius",
	"SharpenDetail",
	"SharpenEdgeMasking",
	"PostCropVignetteAmount",
	"PostCropVignetteMidpoint",
	"PostCropVignetteFeather",
	"PostCropVignetteRoundness",
	"PostCropVignetteStyle",
	"PostCropVignetteHighlightContrast",
	"GrainAmount",
	"GrainSize",
	"GrainFrequency",
	"LuminanceNoiseReductionDetail",
	"ColorNoiseReductionDetail",
	"LuminanceNoiseReductionContrast",
	"ColorNoiseReductionSmoothness",
	"LensProfileEnable",
	"LensManualDistortionAmount",
	"PerspectiveVertical",
	"PerspectiveHorizontal",
	"PerspectiveRotate",
	"PerspectiveScale",
	"PerspectiveAspect",
	"PerspectiveUpright",
	"PerspectiveX",
	"PerspectiveY",
	"AutoLateralCA",
	"Exposure2012",
	"Contrast2012",
	"Highlights2012",
	"Shadows2012",
	"Whites2012",
	"Blacks2012",
	"Clarity2012",
	"DefringePurpleAmount",
	"DefringePurpleHueLo",
	"DefringePurpleHueHi",
	"DefringeGreenAmount",
	"DefringeGreenHueLo",
	"DefringeGreenHueHi",
	"Dehaze",
	"OverrideLookVignette",
	"ToneCurveName2012",
	"LensProfileSetup",
	"LensProfileName",
	"LensProfileFilename",
	"LensProfileDigest",
	"LensProfileDistortionScale",
	"LensProfileChromaticAberrationScale",
	"LensProfileVignettingScale",
	"HasSettings",
]

// const descriptionProperties = {
// 	UUID: `crs:UUID="${exif.UUID.description}"`,
//	WhiteBalance: `crs:WhiteBalance="${exif.WhiteBalance.description}"`,
// 	Temperature: `crs:Temperature="${exif.Temperature.description}"`,
// 	Tint: `crs:Tint="${exif.Tint.description}"`,
// 	Saturation: `crs:Saturation="${exif.Saturation.description}"`,
// 	Sharpness: `crs:Sharpness="${exif.Sharpness.description}"`,
// 	LuminanceSmoothing: `crs:LuminanceSmoothing="${
// 		exif.LuminanceSmoothing.description
// 	}"`,
// 	ColorNoiseReduction: `crs:ColorNoiseReduction="${
// 		exif.ColorNoiseReduction.description
// 	}"`,
// 	VignetteAmount: `crs:VignetteAmount="${exif.VignetteAmount.description}"`,
// 	ShadowTint: `crs:ShadowTint="${exif.ShadowTint.description}"`,
// 	RedHue: `crs:RedHue="${exif.RedHue.description}"`,
// 	RedSaturation: `crs:RedSaturation="${exif.RedSaturation.description}"`,
// 	GreenHue: `crs:GreenHue="${exif.GreenHue.description}"`,
// 	GreenSaturation: `crs:GreenSaturation="${
// 		exif.GreenSaturation.description
// 	}"`,
// 	BlueHue: `crs:BlueHue="${exif.BlueHue.description}"`,
// 	BlueSaturation: `crs:BlueSaturation="${exif.BlueSaturation.description}"`,
// 	Vibrance: `crs:Vibrance="${exif.Vibrance.description}"`,
// 	HueAdjustmentRed: `crs:HueAdjustmentRed="${
// 		exif.HueAdjustmentRed.description
// 	}"`,
// 	HueAdjustmentOrange: `crs:HueAdjustmentOrange="${
// 		exif.HueAdjustmentOrange.description
// 	}"`,
// 	HueAdjustmentYellow: `crs:HueAdjustmentYellow="${
// 		exif.HueAdjustmentYellow.description
// 	}"`,
// 	HueAdjustmentGreen: `crs:HueAdjustmentGreen="${
// 		exif.HueAdjustmentGreen.description
// 	}"`,
// 	HueAdjustmentAqua: `crs:HueAdjustmentAqua="${
// 		exif.HueAdjustmentAqua.description
// 	}"`,
// 	HueAdjustmentBlue: `crs:HueAdjustmentBlue="${
// 		exif.HueAdjustmentBlue.description
// 	}"`,
// 	HueAdjustmentPurple: `crs:HueAdjustmentPurple="${
// 		exif.HueAdjustmentPurple.description
// 	}"`,
// 	HueAdjustmentMagenta: `crs:HueAdjustmentMagenta="${
// 		exif.HueAdjustmentMagenta.description
// 	}"`,
// 	SaturationAdjustmentRed: `crs:SaturationAdjustmentRed="${
// 		exif.SaturationAdjustmentRed.description
// 	}"`,
// 	SaturationAdjustmentOrange: `crs:SaturationAdjustmentOrange="${
// 		exif.SaturationAdjustmentOrange.description
// 	}"`,
// 	SaturationAdjustmentYellow: `crs:SaturationAdjustmentYellow="${
// 		exif.SaturationAdjustmentYellow.description
// 	}"`,
// 	SaturationAdjustmentGreen: `crs:SaturationAdjustmentGreen="${
// 		exif.SaturationAdjustmentGreen.description
// 	}"`,
// 	SaturationAdjustmentAqua: `crs:SaturationAdjustmentAqua="${
// 		exif.SaturationAdjustmentAqua.description
// 	}"`,
// 	SaturationAdjustmentBlue: `crs:SaturationAdjustmentBlue="${
// 		exif.SaturationAdjustmentBlue.description
// 	}"`,
// 	SaturationAdjustmentPurple: `crs:SaturationAdjustmentPurple="${
// 		exif.SaturationAdjustmentPurple.description
// 	}"`,
// 	SaturationAdjustmentMagenta: `crs:SaturationAdjustmentMagenta="${
// 		exif.SaturationAdjustmentMagenta.description
// 	}"`,
// 	LuminanceAdjustmentRed: `crs:LuminanceAdjustmentRed="${
// 		exif.LuminanceAdjustmentRed.description
// 	}"`,
// 	LuminanceAdjustmentOrange: `crs:LuminanceAdjustmentOrange="${
// 		exif.LuminanceAdjustmentOrange.description
// 	}"`,
// 	LuminanceAdjustmentYellow: `crs:LuminanceAdjustmentYellow="${
// 		exif.LuminanceAdjustmentYellow.description
// 	}"`,
// 	LuminanceAdjustmentGreen: `crs:LuminanceAdjustmentGreen="${
// 		exif.LuminanceAdjustmentGreen.description
// 	}"`,
// 	LuminanceAdjustmentAqua: `crs:LuminanceAdjustmentAqua="${
// 		exif.LuminanceAdjustmentAqua.description
// 	}"`,
// 	LuminanceAdjustmentBlue: `crs:LuminanceAdjustmentBlue="${
// 		exif.LuminanceAdjustmentBlue.description
// 	}"`,
// 	LuminanceAdjustmentPurple: `crs:LuminanceAdjustmentPurple="${
// 		exif.LuminanceAdjustmentPurple.description
// 	}"`,
// 	LuminanceAdjustmentMagenta: `crs:LuminanceAdjustmentMagenta="${
// 		exif.LuminanceAdjustmentMagenta.description
// 	}"`,
// 	SplitToningShadowHue: `crs:SplitToningShadowHue="${
// 		exif.SplitToningShadowHue.description
// 	}"`,
// 	SplitToningShadowSaturation: `crs:SplitToningShadowSaturation="${
// 		exif.SplitToningShadowSaturation.description
// 	}"`,
// 	SplitToningHighlightHue: `crs:SplitToningHighlightHue="${
// 		exif.SplitToningHighlightHue.description
// 	}"`,
// 	SplitToningHighlightSaturation: `crs:SplitToningHighlightSaturation="${
// 		exif.SplitToningHighlightSaturation.description
// 	}"`,
// 	SplitToningBalance: `crs:SplitToningBalance="${
// 		exif.SplitToningBalance.description
// 	}8"`,
// 	ParametricShadows: `crs:ParametricShadows="${
// 		exif.ParametricShadows.description
// 	}"`,
// 	ParametricDarks: `crs:ParametricDarks="${
// 		exif.ParametricDarks.description
// 	}"`,
// 	ParametricLights: `crs:ParametricLights="${
// 		exif.ParametricLights.description
// 	}"`,
// 	ParametricHighlights: `crs:ParametricHighlights="${
// 		exif.ParametricHighlights.description
// 	}"`,
// 	ParametricShadowSplit: `crs:ParametricShadowSplit="${
// 		exif.ParametricShadowSplit.description
// 	}"`,
// 	ParametricMidtoneSplit: `crs:ParametricMidtoneSplit="${
// 		exif.ParametricMidtoneSplit.description
// 	}"`,
// 	ParametricHighlightSplit: `crs:ParametricHighlightSplit="${
// 		exif.ParametricHighlightSplit.description
// 	}"`,
// 	SharpenRadius: `crs:SharpenRadius="${exif.SharpenRadius.description}"`,
// 	SharpenDetail: `crs:SharpenDetail="${exif.SharpenDetail.description}"`,
// 	SharpenEdgeMasking: `crs:SharpenEdgeMasking="${
// 		exif.SharpenEdgeMasking.description
// 	}"`,
// 	PostCropVignetteAmount: `crs:PostCropVignetteAmount="${
// 		exif.PostCropVignetteAmount.description
// 	}"`,
// 	PostCropVignetteMidpoint: `crs:PostCropVignetteMidpoint="${
// 		exif.PostCropVignetteMidpoint.description
// 	}"`,
// 	PostCropVignetteFeather: `crs:PostCropVignetteFeather="${
// 		exif.PostCropVignetteFeather.description
// 	}"`,
// 	PostCropVignetteRoundness: `crs:PostCropVignetteRoundness="${
// 		exif.PostCropVignetteRoundness.description
// 	}"`,
// 	PostCropVignetteStyle: `crs:PostCropVignetteStyle="${
// 		exif.PostCropVignetteStyle.description
// 	}"`,
// 	PostCropVignetteHighlightContrast: `crs:PostCropVignetteHighlightContrast="${
// 		exif.PostCropVignetteHighlightContrast.description
// 	}"`,
// 	GrainAmount: `crs:GrainAmount="${exif.GrainAmount.description}"`,
// 	GrainSize: `crs:GrainSize="${exif.GrainSize.description}"`,
// 	GrainFrequency: `crs:GrainFrequency="${exif.GrainFrequency.description}"`,
// 	LuminanceNoiseReductionDetail: `crs:LuminanceNoiseReductionDetail="${
// 		exif.LuminanceNoiseReductionDetail.description
// 	}"`,
// 	ColorNoiseReductionDetail: `crs:ColorNoiseReductionDetail="${
// 		exif.ColorNoiseReductionDetail.description
// 	}"`,
// 	LuminanceNoiseReductionContrast: `crs:LuminanceNoiseReductionContrast="${
// 		exif.LuminanceNoiseReductionContrast.description
// 	}"`,
// 	ColorNoiseReductionSmoothness: `crs:ColorNoiseReductionSmoothness="${
// 		exif.ColorNoiseReductionSmoothness.description
// 	}"`,
// 	LensProfileEnable: `crs:LensProfileEnable="${
// 		exif.LensProfileEnable.description
// 	}"`,
// 	LensManualDistortionAmount: `crs:LensManualDistortionAmount="${
// 		exif.LensManualDistortionAmount.description
// 	}"`,
// 	PerspectiveVertical: `crs:PerspectiveVertical="${
// 		exif.PerspectiveVertical.description
// 	}"`,
// 	PerspectiveHorizontal: `crs:PerspectiveHorizontal="${
// 		exif.PerspectiveHorizontal.description
// 	}"`,
// 	PerspectiveRotate: `crs:PerspectiveRotate="${
// 		exif.PerspectiveRotate.description
// 	}"`,
// 	PerspectiveScale: `crs:PerspectiveScale="${
// 		exif.PerspectiveScale.description
// 	}"`,
// 	PerspectiveAspect: `crs:PerspectiveAspect="${
// 		exif.PerspectiveAspect.description
// 	}"`,
// 	PerspectiveUpright: `crs:PerspectiveUpright="${
// 		exif.PerspectiveUpright.description
// 	}"`,
// 	PerspectiveX: `crs:PerspectiveX="${exif.PerspectiveX.description}"`,
// 	PerspectiveY: `crs:PerspectiveY="${exif.PerspectiveY.description}"`,
// 	AutoLateralCA: `crs:AutoLateralCA="${exif.AutoLateralCA.description}"`,
// 	Exposure2012: `crs:Exposure2012="${exif.Exposure2012.description}"`,
// 	Contrast2012: `crs:Contrast2012="${exif.Contrast2012.description}"`,
// 	Highlights2012: `crs:Highlights2012="${exif.Highlights2012.description}"`,
// 	Shadows2012: `crs:Shadows2012="${exif.Shadows2012.description}"`,
// 	Whites2012: `crs:Whites2012="${exif.Whites2012.description}"`,
// 	Blacks2012: `crs:Blacks2012="${exif.Blacks2012.description}"`,
// 	Clarity2012: `crs:Clarity2012="${exif.Clarity2012.description}"`,
// 	DefringePurpleAmount: `crs:DefringePurpleAmount="${
// 		exif.DefringePurpleAmount.description
// 	}"`,
// 	DefringePurpleHueLo: `crs:DefringePurpleHueLo="${
// 		exif.DefringePurpleHueLo.description
// 	}"`,
// 	DefringePurpleHueHi: `crs:DefringePurpleHueHi="${
// 		exif.DefringePurpleHueHi.description
// 	}"`,
// 	DefringeGreenAmount: `crs:DefringeGreenAmount="${
// 		exif.DefringeGreenAmount.description
// 	}"`,
// 	DefringeGreenHueLo: `crs:DefringeGreenHueLo="${
// 		exif.DefringeGreenHueLo.description
// 	}"`,
// 	DefringeGreenHueHi: `crs:DefringeGreenHueHi="${
// 		exif.DefringeGreenHueHi.description
// 	}"`,
// 	Dehaze: `crs:Dehaze="${exif.Dehaze.description}"`,
// 	OverrideLookVignette: `crs:OverrideLookVignette="${
// 		exif.OverrideLookVignette.description
// 	}"`,
// 	ToneCurveName2012: `crs:ToneCurveName2012="${
// 		exif.ToneCurveName2012.description
// 	}"`,
// 	LensProfileSetup: `crs:LensProfileSetup="${
// 		exif.LensProfileSetup.description
// 	}"`,
// 	LensProfileName: `crs:LensProfileName="${
// 		exif.LensProfileName.description
// 	}"`,
// 	LensProfileFilename: `crs:LensProfileFilename="${
// 		exif.LensProfileFilename.description
// 	}"`,
// 	LensProfileDigest: `crs:LensProfileDigest="${
// 		exif.LensProfileDigest.description
// 	}"`,
// 	LensProfileDistortionScale: `crs:LensProfileDistortionScale="${
// 		exif.LensProfileDistortionScale.description
// 	}"`,
// 	LensProfileChromaticAberrationScale: `crs:LensProfileChromaticAberrationScale="${
// 		exif.LensProfileChromaticAberrationScale.description
// 	}"`,
// 	LensProfileVignettingScale: `crs:LensProfileVignettingScale="${
// 		exif.LensProfileVignettingScale.description
// 	}"`,
// 	HasSettings: `crs:HasSettings="${exif.HasSettings.description}"`
// }