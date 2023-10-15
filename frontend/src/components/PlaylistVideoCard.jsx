import React from 'react'
import { Box,Typography } from '@mui/material'
import moment from 'moment'
import { useGetUserQuery } from '../redux/api/api'
export default function PlaylistVideoCard({video,navigate}) {
  const {data:channelData} = useGetUserQuery(video?.userId)

  return (
    <Box onClick={() => {
        navigate(`/video/${video?._id}`)
      }} className='hover:bg-[#161417] w-[100%] p-3 flex gap-4 h-auto duration-200 transition-all cursor-pointer rounded-md'>

        <img
          className=' lg:w-[200px] w-[220px] lg:h-[120px] h-[140px] rounded-md object-cover'
          alt={video?.title}
          src={video?.imgUrl}
        />

        <Box sx={{ pr: 2 }}>
          <Typography gutterBottom sx={{ color: 'white' }} variant='h6'>
            <p className=' font-md text-lg lg:flex md:hidden hidden text-slate-100'>{video?.title.length > 64 ? video?.title.slice(0, 64) + '...' : video?.title}</p>
            <p className=' font-md text-lg md:hidden flex text-slate-100'>{video?.title.length > 10 ? video?.title.slice(0, 10) + '...' : video?.title}</p>
            <p className=' font-md text-lg lg:hidden md:flex hidden text-slate-100'>{video?.title.length > 70 ? video?.title.slice(0, 70) + '...' : video?.title}</p>
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
