import React, { useState,useEffect } from 'react'
import ProgressBar from '../ProgressBar';
import app from '../../firebase.js'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {IconButton, Tooltip } from '@mui/material'

export default function ImgPost({setPostData,postData,imgPerc,setImgPerc}) {
    const [image,setImage] = useState(null)

      // uploading image and video to firebase
  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `communityPostImages/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imageUrl" && setImgPerc(Math.round(progress));
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
          setPostData(
            { ...postData,[urlType]: downloadURL }
          );
        });
      }
    );
  };

  useEffect(() => {
    image && uploadFile(image , "imageUrl");
  }, [image]);
  return (

<div className="flex flex-col items-center justify-center w-full mt-2 mb-5">
    {imgPerc>0 ? 
    <div className=' text-white w-full'>
         <ProgressBar progress={imgPerc} setProgress={setImgPerc}/>
        </div>:
                  <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col  justify-center items-center  ">
      
                    <div className="flex justify-center items-center flex-auto max-h-48 w-2/5 mx-auto">
                    <svg height="24" viewBox="0 0 24 24" width="24" focusable="false" style={{pointerEvents: 'none', display: 'block', width: '50px', height: '50px',background:'#7e92f7',borderRadius:'50%', padding:5}}><path d="M14.04 13.61 16.86 17H11.5l.3-.4 2.24-2.99m-5.11 1.08 1.24 1.86.3.45H7.08l1.85-2.31M14 12l-3 4-2-3-4 5h14l-5-6zm6-8v16H4V4h16m1-1H3v18h18V3z"></path></svg>
                    </div>
                    <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> image file here <br /> or <a href="" id="" className="text-blue-600 hover:underline">select a image file</a> from your device</p>
                  </div>
                  <input type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="hidden" />
                </label>
                 }

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
          setPostData({...postData, imageUrl:''})}}>
              <DeleteForeverIcon className=' text-red-700'/>
            </IconButton>
            </Tooltip>
            </div>

        <img style={{borderRadius:'30px'}} className=' max-h-[600px] object-cover rounded-xl p-4' src={postData?.imageUrl}/>
        </div>
        }

        </div>
  )
}
