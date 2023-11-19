const { ErrorResponse } = require("../middlewares/errorHandler")
const Product = require("../models/Product")
const Model = require("../models/Purchase")

// URL  GET /api/purchases/
exports.list = async(req,res)=>{

  const data = await res.getModelList(Model, {}, ['productId', 'brandId', 'firmId'])
  res.statu(200).json(data)
}

// URL  POST /api/purchases/
exports.create = async(req,res)=>{

  // Auto add userId to req.body
  req.body.userId = req.user?._id;

  // Process the purchase
  const data = await Model.create(req.body)

  // Update the product quantity 
  await Product.updateOne({_id: data.productId}, {$inc: {quanity: +data.quantity}})

    res.status(201).json({
        success: true, 
        data
    })

}

// URL  PUT /api/purchases/:id
exports.update = async(req,res)=>{
  if(req.body?.quantity){
    // get current stock quantitu from the purchase
    const currentPurchase =await Model.findOne({_id: rea.params.id})
    // different
    const qtyDiff = req.body.quanity - currentSale.quantity;
    // set new Product quantity once the purchase process. 
    await Product.updateOne({_id: currentSale.productId}, {$inc:{quantity: +qtyDiff}})
  }

  // update
  const data = await Model.updateOne({_id: req.params.id}, req.body,  {new: true, runValidators: true})
  res.status(202).json({
    success: true, 
    data
})


}

// URL  GET /api/purchases/:id
exports.read = async(req,res)=>{
  const data = await Model.findOne({_id: req.params.id}).populate(['productId', 'brandId', 'firmId'])
  res.status(200).json({
    success: true, 
    data
})
}

// URL  DELETE /api/sales/:id
exports.delete = async(req,res)=>{ 

  // Get current stock qty from the purchase
  const currentSale = await Model.findOne({_id: req.params.id})
  // Delete
  const data = await Model.deleteOne({_id: req.params.id})
  // Update the products 
  await Product.updateOne({_id: currentSale.productId}, {$inc:{quantity:-currentSale.quantity}})
  
  res.status(data.deletedCount? 204: 404).json({
    success: Boolean(data.deletedCount),
    data 
})
}