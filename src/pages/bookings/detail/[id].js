import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import HomeLayout from 'src/@core/layouts/HomeLayout'
import { useRouter } from 'next/router'
import moment from 'moment'
import { getEventById } from 'service/admin/events'
import { useTheme } from '@mui/material'
import { userAuth } from 'context/userContext';
import Translations from '/utils/trans';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

function BookingsDetails(navigation) {
  const router = useRouter()
  const [item, setItem] = useState()
  const theme = useTheme()
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('');
  const [ticket, setTickets] = useState();
  const [total, setTotal] = useState(0);
  const userContext = userAuth();
  const locale = userContext.locale;
  const t = Translations(locale);

  useEffect(async () => {
    if (router.isReady) {
      console.log(userContext,'kkk')

      if(userContext.authState.event){
        setItem(userContext.authState.event)
        var dt =  userContext.authState.carts.date;
        var dt1 =  moment(dt1).format("LL")
        console.log(dt1)
        setDate(dt1+' '+userContext.authState.carts.from);
      }
      else{
          getEventById(router.query.id).then((data) => {
            setItem(data)
          })
      }

      if(userContext.authState.carts){
        setTickets(userContext.authState.carts.data)
        setTotal(getTotal(userContext.authState.carts.data))
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

console.log(item)
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

        
          <Box className="checkout-box" sx={{background: `${theme.palette.background.default1}`,maxWidth:'769px',margin:'auto',padding:'15px'}}>
            <h3>
            {item.event_name.hasOwnProperty(locale)
                  ? item.event_name[locale]
                  : item.event_name[Object.keys(item.event_name)[0]]}
            </h3>
            <p>{date}</p>
              {ticket && (
                 <p style={{marginTop:10}}>{ticket.length} tickets ({total} KWD)</p>

              )}
          </Box>
       

          <Box className="checkout-box" sx={{background: `${theme.palette.background.default1}`,maxWidth:'769px',margin:'auto',padding:'15px',marginTop:5,}}>
            <Box>
                <label>Complete your booking details to continue</label>
                <PhoneInput
                      international
                      placeholder="Enter phone number"
                      value={phone}
                      className=""
                      defaultCountry="QA"
                      onChange={setPhone}
                      style={{width: '215px',
                        padding: '18px'}}
                    />
            </Box>
            
            <Box sx={{}}>
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  label="Event Your Name"
                  defaultValue={''}
                  placeholder="Enter your name"
                />
            </Box>
            <Box sx={{marginTop:5}}>
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  label="Event Your Email"
                  defaultValue={''}
                  placeholder="Enter your email"
                />
            </Box>
            <Divider sx={{marginTop:5,marginBottom:5}}/>
            <Box >
              <h3>Terms & Conditions</h3>
              <label>Please read and agree to the organizers terms and conditions</label>
          
              <p>
                {item.terms}
              </p>
            <FormGroup sx={{marginTop:5}}>
              <FormControlLabel control={<Checkbox />} label=" I agree to the terms conditions" />
            </FormGroup>
            </Box>
             
          </Box>
          <Box sx={{backgroundColor:'#22262b',maxWidth:'769px',margin:'auto',padding:'15px'}}>
                <Button
                verient="default"
                sx={{
                  background: '#eb9d05',
                  color: '#000',
                  marginTop: '10px',
                  padding: '10px 30px',
                }}
                onClick={() => console.log("")}
              >
                Checkout
              </Button>
            </Box>
         

        </form>
        )}
      </Box>

    
    </>
  )
}

BookingsDetails.getLayout = (page) => <HomeLayout>{page}</HomeLayout>

export default BookingsDetails
