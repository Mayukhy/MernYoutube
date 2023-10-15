import communityData from '../models/community.js'


export const getCommunities = async (req, res) => {
  try {
      const communities = await communityData.find().sort({ createdAt: -1 })
      res.json(communities)   
  } catch (error) {
    res.status(500).json("something went wrong")
  }
  

};
export const getCommunity = async (req, res) => {
    const {id} = req?.params
    try {
        const community = await communityData.findById(id)
        res.json(community)   
    } catch (error) {
        res.status(500).json("something went wrong")
    }
    
};

export const CreateCommunity = async (req, res) => {
    try {
        const community = new communityData({ userId: req.user.id, ...req.body })
        const newCommunity = await community.save()
        res.json(newCommunity)   
    } catch (error) {
        res.status(500).json("something went wrong")
    }
    
};

export const publishCommunity=async(req,res)=>{
  const {id} = req.params
  try {
    const publishedPost = await communityData.findByIdAndUpdate(id,
        {
            $set:{isPublished:true},
        
    },
    {new:true})

    res.json(publishedPost)
  } catch (error) {
    res.json('something went wrong')
  }
}



