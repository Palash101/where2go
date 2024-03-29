import FormLayoutsBasic from 'src/views/form-layouts/FormLayoutsBasic'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import CardContent from '@mui/material/CardContent'
import Snackbar from '@mui/material/Snackbar'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { verifyToken } from '../../../../service/auth'
import nookies from 'nookies'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import { userAuth } from 'context/userContext'

import { addLocation } from '../../../../service/admin/location'
import { useState } from 'react'
import { toast } from 'react-toastify'
function LocationAdd() {
  const router = useRouter()
  const [locationName, setlocationName] = useState('')
  const [status, setStatus] = useState(1)
  const [loading, setLoading] = useState(false)
  const [snackState, setSnackState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    message: 'asdasd',
  })
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const { vertical, horizontal, open, message } = snackState
  const userContext = userAuth()
  const t = userContext.getTrans()

  const handleClose = () => {
    setSnackState({ ...snackState, open: false })
  }
  const changLanguage = () => {
    setCurrentLanguage(currentLanguage == 'en' ? 'ar' : 'en')
  }

  //Firebase Store Category
  const storeLocation = async () => {
    if (locationName === '' || status === '') {
      alert('Please enter Valid data')
      return
    }
    setLoading(true)
    console.log(locationName, 'submitting')
    await addLocation(locationName, currentLanguage, status).then((res) => {
      console.log(res, 'ress')
      toast('Location added successfully')
      handleMessage()
      setLoading(false)
      router.push('/admin/location')
    })
  }
  const handleMessage = (msg) => () => {
    console.log(msg, 'hdling adasd')
    setSnackState({ open: true, ...snackState })
  }

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardHeader
              title={`${t.add} ${t.location}`}
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
              <form onSubmit={storeLocation}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      onChange={(e) => setlocationName(e.target.value)}
                      fullWidth
                      label={t.location}
                      placeholder="Ex: Qatar,Dubai,Jordan"
                    />
                   
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      disabled={loading}
                      type="button"
                      onClick={() => storeLocation()}
                      variant="contained"
                      size="large"
                    >
                      {t.submit}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
        {loading && (
          <CircularProgress
            sx={{
              position: 'absolute',
              right: '40%',
              top: '50%',
            }}
          />
        )}
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={3000}
          onClose={handleClose}
          open={open}
          message={message}
          severity="success"
          key={vertical + horizontal}
        />
      </Grid>
    </DatePickerWrapper>
  )
}

export default LocationAdd

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
