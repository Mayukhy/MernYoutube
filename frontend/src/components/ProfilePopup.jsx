import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../redux/slices/userSlice';
import { useGetUserQuery } from '../redux/api/api';

export default function ProfilePopup({currentUser}) {
  const {notification} = useSelector(state => state.user)
  const [invisible, setInvisible] = React.useState(false);
  const dispatch = useDispatch()
  const {data:user} = useGetUserQuery(currentUser?._id)
  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };
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
        <Tooltip className=' relative' title="Your Account">
        { notification && <Badge className=' animate-pulse' sx={{mt:'7px',mr:1,position:'absolute',right:0,transform:'scale(1.4)',zIndex:9}} color="primary" variant="dot" overlap="circular" invisible={invisible}></Badge>}
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 0.8 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={user?.profile} sx={{ width: 42, height: 42 }}>{currentUser?.userName?.slice(0,1)}</Avatar>
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
        <MenuItem onClick={()=>{
            setAnchorEl(null)
            navigate(`/user/${currentUser?._id}`)}}>
          <Avatar src={user?.profile} /> Your Channel
        </MenuItem>
        <Divider sx={{color:'#726f73',border:'1px solid'}} />
        <MenuItem sx={{position:'relative'}} onClick={()=>{
            setAnchorEl(null)
            navigate('/library')
            dispatch(hideNotification()) 
        }}>
          { notification && <Badge className=' animate-pulse' sx={{mt:'-15px',ml:1,position:'absolute',left:30,transform:'scale(1.2)',zIndex:9}} color="error" variant="dot" overlap="circular" invisible={invisible}></Badge>}
          <ListItemIcon>
            <SlideshowIcon className=' text-yellow-50' fontSize="small" />
          </ListItemIcon>
          Your Library
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings className=' text-yellow-50' fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={()=>{
            setAnchorEl(null)
            navigate('/')
            localStorage.clear()
        }}>
          <ListItemIcon>
            <Logout className=' text-red-300' fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}