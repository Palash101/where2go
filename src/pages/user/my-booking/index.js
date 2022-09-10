import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import HomeLayout from 'src/@core/layouts/HomeLayout'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import nookies from 'nookies'
import { verifyToken } from 'service/auth'
import Translations from 'utils/trans'
import { userAuth } from 'context/userContext'
import { getUserBooking } from 'service/admin/users'
import { useTheme } from '@emotion/react'
import { Chip } from '@mui/material'

function MyBooking({ user }) {
  const [allData, setAllData] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const theme = useTheme()
  const userContext = userAuth()
  const locale = userContext.locale
  const t = Translations(locale)

  useEffect(async () => {
    console.log(user, 'uuu')
    if (router.isReady && user.uid) {

        getUserBooking(user.uid).then(data => {
            setAllData(data)
            console.log(data,'data')
            setLoading(false)
        })
      
     
    }
  }, [router.isReady])

  

  function Item(item, i) {
    return (
      <div key={i}>
        <Box className="checkout-box" sx={{background: `${theme.palette.background.default1}`,maxWidth:'769px',margin:'auto',padding:'15px'}}>
            <Box style={{justifyContent:'space-between',display:'flex'}}>
                <div>
                    <h3>
                    {item.eventName.hasOwnProperty(locale)
                        ? item.eventName[locale]
                        : item.eventName[Object.keys(item.eventName)[0]]}
                    </h3>
                   
                    <h4 style={{margin:0,marginBottom:10,fontWeight:'600'}}>{item.eventLocation}</h4>
                    <p>{item.date} {item.from}</p>
                </div>
                <div>
                    <h3>{item.total} {item.currency}</h3>
                </div>
            </Box>
              {item.tickets.map((item1,key1) => (
                <Chip sx={{marginTop:3,marginRight:3}} key={key1} label={item1.name+' - ' +item1.price+' '+item.currency} />
                ))}


          </Box>


      </div>
    )
  }

  return (
    <>
      <Box
        sx={{
          marginRight: '5rem',
          marginLeft: '5rem',
          marginTop: '90px',
          maxWidth: 1180,
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        <Box sx={{maxWidth:'769px',margin:'auto',display:'flex',justifyContent:'space-between'}}>
        <h2>My Bookings</h2>
        <h2>({allData.length})</h2>
        </Box>
        
        <Grid container spacing={5} sx={{}}>
          {allData.length > 0 &&
            allData.map((item, key) => (
              <Grid item xs={12} md={12} key={key} sx={{ paddingLeft: '0px' }}>
                {Item(item, key)}
              </Grid>
            ))}
        </Grid>

     
      </Box>
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
    </>
  )
}

MyBooking.getLayout = (page) => <HomeLayout>{page}</HomeLayout>

export default MyBooking

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context)
    console.log(cookies.user, 'userr')
    if (!cookies.user) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
        props: {},
      }
    }
    const userData = await verifyToken(cookies.user)
    console.log(userData, 'in index page')
    if (!userData.userType === 'customer') {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
        props: {},
      }
    }
    return {
      props: { user: userData },
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    }
  }
}
