import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router'
import { addEevent } from '../../../../service/admin/events'

import { useState } from 'react'
import { getAllCategoryWithStatus } from '../../../../service/admin/category'
import { getAllLocations } from '../../../../service/admin/location'
import { verifyToken } from '../../../../service/auth'
import { userAuth } from 'context/userContext'
import Translations from 'utils/trans'
import { toast } from 'react-toastify'
import nookies from 'nookies'

function EventCreate() {
  const [eventName, seteventName] = useState('')
  const [country, setCountry] = useState('')
  const [currency, setCurrency] = useState('')
  const [eventType, seteventType] = useState('')
  const [eventCat, setEventCat] = useState('')
  const [loading, setLoading] = useState(false)
  const [floorType, setFloorType] = useState('0')

  const router = useRouter()

  const [allCategory, setAllCategory] = useState([])
  const [allLocation, setAllLocations] = useState([])

  const userContext = userAuth()
  const locale = userContext.locale
  const t = Translations(locale)

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleEventSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    console.log(loading)
    await addEevent(
      eventName,
      country,
      currency,
      eventType,
      eventCat,
      locale,
      floorType,
    ).then((data) => {
      // console.log(data, 'Returned Data')
      toast('Event added successfully')
      router.push('/admin/events/' + data.docId)
    })
    setLoading(false)
  }

  useEffect(() => {
    const getCat = async () => {
      const catData = await getAllCategoryWithStatus()
      const catArray = []
      catData.docs.forEach((item) => {
        catArray.push({ ...item.data(), docId: item.id })
      })
      setAllCategory(catArray)
    }
    getCat()

    const getLocation = async () => {
      const locationData = await getAllLocations()
      const locationArray = []
      locationData.docs.forEach((item) => {
        locationArray.push(item.data())
      })
      setAllLocations(locationArray)
    }
    getLocation()
  }, [])

  if (loading == false) {
    return (
      <>
        <Card>
          <CardHeader
            title={`${t.create} ${t.event}`}
            titleTypographyProps={{ variant: 'h6' }}
          />
          <CardContent>
            <form onSubmit={handleEventSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={`${t.event} ${t.name}`}
                    placeholder={`${t.enter} ${t.event} ${t.name}`}
                    onChange={(e) => seteventName(e.target.value)}
                  />
                  {eventName == '' ? (
                    <FormHelperText>{`${t.please} ${t.enter} ${t.event} ${t.name}`}</FormHelperText>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="form-layouts-separator-select-label">
                    {t.country}
                    </InputLabel>
                    <Select
                      label={t.country}
                      defaultValue=""
                      id="form-layouts-separator-select"
                      labelId="form-layouts-separator-select-label"
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      {allLocation.map((location) => (
                        <MenuItem value={location.name}>
                          {location.name}
                        </MenuItem>
                      ))}
                      <MenuItem value="Dubai">Dubai</MenuItem>
                      <MenuItem value="Jordan">Jordan</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="form-layouts-separator-select-label">
                      {t.currency}
                    </InputLabel>
                    <Select
                      label="{t.currency}"
                      defaultValue=""
                      id="form-layouts-separator-select"
                      labelId="form-layouts-separator-select-label"
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <MenuItem value="QAR">QAR</MenuItem>
                      <MenuItem value="INR">INR</MenuItem>
                      <MenuItem value="USD">USD</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="form-layouts-separator-select-label">
                      {`${t.event} ${t.type}`}
                    </InputLabel>
                    <Select
                      label={`${t.event} ${t.type}`}
                      defaultValue="Classes"
                      id="form-layouts-separator-select"
                      labelId="form-layouts-separator-select-label"
                      onChange={(e) => seteventType(e.target.value)}
                    >
                      <MenuItem value="Show">Show</MenuItem>
                      <MenuItem value="Music">Music</MenuItem>
                      <MenuItem value="Game">Game</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="form-layouts-separator-select-label">
                      {`${t.event} ${t.category}`}
                    </InputLabel>
                    <Select
                      label="Category"
                      defaultValue=""
                      id="form-layouts-separator-select"
                      labelId="form-layouts-separator-select-label"
                      onChange={(e) => setEventCat(e.target.value)}
                    >
                      {allCategory.map((item, key) => {
                        const { docId, name } = item
                        return (
                          <MenuItem key={key} value={docId}>
                            {name.hasOwnProperty(locale)
                              ? name[locale]
                              : name[Object.keys(name)[0]]}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="form-layouts-separator-select-label">
                      {`${t.event} ${t.ticket} ${t.type}`}
                    </InputLabel>

                    <Select
                      onChange={(e) => setFloorType(e.target.value)}
                      sx={{ marginBottom: '10px' }}
                      fullWidth
                      label="Ticket Floor Type"
                      defaultValue={floorType}
                    >
                      <MenuItem value="" selected>
                        {`${t.select}  ${t.type}`}
                      </MenuItem>
                      <MenuItem value="0">{t.Donthavefloorplan}</MenuItem>
                      <MenuItem value="1">{t.Includesfloorplan}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      gap: 5,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Button type="submit" variant="contained" size="large">
                      {`${t.create} ${t.event}`}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </>
    )
  } else {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CircularProgress />
      </Box>
    )
  }
}

export default EventCreate

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context)
    if (!cookies.user) {
      return {
        redirect: {
          permanent: false,
          destination: '/admin/login',
        },
        props: {},
      }
    }
    const userData = await verifyToken(cookies.user)
    console.log(userData, 'in index page')

    if (userData.userType === 'admin') {
      return {
        props: { user: userData },
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: '/admin/login',
        },
        props: {},
      }
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login',
      },
      props: {},
    }
  }
}
