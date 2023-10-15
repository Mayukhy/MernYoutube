import mongoose from 'mongoose'

const playlistSchema = mongoose.Schema({
 userId:{
    type:String,
    required:true,
   },

   userName:{
      type:String,
      required:true,
     },

 playLlistName:{
    type:String,
    required:true,
   },
  videos:{
      type:[String],
      default:[]
     },
 createdAt:{
    type:Date,
    default:new Date()
 },
})

const playlistData = mongoose.model('Playlist',playlistSchema)
export default playlistData;