const {Schema, model} = require('mongoose')

const brandSchema = new Schema({
    name: {
        type: String, 
        trim: true, 
        required: [true, 'Brand name is requird'],
        unique: [true, 'Please use a different Brand name, this one is already exists']
    }, 
    image:{
        type: String, 
        default: '/images/no-image.jpg',
        trim: true
    }
}, {timestamps: true})

module.exports = model('Brand', brandSchema)