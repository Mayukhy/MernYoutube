import { Avatar, Box, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetUserQuery } from '../redux/api/api'
export default function SearchVideoCard({ video }) {
  const { data: user } = useGetUserQuery(video?.userId)
  const navigate = useNavigate()
  return (
    <div className=' xl:w-[90%] mx-auto w-full xl:pr-10 pr-0 '>
      <div>
        <Box onClick={() => {
          navigate(`/video/${video?._id}`)
        }} className=' animate-[slideup_0.8s] hover:bg-black w-[100%] p-3 flex gap-4 h-auto duration-200 transition-all cursor-pointer rounded-md'>

          <img
            className=' xl:w-[400px] md:w-[300px] w-[220px] xl:h-[220px] md:h-[180px] h-[140px] rounded-md object-cover'
            alt={video?.title}
            src={video?.imgUrl}
          />

          <Box sx={{ my: { xs: 'auto', lg: 2 } }}>
            
            <Typography gutterBottom sx={{ color: 'white' }} variant='h6'>
              <p className=' font-semibold text-xl lg:flex md:hidden hidden text-slate-100'>{video?.title.length > 84 ? video?.title.slice(0, 84) + '...' : video?.title}</p>
              <p className=' font-semibold text-lg md:hidden flex text-slate-100'>{video?.title.length > 30 ? video?.title.slice(0, 30) + '...' : video?.title}</p>
              <p className=' font-semibold text-lg lg:hidden md:flex hidden text-slate-100'>{video?.title.length > 70 ? video?.title.slice(0, 70) + '...' : video?.title}</p>
            </Typography>
            <Typography variant='subtitle1' className=' text-gray-400'>
                  {`${video?.views?.length || 0} Views • ${moment(video?.createdAt).fromNow()}`}
                </Typography>
            <div className='flex gap-2'>
              <Avatar sx={{width:'40px',height:'40px',mt:1}} src={user?.userName} alt={user?.userName} />
              <div className='my-auto'>
                <Typography display="block" variant='subtitle1' className=' text-gray-400 mt-1'>
                 <p className=' font-semibold text-lg mt-2.5'>{user?.userName || 'Gaming Buddy'}</p> 
                </Typography>
              </div>

            </div>

          </Box>

        </Box>
        <br />
      </div>
    </div>
  )
}
