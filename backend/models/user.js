import mongoose from 'mongoose'
import isEmail from 'validator/lib/isEmail.js';

const userSchema = mongoose.Schema({
 name:{
    type:String,
    required:true,
   },
   userName:{
    type:String,
    required:true,
    unique:true
   },
 email:{
    type:String,
    required:true,
    unique:true,
    validate(value){
    if (!isEmail(value)) {
       throw new Error('Email is not valid') 
    }
    }
   },
 password:{
    type:String,
    required:true,
   },
   subscribers: {
      type: Number,
      default: 0,
    },
    subscribedUsers: {
      type: [String],
    },
 profile:{
   type:String,
   default:""
 },
 background:{
   type:String,
   default:""
 },
 createdAt:{
    type:Date,
    default:new Date()
 },
})

const userData = mongoose.model('User',userSchema)
export default userData;