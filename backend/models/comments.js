import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
 userId:{
    type:String,
    required:true,
   },

   userName:{
      type:String,
      required:true,
     },

 msg:{
    type:String,
    required:true,
   },
 videoId:{
    type:String,
    required:true,
   },
  ref:{
      type:String,
      default:''
     },
 profile:String,
 createdAt:{
    type:Date,
    default:new Date()
 },
})

const commentData = mongoose.model('Comment',commentSchema)
export default commentData;