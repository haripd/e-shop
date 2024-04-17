const mongoose = require('mongoose')
const cart = require('./cart')
const user = require('./user')

const OrderSchema = new mongoose.Schema({
    cartId : {
        type : mongoose.Schema.ObjectId,
        ref : cart
    },
    userId : {
        type: mongoose.Schema.ObjectId,
        ref : user
    },
    paymentId: {
        type: String,
        trim: true
    },
    paymentMode : {
        type: String,
        trim: true,
        enum : ["cod", "upi", "online", "wallets", "card"],
        default : "cod"
    },
    paymentStatus: {
        type: String,
        trim:true,
        enum : ["pending", "success", "failed"],
        default : "pending"
    },
    orderStatus: {
        type: String,
        trim: true,
        enum : ["pending", "confirmed", "cancelled"],
        default : "pending"
    },
    deliveryStatus : {
        type : String,
        trim : true,
        enum : ["pending","processing", "delivered", "returned"],
        default: "pending"
    }
},{
    collection: "order",
    timestamps: true
})

module.exports = mongoose.model("Order", OrderSchema)