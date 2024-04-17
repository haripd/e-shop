const {
    StatusCodes
} = require('http-status-codes');
const UserModel = require('../model/user');

const readAllUsers = async (req, res, next) => {
    try {
        let data = await UserModel.find({})
        res.status(StatusCodes.OK).json({status:true, length:data.length, users:data})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            msg: error.message
        });
    }
}
module.exports = { readAllUsers }