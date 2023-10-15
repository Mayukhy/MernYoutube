//Query and  mutation   fom this application

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const myTubeApi = createApi({
    reducerPath: 'Mytube2.0',
    baseQuery : fetchBaseQuery({
        baseUrl:'http://localhost:5000',
        credentials: 'include',
        tagTypes:['comments','user','users','Posts','Poles','singleVideo','Videos','Playlist','PlaylistVideos'],
  
    }),
    endpoints:(builder)=>({
        getVideos: builder.query({query:
            ()=>({
               
              url: 'vid/videos',
              method:'GET'
           }),
           providesTags:['Videos']
       }) ,
       getSearchedQueary: builder.query({query:
        (searchTerm)=>({
           
          url: `vid/search/${searchTerm}`,
          method:'GET'
       }),
   }) ,
   getFilteredVideos: builder.query({query:
    (filterterm)=>({
      url: `vid/${filterterm}`,
      method:'GET'
   })
}) ,

updateVideo:builder.mutation({
    query:(updatedVideo)=>{
        const {id,...data} = updatedVideo

       return {
            headers:{
                'Content-type' : 'application/json',
            },
            url:`vid/update/${id}`,
            method:'PUT',
            body:data

        }
    },
    invalidatesTags:['Videos']
  }),
  getUsers: builder.query({query:
    ()=>({
       
      url: `user/users`,
      method:'GET'
   }),
   providesTags:['user','users']
}) ,
        getUser: builder.query({query:
            (id)=>({
               
              url: `user/${id}`,
              method:'GET'
           }),
           providesTags:['user']
       }) ,

       updateUser:builder.mutation({
        query:(updatedUser)=>{
            const {id,...data} = updatedUser

           return {
                headers:{
                    'Content-type' : 'application/json',
                },
                url:`user/update/${id}`,
                method:'PUT',
                body:data

            }
        },
        invalidatesTags:['user']
      }),
      updateSub:builder.mutation({
        query:(videoId)=>(
           {
                headers:{
                    'Content-type' : 'application/json',
                },
                url:`user/sub/${videoId}`,
                method:'PUT',

            }
        ),
        invalidatesTags:['user','users']
      }),
      removeSub:builder.mutation({
        query:(videoId)=>(
            {
                headers:{
                    'Content-type' : 'application/json',
                },
                url:`user/unsub/${videoId}`,
                method:'PUT',

            }
      ),
        invalidatesTags:['user','users']
      }),
       getSearchedUser: builder.query({query:
        (searchTerm)=>({
           
          url: `user/searchChannel/${searchTerm}`,
          method:'GET'
       }),
   }) ,
        getSingleVideo: builder.query({query:
            (videoId)=>({
               
              url: `vid/video/${videoId}`,
              method:'GET'
           }),
           providesTags:['singleVideo']
       }) ,
       addView:builder.mutation({
        query:(videoId)=>(
            {
                headers:{
                    'Content-type' : 'application/json',
                },
                url:`vid/view/${videoId}`,
                method:'PUT',

            }
        ),
        invalidatesTags:['singleVideo','Videos']
      }),
       addVideo: builder.mutation({query:
        (newVideo)=>({
           
          url: 'vid/post/video',
          method:'POST',
          body:newVideo
       }),
       providesTags:['Videos']
   }) ,
       getPlaylist: builder.query({query:
        ()=>({
           
          url: 'save/playlists',
          method:'GET'
       }),
       providesTags:['Playlist']
   }) ,
   getsinglePlaylist: builder.query({query:
    (id)=>({
       
      url: `save/playlist/${id}`,
      method:'GET'
   }),
   providesTags:['Playlist']
}) ,
   getPlaylistVideos: builder.query({query:
    (id)=>({
       
      url: `vid/playlist/${id}`,
      method:'GET'
   }),
   providesTags:['PlaylistVideos','Playlist','Videos']
  
}) ,
       addLikes:builder.mutation({
        query:(videoId)=>(
            {
                headers:{
                    'Content-type' : 'application/json',
                },
                url:`user/like/${videoId}`,
                method:'PUT',

            }
        ),
        invalidatesTags:['singleVideo']
      }),
      removeLikes:builder.mutation({
        query:(videoId)=>(
            {
                headers:{
                    'Content-type' : 'application/json',
                },
                url:`user/dislike/${videoId}`,
                method:'PUT',
            }
        ),
        invalidatesTags:['singleVideo']
      }),
      getComents: builder.query({query:
         (videoId)=>({
            
           url: `comment/${videoId}`,
           method:'GET'
        }),
        providesTags:['comments']
    }) ,  
      
      createComment:builder.mutation({
        query:(comment)=>(
            {
                headers:{
                    'Content-type' : 'application/json',
                },
                url:'comment/addcomment',
                method:'POST',
                body:comment

            }
        ),
        invalidatesTags:['comments']
      }),
      
      createPlaylist:builder.mutation({
        query:(newplaylist)=>(
            {
                headers:{
                    'Content-type' : 'application/json',
                },
                url:'save/createplaylist',
                method:'POST',
                body:newplaylist

            }
        ),
        invalidatesTags:['Playlist']
      }),

      updateListname:builder.mutation({
        query:(updatedlist)=>{
            const {id,...data} = updatedlist

           return {
                headers:{
                    'Content-type' : 'application/json',
                },
                url:`save/updatename/${id}`,
                method:'PUT',
                body:data

            }
        },
        invalidatesTags:['Playlist']
      }),

      updatePlaylist:builder.mutation({
        query:(id,videoId)=>(
            {
                headers:{
                    'Content-type' : 'application/json',
                },
                url:`save/updatelist/${id}/${videoId}`,
                method:'PUT',

            }
        ),
        invalidatesTags:['Playlist']
      }),

         //community
   getCommunityPosts: builder.query({query:
    ()=>({
       
      url: `community/posts`,
      method:'GET'
   }),
   providesTags:['Posts']
}) , 

createPost:builder.mutation({
    query:(newPost)=>(
        {
            headers:{
                'Content-type' : 'application/json',
            },
            url:'community/createPost',
            method:'POST',
            body:newPost

        }
    ),
    invalidatesTags:['Posts']
  }),
  publishPost:builder.mutation({
    query:(postId)=>(
        {
            headers:{
                'Content-type' : 'application/json',
            },
            url:`community/publishPost/${postId}`,
            method:'PUT',

        }
    ),
    invalidatesTags:['Posts']
  }),

         //poles
         getCommunityPoles: builder.query({query:
            ()=>({
               
              url: `textPole/poles`,
              method:'GET'
           }),
           providesTags:['Poles']
        }) , 
        createPole:builder.mutation({
            query:(newPole)=>(
               {
                    headers:{
                        'Content-type' : 'application/json',
                    },
                    url:'textPole/createPole',
                    method:'POST',
                    body:newPole
    
                }
            ),
            invalidatesTags:['Poles']
          }),
        updatePole:builder.mutation({
            query:(poleId)=>(
               {
                    headers:{
                        'Content-type' : 'application/json',
                    },
                    url:`textPole/ansPole/${poleId}`,
                    method:'PUT',
    
                }
            ),
            invalidatesTags:['Poles']
          }),

          editPole:builder.mutation({
            query:(updatedData)=>{
                const { id, ...data} = updatedData
               
              return {
                    headers:{
                        'Content-type' : 'application/json',
                    },
                    url:`textPole/editPole/${id}`,
                    method:'PUT',
                    body:data
    
                }
            },
            invalidatesTags:['Poles']
          }),

          deletePole:builder.mutation({
            query:(poleId)=>(
               {
                    headers:{
                        'Content-type' : 'application/json',
                    },
                    url:`textPole/delPole/${poleId}`,
                    method:'DELETE',
    
                }
            ),
            invalidatesTags:['Poles']
          }),
   }),
    
});

export const {
useGetComentsQuery,
useGetUsersQuery,
useGetUserQuery,
useUpdateUserMutation,
useCreateCommentMutation,
useGetSingleVideoQuery,
useGetVideosQuery,
useUpdateVideoMutation,
useGetFilteredVideosQuery,
useGetSearchedQuearyQuery,
useGetSearchedUserQuery,
useAddVideoMutation,
useAddViewMutation,
useAddLikesMutation,
useRemoveLikesMutation,
useGetPlaylistQuery,
useGetPlaylistVideosQuery,
useCreatePlaylistMutation,
useUpdatePlaylistMutation,
useGetsinglePlaylistQuery,
useUpdateListnameMutation,
useGetCommunityPostsQuery,
useGetCommunityPolesQuery,
useUpdateSubMutation,
useCreatePostMutation,
usePublishPostMutation,
useRemoveSubMutation,
useUpdatePoleMutation,
useCreatePoleMutation,
useEditPoleMutation,
useDeletePoleMutation
}=myTubeApi;

//   reducer:{
//     persistedReducer,
//     [myTubeApi.reducerPath]: myTubeApi.reducer},

// middleware:(getDefaultMiddleware) =>
// getDefaultMiddleware().concat(myTubeApi.middleware),
// });