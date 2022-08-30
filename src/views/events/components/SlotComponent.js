import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import moment from 'moment'
import { useEffect, useState } from 'react'

function SlotComponent({ handleSloteModal }) {
  const [open, setopen] = useState(false)
  const [fromTimeValue, setFromTimeValue] = useState(null)

  const [slotArray, setSlotArray] = useState([])

  const handleClickOpen = () => {
    setopen(true)
  }

  const handleClose = () => {
    setopen(false)
  }

  useEffect(() => {}, [fromTimeValue])

  const removeFromArray = (data) => {
    console.log(data,'key')
    const newArray = slotArray.filter(item => item != data)
    setSlotArray(newArray)
    handleSloteModal(newArray)
  }

  const addSlot = () => {
    const formTime = moment(fromTimeValue).format('HH:mm a')
    
    setSlotArray([...slotArray, formTime])
    handleSloteModal([...slotArray, formTime])
    handleClose()
  }

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
        You can add more than 1 time slots
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Box
          onClick={() => handleClickOpen('slot')}
          width="90px"
          height="150px"
          bgcolor="yellow"
          alignItems="center"
          sx={{
            display: 'flex',
            padding: '9px',
            margin: '0px',
            border: '1px solid #383838',
            borderRadius: '2px',
            fontSize: '12px',
            cursor: 'pointer',
            borderRadius: '10px',
          }}
        >
          <Typography
            sx={{ fontSize: '16px', fontWeight: 'bold' }}
            color="#050721"
          >
            Add Slot
          </Typography>
        </Box>
        {slotArray.map((data, key) => (
          <>
            <Box
              key={key}
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: '2px solid white',
                padding: '2px',
                borderRadius: '5px',
                fontSize: '14px',
                width: 'auto',
                padding: '0px 10px',
                height: '150px',
                justifyContent: 'center',
                flexDirection: 'column',
                marginLeft: '10px',
              }}
            >
              <Typography>{data}</Typography>
            </Box>
            <DeleteIcon onClick={() => removeFromArray(data)} />
          </>
        ))}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Slot</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
             
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
               
                <TimePicker
                  label="Time"
                  value={fromTimeValue}
                  onChange={(newValue) => {
                    setFromTimeValue(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </Box>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => addSlot()}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SlotComponent
