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
import Checkbox from '@mui/material/Checkbox'
import { toast } from 'react-toastify'
import Switch from '@mui/material/Switch'

//Loader
import CircularProgress from '@mui/material/CircularProgress'

//Service
import { updateEventDetails,getTicketCollection } from '../../../service/admin/events'

import { userAuth } from 'context/userContext'
import Translations from 'utils/trans'

const EventStep5 = ({ data, eventId, refreshData }) => {

  const userContext = userAuth()
  const locale = userContext.locale
  const t = Translations(locale)

  const [featured, setFeature] = useState(data.featured)
  const [status, setStatus] = useState(data.status)
  const [loading, setLoading] = useState(false)
  const [ticketCollectionData, setticketCollectionData] = useState([])
  const [checked, setChecked] = useState(data.status === 'published')
  const [checked1, setChecked1] = useState(data.featured === 'true')

  useEffect(() => {
    console.log(data, 'asdasd')
    getTicketsData()
  }, [])


  const updateData = async (event) => {
    
    if (data.description && data.event_location && (data.event_date || data.slots) && data.images && ticketCollectionData) {
      setLoading(true)
      setChecked(event.target.checked)
      if (event.target.checked === false) {
        setStatus('draft')
        await updateEventDetails(eventId, 'draft', 'status').then((res) =>
          toast('Status updated successfully'),
        )
        setLoading(false)
        refreshData()
      } else {
        setStatus('published')
        await updateEventDetails(eventId, 'published', 'status').then((res) =>
          toast('Status updated successfully'),
        )
        setLoading(false)
        refreshData()
      }
    } else {
      toast('Please add description, events, event location, images and tickets.')
    }
  }
  const updateFeature = async (event) => {
    if (data.images) {
      setLoading(true)
      setChecked1(event.target.checked)
      if (event.target.checked === false) {
        setFeature('false')
        await updateEventDetails(eventId, 'false', 'featured').then((res) =>
          toast('fetured updated successfully'),
        )
        setLoading(false)
        refreshData()
      } else {
        setFeature('true')
        await updateEventDetails(eventId, 'true', 'featured').then((res) =>
          toast('fetured updated successfully'),
        )
        setLoading(false)
        refreshData()
      }
    } else {
      toast('Please add event images.')
    }
  }

 

  const getTicketsData = async () => {
    const tickets = await getTicketCollection(eventId)
    const ticketsArray = []
    tickets.docs.forEach((item) => {
      const docId = { docId: item.id }
      const data = Object.assign(docId, item.data())
      ticketsArray.push(data)
    })

    console.log(ticketsArray,'ticketsArray')
    setticketCollectionData(ticketsArray)
    
  }

  return (
    <CardContent>
      <form>
        <Box
          sx={{
            padding: '10px 20px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            m: 5,
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography style={{ margin: 0, fontSize: 18 }}>
              {t.published}{' '}
            </Typography>
            <Typography style={{ fontSize: 12 }}>
            {t.publishedcontent}
            </Typography>
          </Box>
          <Switch
            checked={checked}
            onChange={updateData}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>
        <Box
          sx={{
            padding: '10px 20px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            m: 5,
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography style={{ margin: 0, fontSize: 18 }}>
            {t.featured}{' '}
            </Typography>
            <Typography style={{ fontSize: 12 }}>
            {t.featuredcontent}
            </Typography>
          </Box>
          <Switch
            checked={checked1}
            onChange={updateFeature}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>
      </form>
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
    </CardContent>
  )
}

export default EventStep5
