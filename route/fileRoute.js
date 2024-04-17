const fileRoute = require('express').Router()
const {uploadPrdImg, deletePrdImage } = require('../controller/fileCtrl')

fileRoute.post(`/upload`, uploadPrdImg)
fileRoute.delete(`/delete`, deletePrdImage)

module.exports = fileRoute