import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import CogOutline from 'mdi-material-ui/CogOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import EmailIcon from '@mui/icons-material/Email';
import MessageOutline from 'mdi-material-ui/MessageOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import Badge from '@mui/material/Badge'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import DeleteIcon from '@mui/icons-material/Delete';

import { Typography } from '@mui/material';
import { useState, Fragment } from 'react'
import InputAdornment from '@mui/material/InputAdornment';



const BadgeContentSpan = styled('span')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
  }))

function ContactComponent(){
    const [anchorEl, setAnchorEl] = useState(null)
    const [inputElArray,setInputElArray] = useState([])
    const [open, setOpen] = useState(false);

    const router = useRouter()


    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
  
    const handleDropdownOpen = event => {
      setAnchorEl(event.currentTarget)
    }
  
    const handleDropdownClose = url => {
      if (url) {
        router.push(url)
      }
      setAnchorEl(null)
    }

    const getIconType =(type)=>{
      if(type == 'email')return (<EmailOutline sx={{ marginRight: 2 }} />)
      if(type == 'whatsapp')return (<WhatsAppIcon sx={{ marginRight: 2 }} />)
      if(type == 'phone')return (<PhoneIcon sx={{ marginRight: 2 }} />)
      if(type == 'instagram')return (<InstagramIcon sx={{ marginRight: 2 }} />)

    }
    const getInputElType = (icon,type)=>{
      const fieldType = type
      const fieldIcon = getIconType(icon)
        return(
          <Box>
          <TextField
          required
          id="outlined-required"
          type={fieldType}
          label="Required"
          defaultValue="user@example.com"
          InputProps={{
            startAdornment: <InputAdornment position="start">
            {fieldIcon}
            </InputAdornment>,
          }}
        />
        <DeleteIcon 
        onClick={removeElFromArray}

        />
        </Box>

          )

    }

    const addInputElToArray = (icon,type)=>{
      setInputElArray([...inputElArray,getInputElType(icon,type)])
    }

    const removeElFromArray = ()=>{

    }
  
    const styles = {
      py: 2,
      px: 4,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      color: 'text.primary',
      textDecoration: 'none',
      '& svg': {
        fontSize: '1.375rem',
        color: 'text.secondary'
      }
    }
    
    


    const renderContactDialog =()=>{
        return(
            <Fragment>
            <IconButton onClick={handleDropdownOpen}>
                <AddCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleDropdownClose()}
              sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem sx={{ p: 0 }} onClick={() => addInputElToArray('email','email')}>
                <Box sx={styles}>
                  <EmailOutline sx={{ marginRight: 2 }} />
                  Email
                </Box>
              </MenuItem>
              <MenuItem sx={{ p: 0 }} onClick={() => addInputElToArray('phone','number')}>
                <Box sx={styles}>
                  <PhoneIcon sx={{ marginRight: 2 }} />
                  Phone
                </Box>
              </MenuItem>
              <Divider />
              <MenuItem sx={{ p: 0 }} onClick={() => addInputElToArray('whatsapp','number')}>
                <Box sx={styles}>
                  <WhatsAppIcon sx={{ marginRight: 2 }} />
                  Whatsapp
                </Box>
              </MenuItem>
              <MenuItem sx={{ p: 0 }} onClick={() => addInputElToArray('instagram','text')}>
                <Box sx={styles}>
                  <InstagramIcon sx={{ marginRight: 2 }} />
                  Instagram
                </Box>
              </MenuItem>
            </Menu>
          </Fragment>
        )
    }
    return(
    <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item sx={{paddingBottom:'1.25rem'}} xs={12} sm={6}>
          <Button variant="contained" onClick={handleClickOpen}>Add Contact</Button>
          <Dialog maxWidth="sm" fullWidth open={open} onClose={ handleClose}>
            <DialogTitle sx={{backgroundColor:'#373c44',color:'white',fontSize:'1rem'}}>Event Contacts</DialogTitle>
            <Typography padding='10px' component='p'>Add contact details for the visitors to your event page and your event attendees.</Typography>
            <DialogContent>
              <Box sx={{width:'100%'}}>
                {inputElArray.map((el,key)=>(el)
                )}
              </Box>
                <Divider sx={{ margin: 0 }} />
                {renderContactDialog()}
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Add</Button>
            <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
          </Grid>
        </Grid>
      </CardContent>

    )
}

export default ContactComponent;