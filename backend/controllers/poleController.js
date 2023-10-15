import poleData from '../models/textPole.js'


import userData from '../models/user.js'
import videoData from '../models/video.js';

export const getPoles = async (req, res) => {
  try {
      const communities = await poleData.find()
      res.json(communities)   
  } catch (error) {
    res.status(500).json("something went wrong")
  }
  

};
export const getPole = async (req, res) => {
    const {id} = req?.params
    try {
        const pole = await poleData.findById(id)
        res.json(pole)   
    } catch (error) {
        res.status(500).json("something went wrong")
    }
    
};

export const CreatePole = async (req, res) => {
    try {
        const pole = new poleData({ userId: req.user.id, ...req.body })
        const newpole = await pole.save()
        res.json(newpole)   
    } catch (error) {
        res.status(500).json("something went wrong")
    }
    
};

export const updatePole = async(req,res)=>{
  const {id} = req.params
    try {
      const updatedPole = await poleData.findByIdAndUpdate(
        id,
        {
          $addToSet: {textRes:req.user.id},
        }
      );
      res.status(200).json(updatedPole);
    } catch (err) {
      res.status(404).json('Something Went wrong')
    }
}

export const editPole = async(req,res)=>{
  const {id} = req.params
    try {
      const updatedPole = await poleData.findByIdAndUpdate(
        id,
        {
          $set:req.body,
        },
        {new:true}
      );
      res.status(200).json(updatedPole);
    } catch (err) {
      res.status(404).json('Something Went wrong')
    }
}

export const delPole = async(req,res)=>{
  const {id} = req.params
  try {
    await poleData.findByIdAndDelete(id) 
    res.json('Pole is deleted')
  } catch (error) {
    res.status(500).json('something went wrong')
  }

}

