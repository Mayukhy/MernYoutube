import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { useCreatePostMutation, useGetCommunityPolesQuery, useGetCommunityPostsQuery, useGetFilteredVideosQuery, useGetPlaylistQuery, useGetUserQuery, useGetVideosQuery, usePublishPostMutation } from '../../redux/api/api';
import Loader from '../loader/Loader';
import VideoCard from '../VideoCard';
import LibraryCard from '../LibraryCard';
import { Avatar, Tooltip,Button } from '@mui/material';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import PollIcon from '@mui/icons-material/Poll';
import { endLoading, setLoading } from '../../redux/slices/videoSlice';
import PoleCreation from './PoleCreation';
import axios from 'axios';
import Textarea from '@mui/joy/Textarea';
import { setTabValue } from '../../redux/slices/userSlice';
import ImgPost from './ImgPost';
import CommunityCard from '../CommunityCard';


export default function UserSections({userId}) {
  const baseUrl='http://localhost:5000'
  const [publishPost] = usePublishPostMutation()
  const {data:posts} = useGetCommunityPostsQuery()
  const {data:user} = useGetUserQuery(userId)
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const {data:poles} = useGetCommunityPolesQuery()
  const {isloading} = useSelector(state=>state.video)
  const {tabValue} = useSelector(state=>state.user)
  const [isfocused,setIsfocused] = useState(false)
  const [postId,setPostId] = useState(null)

  //userPosts
  const userPosts = posts?.filter((post)=>post?.userId === user?._id)

  //published userPosts 
  const PublishEdUserPosts = (userPosts?.filter((post)=>post?.isPublished === true))?.length

  const [postData,setPostData] = useState({title:'',userName:`${currentUser?.userName}`,profile:`${currentUser?.profile}`,isPublished:false})
  console.log("Post Data is",postData)
  const [poleData,setPoleData] = useState({poleName:'',communityPostId:''})
  const [textPole,setTextPole] = useState(false)
  const [imagePost,setImagePost] = useState(false)
  const [corfirmName,setConfirmName] = useState(false)
  const [imgPerc,setImgPerc] = useState(0)

  //Poles created by the user
  const userPole = poles?.filter((pole)=>pole?.communityPostId === postId)

  console.log('PostId is',postId)
  const [vidFilter,setVidFilter] = useState("Latest")
  const {data:playLists,isPlaylistFetching} = useGetPlaylistQuery()
  const {data:filteredvideos,isFetching} = useGetFilteredVideosQuery(vidFilter)
  const dispatch = useDispatch()
  //user  Videos
  const userPlaylist = playLists?.filter((list)=>list?.userId ===userId)
  const userFilterVideos = filteredvideos?.filter((video)=>video?.userId ===userId)
  
  //for Creation of post
  const CreatePost=(e)=>{
    e.preventDefault()
    if (!textPole) {
      console.log("Publised Data",postData)
        const creatingPost=async()=>{
         
          dispatch(setLoading())
          //creating and publishing The post
            await axios.post(`${baseUrl}/community/createPost`,postData)
            .then(({data})=>{
              dispatch(endLoading())
              setPostId(data?._id)
              setPostData({...postData,title:'',imageUrl:'',isPublished:false})
              setImgPerc(0)
            })  
          
        }
        creatingPost()
    }

    else{
      if (postData?.title !=="") {
        const publish =async()=>{
          await publishPost(postId)
          setPostId('')
          setPostData({...postData,title:'',imageUrl:'',isPublished:false})
          setConfirmName(false)
          setTextPole(false)
        }
        publish()
      }
   
    }

  }

  //Confirming the post name to add poles
  const confirmPostName=()=>{
    const confirm=async()=>{
      dispatch(setLoading())
      await axios.post(`${baseUrl}/community/createPost`,postData)
      .then(({data})=>{
        setPostId(data?._id)
      })
      dispatch(endLoading())
      setConfirmName(true)
      setPoleData({...poleData,communityPostId:`${postId}`})
    }
    confirm()
  }


  const handleChange = (event, newValue) => {
    dispatch(setTabValue(newValue));
  };
  const items =[
    "Home",
    "Videos",
    "Playlists",
    "Community",
    "About"
  ]

  const videofilter = [
    "Latest",
    "Popular",
    "Oldest"
  ]

  return (
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: '#595958',color: 'background.paper' }}>
        <Tabs
        variant='scrollable'
        scrollButtons
        allowScrollButtonsMobile
        value={tabValue} onChange={handleChange} >
            {items?.map((item)=>(
              <Tab sx={{color:'whitesmoke',fontSize:'16px'}} label={item} value={item} />
            ))}
            </Tabs>

        </Box>
                    {/* videos section */}
{tabValue ==="Videos"&&
<>
<div className=' mt-5 mb-[-10px] animate-[slideup_0.8s] flex gap-2 flex-wrap xl:justify-start justify-center '>
   {videofilter?.map((item)=>(
    <Button className='btnFilter' onClick={()=>setVidFilter(item)} sx={{bgcolor:vidFilter===item?"whitesmoke":"#696866",color:vidFilter===item?"black":"white"}} variant='contained' color='inherit'  >
      {item}
    </Button>
   ))}
       </div>
   <div className=' mt-4 animate-[slideup_0.8s] flex gap-2 flex-wrap xl:justify-start justify-center '>
   {!isFetching ?userFilterVideos?.map((item,id)=>(
     <VideoCard item={item} key={id}/>
     
   )):(
     <Loader/>
   )}
   </div>
   </>
}

{/* Playlist section */}

