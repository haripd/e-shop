const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    title :{
        type: String,
        required: true,
        trim:true
    },
    image: {
        type: Object,
        default : {
            path:"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
        }
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
        type: String,
        required: true
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