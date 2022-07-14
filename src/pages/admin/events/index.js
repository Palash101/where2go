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

import {addEevent} from '../../../../service/admin/events'


import { useState } from 'react'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

function EventList() {
    const [eventName,seteventName] = useState('')
    const [country,setCountry] = useState('')
    const [currency,setCurrency] = useState('')
    const [eventType,seteventType] = useState('')
    const [loading,setLoading] = useState(false)

    
    const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    }
    
    const handleEventSubmit = ()=>{
        setLoading(true)
        addEevent(eventName,country,currency,eventType)
        .then((data)=>{
        console.log(data,'Returned Data')
        })
        setLoading(false)
    }

    const handLoadingState = () =>{
        if(loading){
            return(
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            )
        }
    }
    
 
    return ( 
        <>
        <Card>
        <CardHeader title='Create Event' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
            <form onSubmit={e => e.preventDefault()}>
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
                    <MenuItem value='UK'>UK</MenuItem>
                    <MenuItem value='USA'>USA</MenuItem>
                    <MenuItem value='Australia'>Australia</MenuItem>
                    <MenuItem value='Germany'>Germany</MenuItem>
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
                    <MenuItem value='UK'>QAR</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-select-label'>Event Type</InputLabel>
                    <Select
                    label='Event Type'
                    defaultValue='Classes'
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={(e)=>seteventType(e.target.value)}
                    >
                    <MenuItem value='Classes'>Classes</MenuItem>
                    <MenuItem value='Show'>Show</MenuItem>
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
                    <Button onClick={handleEventSubmit} type='button' variant='contained' size='large'>
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

export default EventList;