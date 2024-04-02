const { StatusCodes } = require('http-status-codes')
const Product = require('../model/product')

// add product
const createProduct = async(req, res) => {
    try {

        const { title, image, desc, price, SKU, category, discount } = req.body
        //check the product exist or not
        let extPro = await Product.findOne({title})
        if(extPro){
            return res.status(StatusCodes.CONFLICT).json({status:false, msg:"Product title already exists"})
        }

        //create a product
        let newProduct = await Product.create({
            title, image, desc, price, SKU, category, discount
        })

        res.status(StatusCodes.CREATED).json({status:true, msg:"product created successfully", Product :newProduct})
        // res.json({msg: "add product"})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg:error.message})
    }
}
//read all product
const readAllproducts = async(req, res) => {
    try {
        let data = await Product.find()

        res.status(StatusCodes.OK).json({status:true, length:data.length, products: data})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg:error.message})
    }
}
//read single product
const readSingleProduct = async (req, res) => {
    try {
        let id = req.params.id 
        let data = await Product.findById(id)
        if(!data){
            res.status(StatusCodes.NOT_FOUND).json({status: false, msg: `Request product ${id} not found`})
        }
        res.status(StatusCodes.OK).json({status: true, product: data})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg:error.message})
    }
}

//update product
const updateProduct = async (req, res) => {
    try {
        const { title, image, desc, price, SKU, category, discount } = req.body

        let prodId = req.params.id

        let updPrt = await Product.findById(prodId)

        if(!updPrt){
            res.status(StatusCodes.NOT_FOUND).json({status:false, msg:"Request product id does not exist"})
        }

        await Product.findByIdAndUpdate({_id:prodId}, req.body)

        res.status(StatusCodes.ACCEPTED).json({status:true, msg:"products updated successfully"})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg:error.message})
    }
}

//delete product
const deleteProduct = async(req, res) => {
    try {
        let delPrt = req.params.id

        let del = await Product.findById(delPrt)

        if(!del){
            res.status(StatusCodes.NOT_FOUND).json({status:false, msg:"Request product id does not exist"})
        }

        await Product.findByIdAndDelete({_id: delPrt})

        res.status(StatusCodes.ACCEPTED).json({status:true, msg:`Product id ${delPrt} has deleted`})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg:error.message})
    }
}

module.exports = {createProduct, readAllproducts, readSingleProduct, updateProduct, deleteProduct }