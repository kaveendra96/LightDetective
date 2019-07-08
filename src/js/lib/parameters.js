export default exif => {
	let params = ''
	const parameterkeys = Object.keys(parameters)
	Object.keys(exif).forEach(key => {
		if (parameterkeys.includes(key)) {
			params += parameters[key](exif) + '\n'
		}
	})
	params = params.replace(/\n$/, '')
	return params
}

const parameters = {
// 	Look(exif) {
// 		return `<crs:Look>
// <rdf:Description
// crs:Name="${exif.Look.value.Name.description}"
// crs:Amount="${exif.Look.value.Amount.description}"
// crs:UUID="${exif.Look.value.UUID.description}"
// crs:SupportsAmount="${exif.Look.value.SupportsAmount.description}"
// crs:SupportsMonochrome="${exif.Look.value.SupportsMonochrome.description}"
// crs:SupportsOutputReferred="${
// 			exif.Look.value.SupportsOutputReferred.description
// 		}"crs:Stubbed="true">
// <crs:Group>
// <rdf:Alt>
// <rdf:li xml:lang="x-default">${exif.Look.value.Group.value.description}</rdf:li>
// </rdf:Alt>
// </crs:Group>
// </rdf:Description>
// </crs:Look>`
// 	},
	ToneCurvePV2012(exif) {
		return `<crs:ToneCurvePV2012>
<rdf:Seq>
${exif.ToneCurvePV2012.value.map(point => {
	return '<rdf:li>' + point.description + '</rdf:li>'
})}
</rdf:Seq>
</crs:ToneCurvePV2012>`
	},
	ToneCurvePV2012Red(exif) {
		return `<crs:ToneCurvePV2012Red>
<rdf:Seq>
${exif.ToneCurvePV2012Red.value.map(point => {
	return '<rdf:li>' + point.description + '</rdf:li>'
})}
</rdf:Seq>
</crs:ToneCurvePV2012Red>`
	},
	ToneCurvePV2012Green(exif) {
		return `<crs:ToneCurvePV2012Green>
<rdf:Seq>
${exif.ToneCurvePV2012Green.value.map(point => {
	return '<rdf:li>' + point.description + '</rdf:li>'
})}
</rdf:Seq>
</crs:ToneCurvePV2012Green>`
	},
	ToneCurvePV2012Blue(exif) {
		return `<crs:ToneCurvePV2012Blue>
<rdf:Seq>
${exif.ToneCurvePV2012Blue.value.map(point => {
	return '<rdf:li>' + point.description + '</rdf:li>'
})}
</rdf:Seq>
</crs:ToneCurvePV2012Blue>`
	}
}
