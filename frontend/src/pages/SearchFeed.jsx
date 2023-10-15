import React, { useEffect, useState } from 'react'
import VideoCard from '../components/VideoCard';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { endLoading, getallVideos, setLoading } from '../redux/slices/videoSlice';

import SearchChannelCard from '../components/SearchChannelCard';
import Loader from '../components/loader/Loader';
import SearchVideoCard from '../components/SearchVideoCard';

export default function SearchFeed({ searchTerm }) {
  const baseUrl = 'http://localhost:5000'
  const { isloading, allvideos } = useSelector(state => state.video)
  const [channels, setChannels] = useState([])
  const [searchvideos, setSearchVideos] = useState([])
  const dispatch = useDispatch()

  //for showing the channels
  useEffect(() => {
    const fetchData = async () => {

      if (searchTerm) {
        dispatch(setLoading())
        await axios.get(`${baseUrl}/user/searchChannel/${searchTerm}`)
          .then(({ data }) => {
            setChannels(data)
            dispatch(endLoading())
          })
      }
      else {
        const fetchAllvideos = async () => {
          dispatch(setLoading())
          await axios.get(`${baseUrl}/vid/videos`)
            .then(({ data }) => {
              dispatch(getallVideos(data))
              dispatch(endLoading())
            })
        }
        fetchAllvideos()
      }
    }
    fetchData()
  }, [searchTerm])

  //for showing the videos
  useEffect(() => {
    const fetchData = async () => {

      if (searchTerm) {

        await axios.get(`${baseUrl}/vid/search/${searchTerm}`)
          .then(({ data }) => {
            setSearchVideos(data)

          })
      }
    }
    fetchData()
  }, [searchTerm])



  return (
    <div className=' flex'>
      <Sidebar />

      <div style={{background:'black'}} className='gap-2 lg:pl-6 pl-2 w-full px-2 pb-8 overflow-y-auto h-[calc(100vh-64px)] scroll-smooth '>
        <div className=' animate-[slideup_0.8s] flex gap-2 flex-wrap xl:justify-start justify-center '>

          {/* when no results are shown */}
          {channels?.length === 0 && searchvideos?.length === 0 && searchTerm && !isloading &&
            <div className=' text-center text-white font-extrabold mx-auto mt-10 text-3xl'>
              No videos or Channels are avalable for this search</div>}

          {/* no searchterm are present and showing all videos */}
          {!searchTerm && !isloading &&
            allvideos?.map((video, id) => (
              <SearchVideoCard video={video} />
            ))}

          {(searchTerm && !isloading) && searchvideos?.map((video, id) => (
            <SearchVideoCard video={video} />
          ))}

          {(searchTerm !== null && !isloading) ? channels?.map((channel, id) => (
            <SearchChannelCard channel={channel} />
          )) : (
            <div className='mt-10 flex items-center flex-col justify-center mx-auto gap-2'>
              <div className='bg-white rounded-full p-1 w-[50px] h-[50px] flex items-center flex-col justify-center'>
                <Loader />
              </div>

              <p className=' text-slate-200 font-semibold text-base'>Loading Content...</p>
            </div>


          )
          }

        </div>

      </div>


    </div>

  )
}
