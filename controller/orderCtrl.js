const { StatusCodes } = require('http-status-codes')
const Order = require('../model/order')

// create
const createOrder = async(req, res) => {
    try {
        let {cartId, userId, paymentId, paymentMode, paymentStatus, orderStatus, deliveryStatus} = req.body

        let extOrder = await Order.findOne({ cartId })
        if(extOrder){
            return res.status(StatusCodes.CONFLICT).json({status: false, msg: "Order is already confirmed for cart items"})
        }

        let newOrder = await Order.create({
            cartId,
            userId,
            paymentId,
            paymentMode,
            paymentStatus,
            orderStatus,
            deliveryStatus
        })

        res.status(StatusCodes.CREATED).json({status:true, msg: "Order placed successfully", order: newOrder})

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error.message})
    }
}

//read
const readAllOrders = async (req, res) => {
    try {
        //read all orders
        let orderData = await Order.find()

        //reading current userId
        let id = req.userId

        //filtering order w.r.to current user id
        let data = orderData.filter(item => item.userId == id)

        return res.status(StatusCodes.OK).json({status:true, length: data.length, Order: data})

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error.message})
    }
}

//read single
const readSingleOrder = async (req, res) => {
    try {

        let id = req.params.id

        let extOrder = await Order.findById(id)
        if(!extOrder){
            return res.status(StatusCodes.NOT_FOUND).json({status: false, msg: "Requested order is not found"})
        }
        //other than current user cant authorized access order details
        console.log("extOrder.userId :",extOrder.userId, "Req.userId :", req.userId)

        if(extOrder.userId != req.userId){
            return res.status(StatusCodes.UNAUTHORIZED).json({status:false, msg:"Unauthorized to see order details"})
        }
        // if(extOrder.userId !== req.userId){
        //     return res.status(StatusCodes.UNAUTHORIZED).json({status:false, msg:"Unauthorized to see order details"})
        // }

        res.status(StatusCodes.OK).json({status:true, Order: extOrder})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error.message})
    }
}

const updateOrder = async (req, res) => {
    try {

        let id = req.params.id
        let extOrder = await Order.findById(id)
        if(!extOrder){
            return res.status(StatusCodes.NOT_FOUND).json({status:false, msg: "Requested order is not found"})
        }
        await Order.findByIdAndUpdate({_id: id}, req.body)

        return res.status(StatusCodes.ACCEPTED).json({status:true, msg:"order updated successfully"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error.message})
    }
}

const deleteOrder = async (req, res) => {
    try {
        let id = req.params.id
        let extOrder = await Order.findById(id)
        if(!extOrder){
            return res.status(StatusCodes.NOT_FOUND).json({status:false, msg: "Requested order is not found"})
        }
        await Order.findByIdAndDelete({_id:id})

        return res.status(StatusCodes.ACCEPTED).json({status: true, msg: "Order is deleted successfully"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error.message})
    }
}

module.exports = { createOrder, readAllOrders, readSingleOrder, updateOrder, deleteOrder }