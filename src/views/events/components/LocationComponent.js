import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

function LocationComponent() {
  return (
    <Box>
      <TextField
        autoFocus
        id="name"
        label="Location"
        type="text"
        fullWidth
        variant="standard"
        sx={{ marginBottom: '5px' }}
      />
      <Button variant="outlined">Use Map</Button>
    </Box>
  )
}

export default LocationComponent
