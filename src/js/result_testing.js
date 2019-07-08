import template from './lib/template'
import meta, { settings } from './lib/meta'
import exifData from './stub.json'

const resultContainer = document.querySelector('.result-container')
let metaDataContainer = document.querySelector('.meta')
let settingsDataContainer = document.querySelector('.settings')

const filename = 'TestingThisSite.jpg'

let filledTemplate

let metaData = meta(exifData, filename)
metaDataContainer.innerHTML = metaData
let settingsData = settings(exifData)
settingsDataContainer.innerHTML = settingsData
filledTemplate = template(exifData, filename)
