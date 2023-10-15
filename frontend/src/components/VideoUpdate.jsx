
import React, { useEffect, useState } from 'react'
import { Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@mui/joy/FormControl';
import { styled } from '@mui/joy/styles';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import Face6Icon from '@mui/icons-material/Face6';
import axios from 'axios';
import {endLoading, setLoading } from '../redux/slices/videoSlice';
import Loader from './loader/Loader';
import { useGetSingleVideoQuery, useUpdateVideoMutation} from '../redux/api/api';

const StyledInput = styled('input')({
  border: 'none', // remove the native input border
  minWidth: 0, // remove the native input width
  outline: 0, // remove the native input outline
  padding: 0, // remove the native input padding
  paddingTop: '1em',
  flex: 1,
  color: 'inherit',
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontStyle: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  textOverflow: 'ellipsis',
  '&::placeholder': {
    opacity: 0,
    transition: '0.1s ease-out',
  },
  '&:focus::placeholder': {
    opacity: 1,
  },
  '&:focus ~ label, &:not(:placeholder-shown) ~ label, &:-webkit-autofill ~ label': {
    top: '0.5rem',
    fontSize: '0.75rem',
  },
  '&:focus ~ label': {
    color: 'var(--Input-focusedHighlight)',
  },
  '&:-webkit-autofill': {
    alignSelf: 'stretch', // to fill the height of the root slot
  },
  '&:-webkit-autofill:not(* + &)': {
    marginInlineStart: 'calc(-1 * var(--Input-paddingInline))',
    paddingInlineStart: 'var(--Input-paddingInline)',
    borderTopLeftRadius:
      'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
    borderBottomLeftRadius:
      'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
  },
});

const StyledLabel = styled('label')(({ theme }) => ({
  position: 'absolute',
  lineHeight: 1,
  top: 'calc((var(--Input-minHeight) - 1em) / 2)',
  color: theme.vars.palette.text.tertiary,
  fontWeight: theme.vars.fontWeight.md,
  transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
}));

const InnerInput1 = React.forwardRef(function InnerInput(props, ref) {
  const id = React.useId();
  return (
    <React.Fragment>
      <StyledInput {...props} ref={ref} id={id} />
      <StyledLabel htmlFor={id}>Video Title</StyledLabel>
    </React.Fragment>
  );
});

const InnerInput2 = React.forwardRef(function InnerInput(props, ref) {
    const id = React.useId();
    return (
      <React.Fragment>
        <StyledInput {...props} ref={ref} id={id} />
        <StyledLabel htmlFor={id}>Video Description</StyledLabel>
      </React.Fragment>
    );
  });

  const InnerInput3 = React.forwardRef(function InnerInput(props, ref) {
    const id = React.useId();
    return (
      <React.Fragment>
        <StyledInput {...props} ref={ref} id={id} />
        <StyledLabel htmlFor={id}>Tags</StyledLabel>
      </React.Fragment>
    );
  });

  const InnerInput4 = React.forwardRef(function InnerInput(props, ref) {
    const id = React.useId();
    return (
      <React.Fragment>
        <StyledInput {...props} ref={ref} id={id} />
        <StyledLabel htmlFor={id}>Igame Url</StyledLabel>
      </React.Fragment>
    );
  });


export default function VideoUpdate({videoId,setopenUpdate,allvideos}) {
  const {isloading,isVideoLoading} = useSelector((state)=>state.video)
  console.log('RTK videos',allvideos)
  const dispatch = useDispatch()
  console.log("videos are",allvideos)

  //for showing the previous value of the video items
  const videoTobeupdate = allvideos?.find(video=> video._id === videoId )
 
  console.log("video is",videoTobeupdate)
  const singlevideo = useGetSingleVideoQuery(videoId)
  const [updateVideo] = useUpdateVideoMutation()
  const [videoData,setVideoData] = useState({id:videoId,title:'',desc:'',tags:[],imgUrl:''})
  useEffect(()=>{
  if (videoId) {
    setVideoData({id:videoId,title:videoTobeupdate?.title, desc:videoTobeupdate?.desc, tags:videoTobeupdate?.tags,imgUrl:videoTobeupdate?.imgUrl})
  }
  },[videoId])
  const addEmoji = (emoji)=>()=> setVideoData({...videoData?.desc,desc:emoji});

  //for updating the video
  const HandleUpdate= async(e)=>{
    e.preventDefault()
  const update =async()=>{
    dispatch(setLoading())
await updateVideo(videoData)
dispatch(endLoading())
setopenUpdate(false)
singlevideo.refetch()
  }
  update()

  }

  return (
    <div className=' animate-[slideup_0.7s]'>
            <div className=' flex flex-row-reverse mt-[-10px] mb-2'>
 <Button onClick={()=>setopenUpdate(false)} variant="outlined" color="primary" size='small'>
   Back
 </Button>
      </div>
 <p className=' mb-4 text-3xl text-center font-bold'>Update Video</p>

<div>
<FormControl sx={{ gridColumn: '1/-1',mb:2 }}>
        <Input
        value={videoData?.title}
        onChange={(e)=>{setVideoData({...videoData,title:e.target.value})}}
      endDecorator={<Face6Icon/>}
      slots={{ input: InnerInput1 }}
      slotProps={{ input: { placeholder: 'Edit Title', type: 'text' } }}
      sx={{
        '--Input-minHeight': '56px',
        '--Input-radius': '6px',
        bgcolor:'black',
        color:'white'
      }}
    />
    </FormControl>
    <FormControl sx={{ gridColumn: '1/-1',mb:2 }}>

<Textarea
      placeholder="Update Video Description…"
      value={videoData?.desc}
      onChange={(e)=>{setVideoData({...videoData,desc:e.target.value})}}
      minRows={5}
      maxRows={10}
      startDecorator={
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
            👍
          </IconButton>
          <IconButton variant="outlined" color="neutral" onClick={addEmoji('🏖')}>
            🏖
          </IconButton>
          <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
            😍
          </IconButton>
        </Box>
      }
      endDecorator={
        <Typography level="body-xs" sx={{ ml: 'auto' }}>
          {videoData?.desc?.length} character(s)
        </Typography>
      }
      sx={{
        '--Input-minHeight': '56px',
        '--Input-radius': '6px',
        bgcolor:'black',
        color:'white',
      
      }}
    />
   
   
    </FormControl>
    <FormControl sx={{ gridColumn: '1/-1',mb:2 }}>
        <Input
        value={videoData?.tags}
        onChange={(e)=>{setVideoData({...videoData,tags:e.target.value.split(',')})}}
      endDecorator={<Face6Icon/>}
      slots={{ input: InnerInput3 }}
      slotProps={{ input: { placeholder: 'Edit Tags', type: 'text' } }}
      sx={{
        '--Input-minHeight': '56px',
        '--Input-radius': '6px',
        bgcolor:'black',
        color:'white'
      }}
    />
    </FormControl>
    <FormControl sx={{ gridColumn: '1/-1',mb:2 }}>
        <Input
        value={videoData?.imgUrl}
        onChange={(e)=>{setVideoData({...videoData,imgUrl:e.target.value})}}
      endDecorator={<Face6Icon/>}
      slots={{ input: InnerInput4 }}
      slotProps={{ input: { placeholder: 'Image', type: 'text' } }}
      sx={{
        '--Input-minHeight': '56px',
        '--Input-radius': '6px',
        bgcolor:'black',
        color:'white'
      }}
    />
    </FormControl>
    <Button onClick={HandleUpdate} sx={{width:'100%'}} variant="contained" color="error" size='small'>
     { isloading? <Loader/>:' Edit Video'}
    </Button>
</div>
    </div>
  )
}
