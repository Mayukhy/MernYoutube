import * as React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormControl from '@mui/joy/FormControl';
import { styled } from '@mui/joy/styles';
import Input from '@mui/joy/Input';
import Face6Icon from '@mui/icons-material/Face6';
import { Button, IconButton, Tooltip } from '@mui/material';
import { useUpdateUserMutation } from '../../redux/api/api';
import Loader from '../loader/Loader';
import thumbnail from '../../assets/image/profile.png'
import videoicon from '../../assets/image/profileBg.png'
import app from '../../firebase'
import EditIcon from '@mui/icons-material/Edit';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import ProgressBar from '../ProgressBar';

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
            <StyledLabel htmlFor={id}>Change UserName</StyledLabel>
        </React.Fragment>
    );
});

const InnerInput2 = React.forwardRef(function InnerInput(props, ref) {
    const id = React.useId();
    return (
        <React.Fragment>
            <StyledInput {...props} ref={ref} id={id} />
            <StyledLabel htmlFor={id}>Change Name</StyledLabel>
        </React.Fragment>
    );
});

export default function UpdateUser({userData,setUserData,setOpen}) {
    const [bg,setBg] = React.useState(undefined)
    const [profile,setProfile] = React.useState(undefined)
    const [bgPerc, setBgPerc] = React.useState(0);
    const [profilePerc, setProfilePerc] = React.useState(0);
    const [loading,setloading] = React.useState(false)
 const [updatedUser,updatedProfile] = useUpdateUserMutation()
 console.log('Updated User cradential',updatedProfile?.data)
    // for updation logic for the btn
    const handelUpdate=()=>{
      setloading(true)
        const updateData =async()=>{
        await updatedUser(userData)
        setloading(false)
        setOpen(false)
        }
        updateData()
    }

      // uploading profile and background to firebase
  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `profile&bg/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "background" ? setBgPerc(Math.round(progress)) : setProfilePerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUserData(
            { ...userData,[urlType]: downloadURL }
          );
        });
      }
    );
  };

  React.useEffect(() => {
    bg && uploadFile(bg , "background");
  }, [bg]);

  React.useEffect(() => {
    profile && uploadFile(profile, "profile");
  }, [profile]);

    return (
        <div className=' animate-[slideup_0.8s]'>
     <div className=' flex flex-row-reverse mt-[-10px] mb-2'>
 <Button onClick={()=>setOpen(false)} variant="outlined" color="primary" size='small'>
   Back
 </Button>
      </div>
            <p className=' mb-4 text-3xl text-center font-bold text-slate-50'>Update Channel</p>
            <FormControl sx={{ gridColumn: '1/-1', mb: 2 }}>
                <Input
                    value={userData?.userName}
                    onChange={(e) => { setUserData({ ...userData, userName: e.target.value }) }}
                    endDecorator={<Face6Icon />}
                    slots={{ input: InnerInput1 }}
                    slotProps={{ input: { placeholder: 'Update Username', type: 'text' } }}
                    sx={{
                        '--Input-minHeight': '56px',
                        '--Input-radius': '6px',
                        bgcolor: 'black',
                        color: 'white'
                    }}
                />
            </FormControl>

            <FormControl sx={{ gridColumn: '1/-1', mb: 2 }}>
                <Input
                    value={userData?.name}
                    onChange={(e) => { setUserData({ ...userData, name: e.target.value }) }}
                    endDecorator={<VisibilityIcon />}
                    slots={{ input: InnerInput2 }}
                    slotProps={{ input: { placeholder: 'Update Name', type: 'text' } }}
                    sx={{
                        '--Input-minHeight': '56px',
                        '--Input-radius': '6px',
                        bgcolor: 'black',
                        color: 'white'
                    }}
                />
            </FormControl>

            <p className=' text-slate-200'>Update Profile Picture</p>
                                {/* video uplode */}
        {(profilePerc === 100 || userData?.profile !=='') && 
                  <div className=' relative'>
                  <div style={{zIndex:99}} className=' absolute right-0 top-0 mx-2 rounded-full backdrop-blur-2xl'>
                  <Tooltip title="Edit Profile Picture">
                  <IconButton
                    size="large"
                    color="inherit"
                  aria-label=""
                   onClick={()=>{
                setProfilePerc(0)
                setUserData({...userData, profile:''})}}>
                    <EditIcon className=' text-red-100'/>
                  </IconButton>
                  </Tooltip>
                  </div>
      
                  <img className=' mx-auto xl:w-[450px] lg:w-[350px] md:w-[250px] w-[300px] xl:h-[450px] lg:h-[350px] md:h-[250px] h-[300px] object-cover p-4 rounded-full' src={userData?.profile}/>
              </div>
        }
        {profilePerc > 0  ?(
              <div className=' text-white'>
              <ProgressBar progress={profilePerc} setProgress={setProfilePerc}/>
            </div>
        )
    :(
        <>
{   !userData?.profile &&    <div className="flex items-center justify-center w-full mt-2 mb-5">
        <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
          <div className="h-full w-full text-center flex flex-col  justify-center items-center  ">

            <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
              <img className="has-mask h-[90px] mt-10 m-auto cursor-pointer hover:scale-110 duration-200 transition-all object-center"  src={thumbnail} alt="Thumbnail" />
            </div>
            <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> image file here <br /> or <a href="" id="" className="text-blue-600 hover:underline">select a video file</a> from your device</p>
          </div>
          <input type="file"
            accept="image/*"
            onChange={(e) => setProfile(e.target.files[0])}
            className="hidden" />
        </label>
      </div>}
      </>
    )}

        <p className=' text-slate-200'>Update Profile Background</p>
        {(bgPerc === 100|| userData?.background !=='') && 
                  <div className=' relative'>
                  <div style={{zIndex:99}} className=' absolute right-0 top-0 m-2 rounded-full backdrop-blur-2xl'>
                  <Tooltip title="Edit Profile Background">
                  <IconButton
                    size="large"
                    color="inherit"
                    aria-label=""
                   onClick={()=>{
                setBgPerc(0)
                setUserData({...userData, background:''})}}>
                    <EditIcon className=' text-red-600'/>
                  </IconButton>
                  </Tooltip>
                  </div>
      
                  <img style={{borderRadius:'20px'}} className=' max-h-[600px] w-full object-cover mx-auto my-5' src={userData?.background}/>
              </div>
        }
                {bgPerc > 0 ?(
              <div className=' text-white'>
              <ProgressBar progress={bgPerc} setProgress={setBgPerc}/>
            </div>
        ):(
            <>
           {!userData?.background &&  <div className="flex items-center justify-center w-full mt-2 mb-5">
            <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
              <div className="h-full w-full text-center flex flex-col  justify-center items-center  ">
  
                <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                  <img className="has-mask h-[90px] mt-10 m-auto cursor-pointer hover:scale-110 duration-200 transition-all object-center" src={videoicon}  alt="Thumbnail" />
                </div>
                <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> image file here <br /> or <a href="" id="" className="text-blue-600 hover:underline">select a video file</a> from your device</p>
              </div>
              <input type="file"
                accept="image/*"
                onChange={(e) => setBg(e.target.files[0])}
                className="hidden" />
            </label>
          </div>}
          </>
        )}


            <Button sx={{ width: '100%' }} onClick={handelUpdate} variant='contained' size='small' color='error'>
                { !loading?'Update Your Data':(
                    <Loader/>
                )}
            </Button>

        </div>
    )
}
