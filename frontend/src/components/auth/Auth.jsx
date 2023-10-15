import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import {Box, Tooltip}from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import cookie from 'react-cookies'
import EmailIcon from '@mui/icons-material/Email';
import FormControl from '@mui/joy/FormControl';
import { styled } from '@mui/joy/styles';
import Input from '@mui/joy/Input';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios'
import Face6Icon from '@mui/icons-material/Face6';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { loginFail, loginStart, loginSuccess } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import ProfilePopup from '../ProfilePopup';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    px: 4,
    py:3,
    gap:4,
    backgroundColor:'black',
  };

const StyledInput = styled('input')({
    border: 'none', // remove the native input border
    minWidth: 0, // remove the native input width
    outline: 0, // remove the native input outline
    padding: 0, // remove the native input padding
    paddingTop: '1em',
    flex: 1,
    color: 'inherit',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontStyle: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    textOverflow: 'ellipsis',
    '&::placeholder': {
      opacity: 0,
      transition: '0.1s ease-out',
    },
    '&:focus::placeholder': {
      opacity: 1,
    },
    '&:focus ~ label, &:not(:placeholder-shown) ~ label, &:-webkit-autofill ~ label': {
      top: '0.5rem',
      fontSize: '0.75rem',
    },
    '&:focus ~ label': {
      color: 'var(--Input-focusedHighlight)',
    },
    '&:-webkit-autofill': {
      alignSelf: 'stretch', // to fill the height of the root slot
    },
    '&:-webkit-autofill:not(* + &)': {
      marginInlineStart: 'calc(-1 * var(--Input-paddingInline))',
      paddingInlineStart: 'var(--Input-paddingInline)',
      borderTopLeftRadius:
        'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
      borderBottomLeftRadius:
        'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
    },
  });
  
  const StyledLabel = styled('label')(({ theme }) => ({
    position: 'absolute',
    lineHeight: 1,
    top: 'calc((var(--Input-minHeight) - 1em) / 2)',
    color: theme.vars.palette.text.tertiary,
    fontWeight: theme.vars.fontWeight.md,
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  }));
  
  const InnerInput1 = React.forwardRef(function InnerInput(props, ref) {
    const id = React.useId();
    return (
      <React.Fragment>
        <StyledInput {...props} ref={ref} id={id} />
        <StyledLabel htmlFor={id}>Email</StyledLabel>
      </React.Fragment>
    );
  });
  
  const InnerInput2 = React.forwardRef(function InnerInput(props, ref) {
      const id = React.useId();
      return (
        <React.Fragment>
          <StyledInput {...props} ref={ref} id={id} />
          <StyledLabel htmlFor={id}>First Name</StyledLabel>
        </React.Fragment>
      );
    });
  
    const InnerInput3 = React.forwardRef(function InnerInput(props, ref) {
      const id = React.useId();
      return (
        <React.Fragment>
          <StyledInput {...props} ref={ref} id={id} />
          <StyledLabel htmlFor={id}>Last Name</StyledLabel>
        </React.Fragment>
      );
    });
  
    const InnerInput4 = React.forwardRef(function InnerInput(props, ref) {
      const id = React.useId();
      return (
        <React.Fragment>
          <StyledInput {...props} ref={ref} id={id} />
          <StyledLabel htmlFor={id}>Password</StyledLabel>
        </React.Fragment>
      );
    });
  
    const InnerInput5 = React.forwardRef(function InnerInput(props, ref) {
      const id = React.useId();
      return (
        <React.Fragment>
          <StyledInput {...props} ref={ref} id={id} />
          <StyledLabel htmlFor={id}>Confirm Password</StyledLabel>
        </React.Fragment>
      );
    });
  
    const InnerInput6 = React.forwardRef(function InnerInput(props, ref) {
      const id = React.useId();
      return (
        <React.Fragment>
          <StyledInput {...props} ref={ref} id={id} />
          <StyledLabel htmlFor={id}>Username</StyledLabel>
        </React.Fragment>
      );
    });

