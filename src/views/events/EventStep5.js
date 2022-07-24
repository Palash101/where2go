// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox';

//Loader
import CircularProgress from '@mui/material/CircularProgress'


//Service
import {updateEventDetails} from '../../../service/admin/events'

const EventStep5 = ({data,eventId,refreshData}) => {
  const [featured,setFeature] = useState(data.featured)
  const [status,setStatus] = useState(data.status)
  const [loading,setLoading] = useState(false)


  const updateData = async() =>{
    setLoading(true)
   await  updateEventDetails(eventId,'published','status').then((res)=>console.log(res))
    setLoading(false)
    refreshData()

  }

  useEffect(()=>{
    
  },[])

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <Typography>Featured</Typography>
          </Grid>
             <Grid item xs={12} sm={6}>
             <Checkbox onChange={(e)=>setFeature(e.target.value)} defaultChecked  label="Featured" />
            </Grid>
            <Grid item xs = {12} sm={6}>
              <Typography>Current Status : {data.status} </Typography>
             <Button variant="contained" onClick={updateData}>Publish Event</Button>
          </Grid>
          </Grid>
      </form>
      {loading === true && ( 
        <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center',backgroundColor: 'rgb(0 0 0 / 39%)',zIndex: 99999999,position: 'fixed',left: 0,
          right: 0,
          top: 0,
          bottom: 0, }}>
              <CircularProgress />
          </Box>
       )}
    </CardContent>
  )
}

export default EventStep5
