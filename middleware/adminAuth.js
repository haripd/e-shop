const { StatusCodes } = require("http-status-codes")
const User = require('../model/user')
// this middleware  checks the user role and it should must be "superadmin"
const adminAuth = async(req, res, next) => {
    try {
        // read id from previous middleware (auth)
        let id = req.userId

        //get the user data from id
        let extUser = await User.findById(id)
        if(!extUser){
            return res.status(StatusCodes.NOT_FOUND).json({status: false, msg: 'Requested path doesnt exist'})
        }

        console.log("admin role :", extUser.role)
        if(extUser.role !== "superadmin"){
            return res.status(StatusCodes.UNAUTHORIZED).json({status: false, msg: "Authorized. Access denied for non-admin users"} )
        }
        
        // res.json({ admin: "admin auth middleware"})
        next()
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg:error.message})
    }
}
module.exports = adminAuth