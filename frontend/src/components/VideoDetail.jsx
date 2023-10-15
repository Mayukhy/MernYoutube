import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Typography from '@mui/material/Typography';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { endLoading, endVideoLoading, setCurrentMappedVideoId, setCurrentPlaylistVideoId, setLoading, setPlayNextPlaylistvideo, setSearchterm, setSelectedPLaytlistVideos, setVideoLoading } from '../redux/slices/videoSlice'
import Loader from './loader/Loader';
import Button from '@mui/material/Button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Modal from '@mui/material/Modal';
import VideoUpdate from './VideoUpdate';
import { Alert, Box, IconButton, Tooltip} from '@mui/material';
import Comments from './Comments';
import { useAddLikesMutation, useAddViewMutation, useCreatePlaylistMutation, useGetPlaylistQuery, useGetPlaylistVideosQuery, useGetSearchedQuearyQuery, useGetSingleVideoQuery, useGetUserQuery, useGetUsersQuery, useGetVideosQuery, useGetsinglePlaylistQuery, useRemoveLikesMutation, useRemoveSubMutation, useUpdateSubMutation } from '../redux/api/api';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAlt from '@mui/icons-material/ThumbDownAlt';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SelectPlaylist from './SelectPlaylist';
import List from '@mui/joy/List';
import RadioGroup from '@mui/joy/RadioGroup';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Input from '@mui/material/Input';
import VideoDetailVideos from './VideoDetailVideos';
import { setNotification} from '../redux/slices/userSlice';
import ShareIcon from '@mui/icons-material/Share';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import UpnextPlaylistVideos from './UpnextPlaylistVideos';
import LoopIcon from '@mui/icons-material/Loop';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import RelatedVideoTab from './RelatedVideoTab';
import count from '../assets/image/Count.gif'
import VideoJS from './VideoJs';

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
const ariaLabel = { 'aria-label': 'description' };

