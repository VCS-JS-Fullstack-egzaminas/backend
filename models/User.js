const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Userio schema

const userSchema = new Schema ({
    email: {type:String, required:true},
    username:{type:String, required:true},
    password:{type:String,required:true},
    role:{type:String,required:true}

},{timestamps:true})

// User modelio eksportas

const User = mongoose.model('User',userSchema)

module.exports = User