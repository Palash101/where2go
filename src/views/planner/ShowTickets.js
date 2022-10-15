// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {
  addEventTicket,
  updateEventTicket,
  deleteEventTicket,
  updateFloorPlan,getTicketCollection,
} from '../../../service/admin/events'
import { useRouter } from 'next/router'

const ShowTickets = (props) => {

  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [description, setDescription] = useState('')
  const [ticketCount, setTicketCount] = useState('')
  const [minBooking, setMinBooking] = useState('')
  const [maxBooking, setMaxBooking] = useState('')
  const [price, setPrice] = useState('')
  const [color, setColor] = useState('')
  const [loading, setLoading] = useState(false)
  const [eventId, setEventId] = useState('black');
  const [oldArray, setOldArray] = useState([])
  const router = useRouter()
  const [open, setOpen] = useState({
    ticketModal: false,
    PlanModal: false,
  })

  useEffect(() => {
    console.log(props, 'tickets')
    if (router.isReady) {
    setEventId(router.query.eventId)
  }
  }, [router.isReady])

  const updateTicketdData = async (key) => {
    
    if(props.floor_type === '0'){
    if (filedValidation()) {
      const ticketsData = {
        id: id,
        name: name,
        description: description,
        ticket_count: ticketCount,
        min_booking: minBooking,
        max_booking: maxBooking,
        price: price,
        color: color,
      }
      
       await updateEventTicket(eventId, ticketsData)
         window.location.reload();
      setLoading(false)
      handleDialogClose('ticketModal')
      
    }
    else {
      setLoading(false)
      toast('Not a Valid Data or Incomplete Data')
    }
  }
  else{
    if (filedValidation()) {
      const ticketsData = {
        id: id,
        name: name,
        price: price,
        color: color,
      }
      await updateEventTicket(eventId,ticketsData)
      window.location.reload()
       // refreshData()
      setLoading(false)
      handleDialogClose('ticketModal')

    }
    else {
      setLoading(false)
      toast('Not a Valid Data or Incomplete Data')
    }
  }


  }

  const filedValidation = () => {
    if(props.floor_type === '0'){
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
  else{
    if (
      name.trim() == 0 ||
     // description.trim() == 0 ||
      price.trim() == 0 ||
      color.trim() == 0
    )
      return false
    else {
      return true
    }
  }
  }

  const handleOpenTicketModal = (item1,key) => {
    console.log(item1,'handleOpenTicketModal');
    setId(item1.docId);
    setName(item1.name);
    setColor(item1.color);
    setPrice(item1.price);
    setTicketCount(item1.ticket_count);
    setMinBooking(item1.min_booking);
    setMaxBooking(item1.max_booking);
    setDescription(item1.description);
    setDescription(item1.description);
    setOldArray(item1);
    
   setOpen({ ...open, ticketModal: true })
 }

 const handleDialogClose = (type) => {
  setId('');
     setName('');
     setColor('');
     setPrice('');
     setTicketCount('');
     setMinBooking('');
     setMaxBooking('');
     setDescription('');
     setDescription('');
     setOldArray('');
  setOpen({ ...open, [type]: false })
}

const deleteTicket =  async (ticket) => {
  console.log('deleting Ticket', ticket)
  setLoading(true)
  await deleteEventTicket(eventId, ticket)
  setLoading(false)
  window.location.reload()
  // refreshData()
}

const ticketForm = (eventId) => {
  return (
    <Box sx={{marginTop:10}}>
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
      
        onChange={(e) => setId(e.target.value)}
        type="hidden"
        value={id}
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
        sx={{marginBottom:'10px'}}
        type="number"
        placeholder="Price"
      />

      {props.floor_type === 0 && (
<Box>
      <TextField
        required
        onChange={(e) => setTicketCount(e.target.value)}
        // sx={{ marginBottom: '10px' }}
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
)}
   
     
    </Box>
  )
}

  return (
    <Box
      sx={{
       // position: 'fixed',
       // right: 0,
       // top: '70px',
        //maxWidth: '323px',
        width: '100%',
      }}
    >
      <ul className="prlist">
        {props.data.map((item1, key) => (
          <li key={key} style={{ margin: '20px 10px' }}>
            <Box>
              <span
                className="circleList"
                style={{ backgroundColor: item1.color }}
              ></span>{' '}
              {item1.name}
            </Box>
            <Box>
              {item1.price} {props.currency}
            </Box>
            <DeleteIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => deleteTicket(item1)}
        />
        <EditIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => handleOpenTicketModal(item1,key)}
        />
          </li>
        
        ))}
      </ul>
      <Dialog
          open={open.ticketModal}
          onClose={() => handleDialogClose('ticketModal')}
        >
          <DialogTitle>Ticket</DialogTitle>
          <DialogContent>{ticketForm()}</DialogContent>
          <DialogActions>
          <Button  onClick={() => updateTicketdData(id)}>Update</Button>
            <Button onClick={() => handleDialogClose('ticketModal')}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
    </Box>
  )
}

export default ShowTickets







