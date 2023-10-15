import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert';
import { endLoading, getComments, setLoading } from '../redux/slices/videoSlice';
import Loader from './loader/Loader';
import Comment from './Comment';
import { useCreateCommentMutation, useGetComentsQuery, useGetUserQuery } from '../redux/api/api';
import Picker from 'emoji-picker-react';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const ariaLabel = { 'aria-label': 'description' };

export default function Comments({currentId,video}) {
const dispatch = useDispatch()
 const [borderBottom,setBorderBottom] = useState(false)
 const [showbtn,setShowbtn] = useState(false)
 const [createComment,newcomment] = useCreateCommentMutation()
 console.log('New comment',newcomment)
 const currentUser = JSON.parse(localStorage.getItem('user'))
 const {isloading} = useSelector(state=>state.video)
 const [msgcontent,setMsgcontent] = useState({userId:currentUser?._id,userName:currentUser?.userName,videoId:currentId,msg:'',profile:`${currentUser?.profile}`})

 const [showPicker, setShowPicker] = useState(false);
 
 const onEmojiClick = (event, emojiObject) => {
  setMsgcontent({ ...msgcontent, msg:emojiObject?.emoji});
   setShowPicker(false);
 };

 const [isempty,setIsempty] = useState(false)

 const {data,isFetching, error} = useGetComentsQuery(currentId)
 const {data:user} = useGetUserQuery(currentUser?._id)
 const fetchComments= useGetComentsQuery(currentId)
 console.log('Fetching the comments',fetchComments)
console.log(data)

 const handelComment = async(e)=>{
    e.preventDefault()
    try {
        if (msgcontent?.msg !=='' && !isempty) { 
        dispatch(setLoading())
        await createComment(msgcontent)  
        dispatch(endLoading())  
        fetchComments.refetch()
        setMsgcontent({...msgcontent,msg:'',userId:currentUser?._id,userName:currentUser?.userName,videoId:currentId}) 
        }
        else  setIsempty(true)

    } catch (error) {
        setIsempty(true)
    }
 }


//  only comments not reply
const onlyComments = data?.filter((comment)=>comment?.ref ==='')

 if (isempty) {
    setTimeout(() => {
     setIsempty(false)   
    }, 1500);
 }

  return (
    <div className='relative'>
        {/* Comment Field */}
        <div className='mt-7 flex gap-5'>
  <Avatar
  alt={currentUser?.userName}
  src={user?.profile}
  sx={{ width: 46, height: 46 }}
/>
<div className=' mt-[-1px] w-[100%] relative'>
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
}} placeholder="Add comment.." inputProps={ariaLabel} />
{    showbtn &&  <InsertEmoticonIcon className=' text-white cursor-pointer absolute left-0 top-9 mt-3'
          onClick={() => setShowPicker(val => !val)} />}
        {showPicker && <Picker
          pickerStyle={{ width: '100%',position:'absolate' }}
          onEmojiClick={onEmojiClick} />}
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

{/* comments  */}

<div className=' mt-8'>
    {data?.length>0 && onlyComments?.map((comment,id)=>(
<Comment user={user} currentId={currentId} data={data} key={id} comment={comment} video={video}/>
    ))}
</div>
    </div>
  )
}
