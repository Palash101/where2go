// ** React Imports
import { useState,useEffect } from 'react'

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
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import DateTimeComponent from './components/DateTimeComponent'
import LocationComponent from './components/LocationComponent'
import ContactComponent from './components/ContactComponent'

import { updateEventDetails ,updateEventDate } from 'service/admin/events'



const EventStep2 = ({data,eventId}) => {

  const [openLocation, setopenLocation] = useState(false);
  const [openDescription, setopenDescription] = useState(false);
  const [openDate, setopenDate] = useState(false);

  const [description,setDescription]=useState('')
  const [location ,setLocation] = useState('')


  const [loading,setLoading]=useState(false)
  const [dateTimeArray,setDateTimeArray] =useState([])


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
};


  const handleDateTimeModal = (dateTime) =>{
    setDateTimeArray(dateTime)
  }
  const updateDateTime = ()=>{
    updateEventDate(eventId,dateTimeArray).then((res)=>console.log(res))
  }
  const handleChipDelete = ()=>{
    
    console.log(data.event_date,'delete Chip')

  }
  const handleChipClick = ()=>{

  }

  const updateDesceiption = async()=>{
    if(description == ''){
      alert('Description Can not be empty')
      return
    }
    setLoading(true)
     await updateEventDetails(eventId,description,'description')
          .then((data)=>console.log(data))
    setLoading(false)
    handleClose('description')
  }

  const updateLocation = async()=>{
    if(location == ''){
      alert('Please enter location')
      return
    }
    setLoading(true)
    await updateEventDetails(eventId,location,'event_location')
          .then((data)=>console.log(data))
    setLoading(false)
    handleClose('location')
  }
  useEffect(()=>{
  },[])



  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item sx={{paddingBottom:'1.25rem',display:'flex',justifyContent:'center',flexDirection:'column'}} xs={12} sm={12}>
            <Box sx={{marginBottom:'10px'}}>
              {Array.isArray(data.event_date) && data.event_date.map((item,key)=>(
                <Chip
                key={key}
                onClick={handleChipClick}
                onDelete={handleChipDelete}
                label={Date(item.date.seconds)}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
              />

              ))}
            
            </Box>
          <Button onClick={()=>handleClickOpen('date') } variant="contained">Date & Time</Button>
          <Dialog open={openDate} onClose={ ()=>handleClose('date')} maxWidth="md" fullWidth>
            <DialogTitle>Add Event Date Time</DialogTitle>
            <DialogContent >
              <DateTimeComponent handleDateTimeModal={handleDateTimeModal} />
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>updateDateTime()}>Add</Button>
            <Button onClick={()=>handleClose('date')}>Cancel</Button>
            </DialogActions>
        </Dialog>
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item sx={{paddingBottom:'1.25rem'}} xs={12} sm={6}>
          <Box sx={{marginBottom:'10px'}}>
              {data.event_location == undefined ?
              <Typography>Location Not Defined</Typography>:data.event_location == '' ? 
              <Typography>No Location Added. Please Add</Typography>
              :<Typography>{data.event_location}</Typography>
              }
              
            </Box>
          <Button variant="contained" onClick={()=>handleClickOpen('location')}>Address/Map co-ordinates</Button>
          <Dialog open={openLocation} onClose={ ()=>handleClose('location')}>
            <DialogTitle>Enter Event Location</DialogTitle>
            <DialogContent>
              <Box>
                <TextField
                      autoFocus
                      id="name"
                      label="Location"
                      type="text"
                      fullWidth
                      variant="standard"
                      sx={{marginBottom:'5px'}}
                      onChange={(e)=>{setLocation(e.target.value)}}
                      placeholder="ex: Near football stadium Queens mall Banglore"
                    />
                  <Button variant="outlined">Use Map</Button>
              </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={updateLocation}>Add</Button>
            <Button onClick={()=>handleClose('location')}>Cancel</Button>
            </DialogActions>
        </Dialog>
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item sx={{paddingBottom:'1.25rem', display:'flex',justifyContent:'center',flexDirection:'column'}} xs={12} sm={12}>
            <Box sx={{marginBottom:'10px'}}>
            {data.description == undefined ?
              <Typography>Description Not Defined</Typography>:data.description == '' ? 
              <Typography>No Description Added. Please Add</Typography>
              :<Typography>{data.description}</Typography>
              }
              
            </Box>
          <Button 
          endIcon={data.description != ''?<EditIcon/>:<AddIcon />}
          variant="contained" 
          onClick={()=>handleClickOpen('description')}>Event Descrption</Button>
          <Dialog fullWidth open={openDescription} onClose={ ()=>handleClose('description')}>
                <DialogTitle>Enter Event Description</DialogTitle>
                <DialogContent>
                <TextField
                  onChange={(e)=>setDescription(e.target.value)}
                    autoFocus
                    required
                    id="name"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    multiline
                    rows={5}
                    value={data.descrption}
                />
                </DialogContent>
                    
                <DialogActions>
                    <Button 
                    onClick={updateDesceiption }>Save</Button>
                    <Button onClick={()=>handleClose('description')}>Cancel</Button>
                </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />
      <ContactComponent />
      

      <Divider sx={{ margin: 0 }} />
      {loading === true && (

      
      <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center',backgroundColor: 'rgb(0 0 0 / 39%)',zIndex: 99999999,position: 'fixed',left: 0,
        right: 0,
        top: 0,
        bottom: 0, }}>
            <CircularProgress />
        </Box>
        )}
    </form>
  )
}

export default EventStep2
