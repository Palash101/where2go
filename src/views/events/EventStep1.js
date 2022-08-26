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
import {toast } from 'react-toastify';

//Service Imports
import {updateEventData} from '../../../service/admin/events'

import {userAuth} from 'context/userContext'
import Translations from 'utils/trans'


const EventStep1 = ({data,eventId,refreshData,allCategory,allLocation}) => {
  const userContext = userAuth()
  const locale = userContext.locale
  const t =  Translations(locale)

  const [name,setName] = useState('')
  const [type,setType] = useState(data.event_type)
  const [country,setCountry] = useState(data.country)
  const [currency,setCurrency] = useState(data.currency)
  const [category,setCategory] = useState(data.cat_id)
  const [loading,setLoading] = useState(false)
  const [floorType,setFloorType] = useState("")



 



  const updateData = async () =>{
    setLoading(true)
    const eventData = {
      name:name,
      type:type,
      country:country,
      currency:currency,
      cat_id:category,
      floor_type:floorType
    }
    console.log(eventData,'eventData')
    await updateEventData(eventId,eventData,locale).then((res)=> toast("Details updated successfully"))
    refreshData()
    setLoading(false)

  }

  const eventName = ()=>{
    console.log('calling event Name')
    if(data.hasOwnProperty('event_name')){
      const ename = data.event_name.hasOwnProperty(locale) ? data.event_name[locale] : data.event_name[Object.keys(data.event_name)[0]]
      return ename
    }

  }

  useEffect(()=>{
      setName(eventName());
      if(data.floor_type){
      setFloorType(data.floor_type)
      }
  },[locale])

  return (
    <CardContent>
     
      <form>
        <Grid container spacing={7}>

          <Grid item xs={12} sm={12}>
            <TextField 
            onChange={(e)=>setName(e.target.value)}
            fullWidth label='Event Name' 
            defaultValue={eventName()} 
            placeholder='Enter event name'  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select  onChange={(e)=>setCountry(e.target.value)} label='Country' defaultValue={country} >
              {
                allLocation.map((item,key)=>(
                      <MenuItem key={key} value={item.name}>{item.name}</MenuItem>
                ))

              }
              </Select>
            </FormControl>
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
              <InputLabel>Currency</InputLabel>
              <Select  onChange={(e)=>setCurrency(e.target.value)} label='Currency' defaultValue={currency} >
                <MenuItem value='QAR'>QAR</MenuItem>
                <MenuItem value='INR'>INR</MenuItem>
                <MenuItem value='USD'>USD</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Event Category</InputLabel>
                <Select
                    label='Category'
                    defaultValue={data.cat_id}
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={(e)=>setCategory(e.target.value)}
                    >

                    {allCategory.map((item ,key)=>{
                        const {docId,name} =item
                        return(
                        <MenuItem 
                        key={key} 
                        value={docId}>
                        {name.hasOwnProperty(locale) ? name[locale] : name[Object.keys(name)[0]]}
                        </MenuItem>
                        )
                    })
                    }
                    </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Event Ticket Type</InputLabel>
                
                <Select  onChange={(e)=>setFloorType(e.target.value)} sx={{marginBottom:'10px'}} fullWidth label='Ticket Floor Type' defaultValue={data.floor_type} >
                  <MenuItem value='' selected>Select Type</MenuItem>
                  <MenuItem value='0'>Dont have floor plan</MenuItem>
                  <MenuItem value='1'>Includes floor plan</MenuItem>
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
