const {Schema, model} = require('mongoose')

const prodSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref:'Category',
        required: true, 
    },
    brandId:{
        type: Schema.Types.ObjectId,
        ref:'Brand',
        required: true, 
    },
    name:{
        type:String, 
        trim: true, 
        required: true
    },
    quantity:{
        type: Number, 
        default: 0
    },
}, {timestamps: true})

module.exports = model('Product', prodSchema)