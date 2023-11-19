const Brand = require("../models/Brand")

// URL  GET /api/brands/
exports.list = async(req,res)=>{

  const data = await res.getModelList(Brand)
  res.status(200).json(data)
}

// URL  POST /api/brands/
exports.create = async(req,res)=>{
  if(req.file) req.body.image = `/images/${req.file.originalname}`;  
  const data = await Brand.create(req.body)
    res.status(201).json({
        success: true, 
        data
    })

}

// URL  PUT /api/brands/:id
exports.update = async(req,res)=>{

  if(req.file) req.body.image = `/images/${req.file.originalname}`;  
  const data = await Brand.updateOne({_id: req.params.id}, req.body,  {new: true, runValidators: true})
  res.status(202).json({
    success: true, 
    data
})


}

// URL  GET /api/brands/:id
exports.read = async(req,res)=>{
  const data = await Brand.findOne({_id: req.params.id})
  res.status(200).json({
    success: true, 
    data
})
}

// URL  DELETE /api/brands/:id
exports.delete = async(req,res)=>{ 
  const data = await Brand.deleteOne({_id: req.params.id})
  res.status(data.deletedCount? 204: 404).json({
    success: Boolean(data.deletedCount),
    data
})
}