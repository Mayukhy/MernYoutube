import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setLoading,endLoading, setCategoryName } from '../redux/slices/videoSlice';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';

export default function Subvideos() {
  const baseUrl ='http://localhost:5000'
  const {isLoading,categoryName}= useSelector(state=>state.video)
  const dispatch = useDispatch()
  const [subVideos,setSubVideos] = useState(null)
  useEffect(()=>{
  dispatch(setCategoryName("Subscription"))
  },[categoryName])


  useEffect(()=>{
  const fetchData = async()=>{
  dispatch(setLoading())
  await axios.get(`${baseUrl}/vid/sub/videos`)
  .then(({data})=>{
    setSubVideos(data)
    dispatch(endLoading())
  })
  }
  fetchData()
  },[])
 console.log(subVideos)
  return (
    <div className=' flex'>
      <Sidebar/>
    <div style={{background:'black'}} className=' lg:pl-6 pl-2 w-full px-2 pb-8 overflow-y-auto h-[calc(100vh-64px)] scroll-smooth '>
{subVideos?.length >0 ?<div className=' animate-[slideup_1.5s] flex gap-2 flex-wrap xl:justify-start justify-center '>
      {subVideos?.map((item,id)=>(
        <VideoCard item={item} key={id}/>
        
      ))}
      </div>:
      <div className=' text-center text-white font-extrabold mx-auto mt-10 text-3xl'>
      You have not subscribed anyone yet</div>
       
    }
      
    </div>
    
    </div>
  )
}
