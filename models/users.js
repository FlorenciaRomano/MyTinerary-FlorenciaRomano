const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName:{type:String, required:true},
    email:{type:String, required:true},
    password:[{type:String, required:true}],
    from:{type:Array},
    avatar:{type:String, required:true},
    country:{type:String,required:true},
    uniqueString: {type:String, required:true},
    verification: {type:Boolean, required:true}
})

const User = mongoose.model('users', userSchema)
module.exports = User