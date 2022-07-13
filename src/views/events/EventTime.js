// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

const EventTime = () => {
  // ** States
  const [values, setValues] = useState({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  const [openLocation, setopenLocation] = useState(false);
  const [openDescription, setopenDescription] = useState(false);
  const [openDate, setopenDate] = useState(false);
  const [openDateTime, setopenDateTime] = useState(false);

  const handleClickOpen = (type) => {
    if(type == 'description'){
        setopenDescription(true)
    }
    else if(type == 'location'){
        setopenLocation(true);
    }
    else if(type == 'date'){
      setopenDate(true);
  }
  else if(type == 'dateTime'){
    setopenDateTime(true);
}
       
  };

  const handleClose = (type) => {
    if(type == 'description'){
        setopenDescription(false)
    }
    else if(type == 'location'){
        setopenLocation(false);

    }
    else if(type == 'date'){
      setopenDate(false);

  }
  else if(type == 'dateTime'){
    setopenDateTime(false);

}
        
  };

  const handleDateTimeModal = () =>{
    console.log('hello')
  }

  // Handle Current Password
  const handleCurrentPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
          <Button onClick={()=>handleClickOpen('date') } variant="contained">Date & Time</Button>
          <Dialog open={openDate} onClose={ ()=>handleClose('date')}>
            <DialogTitle>Add Event Date Time</DialogTitle>
            <DialogContent>
            <Box>
            <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
              Cupcake ipsum dolor sit amet chocolate bar pastry sesame snaps.
            </Typography>
            <Box onClick={()=>handleClickOpen('dateTime')} width='100px'height='150px' bgcolor='red' alignItems='center' 
            sx={{
              display:'flex',
              padding:'9px'
            }}
            >
              +
              Add Day
            </Box>
            <Dialog open={openDateTime} onClose={ ()=>handleClose('dateTime')}>
              <DialogTitle>Enter Event Location</DialogTitle>
              <DialogContent>
              <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Location"
                  type="text"
                  fullWidth
                  variant="standard"
              />
              </DialogContent>
              <Button variant="contained">Add Map Cordinate</Button>
              <DialogActions>
              <Button onClick={()=>handleClose('dateTime')}>Add</Button>
              <Button onClick={()=>handleClose('dateTime')}>Cancel</Button>
              </DialogActions>
          </Dialog>

            </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>handleClose('date')}>Add</Button>
            <Button onClick={()=>handleClose('date')}>Cancel</Button>
            </DialogActions>
        </Dialog>
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
          <Button variant="contained" onClick={()=>handleClickOpen('location')}>Address/Map co-ordinates</Button>
          <Dialog open={openLocation} onClose={ ()=>handleClose('location')}>
            <DialogTitle>Enter Event Location</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Location"
                type="text"
                fullWidth
                variant="standard"
            />
            </DialogContent>
            <Button variant="contained">Add Map Cordinate</Button>
            <DialogActions>
            <Button onClick={()=>handleClose('location')}>Add</Button>
            <Button onClick={()=>handleClose('location')}>Cancel</Button>
            </DialogActions>
        </Dialog>
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
          <Button variant="contained" onClick={()=>handleClickOpen('description')}>Event Descrption</Button>
          <Dialog fullWidth open={openDescription} onClose={ ()=>handleClose('description')}>
                <DialogTitle>Enter Event Description</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    id="name"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    multiline
                    rows={5}
                />
                </DialogContent>
                    
                <DialogActions>
                    <Button onClick={()=>handleClose('description')}>Add</Button>
                    <Button onClick={()=>handleClose('description')}>Cancel</Button>
                </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />

      <CardContent>
        <Box sx={{ mt: 1.75, display: 'flex', alignItems: 'center' }}>
          <KeyOutline sx={{ marginRight: 3 }} />
          <Typography variant='h6'>Two-factor authentication</Typography>
        </Box>

        <Box sx={{ mt: 5.75, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              maxWidth: 368,
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Avatar
              variant='rounded'
              sx={{ width: 48, height: 48, color: 'common.white', backgroundColor: 'primary.main' }}
            >
              <LockOpenOutline sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Typography sx={{ fontWeight: 600, marginTop: 3.5, marginBottom: 3.5 }}>
              Two factor authentication is not enabled yet.
            </Typography>
            <Typography variant='body2'>
              Two-factor authentication adds an additional layer of security to your account by requiring more than just
              a password to log in. Learn more.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 11 }}>
          <Button variant='contained' sx={{ marginRight: 3.5 }}>
            Save Changes
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}

export default EventTime
