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

function BookingsCheckout(navigation) {
  const router = useRouter()
  const [item, setItem] = useState()
  const theme = useTheme()
  const [loading, setLoading] = useState(true)

  const [date, setDate] = useState('');
  const [ticket, setTickets] = useState();
  const [total, setTotal] = useState(0);
  const [carts,setCarts] = useState();
  const userContext = userAuth();
  const locale = userContext.locale;
  const t = Translations(locale);

  useEffect(async () => {
    if (router.isReady) {

      console.log(userContext,'userContext')

      const cartData = userContext.getCarts();
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
        setTickets(cartData.carts.data)
        setTotal(getTotal(cartData.carts.data))
      }
    }
  }, [router.isReady,navigation])


  const getTotal = (data) => {
    var count = 0;
    data.map((item) => {
      count = count + JSON.parse(item.price);
    })
    return count
  }

const payNow = () => {
  

  var tickets = [];
  carts.carts.data.map((item) => {
    tickets.push({
      name:item.name,
      price:item.price,
      ticketName:item.ticketName,
      fill:item.fill
    })
  })

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
    tickets:tickets

  }
  console.log(bookingData)
  setLoading(true)
  addBooking(bookingData).then(res => {
    console.log(res)
    alert(res.sucess);
    userContext.clearCartData();
    router.replace(
      {
        pathname: '/',
      },
    );
    setLoading(false)
  })
  
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
      {item && (
        <form>
        
          <Box className="checkout-box" sx={{background: `${theme.palette.background.default1}`,maxWidth:'769px',margin:'auto',padding:'15px',textAlign:'center'}}>
            <h3>
              Checkout
            </h3>
              <label>Kindly complete your booking and payment.</label>
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
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Price</TableCell>
                   </TableRow>
                </TableHead>
                <TableBody>
                  {carts.carts.data.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.ticketName}
                        <Chip sx={{marginLeft:5}} label={row.name} />
                      </TableCell>
                      <TableCell align="right">{row.price} {carts.event.currency}</TableCell>
                      </TableRow>
                  ))}
                    <TableRow
                      key='total'
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                      <b>Total</b>
                      </TableCell>
                      <TableCell align="right"><b>{total} {carts.event.currency}</b></TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          
            
             
          </Box>
          <Box sx={{backgroundColor:'#22262b',maxWidth:'769px',margin:'auto',padding:'15px'}}>
            <Box>
             <label>Choose a payment method to proceed.</label>
             </Box>
                <Button
                verient="default"
                sx={{
                  background: '#eb9d05',
                  color: '#000',
                  marginTop: '10px',
                  padding: '10px 30px',
                }}
                onClick={() => payNow()}
              >
                Pay With Credit Card
              </Button>
              <Button
                verient="default"
                sx={{
                  background: '#eb9d05',
                  color: '#000',
                  marginTop: '10px',
                  marginLeft:5,
                  padding: '10px 30px',
                }}
                onClick={() => payNow()}
              >
                Pay With Google Pay
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
