import React, { useEffect, useState } from 'react'
import VideoCard from '../VideoCard';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserQuery, useGetVideosQuery } from '../../redux/api/api';
import { useParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import { Avatar, Modal,Box } from '@mui/material';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UpdateUser from './UpdateUser';
import UserSections from './UserSections';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'black',
    border: '2px solid #000',
    BoxShadow: 24,
    p: 4,
    color: 'white'
  };

export default function UserDetail() {
    const[userData,setUserData] = useState({userName:'',name:'',profile:'',background:''})
    const [open, setOpen] = useState(false);
    const baseUrl = 'http://localhost:5000'
    const {userId} = useParams()
    const currentUser = JSON.parse(localStorage.getItem('user'))
  const {data:videos,isFetching} = useGetVideosQuery()
  const {data:user} = useGetUserQuery(userId)
  const dispatch = useDispatch()
  const userVideos = videos?.filter((video)=>video?.userId ===userId)

  const handelSub = () => {
    const subcribe = async () => {
      await axios.put(`${baseUrl}/user/sub/${user?._id}`)
        .then(({ data }) => {

        })
    }
    subcribe()
  }

  const handleOpen = () => {
    setOpen(true)
    setUserData({id:`${user?._id}`,userName:`${user?.userName}`,name:`${user?.name}`,profile:`${user?.profile}`,background:`${user?.background}`})

  };
  const handleClose = () => setOpen(false);

    // If the user have already subcribed the channel
    const alreadySubed = (user?.subscribedUsers?.filter((channel) => channel === currentUser?._id))?.length
    console.log('sub value',alreadySubed)
console.log(videos)
  return (
    <div className=' flex'>
      <Sidebar/>
      
    <div style={{background:'black'}} className='gap-2 w-full px-2 pb-8 overflow-y-auto h-[calc(100vh-64px)] scroll-smooth '>

        {/* profile image and bg section */}
<div>
       {user?.background ==='' ?  <div className=' w-full h-[240px] bg-slate-300'>
    <img className='w-full h-full object-cover' src='https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2021/03/LinkedIn-Default-Background-2020-.jpg' alt="" />
        </div> :(
          <div className=' w-full h-[240px]'>
            <img className='w-full h-full object-cover' src={user?.background} alt="backgroundimage" />
            </div>
        )}
        {/* profile details */}
<div className='px-5 py-4 flex justify-between flex-wrap gap-5'>
    <div className=' flex gap-4'>
        <Avatar sx={{width:120,height:120,fontSize:'30px',bgcolor:'#ed5a39'}}  sizes='large' alt={user?.userName} src={user?.profile || user?.userName }/>
        <div className=' my-auto'>
            <p className=' text-slate-300 font-semibold text-4xl'>{user?.userName}</p>
            <div className=' flex gap-3'>
            <p className=' text-slate-400 font-semibold text-base'>@{user?.name}</p> 
            <p className=' text-slate-400 text-base'>{user?.subscribers} Subscribers</p>
            <p className=' text-slate-400 text-base'>{userVideos?.length} Videos</p>
            </div>
        </div>
        </div>
        {user?._id === currentUser?._id &&
                <button onClick={handleOpen} className={alreadySubed !== 1 ? ' hover:bg-red-600 min-w-[130px] px-5 h-[55px] my-auto text-base font-semibold outline-none border-none  bg-slate-50 rounded-[30px] hover:text-slate-100 duration-200 transition-all' : 'hidden'}>
                Customize Channel
                </button>}

                {user?._id !== currentUser?._id && alreadySubed === 0 &&
                <button onClick={handelSub} className=' hover:bg-red-600 w-[130px] text-base h-[55px] my-auto px-2 font-semibold outline-none border-none  bg-slate-50 rounded-[30px] hover:text-slate-100 duration-200 transition-all'>
                  Subcribe
                </button>}
              {alreadySubed >0 && user?._id !== currentUser?._id &&
                <button onClick={()=>{}} className=' bg-red-600 w-[140px] h-[55px] my-auto text-base font-semibold px-2 outline-none border-none  hover:bg-slate-50 rounded-[30px] text-slate-100 hover:text-slate-800 duration-200 transition-all' >
                  Subcribed
                  <CheckCircleIcon className=' ml-2 mt-[-5px]' />
                </button>
              }
 </div>
</div>

        


        {/* user video section */}
        {/* <p className=' my-2 text-2xl font-bold text-gray-200'>Videos From {user?.userName}</p>
   <div className=' animate-[slideup_0.8s] flex gap-2 flex-wrap xl:justify-start justify-center '>
      {!isFetching ?userVideos?.map((item,id)=>(
        <VideoCard item={item} key={id}/>
        
      )):(
        <Loader/>
      )}
      </div> */}

      {/* Different Sections */}
      <UserSections userId={userId}/>
      
    </div>

    {/* pop up for updating userData */}
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >

      <Box className='md:w-[500px] h-screen rounded-lg lg:w-[600px] w-screen overflow-y-auto'
        sx={style}
      >
<UpdateUser userData={userData} setOpen={setOpen} setUserData={setUserData}/>
        </Box>
        </Modal>
    </div>
    
  )
}
