// ** React Imports
import { useState,useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import Badge from '@mui/material/Badge';





import {updateEventTicket} from '../../../service/admin/events'




const EventStep4 = ({data,eventId,refreshData}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading]= useState(false)
    const [name, setName]= useState('')
    const [description, setDescription]= useState('')
    const [ticketCount, setTicketCount]= useState('')
    const [minBooking, setMinBooking]= useState('')
    const [maxBooking, setMaxBooking]= useState('')
    const [price, setPrice]= useState('')
    const [color, setColor]= useState('')


  useEffect(()=>{

    console.log('data in event step 4',data)
  },[])


  const handleDialogOpen =()=>{
  	setOpen(true)

  }

  const handleDialogClose=()=>{
  	setOpen(false)
  }

  const updateTicketdData = ()=>{
    setLoading(true)
    if(filedValidation()){
      const ticketData ={
        name:name,
        description:description,
        ticket_count:ticketCount,
        min_booking:minBooking,
        max_booking:maxBooking,
        price:price,
        color:color,
      }
   
      updateEventTicket(eventId,ticketData)
      setLoading(false)
      handleDialogClose()
      refreshData()
    }
    else{
      setLoading(false)
      alert('Not a Valid Data or Incomplete Data')
    }
   

  }

  const filedValidation = () =>{
    if(
      name.trim() == 0 ||
      description.trim() == 0 ||
      ticketCount.trim() == 0 ||
      minBooking.trim() == 0 ||
      maxBooking.trim() == 0 ||
      price.trim() == 0 ||
      color.trim() == 0 
    )
    return false;
    else{
      return true;
    }


  }

  const deleteTicket = ()=>{
    console.log('deleting Ticket')
  }

  const ticketForm =(eventId)=>{
  	return(

  		<Box>
  			<TextField
        required
        onChange={(e)=>setName(e.target.value)}
         sx={{marginBottom:'10px'}} fullWidth label='Ticket Name' placeholder='Enter event name'  />
  			<TextField 
        required
        onChange={(e)=>setColor(e.target.value)}
        sx={{marginBottom:'10px'}} fullWidth label='Color Code'   />
  			<TextField
        required
        onChange={(e)=>setPrice(e.target.value)}
         fullWidth label='Price' type='number' placeholder='Price'  />
        <TextField 
        required
         onChange={(e)=>setTicketCount(e.target.value)}
        sx={{marginBottom:'10px'}} type='number' fullWidth placeholder="Quantity Available"  />
        <TextField 
        required
         onChange={(e)=>setMinBooking(e.target.value)}
        sx={{marginBottom:'10px'}} type='number' fullWidth  placeholder="Minimum allowed quantity in a single booking"  />
        <TextField 
        required
        onChange={(e)=>setMaxBooking(e.target.value)}
        sx={{marginBottom:'10px'}}type='number' fullWidth placeholder="Maximum allowed quantity in a single booking"  />
  			<TextField 
        required
        onChange={(e)=>setDescription(e.target.value)}
        sx={{marginBottom:'10px'}} fullWidth label='Description' placeholder='Ticket Description'  />

  		</Box>


  		)
  }

    return(
        <form>
           <CardContent sx={{ paddingBottom: 0 }}>

          <Grid container spacing={7}>
          <Grid item xs={12} sm={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            {
              data.tickets?.map((ticket,key)=>(
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center',width:'100%',justifyContent:'space-between',textAlign:'center' }}>
                      <Typography>{ticket.name}</Typography>
                      <Typography>Per/Ticket Price: {ticket.price}</Typography>
                      <Typography>Total Ticket:{ticket.ticket_count}</Typography>
                      <Typography>Sales value: {ticket.ticket_count*ticket.price} {data.currency}</Typography>
                      <DeleteIcon 
                      sx={{cursor:'pointer'}}
                      onClick={deleteTicket}
                      />
                      
                  </Box>
                  
              <Divider />
              </>

              ))
            }
        
          <Box  sx={{ display: 'flex', alignItems: 'center',width:'100%',justifyContent:'center' }}>
          		<Button onClick={()=>handleDialogOpen()}>Add Tickets</Button>
            </Box>
          </Grid>
            <Dialog open={open} onClose={handleDialogClose}>
            <DialogTitle>Ticket</DialogTitle>
            <DialogContent>
            	{ticketForm()}
            </DialogContent>
            <DialogActions>
            <Button onClick={updateTicketdData}>Add</Button>
            <Button onClick={handleDialogClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
          </Grid>
          {loading === true && (
            <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center',backgroundColor: 'rgb(0 0 0 / 39%)',zIndex: 99999999,position: 'fixed',left: 0,
              right: 0,
              top: 0,
              bottom: 0, }}>
                  <CircularProgress />
              </Box>
              )}
            </CardContent>

        </form>


    )
}

export default EventStep4;