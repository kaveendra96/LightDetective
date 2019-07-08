import ExifReader from "exifreader"
import template, { meta } from "./template"

const dropArea = document.querySelector("#drop")
const uploadForm = document.querySelector("#image-upload")
const resultContainer = document.querySelector(".result-container")
const preview = document.querySelector("#preview")
const result = document.querySelector("#result")
const retry = document.querySelector(".retry")
const download = document.querySelector(".download")
let link = document.querySelector(".download-link")
let headerImage = document.querySelector("#header-image")
let metaDataContainer = document.querySelector(".meta")

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

dropArea.addEventListener("drop", processFile, false)

retry.addEventListener("click", () => {location.reload()}, false)

download.addEventListener("click", downloadPreset, false)

function addHighlight(e) {
  dropArea.classList.add("highlight")
}

function removeHighlight(e) {
  dropArea.classList.remove("highlight")
}

function processFile(e) {
	const dt = e.dataTransfer
	// TODO: add loading indicator
	filename = dt.files[0].name
	imageReader.readAsDataURL(dt.files[0])
  exifDataReader.readAsArrayBuffer(dt.files[0])
}

imageReader.onload = () => {
	dropArea.classList.add("hidden")
	retry.classList.remove("hidden")
	resultContainer.classList.remove("hidden")
	headerImage.style.background=`linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,1)) top center, url(${imageReader.result}) center`
	headerImage.style.backgroundSize = "cover, cover"
}

exifDataReader.onload = () => {
	const exifData = ExifReader.load(exifDataReader.result)
	console.log(exifData)
	let metaData = meta(exifData)
	metaDataContainer.innerHTML = metaData
	filledTemplate = template(exifData)
	console.log(filledTemplate, metaData)
}

function downloadPreset () {
	let fileURL = null
	link.href=null
	let data = new Blob([filledTemplate], {type: 'text/plain'})
	if (fileURL !== null) {
		window.URL.revokeObjectURL(fileURL)
	}
	fileURL = window.URL.createObjectURL(data)
	link.href = fileURL
	link.click()
}