import * as React from 'react';
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

 function HomeAppBar() {
  const {settings,saveSettings} = useContext(SettingsContext)
  return (
    <Box sx={{ flexGrow: 1,position: 'fixed',top: 0,zIndex: 99,left:0,right:0 }}>
      <AppBar position="static" sx={{backgroundColor:'#1f2227'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1,color:'yellow' }}>
            Where2Go
          </Typography>
          <ModeToggler settings={settings} saveSettings={saveSettings} />
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default HomeAppBar;