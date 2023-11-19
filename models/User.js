const { hash, genSalt, compare } = require('bcryptjs')
const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String, 
        trim: true, 
        required: [true, 'Username name is requird'],
        unique: [true, 'Please use a different Username, this one is already exists'],
        index: true
    },
    password:{
        type: String, 
        trim: true, 
        required: [true, 'Password is requird'],
        match:[/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g, 'Passoeord should include alphanumberc, special characters and 8 characters min']
    },
    email:{
        type: String, 
        trim: true, 
        required: [true, 'Email is requird'],
        unique: [true, 'Please use a different Email, this one is already exists'],
        index: true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Email is not Valid']
    },
    firstName:{
        type:String, 
        trim: true, 
        required: true
    },
    lastName:{
        type:String, 
        trim: true, 
        required: true
    },
    isActive:{
        type:Boolean,
        default: true
    },
    isStaff:{
        type:Boolean,
        default: false
    },
    isAdmin:{
        type:Boolean,
        default: false
    }

}, {timestamps: true})


userSchema.pre('save', async function(next){

    // Hash the passsword using bcrypt
    const salt = await genSalt(12)
    this.password = await hash(this.password, salt);

    next();
})

userSchema.methods.matchPassword = function(enteredPassword){
    return compare(enteredPassword, this.password)
}
module.exports = model('User', userSchema)