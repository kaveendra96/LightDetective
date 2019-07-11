export default (exif, filename) => {
	return `
	<h3>Metadata</h3>
	<span class="label">Filename</span>
	<div class="data">${filename}</div>
	<span class="label">Camera</span>
	<div class="data">${exif.Make.description} ${exif.Model.description}</div>
	<span class="label">Lens</span>
	<div class="data">${exif.Lens.description}</div>
	<span class="label">Exposure Time</span>
	<div class="data">1/${1 / exif.ExposureTime.description}s</div>
	<span class="label">Aperture</span>
	<div class="data">${exif.MaxApertureValue.description}</div>
	<span class="label">ISO</span>
	<div class="data">${exif.ISOSpeedRatings.description}</div>
	<span class="label">Exposure Mode</span>
	<div class="data">${exif.ExposureMode.description}</div>
	<span class="label">Flash</span>
	<div class="data">${exif.Flash.description}</div>
	`
}

function sliderCell(label, sliderClass, value, min, max) {
	return `
	<div class="cell slider-cell">
	${label}
	<div>
	<span class="value slider-value">${value}</span>
	<input
	type="range"
	class="slider ${sliderClass}"
	value="${value || 0}"
	min="${min}"
	max="${max}"
	disabled
	/>
	</div>
	</div>
	`
}

// function renderToneCurve(curve){
// // 0: {value: "0, 39", attributes: {…}, description: "0, 39"}
// // 1: {value: "27, 43", attributes: {…}, description: "27, 43"}
// // 2: {value: "97, 92", attributes: {…}, description: "97, 92"}
// // 3: {value: "167, 163", attributes: {…}, description: "167, 163"}
// // 4: {value: "233, 255", attributes: {…}, description: "233, 255"}
// 	let output = "M"
// 	const xyMatch = /(\d{1,3}), (\d{1,3})/
// 	curve.value.map((point , index) => {
// 		const [_, ...values] = point.description.match(xyMatch)
// 		//TODO: FInish curves
// 		let c = calcControlPoint(curve.value[index-1] || ())
// 		values.push(c)
// 		const[y, x, c] = values.map((value, index) => {
// 			return (1 - value/255) * 300
// 		})

// 		output += `${300-y},${x} `
// 	})
// 	console.log(output)
// 	return output
// }

