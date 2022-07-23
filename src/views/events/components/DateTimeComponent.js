
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AddIcon from '@mui/icons-material/Add';
import moment from "moment";
import { useState } from 'react'



function DateTimeComponent({handleDateTimeModal}){
  const [open, setopen] = useState(false);
  const [dateValue, setDateValue] = useState(null);
  const [fromTimeValue, setFromTimeValue] = useState(null);
  const [toTimeValue, setToTimeValue] = useState(null);


  const [dateTimeArray, setDateTimeArray] = useState([]);


  const handleClickOpen = () => {
  	setopen(true)
       
  };

  const handleClose = () => {
	setopen(false)
 
};
const dateSplit = () =>{
}

  const addDateTimeArray = ()=>{
    const dd = new Date(dateValue).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ")
    const fromtimeH = new Date(toTimeValue).getDate()
    const fromtimeM = new Date(toTimeValue).getMinutes()
    console.log({fromtimeH,fromtimeM})
    console.log(dd)
    setDateTimeArray([...dateTimeArray,{date:dateValue,from:fromTimeValue,to:toTimeValue}])
    handleDateTimeModal([...dateTimeArray,{date:dateValue,from:fromTimeValue,to:toTimeValue}])
    handleClose()

  }


	return(
		<Box>
            <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
              You can add more than 1 date time slots
            </Typography>
            <Box sx={{display:'flex', alignItems:'center',justifyContent:'flex-start'}}>
              <Box onClick={()=>handleClickOpen('dateTime')} width='90px'height='150px' bgcolor='yellow' alignItems='center' 
              sx={{
                display:'flex',
                padding:'9px',
                margin:'0px',
                border:'1px solid #383838',
                borderRadius:'2px',
                fontSize:'12px',
                cursor:'pointer',
                borderRadius:'10px',
              }}
              >
              <Typography sx={{fontSize:'16px',fontWeight:'bold'}} color="#050721">Add Day</Typography>
              </Box>
              {dateTimeArray.map((data,key)=>
                (
                 <Box key={key} sx={{
                    display:'flex',
                    alignItems:'center',
                    border:'2px solid black',
                    borderRadius:'5px',
                    width:'100px',
                    height:'150px',
                    justifyContent:'center',
                    flexDirection:'column',
                    marginLeft:'10px'

                  }}>
                <Typography>15 jun</Typography>
                <Divider />

                <Typography>2022</Typography>
                <Typography>awad</Typography>



              </Box>
                 
                  )
              )}
            </Box>
            
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Select Date</DialogTitle>
                <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center', flexDirection:'column'}}>
                  <DatePicker
                    label="Date"
                    value={dateValue}
                    inputFormat="MM/dd/yyyy"
                    closeOnSelect={true}
                    views={["year", "month", "day"]}
                    onChange={(newValue) => {
                      setDateValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <Box sx={{display:'flex',flexDirection:'column'}}>
                    <Typography sx={{marginBottom:'5px'}} variant="subtitle1">From</Typography>
                    <TimePicker
                        label="Time"
                        value={fromTimeValue}
                        onChange={(newValue) => {
                          setFromTimeValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    <Typography sx={{marginBottom:'5px'}} variant="subtitle1">To</Typography>

                     <TimePicker
                        label="Time"
                        value={toTimeValue}
                        onChange={(newValue) => {
                          setToTimeValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />

                  </Box>
                  </Box>
                  
                  </LocalizationProvider>
                  
                </DialogContent>
              <DialogActions>
              <Button onClick={()=>addDateTimeArray()}>Add</Button>
              <Button onClick={handleClose}>Cancel</Button>
              </DialogActions>
            </Dialog>

          </Box>

		)
}

export default DateTimeComponent;