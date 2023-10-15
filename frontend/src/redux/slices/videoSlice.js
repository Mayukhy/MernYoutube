import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  isloading:false,
  isVideoLoading:false,
  videos:null,
  allvideos:[],
  error:false,
  videoId:null,
  comments:[],
  playlistId:null,
  mobilemenu:false,
  smSidebar:false,
  searchTerm:'',
  categoryName:'Home',
  
  //to play next Playlist Video (Map Id)
  CurrentPlaylistVideoMapId:0,

    //to play next Playlist Video (Real Video Id)
    CurrentPlaylistVideoId:null,

  //to store the array of the playlist video to autoplay playlist videos after ending of current video
  selectedPlaylistVideos:[], 

  //if it is true then only show the playlist videos to the video details page
  isPlaylistVideo:false

}

export const videoSlice = createSlice({
  
    //from react component by this name the states are called
  name: 'video',
  initialState,
  reducers: {
    setLoading: (state) => {
    state.isloading = true
    },
    setVideoLoading: (state) => {
      state.isVideoLoading = true
      },
    endLoading: (state) => {
        state.isloading = false
        },
        endVideoLoading: (state) => {
          state.isVideoLoading = false
          },
          setmobilemenuon: (state) => {
            state.mobilemenu =true
            },
            setmobilemenuoff: (state) => {
              state.mobilemenu =false
              },
              setSmsidebar: (state) => {
                state.smSidebar =true
                },
                closeSmsidebar: (state) => {
                  state.smSidebar =false
                  },
    getVideos: (state,action) => {
        state.isloading = false
        state.videos=action.payload
        },
        getallVideos: (state,action) => {
          state.isloading = false
          state.allvideos=action.payload
          },
          getComments: (state,action) => {
            state.isloading = false
            state.comments=action.payload
            },
        setVideoId:(state,action)=>{
          state.videoId = action.payload
        },
        setSearchterm:(state,action)=>{
          state.searchTerm = action.payload
        },
        //Changing PlaylistId
        setPlaylistId:(state,action)=>{
          state.playlistId = action.payload
        },
        setCategoryName:(state,action)=>{
          state.categoryName = action.payload
        },
        nullPlaylistId:(state)=>{
          state.playlistId = null
        },
        setIsPlaylistVideo:(state)=>{
          state.isPlaylistVideo = true
        },
        hideIsPlaylistVideo:(state)=>{
          state.isPlaylistVideo = false
        },
        
        setSelectedPLaytlistVideos: (state,action) => {
          state.selectedPlaylistVideos=action.payload
          },

          setCurrentMappedVideoId: (state,action) => {
            state.CurrentPlaylistVideoMapId=action.payload
            },
            setCurrentPlaylistVideoId: (state,action) => {
              state.CurrentPlaylistVideoId=action.payload
              },

          setPlayNextPlaylistvideo: (state,action) => {
          //from react component the map id will comes 
          state.CurrentPlaylistVideoMapId = action.payload //0,1,2,3...

              if (action.payload < (state.selectedPlaylistVideos?.length - 1)) {
              
              state.CurrentPlaylistVideoId = state.selectedPlaylistVideos[state.CurrentPlaylistVideoMapId + 1]?._id
              state.CurrentPlaylistVideoMapId++
              }
              else{
                state.CurrentPlaylistVideoMapId = 0
                state.CurrentPlaylistVideoId = state.selectedPlaylistVideos[state.CurrentPlaylistVideoMapId]?._id 
                state.CurrentPlaylistVideoMapId++
              }

            }
  },
})

// Action creators are generated for each case reducer function
export const {setLoading,setVideoLoading,setCategoryName,endVideoLoading,getVideos,endLoading,setVideoId,getallVideos,getComments,setPlaylistId,nullPlaylistId,setmobilemenuoff,setmobilemenuon,setSearchterm,setSmsidebar,closeSmsidebar,setIsPlaylistVideo,hideIsPlaylistVideo,setSelectedPLaytlistVideos,setPlayNextPlaylistvideo,setCurrentMappedVideoId,setCurrentPlaylistVideoId } = videoSlice.actions

export default videoSlice.reducer