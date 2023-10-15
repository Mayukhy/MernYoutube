import playlistData from '../models/playlist.js'
import videoData from '../models/video.js'

export const creatPlaylist=async(req,res)=>{
    const newPlaylist = await playlistData({...req.body,userId:req.user.id})
    try {
      const saveplaylist= await newPlaylist.save()  
      res.json(saveplaylist)
    } catch (error) {
       res.status(404).json("invalid user") 
    }
}

export const getPlaylist = async(req,res)=>{
    try {
        const playlist = await playlistData.find()
        res.json(playlist)
    } catch (error) {
        res.status(500).json("something went wrong") 
    }

}

export const getSinglePlaylist = async(req,res)=>{
    const {id} = req.params
    try {
        const playlist = await playlistData.findById(id)
        res.json(playlist)
    } catch (error) {
        res.status(500).json("something went wrong") 
    }

}

 export const updatePlaylist = async(req,res)=>{
    const {id,videoId} = req.params
    try {
         await playlistData.findByIdAndUpdate(id,{
            $addToSet:{videos:videoId}
         })   
         res.json("video is added to the playlist")
        
    } catch (error) {
        res.status(500).json("something went wrong")
    }
 }

 export const changeName = async(req,res)=>{
    const {id} = req.params
    try {
        if (req.user.id) {
            const updatedList = await playlistData.findByIdAndUpdate(id,{
                $set:req.body
            },
            {new:true}
            ) 

            res.json(updatedList)
        }
        else{
            res.status(404).json("invalid user") 
        }
        
    } catch (error) {
        res.status(500).json("something went wrong")
    }
 }

 export const delVideoPlaylist = async(req,res)=>{
    const {id,videoId} = req.params
    try {
         await playlistData.findByIdAndUpdate(id,{
            $pull:{videos:videoId}
         })   
         res.json("video is deleted from the playlist")
        
    } catch (error) {
        res.status(500).json("something went wrong")
    }
 }