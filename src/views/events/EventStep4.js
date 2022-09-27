// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import DeleteIcon from '@mui/icons-material/Delete'
import Badge from '@mui/material/Badge'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { getAllFloorPLan } from 'service/admin/floorPlan'
import InputLabel from '@mui/material/InputLabel'
import { useRouter } from 'next/router'
import EditIcon from '@mui/icons-material/Edit'
import { toast } from 'react-toastify'

import {
  updateEventTicket,
  deleteEventTicket,
  updateFloorPlan,
} from '../../../service/admin/events'
import { getFloorPlanById } from '../../../service/admin/floorPlan'

import { userAuth } from 'context/userContext'
import Translations from 'utils/trans'

const EventStep4 = ({ data, eventId, refreshData }) => {

  const userContext = userAuth()
  const locale = userContext.locale
  const t = Translations(locale)

  const [open, setOpen] = useState({
    ticketModal: false,
    PlanModal: false,
  })
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [ticketCount, setTicketCount] = useState('')
  const [minBooking, setMinBooking] = useState('')
  const [maxBooking, setMaxBooking] = useState('')
  const [price, setPrice] = useState('')
  const [color, setColor] = useState('')
  const [floorPlanId, setSelectedFloorPlan] = useState(null)
  const [floorPlanData, setFloorPlanData] = useState([])
  const router = useRouter()

  useEffect(() => {
    getFloorPlanData()
    console.log(data, 'datata')
  }, [])

  const getFloorPlanData = async () => {
    const plans = await getAllFloorPLan()
    const plansArray = []
    plans.docs.forEach((item) => {
      const docId = { docId: item.id }
      const data = Object.assign(docId, item.data())
      plansArray.push(data)
    })

    console.log(plansArray, 'plansArray')
    setFloorPlanData(plansArray)
  }

  const handleDialogOpen = (type) => {
    if (data.floor_type == '1') {
      setOpen({ ...open, PlanModal: true })
    } else {
      setOpen({ ...open, ticketModal: true })
    }
  }

  const handleOpenTicketModal = (item1) => {
    console.log('Ticket Modal' , item1)
       setName(item1.name);
       setColor(item1.color);
       setPrice(item1.price);
       setTicketCount(item1.ticketCount);
       setMinBooking(item1.minBooking);
       setMaxBooking(item1.maxBooking);
       setDescription(item1.description);
      setOpen({ ...open, ticketModal: true })
    
  }

  const handleDialogClose = (type) => {
    setOpen({ ...open, [type]: false })
  }

  const updateTicketdData = () => {
    setLoading(true)
    if (filedValidation()) {
      const ticketData = {
        name: name,
        description: description,
        ticket_count: ticketCount,
        min_booking: minBooking,
        max_booking: maxBooking,
        price: price,
        color: color,
      }

      updateEventTicket(eventId, ticketData)
      setLoading(false)
      handleDialogClose()
      refreshData()
    } else {
      setLoading(false)
      toast('Not a Valid Data or Incomplete Data')
    }
  }

  const addFloorPlan = async () => {
    if (floorPlanId == '') {
      alert('Please choose right plan')
      return
    }
    const data = await getFloorPlanById(floorPlanId)
    await updateFloorPlan(eventId, data.plan).then((res) =>
      console.log('uploaded'),
    )
  }
  const editFloorPlan = () => {
    router.push(`floor-plan/${eventId}`)
  }

  const filedValidation = () => {
    if (
      name.trim() == 0 ||
      description.trim() == 0 ||
      ticketCount.trim() == 0 ||
      minBooking.trim() == 0 ||
      maxBooking.trim() == 0 ||
      price.trim() == 0 ||
      color.trim() == 0
    )
      return false
    else {
      return true
    }
  }

  const goToFloorPlan = () => {
    router.push(`floor-plan/${eventId}`)
  }

  const deleteTicket = (ticket) => {
    console.log('deleting Ticket', ticket)
    setLoading(true)
    deleteEventTicket(eventId, ticket)
    setLoading(false)
    refreshData()
  }

  const editTicket = (ticket) => {
    console.log('deleting Ticket', ticket)
    // setLoading(true)
    // deleteEventTicket(eventId, ticket)
    // setLoading(false)
    // refreshData()
  }

  const ticketForm = (eventId) => {
    return (
      <Box>
        <TextField
          required
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: '10px' }}
          fullWidth
          value={name}
          label="Ticket Name"
          placeholder="Enter event name"
        />
        <TextField
          required
          onChange={(e) => setColor(e.target.value)}
          sx={{ marginBottom: '10px' }}
          value={color}
          fullWidth
          label="Color Code"
        />
        <TextField
          required
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          label="Price"
          value={price}
          type="number"
          placeholder="Price"
        />

        <TextField
          required
          onChange={(e) => setTicketCount(e.target.value)}
          sx={{ marginBottom: '10px' }}
          type="number"
          fullWidth
          value={ticketCount}
          label="Quantity Available"
          placeholder="Quantity Available"
        />
        <TextField
          required
          onChange={(e) => setMinBooking(e.target.value)}
          sx={{ marginBottom: '10px' }}
          type="number"
          value={minBooking}
          fullWidth
          placeholder="Minimum allowed quantity in a single booking"
        />
        <TextField
          required
          onChange={(e) => setMaxBooking(e.target.value)}
          sx={{ marginBottom: '10px' }}
          type="number"
          value={maxBooking}
          fullWidth
          placeholder="Maximum allowed quantity in a single booking"
        />

        <TextField
          required
          onChange={(e) => setDescription(e.target.value)}
          sx={{ marginBottom: '10px' }}
          fullWidth
          value={description}
          label="Description"
          placeholder="Ticket Description"
        />
      </Box>
    )
  }

  const floorPlanForm = () => {
    return (
      <Box>
        <FormControl fullWidth>
          <InputLabel>Select Plan</InputLabel>
          <Select
            onChange={(e) => setSelectedFloorPlan(e.target.value)}
            label="Floor Plan"
          >
            {floorPlanData.map((item, key) => (
              <MenuItem key={key} value={item.docId}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button>Create New Plan</Button>
      </Box>
    )
  }

  const renderTicketList = (ticketData) => {
    console.log(ticketData, 'tdata')
    if (ticketData.tickets && ticketData.tickets.length) {
      return (
        <>
          {ticketData.tickets?.map((ticket, key) => (
            <div key={key}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                }}
              >
                <Typography>{ticket.name}</Typography>
                <Typography>Per/Ticket Price: {ticket.price}</Typography>
                <Typography>Total Ticket:{ticket.ticket_count}</Typography>
                <Typography>
                  Sales value: {ticket.ticket_count * ticket.price}{' '}
                  {data.currency}
                </Typography>
                <DeleteIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={() => deleteTicket(ticket)}
                />
              </Box>

              <Divider />
            </div>
          ))}
        </>
      )
    } else {
      return <Typography>{t.addingnewticket}</Typography>
    }
  }

  const renderTicketList2 = (ticketData) => {
    console.log(ticketData, 'tdata')
    if (ticketData.tickets && ticketData.tickets.length) {
      return (
        <>
        

<ul className="prlist">
      <li style={{padding:'15px 0px',borderBottom:'1px solid #333'}}>
            <Box>
              {`${t.color} /
              ${t.name}`}
            </Box>
            <Box>
              {t.price}
            </Box>
        </li>
        {ticketData.tickets?.map((item1, key) => (
          <li key={key} style={{padding:'15px 0px',borderBottom:'1px solid #333' }}>
            <Box>
              <span
                className="circleList"
                style={{ backgroundColor: item1.color }}
              ></span>{' '}
              {item1.name}
            </Box>
            <Box>
              {item1.price} {data.currency}
            </Box>
            <EditIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleOpenTicketModal(item1)}
                />
          </li>
        ))}
      </ul>

        </>
      )
    } else {
      return <Typography>No data found start adding new ticket</Typography>
    }
  }

  const renderFloorPlanList = (planData) => {
    
    return (
      <>

      {data.tickets && renderTicketList2(data)}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          <Typography>{data.event_name.en} Floor Plan</Typography>
          <Typography sx={{cursor:'pointer'}} onClick={editFloorPlan}>{t.edit}</Typography>
          {/* <DeleteIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => deleteTicket(ticket)}
          /> */}
        </Box>
      </>
    )
  }

  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            {data.floor_type == '1' && data.plan
              ? renderFloorPlanList(data.plan)
              : renderTicketList(data)}

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              {data.floor_type == '1' ? (
                <Button onClick={() => goToFloorPlan()}>{`${t.add} ${t.floor} ${t.plan}`}</Button>
              ) : (
                <Button onClick={() => handleDialogOpen()}>{`${t.add} ${t.tickets}`}</Button>
              )}
            </Box>
          </Grid>
          <Dialog
            open={open.ticketModal}
            onClose={() => handleDialogClose('ticketModal')}
          >
            <DialogTitle>Ticket</DialogTitle>
            <DialogContent>{ticketForm()}</DialogContent>
            <DialogActions>
              <Button onClick={updateTicketdData}>Add</Button>
              <Button onClick={() => handleDialogClose('ticketModal')}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={open.PlanModal}
            onClose={() => handleDialogClose('PlanModal')}
          >
            <DialogTitle>Floor Plan</DialogTitle>
            <DialogContent>{floorPlanForm()}</DialogContent>
            <DialogActions>
              <Button onClick={addFloorPlan}>Add</Button>
              <Button onClick={() => handleDialogClose('PlanModal')}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
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
    </form>
  )
}

export default EventStep4
