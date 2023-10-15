import videoData from '../models/video.js'
import userData from '../models/user.js'
import playlistData from '../models/playlist.js'
export const getvideos =async(req,res)=>{
 const videos = await videoData.find()
 res.json(videos)
  }

export const postvideo =async(req,res)=>{
    const newVideo = new videoData({ userId: req.user.id, ...req.body });
    try {
      const savedVideo = await newVideo.save();
      res.status(200).json(savedVideo);
    } catch (err) {
      res.status(500).json(err)
    }
}
export const updatevideo =async(req,res)=>{
   const {videoId} = req.params
   try {
    const video = await videoData.findById(videoId)
    if (req.user.id === video.userId) {
      const updatedVideo = await videoData.findByIdAndUpdate(videoId,
        {
        $set:req.body,
      },
      { new: true }
      )
      res.status(200).json(updatedVideo) 
     } 
     else
     res.status(404).json('Not expected user')
   } catch (error) {
    res.status(500).json('Something Went Wrong')
   }  
}

export const getvideo =async(req,res)=>{
  const {id} = req.params
  try {
  const video = await videoData.findById(id)
  res.status(200).json(video)
  } catch (error) {
    res.status(500).json('something went wrong')
  }

}
export const deletevideo =async(req,res)=>{

}

export const searchVideo = async(req,res)=>{
  try {
    
    const searchedQuery = await videoData.find(
      {
        "$or":[
          {title:{$regex:req.params.key,$options:"i"}},
          {desc:{$regex:req.params.key,$options:"i"}},
          {tags:{$regex:req.params.key,$options:"i"}},
      ]
      }
    )
      res.json(searchedQuery)
  } catch (error) {
    res.status(500).json('something went wrong')
  }
}

export const addView = async (req, res) => {
  const {videoId} = req.params
  try {
    await videoData.findByIdAndUpdate(videoId, {
      $addToSet:{views:req.user.id}
    });
    res.json("The view has been increased.");
  } catch (err) {
    res.status(500).json(err)
  }
};

export const random = async (req, res) => {
  try {
    const videos = await videoData.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err)
  }
};

export const trend = async (req, res) => {
  try {
    const videos = await videoData.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err)
  }
};
export const latest = async (req, res) => {
  try {
    const videos = await videoData.find().sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err)
  }
};
export const oldest = async (req, res) => {
  try {
    const videos = await videoData.find().sort({ createdAt: 1 });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err)
  }
};

//for those videos which are subcribed by the user
export const subvideos =async(req,res)=>{
    try {
        const user = await userData.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;
    
        const list = await Promise.all(
          subscribedChannels.map(async (channelId) => {
            return await videoData.find({ userId: channelId });
          })
        );
    
        res.status(200).json(list.flat());
      } catch (err) {
        res.status(500).json(err)
      }
}

export const relatedVideos = async(req,res)=>{
  const {videoId} = req.params
  try {
    const video = await videoData.findById(videoId)
    const relatedVideotags = video?.tags
     const relatedVideos =  await videoData.find({ tags: { $in:relatedVideotags } }).limit(20);

    res.status(200).json(relatedVideos);

  } catch (error) {
    
  }
}

export const comments = async(req,res)=>{
  const {videoId} = req.params
  const {comment} = req.body
  try {
    if (req.user.id) {
      await videoData.findByIdAndUpdate(videoId,{
       $push:{comments:comment}
      })
      res.json("Comment is posted")
     }
     else
     res.status(404).json('Invalid user')
  } catch (error) {
    res.status(500).json("something went wrong")
  }

}

   export const playlistvideo = async(req,res)=>{
    const {id} = req.params
    try {
      const playlist = await playlistData.findById(id)
      const listVideos = playlist?.videos
      const playlistvideos = await Promise.all(
        listVideos?.map(async(videoid)=>{
          return await videoData.find({_id:videoid})
        }
      ))
      res.status(200).json(playlistvideos.flat())
    } catch (error) {
      res.status(500).json("something went wrong")
    }
   }