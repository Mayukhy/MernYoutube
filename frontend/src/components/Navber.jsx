import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Input from '@mui/joy/Input';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Auth from './auth/Auth';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip'
import { Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateVideo from './CreateVideo';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {closeSmsidebar, setCategoryName, setSmsidebar, setmobilemenuoff, setmobilemenuon} from '../redux/slices/videoSlice';
import CreatePostPopup from './CreatePostpopup';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'black',
  border: '2px solid #000',
  BoxShadow: 24,
  p: 4,
  color: 'white',
};


export default function Navber({setSearchTerm}) {
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const [open, setOpen] = useState(false);
  const [inputData,setinputData] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {mobilemenu,smSidebar} = useSelector((state)=>state.video)
  const handleOpen = () => {
    setOpen(true)

  };
  const handleClose = () => setOpen(false);

  const submitQuery=()=>{
    if (inputData !=='') {
      setSearchTerm(inputData)
      navigate('/search')
      setinputData('')
    }

  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      {mobilemenu && 
        <Sidebar/>
        }
      <AppBar sx={{background:'black',width:'100%'}} position="static">
        <Toolbar>
          <div className=' flex w-screen justify-between'>
          <Typography 
 className=' cursor-pointer' variant="h6" sx={{ display:'flex',gap:2 }}>

<div className=' md:hidden flex'>
{!mobilemenu && <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
           onClick={()=>{dispatch(setmobilemenuon())}}>
          <MenuIcon className=' text-slate-200 mt-[-1.8px]'/> 
          </IconButton>}
          {mobilemenu && <IconButton 
            size="large"
            color="inherit"
            aria-label="menu"
           onClick={()=>{dispatch(setmobilemenuoff())}}>
          <MenuIcon className=' text-slate-200'/> 
          </IconButton>}
</div>
<div className=' md:flex hidden mt-[-7px] mr-[-5px] ml-2'>
{ !smSidebar ?
<IconButton
   size='small'
   color="inherit"
  aria-label="" onClick={()=>dispatch(setSmsidebar())}>
  <MenuIcon className='text-white'/>
  </IconButton>:
  <IconButton
  size='small'
  color="inherit"
 aria-label="" onClick={()=>dispatch(closeSmsidebar())}>
 <MenuIcon className='text-white'/>
 </IconButton>}
</div>
          <div className=' gap-2 md:pl-6 pl-0 md:flex hidden '>
            <img onClick={()=>{
            dispatch(setCategoryName("Home"))
            navigate('/')
        }} className=' w-[40px] h-[40px] md:mt-0 mt-1 lg:ml-[-18px] xl:ml-[-10px] md:ml-[-30px] ml-[-10px]' src="https://seeklogo.com/images/Y/youtube-music-logo-50422973B2-seeklogo.com.png" alt="" />
            <p className='md:mt-1 mt-2 '>MyTube2.O</p>
            </div>
          </Typography>

  {/* Search Area */}
<div className=' flex gap-1'>
<Input
 onKeyUp={(e)=>{
  if (e.key === "Enter" && inputData !== '') {
    setSearchTerm(inputData)
    navigate('/search')
    setinputData('')
  }
}} value={inputData} onChange={(e)=>setinputData(e.target.value)} sx={{borderBottomLeftRadius:'40px',pl:3,borderTopLeftRadius:'40px',bgcolor:'black',color:'whitesmoke',borderBottomRightRadius:'0px',borderTopRightRadius:'0px',borderColor:'#666666'}} className='md:w-[300px] xl:ml-[-70px] lg:ml-[-30px] lg:w-[500px] w-[200px] h-[45px]' placeholder="Search…" />
<Button 
onClick={submitQuery} sx={{borderBottomLeftRadius:'0px',borderTopLeftRadius:'0px',borderBottomRightRadius:'40px',borderTopRightRadius:'40px',height:'45px',bgcolor:'#3b3a3a'}} variant='outlined' color='primary'>
  <Tooltip title="Search">
      <SearchIcon className=' text-slate-100'/>
  </Tooltip>
</Button>

</div>
         

          <div className=' flex gap-0.5 mt-[-5px]'>
{ currentUser && <div className=' text-2xl scale-125'>
              <CreatePostPopup handleOpen={handleOpen}/>
           
            </div>}
            
            <Auth/>
          </div>
          </div>
        </Toolbar>
      </AppBar>
              {/* for Creating the video */}
              <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className='md:w-[500px] lg:w-[600px] w-screen h-screen overflow-y-auto' sx={style}>
            <CreateVideo setOpen={setOpen}/>

          </Box>
        </Modal>
    </Box>
  );
}