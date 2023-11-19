const Token = require("../models/Token");


// URL  GET /api/tokens/
exports.list = async(req,res)=>{


  const data = await res.getModelList(Token)
  res.statu(200).json(data)
}

// URL  POST /api/tokens/
exports.create = async(req,res)=>{
    const data = await Token.create(req.body)

    res.status(201).json({
        success: true, 
        data
    })

}

// URL  PUT /api/tokens/:id
exports.update = async(req,res)=>{
  const data = await Token.updateOne({_id: req.params.id}, req.body,  {new: true, runValidators: true})
  res.status(202).json({
    success: true, 
    data
})


}

// URL  GET /api/tokens/:id
exports.read = async(req,res)=>{
  const data = await Token.findOne({_id: req.params.id})
  
  res.status(200).json({
    success: true, 
    data
})
}

// URL  DELETE /api/tokens/:id
exports.delete = async(req,res)=>{ 
  const data = await Token.deleteOne({_id: req.params.id})
  res.status(data.deletedCount? 204: 404).json({
    success: Boolean(data.deletedCount),
    data
})
}