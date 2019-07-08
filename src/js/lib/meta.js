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
	<span class="label">White Balance</span>
	<div class="data">${exif.WhiteBalance.description}</div>
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

export function settings(exif) {
	console.log(exif)
	return `
	<h3>Settings</h3>
	<div class="block">
	<span class="label">Look</span>
	<div class="cell">${exif.Look.value.Name.description}</div>
	${sliderCell('Amount', 'slider-bw', Math.round(exif.Look.value.Amount.description * 10) / 10, 0, 1)}
	</div>
	<div class="block">
	<span class="label">White Balance</span>
	${exif.WhiteBalance.description}
	${sliderCell('Temp', 'slider-temperature', exif.Temperature.description, 2000, 50000)}
	${sliderCell('Tint', 'slider-tint', exif.Tint.description, -150, +150)}
	</div>
	<div class="block">
	${sliderCell('Exposure', 'slider-bw', exif.Exposure2012.description, -5, +5)}
	${sliderCell('Contrast', 'slider-bw', exif.Contrast2012.description, -100, +100)}
	${sliderCell('Highlights', 'slider-bw', exif.Highlights2012.description, -100, +100)}
	${sliderCell('Shadows', 'slider-bw', exif.Shadows2012.description, -100, +100)}
	${sliderCell('Whites', 'slider-bw', exif.Whites2012.description, -100, +100)}
	${sliderCell('Blacks', 'slider-bw', exif.Blacks2012.description, -100, +100)}
	</div>
	<div class="block">
	<span class="label">Presence</span>
	${sliderCell('Clarity', 'slider-bw', exif.Clarity2012.description, -100, +100)}
	${sliderCell('Dehaze', 'slider-bw', exif.Dehaze.description, -100, +100)}
	${sliderCell('Vibrance', 'slider-bw', exif.Vibrance.description, -100, +100)}
	${sliderCell('Saturation', 'slider-bw', exif.Saturation.description, -100, +100)}
	</div>
	<div class="block">
	<span class="label">Curves</span>
	</div>
	<div class="block">
	<span class="label">HSL</span>
	<div class="cell">
		Red <span class="value">
			H ${exif.HueAdjustmentRed.description}
			S ${exif.SaturationAdjustmentRed.description}
			L ${exif.LuminanceAdjustmentRed.description}
		</span>
	</div>
	<div class="cell">
		Orange <span class="value">
			H ${exif.HueAdjustmentOrange.description}
			S ${exif.SaturationAdjustmentOrange.description}
			L ${exif.LuminanceAdjustmentOrange.description}
		</span>
	</div>
	<div class="cell">
		Yellow <span class="value">
			H ${exif.HueAdjustmentYellow.description}
			S ${exif.SaturationAdjustmentYellow.description}
			L ${exif.LuminanceAdjustmentYellow.description}
		</span>
	</div>
	<div class="cell">
		Green <span class="value">
			H ${exif.HueAdjustmentGreen.description}
			S ${exif.SaturationAdjustmentGreen.description}
			L ${exif.LuminanceAdjustmentGreen.description}
		</span>
	</div>
	<div class="cell">
		Aqua <span class="value">
			H ${exif.HueAdjustmentAqua.description}
			S ${exif.SaturationAdjustmentAqua.description}
			L ${exif.LuminanceAdjustmentAqua.description}
		</span>
	</div>
	<div class="cell">
		Blue <span class="value">
			H ${exif.HueAdjustmentBlue.description}
			S ${exif.SaturationAdjustmentBlue.description}
			L ${exif.LuminanceAdjustmentBlue.description}
		</span>
	</div>
	<div class="cell">
		Purple <span class="value">
			H ${exif.HueAdjustmentPurple.description}
			S ${exif.SaturationAdjustmentPurple.description}
			L ${exif.LuminanceAdjustmentPurple.description}
		</span>
	</div>
	<div class="cell">
		Magenta <span class="value">
			H ${exif.HueAdjustmentMagenta.description}
			S ${exif.SaturationAdjustmentMagenta.description}
			L ${exif.LuminanceAdjustmentMagenta.description}
		</span>
	</div>
	</div>
	<div class="block">
	<span class="label">Split Toning</span>
	<span class="label">Shadows</span>
	${sliderCell('Hue', 'slider-bw', exif.SplitToningShadowHue.description, -100, +100)}
	${sliderCell('Saturation', 'slider-blackred', exif.SplitToningShadowSaturation.description, -100, +100)}
	<span class="label">Highlights</span>
	${sliderCell('Hue', 'slider-bw', exif.SplitToningHighlightHue.description, -100, +100)}
	${sliderCell('Saturation', 'slider-blackred', exif.SplitToningHighlightSaturation.description, -100, +100)}
	<span class="label">Balance</span>
	${sliderCell('Balance', 'slider-bw', exif.SplitToningBalance.description, -100, +100)}
	</div>
	<div class="block">
	<span class="label">Details</span>
	<div class="cell">Sharpening</div>
	${sliderCell('Amount', 'slider-blackred', exif.Sharpness.description, 0, 150)}
	${sliderCell('Radius', 'slider-bw', exif.SharpenRadius.description, 0.0, 3.0)}
	${sliderCell('Detail', 'slider-bw', exif.SharpenDetail.description, 0, 100)}
	${sliderCell('Masking', 'slider-whiteblack', exif.SharpenEdgeMasking.description, 0, 100)}
	<div class="cell">Noise Reduction</div>
	<span class="label">Luminosity</span>
	${sliderCell('Amount', 'slider-bw', exif.LuminanceSmoothing.description, 0, 100)}
	${sliderCell('Detail', 'slider-bw', exif.LuminanceNoiseReductionDetail.description, 0, 100)}
	${sliderCell('Contrast', 'slider-bw', exif.LuminanceNoiseReductionContrast.description, 0, 100)}
	<div class="cell">Color</div>
	<span class="label">Color</span>
	${sliderCell('Amount', 'slider-bw', exif.ColorNoiseReduction.description, 0, 100)}
	${sliderCell('Detail', 'slider-bw', exif.ColorNoiseReductionDetail.description, 0, 100)}
	${sliderCell('Smoothness', 'slider-bw', exif.ColorNoiseReductionSmoothness.description, 0, 100)}
	</div>
	<div class="block">
	<span class="label">Corrections</span>
	<div class="cell">Lens Correction</div>
	<div class="cell">Upright</div>
	</div>
	<div class="block">
	<span class="label">Effects</span>
	<div class="cell">Vignette</div>
	Amount
	Midpoint
	Roundness
	Feather
	Highlights
	<div class="cell">Grain</div>
	Amount
	Size
	Randomness
	</div>
	<div class="block">
	<span class="label">Calibration</span>
	<div class="cell">Shadow Tint</div>
	<div class="cell">R / G / B</div>
	Hue
	Saturation
	</div>
	`
}
