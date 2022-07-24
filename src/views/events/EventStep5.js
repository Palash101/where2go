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
import {updateEventData} from '../../../service/admin/events'
import {getAllLocations} from '../../../service/admin/location'
import {getAllCategory} from '../../../service/admin/category'


const EventStep5 = ({data,eventId}) => {
  const [name,setName] = useState(data.event_name)
  const [type,setType] = useState(data.event_type)
  const [country,setCountry] = useState(data.country)
  const [currency,setCurrency] = useState(data.currency)
  const [loading,setLoading] = useState(false)

  const [allCategory,setAllCategory] = useState([])
  const [allLocation,setAllLocations] = useState([])


  const updateData = () =>{
    setLoading(true)
    const eventData = {
      name:name,
      type:type,
      country:country,
      currency:currency
    }
    updateEventData(eventId,eventData).then((res)=>console.log(res))
    setLoading(false)

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
             <Checkbox  defaultChecked  label="Featured" />
            </Grid>
            <Grid item xs = {12} sm={6}>
             <Button variant="contained" onClick={()=>console.log('location')}>Save Settings</Button>
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
