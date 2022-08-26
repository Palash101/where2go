import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import HomeLayout from 'src/@core/layouts/HomeLayout'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { getAllEvents } from 'service/admin/events'
import nookies from 'nookies'
import { verifyToken } from 'service/auth'
import Translations from 'utils/trans'
import { userAuth } from 'context/userContext'

function Dashboard({ user }) {
  const [allData, setAllData] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const userContext = userAuth()
  const locale = userContext.locale
  const t = Translations(locale)

  useEffect(async () => {
    console.log(user, 'uuu')
    if (router.isReady) {
      const eventData = await getAllEvents()
      const eventArray = []
      eventData.docs.forEach((item) => {
        const docId = { docId: item.id }
        const data = Object.assign(docId, item.data())
        eventArray.push(data)
      })
      setAllData(eventArray)
      setLoading(false)
      console.log(eventArray, 'eventArray')
    }
  }, [router.isReady])

  function renderImage(item) {
    if (item.href) {
      return (
        <img
          src={item.href}
          alt="Picture of the author"
          className="itemImage1"
        />
      )
    } else if (item.images) {
      return (
        <img
          src={item.images.banner1}
          alt="Picture of the author"
          className="itemImage1"
        />
      )
    } else {
      return (
        <img
          src="/images/logos/logo.png"
          alt="Picture of the author"
          className="itemImage"
        />
      )
    }
  }

  function Item(item, i) {
    return (
      <div key={i}>
        <div
          className="slideItem"
          onClick={() =>
            router.push({
              pathname: '/details/[id]',
              query: { id: item.id },
            })
          }
        >
          <div className="slideItemImage">{renderImage(item)}</div>
          <p>
            {item.event_name.hasOwnProperty(locale)
              ? item.event_name[locale]
              : item.event_name[Object.keys(item.event_name)[0]]}
          </p>
        </div>
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
        <Grid container spacing={10} sx={{}}>
          {allData.length > 0 &&
            allData.map((item, key) => (
              <Grid item xs={6} md={3} key={key} sx={{ paddingLeft: '0px' }}>
                {Item(item, key)}
              </Grid>
            ))}
        </Grid>

        {/* {allData.length > 0 && 
            allData.map((item,key) => ( 
                <div>
                   <div>
                        {item.data &&
                            item.data.map((item1,i) => Item(item1,i)
                            )
                        }
                    </div>
                </div>
             ))
        } */}
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

Dashboard.getLayout = (page) => <HomeLayout>{page}</HomeLayout>

export default Dashboard

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
