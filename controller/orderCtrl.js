const { StatusCodes } = require('http-status-codes')
const Order = require('../model/order')

// create
const createOrder = async(req, res) => {
    try {
        res.json({msg : "create order"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error.message})
    }
}

//read
const readAllOrders = async (req, res) => {
    try {
        res.json({msg: "read all orders"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error.message})
    }
}

//read single
const readSingleOrder = async (req, res) => {
    try {
        res.json({msg: "read Single order"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error.message})
    }
}

const updateOrder = async (req, res) => {
    try {
        res.json({msg: "update the order"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error.message})
    }
}

const deleteOrder = async (req, res) => {
    try {
        res.json({msg: "delete the order"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error.message})
    }
}

module.exports = { createOrder, readAllOrders, readSingleOrder, updateOrder, deleteOrder }