import React, { useState } from 'react'
import { useGetUserQuery } from '../redux/api/api'
import { Box,Typography } from '@mui/material'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { hideIsPlaylistVideo, nullPlaylistId, setCurrentPlaylistVideoId } from '../redux/slices/videoSlice'
import { useDispatch } from 'react-redux'

export default function VideoDetailVideos({video,videoId,id}) {
    const {data:channelData} = useGetUserQuery(video?.userId)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  return (
    <div key={id} className=' mt-5'>
    {video?._id !== videoId && <Box onClick={() => {
      dispatch(hideIsPlaylistVideo()) 
      dispatch(nullPlaylistId())
      dispatch(setCurrentPlaylistVideoId(null))
      navigate(`/video/${video?._id}`)
    }} className=' hover:bg-[#2b2b2b] w-full flex gap-2  h-auto duration-200 transition-all cursor-pointer py-2 rounded-md'>

      <img
        className=' lg:w-[180px] w-[220px] lg:h-[100px] h-[120px] rounded-md'
        alt={video?.title}
        src={video?.imgUrl}
      />

      <Box sx={{ pr: 2 }}>
        <Typography gutterBottom sx={{ color: 'white' }} variant='h6'>
          <p className=' font-md text-base lg:flex md:hidden hidden text-slate-100'>{video?.title.length > 44 ? video?.title.slice(0, 44) + '...' : video?.title}</p>
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

    </Box>}
  </div>
  )
}
