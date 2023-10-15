import { configureStore,combineReducers,getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import videoReducer from './slices/videoSlice'
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { myTubeApi } from './api/api';

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const rootReducer = combineReducers({ user: userReducer, video: videoReducer, [myTubeApi.reducerPath]: myTubeApi.reducer });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer:
  { user: userReducer, video: videoReducer, [myTubeApi.reducerPath]: myTubeApi.reducer },
   
  
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(myTubeApi.middleware),

  // reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }).concat(myTubeApi.middleware),
  
    
});

// export const persistor = persistStore(store) 