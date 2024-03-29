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
import nookies from 'nookies'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import { toast } from 'react-toastify'
import {
  updateLocation,
  getLocationById,
} from '../../../../../service/admin/location'
import { useState, useEffect } from 'react'
import objectTranslation from 'utils/objectTransaltion'
import { userAuth } from 'context/userContext'

function LocationEdit() {
  const router = useRouter()
  const [locationData, setLocationData] = useState({})
  const [locationName, setlocationName] = useState('')
  const [status, setStatus] = useState(1)
  const [loading, setLoading] = useState(false)
  // const [currentLanguage, setCurrentLanguage] = useState('')

  const userContext = userAuth()
  const locale = userContext.locale;

  //Use Effect Load Data initial Data and Set Data and set langugae

  useEffect(async() => {
    // const storageLocale = localStorage.getItem('locale')
    // setCurrentLanguage(storageLocale)
    if (router.isReady) {
    
        setLoading(true)
        await getLocationById(router.query.id).then((data) => {
          if (!data.err) {
            console.log(data)
            setLocationData(data)
            const d = objectTranslation(data.name_tr)
            setlocationName(d)
            console.log(data.status,'status')
            setStatus(data.status)
            setLoading(false)
          } else {
            setLoading(false)
            console.log(data.message)
          }
        })
     
    }
    
  }, [router.isReady,setStatus])


  useEffect(async() => {
    console.log(locationData,'locdata')
    if(locationData && locationData.name){
      const d = objectTranslation(locationData.name_tr)
      setlocationName(d);
    }
  },[locale])

  //Firebase update Location
  const storeLocation = async () => {
    console.log('locationName',locationName)
    if (locationName === '' || status === '') {
      alert('Please enter Valid data')
      return
    }
    const data = {
      [locale]: locationName,
      status: status,
      lang: locale,
    }
    setLoading(true)
    await updateLocation(router.query.id, data).then((res) => {
      console.log(res, 'ress')
      toast('Location updated successfully')
      setLoading(false)
      router.push('/admin/location')
    })
  }

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardHeader
              title="Add Location"
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
              <form onSubmit={storeLocation}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      onChange={(e) => setlocationName(e.target.value)}
                      value={locationName}
                      fullWidth
                      label="Location"
                      placeholder="Ex: Qatar,Dubai,Jordan"
                    />
                    <FormControl fullWidth sx={{ marginTop: '20px' }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                          onChange={(e) => setStatus(e.target.value)}
                          label="Status"
                          value={status}
                        >
                          <MenuItem value={1}>Active</MenuItem>
                          <MenuItem value={0} >Block</MenuItem>
                        </Select>
                      </FormControl>

                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      disabled={loading}
                      type="button"
                      onClick={() => storeLocation()}
                      variant="contained"
                      size="large"
                    >
                      Submit
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
      </Grid>
    </DatePickerWrapper>
  )
}

export default LocationEdit
