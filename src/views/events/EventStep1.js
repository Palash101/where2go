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
import {
  deleteObject,
  getDownloadURL,
  uploadBytes,
  getStorage,
  listAll,
  ref ,
  uploadBytesResumable,
} from "firebase/storage";

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const EventStep1 = ({data,eventId}) => {
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('')
  const [eventAllImages,setEventAllImage]=useState([''])
  const storage = getStorage();
  const allImagesRef = ref(storage,'events/'+eventId)
  const imagePath ='events/'+eventId





  useEffect(()=>{


  },[])

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Event Name' placeholder='Enter event name'  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Event Type</InputLabel>
              <Select label='Event Type' >
                <MenuItem value='show'>Show</MenuItem>
                <MenuItem value='class'>Class</MenuItem>
                <MenuItem value='music'>Music</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select label='Country' >
                <MenuItem value='qar'>Qatar</MenuItem>
                <MenuItem value='Dubai'>Dubai</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Currency</InputLabel>
              <Select label='Currency' >
                <MenuItem value='QAR'>QAR</MenuItem>
                <MenuItem value='INR'>INR</MenuItem>
                <MenuItem value='USD'>USD</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField fullWidth label='Description' placeholder='Event Description' defaultValue='Event Description' multiline rows={4}/>
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default EventStep1
