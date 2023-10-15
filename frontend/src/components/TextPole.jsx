import React, { useEffect, useState } from 'react'
import Radio from '@mui/joy/Radio';
import ListItem from '@mui/joy/ListItem';
import { useUpdatePoleMutation } from '../redux/api/api'
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import {Box,Typography} from '@mui/material';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%'}}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ width:100,right:0,position:'absolute' }}>
        <Typography variant="body2" color='white'>{`${Math.round(
          props.value,
        )} Votes`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};


export default function TextPole({pole,postPoles}) {
  const [progress, setProgress] = useState(0);
    const [updatePole] = useUpdatePoleMutation()
    const [poleId,setPoleId] = useState(null)
    const currentUser = JSON.parse(localStorage.getItem('user'))
    React.useEffect(() => {

      setProgress(pole?.textRes?.length);

  }, [pole?.textRes]);
    
    const ansed0 = (postPoles[0]?.textRes?.filter((res)=>res === currentUser?._id ))?.length
    const ansed1 = (postPoles[1]?.textRes?.filter((res)=>res === currentUser?._id ))?.length
    const ansed2 = (postPoles[2] && postPoles[2]?.textRes?.filter((res)=>res === currentUser?._id ))?.length
    const ansed3 = (postPoles[3] && postPoles[3]?.textRes?.filter((res)=>res === currentUser?._id ))?.length
    const ansed4 = (postPoles[4] && postPoles[4]?.textRes?.filter((res)=>res === currentUser?._id ))?.length

    const handleChange=(value)=>{
        setPoleId(value)
      }
      const handleClick=async(id)=>{
        if (ansed0 === 0 &&ansed1 === 0 && !postPoles[2] && !postPoles[3] && !postPoles[4]) {
        await updatePole(id)    
        }
        if (ansed0 === 0 && ansed1 === 0 && ansed2 === 0 && !postPoles[3] && !postPoles[4]) {
            await updatePole(id)    
            }
            if (ansed0 === 0 &&ansed1 === 0 && ansed2 === 0 && ansed3 === 0  && !postPoles[4]) {
                await updatePole(id)    
                }
                if (ansed0 === 0 &&ansed1 === 0 && ansed2 === 0 && ansed3 === 0  && ansed4 === 0) {
                    await updatePole(id)    
                    }
      }
  return (
    <ListItem className='animate-[slideup_0.8s] relative'
    variant="outlined" sx={{ boxShadow: 'sm' ,bgcolor:(ansed0 ===1 || ansed1===1 || ansed2===1 || ansed3 === 1 || ansed4 === 1) ?'#686968':''}}>
  <Radio className='hoverRadio'
    overlay
    disableIcon
    value=  {pole?._id}
    onChange={(e)=>handleChange(e.target.value)}
    onClick={()=>handleClick(pole?._id)}
    label=  {pole?.poleName}
    sx={{ flexGrow: 1, flexDirection: 'row' , color:'whitesmoke',fontSize:'18px', }}
    slotProps={{
      action: ({ checked }) => ({
        sx: (theme) => ({
          ...(checked && {
            inset: -1,
            border: '2px solid',
            borderColor: theme.vars.palette.primary[500],
          }),
        }),
      }),
    }}
  />
 { (ansed0 ===1 || ansed1===1 || ansed2===1 || ansed3 === 1 || ansed4 === 1) && <div className=' absolute w-full h-full ml-[-13px]'>
      <LinearProgressWithLabel sx={{height:'84px',width:'100%',borderRadius:'7px'}} color='inherit' value={progress} />
      </div>}
</ListItem>
  )
}







// export default function LinearWithValueLabel() {


//   return (
//   );
// }
