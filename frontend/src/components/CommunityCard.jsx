
import React, { useEffect, useState } from 'react'
import { useGetComentsQuery, useGetCommunityPolesQuery, useGetUserQuery, useGetUsersQuery, useRemoveSubMutation, useUpdateSubMutation} from '../redux/api/api'
import RadioGroup from '@mui/joy/RadioGroup';
import List from '@mui/joy/List';
import TextPole from './TextPole';
import Comments from './Comments';
import CommentIcon from '@mui/icons-material/Comment';
import { Avatar, IconButton,Modal,Typography,Box,Button} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { endLoading, setLoading } from '../redux/slices/videoSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Loader from './loader/Loader';

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


export default function CommunityCard({post}) {
    const dispatch = useDispatch()
    const baseUrl = 'http://localhost:5000'
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const {data:poles} = useGetCommunityPolesQuery()
    const {isloading} = useSelector(state=>state.video)
    const {data:Allcomments}= useGetComentsQuery(post?._id)
    const [commentToggle,setCommentToggle] = useState(false)
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [image, setImage] = useState("false");
    const [user,setUser] = useState(null)
    const [creator,setCreator] = useState(null)
    const [updateSubscriber] = useUpdateSubMutation()
    const [removeSubcriber] = useRemoveSubMutation()
    const subedUser = useGetUserQuery()

  //to get the post creators credentials
  useEffect(() => {
    const fetchCreator = async () => {
      dispatch(setLoading())
      await axios.get(`${baseUrl}/user/${post?.userId}`)
        .then(({ data }) => {
          dispatch(endLoading())
          setCreator(data)
        })
    }
    fetchCreator()
  }, [post?.userId])

  //to get the loggedin users credentials
  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading())
      await axios.get(`${baseUrl}/user/${currentUser?._id}`)
        .then(({ data }) => {
          dispatch(endLoading())
          setUser(data)
        })
    }
    fetchUser()
  }, [currentUser?._id])
  
  //for Show image popup
    const handleClose = () => {
      setOpen(false);
    };

    // for unsubscrib popup
    const handleOpen1 = () => {
      setOpen1(true)
  
    };
    const handleClose1 = () => setOpen1(false);

  
    const handleImage = (value) => {
      setImage(value);
      setOpen(true);
      console.log(image);
    };

    // for subscribing an user
  const handelSub =() => {
    dispatch(setLoading())
    const subPost=async()=>{
      await updateSubscriber(post?.userId)
      dispatch(endLoading())
    }
    subPost()
    subedUser.refetch()
      
     }
    
     // for unsubscribing an user
     const handleunsub =() => {
      dispatch(setLoading())
      const unSub=async()=>{ 
       await removeSubcriber(post?.userId)
       dispatch(endLoading())
       setOpen1(false)
      }
      unSub()
      subedUser.refetch()
     }
  

    //only comments of single post 
    const postComments = Allcomments?.map((comment)=>comment?.videoId === post?._id)
    
    //only user created poles
    const postPoles = poles?.filter((pole) =>pole?.communityPostId === post?._id)

      // If the user have already subcribed the channel    
  const alreadySubed = (user?.subscribedUsers?.filter((channel) => channel === creator?._id))?.length


  return (
    <>
{ post?.isPublished && <div className={!commentToggle?' xl:w-[700px] transition-all duration-200 hover:bg-[#141715] lg:w-[600px] border flex justify-between gap-10 flex-wrap  border-[#818182] p-7 rounded-xl md:w-[500px] w-full my-5 min-h-[300px]':' xl:w-[1000px] transition-all duration-200 hover:bg-[#0e0c0f] lg:w-[600px] border flex justify-between gap-10 flex-wrap  border-[#818182] p-7 rounded-xl md:w-[500px] w-full my-5 min-h-[300px]'}>
      <div className={commentToggle?' md:w-full xl:w-[500px] w-full transition-all duration-200':'w-full transition-all duration-200'}>
      <div className=' flex justify-between'>
        <div className=' flex gap-3'>
        <Avatar sx={{width:'70px', height:'70px'}} alt={post?.userName} src={post?.profile || post?.userName}/>
        <p className=' text-slate-300 font-semibold text-2xl mt-3'>{post?.userName}</p>
        </div>

        {post?.userId !== currentUser?._id &&
         alreadySubed === 0 &&
                <>
                {!isloading?
                <button onClick={handelSub} className=' hover:bg-red-600 h-[50px] px-7 text-base font-semibold outline-none border-none  bg-slate-50 rounded-[30px] hover:text-slate-100 duration-200 transition-all'>
                  Subscribe
                </button>:
                <Loader/>
                }
                </>
                
                }
              {alreadySubed ===1 && post?.userId !== currentUser?._id &&

                <>
                { !isloading ?
                  <button onClick={handleOpen1} className=' bg-red-600 h-[50px] px-5 text-base font-semibold outline-none border-none  hover:bg-slate-50 rounded-[30px] text-slate-100 hover:text-slate-800 duration-200 transition-all' >
                  Subscribed
                  <CheckCircleIcon className=' ml-2 mt-[-5px]' />
                </button>:
                <Loader/>
                }
                </>

              }

 {post?.userId === currentUser?._id &&
 <button onClick={()=>{}} className=' hover:bg-red-600  text-base px-8 font-semibold outline-none border-none  bg-slate-50 rounded-[30px] hover:text-slate-100 duration-200 transition-all h-[50px]'>
 Edit Post
</button>
 }               
      </div>
      <p className=' font-semibold text-xl text-white my-4'>{post?.title}</p>

      <img onClick={handleImage} className=' cursor-pointer rounded-lg w-full max-h-[480px] object-cover ' src={post?.imageUrl} alt="" />


 {/* model to unsubscribe an user  */}

 <Modal
                open={open1}
                onClose={handleClose1}
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
                    <Button onClick={handleClose1} variant='text' color='info' size='small'>
                      Cancel
                    </Button>
                    <Button onClick={handleunsub} variant="contained" color="error" size='small'>
                      Unsubscribe
                    </Button>
                  </div>
                </Box>
              </Modal>


      {/* model to see the image perfectly */}
      <Modal className=' shadow-lg animate-[slideup_0.4s]'
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
       sx={{display:'flex', justifyContent:'center',alignItems:'center',border:'none',width:'100%',outline:'none'}}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500
        }}
      >

          <img className=' rounded-xl'
            src={post?.imageUrl}
            alt={post?.userName}
            style={{ maxHeight: "90%", maxWidth: "95%" }}
          />
      </Modal>



      <RadioGroup aria-label="Your plan" name="people" defaultValue="Individual">
      
      <List
        sx={{
          minWidth: 240,
          '--List-gap': '1rem',
          '--ListItem-paddingY': '2rem',
          '--ListItem-radius': '8px',
          '--ListItemDecorator-size': '32px',
        }}
      >
        {postPoles?.map((pole)=>(
          <TextPole postPoles={postPoles} pole={pole}/>
        ))}
            </List>
    </RadioGroup>
    <div className=' flex gap-1'>
    <div className='hover:bg-slate-800 w-[50px] ml-[-10px] transition-all duration-200 h-[50px] mt-2 rounded-full flex justify-center items-center'>
      <IconButton aria-label="" onClick={()=>setCommentToggle(!commentToggle)}>
      <CommentIcon  className=' text-slate-100 scale-125'/> 
      </IconButton>
    </div>
    <p className=' text-slate-200 font-semibold mt-5'>
    {postComments?.length} Comments
    </p>
    </div>
    
    </div>
{ commentToggle && <div className=' bg-[#1f1d21] max-h-[700px] overflow-y-auto  md:w-full xl:w-[400px] w-full px-6 rounded-xl'>
    <Comments video={post} currentId={post?._id}/>
    </div>}
    </div>}
    </>
  )
}
