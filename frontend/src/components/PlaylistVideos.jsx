
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from './loader/Loader'
import PlaylistVideoCard from './PlaylistVideoCard'
export default function PlaylistVideos({videos,isFetching}) {
    const navigate = useNavigate()
  return (
    <div className='overflow-y-auto h-[calc(100vh-80px)] w-full xl:pr-10 pr-0 '>
        { !isFetching ? videos?.map((video,id)=>(
                <div>
                {videos?.length > 0 &&
                <PlaylistVideoCard video={video} id={id} navigate={navigate}/>
}
              </div>
        )):(
            <Loader/>
        )}
        <br />
        </div>
  )
}
