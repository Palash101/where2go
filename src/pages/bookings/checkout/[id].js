import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import HomeLayout from 'src/@core/layouts/HomeLayout'
import { useRouter } from 'next/router'
import moment from 'moment'
import { getEventById } from 'service/admin/events'
import { Typography, useTheme } from '@mui/material'
import { userAuth } from 'context/userContext';
import Translations from '/utils/trans';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { addBooking } from 'service/admin/users'
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-toastify'

function BookingsCheckout(navigation) {
  const router = useRouter()
  const [item, setItem] = useState()
  const theme = useTheme()
  const [loading, setLoading] = useState(true)

  const [date, setDate] = useState('');
  const [ticket, setTickets] = useState();
  const [total, setTotal] = useState(0);
  const [carts,setCarts] = useState();
  const [totalPrice,setTotalPrice] = useState(0);
  const [allQty,setAllQty] = useState(0);


  const userContext = userAuth();
  const locale = userContext.locale;
  const t = Translations(locale);

  useEffect(async () => {
    if (router.isReady) {
      console.log(userContext,'userContext')
      const cartData = userContext.getCarts();
      console.log(!cartData.event ,'dddd')
      if(!cartData.event) {
        router.push('/')
      }
      else{
     
      setCarts(cartData);
     
      if(cartData.event){
        setItem(cartData.event)
        var dt =  cartData.carts.date;
        var dt1 =  moment(dt1).format("LL")
        console.log(dt1)
        setDate(dt1+' '+cartData.carts.from);
      }
      else{
          getEventById(router.query.id).then((data) => {
            setItem(data)
          })
      }

      if(cartData.carts){
        if(cartData.event.floor_type === '0'){
          getCartTicket(cartData.carts.data)
        }
        else{
        setTickets(cartData.carts.data)
        setTotal(getTotal(cartData.carts.data))
        }
      }
    }
      setLoading(false)
    }
  }, [router.isReady,navigation])

  const getCartTicket = (data) => {
    var total = 0;
    var qty = 0;
    data.map(t => {
      if(t.qty > 0){
        total = total + JSON.parse(t.price * t.qty);
        qty = qty + t.qty;
      }
    })
    setAllQty(qty)
    setTotal(total)
  }


  const getTotal = (data) => {
    var count = 0;
    data.map((item) => {
      count = count + parseInt(item.price);
    })
    return count
  }

const payNow = () => {
  
  if(carts.uId === null){
    toast("Please login before proceeding")
  }
  else{
  var tickets = [];
  if(item.floor_type === '0'){
    carts.carts.data.map((item) => {
      tickets.push(item)
    })
  }
  else{
  carts.carts.data.map((item) => {
    tickets.push({
      name:item.name,
      price:item.price,
      ticketName:item.ticketName,
      fill:item.fill
    })
  })
  }
  var bookingData = {
    uId:carts.uId,
    userType:carts.userType,
    cartDetail:carts.carts.userDetail,
    date:carts.carts.date,
    from:carts.carts.from,
    to:carts.carts.to,
    eventId:carts.event.id,
    eventName:carts.event.event_name,
    eventLocation:carts.event.event_location,
    tickets:tickets,
    total:total,
    currency:carts.event.currency,
    quantity:allQty,
  }
  console.log(bookingData)
  setLoading(true)
  addBooking(bookingData).then(res => {
    alert(res.msg);
   router.replace('/');
   setLoading(false)
   setTimeout(()=> {
    userContext.clearCartData();
   },1000)
   })
  }
}

  return (
    <>
      <Box
        sx={{
          marginTop: '65px',
          left: 0,
          right: 0,
          zIndex: 9,
        }}
      >  

    {loading === true && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(0 0 0 / 39%)',
            zIndex: 99999999,
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <CircularProgress />
        </Box>
      )}


      {item && (
        <form>
        
          <Box className="checkout-box" sx={{background: `${theme.palette.background.default1}`,maxWidth:'769px',margin:'auto',padding:'15px',textAlign:'center'}}>
            <h3>
              {t.checkout}
            </h3>
              <label>{t.kindly_complete_booking}</label>
          </Box>
       

          <Box className="checkout-box" sx={{background: `${theme.palette.background.default1}`,maxWidth:'769px',margin:'auto',padding:'15px',marginTop:5,}}>
            <Box>
            <h3>
            {item.event_name.hasOwnProperty(locale)
                  ? item.event_name[locale]
                  : item.event_name[Object.keys(item.event_name)[0]]}
            </h3>
            <p>{date}</p>
              
            </Box>
           

            <TableContainer component={Paper} sx={{background: `${theme.palette.background.default}`,marginTop:5,marginBottom:5}}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>{t.description}</TableCell>
                    {item.floor_type === '0'&& (
                    <TableCell>Q.</TableCell>
                    )}
                    <TableCell align="right">{t.price}</TableCell>
                   </TableRow>
                </TableHead>
                <TableBody>
                  {carts.carts.data.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      {item.floor_type === '0' ? (
                        <TableCell component="th" scope="row">

                        {row.name}

                        </TableCell>
                      )
                      :
                      (
                      <TableCell component="th" scope="row">

                        {row.ticketName}
                        <Chip sx={{marginLeft:5}} label={row.name} />

                      </TableCell>
                      )}
                      {item.floor_type === '0'&& (
                      <TableCell component="th" scope="row">
                        {row.qty}
                      </TableCell>
                      )}
                      <TableCell align="right">{row.price} {carts.event.currency}</TableCell>
                      </TableRow>
                  ))}
                    <TableRow
                      key='total'
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                     
                      <b>{allQty > 0 ? (<span>{allQty} Tickets,</span>):(<></>)} Total</b>
                      </TableCell>
                      {item.floor_type === '0'&& (
                        <TableCell component="th" scope="row"></TableCell>
                      )}
                      <TableCell align="right"><b>{total} {carts.event.currency}</b></TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          
            
             
          </Box>
          <Box sx={{backgroundColor:'#22262b',maxWidth:'769px',margin:'auto',padding:'15px'}}>
            <Box>
             <label>{t.choose_pay_method}</label>
             </Box>
                <Button
                verient="default"
                sx={{
                  background: '#eb9d05',
                  color: '#000',
                  marginTop: '10px',
                  padding: '10px 30px',
                  ':hover':{
                    background: '#eb9d05',
                  }
                }}
                onClick={() => payNow()}
              >
                {t.pay_with_credit_card}
              </Button>
              <Button
                verient="default"
                sx={{
                  background: '#eb9d05',
                  color: '#000',
                  marginTop: '10px',
                  marginLeft:5,
                  padding: '10px 30px',
                  ':hover':{
                    background: '#eb9d05',
                  }
                }}
                onClick={() => payNow()}
              >
                {t.pay_with_google_pay}
              </Button>
            </Box>
         

        </form>
        )}
      </Box>

    
    </>
  )
}

BookingsCheckout.getLayout = (page) => <HomeLayout>{page}</HomeLayout>

export default BookingsCheckout


