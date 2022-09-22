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
import { toast } from 'react-toastify'

function BookingsDetails(navigation) {
  const router = useRouter()
  const [item, setItem] = useState()
  const theme = useTheme()
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [agree, setAgree] = useState(false)
  const [carts, setCarts] = useState();
  const [date, setDate] = useState('');
  const [ticket, setTickets] = useState();
  const [total, setTotal] = useState(0);
  const userContext = userAuth();
  const locale = userContext.locale;
  const t = Translations(locale);

  useEffect(async () => {
    if (router.isReady) {
      const cartData = userContext.getCarts();
      setCarts(cartData)


      if(cartData.event){
        setItem(cartData.event)
        var dt =  cartData.carts.date;
        setDate(dt+' '+cartData.carts.from);
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
  const handleCheck = (e) => {
    setAgree(e.target.checked);
  };

  const EmailValidation = (mail) => {
    var regexEmail = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
    if(mail.match(regexEmail)) {
      return true;
    }
    return false;
  }

  const checkout = () => {


    if(carts.uId === null){
      toast("Please login before proceeding")
    }
    else{

      if(EmailValidation(email) && isValidPhoneNumber(phone) && name !== ''){
        if(agree === true){

          var userDetail = {
            email:email,
            phone:phone,
            name:name
          }

          userContext.setCartData({
            ...carts,
            carts:{
              ...carts.carts,
              userDetail:userDetail,
            }
          })
          router.push(
              {
                pathname: '/bookings/checkout/[id]',
                query: {
                  id: router.query.id,
                },
              },
            );

        }
        else{
          toast('Please agree our terms & conditions.')
        }
      }
      else{
        toast('Please enter valid details');
      }
    }
     
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

        
          <Box className="checkout-box" sx={{background: `${theme.palette.background.default1}`,maxWidth:'690px',margin:'auto',padding:'15px'}}>
            <h3>
            {item.event_name.hasOwnProperty(locale)
                  ? item.event_name[locale]
                  : item.event_name[Object.keys(item.event_name)[0]]}
            </h3>
            <p>{date}</p>
              {ticket && (
                 <p style={{marginTop:10}}>{ticket.length} tickets ({total} {item.currency})</p>

              )}
          </Box>
       

          <Box className="checkout-box" sx={{background: `${theme.palette.background.default1}`,maxWidth:'690px',margin:'auto',padding:'15px',marginTop:5,}}>
            <Box style={{}}>
                <label>Complete your booking details to continue</label>
                <PhoneInput
                      international
                      placeholder="Enter phone number"
                      value={phone}
                      className=""
                      defaultCountry="QA"
                      onChange={setPhone}
                      style={{width: '315px',
                      direction:'ltr',
                        padding: '18px'}}
                    />
            </Box>
            <Box style={{display:'flex'}}>
              <Box sx={{}}>
                  <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label="Enter Your Name"
                    defaultValue={name}
                    placeholder="Enter your name"
                  />
              </Box>
              <Box sx={{marginLeft:5}}>
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Enter Your Email"
                    defaultValue={email}
                    placeholder="Enter your email"
                  />
              </Box>
            </Box>

            <Divider sx={{marginTop:5,marginBottom:5}}/>
            <Box >
              <h3>Terms & Conditions</h3>
              <label>Please read and agree to the organizers terms and conditions</label>
          
              <div className='mb-100' dangerouslySetInnerHTML={{ __html: item.terms }}>
                
              </div>
            <FormGroup sx={{marginTop:5}}>
              <FormControlLabel control={<Checkbox checked={agree}
                                                    onChange={handleCheck}
                                                    inputProps={{ 'aria-label': 'controlled' }} />} label=" I agree to the terms conditions" />
            </FormGroup>
            </Box>
             
          </Box>
          <Box sx={{backgroundColor:'#22262b',maxWidth:'690px',margin:'auto',padding:'15px'}}>
                <Button
                verient="default"
                sx={{
                  background: '#eb9d05',
                  color: '#000',
                  marginTop: '10px',
                  padding: '10px 30px',
                  ':hover':{
                    background: '#ffa800',
                  }
                }}
                onClick={() => checkout()}
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
