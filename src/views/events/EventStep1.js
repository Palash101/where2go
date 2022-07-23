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
import CircularProgress from '@mui/material/CircularProgress'
import {updateEventData} from '../../../service/admin/events'
import {getAllLocations} from '../../../service/admin/location'
import {getAllCategory} from '../../../service/admin/category'


const EventStep1 = ({data,eventId}) => {
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
    const getCat =  async()=>{
        const catData =  await getAllCategory()
        const catArray =[];
        catData.docs.forEach(item=>{
        catArray.push(item.data())
       })
        setAllCategory(catArray)
      }
         getCat()

        const getLocation =  async()=>{
        const locationData =  await getAllLocations()
        const locationArray =[];
        locationData.docs.forEach(item=>{
        locationArray.push(item.data())
           })
            setAllLocations(locationArray)
          }
            getLocation()


  },[])

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>

          <Grid item xs={12} sm={6}>
            <TextField 
            onChange={(e)=>setName(e.target.value)}
            fullWidth label='Event Name' 
            defaultValue={name} 
            placeholder='Enter event name'  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Event Type</InputLabel>
              <Select  onChange={(e)=>setType(e.target.value)} label='Event Type' defaultValue={type} >
                <MenuItem value='Show'>Show</MenuItem>
                <MenuItem value='Music'>Music</MenuItem>
                <MenuItem value='Game'>Game</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select  onChange={(e)=>setCountry(e.target.value)} label='Country' defaultValue={country} >
              {
                allLocation.map((item)=>(
                      <MenuItem value={item.name}>{item.name}</MenuItem>
                ))

              }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Currency</InputLabel>
              <Select  onChange={(e)=>setCurrency(e.target.value)} label='Currency' defaultValue={currency} >
                <MenuItem value='QAR'>QAR</MenuItem>
                <MenuItem value='INR'>INR</MenuItem>
                <MenuItem value='USD'>USD</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item xs={12} sm={12}>
            <TextField fullWidth label='Description' placeholder='Event Description' defaultValue='Event Description' multiline rows={4}/>
          </Grid> */}

          <Grid item xs={12}>
            <Button onClick={updateData} variant='contained' sx={{ marginRight: 3.5 }}>
              Update
            </Button>
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

export default EventStep1
