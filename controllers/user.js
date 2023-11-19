const User = require('../models/User')
const Token = require("../models/Token");
const { pbkdf2Sync } = require("crypto");

// URL  GET /api/users/
exports.list = async(req,res)=>{

  const filters = (req.user?.isAdmin) ?{} :{_id:req.user._id} 
    const data = await res.getModelList(User, filters)
    res.status(200).json(data);
}

// URL  POST /api/users/
exports.create = async(req,res)=>{


  // Disallow setting admin/staff
    // req.body.isStaff = false;
    // req.body.isAdmin = false;
    const data = await User.create(req.body)
    // Create token for auto-login
    const tokenData = await Token.create({
        userId: data._id,
        token: pbkdf2Sync(
          data._id + Date.now(),
          process.env.SECRET_KEY,
          1000,
          32,
          "sha512",
        ).toString("hex")
    })

    res.status(201).json({
        success: true, 
        token: tokenData.token,
        ...data._doc
    })

}

// URL  PUT /api/users/:id
exports.update = async(req,res)=>{

  const filters = (req.user?.isAdmin) ? {_id:req.params.id}:{ _id: req.user._id}
  req.body.isAdmin = (req.user.isAdmin)? req.body.isAdmin:  false
  const data = await User.updateOne(filters, req.body,  {new: true, runValidators: true})
  res.status(202).json({
    success: true, 
    data
})


}

// URL  GET /api/users/:id
exports.read = async(req,res)=>{
  const filters = (req.user?.isAdmin) ? {_id:req.params.id}:{ _id: req.user._id}
  const data = await User.findOne(filters)
  
  res.status(200).json({
    success: true, 
    data
})
}

// URL  DELETE /api/users/:id
exports.delete = async(req,res)=>{
  const filters = (req.user?.isAdmin) ? {_id:req.params.id}:{ _id: req.user._id}
 
  const data = await User.deleteOne(filters)
  res.status(data.deletedCount? 204: 404).json({
    success: Boolean(data.deletedCount),
    data
})
}