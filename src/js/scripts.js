import ExifReader from "exifreader"
import { saveAs } from "file-saver"
import template from "./lib/template"
import meta, {settings} from "./lib/meta"

const dropArea = document.querySelector("#drop")
const resultContainer = document.querySelector(".result-container")
const retry = document.querySelector(".retry")
const download = document.querySelector(".download")
let link = document.querySelector(".download-link")
let headerImage = document.querySelector("#header-image")
let metaDataContainer = document.querySelector(".meta")
let settingsDataContainer = document.querySelector('.settings')

const exifDataReader = new FileReader()
const imageReader = new FileReader()

let filledTemplate
let filename

;["dragenter", "dragover"].forEach(eventName => {
  dropArea.addEventListener(eventName, addHighlight, false)
})

;["dragleave", "drop"].forEach(eventName => {
  dropArea.addEventListener(eventName, removeHighlight, false)
})

;["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

dropArea.addEventListener("drop", getFile, false)

retry.addEventListener("click", () => {location.reload()}, false)

download.addEventListener("click", downloadPreset, false)

function addHighlight(e) {
  dropArea.classList.add("highlight")
}

function removeHighlight(e) {
  dropArea.classList.remove("highlight")
}

function getFile(e){
	const dt = e.dataTransfer
	processFile(dt.files[0])
}

export function processFile(file) {
	dropArea.classList.add("loading")
	filename = file.name
	imageReader.readAsDataURL(file)
  exifDataReader.readAsArrayBuffer(file)
}

imageReader.onload = () => {
	dropArea.classList.add("hidden")
	resultContainer.classList.remove("hidden")
	headerImage.style.background=`linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,1)) top center, url(${imageReader.result}) center`
	headerImage.style.backgroundSize = "cover, cover"
}

exifDataReader.onload = () => {
	try{
		let exifData = ExifReader.load(exifDataReader.result)
		exifData.UUID = {
			description: createUUID()
		}
		if (!exifData.ProcessVersion) throw new Error()
		console.log(exifData)
		let metaData = meta(exifData, filename)
		metaDataContainer.innerHTML = metaData
		let settingsData = settings(exifData)
		settingsDataContainer.innerHTML = settingsData
		filledTemplate = template(exifData, filename)
	} catch(err) {
		console.error(err)
		resultContainer.innerHTML = `<h3>Ouch, either no EXIF data to be found here or an issue.</h3>
		<br/>
		<a href="." class="retry">Try another file ↻</a>`
	}
}

function downloadPreset () {
	let fileURL = null
	link.href=null
	let data = new Blob([filledTemplate], {type: 'application/rdf+xml'})
	// if (fileURL !== null) {
	// 	window.URL.revokeObjectURL(fileURL)
	// }
	// fileURL = window.URL.createObjectURL(data)
	saveAs(data, `${filename.replace(/\.\w*$/, "")}.xmp`)
	// link.href = fileURL
	// link.click()
}

function createUUID(){
	var dt = new Date().getTime();
	var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (dt + Math.random()*16)%16 | 0;
			dt = Math.floor(dt/16);
			return (c=='x' ? r :(r&0x3|0x8)).toString(16);
	});
	return uuid.toUpperCase();
}