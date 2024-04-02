const orderRoute = require('express').Router()
const { createOrder, readAllOrders, readSingleOrder, updateOrder, deleteOrder } = require('../controller/orderCtrl')
const auth = require('../middleware/auth')

orderRoute.get(`/all`, readAllOrders)
orderRoute.get(`/single/:id`, readSingleOrder)

orderRoute.post(`/add`, auth, createOrder)
orderRoute.patch(`/update/:id`, auth, updateOrder)
orderRoute.delete(`/delete/:id`, auth, deleteOrder)

module.exports = orderRoute