{tabValue ==="Playlists"&&
<>
<p className=' font-medium text-lg text-slate-100 ml-3 mt-4'>Created Playlists</p>
      <div className=' flex animate-[slideup_0.8s] overflow-x-auto w-full scroll-smooth'>
     
     <div className=' flex gap-1'>
      { !isFetching ?userPlaylist?.map((item,id)=>(
        <LibraryCard playlist={item} key={id}/>
        
      )):(
        <Loader/>
      )}
      </div>
      </div>
      </>
}

{/* community section */}
{tabValue ==="Community" && 
<>
{ user?._id === currentUser?._id &&
 <div className=' xl:w-[1000px] md:w-full border flex justify-between gap-10 flex-wrap  border-gray-600 px-7 py-5 rounded-xl  w-full my-5'>
    <div className='w-full transition-all duration-200'>
    <div className=' flex justify-between'>
      <div className=' flex gap-3 my-auto'>
      <Avatar sx={{width:'50px', height:'50px'}} alt={user?.userName} src={user?.profile || user?.userName}/>
      <p className=' text-white font-semibold text-lg my-auto'>{user?.userName}</p>
      </div>
      
      <p className=' text-slate-300 mt-2'>Visibility : Public</p>
    </div>

    {/* input field */}
    <div className=' flex justify-between flex-wrap'>
    <Textarea color='inharit' variant="soft" value={postData?.title} onChange={(e)=>{
      if (!textPole) {
        setPostData({...postData,title:e.target.value,isPublished:true})  
      }
      else
      setPostData({...postData,title:e.target.value})

      }
      } onFocus={()=>setIsfocused(true)} className={textPole?' border-none outline-none text-lg md:w-[77%] w-full':' border-none outline-none text-lg w-full'} style={{border:'none',boxShadow:'none',background:'transparent',margin:'20px 0px 10px -10px',color:'white'}} placeholder="Post an update to your fans" />

      {textPole && !corfirmName ? <Button size='small' onClick={confirmPostName} sx={{borderRadius:'28px',height:'48px',px:2.5}} variant="outlined" color="primary">
        Confirm post name
      </Button>:
      <>
{  textPole && <Button onClick={()=>{}} sx={{borderRadius:'28px',height:'48px',px:2.5}} variant="outlined" color="primary">
        Edit post name
      </Button>}
      </>
      }
      </div>
       

    {/* for image post    */}
    {imagePost && <ImgPost imgPerc={imgPerc} setImgPerc={setImgPerc} postData={postData} setPostData={setPostData} postId={postId} setPostId={setPostId}/>}
    
    {/* Creating poles */}
    {textPole && <PoleCreation userPole={userPole} poleData={poleData} setPoleData={setPoleData} postId={postId} setPostId={setPostId} textPole={textPole} setTextPole={setTextPole}/>}

  <div className=' flex justify-between'>
<div className=' flex gap-4 mt-3 ml-[-15px]'>
  <Tooltip onClick={()=>{
    setImagePost(!imagePost)
    setTextPole(false)
  }} className=' hover:bg-slate-800 py-2 px-3 rounded-3xl transition-all duration-200 cursor-pointer' title="Post Image">
  <p className=' text-slate-200 mt-[-3px]'><PhotoCameraBackIcon className=' mt-[-5px]'/> Image</p> 
  </Tooltip>
   
  <Tooltip onClick={()=>{
    setTextPole(!textPole)
    setImagePost(false)
    }} className=' hover:bg-slate-800 py-2 px-3 rounded-3xl transition-all duration-200 cursor-pointer' title="Create Pole">
  <p className=' text-slate-200 mt-[-3px]'><PollIcon className=' mt-[-5px]'/> Text Pole</p> 
  </Tooltip>
</div>

<div className=' flex gap-2 my-auto'>
<button onClick={()=>{
  setImagePost(false)
  setTextPole(false)
}} className=' outline-none border-none hover:bg-slate-700 py-2 px-5 rounded-3xl text-slate-100 h-[40px] transition-all duration-200 font-semibold'>Cancel</button>
{!textPole?<button onClick={CreatePost} variant='contained' disabled={(isfocused && postData?.title !=='')?false:true}  className={(isfocused && postData?.title !=='')?' outline-none font-semibold border-none bg-[#3f73bc] py-2 px-7 rounded-3xl text-slate-100 h-[40px] transition-all duration-200':' outline-none font-semibold border-none bg-[#3c3f42] py-2 px-7 rounded-3xl text-slate-100 h-[40px] transition-all duration-200'}>{isloading?<Loader/>:'Post'}</button>:
<button onClick={CreatePost} variant='contained' disabled={userPole?.length < 2 ?true:false}  className={userPole?.length >= 2?' outline-none font-semibold border-none bg-[#3f73bc] py-2 px-7 rounded-3xl text-slate-100 h-[40px] transition-all duration-200':' outline-none font-semibold border-none bg-[#3c3f42] py-2 px-7 rounded-3xl text-slate-100 h-[40px] transition-all duration-200'}>{isloading?<Loader/>:'Post'}</button>}
</div>
  </div>
  
  </div>
  </div>
  }

  <br />

  {/* all posts created by the user */}
  {userPosts?.length>0 && PublishEdUserPosts > 0  ?
<p className=' font-bold md:text-2xl text-xl text-slate-100'>Created Posts</p>:
<p className=' font-bold md:text-2xl text-xl text-slate-100'>No Created Posts Yet </p>

}
{userPosts?.map((item,id)=>(
        <CommunityCard post={item} key={id}/>
        
      ))}
  </>

 
}



    </Box>
  );
}