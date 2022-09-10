import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import { userAuth } from 'context/userContext'
import Translations from 'utils/trans'

function LocationComponent() {
  const userContext = userAuth()
  const locale = userContext.locale
  const t = Translations(locale)

  return (
    <Box>
      <TextField
        autoFocus
        id="name"
        label="{t.location}"
        type="text"
        fullWidth
        variant="standard"
        sx={{ marginBottom: '5px' }}
      />
    <Button variant="outlined">{`${t.use} ${t.map}`}</Button>
    </Box>
  )
}

export default LocationComponent
