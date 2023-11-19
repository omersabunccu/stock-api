const Category = require("../models/Category")

// URL  GET /api/categories/
exports.list = async(req,res)=>{

  const data = await res.getModelList(Category)
  res.statu(200).json(data)
}

// URL  POST /api/categories/
exports.create = async(req,res)=>{
    const data = await Category.create(req.body)

    res.status(201).json({
        success: true, 
        data
    })

}

// URL  PUT /api/categories/:id
exports.update = async(req,res)=>{
  const data = await Category.updateOne({_id: req.params.id}, req.body,  {new: true, runValidators: true})
  res.status(202).json({
    success: true, 
    data
})


}

// URL  GET /api/categories/:id
exports.read = async(req,res)=>{
  const data = await Category.findOne({_id: req.params.id})
  
  res.status(200).json({
    success: true, 
    data
})
}

// URL  DELETE /api/categories/:id
exports.delete = async(req,res)=>{ 
  const data = await Category.deleteOne({_id: req.params.id})
  res.status(data.deletedCount? 204: 404).json({
    success: Boolean(data.deletedCount),
    data
})
}