import React, { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
// City
import '@videojs/themes/dist/city/index.css';

// Fantasy
import '@videojs/themes/dist/fantasy/index.css';

// Forest
import '@videojs/themes/dist/forest/index.css';

// Sea
import '@videojs/themes/dist/sea/index.css';
import { useDispatch } from 'react-redux';
import { setPlayNextPlaylistvideo } from '../redux/slices/videoSlice';
export default function VideoJS({options,source, themeName = 'city',setShowTimer,listVideoClicked,CurrentPlaylistVideoMapId,CurrentPlaylistVideoId,playlistId,isPlaylistVideo,isloopPlay,relatedVideos,otherVideos}) {
   const videoRef = useRef(null)
   const playerRef = useRef(null)
   const dispatch = useDispatch()
   
    useEffect(()=>{
   const player = playerRef.current
   if(!player){
    const videoElement = videoRef.current
    if (!videoElement) 
        return
        playerRef.current = videojs(videoElement,options)
   }
//    return()=>{
//     if (player) {
//         player.dispose()
//         playerRef.current = null
//     }
//    }
    },[options,videoRef,playerRef])
  return (
      
      <video
      onEnded={()=>{
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
        }} 

        
    src={source} className={`video-js vjs-big-play-centered vjs-theme-${themeName} w-[950px] h-[500px]`} ref={videoRef}  autoPlay loop={isloopPlay?true:false} ></video>
    
  )
}


{/* <div className=' max-w-[950px] h-[520px]'>
<VideoJS otherVideos={otherVideos} relatedVideos={relatedVideos} isloopPlay={isloopPlay} playlistId={playlistId} isPlaylistVideo={isPlaylistVideo} CurrentPlaylistVideoId={CurrentPlaylistVideoId} CurrentPlaylistVideoMapId={CurrentPlaylistVideoMapId} setShowTimer={setShowTimer} listVideoClicked={listVideoClicked}
options = {videoJsOptions} source={video?.videoUrl}/>
</div> */}