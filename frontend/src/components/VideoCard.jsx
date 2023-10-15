import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Box} from '@mui/material';
import { useGetUserQuery } from '../redux/api/api';
import Avatar from '@mui/material/Avatar';
import { hideIsPlaylistVideo, nullPlaylistId, setCurrentPlaylistVideoId} from '../redux/slices/videoSlice';
export default function VideoCard({item}) {
  const {data} = useGetUserQuery(item?.userId)
  const dispatch = useDispatch()
  const {smSidebar} = useSelector(state=>state.video)
  const navigate = useNavigate()
  const [videosrc,setVideosrc] = useState(null)
  return (
<Box

onMouseEnter={()=>{
  setVideosrc(item?.videoUrl)
  }}
  onMouseLeave={()=>{
    setVideosrc(null)
  
  }}

onClick={()=>{
  dispatch(hideIsPlaylistVideo())
  dispatch(nullPlaylistId())
  dispatch(setCurrentPlaylistVideoId(null))
  navigate(`/video/${item?._id}`)
}} className={!smSidebar ?'hover:bg-[#161417] 2xl:h-[310px] h-auto duration-200 transition-all cursor-pointer hover:scale-105 rounded-md p-3':'hover:bg-[#161417] 2xl:h-[370px] h-auto duration-200 transition-all cursor-pointer hover:scale-105 rounded-md p-3'} sx={{ width:!smSidebar? {md:600 ,lg:600,xl:400,xs:'100%',sm:'550px'}:{md:600 ,lg:450,xl:455,xs:'100%',sm:'570px'}, marginRight: 0.5, my: 1 }}>

{videosrc ===null ?<img
className={!smSidebar?' lg:h-[300px] rounded-md xl:h-[300px] 2xl:h-[200px] md:h-[300px] h-[260px] object-cover':' lg:h-[270px] rounded-md xl:h-[250px] 2xl:h-[260px] md:h-[300px] h-[240px] object-cover'}
  style={{ width: '100%'}}
  alt={item?.title}
  src={item?.imgUrl}
/>:
<>
  <video controls autoPlay muted className={!smSidebar?' w-full lg:h-[300px] rounded-md xl:h-[300px] 2xl:h-[200px] md:h-[300px] h-[260px] object-cover':' lg:h-[270px] rounded-md xl:h-[250px] 2xl:h-[260px] md:h-[300px] h-[240px] object-cover'} src={videosrc}></video>
  
</>
}

  <div className=' flex gap-2 mt-1'>
    <Avatar className=' mt-2' alt={data?.useName} src={data?.profile}  />
    <div>
    <Typography gutterBottom  sx={{color:'white'}} variant="body2">
  <p className=' font-semibold text-lg text-slate-100  mt-1'>{item?.title.length > 27 ?item?.title.slice(0,30) +'...':item?.title}</p>
  </Typography>
    <Typography display="block" variant="caption" className=' text-gray-300'>
   <p className=' font-semibold text-base mt-[-5px] text-slate-400'>{data?.userName || 'Gaming Buddy'}</p>  
  </Typography>
  <Typography variant="caption">
    <p className=' mt-[-2px] text-base text-gray-400'>{`${item?.views?.length || 0} Views • ${moment(item?.createdAt).fromNow() }`}</p>
  </Typography>
    </div>
  </div>

</Box>

  )
}