export default function VideoDetail() {
  const { videoId } = useParams()

  //to get the map id of playlist videos 
  const [mapId,setMapId] = useState(0)

  const [addSubTotify,setAddsubNotify] = useState(false)
  const [addunSubTotify,setAddunsubNotify] = useState(false)

  const VideoRef = useRef()
  const subRef = useRef()
  const [id, setId] = useState(null)

  // to hide and show the fullplaylist
  const [showPlaylist,setShowPlaylist]  =useState(true)

  const baseUrl = 'http://localhost:5000'
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const [videoUrl,setVideoUrl] = useState(`http://localhost:5173/video/${videoId}`)
  const [coppy,setCoppy] = useState(false)
  const [selectCate,setSelectCate] = React.useState("All")
  const [updateSubscriber] = useUpdateSubMutation()
  const [removeSubcriber] = useRemoveSubMutation()
  const updatPlaylistVideo = useGetPlaylistVideosQuery(id)
  const [borderBottom, setBorderBottom] = useState(false)
  const [showbtn, setShowbtn] = useState(false)
  const [listData, setListData] = useState({ userId: currentUser?._id, userName: currentUser?.userName, playLlistName: '' })
  const [createPlaylist] = useCreatePlaylistMutation()
  const [addView] = useAddViewMutation()
  const navigate = useNavigate()
  const { isVideoLoading, isloading,playlistId,isPlaylistVideo,selectedPlaylistVideos,CurrentPlaylistVideoId,CurrentPlaylistVideoMapId} = useSelector(state => state.video)
  const [user,setUser] = useState(null)
  const [addLike] = useAddLikesMutation()
  const [removelike] = useRemoveLikesMutation()
  const dispatch = useDispatch()
  const [searchTerm,setSearchedTerm] = useState(null)
  const { data: video } = useGetSingleVideoQuery(videoId)
  const{data:VideoCreator} = useGetUserQuery(video?.userId)

          // for custom video player
          const videoJsOptions = {
            controls : true ,
            Sources : [{
              src:video?.videoUrl,
              type: 'video/mp4'
            }]
          }
          
  const {data:SearchedData} = useGetSearchedQuearyQuery(searchTerm)
  const [currentVidId, setCurrentVidId] = useState(null)
  const [relatedVideos, setRelatedVideos] = useState([])
  const [creator, setCreator] = useState(null)
  const [saved, setsaved] = useState(false)
  const [videoExsists,setVideoExsists] = useState(false)
  const [savedHide,setSavedHide] = useState(false)
  const [errorHide,setErrorHide] = useState(false)
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [isloopPlay,setIsloopPlay] = useState(false)
  const [openUpdate, setopenUpdate] = useState(false);
  const { data, isFetching } = useGetPlaylistQuery()
  const [showTimer,setShowTimer] = useState(false)

  console.log('Playlist videos aer these',selectedPlaylistVideos)

  //if user press on play all at his/her library
  const{data:Playlistvideos} = useGetPlaylistVideosQuery(playlistId)
  const list = useGetPlaylistQuery()
  const subedUser = useGetUsersQuery()
  const { data: allvideos, isFetching: isvideoFetching } = useGetVideosQuery()

  const userCreatedVideos = allvideos?.filter((vid)=>vid?.userId === VideoCreator?._id) 
  
  const [listVideoClicked,setListVideoClicked] = useState(false)
  //videos except the currentvideo
  const otherVideos= allvideos?.filter((video)=>video?._id !== videoId)
    //playlist of a specific user 
    //after clicking on the playlistname in the save video popup id will be come into picture
    const {data:singleusersPlaylist} = useGetsinglePlaylistQuery(id)

    //to get the playlist detail immediately
    const {data:singleusersPlaylistFast} = useGetsinglePlaylistQuery(playlistId)


    console.log("PlaylistData",singleusersPlaylist)
  
  //only loggedin users playlist
  const userLibrary = data?.filter((video) => video?.userId === currentUser?._id)



//To get related Videos
  useEffect(() => {
    const fetchVideo = async () => {
      dispatch(setVideoLoading())
      await axios.get(`${baseUrl}/vid/related/${videoId}`)
        .then(({ data }) => {
          console.log('Video Detail', data)
          dispatch(endVideoLoading())
          setRelatedVideos(data)
        })
    }
    fetchVideo()
  }, [videoId])

  
  //to get the video creators credentials
  useEffect(() => {
    const fetchCreator = async () => {
      dispatch(setLoading())
      await axios.get(`${baseUrl}/user/${video?.userId}`)
        .then(({ data }) => {
          console.log('Video Detail', data)
          dispatch(endLoading())
          setCreator(data)
        })
    }
    fetchCreator()
  }, [video?.userId])

  //to get the loggedin users credentials
  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading())
      await axios.get(`${baseUrl}/user/${currentUser?._id}`)
        .then(({ data }) => {
          console.log('Video Detail', data)
          dispatch(endLoading())
          setUser(data)
        })
    }
    fetchUser()
  }, [currentUser?._id])

  useEffect(() => {
    const addview = async () => {
      await addView(videoId)
    }
    addview()
  }, [videoId]) 

