import React, { useEffect } from 'react'
import VideoCard from '../components/VideoCard';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCommunityPostsQuery } from '../redux/api/api';
import CommunityCard from '../components/CommunityCard';
import { setCategoryName } from '../redux/slices/videoSlice';

export default function Community() {
  const {data:posts} = useGetCommunityPostsQuery() 
  const allPosts = useGetCommunityPostsQuery()
  const {categoryName} = useSelector(state=>state.video)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setCategoryName("Community"))
    },[categoryName])
  
  useEffect(()=>{
   allPosts.refetch()
  },[posts])

  return (
    <div className=' flex'>
      <Sidebar/>
      
    <div style={{background:'black'}} className='gap-2 w-full px-2 pb-8 overflow-y-auto h-[calc(100vh-64px)] scroll-smooth '>
   <div className=' animate-[slideup_0.8s] flex flex-col justify-center items-center gap-2'>
      {posts?.map((item,id)=>(
        <CommunityCard post={item} key={id}/>
        
      ))}
      </div>
      
    </div>
    </div>
    
  )
}
