
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

function Details(navigation) {
    const router = useRouter();
    const id = router.query.id;
    const [item, setItem] = useState({});
    const [lowest, setLowest] = useState('');
    const [open, setopen] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [dateValue, setDateValue] = useState(null);
    const [fromTimeValue, setFromTimeValue] = useState(null);
    const [dateTimeArray, setDateTimeArray] = useState([]);


    const handleClickOpen = () => {
       // setopen(true)
        setShowModal(true)
    };

    

    const handleClose = () => {
        setopen(false)

    };
    const handleCloseShowModal = () => {
        setShowModal(false);
    }

    const addDateTimeArray = () => {
        const date = moment(dateValue).format('DD-MM-YYYY');
        const formTime = moment(fromTimeValue).format('HH:mm a');
        const toTime = moment(fromTimeValue).format('HH:mm a');
        const data = {
            date: date,
            from: formTime,
            to: toTime
        }
        router.replace({
            pathname: '/bookings/[id]',
            query: { id: router.query.id },
        })
        handleClose()

    }

    useEffect(() => {
        if (router.isReady) {
            getEventById(router.query.id).then((data) => {
                console.log(data)
                setItem(data)

                var lowest = Number.POSITIVE_INFINITY;
                var highest = Number.NEGATIVE_INFINITY;
                var tmp;
                for (var i = data.tickets.length - 1; i >= 0; i--) {
                    tmp = JSON.parse(data.tickets[i].price);
                    if (tmp < lowest) lowest = tmp;
                    if (tmp > highest) highest = tmp;
                }
                setLowest(lowest);

            })
        }
    }, [router.isReady, navigation])



    return (
        <>
            <Grid container spacing={4} justifyContent="center" sx={{
                marginTop: '60px',
                maxWidth: 900,
                width:'100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingBottom: '20px',
                paddingLeft: '1rem',paddingRight: '1rem' 
            }}>
                <Grid item xs={12} md={8} sx={{ paddingLeft: '1rem',paddingRight: '1rem'  }}>
                    <div className='detailImage'>
                        {item.images && (
                            <img src={item.images.banner1} className='detailImg' />
                        )}

                    </div>
                </Grid>
                <Grid item md={4} xs={12} alignItems="center" sx={{ paddingTop: '50px', paddingLeft: '1rem',paddingRight: '1rem'  }}>
                    <h3 className='detailHeading'>{item.event_name}</h3>
                    <Box>
                        <div className='catdet'>
                            <div className='subDetail'>
                                <span>
                                    <Image src='/images/slide1.jpeg' width={50} height={50} style={{ borderRadius: '50%' }} />
                                </span>
                                <h5>Escape Hunt Kuwait Escape Games</h5>
                            </div>
                            <h6 className='contactLine'>Have a queston? Tap to contact us</h6>
                        </div>
                    </Box>
                    <Box sx={{
                        textAlign: 'center',
                        background: '#84848426 !important',
                        margin: '25px 0px',
                        padding: '20px 10px',
                        borderRadius: '10px'
                    }}>
                        <TodayIcon sx={{ fontSize: 40, }} />
                        {item.event_date && item.event_date.map((item1, key) => (
                            <h6 className='dayLine' key={key}>{item1.date} From {item1.from} - {item1.to}</h6>
                        ))}
                        {item.event_location && (
                            <div className='locbox'>
                                <MapIcon sx={{ fontSize: 40, }} />
                                <h6 className='dayLine2'> {item.event_location}</h6>
                            </div>
                        )}

                    </Box>
                    <Button variant="contained" sx={{
                        background: '#ffe600',
                        color: '#1f2227',
                        padding: '10px 0px',
                        textAlign: 'center',
                        display: 'block',
                        width: '100%',
                        margin: '50px 0px',
                        borderRadius: '54px',
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        '&:hover': {
                            background: '#ffe600',
                            opacity: 0.8
                        }
                    }} onClick={() => handleClickOpen('dateTime')}>
                        GET TICKETS
                        <span style={{
                            display: 'block',
                            fontSize: '12px'
                        }}>from {lowest} {item.currency}</span>
                    </Button>

                </Grid>
                <Grid item xs={12} sx={{ paddingLeft: '1rem',paddingRight: '1rem' }}>
                    <p className='descPara'><b>Description</b></p>
                    <p className='descPara'>{item.description}</p>

                </Grid>
                <Grid item xs={12} sx={{ paddingLeft: '1rem',paddingRight: '1rem' }}>
                    <Box sx={{
                        marginBottom: '25px',
                        background: '#c6cbd1',
                        width: '100%',
                        height: '1px',
                        opacity: '0.3'
                    }}></Box>
                    <p className='descPara'><b> Terms & Conditions</b></p>
                    <ul>
                        <li>
                            <p className='descPara'>Bookings are made for groups of 2 to 7 players only</p>
                        </li>
                        <li>
                            <p className='descPara'>Games for adults, ages 8 to 11 must be accompanied by an adult</p>
                        </li>
                        <li>
                            <p className='descPara'>Working hours from 10:00 AM - 01:00 AM</p>
                        </li>
                    </ul>

                </Grid>

            </Grid>

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
                                onChange={(newValue) => {
                                    setDateValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ marginBottom: '5px' }} variant="subtitle1">Time</Typography>
                                <TimePicker
                                    label="Time"
                                    value={fromTimeValue}
                                    onChange={(newValue) => {
                                        setFromTimeValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />

                            </Box>
                        </Box>

                    </LocalizationProvider>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => addDateTimeArray()}>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={showModal} onClose={handleCloseShowModal}>
                <DialogTitle>Select Show</DialogTitle>
                <DialogContent>
                   
                   <Box>
                    {item.event_date && item.event_date.map((item1,key) => (
                            <Box key={key} sx={{background: '#f7a906',
                            padding: '12px',
                            cursor:'pointer',
                            borderRadius: '12px',
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center'}}>
                            <Typography variant='div' sx={{color: '#000',
                                                fontSize: '12px',
                                                maxWidth: '46px',
                                                textAlign: 'center'}}>
                            SAT <span style={{fontSize: '24px',
                                    lineHeight: '19px'}}>10</span> SEP
                            </Typography>

                            <Typography variant='h5' style={{ color: '#000',
                                                fontSize: '16px',
                                                padding: '0px 20px',
                                                textAlign: 'center'}}>
                            6:30 PM - 7:30 PM
                            </Typography>
                            </Box>
                    ))}
                   
                   </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => addDateTimeArray()}>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

        </>


    )
}

Details.getLayout = page => <HomeLayout>{page}</HomeLayout>

export default Details;