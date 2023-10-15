import mongoose from "mongoose";

const videoSchema =  mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    views: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [String],
      default: [],
    },
    createdAt:{
        type:Date,
        default:new Date()
     },
  }
)

const videoData =  mongoose.model('Video', videoSchema)
export default videoData;