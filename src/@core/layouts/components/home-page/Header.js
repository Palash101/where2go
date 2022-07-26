import * as React from 'react';
import { useState } from 'react';
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
import { userAuth } from 'context/userContext';
import { emailPasswordSigin } from 'service/auth'; 
import CircularProgress from '@mui/material/CircularProgress';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';


const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))


const list = (bgclr) => (
  <Box
    sx={{ width:250, height:'100%',backgroundColor:bgclr }}
  >
    <Box
    sx={{backgroundColor:'#ffe600', padding:'20px 0px ', display:'flex',alignItems:'center',justifyContent:'center'}}
    >
      <Button sx={{backgroundColor:"#17a2b8",color:'white'}}>Sign up / Log In</Button>

    </Box>
    <List>
    <ListItem  disablePadding>
      <ListItemButton>
        <ListItemIcon>
        <HomeIcon />
        </ListItemIcon>
        <ListItemText primary='Home' />
      </ListItemButton>
    </ListItem>
    <ListItem  disablePadding>
      <ListItemButton>
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
    </List>
   
  </Box>
);

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
  console.log(settings,'settngs')
  const [navVisible, setNavVisible] = useState(false)
  const theme  = useTheme()

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [phone, setPhone] = useState('');

  const [values, setValues] = useState({
    otp: '',
    showOtp: false,
    phone:'',
  })
  const [loading, setLoading] = useState(false);

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  
  const handleLogin = ()=>{
    if(values.phone == ''){
      alert('Please enter vaild phone number')
    }
    else{
      setLoading(true)
      emailPasswordSigin(values.phone)
      .then((data)=>{
      
        setLoading(false)
        router.push('/admin')
    
      })
      .catch((err)=>{
        alert(err)
        setLoading(false)

      })
    }
  }

  const verify = () => {

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
          <ModeToggler settings={settings} saveSettings={saveSettings} />
          <Button color="inherit" onClick={handleOpen}>Login</Button>
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
          <Card sx={{ zIndex: 1,margin:'100px auto' }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
         
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          {values.showOtp === false ? (
            <PhoneInput
            placeholder='Enter phone number'
            value={phone}
            className="form-control d-flex"
            defaultCountry="IN"
            onChange={setPhone}
          />
         
            )
            :(
              <TextField onChange={handleChange('otp')} autoFocus fullWidth id='otp' label='OTP' sx={{ marginBottom: 4 }} />
            )}

          {values.showOtp === false ? (
             <Button
             fullWidth
             size='large'
             variant='contained'
             sx={{ marginBottom: 7 }}
             onClick={() => handleLogin()}
           >
             Login
           </Button>
          )
            :(
              <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={() => verify()}
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