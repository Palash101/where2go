import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import TodayIcon from '@mui/icons-material/Today';
import MapIcon from '@mui/icons-material/Map';
import HomeLayout from 'src/@core/layouts/HomeLayout';
import { borderTop } from '@mui/system';
import { auto } from '@popperjs/core';
import { useRouter } from 'next/router';
import moment from 'moment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { getEventById } from 'service/admin/events';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { userAuth } from 'context/userContext';
import Translations from '/utils/trans';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {getTicketCollection} from '../../../service/admin/events'



import { toast } from 'react-toastify';

function Details(navigation) {
  const router = useRouter();
  const [ticketsData, setTicketData] = useState([])
  const id = router.query.id;
  const [item, setItem] = useState({});
  const [lowest, setLowest] = useState('');
  const [open, setopen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dateValue, setDateValue] = useState(null);
  const [fromTimeValue, setFromTimeValue] = useState(null);
  const [dateTimeArray, setDateTimeArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationLink,setLocationLink] = useState('')
  const [terms,setTerms] = useState('');
  const [description,setDesc] = useState('')
  const times = [
    '10:00 AM',
    '11:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
    '07:00 PM',
    '08:30 PM',
    '10:00 PM',
  ];

  const userContext = userAuth();
  const locale = userContext.locale;
  const t = Translations(locale);


  const termsSet = (item,para,val) => {
    if (item.hasOwnProperty(val)) {
      const ename = para.hasOwnProperty(locale)
        ? para[locale]
        : para[Object.keys(para)[0]]
      return ename
    }
  }

  const handleClickOpen = () => {
    if (item.floor_type === '0') {
      setopen(true);
    } else {
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setopen(false);
  };
  const handleCloseShowModal = () => {
    setShowModal(false);
  };

  const addDateTimeArray = () => {
    const date = moment(dateValue).format('DD-MM-YYYY');
    //  const formTime = moment(fromTimeValue).format('HH:mm a');
    // const toTime = moment(fromTimeValue).format('HH:mm a');


    const data = {
      date: date,
      from: fromTimeValue,
      to: fromTimeValue,
    };

    userContext.setCartData({
      carts:{
        data:[],
        date:date,
        from:fromTimeValue,
        to:fromTimeValue
      },
      event:item
    })

    console.log(data);
    router.replace({
      pathname: '/bookings/[id]',
      query: {
        id: router.query.id,
        floor_type: item.floor_type,
      },
    });
    handleClose();
  };

  const clickEvent = (item1, item) => {
   
  
    userContext.setCartData({
      carts:{
        data:[],
        date:item1.date,
        from:item1.from,
        to:item1.to
      },
      event:item
    })

    router.push(
      {
        pathname: '/bookings/[id]',
        query: {
          id: router.query.id,
          floor_type: item.floor_type,
        },
      }
      
    );
    handleClose();
    
  };

  const openLink = () => {
    window.open(locationLink, '_blank');
  }



  useEffect(() => {
    if (router.isReady) {
      getTicketsData();
      setLoading(true);
    
        
      getEventById(router.query.id).then((data) => {
        console.log(data,'dd in details');

       
        setItem(data);
        setTerms(termsSet(data,data.terms,'terms'))
        setDesc(termsSet(data,data.description,'description'))
        
        if(data.place_id){
          var loc = encodeURIComponent(data.event_location);
         setLocationLink('https://www.google.com/maps/search/?api=1&query='+loc+'&query_place_id='+data.place_id)
        }

      });
      setLoading(false);
    }
    console.log(item);
  }, [router.isReady, navigation]);
  useEffect(() =>{
   
    if (ticketsData && ticketsData.length) {
      console.log('hello')
      console.log(ticketsData,'ticketCollectionData');
      var lowest = Number.POSITIVE_INFINITY;
      var highest = Number.NEGATIVE_INFINITY;
      var tmp;
      for (var i = ticketsData.length - 1; i >= 0; i--) {
        console.log(ticketsData[i].price,'lowest');
        tmp = (ticketsData[i].price);
        
        if (tmp < lowest) lowest = tmp;
        if (tmp > highest) highest = tmp;
       
      }
      console.log(lowest,'lowest');
      setLowest(lowest);
      
    } else {
      setLowest(0);
    }

  },[ticketsData])

  const getTicketsData = async () => {
    const tickets = await getTicketCollection(router.query.id)
    
    const ticketsArray = []
    tickets.docs.forEach((item) => {
      const docId = { docId: item.id }
      const data = Object.assign(docId, item.data())
      ticketsArray.push(data)
    })
    console.log(ticketsArray,'Oldtickets');
    setTicketData(ticketsArray)
    
  }

  useEffect(() => {
        setItem(item);
        setTerms(termsSet(item,item.terms,'terms'))
        setDesc(termsSet(item,item.description,'description'))
  },[locale])


const renderDateItem = (item1, item,key) => {
  var dt = item1.date.split('-')
  var dt1 = dt[1]+'-'+dt[0]+'-'+dt[2];
  var disable = false;
  if(moment(dt1).isBefore(new Date()) === true){
    disable = true;
  }
  return(
    <Box
      key={key}
      sx={{
        background: (disable === true) ? '#ffe7b4a8' : '#f7a906',
        padding: '12px',
        cursor: 'pointer',
        borderRadius: '12px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        pointerEvents:(disable === true) ? 'none' : 'initial',
      }}
      onClick={() => clickEvent(item1, item)}
    >
      <Typography
        variant="div"
        sx={{
          color: '#000',
          fontSize: '12px',
          maxWidth: '90px',
          textAlign: 'center',
        }}
      >
        {item1.date}
      </Typography>

      <Typography
        variant="h5"
        style={{
          color: '#000',
          fontSize: '16px',
          padding: '0px 20px',
          textAlign: 'center',
        }}
      >
        {item1.from} - {item1.to}
      </Typography>
    </Box>
  )
}

  return (
    <>
      {Object.keys(item).length === 0 ? (
        <div>loading</div>
      ) : (
        <>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{
              marginTop: '60px',
              maxWidth: 900,
              width: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingBottom: '20px',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}
          >
            <Grid
              item
              xs={12}
              md={8}
              sx={{ paddingLeft: '1rem', paddingRight: '1rem' }}
            >
              <div className="detailImage">
                {item.images && (
                  <img src={item.images.banner1} className="detailImg" />
                )}
              </div>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
              alignItems="center"
              sx={{
                paddingTop: '50px',
                paddingLeft: '1rem',
                paddingRight: '1rem',
              }}
            >
              <h3 className="detailHeading">
                {item.event_name.hasOwnProperty(locale)
                  ? item.event_name[locale]
                  : item.event_name[Object.keys(item.event_name)[0]]}
              </h3>
              <Box>
                <div className="catdet">
                  {item.organizer && (
                    <div className="subDetail">
                      <span>
                        <img
                          src={item.organizer.image}
                          width={50}
                          height={50}
                          style={{ borderRadius: '50%' }}
                        />
                      </span>
                      <div>
                      <h5>{item.organizer.name}</h5>
                      <h5>{item.organizer.email}</h5>
                      </div>
                    </div>
                  )}
                  <h6 className="contactLine">
                    Have a queston? Tap to contact us
                  </h6>
                </div>
              </Box>
              <Box
                sx={{
                  textAlign: 'center',
                  background: '#84848426 !important',
                  margin: '25px 0px',
                  padding: '20px 10px',
                  borderRadius: '10px',
                }}
              >
                <TodayIcon sx={{ fontSize: 40 }} />
                {item.event_date && item.event_date.length   && (
                  <h6 className="dayLine">
                    {item.event_date[0].date} -{' '}
                    {item.event_date[item.event_date.length - 1].date}
                  </h6>
                )}
                {item.event_location && (
                  <div className="locbox" onClick={() => openLink(locationLink)}>
                    <MapIcon sx={{ fontSize: 40 }} />
                    <h6 className="dayLine2"> {item.event_location}</h6>
                  </div>
                )}
              </Box>
              {ticketsData.length !== 0 && (
              <button
                variant="contained"
                className='detailTicketBtn'
                sx={{
                  ':hover':{
                    background: '#ffa800',
                  }
                }}
                onClick={() => handleClickOpen('dateTime')}
              >
                GET TICKETS
                <span
                  style={{
                    display: 'block',
                    fontSize: '12px',
                  }}
                >
                  from {lowest} {item.currency}
                </span>
              </button>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ paddingLeft: '1rem', paddingRight: '1rem' }}
            >
              <p className="descPara">
                <b>Description</b>
              </p>
              <p className="descPara">
                {description ? (
                    description
                ) : (
                  <Typography>No Description Found</Typography>
                )}
              </p>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ paddingLeft: '1rem', paddingRight: '1rem' }}
            >
              <Box
              
                sx={{
                  marginBottom: '25px',
                  background: '#c6cbd1',
                  width: '100%',
                  height: '1px',
                  opacity: '0.3',
                }}
              ></Box>
              <p className="descPara">
                <b> Terms & Conditions</b>
              </p>

              <div className='mb-100' dangerouslySetInnerHTML={{ __html: terms }}>
                
              </div>
              {/* <ul>
                <li>
                  <p className="descPara">
                    Bookings are made for groups of 2 to 7 players only
                  </p>
                </li>
                <li>
                  <p className="descPara">
                    Games for adults, ages 8 to 11 must be accompanied by an
                    adult
                  </p>
                </li>
                <li>
                  <p className="descPara">
                    Working hours from 10:00 AM - 01:00 AM
                  </p>
                </li>
              </ul> */}
            </Grid>
          </Grid>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Select Date</DialogTitle>
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
                    value={dateValue}
                    inputFormat="dd-MM-yyyy"
                    closeOnSelect={true}
                    views={['year', 'month', 'day']}
                    minDate={new Date()}
                    onChange={(newValue) => {
                      setDateValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ marginTop: '5px' }} variant="subtitle1">
                      Time
                    </Typography>
                    

                    <Select
                      required
                      sx={{ width: '250px' }}
                      onChange={(e) => setFromTimeValue(e.target.value)}
                      label="Time"
                      defaultValue={fromTimeValue}
                    >
                      {Array.isArray(item.slots) && item.slots.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                    {/* <TextField
                                                    id="time"
                                                    label="Time"
                                                    type="time"
                                                    defaultValue={fromTimeValue}
                                                    fullWidth
                                                    onChange={(newValue) => {
                                                        setFromTimeValue(newValue);
                                                    }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                    inputProps={{
                                                    step: 300, // 5 min
                                                    }}
                                                    sx={{ width: 251}}
                                            /> */}
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
                {item.event_date &&
                  item.event_date.map((item1, key) => renderDateItem(item1,item,key))}
              </Box>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}

Details.getLayout = (page) => <HomeLayout>{page}</HomeLayout>;

export default Details;


