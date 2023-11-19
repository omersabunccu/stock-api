const {ErrorResponse} = require('../middlewares/errorHandler')

exports.isLogin = (req, res, next)=>{

    if(req.user&&req.user.isActive) next()
    else   throw new ErrorResponse(403, 'No permission: You must Login')
}
exports.isAdmin = (req, res, next)=>{

    if(req.user && req.user.isActive && req.user.isAdmin) next();
    else  throw new ErrorResponse(403, 'No permission: You must Login as Admin')
}
exports.isStaff = (req, res, next)=>{
    if(req.user&&req.user.isActive &&(req.user.isAdmin || req.user.isStaff)) next()
      else   throw new ErrorResponse(403, 'No permission: Only For Staff')
}