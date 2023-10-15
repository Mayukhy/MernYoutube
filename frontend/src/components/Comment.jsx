import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { endLoading,setLoading } from '../redux/slices/videoSlice';
import Loader from './loader/Loader';
import { useGetComentsQuery,useCreateCommentMutation } from '../redux/api/api';

const ariaLabel = { 'aria-label': 'description' };
export default function Comment({comment,video,currentId,data,user}) {
  const [showbtn,setShowbtn] = useState(false)
  const [showReply,setShowreply] = useState(false)
  const [createComment] = useCreateCommentMutation()
  const [showReplycomment,setShowreplycomment] = useState(false)
  const [isempty,setIsempty] = useState(false)
  const {isloading} = useSelector(state=>state.video)
  const [borderBottom,setBorderBottom] = useState(false)
  const currentUser = JSON.parse(localStorage.getItem('user'))
    const [msgcontent,setMsgcontent] = useState({userId:currentUser?._id,userName:currentUser?.userName,videoId:video?._id,msg:'',ref:comment?._id,profile:`${currentUser?.profile}`})
    const dispatch = useDispatch()
    const fetchComments= useGetComentsQuery(currentId)

    const handelComment = async(e)=>{
      e.preventDefault()
      try {
          if (msgcontent?.msg !=='' && !isempty) { 
          dispatch(setLoading())
          await createComment(msgcontent)  
          dispatch(endLoading())  
          fetchComments.refetch()
          setMsgcontent({...msgcontent,msg:'',userId:currentUser?._id,userName:currentUser?.userName,videoId:currentId,ref:comment?._id}) 
          }
          else  setIsempty(true)
  
      } catch (error) {
          setIsempty(true)
      }
   }
   if (isempty) {
    setTimeout(() => {
     setIsempty(false)   
    }, 1500);
 }

  //  reply Comments

  const replies = data?.filter((reply)=>reply?.ref === comment?._id)
  return (
    <div className='w-full'>
    <div className={comment?.ref ===''?'flex gap-2 my-6':'flex gap-2 my-6 ml-12'}>
    <Avatar
alt={comment?.userName || 'User'}
src={comment?.profile}
sx={{ width:comment?.ref ===''? 46: 36, height:comment?.ref ===''? 46: 36 }}
/> 
<div className=' mt-[-1px] w-full'>
<div className=' flex gap-2'>
<p className={ video?.userId !== comment?.userId?'text-base font-medium text-slate-200':'text-base font-medium text-slate-200 bg-slate-700 px-3 rounded-xl'}>{comment?.userName || 'User'}</p>
<p  className='text-gray-400 text-xs mt-[5px]'>{moment(comment?.createdAt).fromNow() }</p>
</div>

<p className=' text-base text-slate-100'>{comment?.msg}</p>
<p onClick={()=>setShowreply(!showReply)} className='text-sm font-medium p-2 mt-1 hover:bg-slate-700 rounded-2xl cursor-pointer ml-[-18px] duration-200 transition-all w-[70px] text-center text-slate-100'>Reply</p>


{/* Reply text Field */}
{ showReply && <div>
<div className='mt-3 flex gap-3 mb-1 animate-[slideup_0.4s]'>
  <Avatar
  alt={currentUser?.userName}
  src={user?.profile}
  sx={{ width: 36, height: 36 }}
/>

<div className=' mt-[-1px] w-[100%]'>
<Input onFocus={()=>{
    setShowbtn(true)
setBorderBottom(true)
}}
onBlur={()=>setBorderBottom(false)}
 value={msgcontent?.msg}
onChange={(e)=>{
setMsgcontent({...msgcontent,msg:e.target.value})
}}
sx={{width:'100%',color:'#b2b8b4',borderBottom:!borderBottom?'solid 2px #a7a8a7':''
}} placeholder="Add Reply.." inputProps={ariaLabel} />
</div>
</div>
{showbtn &&<div className=' flex flex-row-reverse gap-1'>
<Button onClick={handelComment} variant='contained' sx={{color:'whitesmoke',borderRadius:'20px',px:2,bgcolor:'GrayText'}}  color='primary'>
 {isloading?<Loader/>:'Comment'}
</Button>
<Button className='cancelhover' onClick={()=>setShowbtn(false)} variant="text" sx={{color:'whitesmoke',borderRadius:'20px',px:2}} color='inherit'>
  Cancel
</Button>
</div>}

{isempty &&
<div style={{zIndex:99}} className=' fixed bottom-3 left-0 xl:px-8 px-5  animate-[slideleft_0.7s]'>
<Alert severity="error">Please Type a comment first !</Alert>
</div>}
</div>}
{ replies?.length>0 &&<p onClick={()=>setShowreplycomment(!showReplycomment)} className=' text-sm font-medium p-2 hover:bg-blue-300 rounded-2xl cursor-pointer ml-[-18px] duration-200 transition-all w-[90px] text-center text-blue-400 hover:text-indigo-900'>{replies?.length} Replies</p>}
</div>
</div>


{ showReplycomment && replies?.length > 0 && replies?.map((msg,id)=>(
  <Comment user={user} data={data} comment={msg} video={video}/>
))}
</div>
  )
}
