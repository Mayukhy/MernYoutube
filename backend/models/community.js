import mongoose from 'mongoose'

const communitySchema = mongoose.Schema({
 userId:{
    type:String,
    required:true,
   },
   userName:{
      type:String,
      required:true,
     },
 title:{
    type:String,
    required:true,
   },
   isPublished:{
      type:Boolean,
      default:false
     },
   profile:{
    type:String,
   },
   imageUrl:{
      type:String,
     },
 createdAt:{
    type:Date,
    default:new Date()
 },
})

const communityData = mongoose.model('Community',communitySchema)
export default communityData;