const categoryRoute = require('express').Router()
const { createCategory, readAllCategory, readSingleCategory, updateCategory, deleteCategory} = require('../controller/categoryCtrl')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

categoryRoute.post(`/add`, auth, adminAuth,  createCategory)
categoryRoute.get(`/all`, auth, adminAuth, readAllCategory)
categoryRoute.get(`/single/:id`, auth, adminAuth, readSingleCategory)
categoryRoute.patch(`/update/:id`, auth, adminAuth, updateCategory)
categoryRoute.delete(`/delete/:id`, auth, adminAuth, deleteCategory)

module.exports = categoryRoute