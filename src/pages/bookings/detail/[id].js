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

function BookingsDetails(navigation) {
  const router = useRouter()
  const [item, setItem] = useState()
  const theme = useTheme()

  const userContext = userAuth();
  const locale = userContext.locale;
  const t = Translations(locale);

  useEffect(async () => {
    if (router.isReady) {
      getEventById(router.query.id).then((data) => {
        console.log(data)
        setItem(data)
        console.log(item)
      })
    }
  }, [router.isReady, navigation])

console.log(item,'sss')
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
        {item && (
          <Grid item xs={12} md={6} sx={{}}>
            
            <h3 className="detailHeading">
            {item.event_name.hasOwnProperty(locale)
                  ? item.event_name[locale]
                  : item.event_name[Object.keys(item.event_name)[0]]}
            </h3>
            <p>Sunday, 11 Sep, 6:30 PM</p>
            <p>3 tickets (60 KWD)</p>
           
          </Grid>
           )}
        </Grid>
      </Box>

    
    </>
  )
}

BookingsDetails.getLayout = (page) => <HomeLayout>{page}</HomeLayout>

export default BookingsDetails
