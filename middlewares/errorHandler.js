class ErrorResponse extends Error{
    constructor(errorCode, message){
        super(message)
        this.errorCode = errorCode
    }
}


const errorHandler = (err, req, res, next)=>{
    return res.status(err.errorCode|| 500).json({
        success: false, 
        message: err.message,
        stack: err.stack
    })
}

module.exports = {ErrorResponse, errorHandler}