export default function Auth() {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const currentUser = JSON.parse(localStorage.getItem('user'))
  console.log("Current user is",currentUser)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userData,setUserData] = React.useState({firstName:'',lastName:'',email:'',userName:'',password:'',confirmpassword:'',profile:''})
  const[loginData,setLoginData] = React.useState({userName:'',password:''})
  const [wrongpassword,setWrongpassword] = React.useState(false)
  const [success,setSuccess] = React.useState(false)
  const[successlogin,setSuccesslogin] = React.useState(false)
  const[blackField,setBlackfield] = React.useState(false)
  const[userexist,setUserexist] = React.useState(false)
  const[invalidCr,setInvalidCr] = React.useState(false)


  const createuser= async(e)=>{
    e.preventDefault()
    console.log(userData)
    if (userData?.password === userData?.confirmpassword && userData?.email && userData?.userName && userData?.firstName && userData?.lastName) {
        try {
            await axios.post('http://localhost:5000/user/register',userData) 
            .then(({data})=>console.log(data))
            setSuccess(true)
            setUserData(userData?.firstName ==='' && userData?.userName ==='' && userData?.lastName ==='' && userData?.email ==='' && userData?.password ==='' && userData?.confirmpassword ==='' && userData?.profile ==='') 
            setTimeout(() => {
            setValue(1)
            }, 700); 
        } catch (error) {
            console.log(error)
        }

    }
   else if (userData?.password !== userData?.confirmpassword) {
    setWrongpassword(true) 
    }
    else if(!userData?.email || !userData?.userName || !userData?.firstName || !userData?.lastName){
    setBlackfield(true)
    }
    else{
setUserexist(true)
    }

  }

 [ axios.defaults.withCredentials = true]
  const loginUser= async(e)=>{
  e.preventDefault()
  if (loginData?.userName && loginData?.password) {
    try {
      dispatch(loginStart())
      await axios.post('http://localhost:5000/user/login',loginData) 
      .then(({data})=>{console.log(data)
        {
          dispatch(loginSuccess(data))
          localStorage.setItem('user',JSON.stringify(data))
          window.location.reload()
        
        }
      })
      setLoginData(loginData?.userName ==='' && userData?.password ==='')
      setSuccesslogin(true)  
      setTimeout(() => {
      setOpen(false)
      }, 1000); 
  } catch (error) {
      console.log(error)
      dispatch(loginFail())
  } 
  }
  else if(!loginData?.userName || !loginData?.password)
   {
     setBlackfield(true)
    dispatch(loginFail())
  }
  else setInvalidCr(true)

  }

  if (invalidCr) {
    setTimeout(() => {
      setInvalidCr(false)
    }, 2000);
  }

  if (success) {
    setTimeout(() => {
      setSuccess(false)
    }, 2000);
  }

  if (successlogin) {
    setTimeout(() => {
      setSuccesslogin(false)
    }, 2000);
  }
  if (wrongpassword) {
    setTimeout(() => {
      setWrongpassword(false)
    }, 2000);
  }
  if (blackField) {
    setTimeout(() => {
      setBlackfield(false)
    }, 2000);
  }
  if (userexist) {
    setTimeout(() => {
      setUserexist(false)
    }, 2000);
  }
    
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      { !currentUser ? <Button sx={{mt:0.8 , ml:0.8,mr:2}} color="primary" variant='outlined' onClick={handleOpen}>Login</Button>:
      <div className=' flex gap-1 md:pr-1 lg:pr-2 xl:pr-3 pr-1'>
        <ProfilePopup currentUser={currentUser}/>
      </div>
}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >

      <Box
        sx={style}
        className=' rounded-lg'
      >
     {wrongpassword && <Alert  className=' animate-[slidedown_0.7s]'  severity="error">Passwords are not matched</Alert>}
     {blackField && <Alert className=' animate-[slidedown_0.7s]' severity="error">Fill the required fields</Alert>}
     {invalidCr && <Alert className=' animate-[slidedown_0.7s]' severity="error">Wrong username or password</Alert>}
     {success && <Alert  className=' animate-[slidedown_0.7s]' severity="success">Registration Succsssful</Alert>}
     {successlogin && <Alert  className=' animate-[slidedown_0.7s]' severity="success">Login Succsssful</Alert>}
     {userexist && <Alert className=' animate-[slidedown_0.7s]' severity="error">Email or Username is already exists</Alert>}
     <Box sx={{ width: '100%',mb:1 }}>
      <Tabs sx={{color:'white'}} value={value} onChange={handleChange} centered>
        <Tab sx={{color:'white',fontWeight:700,letterSpacing:2}} label="Register" />
        <Tab sx={{color:'white',fontWeight:700,letterSpacing:2}}  label="Login" />
      </Tabs>
    </Box>
 { value ===0 ? 
   <div>
        <FormControl sx={{ gridColumn: '1/-1',mb:2 }}>
        <Input
        value={userData?.email}
        onChange={(e)=>{setUserData({...userData,email:e.target.value})}}
      endDecorator={<EmailIcon/>}
      slots={{ input: InnerInput1 }}
      slotProps={{ input: { placeholder: 'Enter your Email', type: 'email' } }}
      sx={{
        '--Input-minHeight': '56px',
        '--Input-radius': '6px',
        bgcolor:'black',
        color:'white'
      }}

    />
        </FormControl>

        <FormControl sx={{ gridColumn: '1/-1',mb:2 }}>
        <Input
        value={userData?.userName}
        onChange={(e)=>{setUserData({...userData,userName:e.target.value})}}
      endDecorator={<Face6Icon/>}
      slots={{ input: InnerInput6 }}
      slotProps={{ input: { placeholder: 'Create Username', type: 'text' } }}
      sx={{
        '--Input-minHeight': '56px',
        '--Input-radius': '6px',
        bgcolor:'black',
        color:'white'
      }}
    />
    </FormControl>

        <FormControl sx={{ gridColumn: '1/-1',mb:2 }}>
        <Input
        value={userData?.firstName}
        onChange={(e)=>{setUserData({...userData,firstName:e.target.value})}}
      endDecorator={<PersonIcon/>}
      slots={{ input: InnerInput2 }}
      slotProps={{ input: { placeholder: 'Enter First Name', type: 'text' } }}
      sx={{
        '--Input-minHeight': '56px',
        '--Input-radius': '6px',
        bgcolor:'black',
        color:'white'
      }}
    />
        </FormControl>
        <FormControl sx={{ gridColumn: '1/-1',mb:2 }}>
        <Input
        value={userData?.lastName}
        onChange={(e)=>{setUserData({...userData,lastName:e.target.value})}}
      endDecorator={<PersonIcon/>}
      slots={{ input: InnerInput3 }}
      slotProps={{ input: { placeholder: 'Enter Last Name', type: 'text' } }}
      sx={{
        '--Input-minHeight': '56px',
        '--Input-radius': '6px',
        bgcolor:'black',
        color:'white'
      }}
    />
        </FormControl >
        <FormControl sx={{ gridColumn: '1/-1',mb:2 }}>
        <Input
        value={userData?.password}
        onChange={(e)=>{setUserData({...userData,password:e.target.value})}}
      endDecorator={<VisibilityIcon/>}
      slots={{ input: InnerInput4 }}
      slotProps={{ input: { placeholder: 'Enter Password', type: 'password' } }}
      sx={{
        '--Input-minHeight': '56px',
        '--Input-radius': '6px',
        bgcolor:'black',
        color:'white'
      }}
    />
        </FormControl>
        <FormControl sx={{ gridColumn: '1/-1',mb:2 }}>
        <Input
        value={userData?.confirmpassword}
        onChange={(e)=>{setUserData({...userData,confirmpassword:e.target.value})}}
      endDecorator={<VisibilityIcon/>}
      slots={{ input: InnerInput5 }}
      slotProps={{ input: { placeholder: 'Confirm Password', type: 'password' } }}
      sx={{
        '--Input-minHeight': '56px',
        '--Input-radius': '6px',
        bgcolor:'black',
        color:'white'
      }}
    />
        </FormControl>
        
          <Button sx={{width:'100%'}} onClick={createuser} variant='contained' color='primary'>
            Register
          </Button>
          </div>:
          
      <div>
                <FormControl sx={{ gridColumn: '1/-1',mb:2 }}>
        <Input
        value={loginData?.userName}
        onChange={(e)=>{setLoginData({...loginData,userName:e.target.value})}}
      endDecorator={<Face6Icon/>}
      slots={{ input: InnerInput6 }}
      slotProps={{ input: { placeholder: 'Your Username', type: 'text' } }}
      sx={{
        '--Input-minHeight': '56px',
        '--Input-radius': '6px',
        bgcolor:'black',
        color:'white'
      }}
    />
    </FormControl>

    <FormControl sx={{ gridColumn: '1/-1',mb:2 }}>
        <Input
        value={loginData?.password}
        onChange={(e)=>{setLoginData({...loginData,password:e.target.value})}}
      endDecorator={<VisibilityIcon/>}
      slots={{ input: InnerInput4 }}
      slotProps={{ input: { placeholder: 'Enter Password', type: 'password' } }}
      sx={{
        '--Input-minHeight': '56px',
        '--Input-radius': '6px',
        bgcolor:'black',
        color:'white'
      }}
    />
        </FormControl>
        <Button sx={{width:'100%'}} onClick={loginUser} variant='contained' color='primary'>
            Login
          </Button>
    
      </div>  }
      
      </Box>
      </Modal>
    </div>
  );
}