// for subscribing an user
  const handelSub = async() => {
 setAddsubNotify(true)
 await updateSubscriber(video?.userId)
   subedUser.refetch()
   window.location.reload()
  }
 
  // for unsubscribing an user
  const handleunsub = async() => {
    setAddunsubNotify(true)
    await removeSubcriber(video?.userId)
    setOpen(false)
    setTimeout(() => {
      window.location.reload() 
    },100);
    subedUser.refetch()
  }
  
  //liking a video
  const addingLike = async () => {
    await addLike(videoId)

  }
  //disliking a video
  const removingLike = async () => {
    await removelike(videoId)

  }

  //storing the mapId to redux Store

  if (CurrentPlaylistVideoMapId === 0) {
    dispatch(setCurrentMappedVideoId(0))  
  }



  // playlist creation
  const handelCreatePlaylist = async (e) => {
    e.preventDefault()
    dispatch(setLoading())
    await createPlaylist(listData)
    dispatch(endLoading())
    setListData({ userId: currentUser?._id, userName: currentUser?.userName, playLlistName: '' })
    setShowbtn(false)
  }
  // If the user have already subcribed the channel
  const alreadySubed = (user?.subscribedUsers?.filter((channel) => channel === creator?._id))?.length

  // If user have already liked the video
  const alreadyLiked = (video?.likes?.filter((like) => like === user?._id))?.length

  // If user have already disliked the video
  const alreadydisLiked = (video?.dislikes?.filter((dislike) => dislike === user?._id))?.length


  useEffect(()=>{
    VideoRef?.current?.scrollIntoView({ behavior: 'smooth' })
  },[])

  useEffect(()=>{
    subRef?.current?.scrollIntoView({ behavior: 'smooth' })
  },[VideoCreator?.subscribers])

  console.log('SUBED', alreadySubed)

  const handleOpen = () => {
    setOpen(true)

  };
  const handleClose = () => setOpen(false);

  const handelOpenUp = () => {
    setopenUpdate(true)
  }

  const handelCloseUp = () => {
    setopenUpdate(false)
  }

  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  if (isVideoLoading) {
    return <Loader />
  }

  //playlist video adding
  const handleUpdate = () => {
    const updateList = async () => {
      dispatch(setLoading())
      await axios.put(`${baseUrl}/save/updatelist/${id}/${currentVidId}`)
        .then(({ data }) => {
          dispatch(endLoading())
          updatPlaylistVideo.refetch()
          if (currentUser?._id ===singleusersPlaylist?.userId) {
            dispatch(setNotification())
          }
          setsaved(true)
    setOpen1(false)
        })
    }
    updateList()
    list.refetch()

  }
  //playlist video removing
  const handleremoveVid = () => {
    const delvideoList = async () => {
      dispatch(setLoading())
      await axios.put(`${baseUrl}/save/dellistvideo/${id}/${currentVidId}`)
        .then(({ data }) => {
          dispatch(endLoading())
          updatPlaylistVideo.refetch()
        })
    }
    delvideoList()
    list.refetch()
  }


  if (savedHide) {
    setTimeout(() => {
      setSavedHide(false)
    }, 4000);
  }

  if (errorHide) {
    setTimeout(() => {
      setErrorHide(false)
    }, 4000);
  }

  if (addSubTotify) {
    setTimeout(() => {
     setAddsubNotify(false)   
    }, 1500);
 }

 if (addunSubTotify) {
  setTimeout(() => {  
    setAddunsubNotify(false)
  }, 1500);
}

  console.log('Video Map Id',CurrentPlaylistVideoMapId)
  console.log("PlaylistId is",playlistId)
  console.log(isPlaylistVideo)

  return (
    <div style={{background:'black'}} className='flex xl:px-8 px-5 lg:flex-nowrap gap-10 flex-wrap  mx-auto justify-between w-full pb-8 overflow-y-auto h-[calc(100vh-64px)] overflow-x-hidden scroll-smooth '>
    {addSubTotify &&
<div style={{zIndex:99}} className=' fixed bottom-3 left-0 xl:px-8 px-5  animate-[slideleft_0.7s]'>
<Alert severity="success">Subscribtion is added</Alert>
</div>}

{addunSubTotify &&
<div style={{zIndex:99}} className=' fixed bottom-3 left-0 xl:px-8 px-5  animate-[slideleft_0.7s]'>
<Alert severity='warning'>Subscribtion is removed</Alert>
</div>}
      {/* video section */}
      <div className='2xl:mx-0 mx-auto flex flex-col my-5 relative'>

        {/* the Video */}
        <video  onEnded={()=>{
          if (playlistId === null && !isPlaylistVideo ) {
            setShowTimer(true)
            setTimeout(() => {
              navigate(`/video/${otherVideos?otherVideos[0]?._id:relatedVideos[0]?._id}`)   
              setShowTimer(false)
            }, 4500);
           
          }
          else{
            if (!listVideoClicked) {
              dispatch(setPlayNextPlaylistvideo(CurrentPlaylistVideoMapId))
              setTimeout(() => {
                navigate(`/video/${CurrentPlaylistVideoId}`) 
              }, 1000); 
              
            }
            
          }
          }} ref={VideoRef} controls autoPlay loop={isloopPlay?true:false} className=' videoShadow w-[1000px] h-auto shadow-white rounded-xl mb-1' src={video?.videoUrl}
          >

          </video>

          {/* for showing the timer */}
{ showTimer && <div className=' absolute right-0 top-0 m-3'>
            <div style={{background:'linear-gradient(180deg, rgba(38,48,52,0.644782913165266) 0%, rgba(52,50,60,0.7148109243697479) 100%)'}} className=' backdrop-blur-md flex gap-2 text-slate-200 px-4 py-2 animate-[slideright_0.5s] hover:shadow-sm hover:shadow-blue-300 transition-all duration-200 rounded-lg cursor-pointer text-base'>
              <p className=' mt-1'>Playing Next Video in</p>
              <img className=' w-[35px] h-[35px] my-auto rounded-full' src={count} alt="" />
              <p className=' mt-1'>Secs</p>
            </div>
          </div>}


        <p className=' font-semibold md:text-2xl text-xl text-slate-100 lg:hidden xl:flex hidden mt-2'>{video?.title.length > 190 ? video?.title.slice(0, 190) + '...' : video?.title}</p>
        <p className=' font-semibold md:text-2xl text-xl text-slate-100 lg:hidden md:hidden flex mt-2'>{video?.title.length > 80 ? video?.title.slice(0, 80) + '...' : video?.title}</p>
        <p className=' font-semibold md:text-2xl text-xl text-slate-100 md:hidden lg:flex xl:hidden hidden mt-2'>{video?.title.length > 95 ? video?.title.slice(0, 95) + '...' : video?.title}</p>
        <p className=' font-semibold md:text-2xl text-xl text-slate-100 md:flex lg:hidden xl:hidden hidden mt-2'>{video?.title.length > 150 ? video?.title.slice(0, 150) + '...' : video?.title}</p>
        <div className=' flex gap-5 mt-4 justify-between flex-wrap'>
          <div className=' flex gap-2 flex-wrap'>
            <Avatar onClick={() => navigate(`/user/${video?.userId}`)}
              alt={creator?.userName}
              src={creator?.profile}
              sx={{ width: 46, height: 46 }}
            />
            <div className=' flex' >
              <div className=' mt-[-3px]'>
                <p className=' text-xl font-medium text-slate-200'>{creator?.userName}</p>
                <p className=' text-base text-slate-400'>{creator?.subscribers || 0} {creator?.subscribers > 1 ? 'subscribers' : 'subscriber'}</p>
              </div>
            </div>
            <div className=' ml-3 flex'>
              {video?.userId !== currentUser?._id && alreadySubed === 0 &&
                <button ref={subRef} onClick={handelSub} className=' hover:bg-red-600 w-[130px] text-base px-2 font-semibold outline-none border-none  bg-slate-50 rounded-[30px] hover:text-slate-100 duration-200 transition-all'>
                  Subcribe
                </button>}
              {alreadySubed > 0 && video?.userId !== currentUser?._id &&
                <button ref={subRef} onClick={handleOpen} className=' bg-red-600 w-[140px] text-base font-semibold px-2 outline-none border-none  hover:bg-slate-50 rounded-[30px] text-slate-100 hover:text-slate-800 duration-200 transition-all' >
                  Subscribed
                  <CheckCircleIcon className=' ml-2 mt-[-5px]' />
                </button>
              }

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Unsubscribe
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure to unsubscribe this channel ?
                  </Typography>
                  <div className='flex gap-5 justify-end mt-3 '>
                    <Button onClick={handleClose} variant='text' color='info' size='small'>
                      Cancel
                    </Button>
                    <Button onClick={handleunsub} variant="contained" color="error" size='small'>
                      Unsubscribe
                    </Button>
                  </div>
                </Box>
              </Modal>
              {video?.userId === currentUser?._id &&
                <button onClick={handelOpenUp} className={alreadySubed !== 1 ? ' hover:bg-red-600 w-[130px] text-base px-2 font-semibold outline-none border-none  bg-slate-50 rounded-[30px] hover:text-slate-100 duration-200 transition-all' : 'hidden'}>
                  Edit Video
                </button>}
            </div>
          </div>
          <div className=' flex gap-2 flex-wrap'>
            <div style={{background:'linear-gradient(180deg, rgba(47,47,48,0.756827731092437) 0%, rgba(27,27,28,0.6980042016806722) 100%)'}} className=' hoverBg flex px-2 py-1 rounded-[30px] justify-between min-w-[130px]'>
              {/* Like & Dislike */}
              <div className=' cursor-pointer flex gap-1'>
                <Tooltip title="Like">
                  <IconButton aria-label="" onClick={addingLike}>
                    {alreadyLiked !== 1 ? <ThumbUpOffAltIcon className=' text-slate-100' /> : <ThumbUpAltIcon className=' text-slate-100' />}
                  </IconButton>
                </Tooltip>
                <p className=' pr-2 mt-[8px] text-slate-300'>{video?.likes?.length} Likes</p>
              </div>
              <div className='w-[1px] h-3/4 my-auto bg-slate-500'></div>
              <div className=' flex gap-1 cursor-pointer'>
                <Tooltip title="Dislike">
                  <IconButton aria-label="" onClick={removingLike}>
                    {alreadydisLiked !== 1 ? <ThumbDownOffAltIcon className=' text-slate-100' /> : <ThumbDownAlt className=' text-slate-100' />}
                  </IconButton>
                </Tooltip>
                <p className=' pr-2 mt-[8px] text-slate-300'>{video?.dislikes?.length} Dislikes</p>
              </div>
            </div>

            {/* save video */}
            <div style={{background:'linear-gradient(180deg, rgba(47,47,48,0.756827731092437) 0%, rgba(27,27,28,0.6980042016806722) 100%)'}} className=' hoverBg pl-2 pr-4 py-1 flex gap-1 rounded-[30px] text-slate-300'>

              <div onClick={() => { setOpen1(true) }} className=' flex gap-1'>
                <Tooltip title="Save">
                  <IconButton aria-label="">
                    <LibraryAddIcon className=' text-slate-100' />
                  </IconButton>

                </Tooltip>
                <p className=' mt-[5.5px] text-lg font-semibold cursor-pointer'>Save</p>
              </div>
            </div>

            {/* Share Video */}
            <div style={{background:'linear-gradient(180deg, rgba(47,47,48,0.756827731092437) 0%, rgba(27,27,28,0.6980042016806722) 100%)'}} className=' hoverBg pl-2 pr-4 py-1 flex gap-1 rounded-[30px] text-slate-300'>

<div onClick={() => { setOpen2(true) }} className=' flex gap-1'>
  <Tooltip title="Save">
    <IconButton aria-label="">
      <ShareIcon className=' text-slate-100' />
    </IconButton>

  </Tooltip>
  <p className=' mt-[5.5px] text-lg font-semibold cursor-pointer'>Save</p>
</div>
           </div>


          </div>
        </div>

        {/* for updating the video */}
        <Modal
          open={openUpdate}
          onClose={handelCloseUp}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className='md:w-[500px] lg:w-[600px] w-screen overflow-y-auto' sx={style}>
            <VideoUpdate setopenUpdate={setopenUpdate} allvideos={allvideos} videoId={videoId} />

          </Box>
        </Modal>

        {/* for saving the video */}
        <Modal
          keepMounted
          open={open1}
          onClose={handleClose1}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style} className=' md:w-[400px] lg:w-[450px] w-screen max-h-[500px] rounded-xl overflow-y-auto'>
            <div className=' animate-[slideup_0.8s]'>

              <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                Save Video
              </Typography>

              {/* Buttonnn */}
              
              {id !== null && currentVidId !== null && !saved && !videoExsists &&<div style={{zIndex:99}} className=' absolute gap-1 mt-7 right-0 top-0 mr-8'>
              <Tooltip title="Save video">
                <Button onClick={handleUpdate} variant='contained' sx={{ color: 'whitesmoke', borderRadius: '20px', px: 2, bgcolor: 'GrayText' }} color='primary'>
                  {isloading ? <Loader /> : 'Save'}
                </Button>
                </Tooltip>
              </div>}  
              

              <RadioGroup aria-label="Your plan" name="people" defaultValue="Individual">
                <List
                  sx={{
                    minWidth: 240,
                    '--List-gap': '0.5rem',
                    '--ListItem-paddingY': '1rem',
                    '--ListItem-radius': '8px',
                    '--ListItemDecorator-size': '32px',
                  }}
                >
                  {userLibrary?.map((item, index) => (
                    <SelectPlaylist setErrorHide={setErrorHide} setSavedHide={setSavedHide} videoExists={videoExsists} setVideoExsists={setVideoExsists} setsaved={setsaved} handleremoveVid={handleremoveVid} setId={setId} setCurrentVidId={setCurrentVidId} Id={index} videoId={videoId} playlist={item} />
                  ))}
                </List>
              </RadioGroup>
              <div className=' flex gap-4 my-3'>
                <PlaylistAddIcon className=' scale-150 mt-1' />
                <div className=' mt-[-1px] w-[100%]'>
                  <Input onFocus={() => {
                    setShowbtn(true)
                    setBorderBottom(true)
                  }}
                    onBlur={() => setBorderBottom(false)}
                    value={listData?.playLlistName}
                    onChange={(e) => {
                      setListData({ ...listData, playLlistName: e.target.value })
                    }}
                    sx={{
                      width: '100%', color: '#b2b8b4', borderBottom: !borderBottom ? 'solid 2px #a7a8a7' : ''
                    }} placeholder="New Playlist" inputProps={ariaLabel} />
                  {showbtn && <div className=' flex flex-row-reverse gap-1 mt-2'>
                    <Button onClick={handelCreatePlaylist} variant='contained' sx={{ color: 'whitesmoke', borderRadius: '20px', px: 2, bgcolor: 'GrayText' }} color='primary'>
                      {isloading ? <Loader /> : 'Create'}
                    </Button>
                    <Button className='cancelhover' onClick={() => setShowbtn(false)} variant="text" sx={{ color: 'whitesmoke', borderRadius: '20px', px: 2 }} color='inherit'>
                      Cancel
                    </Button>
                  </div>}
                </div>
              </div>
            </div>

          </Box>
        </Modal>

                {/* for Sharing the video */}
                <Modal
          keepMounted
          open={open2}
          onClose={handleClose2}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style} className=' md:w-[400px] lg:w-[450px] w-screen max-h-[500px] rounded-xl overflow-y-auto'>
            <div className=' animate-[slideup_0.8s]'>

              <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                Share Video
              </Typography>
                <div className=' flex gap-1 w-full my-2'>
                <Input className=' w-full rounded-l-3xl py-1 px-3' sx={{color:'whitesmoke',bgcolor:'#363636'}}
                disableUnderline
                value={videoUrl}
                onChange={({target:{value}})=>setVideoUrl(value)} color='primary' inputProps={ariaLabel} />
                
                <CopyToClipboard text={videoUrl}
                onCopy={()=>setCoppy(true)}
                >
{   !coppy  ?<Button  size='small' className=' text-xs' sx={{borderRadius:'0px 30px 30px 0px',px:3}} variant="outlined" color="primary">
                    Copy
                  </Button>:
                <Button  size='small' className=' text-xs' sx={{borderRadius:'0px 30px 30px 0px',px:3}} variant="outlined" color="primary">
                Coppied
              </Button>  
                  }
                
                </CopyToClipboard>

                </div>

