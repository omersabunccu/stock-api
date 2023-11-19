const Model = require("../models/Product")

// URL  GET /api/products/
exports.list = async(req,res)=>{

  const data = await res.getModelList(Model, {}, ['categoryId', 'brandId'])
  res.statu(200).json(data)
}

// URL  POST /api/products/
exports.create = async(req,res)=>{

  const data = await Model.create(req.body)
    res.status(201).json({
        success: true, 
        data
    })

}

// URL  PUT /api/products/:id
exports.update = async(req,res)=>{

  const data = await Model.updateOne({_id: req.params.id}, req.body,  {new: true, runValidators: true})
  res.status(202).json({
    success: true, 
    data
})


}

// URL  GET /api/products/:id
exports.read = async(req,res)=>{
  const data = await Model.findOne({_id: req.params.id}).populate(['categoryId', 'brandId'])
  res.status(200).json({
    success: true, 
    data
})
}

// URL  DELETE /api/products/:id
exports.delete = async(req,res)=>{ 
  const data = await Model.deleteOne({_id: req.params.id})
  res.status(data.deletedCount? 204: 404).json({
    success: Boolean(data.deletedCount),
    data
})
}