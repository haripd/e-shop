const mongoose = require('mongoose')
const User = require('../model/user')
const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref : User
    },
    
    products: {
        type: Array,
        default : []
    }

},{
    collection: "cart",
    timestamps: true
})
module.exports = mongoose.model("CartModel", CartSchema)