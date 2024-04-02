const productRoute = require('express').Router()
const { createProduct, readAllproducts, readSingleProduct, updateProduct, deleteProduct} = require('../controller/productCtrl')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

//without auth
productRoute.get(`/all`, readAllproducts)
productRoute.get(`/single/:id`, readSingleProduct)

//with auth and admin
productRoute.post(`/add`, auth, adminAuth, createProduct)
productRoute.patch(`/update/:id`, auth, adminAuth, updateProduct)
productRoute.delete(`/delete/:id`, auth, adminAuth, deleteProduct)

module.exports = productRoute
