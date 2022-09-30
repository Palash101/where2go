import { useState, useEffect } from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Image from 'next/image'
import Grid from '@mui/material/Grid'
import TodayIcon from '@mui/icons-material/Today'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import HomeLayout from 'src/@core/layouts/HomeLayout'
import { borderTop } from '@mui/system'
import { auto } from '@popperjs/core'
import { useRouter } from 'next/router'
import moment from 'moment'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { getEventById,getEventBooking } from 'service/admin/events'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { useTheme } from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'
import { TruckDelivery } from 'mdi-material-ui'
import SeatLayout from '../../views/booking/SeatLayout'
import { getAllFloorPLan } from 'service/admin/floorPlan'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { userAuth } from 'context/userContext'
import { toast } from 'react-toastify'


function Bookings(navigation) {
  const router = useRouter()
  const id = router.query.id
  const propDate = router.query.date
  const [item, setItem] = useState({})
  const [floorType, setFloorType] = useState(router.query.floor_type)
  const [itemNew, setItemNew] = useState({})
  const [tickets, setTickets] = useState([])
  const [featured, setFeatured] = useState(false)
  const [date, setDate] = useState('')
  const [open, setopen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [dateValue, setDateValue] = useState(null)
  const [fromTimeValue, setFromTimeValue] = useState(null)
  const [dateTimeArray, setDateTimeArray] = useState([])
  const theme = useTheme()
  const [counter, setCounter] = useState(0)
  const [displayCounter, setDisplayCounter] = useState(false)
  const [exist, setExist] = useState(false)
  const [priceOpen, setPriceOpen] = useState(false)
  const [floorData, setFloorData] = useState([])
  const [slectedTickets,setSelectedTickets] = useState([])
  const [myTickets,setMyTickets] = useState([]);
  const [totalPrice,setTotalPrice] = useState(0);
  const [allQty,setAllQty] = useState(0);

  const userContext = userAuth()

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
  ]

  const addTicket = (newarr) => {
    var myTicket = [];
    var total = 0;
    var qty = 0;
    newarr.map(t => {
      if(t.qty > 0){
        myTicket.push(t);
        total = total + JSON.parse(t.price * t.qty);
        qty = qty + t.qty;
      }
    })
    setAllQty(qty)
    setTotalPrice(total)
    setMyTickets(myTicket)
  }

  function handleIncrement(item,key) {
    if (item.qty !== JSON.parse(item.max_booking)) {
      const newData = {...item,qty:item.qty+1}
      const newarr = [...tickets]
      newarr[key] = newData
      setTickets(newarr)
      addTicket(newarr)
      
    }
  }

  function handleDecrement(item,key) {
    if (item.qty !== 0) {
      const newData = {...item,qty:item.qty-1}
      const newarr = [...tickets]
      newarr[key] = newData
      setTickets(newarr)
      addTicket(newarr)

    }
  }

  const handleClickOpen = () => {
    if (itemNew.floor_type === '0') {
      setopen(true);
    } else {
      setShowModal(true);
    }
  }

  const handleCloseShowModal = () => {
    setShowModal(false);
  };

  const handleClose = () => {
    setopen(false)
  }

  const onCircleClick = (colKey, rowKey, rectangleKey) => {

    const selecteCircle = floorData[rectangleKey].seatDots[colKey][rowKey];
    if(selecteCircle.className && selecteCircle.className === 'user-seat-selected'){
      const setSelectedClass = {...selecteCircle, className:'',border:'none'}
      const arrayCopy = [...floorData];
      arrayCopy[rectangleKey].seatDots[colKey][rowKey] = setSelectedClass
      setFloorData(arrayCopy)
      const slectedTickets1 = slectedTickets.filter(item => item.name !== setSelectedClass.name)
      setSelectedTickets(slectedTickets1)
    }
    else{
      const setSelectedClass = {...selecteCircle, className:'user-seat-selected',border:'white'}
      const arrayCopy = [...floorData];
      arrayCopy[rectangleKey].seatDots[colKey][rowKey] = setSelectedClass
      setFloorData(arrayCopy)
      setSelectedTickets([...slectedTickets,setSelectedClass])

    }

    
  };


  const addDateTimeArray = () => {
    const date = moment(dateValue).format('DD-MM-YYYY')
    // const formTime = moment(fromTimeValue).format('HH:mm a');
    // const toTime = moment(fromTimeValue).format('HH:mm a');
    const data = {
      date: date,
      from: fromTimeValue,
      to: fromTimeValue,
    }
    var dt = moment(dateValue).format('ll')
    var time = fromTimeValue
    setDate(dt + ', ' + time)

    // router.replace({
    //     pathname: '/bookings/[id]',
    //     query: { id: router.query.id ,date:date,from:formTime,to:toTime,floor_type:itemNew.floor_type},
    // })

    // itemNew.event_date.map((item1) => {
    //   if (date === item1.date) {
    //     setExist(true)
    //   }
    // })

    handleClose()
  }

  useEffect(async () => {
    if (router.isReady) {
      const cartData = userContext.getCarts();
      setDate(cartData.carts.date+' '+cartData.carts.from)
      

      getEventById(router.query.id).then((data) => {
        setFloorType(data.floor_type)
        if (data.plan) {
          setFloorData(JSON.parse(data.plan))
        }

        var arr = []
        data.tickets.map((item2) => {
          if (item2.min_booking) {
            item2.qty = 0
          } else {
            item2.qty = 0
          }
          arr.push(item2)
        })

        setTickets(arr)
        data.tickets = arr
        console.log(data, 'booking')
        setItemNew(data)

        // data.event_date.map((item1) => {
        //   if (propDate === item1.date) {
        //     setExist(true)
        //   }
        // })

      })

      //  var dt = moment().format('LLLL');
     // setDate(propDate)
    }
  }, [router.isReady, navigation,setItemNew])

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
    console.log(slectedTickets, 'ss')
    if(slectedTickets.length > 0){
    userContext.setCartData({
      carts:{
        data:slectedTickets,
        date:userContext.authState.carts.date,
        from:userContext.authState.carts.from,
        to:userContext.authState.carts.to
      },
      event:itemNew
    })

    router.push(
      {
        pathname: '/bookings/detail/[id]',
        query: {
          id: router.query.id,
        },
      },
    );
    }
    else{
      toast('Please add tickets.')
    }
  }


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

    router.reload(true)
    handleClose();
  };

  const addToCart = () => {
    if(myTickets.length > 0){
    userContext.setCartData({
      carts:{
        data:myTickets,
        date:userContext.authState.carts.date,
        from:userContext.authState.carts.from,
        to:userContext.authState.carts.to
      },
      event:itemNew
    })

    router.push(
      {
        pathname: '/bookings/detail/[id]',
        query: {
          id: router.query.id,
        },
      },
    );
    }
    else{
      toast('Please add tickets.')
    }
  }


  const renderDates = (item1, itemNew,key) => {
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
        onClick={() => clickEvent(item1, itemNew)}
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
      <Box
        sx={{
          marginTop: '65px',
          left: 0,
          right: 0,
          background: `${theme.palette.background.default1}`,
          zIndex: 9,
          textAlign: 'center',
        }}
      >
        <Grid container spacing={4} justifyContent="center" sx={{}}>
          <Grid item xs={12} md={6} sx={{}}>
            <h3 className="detailHeading">{item.event_name}</h3>
          </Grid>
          <Grid item xs={12} md={6} sx={{}}>
            <Box
              className="calenderDate"
              onClick={() => handleClickOpen('dateTime')}
            >
              {date}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {floorType === '1' && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 9,
            margin: '15px',
            border: '3px solid #8d8d8d',
            padding: '5px 21px',
            borderRadius: '20px',
            background: '#000',
            fontSize: '14px',
          }}
          onClick={handlePriceClick}
        >
          Ticket Prices
        </Box>
      )}

      {floorType === '1' && date ? (
        <SeatLayout date={date} slectedTickets={slectedTickets} data={floorData} onCircleClick={onCircleClick} click={puchaseClick} />
      ):(<></>)}

      {floorType === '0' && (
        <div>
        
            <Box
              sx={{
                maxWidth: '764px',
                margin: 'auto',
                marginTop: '24px',
              }}
            >
              {tickets &&
                tickets.map((item1, key) => (
                  <Paper
                    elevation={3}
                    key={key}
                    sx={{
                      padding: '15px',
                      display: 'flex',
                      backgroundColor: `${theme.palette.background.default1}`,
                      marginBottom: 5,
                      /// borderTopWidth: '4px',
                      //borderTopColor: `${item1.color}`,
                      //  borderTopStyle: 'solid',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div className="cartLeft">
                      <h5>{item1.name}</h5>
                      <p>{item1.description}</p>
                    </div>
                    <div className="cartRight">
                      <div className="d-flex">
                          <button onClick={() => handleIncrement(item1,key)} className="plusBtn">+</button>
                          <button  disabled className="qtyBtn">{item1.qty} </button>
                          <button onClick={() => handleDecrement(item1,key)} className="minusBtn">-</button>
                      </div>
                      <h4>
                        {item1.price} {tickets.currency}
                      </h4>
                    </div>
                  </Paper>
                ))}


               <Box className="bottomBlock1">
                  <Button
                    verient="default"
                    sx={{
                      background: '#eb9d05',
                      color: '#000',
                      marginTop: '10px',
                      padding: '10px',
                      justifyContent: 'space-between',
                      width: '100%',
                      borderRadius:'24px',
                      paddingLeft:'20px',
                      fontSize:12,
                      ':hover':{
                        background: '#ffa800',
                      }
                    }}
                    onClick={() => addToCart()}
                  >
                    <span>Purchase {myTickets && myTickets.length ? (<span>{allQty} Tickets for {totalPrice} {itemNew.currency}</span>):(<></>)}</span>
                    <ChevronRightIcon color='#000' size={24}/>
                  </Button>
              </Box>
            </Box>
        
        </div>
      )}

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
                label="Date"
                value={dateValue}
                inputFormat="MM/dd/yyyy"
                closeOnSelect={true}
                views={['year', 'month', 'day']}
                minDate={new Date()}
                onChange={(newValue) => {
                  setDateValue(newValue)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ marginTop: '5px' }} variant="subtitle1">
                  Time Slot
                </Typography>
               
                <Select
                  required
                  sx={{ width: '250px' }}
                  onChange={(e) => setFromTimeValue(e.target.value)}
                  label="Time"
                  defaultValue={fromTimeValue}
                >
                  {Array.isArray(itemNew.slots) && itemNew.slots.map((item) => (
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

      <Dialog open={showModal} onClose={handleCloseShowModal}>
            <DialogTitle>Select Show</DialogTitle>
            <DialogContent>
              <Box>
                {itemNew.event_date &&
                  itemNew.event_date.map((item1, key) => renderDates(item1,itemNew,key))}
              </Box>
            </DialogContent>
          </Dialog>

      <Dialog open={priceOpen} onClose={handlePriceClose}>
        <DialogContent>
          <ul className="prlist">
            {itemNew.tickets &&
              itemNew.tickets.map((item1, key) => (
                <li>
                  <Box>
                    <span
                      className="circleList"
                      style={{ backgroundColor: item1.color }}
                    ></span>{' '}
                    {item1.name}
                  </Box>
                  <Box>
                    {item1.price} {itemNew.currency}
                  </Box>
                </li>
              ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  )
}

Bookings.getLayout = (page) => <HomeLayout>{page}</HomeLayout>

export default Bookings
