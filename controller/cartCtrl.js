const { StatusCodes } = require('http-status-codes')

const Cart = require('../model/cart')
const cart = require('../model/cart')

//create
const createCart = async (req, res) => {
    try {

        let { products } = req.body

        let user = req.userId 

        //create cart
        let data = await Cart.create({
            user,
            products
        })

        res.status(StatusCodes.CREATED).json({status:true, length: data.length, msg:"cart is created", cart: data})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error.message})
    }
}

//read all
const allCart = async (req, res) => {
    try {
        let data = await cart.find({})

        return res.status(StatusCodes.OK).json({length: data.length, cart: data})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error.message})
    }
}

//read Single
const readSingleCart = async(req, res) => {
    try {
        let id = req.params.id 
        let extCard = await cart.findById(id)
        if(!extCard){
            return res.status(StatusCodes.NOT_FOUND).json({status: false, msg: "Requested card id not found"})
        }
        // return res.json({msg: "read all cart details"})
        return res.status(StatusCodes.OK).json({status: true, cart: extCard})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error.message})
    }
}



//update
const updateCart = async (req, res) => {
    try {
        let id = req.params.id 
        let extCard = await cart.findById(id)
        if(!extCard){
            return res.status(StatusCodes.NOT_FOUND).json({status: false, msg: "Requested card id not found"})
        }
        await cart.findByIdAndUpdate({_id:id}, req.body)
        return res.status(StatusCodes.ACCEPTED).json({status: true, msg: "Cart updated successfully"})
    // return res.json({msg: "Update the cart"})        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error.message})
    }
}

//delete
const deleteCart = async( req, res) => {
    try {
        let id = req.params.id 
        let extCard = await cart.findById(id)
        if(!extCard){
            return res.status(StatusCodes.NOT_FOUND).json({status: false, msg: "Requested card id not found"})
        }

        await cart.findByIdAndDelete({_id:id})

        return res.status(StatusCodes.ACCEPTED).json({status: true, msg: "Cart deleted successfully"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error.message})
    }
}

module.exports = { createCart, allCart, readSingleCart, updateCart, deleteCart }