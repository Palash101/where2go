import * as React from 'react';
import { useState,useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useContext} from 'react';
import {SettingsContext} from '../../../context/settingsContext'
import ModeToggler from '../shared-components/ModeToggler'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import themeConfig from 'src/configs/themeConfig'
import router from 'next/router';
import { Modal } from '@mui/material';
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import { auth } from 'service/main'; 
import CircularProgress from '@mui/material/CircularProgress';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { signInWithPhoneNumber } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
import {toast} from 'react-toastify';
import OtpInput from 'react-otp-input';
import { signinUser,userLogout } from 'service/auth';
import { userAuth } from 'context/userContext';




const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 function HomeAppBar(props) {
  const {settings,saveSettings} = useContext(SettingsContext)
  const [navVisible, setNavVisible] = useState(false)
  const theme  = useTheme()

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [user, setUser] = useState({});
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reloadPage, setReloadPage] = useState(false)

  const userContext = userAuth()


  useEffect(() => {
    console.log('calling')
    if(localStorage.getItem('isAuthenticated')){
      const userData = {
        phoneNumber:localStorage.getItem('userInfo'),
        uId:localStorage.getItem('uId'),
        role:localStorage.getItem('role'),
        isAuthenticated:localStorage.getItem('isAuthenticated'),
        accesstoken:localStorage.getItem('accesstoken')
      };
      console.log(userData,'user Data')
      setUser(userData);
      console.log(user,'user Data')
    }
    else{
      setUser({});
    }
  },[reloadPage])

  const requestOtp = ()=>{
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-verfier', {
        'size': 'invisible',
        'callback': (response) => {
          onSignInSubmit();
        }
      }, auth);
  }
 

