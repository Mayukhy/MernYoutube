import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isloading:false,
  currentUser:null,
  error:false,
  tabValue:'Home',
  notification:false,
  isSubed:false
}

export const userSlice = createSlice({
    //from react component by this name the states are called
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
    state.isloading = true
    },
    loginSuccess: (state,action) => {
        state.isloading = false
        state.currentUser=action.payload
        },
        loginFail: (state) => {
            state.isloading = false
            state.currentUser=null
            state.error=true
            },
    logOut:(state)=>{
        state.isloading=false
        state.currentUser=null
        state.error=false
    },
    setuserLoading:(state)=>{
      state.isloading=true
  },
  enduserLoading:(state)=>{
    state.isloading=false
},
setTabValue: (state,action) => {
  state.tabValue=action.payload
  },
  setNotification:(state)=>{
    state.notification=true
},
hideNotification:(state)=>{
  state.notification=false
},

  },
})

// Action creators are generated for each case reducer function
export const { loginStart,loginFail,loginSuccess,logOut ,subscribe,setuserLoading,enduserLoading,setTabValue,setNotification,hideNotification} = userSlice.actions

export default userSlice.reducer