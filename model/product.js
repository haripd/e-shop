const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    title :{
        type: String,
        required: true,
        trim:true
    },
    image: {
        type: String,
        required: true,
        trim:true
    },
    desc: {
        type:String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    SKU: {
        // stock keeping unit
        type: Array,
        default: []
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