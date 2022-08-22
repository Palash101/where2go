
import { useState, useEffect } from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Image from 'next/image'
import Grid from '@mui/material/Grid';
import TodayIcon from '@mui/icons-material/Today';
import MapIcon from '@mui/icons-material/Map';
import HomeLayout from 'src/@core/layouts/HomeLayout'
import { borderTop } from '@mui/system'
import { auto } from '@popperjs/core'
import { useRouter } from 'next/router'
import moment from "moment";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { getEventById } from 'service/admin/events'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useTheme } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import { TruckDelivery } from 'mdi-material-ui';
import SeatLayout from 'src/pages/bookings/component/SeatLayout';
import {getAllFloorPLan} from 'service/admin/floorPlan';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'


function Bookings(navigation) {
    const router = useRouter();
    const id = router.query.id;
    const propDate = router.query.date;
    const [item, setItem] = useState({});
    const [floorType, setFloorType] = useState(router.query.floor_type);
    const [itemNew, setItemNew] = useState({});
    const [featured,setFeatured] = useState(false)
    const [date, setDate] = useState('');
    const [open, setopen] = useState(false);
    const [dateValue, setDateValue] = useState(null);
    const [fromTimeValue, setFromTimeValue] = useState(null);
    const [dateTimeArray, setDateTimeArray] = useState([]);
    const theme = useTheme()
    const [counter, setCounter] = useState(0);
    const [displayCounter, setDisplayCounter] = useState(false)
    const [exist, setExist] = useState(false)
    const [priceOpen,setPriceOpen] = useState(false)
    const [floorData,setFloorData] = useState({});
    const times = [
        '10:00 AM',
        '11:30 AM',
        '01:00 PM',
        '02:30 PM',
        '04:00 PM',
        '05:30 PM',
        '07:00 PM',
        '08:30 PM',
        '10:00 PM'
    ]

    function handleIncrement(item) {
        if(item.qty !== JSON.parse(item.max_booking)){
            item.qty = item.qty + 1;
            setDisplayCounter(true)
        }
        
    };

    function handleDecrement(item) {
        if (item.qty === JSON.parse(item.min_booking)) {
            setDisplayCounter(false)
        }
        else {
            item.qty = item.qty - 1;
        }
    };

    const handleClickOpen = () => {
        setopen(true)
    };

    const handleClose = () => {
        setopen(false)
    };

    const addDateTimeArray = () => {
        const date = moment(dateValue).format('DD-MM-YYYY');
       // const formTime = moment(fromTimeValue).format('HH:mm a');
       // const toTime = moment(fromTimeValue).format('HH:mm a');
        const data = {
            date: date,
            from: fromTimeValue,
            to: fromTimeValue
        }
        var dt = moment(dateValue).format('ll');
        var time = fromTimeValue;
        setDate(dt + ', ' + time)

        // router.replace({
        //     pathname: '/bookings/[id]',
        //     query: { id: router.query.id ,date:date,from:formTime,to:toTime,floor_type:itemNew.floor_type},
        // })

        itemNew.event_date.map(item1 => {
            if (date === item1.date) {
                setExist(true)
            }
        });

        handleClose()

    }

    useEffect(async() => {
        if (router.isReady) {
            // const fdata = await getAllFloorPLan()
            // const fData1 = [];
            // fdata.docs.forEach(item => {
            //     const docId = { docId: item.id }
            //     const dt1 = item.data().plan;
            //     const dt = {plan:JSON.parse(dt1)}
            //     const name = {name:item.data().name};
            //     const data = Object.assign(docId, dt, name);
            //     fData1.push(data)
            // })
            // setFloorData(fData1[0])
            // console.log(fData1[0],'fdata')


            getEventById(router.query.id).then((data) => {
                console.log(data,'item')
                setFloorType(data.floor_type)
                if(data.plan){
                    setFloorData(JSON.parse(data.plan))
                }
               
                var arr = [];
                data.tickets.map(item2 => {
                    if(item2.min_booking){
                        item2.qty = JSON.parse(item2.min_booking);
                    }
                    else{
                        item2.qty = 1;
                    }
                    arr.push(item2)
                });

                data.tickets = arr;
                console.log(data,'booking')
                setItemNew(data)
                data.event_date.map(item1 => {
                    if (propDate === item1.date) {
                        setExist(true)
                    }
                });
               
            })


          //  var dt = moment().format('LLLL');
            setDate(propDate)
        }
    }, [router.isReady, navigation])

    console.log(exist)

    const handlePriceClick = () => {
        setPriceOpen(true)
    }
    const handlePriceClose = () => {
        setPriceOpen(false)
    }
    

    const toggleType = () => {
        setFeatured(!featured)
    }

    const puchaseClick = (selected) => {
        console.log(selected,'ss')
        router.replace({
            pathname: '/bookings/detail/[id]',
            query: { id: router.query.id},
        })
    }

    return (
        <>
            <Box sx={{
                marginTop: '65px',
                left: 0,
                right: 0,
                background: `${theme.palette.background.default1}`,
                zIndex: 9,
                textAlign: 'center'
            }}>
                <Grid container spacing={4} justifyContent="center" sx={{}}>
                    <Grid item xs={12} md={6} sx={{}}>
                        <h3 className='detailHeading'>{item.event_name}</h3>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{}}>
                        <Box className='calenderDate' onClick={() => handleClickOpen('dateTime')}>{date}</Box>
                       
                    </Grid>
                </Grid>
            </Box>

            {floorType === '1' && (
            <Box sx={{position: 'absolute',
                    zIndex: 9,
                    margin: '15px',
                    border: '3px solid #8d8d8d',
                    padding: '5px 21px',
                    borderRadius: '20px',
                    background: '#000',
                    fontSize: '14px'}} onClick={handlePriceClick}>
                Ticket Prices
            </Box>
            )}

        {floorType === '1' && (
            <SeatLayout data={floorData} click={puchaseClick} />
        )}

          {floorType === '0' && (
                <div>
            {exist === true && (
                <Box sx={{
                    maxWidth: '764px', margin: 'auto',
                    marginTop: '24px'
                }}>

                    {itemNew.tickets && itemNew.tickets.map((item1, key) => (

                        <Paper elevation={3} key={key} sx={{
                            padding: '15px',
                            display: 'flex',
                            backgroundColor: `${theme.palette.background.default1}`,
                            marginBottom: 5,
                          /// borderTopWidth: '4px',
                            //borderTopColor: `${item1.color}`,
                          //  borderTopStyle: 'solid',
                            justifyContent: 'space-between'
                        }}>
                            <div className='cartLeft'>
                                <h5>{item1.name}</h5>
                                <p>{item1.description}</p>

                            </div>
                            <div className='cartRight'>
                                {/* <ButtonGroup size="small" variant="text" aria-label="small button group" >
                                    <Button onClick={() => handleIncrement(item1)}>+</Button>
                                    <Button variant="outlined" disabled>{item1.qty}</Button>
                                    <Button onClick={() => handleDecrement(item1)}>-</Button>
                                </ButtonGroup> */}
                                <h4>{item1.price} {itemNew.currency}</h4>
                            </div>
                        </Paper>
                    ))}


                </Box>
            )}
        </div>
            )}
        
        

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Select Date</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <DatePicker
                                label="Date"
                                value={dateValue}
                                inputFormat="MM/dd/yyyy"
                                closeOnSelect={true}
                                views={["year", "month", "day"]}
                                minDate={new Date()}
                                onChange={(newValue) => {
                                    setDateValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ marginTop: '5px' }} variant="subtitle1">Time</Typography>
                                {/* <TimePicker
                                    label="Time"
                                    value={fromTimeValue}
                                    onChange={(newValue) => {
                                        setFromTimeValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                /> */}
                                 <Select required sx={{width:'250px'}} onChange={(e)=>setFromTimeValue(e.target.value)} label='Time' defaultValue={fromTimeValue} >
                                    {times.map((item) => (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    ))}
                                </Select>

                            </Box>
                        </Box>

                    </LocalizationProvider>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => addDateTimeArray()}>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

              <Dialog open={priceOpen} onClose={handlePriceClose}>
                <DialogContent>
                    <ul className="prlist">
                    {itemNew.tickets && itemNew.tickets.map((item1, key) => (
                         <li>
                           <Box><span className="circleList" style={{backgroundColor:item1.color}}></span> {item1.name}</Box>
                           <Box>{item1.price} {itemNew.currency}</Box>
                        </li>
                    ))}
                 
                       
                    </ul>
                </DialogContent>
              
            </Dialog>

        </>


    )
}

Bookings.getLayout = page => <HomeLayout>{page}</HomeLayout>

export default Bookings;