import React, { useState } from 'react'
import Input from '@mui/material/Input';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { Button } from '@mui/material';
import { useDeletePoleMutation, useEditPoleMutation} from '../../redux/api/api';
const ariaLabel = { 'aria-label': 'description' };
export default function Userpole({pole,postId}) {
    const [borderBottom,setBorderBottom] = useState(false)
    const [editBtn,setEditBtn] = useState(false)
    const [delPole] = useDeletePoleMutation()
    const [editPoleName] =useEditPoleMutation()
    const [updatedPoleData,setUpdatedPoleData] = useState({poleName:'',communityPostId:`${postId}`,id:''})

        //edit pole
        const editPole=()=>{
      
            const edit=async()=>{
            await editPoleName(updatedPoleData)
            setEditBtn(false)
            }
            edit()
      
          }
      
          //delete a pole
          const deletePole=(id)=>{
            const del = async()=>{
             await delPole(id)
            }
            del()
          }
  return (
    <div className=' p-4 my-2 text-white border border-indigo-600 rounded-xl flex justify-between gap-2'>
    <div className=' flex gap-2'>
    <CloseIcon className='my-auto cursor-pointer' onClick={()=>deletePole(pole?._id)}/>
    {!editBtn?<p className=' mt-[1px]'>{pole?.poleName}</p>:
              <Input onFocus={()=>{
            setBorderBottom(true)
            }}
            onBlur={()=>setBorderBottom(false)}
            value={updatedPoleData?.poleName}
            onChange={(e)=>setUpdatedPoleData({...updatedPoleData,poleName:e.target.value})}
            
            sx={{width:{lg:'400px',md:'300px',xs:'100%'},color:'#b2b8b4',borderBottom:!borderBottom?'solid 2px #a7a8a7':''
            }} placeholder="Add Pole.." inputProps={ariaLabel} />
    }
    </div>
    {!editBtn?<Button 
    sx={{display:'flex',gap:1}}
    size='small'
    onClick={()=>{
      setEditBtn(true)
      setUpdatedPoleData({...updatedPoleData,poleName:pole?.poleName,id:pole?._id})}}
     variant="text" color='inherit'>
      <EditIcon className=' text-white'/>
     Edit
    </Button>:
    <Button onClick={editPole}
    size='small'
     variant="text" color='inherit'>
      <UpgradeIcon className=' text-white'/>
     Add Pole
    </Button>
    }
  </div>
  )
}
