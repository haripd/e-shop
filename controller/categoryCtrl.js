const { StatusCodes } = require('http-status-codes')
const CartModel = require('../model/category')
const { default: mongoose } = require('mongoose')
const category = require('../model/category')

//create
const createCategory = async(req, res)=>{
    try {
        const { name, desc } = req.body

        //check if name already exists or not
        let extCat = await CartModel.findOne({name})
        if(extCat){
            return res.status(StatusCodes.CONFLICT).json({status : false, msg: `This category ${name} exist`})
        }
        
        //create a new category
        let newCat = await category.create({
            name, desc
        })

        res.status(StatusCodes.CREATED).json({status:true, msg:"New category created", category: newCat })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg: error.message})
    }
}

//read all
const readAllCategory = async (req, res) => {
    try {
        const data = await category.find()

        res.status(StatusCodes.OK).json({status: true, length: data.length, categories: data})

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg:error.message})
    }
}

//read single
const readSingleCategory = async(req, res) => {
    try {
        let id = req.params.id

        let data = await category.findById(id)

        if(!data){
            return res.status(StatusCodes.NOT_FOUND).json({status:false, msg:"Requested category id not found"})
        }
        res.status(StatusCodes.OK).json({status:true, category:data})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg:error.message})
    }
}

//update
const updateCategory = async(req, res) => {
    try {
        //read params and data.
        let id = req.params.id
        let { name, desc } = req.body

        let data = await category.findById(id)
        if(!data){
            return res.status(StatusCodes.NOT_FOUND).json({status: false, msg: "Request data doesn exist"})
        }

        await category.findByIdAndUpdate({_id: id}, {name, desc})
        res.status(StatusCodes.ACCEPTED).json({status: true, msg:"Category updated successfully"})

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg:error.message})
    }
}

//delete
const deleteCategory = async(req, res) => {
    try {
        let id = req.params.id
        let data = await category.findById(id)
        if(!data){
            return res.status(StatusCodes.NOT_FOUND).json({status: false, msg: "Request data doesn exist"})
        }
        await category.findByIdAndDelete(id)

        res.status(StatusCodes.ACCEPTED).json({status: true, msg: `Category id ${id} deleted successfully`})

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg:error.message})
    }
}

module.exports = { createCategory, readAllCategory, readSingleCategory, updateCategory, deleteCategory}