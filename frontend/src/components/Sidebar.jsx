import React from 'react'
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import HomeIcon from '@mui/icons-material/Home';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import Divider from '@mui/material/Divider';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CodeIcon from '@mui/icons-material/Code';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SchoolIcon from '@mui/icons-material/School';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryName, setmobilemenuoff } from '../redux/slices/videoSlice';
import ForumIcon from '@mui/icons-material/Forum';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

export default function Sidebar() {
  const {mobilemenu,smSidebar,categoryName} = useSelector((state)=>state.video)
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const pages = [
  {name:'Home',icon:<HomeIcon/>,to:'/'},
  {name:'Shorts',icon:<AppShortcutIcon/>,to:'/shorts'},
  {name:'Community',icon:<ForumIcon/>,to:'/community'},
  {name:'Subscription',icon:<SubscriptionsIcon/>,to:'/sub'},
  {name:'Library',icon:<SlideshowIcon/>,to:'/library'},
  {name:'Liked Videos',icon:<ThumbUpIcon/>,to:'/likedVideos'},
  ]

  const smPages = [
    {name:'Home',icon:<HomeIcon/>,to:'/'},
    {name:'Community',icon:<ForumIcon/>,to:'/community'},
    {name:'Subscription',icon:<SubscriptionsIcon/>,to:'/sub'},
    {name:'Library',icon:<SlideshowIcon/>,to:'/library'}
    ]

  const Catagories = [
    { name: 'Trending', icon: <WhatshotIcon/>, },
    { name: 'MERN', icon: <CodeIcon />, },
    { name: 'Music', icon: <MusicNoteIcon /> },
    { name: 'Education', icon: <SchoolIcon />, },
    { name: 'Movie', icon: <OndemandVideoIcon />, },
    { name: 'Gaming', icon: <SportsEsportsIcon />, },
    { name: 'Live', icon: <LiveTvIcon />, },
    { name: 'Sport', icon: <FitnessCenterIcon />, },
    { name: 'Comedy', icon: <TheaterComedyIcon />, }
  ];

  return (
    <>
    {/* for mid device */}
    {!mobilemenu && !smSidebar &&<div style={{background:'black'}} className=' lg:w-[300px] md:w-[250px] md:flex hidden flex-col h-[calc(100vh-64px)] overflow-y-auto scroll-smooth'>
      <div className=' flex flex-col mx-auto'>
        {pages?.map((item,id)=>(
          <div key={id}  onClick={()=>{
            dispatch(setCategoryName(item?.name))
            navigate(item?.to)
            }} className={categoryName!==item?.name ?'flex gap-3 hover:bg-[#242226] text-slate-50 duration-200 transition-all py-2.5 px-2.5 cursor-pointer my-2 lg:w-[200px] md:w-[180px] rounded-md ':'flex gap-3 hover:bg-[#242226] bg-[#313033] text-slate-50 duration-200 transition-all py-2.5 px-2.5 cursor-pointer my-2 lg:w-[200px] md:w-[180px] rounded-md '}>
            {item?.icon}
            <p>{item?.name}</p>
          </div>
        ))}
      </div>
     <Divider light sx={{background:'#696969',mt:0.5}} variant='middle'/>
     <p className=' text-slate-100 pt-2.5 lg:pl-9 md:pl-5 cursor-pointer text-xl'>Explore</p>
     <div className=' flex flex-col mx-auto mt-1'>
        {Catagories?.map((item,id)=>(
          <div key={id} className='flex gap-3 hover:bg-[#242226] text-slate-50 duration-200 transition-all py-2.5 px-2.5 cursor-pointer my-2 lg:w-[200px] md:w-[180px] rounded-md '>
            {item?.icon}
            <p>{item?.name}</p>
          </div>
        ))}
      </div>
      <Divider light sx={{background:'#696969',mt:0.5}} variant='middle'/>
      <p className='flex gap-3 text-slate-300 pt-2.5 px-2.5 cursor-pointer my-2 lg:w-[200px] md:w-[180px] mx-auto'>
      About Press Copyright Contact us 
      </p>
      <p className='flex gap-3 text-slate-300  px-2.5 cursor-pointer lg:w-[200px] md:w-[180px] mx-auto'>
Creators Advertise Developers
</p>
<p className='flex gap-3 text-slate-300 pt-2.5 px-2.5 cursor-pointer lg:w-[200px] md:w-[180px] mx-auto'>
Terms Privacy Policy & Safety How YouTube worksTest new features
</p>
      <p className='flex gap-3 text-slate-400 mt-2 pb-2.5 px-2.5 cursor-pointer mb-2 lg:w-[200px] md:w-[180px] mx-auto'>@MYtube2.0</p>
    </div>}

    {/* Smallsidebar for mid device */}

    {!mobilemenu && smSidebar &&<div style={{background:'black'}} className='w-[100px] md:flex hidden flex-col h-[calc(100vh-64px)] overflow-y-auto scroll-smooth'>
      <div className=' flex flex-col mx-auto'>
        {smPages?.map((item,id)=>(
          <div key={id}  onClick={()=>{
            dispatch(setCategoryName(item?.name))
            navigate(item?.to)}} className={ categoryName !== item?.name ?'flex flex-col gap-3 hover:bg-[#242226] text-slate-50 duration-200 transition-all py-2.5 px-2.5 cursor-pointer my-2 rounded-md justify-center items-center ':'flex flex-col gap-3 hover:bg-[#242226] text-slate-50 duration-200 transition-all py-2.5 px-2.5 cursor-pointer my-2 rounded-md justify-center items-center bg-[#313033] '}>
            {item?.icon}
            <p className=' text-center text-xs'>{item?.name}</p>
          </div>
        ))}
      </div>
    </div>}



{/* for small device */}
{ mobilemenu &&
<>
<div style={{zIndex:9,background:'linear-gradient(0deg, rgba(15,15,15,0.4431022408963585) 0%, rgba(15,15,15,0.4431022408963585) 100%)'}} onClick={()=>dispatch(setmobilemenuoff())} className=' absolute md:hidden flex w-screen h-[calc(100vh-64px)]'></div>
<div style={{zIndex:99,background:'black'}} className='left-0 top-0  w-1/2 absolute md:hidden flex flex-col h-screen overflow-y-auto scroll-smooth'>
      <div className=' flex flex-col mt-1 px-2'>
        <div className=' flex gap-4'>
  <div className=' flex ml-2 mt-1'>
<IconButton
   size='small'
   color="inherit"
  aria-label="" onClick={()=>dispatch(setmobilemenuoff())}>
  <MenuIcon className='text-white'/>
  </IconButton>
</div>
          <div className=' gap-2 md:pl-6 pl-0 flex'>
            <img onClick={()=>{
            navigate('/')
        }} className=' w-[40px] h-[40px] md:mt-0 mt-1 lg:ml-[-18px] xl:ml-[-10px] md:ml-[-30px] ml-[-10px]' src="https://seeklogo.com/images/Y/youtube-music-logo-50422973B2-seeklogo.com.png" alt="" />
            <p className=' mt-[9.5px] text-white text-lg '>YuTube2.O</p>
            </div>
            </div>
        {pages?.map((item,id)=>(
          <div key={id}  onClick={()=>navigate(item?.to)} className='flex gap-3 hover:bg-slate-800 text-slate-50 duration-200 transition-all py-2.5 px-2.5 cursor-pointer my-2 lg:w-[200px] md:w-[180px] rounded-md '>
            {item?.icon}
            <p>{item?.name}</p>
          </div>
        ))}
      </div>
     <Divider light sx={{background:'#696969',mt:0.5}} variant='middle'/>
     <p className=' text-slate-100 pt-2.5 lg:pl-9 md:pl-5 px-4 cursor-pointer text-xl'>Explore</p>
     <div className=' flex flex-col px-2 mt-1'>
        {Catagories?.map((item,id)=>(
          <div key={id} className='flex gap-3 hover:bg-slate-800 text-slate-50 duration-200 transition-all py-2.5 px-2.5 cursor-pointer my-2 lg:w-[200px] md:w-[180px] rounded-md '>
            {item?.icon}
            <p>{item?.name}</p>
          </div>
        ))}
      </div>
      <Divider light sx={{background:'#696969',mt:0.5}} variant='middle'/>
      <p className='flex gap-3 text-slate-300 pt-2.5 px-2 cursor-pointer my-2 lg:w-[200px] md:w-[180px] '>
      About Press Copyright Contact us 
      </p>
      <p className='flex gap-3 text-slate-300  px-2 cursor-pointer lg:w-[200px] md:w-[180px]'>
Creators Advertise Developers
</p>
<p className='flex gap-3 text-slate-300 pt-2.5 px-2 cursor-pointer lg:w-[200px] md:w-[180px]'>
Terms Privacy Policy & Safety How YouTube worksTest new features
</p>
      <p className='flex gap-3 text-slate-400 mt-2 pb-2 px-2 cursor-pointer mb-2 lg:w-[200px] md:w-[180px]'>@MYtube2.0</p>
    </div>
    </>
}
    </>
  
  )
}
