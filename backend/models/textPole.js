import mongoose from 'mongoose'

const poleSchema = mongoose.Schema({
 userId:{
    type:String,
    required:true,
   },
   communityPostId:{
    type:String,
   },
 poleName:{
    type:String,
    required:true,
   },
   textRes:{
    //storing the userIds of the users who have ansed the pole
    type:[String],
    default:[]
   },
 createdAt:{
    type:Date,
    default:new Date()
 },
})

const poleData = mongoose.model('Pole',poleSchema)
export default poleData;