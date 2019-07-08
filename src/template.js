exports.meta = (exif) => {
	return `
	<h3>Metadata</h3>
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

export default (exif) => {
	return `
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.6-c140 79.160451, 2017/05/06-01:08:21        ">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
    xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/"
   crs:PresetType="Normal"
   crs:Cluster=""
   crs:UUID="${exif.XXXX.description}"
   crs:SupportsAmount="False"
   crs:SupportsColor="True"
   crs:SupportsMonochrome="True"
   crs:SupportsHighDynamicRange="True"
   crs:SupportsNormalDynamicRange="True"
   crs:SupportsSceneReferred="True"
   crs:SupportsOutputReferred="True"
   crs:CameraModelRestriction=""
   crs:Copyright="Preset created by Light Detective"
   crs:ContactInfo=""
   crs:Version="${exif.XXXX.description}"
   crs:ProcessVersion="${exif.XXXX.description}"
   crs:WhiteBalance="${this.Temperature.description === "0" && this.Tint.description === "0" ? "As Shot" : "Custom"}"
   crs:Temperature="${exif.XXXX.description}"
   crs:Tint="${exif.XXXX.description}"
   crs:Saturation="${exif.XXXX.description}"
   crs:Sharpness="${exif.XXXX.description}"
   crs:LuminanceSmoothing="${exif.XXXX.description}"
   crs:ColorNoiseReduction="${exif.XXXX.description}"
   crs:VignetteAmount="${exif.XXXX.description}"
   crs:ShadowTint="${exif.XXXX.description}"
   crs:RedHue="${exif.XXXX.description}"
   crs:RedSaturation="${exif.XXXX.description}"
   crs:GreenHue="${exif.XXXX.description}8"
   crs:GreenSaturation="${exif.XXXX.description}6"
   crs:BlueHue="${exif.XXXX.description}3"
   crs:BlueSaturation="${exif.XXXX.description}"
   crs:Vibrance="${exif.XXXX.description}9"
   crs:HueAdjustmentRed="${exif.XXXX.description}"
   crs:HueAdjustmentOrange="${exif.XXXX.description}"
   crs:HueAdjustmentYellow="${exif.XXXX.description}"
   crs:HueAdjustmentGreen="${exif.XXXX.description}"
   crs:HueAdjustmentAqua="${exif.XXXX.description}"
   crs:HueAdjustmentBlue="${exif.XXXX.description}"
   crs:HueAdjustmentPurple="${exif.XXXX.description}"
   crs:HueAdjustmentMagenta="${exif.XXXX.description}"
   crs:SaturationAdjustmentRed="${exif.XXXX.description}"
   crs:SaturationAdjustmentOrange="${exif.XXXX.description}"
   crs:SaturationAdjustmentYellow="${exif.XXXX.description}"
   crs:SaturationAdjustmentGreen="${exif.XXXX.description}"
   crs:SaturationAdjustmentAqua="${exif.XXXX.description}"
   crs:SaturationAdjustmentBlue="${exif.XXXX.description}"
   crs:SaturationAdjustmentPurple="${exif.XXXX.description}"
   crs:SaturationAdjustmentMagenta="${exif.XXXX.description}"
   crs:LuminanceAdjustmentRed="${exif.XXXX.description}"
   crs:LuminanceAdjustmentOrange="${exif.XXXX.description}"
   crs:LuminanceAdjustmentYellow="${exif.XXXX.description}"
   crs:LuminanceAdjustmentGreen="${exif.XXXX.description}"
   crs:LuminanceAdjustmentAqua="${exif.XXXX.description}"
   crs:LuminanceAdjustmentBlue="${exif.XXXX.description}"
   crs:LuminanceAdjustmentPurple="${exif.XXXX.description}"
   crs:LuminanceAdjustmentMagenta="${exif.XXXX.description}"
   crs:SplitToningShadowHue="${exif.XXXX.description}"
   crs:SplitToningShadowSaturation="${exif.XXXX.description}"
   crs:SplitToningHighlightHue="${exif.XXXX.description}"
   crs:SplitToningHighlightSaturation="${exif.XXXX.description}"
   crs:SplitToningBalance="${exif.XXXX.description}8"
   crs:ParametricShadows="${exif.XXXX.description}"
   crs:ParametricDarks="${exif.XXXX.description}"
   crs:ParametricLights="${exif.XXXX.description}"
   crs:ParametricHighlights="${exif.XXXX.description}"
   crs:ParametricShadowSplit="${exif.XXXX.description}"
   crs:ParametricMidtoneSplit="${exif.XXXX.description}"
   crs:ParametricHighlightSplit="${exif.XXXX.description}"
   crs:SharpenRadius="${exif.XXXX.description}"
   crs:SharpenDetail="${exif.XXXX.description}"
   crs:SharpenEdgeMasking="${exif.XXXX.description}"
   crs:PostCropVignetteAmount="${exif.XXXX.description}"
   crs:PostCropVignetteMidpoint="${exif.XXXX.description}"
   crs:PostCropVignetteFeather="${exif.XXXX.description}"
   crs:PostCropVignetteRoundness="${exif.XXXX.description}"
   crs:PostCropVignetteStyle="${exif.XXXX.description}"
   crs:PostCropVignetteHighlightContrast="${exif.XXXX.description}"
   crs:GrainAmount="${exif.XXXX.description}"
   crs:GrainSize="${exif.XXXX.description}"
   crs:GrainFrequency="${exif.XXXX.description}"
   crs:LuminanceNoiseReductionDetail="${exif.XXXX.description}"
   crs:ColorNoiseReductionDetail="${exif.XXXX.description}"
   crs:LuminanceNoiseReductionContrast="${exif.XXXX.description}"
   crs:ColorNoiseReductionSmoothness="${exif.XXXX.description}"
   crs:LensProfileEnable="${exif.XXXX.description}"
   crs:LensManualDistortionAmount="${exif.XXXX.description}"
   crs:PerspectiveVertical="${exif.XXXX.description}"
   crs:PerspectiveHorizontal="${exif.XXXX.description}"
   crs:PerspectiveRotate="${exif.XXXX.description}"
   crs:PerspectiveScale="${exif.XXXX.description}"
   crs:PerspectiveAspect="${exif.XXXX.description}"
   crs:PerspectiveUpright="${exif.XXXX.description}"
   crs:PerspectiveX="${exif.XXXX.description}"
   crs:PerspectiveY="${exif.XXXX.description}"
   crs:AutoLateralCA="${exif.XXXX.description}"
   crs:Exposure2012="${exif.XXXX.description}"
   crs:Contrast2012="${exif.XXXX.description}"
   crs:Highlights2012="${exif.XXXX.description}"
   crs:Shadows2012="${exif.XXXX.description}"
   crs:Whites2012="${exif.XXXX.description}"
   crs:Blacks2012="${exif.XXXX.description}"
   crs:Clarity2012="${exif.XXXX.description}"
   crs:DefringePurpleAmount="${exif.XXXX.description}"
   crs:DefringePurpleHueLo="${exif.XXXX.description}"
   crs:DefringePurpleHueHi="${exif.XXXX.description}"
   crs:DefringeGreenAmount="${exif.XXXX.description}"
   crs:DefringeGreenHueLo="${exif.XXXX.description}"
   crs:DefringeGreenHueHi="${exif.XXXX.description}"
   crs:Dehaze="${exif.XXXX.description}"
   crs:OverrideLookVignette="${exif.XXXX.description}"
   crs:ToneCurveName2012="${exif.XXXX.description}"
   crs:LensProfileSetup="${exif.XXXX.description}"
   crs:LensProfileName="${exif.XXXX.description}"
   crs:LensProfileFilename="${exif.XXXX.description}"
   crs:LensProfileDigest="${exif.XXXX.description}"
   crs:LensProfileDistortionScale="${exif.XXXX.description}"
   crs:LensProfileChromaticAberrationScale="${exif.XXXX.description}"
   crs:LensProfileVignettingScale="${exif.XXXX.description}"
   crs:HasSettings="True">
   <crs:Name>
    <rdf:Alt>
     <rdf:li xml:lang="x-default">${this.filename}</rdf:li>
    </rdf:Alt>
   </crs:Name>
   <crs:ShortName>
    <rdf:Alt>
     <rdf:li xml:lang="x-default"/>
    </rdf:Alt>
   </crs:ShortName>
   <crs:SortName>
    <rdf:Alt>
     <rdf:li xml:lang="x-default"/>
    </rdf:Alt>
   </crs:SortName>
   <crs:Group>
    <rdf:Alt>
     <rdf:li xml:lang="x-default"/>
    </rdf:Alt>
   </crs:Group>
   <crs:Description>
    <rdf:Alt>
     <rdf:li xml:lang="x-default"/>
    </rdf:Alt>
   </crs:Description>
   <crs:ToneCurvePV2012>
    <rdf:Seq>
     <rdf:li>0, 39</rdf:li>
     <rdf:li>27, 43</rdf:li>
     <rdf:li>97, 92</rdf:li>
     <rdf:li>167, 163</rdf:li>
     <rdf:li>233, 255</rdf:li>
    </rdf:Seq>
   </crs:ToneCurvePV2012>
   <crs:ToneCurvePV2012Red>
    <rdf:Seq>
     <rdf:li>0, 13</rdf:li>
     <rdf:li>71, 72</rdf:li>
     <rdf:li>163, 165</rdf:li>
     <rdf:li>208, 209</rdf:li>
     <rdf:li>255, 238</rdf:li>
    </rdf:Seq>
   </crs:ToneCurvePV2012Red>
   <crs:ToneCurvePV2012Green>
    <rdf:Seq>
     <rdf:li>0, 12</rdf:li>
     <rdf:li>58, 61</rdf:li>
     <rdf:li>169, 177</rdf:li>
     <rdf:li>242, 255</rdf:li>
    </rdf:Seq>
   </crs:ToneCurvePV2012Green>
   <crs:ToneCurvePV2012Blue>
    <rdf:Seq>
     <rdf:li>8, 0</rdf:li>
     <rdf:li>59, 55</rdf:li>
     <rdf:li>170, 169</rdf:li>
     <rdf:li>241, 255</rdf:li>
    </rdf:Seq>
   </crs:ToneCurvePV2012Blue>
   <crs:Look>
    <rdf:Description
     crs:Name="Adobe Color"
     crs:Amount="1.000000"
     crs:UUID="B952C231111CD8E0ECCF14B86BAA7077"
     crs:SupportsAmount="false"
     crs:SupportsMonochrome="false"
     crs:SupportsOutputReferred="false"
     crs:Stubbed="true">
    <crs:Group>
     <rdf:Alt>
      <rdf:li xml:lang="x-default">Profiles</rdf:li>
     </rdf:Alt>
    </crs:Group>
    </rdf:Description>
   </crs:Look>
  </rdf:Description>
 </rdf:RDF>
</x:xmpmeta>
`
}