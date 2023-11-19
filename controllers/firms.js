const Model = require("../models/Firm")

// URL  GET /api/firms/
exports.list = async(req,res)=>{

  const data = await res.getModelList(Model)
  res.statu(200).json(data)
}

// URL  POST /api/firms/
exports.create = async(req,res)=>{
  if(req.file) req.body.image = `/images/${req.file.originalname}`;  
  const data = await Model.create(req.body)
    res.status(201).json({
        success: true, 
        data
    })

}

// URL  PUT /api/firms/:id
exports.update = async(req,res)=>{

  if(req.file) req.body.image = `/images/${req.file.originalname}`;  
  const data = await Model.updateOne({_id: req.params.id}, req.body,  {new: true, runValidators: true})
  res.status(202).json({
    success: true, 
    data
})


}

// URL  GET /api/firms/:id
exports.read = async(req,res)=>{
  const data = await Model.findOne({_id: req.params.id})
  res.status(200).json({
    success: true, 
    data
})
}

// URL  DELETE /api/firms/:id
exports.delete = async(req,res)=>{ 
  const data = await Model.deleteOne({_id: req.params.id})
  res.status(data.deletedCount? 204: 404).json({
    success: Boolean(data.deletedCount),
    data
})
}