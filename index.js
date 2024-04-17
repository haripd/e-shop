const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const morgan = require('morgan')
// const cookieparser = require('cookie-parser')
const {
    StatusCodes
} = require('http-status-codes')
const cookieParser = require('cookie-parser')
const dbConnect = require('./db/connect')
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT

const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cors())
app.use(cookieParser(process.env.ACCESS_SECRET))
app.use(morgan())
app.use(fileUpload({
    useTempFiles : true,
    limits : {
        fileSize: 5 * 1024 * 1024// image file size upto 5Mb
    }
}))

app.get(`/`, async (req, res) => {
    return res.status(StatusCodes.ACCEPTED).json({
        status: true,
        msg: "Welcome to project-api"
    })
})

app.use(`/api/auth`, require('./route/authRoute'))
app.use(`/api/category`, require('./route/categoryRoute'))
app.use(`/api/product`, require('./route/productRoute'))
app.use(`/api/cart`, require('./route/cartRoute'))
app.use(`/api/order`, require('./route/orderRoute'))
app.use(`/api/file`, require('./route/fileRoute'))
app.use(`/api/user`, require('./route/userRoute'))


//default route
app.all(`/*`, async (req, res) => {
    return res.status(StatusCodes.NOT_FOUND).json({
        status: false,
        msg: "Requested path not found"
    })
})

app.listen(PORT, () => {
    dbConnect()
    console.log(`server is started at http://localhost:${PORT}`)
})