const handleOtpVerifcation = ()=>{
  console.log(otp)
  if(otp && otp.length === 6){
    setLoading(true)
   let confirmationResult = window.confirmationResult;
   confirmationResult.confirm(otp).then((loginResult)=>{

        console.log(loginResult,'Login Result')
      
        var user ={
          phoneNumber:loginResult.user.phoneNumber,
          accessToken:loginResult.user.accessToken,
          uId:loginResult.user.uid
        }
        signinUser(user).then(res => {
          console.log(res)

          userContext.setUserAuthState({
            accesstoken:res.accessToken,
            uId:res.uId,
            userInfo:res.phoneNumber,
            isAuthenticated:true,
          })
          toast("You have logged in successfully");
        })
         setOpen(false);
         setReloadPage(!reloadPage)
         setLoading(false)


         router.push('user/dashboard')

   })
   .catch((error)=>{
    setLoading(false)
    console.log(error)
    toast(error.message);
   })
  }
  else{
    toast("please enter 6 digit OTP.")
  }
}


  
const handleLogin = ()=>{
      setLoading(true)
      requestOtp()
      let appVerfier = window.recaptchaVerifier
      signInWithPhoneNumber(auth,phone,appVerfier).then((confirmationResult)=>{
        console.log(confirmationResult);
        window.confirmationResult = confirmationResult;
        setShowOtp(true);
        setLoading(false)
        toast("We have sent OTP onn your mobile number please enter your OTP.");
      })
      .catch((err)=>{
        alert(err)
        setLoading(false)
      })
  }

  const toggleNavVisibility = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setNavVisible(!navVisible)
  }

  const toggleMenu = () =>{
    console.log('toggled')
  }

  const logout = () => {
    userLogout().then(res => {
      console.log(res);
    })
    localStorage.clear();
    setReloadPage(!reloadPage)
    setUser({});
  }

  const list = (bgclr) => (
    <Box
      sx={{ width:250, height:'100%',backgroundColor:bgclr }}
    >
      <Box
      sx={{backgroundColor:'#ffe600', padding:'20px 0px ', display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        {!loading && user && user.isAuthenticated ? (
          <Typography style={{color:`${theme.palette.primary.dark}`}}>{user.phoneNumber}</Typography>
        ):
        ( 
        <Button sx={{backgroundColor:"#17a2b8",color:'white'}} onClick={handleOpen}>Sign up / Log In</Button>
          
        )}
       
      </Box>
      <List>
      {user && user.isAuthenticated && (
      <ListItem  disablePadding>
        <ListItemButton  onClick={() => router.push('user/dashboard')} >
          <ListItemIcon>
          <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Dashboard'/>
        </ListItemButton>
      </ListItem>
      )}


      <ListItem  disablePadding>
        <ListItemButton onClick={() => router.replace('/')} >
          <ListItemIcon>
          <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItemButton>
      </ListItem>
      <ListItem  disablePadding>
        <ListItemButton onClick={() => router.replace('/browse')} >
          <ListItemIcon>
          <MailIcon />
          </ListItemIcon>
          <ListItemText primary='Browse Events' />
        </ListItemButton>
      </ListItem>
      <ListItem  disablePadding>
        <ListItemButton>
          <ListItemIcon>
          <LocalActivityIcon />
          </ListItemIcon>
          <ListItemText primary='My Tickets' />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem  disablePadding>
        <ListItemButton>
          <ListItemIcon>
          <MailIcon />
          </ListItemIcon>
          <ListItemText primary='Contact Us' />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem  disablePadding>
        <ListItemButton>
        About us
        </ListItemButton>
      </ListItem>
      {user && user.isAuthenticated && (
      <ListItem  disablePadding onClick={() => logout()}>
        <ListItemButton>
        Logout
        </ListItemButton>
      </ListItem>
      )}
      </List>
      
    </Box>
  );

  console.log('Rendering')

  return (
    <>
    
    <Box sx={{ flexGrow: 1,position: 'fixed',top: 0,zIndex: 99,left:0,right:0 }}>
      <AppBar position="static" sx={{backgroundColor:'#1f2227'}}>
        <Toolbar>
          <IconButton
              size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleNavVisibility}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ flexGrow: 1,cursor:'pointer' }} onClick={() => router.push('/')}>
           <img src="/images/logos/logo.png" style={{height: '50px',marginTop: '10px'}}/>
          </div>
          <form>
              <input
                type='search'
                id='searchInput'
                placeholder="Search for event you love"
              />
          </form>
          <ModeToggler settings={settings} saveSettings={saveSettings} />
          {!user.isAuthenticated && (
         <Button color="inherit" onClick={handleOpen}>Login</Button>
          )}
         </Toolbar>
      </AppBar>
    </Box>
    <Drawer  width={800}  open={navVisible} onClose={toggleNavVisibility} >
          <AppBar title="Tasks" />
          {list(theme.palette.customColors.userTheme)}
        </Drawer>

        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Card sx={{ zIndex: 1,margin:'100px auto',backgroundColor:theme => `${theme.palette.customColors.userTheme}` }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
         
          <Box sx={{ mb: 6 }}>
          <img src="/images/logos/logo.png" style={{height: '50px',margin: '20px auto',display: 'block',marginTop: '0px'}}/>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
            <div id = "recaptcha-verfier"></div>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          {showOtp === false ? (
            <PhoneInput
            international
            placeholder='Enter phone number'
            value={phone}
            className="form-control d-flex"
            defaultCountry="IN"
            onChange={setPhone}
          />
         
            )
            :(
              <div>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    separator={<span> </span>}
                    containerStyle={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '1.5rem',
                      marginBottom: '4px',
                      paddingLeft: 10,
                    }}
                    inputStyle={{
                      borderStyle: 'solid',
                      padding: 10,
                      width: '85%',
                      height: 55,
                      borderWidth: 1,
                      borderColor: '#ddd',
                      borderRadius: 4,
                      fontWeight: '600',
                      fontSize: '1.5rem',
                    }}
                  />
                 
              </div>
            )}

          {showOtp === false ? (
            <div>
              {phone && isValidPhoneNumber(phone) ? (
                 <Button
                 fullWidth
                 size='large'
                 variant='contained'
                 sx={{background: '#ffe600',
                 color: '#1f2227',
                 padding: '5px 0px',
                 margin: '10px 0px',
                 fontSize: '1rem',
                 fontWeight: 'bold'}}
                 onClick={() => handleLogin()}
                 disabled={false}
               >
                 Login
               </Button>
              )
              :
              (
                <Button
                fullWidth
                size='large'
                variant='contained'
                sx={{ 
                padding: '5px 0px',
                margin: '10px 0px',
                fontSize: '1rem',
                fontWeight: 'bold'}}
                onClick={() => handleLogin()}
                disabled={true}
              >
                Login
              </Button>
              )}
            
            </div>
          )
            :(
              <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{  background: '#ffe600',
              color: '#1f2227',
              padding: '5px 0px',
              margin: '10px 0px',
              fontSize: '1rem',
              fontWeight: 'bold' }}
              onClick={() => handleOtpVerifcation()}
            >
              Verify
            </Button>
            )}
           
           
          </form>
          {
            loading && (
               <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center' }}>
                  <CircularProgress />
              </Box>)
          }
        </CardContent>
      </Card>
        </Modal>
    </>
  );
}
export default HomeAppBar;