// ** React Imports
import { useState, useEffect,useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Chip from '@mui/material/Chip'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'

import DateTimeComponent from './components/DateTimeComponent'
import SlotComponent from './components/SlotComponent'
import LocationComponent from './components/LocationComponent'
import ContactComponent from './components/ContactComponent'

import {
  updateEventDetails,
  updateEventDate,
  deleteEventDate,
  updateEventSlot,
  deleteEventSlot
} from 'service/admin/events'
import { toast } from 'react-toastify'

import { userAuth } from 'context/userContext'
import Translations from 'utils/trans'
import Editor from 'src/@core/components/editor/Editor'
import Autocomplete from "react-google-autocomplete";

const EventStep2 = ({ data, eventId, refreshData }) => {
  const [openState, setOpenState] = useState({
    description: false,
    dateTime: false,
    location: false,
    contact: false,
    slot:false,
  })

  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')

  const [loading, setLoading] = useState(false)
  const [dateTimeArray, setDateTimeArray] = useState([])
  const [slotArray, setSlotArray] = useState([])
  const [editorLoaded, setEditorLoaded] = useState(false);

  const userContext = userAuth()
  const locale = userContext.locale
  const t = Translations(locale)


  const handleClickOpen = (type) => {
    setEditorLoaded(true);
    setOpenState({ ...openState, [type]: true })
  }

  const handleClose = (type) => {
    setOpenState({ ...openState, [type]: false })
  }

  const handleDateTimeModal = (dateTime) => {
    setDateTimeArray(dateTime)
  }
  const handleSloteModal = (slot) => {
    setSlotArray(slot)
  }

  const updateDateTime = async () => {
    setLoading(true)
    await updateEventDate(eventId, dateTimeArray).then((res) =>
      console.log(res),
    )
    handleClose('dateTime')
    refreshData()
    setLoading(false)
  }

  const updateSlot = async () => {
    setLoading(true);
    await updateEventSlot(eventId, slotArray).then((res) =>
    console.log(res),
  )
  handleClose('dateTime')
  refreshData()
  setLoading(false)

  }

  const handleChipDelete = async (event_date) => {
    console.log(event_date, 'delete Chip')
    setLoading(true)
    if(data.floor_type === '1'){
    await deleteEventDate(eventId, event_date).then((res) => console.log(res))
    }
    else{
      await deleteEventSlot(eventId, event_date).then((res) => console.log(res))
    }
    refreshData()
    setLoading(false)
  }
  const handleChipClick = () => {}

  const updateDesceiption = async () => {
    if (description == '') {
      alert('Description Can not be empty')
      return
    }
    setLoading(true)
    await updateEventDetails(eventId, description, 'description', locale).then(
      (data) => console.log(data),
    )
    handleClose('description')
    refreshData()
    setLoading(false)
  }

  const updateLocation = async () => {
    if (location == '' && data.event_location === '') {
      alert('Please enter location')
      return
    }
    else if(data.event_location != '' && location == '' ){
      handleClose('location')
      return
    }
    setLoading(true)
    await updateEventDetails(eventId, location.formatted_address, 'event_location').then((data) =>
      console.log(data),
    )
    await updateEventDetails(eventId, location.place_id, 'place_id').then((data) =>
      console.log(data),
    )
    setLoading(false)
    refreshData()
    handleClose('location')
  }
  
  const arValSet = (data,para,val) => {
    if (data.hasOwnProperty(val)) {
      const ename = para.hasOwnProperty(locale)
        ? para[locale]
        : para[Object.keys(para)[0]]
      return ename
    }
  }

  useEffect(() => {
    setDescription(arValSet(data,data.description,'description'))
    console.log('descc',arValSet(data,data.description,'description'))
  }, [dateTimeArray,locale,setOpenState])

  const dateTimeChip = (data) => {
    return (
      <p>
        {data.date} / From {data.from} To {data.to}
      </p>
    )
  }

  return (
    <form>
      {data.floor_type === '1' ? (
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid
            item
            sx={{
              paddingBottom: '1.25rem',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
            xs={12}
            sm={12}
          >
            <Box sx={{ marginBottom: '10px' }}>
              {Array.isArray(data.event_date) &&
                data.event_date.map((item, key) => (
                  <Chip
                    key={key}
                    onClick={handleChipClick}
                    onDelete={() => handleChipDelete(item)}
                    label={dateTimeChip(item)}
                    deleteIcon={<DeleteIcon />}
                    variant="outlined"
                    sx={{ marginRight: '15px' }}
                  />
                ))}
              <Button
                onClick={() => handleClickOpen('dateTime')}
                variant="contained"
              >
                Date & Time
              </Button>
            </Box>
            <Dialog
              open={openState.dateTime}
              onClose={() => handleClose('dateTime')}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle>{t.addeventdatetime}</DialogTitle>
              <DialogContent>
                <DateTimeComponent handleDateTimeModal={handleDateTimeModal} />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => updateDateTime()}>{t.add}</Button>
                <Button onClick={() => handleClose('dateTime')}>{t.cancel}</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </CardContent>
      ):
      (
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid
            item
            sx={{
              paddingBottom: '1.25rem',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
            xs={12}
            sm={12}
          >
            <Box sx={{ marginBottom: '10px' }}>
              {Array.isArray(data.slots) &&
                data.slots.map((item, key) => (
                  <Chip
                    key={key}
                    onClick={handleChipClick}
                    onDelete={() => handleChipDelete(item)}
                    label={item}
                    deleteIcon={<DeleteIcon />}
                    variant="outlined"
                    sx={{ marginRight: '15px' }}
                  />
                ))}
              <Button
                onClick={() => handleClickOpen('slot')}
                variant="contained"
              >
                Add Time Slots
              </Button>
            </Box>
            <Dialog
              open={openState.slot}
              onClose={() => handleClose('slot')}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle>Add Event Slots</DialogTitle>
              <DialogContent>
                  <SlotComponent handleSloteModal={handleSloteModal} />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => updateSlot()}>Add</Button>
                <Button onClick={() => handleClose('slot')}>Cancel</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </CardContent>
      )}

      <Divider sx={{ margin: 0 }} />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item sx={{ paddingBottom: '1.25rem' }} xs={12} sm={6}>
            <Box sx={{ marginBottom: '10px' }}>
              {data.event_location == undefined ? (
                <Typography>{t.locationnotdefined}</Typography>
              ) : data.event_location == '' ? (
                <Typography>No Location Added. Please Add</Typography>
              ) : (
                <Typography>{data.event_location}</Typography>
              )}
            </Box>
            <Button
              variant="contained"
              onClick={() => handleClickOpen('location')}
            >
              {t.addressmapcoordinates}
            </Button>
            <Dialog
              open={openState.location}
              onClose={() => handleClose('location')}
            >
              <DialogTitle>{t.entereventlocation}</DialogTitle>
              <DialogContent>
                <Box>
                  {/* <TextField
                    autoFocus
                    id="name"
                    label="Location"
                    type="text"
                    fullWidth
                    variant="standard"
                    sx={{ marginBottom: '5px' }}
                    onChange={(e) => {
                      setLocation(e.target.value)
                    }}
                    placeholder="ex: Near football stadium Queens mall Banglore"
                  /> */}
                 <Autocomplete
                      apiKey={'AIzaSyBHL3C8OAZx0ifZFUGOr6pJSKTQBgDcUFk'}
                      onPlaceSelected={(place) => {
                        console.log(place);
                        setLocation(place)
                      }}
                      options={{types:["(regions)"],
                      }}
                      defaultValue={data.event_location}
                      style={{
                        padding: '13px',
                        display: 'block',
                        width: '541px',
                        background: 'transparent',
                        border: '1px solid #fff',
                        borderRadius: '4px',
                        outline: 0,
                        color: '#fff',
                        height: '67px',

                      }}
                    />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={updateLocation}>{t.add}</Button>
                <Button onClick={() => handleClose('location')}>{t.cancel}</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid
            item
            sx={{
              paddingBottom: '1.25rem',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
            xs={12}
            sm={12}
          >
            <Box sx={{ marginBottom: '10px' }}>
              {data.hasOwnProperty('description') ? (
                data.description.hasOwnProperty(locale) ? (
                  <Typography> {data.description[locale]}</Typography>
                ) : (
                  <Typography>
                    {data.description[Object.keys(data.description)[0]]}
                  </Typography>
                )
              ) : (
                <Typography>{t.descriptionnotdefined}</Typography>
              )}
              <Button
                endIcon={data.description != '' ? <EditIcon /> : <AddIcon />}
                variant="contained"
                sx={{ marginTop: '10px' }}
                onClick={() => handleClickOpen('description')}
              >
                {`${t.event} ${t.descrption}`}
              </Button>
            </Box>

            <Dialog
              fullWidth
              open={openState.description}
              onClose={() => handleClose('description')}
            >
              <DialogTitle>{`${t.enter} ${t.event} ${t.descrption}`}</DialogTitle>
              <DialogContent>
                <TextField
                  onChange={(e) => setDescription(e.target.value)}
                  autoFocus
                  required
                  id="name"
                  label={t.descrption}
                  type="text"
                  fullWidth
                  value={description}
                  variant="standard"
                  multiline
                  rows={5}
                />

                {/* <Editor
                  value={data.description?.hasOwnProperty(locale)
                    ? data.description[locale]
                    : ''}
                  name={'descrption'}
                  placeholder={t.descrption}
                  onChange={(data) => {
                    setDescription(data);
                  }}
                  editorLoaded={editorLoaded}
                /> */}
              </DialogContent>

              <DialogActions>
                <Button onClick={updateDesceiption}>{t.save}</Button>
                <Button onClick={() => handleClose('description')}>
                  {t.cancel}
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </CardContent>

      {/* <Divider sx={{ margin: 0 }} />
      <ContactComponent /> */}

      <Divider sx={{ margin: 0 }} />
      {loading === true && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(0 0 0 / 39%)',
            zIndex: 99999999,
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </form>
  )
}

export default EventStep2


