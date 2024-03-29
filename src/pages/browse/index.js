import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import HomeLayout from 'src/@core/layouts/HomeLayout'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { getBrowseEvents, getCategory, getFilterEvent } from 'service/admin/events'
import { Button } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { userAuth } from 'context/userContext'
import Translations from 'utils/trans'

function Browse() {
  const [data, setData] = useState([])
  const [allData, setAllData] = useState([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [dlist, setDlist] = useState(false)
  const [category, setCategory] = useState({ name: 'all', status: 1 })
  const router = useRouter()
  const userContext = userAuth()
  const locale = userContext.locale
  const t = Translations(locale)

  useEffect(async () => {
    if (router.isReady) {
      if (router.query.search) {
        var search = router.query.search
      }

      const eventData = await getBrowseEvents()
    
      setAllData(eventData)
      setData(eventData)
      setLoading(false)
      console.log(eventData, 'eventArray')

      getCategory().then((data) => {
        setCategories(data)
        setLoading(false)
        console.log(data, 'categories')
      })
    }
  }, [router.isReady, setAllData])

  const selectCategory = async (item) => {
    console.log(item, data, 'hhh')
    if (item.name === 'all') {
      setLoading(true)
      setAllData(data)
      setLoading(false)
      setDlist(false)
      setCategory(item)
    } else {
      setLoading(true)
      var edata = data.filter((item1) => item1.cat_id === item.id)
      setCategory(item)
      console.log(edata)
      setAllData(edata)
      setLoading(false)
      setDlist(false)
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
              query: { id: item.id },
            })
          }}
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
        <Grid container spacing={5} sx={{}}>
          <Grid item xs={12} md={3} sx={{}}>
            <div className={dlist === true ? 'dideList active' : 'dideList'}>
              <h3>{t.category}</h3>
              <span className="catRemove" onClick={() => setDlist(!dlist)}>
                X
              </span>
              <ul className="filterList">
                <li>
                  <Button
                    verient="default"
                    color={category.name === 'all' ? 'warning' : 'inherit'}
                    onClick={() => selectCategory({ name: 'all', status: 1 })}
                  >
                    {t.all}
                  </Button>
                </li>
              </ul>
              <ul className="filterList">
                {categories.length > 0 &&
                  categories.map((item, key) => (
                    <li>
                      <Button
                        verient="default"
                        color={category.id === item.id ? 'warning' : 'inherit'}
                        onClick={() => selectCategory(item)}
                      >
                        {item.name.hasOwnProperty(locale)
                          ? item.name[locale]
                          : item.name[Object.keys(item.name)[0]]}
                      </Button>
                    </li>
                  ))}
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} md={9} sx={{ paddingLeft: '0px' }}>
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

      <Box
        sx={{
          position: 'fixed',
          bottom: '100px',
          background: '#f7a906c7',
          width: '72px',
          height: '72px',
          textAlign: 'center',
          lineHeight: '72px',
          color: '#000',
          borderRadius: '42px',
          right: '20px',
        }}
        onClick={() => setDlist(!dlist)}
      >
        <FilterListIcon
          fontSize={'large'}
          sx={{ marginTop: '20px' }}
        ></FilterListIcon>
      </Box>
    </>
  )
}

Browse.getLayout = (page) => <HomeLayout>{page}</HomeLayout>

export default Browse
