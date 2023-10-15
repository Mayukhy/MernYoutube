import commentData from '../models/comments.js'
import videoData from '../models/video.js'

export const addComment=async(req,res)=>{
    const newComment = await commentData({...req.body,userId:req.user.id})
    try {
      const savecomment= await newComment.save()  
      res.json(savecomment)
    } catch (error) {
       res.status(404).json("invalid user") 
    }
}

export const getComment = async(req,res)=>{
    const {currentVideoId} = req.params
    try {
        const comment = await commentData.find({videoId:currentVideoId}).sort({createdAt:-1})
        res.json(comment)
    } catch (error) {
        res.status(500).json("something went wrong") 
    }

}