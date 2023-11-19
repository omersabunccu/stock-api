const {Schema, model} = require('mongoose')

const catSchema = new Schema({
    name: {
        type: String, 
        trim: true, 
        required: [true, 'Category name is requird'],
        unique: [true, 'Please use a different Category name, this one is already exists']
    }
}, {timestamps: true})

module.exports = model('Category', catSchema)