// ** React Imports
import { useState,useEffect } from 'react'
import Image from 'next/image'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'


import { styled } from '@mui/material/styles'

import DateTimeComponent from './components/DateTimeComponent'
import LocationComponent from './components/LocationComponent'
import ContactComponent from './components/ContactComponent'

import { updateEventById } from 'service/admin/events'

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import {uploadEventImage} from '../../../service/admin/events'

import {
  deleteObject,
  getDownloadURL,
  uploadBytes,
  getStorage,
  listAll,
  ref ,
  uploadBytesResumable,
} from "firebase/storage";
import { ImageFilterHdr } from 'mdi-material-ui'



const EventStep4 = ({data,eventId,refreshData}) => {
    const [open, setOpen] = useState(false)
    const [loadding, setLoadding]= useState(false)


  useEffect(()=>{

    console.log('data in event step 4',data)
  },[])


  const handleDialogOpen =()=>{
  	setOpen(true)

  }

  const handleDialogClose=()=>{
  	setOpen(false)
  }

  const ticketForm =()=>{
  	return(

  		<Box>
  			<TextField sx={{marginBottom:'10px'}} fullWidth label='Ticket Name' placeholder='Enter event name'  />
  			<TextField sx={{marginBottom:'10px'}} fullWidth label='Color Code'   />
  			<TextField fullWidth label='Price' type='number' placeholder='Price'  />
           	<TextField sx={{marginBottom:'10px'}} type='number' fullWidth placeholder="Quantity Available"  />
           	<TextField sx={{marginBottom:'10px'}} type='number' fullWidth  placeholder="Minimum allowed quantity in a single booking"  />
           	<TextField sx={{marginBottom:'10px'}}type='number' fullWidth placeholder="Maximum allowed quantity in a single booking"  />
  			<TextField sx={{marginBottom:'10px'}} fullWidth label='Description' placeholder='Ticket Description'  />

  		</Box>


  		)
  }

    return(
        <form>
           <CardContent sx={{ paddingBottom: 0 }}>

          <Grid container spacing={7}>
          <Grid item xs={12} sm={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center',width:'100%',justifyContent:'space-between' }}>
          <Typography>BASIC</Typography>
          <Typography>1000QAR</Typography>
          <Typography>20</Typography>

          </Box>
          <Box  sx={{ display: 'flex', alignItems: 'center',width:'100%',justifyContent:'center' }}>
          		<Button onClick={()=>handleDialogOpen()}>Add Tickets</Button>
            </Box>
          </Grid>
            <Dialog open={open} onClose={handleDialogClose}>
            <DialogTitle>Ticket</DialogTitle>
            <DialogContent>
            	{ticketForm()}
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>handleClose('location')}>Add</Button>
            <Button onClick={handleDialogClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
          </Grid>
            </CardContent>

        </form>


    )
}

export default EventStep4;