export function settings(exif) {
	return `
	<h3>Settings</h3>
	${
		"Look" in exif
			? '<div class="block">' +
			  '<span class="label">Look</span>' +
			  '<div class="cell">' +
			  exif.Look.value.Name.description +
			  '</div>'
			: '',
		"Look.Amount" in exif ?
		sliderCell(
			'Amount',
			'slider-bw',
			Math.round(exif.Look.value.Amount.description * 10) / 10,
			0,
			1
		) : ''
	}
	</div>
	<div class="block">
	<span class="label">White Balance</span>
	${exif.WhiteBalance.description}
	${sliderCell(
		'Temp',
		'slider-temperature',
		exif.Temperature.description,
		2000,
		50000
	)}
	${sliderCell('Tint', 'slider-tint', exif.Tint.description, -150, +150)}
	</div>
	<div class="block">
	${sliderCell('Exposure', 'slider-bw', exif.Exposure2012.description, -5, +5)}
	${sliderCell(
		'Contrast',
		'slider-bw',
		exif.Contrast2012.description,
		-100,
		+100
	)}
	${sliderCell(
		'Highlights',
		'slider-bw',
		exif.Highlights2012.description,
		-100,
		+100
	)}
	${sliderCell('Shadows', 'slider-bw', exif.Shadows2012.description, -100, +100)}
	${sliderCell('Whites', 'slider-bw', exif.Whites2012.description, -100, +100)}
	${sliderCell('Blacks', 'slider-bw', exif.Blacks2012.description, -100, +100)}
	</div>
	<div class="block">
	<span class="label">Presence</span>
	${sliderCell('Clarity', 'slider-bw', exif.Clarity2012.description, -100, +100)}
	${sliderCell('Dehaze', 'slider-bw', exif.Dehaze.description, -100, +100)}
	${sliderCell('Vibrance', 'slider-bw', exif.Vibrance.description, -100, +100)}
	${sliderCell(
		'Saturation',
		'slider-bw',
		exif.Saturation.description,
		-100,
		+100
	)}
	</div>
	<div class="block">
	<span class="label">Curves</span>
	<div>
	<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
	<rect width="100%" height="33%" y="33%" fill="none" stroke="#4c4c53" stroke-width="1" stroke-dasharray="4,4" />>
	<rect width="33%" height="100%" x="33%" fill="none" stroke="#4c4c53" stroke-width="1" stroke-dasharray="4,4" />
	<path id="luminance-curve" stroke="#e2e2ee" stroke-width="1" d=""/>
	<rect width="100%" height="100%" fill="none" stroke="#e2e2ee" stroke-width="4" />
	</svg>
	</div>
	</div>
	<div class="block">
	<span class="label">HSL</span>
		<div class="hsl-values">
		Red
			<div class="value">H${exif.HueAdjustmentRed.description}</div>
			<div class="value">S${exif.SaturationAdjustmentRed.description}</div>
			<div class="value">L${exif.LuminanceAdjustmentRed.description}</div>
		Orange
			<div class="value">H${exif.HueAdjustmentOrange.description}</div>
			<div class="value">S${exif.SaturationAdjustmentOrange.description}</div>
			<div class="value">L${exif.LuminanceAdjustmentOrange.description}</div>
		Yellow
			<div class="value">H${exif.HueAdjustmentYellow.description}</div>
			<div class="value">S${exif.SaturationAdjustmentYellow.description}</div>
			<div class="value">L${exif.LuminanceAdjustmentYellow.description}</div>
		Green
			<div class="value">H${exif.HueAdjustmentGreen.description}</div>
			<div class="value">S${exif.SaturationAdjustmentGreen.description}</div>
			<div class="value">L${exif.LuminanceAdjustmentGreen.description}</div>
		Aqua
			<div class="value">H${exif.HueAdjustmentAqua.description}</div>
			<div class="value">S${exif.SaturationAdjustmentAqua.description}</div>
			<div class="value">L${exif.LuminanceAdjustmentAqua.description}</div>
		Blue
			<div class="value">H${exif.HueAdjustmentBlue.description}</div>
			<div class="value">S${exif.SaturationAdjustmentBlue.description}</div>
			<div class="value">L${exif.LuminanceAdjustmentBlue.description}</div>
		Purple
			<div class="value">H${exif.HueAdjustmentPurple.description}</div>
			<div class="value">S${exif.SaturationAdjustmentPurple.description}</div>
			<div class="value">L${exif.LuminanceAdjustmentPurple.description}</div>
		Magenta
			<div class="value">H${exif.HueAdjustmentMagenta.description}</div>
			<div class="value">S${exif.SaturationAdjustmentMagenta.description}</div>
			<div class="value">L${exif.LuminanceAdjustmentMagenta.description}</div>
		</div>
	</div>
	<div class="block">
	<span class="label">Split Toning</span>
	<span class="label">Shadows</span>
	${sliderCell(
		'Hue',
		'slider-rainbow',
		exif.SplitToningShadowHue.description,
		0,
		+100
	)}
	${sliderCell(
		'Saturation',
		'slider-blackred',
		exif.SplitToningShadowSaturation.description,
		0,
		+100
	)}
	<span class="label">Highlights</span>
	${sliderCell(
		'Hue',
		'slider-rainbow',
		exif.SplitToningHighlightHue.description,
		-100,
		+100
	)}
	${sliderCell(
		'Saturation',
		'slider-blackred',
		exif.SplitToningHighlightSaturation.description,
		-100,
		+100
	)}
	<span class="label">Balance</span>
	${sliderCell(
		'Balance',
		'slider-bw',
		exif.SplitToningBalance.description,
		-100,
		+100
	)}
	</div>
	<div class="block">
	<span class="label">Details</span>
	<div class="cell">Sharpening</div>
	${sliderCell('Amount', 'slider-blackred', exif.Sharpness.description, 0, 150)}
	${sliderCell('Radius', 'slider-bw', exif.SharpenRadius.description, 0.0, 3.0)}
	${sliderCell('Detail', 'slider-bw', exif.SharpenDetail.description, 0, 100)}
	${sliderCell(
		'Masking',
		'slider-whiteblack',
		exif.SharpenEdgeMasking.description,
		0,
		100
	)}
	<div class="cell">Noise Reduction</div>
	<span class="label">Luminosity</span>
	${sliderCell(
		'Amount',
		'slider-bw',
		exif.LuminanceSmoothing.description,
		0,
		100
	)}
	${
		exif['LuminanceNoiseReductionDetail']
			? sliderCell(
					'Detail',
					'slider-bw',
					exif.LuminanceNoiseReductionDetail.description,
					0,
					100
			  )
			: ''
	}
	${
		exif['LuminanceNoiseReductionContrast']
			? sliderCell(
					'Contrast',
					'slider-bw',
					exif.LuminanceNoiseReductionContrast.description,
					0,
					100
			  )
			: ''
	}
	<div class="cell">Color</div>
	<span class="label">Color</span>
	${sliderCell(
		'Amount',
		'slider-bw',
		exif.ColorNoiseReduction.description,
		0,
		100
	)}
	${sliderCell(
		'Detail',
		'slider-bw',
		exif.ColorNoiseReductionDetail.description,
		0,
		100
	)}
	${sliderCell(
		'Smoothness',
		'slider-bw',
		exif.ColorNoiseReductionSmoothness.description,
		0,
		100
	)}
	</div>
	<div class="block">
	<span class="label">Corrections</span>
	<span class="label">Lens Correction</span>
		<div class="cell">Distortion <span>${
			exif.DistortionCorrectionAlreadyApplied
				? exif.DistortionCorrectionAlreadyApplied.description
				: 'False'
		}</span></div>
		<div class="cell">Vignette <span>${
			exif.VignetteCorrectionAlreadyApplied
				? exif.VignetteCorrectionAlreadyApplied.description
				: 'False'
		}</span></div>
		<div class="cell">CA <span>${
			exif.LateralChromaticAberrationCorrectionAlreadyApplied
				? exif.LateralChromaticAberrationCorrectionAlreadyApplied
						.description
				: 'False'
		}</span></div>
		<div class="cell">Upright <span>${
			parseInt(exif.PerspectiveUpright.description) >= 1
				? 'True'
				: 'False'
		}</span></div>
	</div>
	<div class="block">
	<span class="label">Effects</span>
	<div>
	<span class="label">Vignette</span>
	${
		exif.PostCropVignetteAmount
			? sliderCell(
					'Amount',
					'slider-bw',
					exif.PostCropVignetteAmount.description,
					-100,
					+100
			  )
			: ''
	}
	${
		exif.PostCropVignetteMidpoint
			? sliderCell(
					'Midpoint',
					'slider-bw',
					exif.PostCropVignetteMidpoint.description,
					0,
					100
			  )
			: ''
	}
	${
		exif.PostCropVignetteRoundness
			? sliderCell(
					'Roundness',
					'slider-bw',
					exif.PostCropVignetteRoundness.description,
					-100,
					+100
			  )
			: ''
	}
	${
		exif.PostCropVignetteFeather
			? sliderCell(
					'Feather',
					'slider-bw',
					exif.PostCropVignetteFeather.description,
					0,
					100
			  )
			: ''
	}
	${
		exif.PostCropVignetteHighlightContrast
			? sliderCell(
					'Highlights',
					'slider-bw',
					exif.PostCropVignetteHighlightContrast.description,
					0,
					100
			  )
			: ''
	}
	</div>
	<div class="cell">Grain</div>
	${
		exif.GrainAmount
			? sliderCell(
					'Amount',
					'slider-bw',
					exif.GrainAmount.description,
					0,
					100
			  )
			: ''
	}
	${
		exif.GrainSize
			? sliderCell(
					'Size',
					'slider-bw',
					exif.GrainSize.description,
					0,
					100
			  )
			: ''
	}
	${
		exif.GrainFrequency
			? sliderCell(
					'Frequency',
					'slider-bw',
					exif.GrainFrequency.description,
					0,
					100
			  )
			: ''
	}
	</div>
	<div class="block">
	<span class="label">Calibration</span>
	<div>
	${sliderCell(
		'Shadow Tint',
		'slider-bw',
		exif.ShadowTint.description,
		-100,
		+100
	)}
	</div>
	<div>
	<span class="label">Red</span>
	${sliderCell(
		'Hue',
		'slider-magentaorange',
		exif.RedHue.description,
		-100,
		+100
	)}
	${sliderCell(
		'Saturation',
		'slider-blackred',
		exif.RedSaturation.description,
		-100,
		+100
	)}
	<span class="label">Green</span>
	${sliderCell('Hue', 'slider-yellowaqua', exif.GreenHue.description, -100, +100)}
	${sliderCell(
		'Saturation',
		'slider-blackgreen',
		exif.GreenSaturation.description,
		-100,
		+100
	)}
	<span class="label">Blue</span>
	${sliderCell('Hue', 'slider-aquapurple', exif.BlueHue.description, -100, +100)}
	${sliderCell(
		'Saturation',
		'slider-blackblue',
		exif.BlueSaturation.description,
		-100,
		+100
	)}
	</div>
	</div>
	`
}
