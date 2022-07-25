import{useEffect} from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router'
import {addEevent} from '../../../../service/admin/events'

import { useState } from 'react'
import {getAllCategory} from '../../../../service/admin/category'
import {getAllLocations} from '../../../../service/admin/location'


function EventCreate() {
    const [eventName,seteventName] = useState('')
    const [country,setCountry] = useState('')
    const [currency,setCurrency] = useState('')
    const [eventType,seteventType] = useState('')
    const [eventCat, setEventCat] = useState('')
    const [loading,setLoading] = useState(false)
    const router = useRouter()

    const [allCategory,setAllCategory] = useState([])
    const [allLocation,setAllLocations] = useState([])




    
    const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    }
    
    const handleEventSubmit = async (event)=>{
        event.preventDefault();
        setLoading(true)
        console.log(loading)
         await addEevent(eventName,country,currency,eventType,eventCat)
        .then((data)=>{

        console.log(data,'Returned Data')
        router.push('events/'+data.docId)
        })
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

    
    if(loading == false){
    return ( 
        
        <>
        <Card>
        <CardHeader title='Create Event' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
            <form onSubmit={handleEventSubmit}>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                <TextField 
                fullWidth 
                label='Event Name' placeholder='enter event name' 
                onChange={(e)=>seteventName(e.target.value)}
                />
                {eventName == ''?<FormHelperText>Please enter    event name</FormHelperText>:null}
                
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-select-label'>Country</InputLabel>
                    <Select
                    label='Country'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={(e)=>setCountry(e.target.value)}
                    >
                    {
                        allLocation.map((location)=>(
                            <MenuItem value={location.name}>{location.name}</MenuItem>

                        ))
                    }
                    <MenuItem value='Dubai'>Dubai</MenuItem>
                    <MenuItem value='Jordan'>Jordan</MenuItem>
            
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-select-label'>Currency</InputLabel>
                    <Select
                    label='Currency'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={(e)=>setCurrency(e.target.value)}
                    >
                    
                    <MenuItem value='QAR'>QAR</MenuItem>
                    <MenuItem value='INR'>INR</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-select-label'>Event Type</InputLabel>
                    <Select
                    label='Event Type'
                    defaultValue='Classes'
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={(e)=>seteventType(e.target.value)}
                    >
                     <MenuItem value='Show'>Show</MenuItem>
                <MenuItem value='Music'>Music</MenuItem>
                <MenuItem value='Game'>Game</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                 <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-select-label'>Event Category</InputLabel>
                    <Select
                    label='Category'
                    defaultValue='Classes'
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={(e)=>setEventCat(e.target.value)}
                    >

                    {allCategory.map((cat)=>(
                        <MenuItem value={cat.name}>{cat.name}</MenuItem>

                        ))
                    }
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                <Box
                    sx={{
                    gap: 5,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                    }}
                >
                    <Button  type='submit' variant='contained' size='large'>
                    Create Event
                    </Button>
                </Box>
                </Grid>
            </Grid>
            </form>
        </CardContent>
        </Card>
        </>
     );
    }
    else{
        return(

            <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center' }}>
            <CircularProgress />
        </Box>
        )
        

    }
}

export default EventCreate;