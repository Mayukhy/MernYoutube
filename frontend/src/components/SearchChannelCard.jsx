import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function SearchChannelCard({ channel }) {
    const navigate = useNavigate()
    return (
        <div className=' xl:w-[90%] mx-auto w-full xl:pr-10 pr-0 '>
            <div>
                <Box onClick={() => {
                    navigate(`/user/${channel?._id}`)
                }} className=' animate-[slideup_0.8s] hover:bg-black w-[100%] p-3 flex gap-10 h-auto duration-200 transition-all cursor-pointer rounded-md'>

                    <Avatar
                        sx={{ width: { lg: '150px', md: '130px', xs: '100px' }, height: { lg: '150px', md: '130px', xs: '100px' }, fontSize: '50px' }}
                        className=' xl:w-[150px] md:w-[130px] w-[100px] xl:h-[150px] md:h-[130px] h-[100px] rounded-full object-cover'
                        alt={channel?.userName}
                        src={channel?.profile}
                    />

                    <Box sx={{ pr: 2, my: 'auto' }}>
                        <Typography gutterBottom sx={{ color: 'white', mt: '-5px' }} variant='h6'>
                            <p className=' font-semibold text-2xl lg:flex md:hidden hidden text-slate-100'>{channel?.userName.length > 84 ? channel?.userName.slice(0, 84) + '...' : channel?.userName}</p>
                            <p className=' font-semibold text-2xl md:hidden flex text-slate-100'>{channel?.userName.length > 30 ? channel?.userName.slice(0, 30) + '...' : channel?.userName}</p>
                            <p className=' font-semibold text-xl lg:hidden md:flex hidden text-slate-100'>{channel?.userName.length > 70 ? channel?.userName.slice(0, 70) + '...' : channel?.userName}</p>
                        </Typography>
                        <Typography variant='subtitle1' className=' text-gray-400'>
                            {`${channel?.name} • ${channel?.subscribers} Subscribers`}
                        </Typography>
                    </Box>

                </Box>
            </div>

            <br />
        </div>
    )
}
