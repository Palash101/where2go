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

function Details(navigation) {
  const router = useRouter();
  const id = router.query.id;
  const [item, setItem] = useState({});
  const [lowest, setLowest] = useState('');
  const [open, setopen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dateValue, setDateValue] = useState(null);
  const [fromTimeValue, setFromTimeValue] = useState(null);
  const [dateTimeArray, setDateTimeArray] = useState([]);
  const [loading, setLoading] = useState(false);
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
    console.log(data);
    router.replace({
      pathname: '/bookings/[id]',
      query: {
        id: router.query.id,
        date: date,
        from: fromTimeValue,
        to: fromTimeValue,
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

  useEffect(() => {
    if (router.isReady) {
      setLoading(true);
      getEventById(router.query.id).then((data) => {
        console.log(data);
        setItem(data);
        if (data.tickets && data.tickets.length) {
          var lowest = Number.POSITIVE_INFINITY;
          var highest = Number.NEGATIVE_INFINITY;
          var tmp;
          for (var i = data.tickets.length - 1; i >= 0; i--) {
            tmp = JSON.parse(data.tickets[i].price);
            if (tmp < lowest) lowest = tmp;
            if (tmp > highest) highest = tmp;
          }
          setLowest(lowest);
        } else {
          setLowest(0);
        }
      });
      setLoading(false);
    }
    console.log(item);
  }, [router.isReady, navigation]);

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
                {item.event_date && (
                  <h6 className="dayLine">
                    {item.event_date[0].date} -{' '}
                    {item.event_date[item.event_date.length - 1].date}
                  </h6>
                )}
                {item.event_location && (
                  <div className="locbox">
                    <MapIcon sx={{ fontSize: 40 }} />
                    <h6 className="dayLine2"> {item.event_location}</h6>
                  </div>
                )}
              </Box>
              <Button
                variant="contained"
                sx={{
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
                    opacity: 0.8,
                  },
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
              </Button>
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
                {item.hasOwnProperty('description') ? (
                  item.description.hasOwnProperty(locale) ? (
                    item.description[locale]
                  ) : (
                    item.description[Object.keys(item.description)[0]]
                  )
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

              <p>
                {item.terms}
              </p>
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
                  item.event_date.map((item1, key) => (
                    <Box
                      key={key}
                      sx={{
                        background: '#f7a906',
                        padding: '12px',
                        cursor: 'pointer',
                        borderRadius: '12px',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
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
                  ))}
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
