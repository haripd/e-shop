const { StatusCodes } = require('http-status-codes')
const CartModel = require('../model/category')

//create
const createCategory = async(req, res)=>{
    try {
        // const { name, desc } = req.body
        // let extCat = await CartModel.findOne(name)
        // if(!extCat){
        //     // return res.status(StatusCodes.)
        // }
        res.json({ msg: "Create the category"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error.message})
    }
}

//read all
const readAllCategory = async (req, res) => {
    try {
        res.json({msg: "read all category"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg:error.message})
    }
}

//read single
const readSingleCategory = async(req, res) => {
    try {
        res.json({msg: "read single category"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg:error.message})
    }
}

//update
const updateCategory = async(req, res) => {
    try {
        res.json({msg: "Update the category"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg:error.message})
    }
}

//delete
const deleteCategory = async(req, res) => {
    try {
        res.json({msg: "delete the category"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg:error.message})
    }
}

module.exports = { createCategory, readAllCategory, readSingleCategory, updateCategory, deleteCategory}