export default exif => {
	let props = ''
	Object.keys(exif).forEach(key => {
		if (properties.includes(key)) {
			props += `crs:${key}="${exif[key].description}"\n`
		}
	})
	props = props.replace(/\n$/, '')
	return props
}

export function fixOutdated(exif) {
	const older = [
		'Exposure',
		'Contrast',
		'Highlights',
		'Shadows',
		'Whites',
		'Blacks',
		'Clarity'
	]

	older.map(property => {
		if (property in exif && !((property + "2012") in exif)) {
			exif[property + '2012'] = exif[property]
			delete exif.property
		}
	})

	'HighlightRecovery' in exif
		? (exif['Highlights2012'] = exif['HighlightRecovery'])
		: ''

	const newer = [
		'Exposure2012',
		'Contrast2012',
		'Highlights2012',
		'Shadows2012',
		'Whites2012',
		'Blacks2012',
		'Clarity2012',
		'Dehaze'
	]

	newer.map(key => {
		console.log(key)
		exif[key] ?  '' : exif[key] = { description: "0" }
	})
	return exif
}

const properties = [
	'UUID',
	'WhiteBalance',
	'Temperature',
	'Tint',
	'Saturation',
	'Sharpness',
	'LuminanceSmoothing',
	'ColorNoiseReduction',
	'VignetteAmount',
	'ShadowTint',
	'RedHue',
	'RedSaturation',
	'GreenHue',
	'GreenSaturation',
	'BlueHue',
	'BlueSaturation',
	'Vibrance',
	'HueAdjustmentRed',
	'HueAdjustmentOrange',
	'HueAdjustmentYellow',
	'HueAdjustmentGreen',
	'HueAdjustmentAqua',
	'HueAdjustmentBlue',
	'HueAdjustmentPurple',
	'HueAdjustmentMagenta',
	'SaturationAdjustmentRed',
	'SaturationAdjustmentOrange',
	'SaturationAdjustmentYellow',
	'SaturationAdjustmentGreen',
	'SaturationAdjustmentAqua',
	'SaturationAdjustmentBlue',
	'SaturationAdjustmentPurple',
	'SaturationAdjustmentMagenta',
	'LuminanceAdjustmentRed',
	'LuminanceAdjustmentOrange',
	'LuminanceAdjustmentYellow',
	'LuminanceAdjustmentGreen',
	'LuminanceAdjustmentAqua',
	'LuminanceAdjustmentBlue',
	'LuminanceAdjustmentPurple',
	'LuminanceAdjustmentMagenta',
	'SplitToningShadowHue',
	'SplitToningShadowSaturation',
	'SplitToningHighlightHue',
	'SplitToningHighlightSaturation',
	'SplitToningBalance',
	'ParametricShadows',
	'ParametricDarks',
	'ParametricLights',
	'ParametricHighlights',
	'ParametricShadowSplit',
	'ParametricMidtoneSplit',
	'ParametricHighlightSplit',
	'SharpenRadius',
	'SharpenDetail',
	'SharpenEdgeMasking',
	'PostCropVignetteAmount',
	'PostCropVignetteMidpoint',
	'PostCropVignetteFeather',
	'PostCropVignetteRoundness',
	'PostCropVignetteStyle',
	'PostCropVignetteHighlightContrast',
	'GrainAmount',
	'GrainSize',
	'GrainFrequency',
	'LuminanceNoiseReductionDetail',
	'ColorNoiseReductionDetail',
	'LuminanceNoiseReductionContrast',
	'ColorNoiseReductionSmoothness',
	'LensProfileEnable',
	'LensManualDistortionAmount',
	'PerspectiveVertical',
	'PerspectiveHorizontal',
	'PerspectiveRotate',
	'PerspectiveScale',
	'PerspectiveAspect',
	'PerspectiveUpright',
	'PerspectiveX',
	'PerspectiveY',
	'AutoLateralCA',
	'Exposure2012',
	'Contrast2012',
	'Highlights2012',
	'Shadows2012',
	'Whites2012',
	'Blacks2012',
	'Clarity2012',
	'DefringePurpleAmount',
	'DefringePurpleHueLo',
	'DefringePurpleHueHi',
	'DefringeGreenAmount',
	'DefringeGreenHueLo',
	'DefringeGreenHueHi',
	'Dehaze',
	'OverrideLookVignette',
	'ToneCurveName2012',
	'LensProfileSetup',
	'LensProfileName',
	'LensProfileFilename',
	'LensProfileDigest',
	'LensProfileDistortionScale',
	'LensProfileChromaticAberrationScale',
	'LensProfileVignettingScale',
	'HasSettings'
]
