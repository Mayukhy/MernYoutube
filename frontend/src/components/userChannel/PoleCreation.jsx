import React, { useEffect, useState } from 'react'
import Input from '@mui/material/Input';
import { useCreatePoleMutation, useGetCommunityPolesQuery } from '../../redux/api/api';
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux';
import { endLoading, setLoading } from '../../redux/slices/videoSlice';
import Userpole from './userpole';


const ariaLabel = { 'aria-label': 'description' };
export default function PoleCreation({postId,userPole,textPole,poleData,setPoleData}) {
  const {isloading} = useSelector(state=>state.video)
   const dispatch = useDispatch()
  const {data:poles} = useGetCommunityPolesQuery()
  const [CreatePole] = useCreatePoleMutation()
    const [borderBottom,setBorderBottom] = useState(false)
    const [showbtn,setShowbtn] = useState(false)
    
    useEffect(()=>{
      setPoleData({...poleData,communityPostId:`${postId}`})
    },[postId])

    //Pole creation logic
    const CreateunicPole=()=>{
    const addpole = async()=>{
      if (poleData?.poleName !=="" && poleData?.communityPostId) {
        dispatch(setLoading())
    await CreatePole(poleData)
      dispatch(endLoading())
      setPoleData({...poleData,poleName:''})
      }
    }
    addpole()
    }

  return (
    <div>

  { textPole && <div>
    {postId && userPole?.map((pole)=>(
<Userpole pole={pole} postId={postId}/>
    ))}
{userPole?.length < 5 && <div className=' flex gap-1 my-3'>
          <Input onFocus={()=>{
    setShowbtn(true)
setBorderBottom(true)
}}
onBlur={()=>setBorderBottom(false)}
value={poleData?.poleName}
onChange={(e)=>setPoleData({...poleData,poleName:e.target.value})}

sx={{width:'90%',color:'#b2b8b4',borderBottom:!borderBottom?'solid 2px #a7a8a7':''
}} placeholder="Add Pole.." inputProps={ariaLabel} />
<Button size='small' onClick={CreateunicPole}  sx={{borderRadius:'20px'}} variant='outlined' color='primary'>
  Add Pole
</Button>
</div>}
</div>}
    </div>
  )
}
