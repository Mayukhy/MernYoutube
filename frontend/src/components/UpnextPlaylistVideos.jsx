import React, { useEffect } from 'react'
import { useGetUserQuery } from '../redux/api/api'
import { Box,Typography } from '@mui/material'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { setCurrentMappedVideoId } from '../redux/slices/videoSlice'
import { useDispatch} from 'react-redux'


export default function UpnextPlaylistVideos({video,videoId,idx,setListVideoClicked,setMapId}) {
    const {data:channelData} = useGetUserQuery(video?.userId)
    const navigate = useNavigate()
    const dispatch = useDispatch()
  return (
    <Box onClick={() => {
      setListVideoClicked(true)
      dispatch(setCurrentMappedVideoId(idx+1))
      setMapId(idx+1)
      navigate(`/video/${video?._id}`)
    }} className={video?._id !== videoId ?' hover:bg-[#43464a] w-full flex gap-2  h-auto duration-200 transition-all cursor-pointer py-3 px-3':' hover:opacity-70 w-full  flex gap-2  h-auto duration-200 transition-all cursor-pointer bg-[#2c3440] py-3 pl-3'} >

      <p className=' my-auto text-slate-300 font-semibold text-lg'>{video?._id === videoId ?<PlayArrowIcon className=' ml-[-10px] mr-[-4px] scale-75'/>:idx+1}</p>
      <img
        className=' lg:w-[165px] w-[180px] lg:h-[90px] h-[100px] rounded-md'
        alt={video?.title}
        src={video?.imgUrl}
      />

      <Box sx={{ pr: 2 }}>
        <Typography gutterBottom sx={{ color: 'white' }} variant='h6'>
        <p className=' font-md text-base xl:flex hidden text-slate-100'>{video?.title.length > 30 ? video?.title.slice(0, 30) + '...' : video?.title}</p>
          <p className=' font-md text-base lg:flex xl:hidden hidden text-slate-100'>{video?.title.length > 18 ? video?.title.slice(0, 18) + '...' : video?.title}</p>
          <p className=' font-md text-base md:hidden flex text-slate-100'>{video?.title.length > 20 ? video?.title.slice(0, 20) + '...' : video?.title}</p>
          <p className=' font-md text-base lg:hidden md:flex hidden text-slate-100'>{video?.title.length > 70 ? video?.title.slice(0, 70) + '...' : video?.title}</p>
        </Typography>
        <Typography display="block" variant="caption" className=' text-gray-300'>
          {channelData?.userName || 'Gaming Buddy'}
        </Typography>
        <Typography variant="caption" className=' text-gray-400'>
          {`${video?.views?.length || 0} Views • ${moment(video?.createdAt).fromNow()}`}
        </Typography>
      </Box>

    </Box>

  )
}
