import React from 'react'
import {useGetPlaylistVideosQuery } from '../redux/api/api'
import {Box,Typography,Stack} from '@mui/material';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { useDispatch, useSelector} from 'react-redux';
import { setPlaylistId } from '../redux/slices/videoSlice';
import { useNavigate } from 'react-router-dom';
export default function LibraryCard({playlist}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {smSidebar} = useSelector(state=>state.video)
   const {data:videos,isFetching} =  useGetPlaylistVideosQuery(playlist?._id)
   console.log(videos)
   const stockimages =  [
    'https://www.shutterstock.com/shutterstock/videos/1105713521/thumb/8.jpg?ip=x480',
    'https://media.istockphoto.com/id/1288668901/video/businessman-videocalling-his-team-online-and-teleworking.jpg?s=640x640&k=20&c=HZV5q39oy4iyRmEVnouENkRRO-TqTH2SAOcvdtdYYMU=',
    'https://media.istockphoto.com/id/1254575202/video/remote-working-and-virtual-business-team.jpg?b=1&s=640x640&k=20&c=VlkP0i-sMbIuweCbOz1OkxUH3D2JcNvlG7nfhdzc9LQ=',
    'https://www.shutterstock.com/shutterstock/videos/1087836141/thumb/7.jpg?ip=x480',
    'https://www.shutterstock.com/shutterstock/videos/1107366609/thumb/1.jpg?ip=x480',
    'https://media.istockphoto.com/id/1384305036/video/young-woman-with-laptop-animation-girl-working-at-computer-speech-bubble-or-thought-bubble.jpg?s=640x640&k=20&c=O_wppvDh978pM76hjehh5D78birbKds706xpPcDKQIU='
   ]

   const getimgid=()=>{
    for (let index = 0; index < stockimages.length; index++) {
        if (index<stockimages?.length) {
           return Math.floor(Math.random()*6)
        }
        
       }
   }

  return (

<Box onClick={()=>{
  dispatch(setPlaylistId(playlist?._id))
  navigate(`/libraryVids/${playlist?._id}`)
}} className={smSidebar?'hover:bg-black 2xl:h-[250px] h-auto duration-200 transition-all cursor-pointer hover:scale-105 rounded-md p-3':'hover:bg-black 2xl:h-[230px] h-auto duration-200 transition-all cursor-pointer hover:scale-105 rounded-md p-3'} sx={{ width:!smSidebar? {md:400 ,lg:340,xl:300,xs:350,sm:500}:{md:400 ,lg:390,xl:340,xs:350,sm:500}, marginRight: 0.5, my: 1 }}>

<img className=' h-auto '
  style={{ width: '100%',backgroundSize:'cover',objectFit:'cover' }}
  alt={playlist?.playLlistName}
  src={stockimages[getimgid()] }
/>

<Stack sx={{width:'100%' }}>
    <div style={{background:'radial-gradient(circle, rgba(78,89,101,0.499124649859944) 0%, rgba(97,88,107,0.4739145658263305) 100%)'}} className=' w-full p-2 font-semibold text-md text-slate-100 flex justify-between backdrop-blur-lg mt-[-40px]'>
        <PlaylistPlayIcon/>
<p >{playlist?.videos?.length} Videos</p>
</div>
  <Typography gutterBottom  sx={{color:'white'}} variant="body2">
  <p className=' font-semibold text-md text-slate-100  mt-1'>{playlist?.playLlistName.length > 50 ?playlist?.playLlistName.slice(0,50) +'...':playlist?.playLlistName}</p>
  </Typography>
  <Typography variant="caption" className=' text-gray-400'>
  View Full Playlist
  </Typography>
</Stack>

</Box>

  )
}
