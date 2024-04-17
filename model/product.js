const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    title :{
        type: String,
        required: true,
        trim:true
    },
    image: {
        type: String,
        // default : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
        default: ""
        
    },
    desc: {
        type:String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        default: 0
    },
    SKU: {
        // stock keeping unit
        type: String,
        default: ""
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    discount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default : true
    }
},{
    collection:"products",
    timestamps: true
})
module.exports = mongoose.model("ProductModel", ProductSchema)