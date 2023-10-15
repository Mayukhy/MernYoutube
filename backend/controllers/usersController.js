
import userData from '../models/user.js'
import videoData from '../models/video.js';

export const getUsers = async (req, res) => {
  try {
      const user = await userData.find()
      res.json(user)   
  } catch (error) {
    res.status(500).json("something went wrong")
  }
  

};
export const getUser = async (req, res) => {
    const {id} = req?.params
    try {
        const user = await userData.findById(id)
        res.json(user)   
    } catch (error) {
        res.status(500).json("something went wrong")
    }
    

};

export const updateUser = async(req,res)=>{
  const {id} = req.params
  if (id === req.user.id) {
    try {
      const updatedUser = await userData.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        {new:true}
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(404).json('Something Went wrong')
    }
  } else {
   res.status(400).json("you can only update your profile")
  }
}

export const like =async(req,res)=>{

 // liked video id
 const {id} = req.user;
 const {videoId} = req.params;
try {
 await videoData.findByIdAndUpdate(videoId,{
  //Logged in user's id ==> req.user.id
  $addToSet:{likes:id}, //addToSet is used to store 1 thing only one time
  $pull:{dislikes:id}
 })
 res.json('Like successful')
} catch (error) {
  res.status(500).json('Something Went wrong')
}
}

export const dislike =async(req,res)=>{

  // liked video id
  const {id} = req.user;
  const {videoId} = req.params;
  try {
   await videoData.findByIdAndUpdate(videoId,{
    //Logged in user's id ==> req.user.id
    $addToSet:{dislikes:id},
    $pull:{likes:id}
   })
   res.json('dislike successful')
  } catch (error) {
    res.status(500).json('Something Went wrong')
  }
  }

export const subscribe = async (req, res) => {
  const {id} = req.params
    try {
        await userData.findByIdAndUpdate(req.user.id, {
          $addToSet: { subscribedUsers: id },
        });
        await userData.findByIdAndUpdate(id, {
          $inc: { subscribers: 1 },
        });
        res.status(200).json("Subscription successfull.")
      } catch (err) {
        res.status(500).json('Something Went wrong')
      }
};

export const unsubscribe = async (req, res) => {
  const {id} = req.params
  try {
      await userData.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: id },
      });
      await userData.findByIdAndUpdate(id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscription successfull.")
    } catch (err) {
     
    }
};


//for showing the subcribed users/channels to the frontend
export const subChannels= async(req,res)=>{
  try {
    const user = await userData.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;
    const subbedChannels = Promise.all(
      subscribedChannels?.map(async(channel)=>{
        await userData.find({subscribedUsers:channel})
      })
    )

      //  const subedChnnels =  await userData.find({ subscribedUsers: {$in:subscribedChannels} }).limit(10);

    res.json((await subbedChannels).flat());
  }
   catch (error) {
    res.status(500).json('You are not authenticated')
  }


}


//for searching of channel or user

export const searchChannel = async(req,res)=>{
  try {
    
    const searchedQueryuser = await userData.find(
      {
        "$or":[
          {name:{$regex:req.params.key,$options:"i"}},
          {userName:{$regex:req.params.key,$options:"i"}},
      ]
      }
    )
      res.json(searchedQueryuser)
    

  } catch (error) {
    res.status(500).json('something went wrong')
  }
}