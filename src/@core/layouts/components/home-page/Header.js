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
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

import themeConfig from 'src/configs/themeConfig'
import router from 'next/router';




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


 function HomeAppBar(props) {
  const {settings,saveSettings} = useContext(SettingsContext)
  console.log(settings,'settngs')
  const [navVisible, setNavVisible] = useState(false)
  const theme  = useTheme()


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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Drawer  width={800}  open={navVisible} onClose={toggleNavVisibility} >
          <AppBar title="Tasks" />
          {list(theme.palette.customColors.userTheme)}
        </Drawer>
    </>
  );
}
export default HomeAppBar;