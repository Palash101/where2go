import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import HomeLayout from 'src/@core/layouts/HomeLayout'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { getAllEvents, getCategory, getFilterEvent } from 'service/admin/events'
import { Button } from '@mui/material'
import nookies from 'nookies'

function MyTickets({ user }) {
  const [data, setData] = useState([])
  const [allData, setAllData] = useState([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState({ name: 'all', status: 1 })
  const router = useRouter()

  useEffect(async () => {
    console.log(user, 'user')
    if (router.isReady) {
      if (router.query.search) {
        var search = router.query.search
      }

      const eventData = await getAllEvents()
      const eventArray = []
      eventData.docs.forEach((item) => {
        const docId = { docId: item.id }
        const data = Object.assign(docId, item.data())
        eventArray.push(data)
      })
      setAllData(eventArray)
      setData(eventArray)
      setLoading(false)
      console.log(eventArray, 'eventArray')

      getCategory().then((data) => {
        setCategories(data)
        setLoading(false)
        console.log(data, 'categories')
      })
    }
  }, [router.isReady, setAllData])

  const selectCategory = async (item) => {
    console.log(item)
    if (item.name === 'all') {
      setLoading(true)
      setAllData(data)
      setLoading(false)
    } else {
      setLoading(true)
      var edata = data.filter((item1) => item1.category === item.name)
      console.log(edata)
      setAllData(edata)
      setLoading(false)
    }
  }

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
          onClick={() => {
            router.push({
              pathname: '/details/[id]',
              query: { id: item.docId },
            })
          }}
        >
          <div className="slideItemImage">{renderImage(item)}</div>
          <p>{item.event_name}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {user === undefined || !user.length ? (
        <div className="login-cont">
          <h5>To see your tickets login with your phone number.</h5>
          <Button
            size="small"
            variant="contained"
            sx={{ background: '#ffe600', color: '#000' }}
          >
            Login
          </Button>
        </div>
      ) : (
        <div>
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
            <Grid container spacing={5} sx={{}}>
              <Grid item xs={4} md={3} sx={{}}>
                <h3>Category</h3>
                <ul className="filterList">
                  <li>
                    <Button
                      verient="default"
                      color={category.name === 'all' ? 'warning' : 'inherit'}
                      onClick={() => selectCategory({ name: 'all', status: 1 })}
                    >
                      All
                    </Button>
                  </li>
                </ul>
                <ul className="filterList">
                  {categories.length > 0 &&
                    categories.map((item, key) => (
                      <li>
                        <Button
                          verient="default"
                          color={
                            category.name === item.name ? 'warning' : 'inherit'
                          }
                          onClick={() => selectCategory(item)}
                        >
                          {item.name}
                        </Button>
                      </li>
                    ))}
                </ul>
              </Grid>
              <Grid item xs={8} md={9} sx={{ paddingLeft: '0px' }}>
                <Grid container spacing={8} sx={{}}>
                  {allData.length > 0 &&
                    allData.map((item, key) => (
                      <Grid
                        item
                        xs={6}
                        md={3}
                        key={key}
                        sx={{ paddingLeft: '0px' }}
                      >
                        {Item(item, key)}
                      </Grid>
                    ))}
                </Grid>
              </Grid>
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
        </div>
      )}
    </>
  )
}

MyTickets.getLayout = (page) => <HomeLayout>{page}</HomeLayout>

export default MyTickets

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context)
    console.log(cookies.user, 'userr')
    if (!cookies.user) {
      return {
        props: { user: {} },
      }
    }
    const userData = await verifyToken(cookies.user)
    console.log(userData, 'in index page')
    if (!userData.userType === 'customer') {
      return {
        rprops: { user: {} },
      }
    }
    return {
      props: { user: userData },
    }
  } catch (err) {
    return {
      props: { user: {} },
    }
  }
}