</div>

          </Box>
        </Modal>
        <div style={{background:'linear-gradient(180deg, rgba(47,47,48,0.756827731092437) 0%, rgba(27,27,28,0.6980042016806722) 100%)'}} className=' hoverBg py-5 px-5 flex-col mt-5 rounded-lg'>
          <div className=' flex gap-2 flex-wrap'>
            <p className=' font-medium text-slate-200' >{video?.views?.length > 0 ? video?.views?.length + ' Views' : "0 View"}</p>
            <p className=' font-medium text-slate-200' >• {moment(video?.createdAt).fromNow()}</p>
            <div className=' flex gap-2'>{video?.tags.map((tag, id) => (
              <p key={id} className=' text-slate-400'>#{tag}</p>
            ))}</div>
          </div>
          <p className=' text-slate-300 mt-2'>{video?.desc}</p>
        </div>
        <Comments video={video} currentId={videoId} />

        <br />
        <br />
      </div>


      <div className=' mx-auto w-full lg:w-auto'>

        {/* Video Tabs */}
        <div className='animate-[slideleft_0.2s]  rounded-xl xl:w-[500px] lg:w-[400px] w-[100%] mt-4 relative'>
        <RelatedVideoTab setSearchTerm={setSearchedTerm} videoId={videoId} selectCate={selectCate} setSelectCate={setSelectCate} relatedVideos={relatedVideos}/>
        </div>
        
       {/* UpNext Playlist Videos */}
        {(playlistId && Playlistvideos?.length > 0  && isPlaylistVideo && showPlaylist) ?

(        <div className='border animate-[slidedown_0.2s] border-[#666666] rounded-xl xl:w-[500px] lg:w-[400px] w-[100%] mt-6 relative'>

<div className=' hover:bg-slate-600 transition-all duration-200 rounded-full absolute right-0 top-0 m-4 animate-[spin_0.8s]'>
          <Tooltip title="Cancel">
<IconButton aria-label="" onClick={()=>{
  setShowPlaylist(false)

}}>
  <CloseIcon className=' text-slate-300'/>
</IconButton>  
          </Tooltip>

         </div>
        <div className='bg-[#202121] pt-3 rounded-t-xl px-3'>
        <div className=' flex gap-2'>
          <p className=' text-2xl font-semibold text-gray-200 mt-3 pl-3'>{singleusersPlaylistFast?.playLlistName}</p>
          <p className=' text-sm text-[#a0a1a4] mt-[18.7px]'>{currentUser?.userName} &nbsp;-</p>
          <p className=' text-sm  mt-[18.7px] text-[#a0a1a4]'>
         {(Playlistvideos?.length < CurrentPlaylistVideoMapId) ? 1:CurrentPlaylistVideoMapId} / {Playlistvideos?.length}
          </p>
        </div>
        <div className=' flex gap-1 text-xl font-semibold pl-3 py-2'>

          <div className=' hover:bg-slate-600 transition-all duration-200 rounded-full'>
          <Tooltip title="Play All">
          <IconButton aria-label="" onClick={()=>{
            setListVideoClicked(false)
            setIsloopPlay(false)
            dispatch(setCurrentMappedVideoId(0))
            dispatch(setPlayNextPlaylistvideo(0))
            navigate(`/video/${Playlistvideos[0]?._id}`)
            }}>
            <PlaylistPlayIcon className='text-gray-200 animate-[spin_1s]'/>
          </IconButton>  
          </Tooltip>
          </div>
          <div className=' hover:bg-slate-600 transition-all duration-200 rounded-full'>
          <Tooltip title="Play in Loop">
          <IconButton aria-label="" onClick={()=>{
           setIsloopPlay(true)

            }}>
            <LoopIcon className='text-gray-200 animate-[spin_1s]'/>
          </IconButton>  
          </Tooltip>
          </div>

        </div>

        </div>

<div className=' relative max-h-[450px] overflow-y-auto scroll-smooth'>
{        Playlistvideos?.map((video,idx)=>(
          <UpnextPlaylistVideos setListVideoClicked={setListVideoClicked} setMapId={setMapId} CurrentPlaylistVideoId={CurrentPlaylistVideoId} selectedPlaylistVideos={selectedPlaylistVideos} idx={idx} id={id} video={video} videoId={videoId}/>
        ))}
        <br />
        </div>
        </div>)
        :
(        
<>
{ playlistId !== null && isPlaylistVideo &&
<div className='border border-[#595959] animate-[slideup_0.2s] rounded-xl xl:w-[500px] lg:w-[400px] w-[100%] mt-4 relative'>
<div className=' hover:bg-slate-600 transition-all duration-200 rounded-full absolute right-0 top-0 m-4 animate-[spin_0.8s]'>
          <Tooltip title="Show Playlist">
<IconButton aria-label="" onClick={()=>setShowPlaylist(true)}>
  <ExpandMoreIcon className=' text-slate-300'/>
</IconButton>  
          </Tooltip>
         </div>
        <div className='bg-[#202121] hover:bg-[#18161a] transition-all duration-200 pt-3 rounded-xl px-3'>
        <div className=' flex gap-2'>
          <p className=' text-2xl font-semibold text-gray-200 mt-3 pl-3'>{singleusersPlaylistFast?.playLlistName}</p>
          <p className=' text-sm text-[#a0a1a4] mt-[18.7px]'>{currentUser?.userName} &nbsp;-</p>
          <p className=' text-sm  mt-[18.7px] text-[#a0a1a4]'>
         {Playlistvideos?.length < CurrentPlaylistVideoMapId ?1:CurrentPlaylistVideoMapId} / {Playlistvideos?.length}
          </p>
        </div>
        <div className=' flex gap-1 text-xl font-semibold pl-3 py-2'>
        <div className=' hover:bg-slate-600 transition-all duration-200 rounded-full'>
          <Tooltip title="Play in Loop">
          <IconButton aria-label="" onClick={()=>{}}>
            <LoopIcon className='text-gray-200 animate-[spin_1s]'/>
          </IconButton>  
          </Tooltip>
          </div>

          <div className=' hover:bg-slate-600 transition-all duration-200 rounded-full'>
          <Tooltip title="Shuffle">
            <IconButton aria-label="" onClick={()=>{}}>
              <ShuffleIcon className='text-gray-200 animate-[spin_1s]'/>
            </IconButton>
          </Tooltip>
          </div>

        </div>

        </div>

        </div>}
</>)
        
        }


        {/* recomended & other video section */}
        <div className='animate-[slideup_0.2s] rounded-xl xl:w-[500px] lg:w-[400px] w-[100%] mt-4 relative'>
        {relatedVideos.length > 1  ?

          (

            <>
{ selectCate==="All" && <div className=' w-full'>
              <p className=' text-2xl font-semibold text-gray-200 mt-4 mb-[-14px]'>Related Videos</p>
              {relatedVideos?.map((video, id) => (
             <VideoDetailVideos id={id} video={video} videoId={videoId}/>
              ))}
              <br />
              </div>}
            </>
          )
          : (
            <>
           {selectCate==="All" && <div>
              <p className=' text-2xl font-semibold text-gray-200 mt-3 mb-[-14px]'>Other Videos</p>
              {otherVideos?.map((video, id) => (
                <VideoDetailVideos id={id} video={video} videoId={videoId}/>
              ))}
              <br />
              </div>}
            </>
          )

        }
        </div>
        
        {/* Selacted Category Wise */}
        <div className='animate-[slideup_0.2s] rounded-xl xl:w-[500px] lg:w-[400px] w-[100%] mt-4 relative'>
          {searchTerm && searchTerm !=="All" &&
          <div>
{SearchedData?.map((video,id)=>(
  <VideoDetailVideos id={id} video={video} videoId={videoId}/>
))}
          </div>
          }

{searchTerm ===`More From ${VideoCreator?.userName}` &&
          <div>
{userCreatedVideos?.map((video,id)=>(
  <VideoDetailVideos id={id} video={video} videoId={videoId}/>
))}
          </div>
          }
        </div>
      </div>
    </div>
  )
}











































































