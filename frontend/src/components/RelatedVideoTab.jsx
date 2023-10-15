import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useGetSingleVideoQuery, useGetUserQuery} from '../redux/api/api';

export default function RelatedVideoTab({selectCate,setSelectCate,videoId,setSearchTerm}) {
  const {data:userVideo} = useGetSingleVideoQuery(videoId)
  const {data:user} = useGetUserQuery(userVideo?.userId)
  const [value, setValue] = React.useState(0);
  const videoCategory = [
    "All",
    `More From ${user?.userName}`,
    "MERN",
    "React",
    "Js",
    "WebDev",
    "Gamming",
    "Marvel",
    "DC",
    "Codding",
    "New For you"
  ]

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{  bgcolor: 'transparent'}}>
      <Tabs
      sx={{color:'white'}}
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{
            hidden:true
        }}
        variant='scrollable'
        scrollButtons
        textColor='inharit'
        aria-label="scrollable auto tabs example"
      >
        {videoCategory?.map((video)=>(
         <Tab
         
         onClick={()=>{
            setSelectCate(video)
            setSearchTerm(video)
        }}
         sx={{color:selectCate === video?'black':'whitesmoke',borderRadius:'15px',background:selectCate === video?'#f2f2f2':'linear-gradient(180deg, rgba(47,47,48,0.756827731092437) 0%, rgba(27,27,28,0.6980042016806722) 100%)',mx:1,minWidth:'40px',fontSize:'13px'}} label={video} />   
        ))}
      </Tabs>
    </Box>
  );
}