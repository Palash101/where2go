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
import {toast } from 'react-toastify';

//Loader
import CircularProgress from '@mui/material/CircularProgress'


//Service
import {updateEventDetails} from '../../../service/admin/events'

const EventStep5 = ({data,eventId,refreshData}) => {
  const [featured,setFeature] = useState(data.featured)
  const [status,setStatus] = useState(data.status)
  const [loading,setLoading] = useState(false)


  const updateData = async() =>{
    if(data.description && data.event_date && data.images && data.tickets){
      setLoading(true)
      await updateEventDetails(eventId,'published','status').then((res)=>toast("Status updated successfully"))
      setLoading(false)
      refreshData()
    }
    else{
      toast("Please add description,events,images and tockets.")
    }
  }
  const updateFeature = async() =>{
    if(data.images){
      setLoading(true)
      await updateEventDetails(eventId,'true','featured').then((res)=>toast("fetured updated successfully"))
      setLoading(false)
      refreshData()
    }
    else{
      toast("Please add event images.")
    }
  }

  useEffect(()=>{
    console.log(data,'asdasd')
  },[])

  return (
    <CardContent>
      <form>

        <Box sx={{display:'flex'}}>
          <Box sx={{minWidth:300,backgroundColor:'rgba(255,255,255,0.1)',m:5,borderRadius:'12px',overflow:'hidden'}}>
            <Typography style={{margin:0,padding:5,fontSize:18,borderBottomWidth:1,backgroundColor:'rgba(255,255,255,0.1)',textAlign:'center'}}>Publish Status </Typography>
            <Typography sx={{p:5,textAlign:'center'}}>{data.status && data.status === 'published' ? 'Pubished' : 'Not Published'} </Typography>
            <Button fullWidth={true} variant="contained" onClick={updateData}>Publish Event</Button>
          </Box>
          <Box sx={{minWidth:300,backgroundColor:'rgba(255,255,255,0.1)',m:5,borderRadius:'12px',overflow:'hidden'}}>
            <Typography style={{margin:0,padding:5,fontSize:18,borderBottomWidth:1,backgroundColor:'rgba(255,255,255,0.1)',textAlign:'center'}}>Featured Status </Typography>
            <Typography sx={{p:5,textAlign:'center'}}>{data.featured && data.featured === 'true' ? 'Featured' : 'Not Featured'} </Typography>
            <Button fullWidth={true} variant="contained" onClick={updateFeature}>Fetured Event</Button>
          </Box>
        </Box>


      
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
