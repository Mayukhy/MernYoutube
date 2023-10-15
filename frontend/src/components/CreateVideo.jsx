import React, { useEffect, useState } from 'react'
import { Typography, Button, Alert, IconButton, Tooltip } from '@mui/material'
import FormControl from '@mui/joy/FormControl';
import { styled } from '@mui/joy/styles';
import Textarea from '@mui/joy/Textarea';
import Input from '@mui/joy/Input';
import Face6Icon from '@mui/icons-material/Face6';
import { useDispatch, useSelector } from 'react-redux';
import thumbnail from '../assets/image/thumbnail.png'
import videoicon from '../assets/image/video.png'
import app from '../firebase'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useAddVideoMutation, useGetVideosQuery } from '../redux/api/api';
import { endLoading, setLoading } from '../redux/slices/videoSlice';
import Loader from './loader/Loader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProgressBar from './ProgressBar';

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

export default function CreateVideo({setOpen}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [uploadVideo,newvideo] = useAddVideoMutation()
  const totalvideos = useGetVideosQuery()
  console.log(newvideo)
  const [isempty,setIsempty] = useState(false)
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [videoData, setVideoData] = useState({ title: '', desc: '', tags: [], imgUrl: '', videoUrl: '' })

  const { isloading } = useSelector((state) => state.video)

  // uploading image and video to firebase
  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideoData(
            { ...videoData,[urlType]: downloadURL }
          );
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video , "videoUrl");
  }, [video]);
  console.log(videoData?.imgUrl)

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  if (isempty) {
    setTimeout(() => {
     setIsempty(false)   
    }, 1500);
 }

  // function behind the uploading btn

  const uploadVideoData=async()=>{
    if (videoData?.title !== '', videoData?.desc !== '', videoData?.imgUrl !== '', videoData?.videoUrl !== '' ) {
      try {
        dispatch(setLoading())
        // await uploadVideo(videoData)
        const upload = async()=>{
        await axios.post('http://localhost:5000/vid/post/video',videoData)
        .then(({data})=>{
          setTimeout(() => {
            dispatch(endLoading()) 
            navigate(`/video/${data?._id}`)    
            setOpen(false)
            totalvideos.refetch()
            window.location.reload()
          }, 2000);
        })
        }
        upload()
        // console.log('VideoId is :',newvideo?.data?._id)
        // setTimeout(() => {
        //   dispatch(endLoading()) 
        //   navigate(`/video/${newvideo?.data?._id}`)    
        //   setOpen(false)
        // }, 2000);
      } catch (error) {
        alert('you are not authenticated')
      }

    }
    else{
      setIsempty(true)
    }
    
  }

  return (
    <div className='animate-[slideup_0.7s]'>
      <div className=' flex flex-row-reverse mt-[-10px] mb-2'>
 <Button onClick={()=>setOpen(false)} variant="outlined" color="primary" size='small'>
   Back
 </Button>
      </div>
      <p className=' text-3xl text-center font-bold mb-5'>Upload New Video</p>

      <div>
        {/* video uplode */}
        {videoPerc === 100 && 
                  <div className=' relative'>
                  <div style={{zIndex:99}} className=' absolute right-0 bottom-0 m-5 rounded-full backdrop-blur-2xl'>
                  <Tooltip title="Delete Video">
                  <IconButton
                    size="large"
                    color="inherit"
                  aria-label=""
                   onClick={()=>{
                setVideoPerc(0)
                setVideoData({...videoData, videoUrl:''})}}>
                    <DeleteForeverIcon className=' text-red-700'/>
                  </IconButton>
                  </Tooltip>
                  </div>
      
              <video controls style={{borderRadius:'30px'}} className=' max-h-[600px] w-full object-cover rounded-xl p-4' src={videoData?.videoUrl}/>
              </div>
        }
       {videoPerc > 0 ? (
        <div className=' text-white'>
         <ProgressBar progress={videoPerc} setProgress={setVideoPerc}/>
        </div>
       ):( 
       <div className="flex items-center justify-center w-full mt-2 mb-5">
          <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
            <div className="h-full w-full text-center flex flex-col  justify-center items-center  ">

              <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                <img className="has-mask h-[80px] animate-bounce mt-10 m-auto cursor-pointer hover:scale-110 duration-200 transition-all object-center" src={videoicon} alt="Thumbnail" />
              </div>
              <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> video file here <br /> or <a href="" id="" className="text-blue-600 hover:underline">select a video file</a> from your device</p>
            </div>
            <input type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="hidden" />
          </label>
        </div>)}
        <FormControl sx={{ gridColumn: '1/-1', mb: 2 }}>
          <Input
            value={videoData?.title}
            onChange={(e) => { setVideoData({ ...videoData, title: e.target.value }) }}
            endDecorator={<Face6Icon />}
            slots={{ input: InnerInput1 }}
            slotProps={{ input: { placeholder: 'Give Title', type: 'text' } }}
            sx={{
              '--Input-minHeight': '56px',
              '--Input-radius': '6px',
              bgcolor: 'black',
              color: 'white'
            }}
          />
        </FormControl>
        <FormControl sx={{ gridColumn: '1/-1', mb: 2 }}>

          <Textarea
            placeholder="Add Video Description…"
            value={videoData?.desc}
            onChange={(e) => { setVideoData({ ...videoData, desc: e.target.value }) }}
            minRows={5}
            maxRows={10}
            endDecorator={
              <Typography level="body-xs" sx={{ ml: 'auto' }}>
                {videoData?.desc?.length} character(s)
              </Typography>
            }
            sx={{
              '--Input-minHeight': '56px',
              '--Input-radius': '6px',
              bgcolor: 'black',
              color: 'white',

            }}
          />


        </FormControl>
        <FormControl sx={{ gridColumn: '1/-1', mb: 2 }}>
          <Input
            value={videoData?.tags}
            onChange={(e) => { setVideoData({ ...videoData, tags: e.target.value.split(',') }) }}
            endDecorator={<Face6Icon />}
            slots={{ input: InnerInput3 }}
            slotProps={{ input: { placeholder: 'Create Tags', type: 'text' } }}
            sx={{
              '--Input-minHeight': '56px',
              '--Input-radius': '6px',
              bgcolor: 'black',
              color: 'white'
            }}
          />
        </FormControl>
        <FormControl sx={{ gridColumn: '1/-1', mb: 2 }}>

          
          <p className=' text-slate-200'>Upload Video Thumbnail</p>

          {/* for showing the image to user before uploading */}
          {imgPerc === 100 && 
          <div className=' relative'>
            <div className=' absolute right-0 bottom-0 m-5 rounded-full backdrop-blur-2xl'>
            <Tooltip title="Delete Thumbnail">
            <IconButton
              size="large"
              color="inherit"
            aria-label=""
             onClick={()=>{
          setImgPerc(0)
          setVideoData({...videoData, imgUrl:''})}}>
              <DeleteForeverIcon className=' text-red-700'/>
            </IconButton>
            </Tooltip>
            </div>

        <img style={{borderRadius:'30px'}} className=' max-h-[600px] object-cover rounded-xl p-4' src={videoData?.imgUrl}/>
        </div>
        }
{imgPerc > 0 ? (
  <div className=' text-white'>
    <ProgressBar progress={imgPerc} setProgress={setImgPerc}/>
  </div>
):(          <div className="flex items-center justify-center w-full mt-2">
            <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
              <div className="h-full w-full text-center flex flex-col  justify-center items-center  ">

                <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                  <img className="has-mask mt-16 h-10 m-auto cursor-pointer hover:scale-110 duration-200 transition-all object-center" src={thumbnail} alt="Thumbnail" />
                </div>
                <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> image here <br /> or <a href="" id="" className="text-blue-600 hover:underline">select a file</a> from your computer</p>
              </div>
              <input type="file"
                accept="image/*"
                onChange={(e) => setImg(e.target.files[0])}
                className="hidden" />
            </label>
          </div>)}
        </FormControl>
        <Button onClick={uploadVideoData} sx={{ width: '100%', bgcolor: 'GrayText', mt: 2 }} variant="contained" color="error" size='small'>
          {isloading ? <Loader /> : ' Upload Video'}
        </Button>
      </div>
      {isempty &&
<div style={{zIndex:99}} className=' sticky bottom-[-5px] xl:px-8 px-5  animate-[slideup_0.7s]'>
<Alert severity="error">Please Fill the required fields first!</Alert>
</div>}
    </div>
  )
}
