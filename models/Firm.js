const {Schema, model} = require('mongoose')

const firmSchema = new Schema({
    name: {
        type: String, 
        trim: true, 
        required: [true, 'Firm name is requird'],
        unique: [true, 'Please use a different Firm name, this one is already exists']
    },
    phone:{
        type: String, 
        trim:true
    }, 
    address:{
        type: String, 
        trim:true
    }, 
    image:{
        type: String, 
        default: '/image/no-image.jpg',
        trim: true
    }
}, {timestamps: true})

module.exports = model('Firm', firmSchema)