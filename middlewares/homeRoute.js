module.exports = (req, res)=>{
    res.status(200).json({
        success: true, 
        message: 'Welcome to Stock Managament API',
        documents:{
            swagger: '/api/documents/swagger',
            redoc: '/api/documents/redoc',
            json:'/api/documents/json'
        }, 
        user: req.user
    })
}