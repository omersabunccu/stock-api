const { ErrorResponse } = require("../middlewares/errorHandler")
const Product = require("../models/Product")
const Model = require("../models/Sale")

// URL  GET /api/sales/
exports.list = async(req,res)=>{

  const data = await res.getModelList(Model,{},  ['productId', 'brandId'])
  res.statu(200).json(data)
}

// URL  POST /api/sales/
exports.create = async(req,res)=>{

  // Auto add userId to req.body
  req.body.userId = req.user?._id;

  // get stock info for the product we selling 
  const currentProduct = await Product.findOne({_id: req.body.productId})

  if(currentProduct.quantity<req.body.quantity)
    throw new ErrorResponse(422, 'There is not enough stock for this sale')

  // Create the sale
  const data = await Model.create(req.body)

  // Update the product quantity 
 await Product.updateOne({_id: data.productId}, {$inc: {quanity: -data.quantity}})

    res.status(201).json({
        success: true, 
        data
    })

}

// URL  PUT /api/sales/:id
exports.update = async(req,res)=>{
  if(req.body?.quantity){
    // get current stock quantitu from the sale 
    const currentSale =await Model.findOne({_id: rea.params.id})
    // different
    const qtyDiff = req.body.quanity - currentSale.quantity;
    // set new Product quantity once the sale updated 
    const updateProduct = await Product.updateOne({_id: currentSale.productId, quantity:{$gte: qtyDiff}}, {$inc:{quantity: -qtyDiff}})
  
    if(updateProduct.modifiedCount===0){
      throw new ErrorResponse(422, 'There is not enough stock for this sale')
    }
  
  }

  // update
  const data = await Model.updateOne({_id: req.params.id}, req.body,  {new: true, runValidators: true})
  res.status(202).json({
    success: true, 
    data
})


}

// URL  GET /api/sales/:id
exports.read = async(req,res)=>{
  const data = await Model.findOne({_id: req.params.id}).populate(['productId', 'brandId'])
  res.status(200).json({
    success: true, 
    data
})
}

// URL  DELETE /api/sales/:id
exports.delete = async(req,res)=>{ 

  // Get current stock qty from the sale 
  const currentSale = await Model.findOne({_id: req.params.id})
  // Delete
  const data = await Model.deleteOne({_id: req.params.id})
  // Update the products 
  await Product.updateOne({_id: currentSale.productId}, {$inc:{quantity:+currentSale.quantity}})
  
  res.status(data.deletedCount? 204: 404).json({
    success: Boolean(data.deletedCount),
    data
})
}