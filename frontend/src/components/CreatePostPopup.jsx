import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import ReviewsIcon from '@mui/icons-material/Reviews';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { setTabValue } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

export default function CreatePostPopup({handleOpen}) {
  const dispatch = useDispatch()
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
              <Tooltip sx={{mt:1.2}} title="Uplode Video">
              <IconButton
                          size='small'
                          color="inherit"
              aria-label="" onClick={handleClick}>
              <VideoCallIcon className=' text-white'/>
              </IconButton>
              </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            color:'white',
            bgcolor:'#201426',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: '#201426',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleOpen}>
          <ListItemIcon>
            <SmartDisplayIcon className=' text-red-400' fontSize="small" />
          </ListItemIcon>
          Upload Video
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AppShortcutIcon className=' text-pink-500' fontSize="small" />
          </ListItemIcon>
          Upload Shorts
        </MenuItem>
        <MenuItem onClick={()=>{
            setAnchorEl(null)
            navigate(`/user/${currentUser?._id}`)
            dispatch(setTabValue("Community")) 
        }}>
          <ListItemIcon>
            <ReviewsIcon className='text-indigo-400' fontSize="small" />
          </ListItemIcon>
          Create Posts
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}