import React, { useEffect } from 'react'
import VideoCard from '../components/VideoCard';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getVideos, setCategoryName, setLoading } from '../redux/slices/videoSlice';

export default function Home() {
  
  const {videos,isLoading,categoryName}= useSelector(state=>state.video)
  const dispatch = useDispatch()
  useEffect(()=>{
  dispatch(setCategoryName("Home"))
  },[categoryName])


  useEffect(()=>{
  const fetchData = async()=>{
  dispatch(setLoading())
  await axios.get('http://localhost:5000/vid/random')
  .then(({data})=>dispatch(getVideos(data)))
  }
  fetchData()
  },[])
console.log(videos)
  return (
    <div className=' flex'>
      <Sidebar/>
      
    <div style={{background:'black'}} className='gap-2 lg:pl-6 pl-2 w-full px-2 pb-8 overflow-y-auto h-[calc(100vh-64px)] scroll-smooth '>
   <div className=' animate-[slideup_0.8s] flex gap-2 flex-wrap xl:justify-start justify-center '>
      {videos?.map((item,id)=>(
        <VideoCard item={item} key={id}/>
        
      ))}
      </div>
      
    </div>
    </div>
    
  )
}
