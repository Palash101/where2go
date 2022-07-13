import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'


import { useState } from 'react'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

function EventList() {

    
      const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value })
      }
    
 
    return ( 
        <>
        <Card>
        <CardHeader title='Create Event' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
            <form onSubmit={e => e.preventDefault()}>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                <TextField fullWidth label='Event Name' placeholder='enter event name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-select-label'>Country</InputLabel>
                    <Select
                    label='Country'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
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
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    >
                    <MenuItem value='UK'>Classes</MenuItem>
                    <MenuItem value='UK'>Show</MenuItem>
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
                    <Button type='submit' variant='contained' size='large'>
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