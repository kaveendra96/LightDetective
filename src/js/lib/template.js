import properties from './properties'
import parameters from './parameters'

export default (exif, filename) => {
	return `<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.6-c140 79.160451, 2017/05/06-01:08:21        ">
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
<rdf:Description rdf:about=""
xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/"
crs:PresetType="Normal"
crs:Cluster=""
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
crs:Version="${exif.Version.description}"
crs:ProcessVersion="${exif.ProcessVersion.description}"
${properties(exif)}
>
<crs:Name>
<rdf:Alt>
<rdf:li xml:lang="x-default">${filename}</rdf:li>
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
<rdf:li xml:lang="x-default">Light Detective Imports</rdf:li>
</rdf:Alt>
</crs:Group>
<crs:Description>
<rdf:Alt>
<rdf:li xml:lang="x-default"/>
</rdf:Alt>
</crs:Description>
${parameters(exif)}
</rdf:Description>
</rdf:RDF>
</x:xmpmeta>
`
}