import React from 'react'

export default function YourVid() {
  return (
    <div className=' flex'>
      <Sidebar/>
    <div className=' flex gap-2 flex-wrap  bg-slate-900 w-full px-2 pb-8 overflow-y-auto h-[calc(100vh-64px)] scroll-smooth justify-center'>
      
      {data?.map((item,id)=>(
        <VideoCard item={item} id={id}/>
        
      ))}
      
    </div>
    
    </div>
  )
}
