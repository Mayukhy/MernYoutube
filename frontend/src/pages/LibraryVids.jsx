import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPlaylistQuery, useGetPlaylistVideosQuery, useUpdateListnameMutation } from '../redux/api/api';
import Loader from '../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Sidebar from '../components/Sidebar';
import PlaylistVideos from '../components/PlaylistVideos';
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Input,Button } from '@mui/material';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { setIsPlaylistVideo,setPlayNextPlaylistvideo,setPlaylistId, setSelectedPLaytlistVideos } from '../redux/slices/videoSlice';

const ariaLabel = { 'aria-label': 'description' };
export default function LibraryVids() {
  const dispatch=useDispatch()
  const {playlistId} = useParams()
  const navigate = useNavigate()
  const {data:playlistdata} = useGetPlaylistQuery()
  const singleplaylist = playlistdata?.find((playlist)=>playlistId === playlist?._id)
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const [borderBottom,setBorderBottom] = useState(false)
  const [showbtn,setShowbtn] = useState(false)
  const [showInput,setShowInput] = useState(false)
  const {isloading } = useSelector(state => state.video)
  const  [listData,setListData] = useState({userId:currentUser?._id,userName:currentUser?.userName,playLlistName:'',id:singleplaylist?._id})
    const{data:videos,isFetching} = useGetPlaylistVideosQuery(playlistId)
    const [updatedName] = useUpdateListnameMutation()
    const handelUpdatePlaylist= async(e)=>{
      e.preventDefault()
    if (listData?.playLlistName !=='') {
      await updatedName(listData)
    }
    setShowbtn(false)
    setShowInput(false)
    }
 
    // storing the playlist to a global state to use in any component
    useEffect(()=>{
    dispatch(setPlaylistId(playlistId))
    },[playlistId])


  return (
    <div className=' flex'>
<Sidebar/>

    <div style={{background:'black'}} className='flex pt-3 xl:flex-row flex-col gap-2 lg:pl-6 pl-2 px-2 pb-8 h-[calc(100vh-64px)] w-full'>
    
    <div className=' rounded-xl relative xl:w-[600px] w-full lg:h-full h-[400px]' >
        <div className=' w-full h-full absolute backdrop-blur-md rounded-xl' style={{background:'linear-gradient(180deg, rgba(228,235,244,0.4767156862745098) 0%, rgba(0,0,0,1) 100%)',zIndex:9}}>
        <div>
            {videos?.map((video,id)=>(
                <div className=' absolute mx-6 flex xl:flex-col flex-row justify-center items-center mt-6'>
               { id === 0 && <img className='xl:w-full md:w-[250px] md:h-auto h-1/3  lg:w-[350px] w-full rounded-lg' src={video?.imgUrl} alt="" />}
               </div>
            ))}
        </div>
        
        <div className='px-6 xl:mt-[240px] mt-3 xl:static absolute right-0  ml-2 flex justify-between'>
       {!showInput ?<p className=' mr-10  font-bold text-3xl text-slate-200'>{singleplaylist?.playLlistName}</p>:

(
  
<div className=' mt-[-5px] xl:w-full lg:w-[400px] md:w-[200px] w-[150px]'>
<Input onFocus={()=>{
    setShowbtn(true)
setBorderBottom(true)
}}
onBlur={()=>{setBorderBottom(false)
 
}}
 value={listData?.playLlistName}
onChange={(e)=>{
setListData({...listData,playLlistName:e.target.value})
}}
sx={{width:'100%',color:'whitesmoke',fontWeight:700,fontSize:'28px',borderBottom:!borderBottom?'solid 2px #a7a8a7':''
}} placeholder="New Playlist" inputProps={ariaLabel} />
{showbtn &&<div className=' flex flex-row-reverse gap-1 mt-2'>
<Button onClick={handelUpdatePlaylist} variant='contained' sx={{color:'whitesmoke',borderRadius:'20px',px:2,bgcolor:'GrayText'}}  color='primary'>
 {isloading?<Loader/>:'Change Name'}
</Button>
<Button className='cancelhover' onClick={()=>setShowbtn(false)} variant="text" sx={{color:'whitesmoke',borderRadius:'20px',px:2}} color='inherit'>
  Cancel
</Button>
</div>}
</div>)
       }
        <Tooltip title="Edit">
        <IconButton sx={{mt:'-7px', pl:1}} aria-label="" className=' w-[55px] h-[54px]' onClick={()=>{
          setShowInput(!showInput)
          setListData({id:singleplaylist?._id,userId:currentUser?._id,userName:currentUser?.userName,playLlistName:singleplaylist?.playLlistName})}}>
          <EditNoteIcon className=' scale-150 text-slate-300'/>
          </IconButton>
        </Tooltip>
        </div>
        <br />
         
          <button onClick={()=>{
            dispatch(setPlaylistId(playlistId))
            dispatch(setIsPlaylistVideo())
            dispatch(setSelectedPLaytlistVideos(videos))
            dispatch(setPlayNextPlaylistvideo(0))
            navigate(`/video/${videos[0]?._id}`)
            }} className=' flex gap-2 outline-none py-3 px-7 rounded-3xl mx-6 bg-white text-black font-semibold text-base hover:bg-[#161417] border-none hover:text-yellow-50 transition-all duration-200'>
          <SmartDisplayIcon className=' mt-0.5 animate-[spin_1s]'/>
            Play All</button>

        </div>
        <img className=' rounded-xl absolute w-full h-full object-cover' src={'https://static01.nyt.com/images/2021/06/08/business/08OnTech-YouTube-VideoStill/08OnTech-YouTube-VideoStill-videoLarge-v2.png' || videos[Math.floor(Math.random()*videos?.length)]?.imgUrl} alt="" />
    

    </div>

<PlaylistVideos videos={videos} isFetching={isFetching}/>
      
    </div>
    </div>
  )
}
