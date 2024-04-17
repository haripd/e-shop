const { StatusCodes } = require('http-status-codes')
const Product = require('../model/product')
const fs = require('fs')
const path = require('path')

//remove temp files
const removeTemp = (filePath) => {
    fs.unlinkSync(filePath)
}

//upload the product image
const uploadPrdImg = async(req, res) => {
    try {
        // let files = req.files
        let { thumbnail } = req.files
        let { product } = req.query //product id

        let extPro = await Product.findById({_id: product})
        if(!extPro){
            res.status(StatusCodes.NOT_FOUND).json({status: false, msg: `requested product not exists`})
        }

        //check whether upload folder exists or not
        let outpath = path.join(__dirname, "../client/public/uploads")
        if(!fs.existsSync(outpath)){
            //if folder is not present create a new folder
            fs.mkdirSync(outpath, {recursive : true})
        }
        //rename the file
        // let newFile = thumbnail.name
        let ext = path.extname(thumbnail.name)
        let newFile = `${extPro.title}${ext}` //productitlte.jpg

        //file already exists in the location or not
        let filePath = path.join(__dirname, "../client/public/uploads", `${newFile}`)

        if(fs.existsSync(filePath)){
            removeTemp(thumbnail.tempFilePath)
            return res.status(StatusCodes.CONFLICT).json({status: false, msg: `File already exists`})
        }

        //validate file image uplad the file
        if(thumbnail.mimetype === "image/png" || 
           thumbnail.mimetype === "image/jpeg" || 
           thumbnail.mimetype === "image/jpg" || 
           thumbnail.mimetype === "image/webp" ){

            await thumbnail.mv(filePath,  async(err) => {
                if(err){
                    removeTemp(thumbnail.tempFilePath)
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg:err})
                }
               
                if(req.query.product){
                     //update the product collection
                    await Product.findByIdAndUpdate({ _id: product}, {image: newFile})
                }

                res.status(StatusCodes.CREATED).json({status: true, msg: "File upload successfully", file: thumbnail})
            })
        } else {
            return res.status(StatusCodes.CONFLICT).json({status:false, msg: `File type is not matched.. allows only .png, .image, .webp`})
        }
        // res.json({files})

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg:error.message})
    }
}

//delete the product image
const deletePrdImage = async(req, res) => {
    try {
        let { product } = req.query;
        
        let extPro = await Product.findById({_id: product})
        if(!extPro){
            res.status(StatusCodes.NOT_FOUND).json({status: false, msg: `requsted product doesnt exists`})
        }

        //file already exists in the location or not
        let filePath = path.join(__dirname, "../client/public/uploads", `${extPro.image}`)
        if(!fs.existsSync(filePath)){
            return res.status(StatusCodes.NOT_FOUND).json({status: false, msg: `File not found.`})
        }

        await fs.unlink(filePath, async(err) => {
            if(err){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg:err})
            }
            
            //update the product collection
            await Product.findByIdAndUpdate({ _id: product}, { image :  ""
            })

            res.status(StatusCodes.ACCEPTED).json({status: true, msg: `File deleted successfully`})
        })

        // res.json({msg: "deleted"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false, msg: error.message})
    }
}

module.exports = { uploadPrdImg, deletePrdImage }