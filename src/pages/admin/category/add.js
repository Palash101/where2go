import FormLayoutsBasic from 'src/views/form-layouts/FormLayoutsBasic'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useState } from 'react'
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
import Switch from '@mui/material/Switch'
import Input from '@mui/material/Input'
import FormControlLabel from '@mui/material/FormControlLabel'

import { userAuth } from 'context/userContext'

import { useRouter } from 'next/router'

import { addCategory } from '../../../../service/admin/category'

import { verifyToken } from '../../../../service/auth'
import nookies from 'nookies'

function CategoryAdd() {
  const router = useRouter()
  const [show, setShow] = useState(true)

  const [categoryName, setCategoryName] = useState('')
  const [arabicName, setArabicName] = useState('')
  const [englishName, setEnglishName] = useState('')
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

  //Firebase Store Category
  const storeCategory = async () => {
    if (categoryName === '' || status === '') {
      alert('Please enter Valid data')
      return
    }

    setLoading(true)
    // alert(englishName)
    await addCategory(categoryName, currentLanguage, status).then((res) => {
      console.log(res, 'ress')
      // alert(res);
      handleMessage()
      setLoading(false)
      router.push('/admin/category')
    })
  }
  const handleMessage = (msg) => () => {
    console.log(msg)
    setSnackState({ open: true, ...snackState })
  }
  const changLanguage = () => {
    setCurrentLanguage(currentLanguage == 'en' ? 'ar' : 'en')
  }

  return (
    <DatePickerWrapper dir={currentLanguage == 'ar' ? 'rtl' : 'ltr'}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardHeader
              title={`${t.add} ${t.categories}`}
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
              <form>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      onChange={(e) => setCategoryName(e.target.value)}
                      fullWidth
                      label={`${t.categories} ${t.name} `}
                      placeholder="Ex: Drama, Game, Movie"
                    />
                    <FormControl sx={{ marginTop: '20px' }} fullWidth>
                      <InputLabel id="form-layouts-separator-multiple-select-label">
                        {t.status}
                      </InputLabel>
                      <Select
                        onChange={(e) => setStatus(e.target.value)}
                        id="form-layouts-separator-multiple-select"
                        labelId="form-layouts-separator-multiple-select-label"
                        input={
                          <OutlinedInput
                            label="Language"
                            id="select-multiple-language"
                          />
                        }
                        required
                      >
                        <MenuItem value="1">{t.active}</MenuItem>
                        <MenuItem value="0">{t.block}</MenuItem>
                      </Select>

                      <div>
                        <FormControlLabel
                          control={<Switch onChange={changLanguage} />}
                          label={currentLanguage}
                        />
                      </div>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      disabled={loading}
                      type="button"
                      onClick={storeCategory}
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

export default CategoryAdd

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
