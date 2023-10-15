import React, { useState } from 'react'
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Radio from '@mui/joy/Radio';
import { useGetPlaylistQuery, useUpdatePlaylistMutation } from '../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { endLoading, setLoading } from '../redux/slices/videoSlice';
import Tooltip from '@mui/material/Tooltip'
import { Button } from '@mui/material';
import Loader from './loader/Loader';
import DoneIcon from '@mui/icons-material/Done';

export default function SelectPlaylist({setErrorHide,setSavedHide,playlist,videoId,setId,setCurrentVidId,handleremoveVid,setsaved,setVideoExsists,videoExists}) {
  const {isloading} = useSelector((state)=>state.video)
  const data = useGetPlaylistQuery()
  const [playlistId,setPlaylistId] = useState(null)
  const dispatch = useDispatch()
  //if user already stored the video to the playlist
  const alreadyaddedvideo = (playlist?.videos?.filter((video)=>videoId === video))?.length

  if (alreadyaddedvideo >0) {
   setVideoExsists(true) 
  //  setSavedHide(true)
  }

  console.log('AlreadyAddedvideo',alreadyaddedvideo)
  return (
    <Tooltip title={(alreadyaddedvideo > 0 && videoExists) ?"Added to Playlist Double Click to Remove":(videoExists && alreadyaddedvideo === 0)?"At First Remove the video from previous playlist":"Add to Playlist"}>

              <ListItem className='animate-[slideup_0.8s]' onClick={()=>{
                setsaved(false)
                setVideoExsists(false)
                if (alreadyaddedvideo>0) {
                  handleremoveVid()

                }
              }}
                variant="outlined" sx={{ boxShadow: 'sm' ,color:'whitesmoke'}}>
              {/* <ListItemDecorator>
                {[<Person />, <People />, <Apartment />][index]}
              </ListItemDecorator> */}
              {alreadyaddedvideo>0 &&
              <div style={{zIndex:9,background:'black'}} className=' text-sky-300 rounded-full px-[1px] absolute left-0 ml-2 cursor-pointer hover:border-2'>
                <DoneIcon className=' z-50 scale-75'/>
                </div>
                
                }
              <Radio
                overlay
                
                // checked={alreadyaddedvideo > 0 && true }
                value=  {playlist?._id}
                onChange={(e)=>{
                  setId(e.target.value)
                  setCurrentVidId(videoId)    
                }}
                
                label=  {playlist?.playLlistName}
                sx={{ flexGrow: 1, flexDirection: 'row', color:'whitesmoke' }}
                slotProps={{
                  action: ({ checked }) => ({
                    sx: (theme) => ({
                      ...((checked  || alreadyaddedvideo > 0) && {
                        inset: -1,
                        border: '2px solid',
                        borderColor: theme.vars.palette.primary[500],
                      }),
                    }),
                  }),
                }}
              />
            </ListItem>
            </Tooltip>
  )
}
