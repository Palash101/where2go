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

import { userAuth } from 'context/userContext'
import Translations from 'utils/trans'

function DateTimeComponent({ handleDateTimeModal }) {

  const userContext = userAuth()
  const locale = userContext.locale
  const t = Translations(locale)

  const [open, setopen] = useState(false)
  const [dateValue, setDateValue] = useState(null)
  const [fromTimeValue, setFromTimeValue] = useState(null)
  const [toTimeValue, setToTimeValue] = useState(null)

  const [dateTimeArray, setDateTimeArray] = useState([])

  const handleClickOpen = () => {
    setopen(true)
  }

  const handleClose = () => {
    setopen(false)
  }

  useEffect(() => {}, [fromTimeValue])

  const removeFromArray = (key) => {
    console.log(key)
    const oldArr = [...dateTimeArray];
    oldArr.splice(key, 1);

    console.log(oldArr)
    setDateTimeArray(oldArr)
    handleDateTimeModal(oldArr)
  }

  const addDateTimeArray = () => {
    const date = moment(dateValue).format('DD-MM-YYYY')
    const formTime = moment(fromTimeValue).format('HH:mm a')
    const toTime = moment(toTimeValue).format('HH:mm a')
    const data = {
      date: date,
      from: formTime,
      to: toTime,
    }
    console.log(data)
    if(data.date !== 'Invalid date' && data.from !== 'Invalid date' && data.to !== 'Invalid date'){
    setDateTimeArray([...dateTimeArray, data])
    handleDateTimeModal([...dateTimeArray, data])
    handleClose()
    }
    else{
      alert("all fields are required to fill")
    }
  }

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
      {t.adddateandtimemorethen1}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Box
          onClick={() => handleClickOpen('dateTime')}
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
            {`${t.add} ${t.day}`}
          </Typography>
        </Box>
        {dateTimeArray.map((data, key) => (
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
              <Typography>{data.date}</Typography>
              <Divider
                sx={{ background: '#fff', height: '1px', width: '100%' }}
              />

              <Typography>from:{data.from} </Typography>
              <Typography>to:{data.to} </Typography>
            </Box>
            <DeleteIcon onClick={() => removeFromArray(key)} />
          </>
        ))}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`${t.select} ${t.date}`}</DialogTitle>
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
              <DatePicker
                label="Date"
                value={dateValue}
                inputFormat="MM/dd/yyyy"
                closeOnSelect={true}
                views={['year', 'month', 'day']}
                onChange={(newValue) => {
                  setDateValue(newValue)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ marginBottom: '5px' }} variant="subtitle1">
                  From
                </Typography>
                <TimePicker
                  label="Time"
                  value={fromTimeValue}
                  onChange={(newValue) => {
                    setFromTimeValue(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <Typography sx={{ marginBottom: '5px' }} variant="subtitle1">
                  To
                </Typography>

                <TimePicker
                  label="Time"
                  value={toTimeValue}
                  onChange={(newValue) => {
                    setToTimeValue(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </Box>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => addDateTimeArray()}>{t.add}</Button>
          <Button onClick={handleClose}>{t.cancel}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default DateTimeComponent
