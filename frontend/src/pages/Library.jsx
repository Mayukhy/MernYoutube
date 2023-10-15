import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar';
import { useGetPlaylistQuery } from '../redux/api/api';
import Loader from '../components/loader/Loader';
import LibraryCard from '../components/LibraryCard';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { setCategoryName } from '../redux/slices/videoSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function Library() {
  const {data,isFetching} = useGetPlaylistQuery()
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const userLibrary = data?.filter((video)=>video?.userId === currentUser?._id)
  const dispatch = useDispatch()
  const {categoryName} = useSelector(state=>state.video)
  useEffect(()=>{
  dispatch(setCategoryName("Library"))
  },[categoryName])
  return (
    <div className=' flex'>
      <Sidebar/>
      
    <div style={{background:'black'}} className='flex flex-col gap-2 lg:pl-6 pl-2 w-full px-2 pb-8 overflow-y-auto h-[calc(100vh-64px)] scroll-smooth '>

{ userLibrary?.length > 0 ? 
 <div>
      <div className=' px-4 flex gap-3 mt-2 xl:justify-start justify-center '>
        <PlaylistPlayIcon className=' text-slate-200 cursor-pointer scale-150 mt-1'/>
        <p className=' text-slate-200 font-bold text-lg'>Playlists</p>
      </div>
      <div className=' flex gap-2 xl:justify-start animate-[slideup_0.8s] justify-center flex-wrap'>
      { !isFetching ?userLibrary?.map((item,id)=>(
        <LibraryCard playlist={item} key={id}/>
        
      )):(
        <Loader/>
      )}
      </div>
      
    </div>:
      <div className=' text-center text-white font-extrabold mx-auto mt-10 text-3xl'>
       No Playlists are created yet</div>
    }
    </div>
    </div>
    
  )
}
