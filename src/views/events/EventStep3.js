// ** React Imports
import { useState, useEffect } from 'react'
import Image from 'next/image'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'

import { userAuth } from 'context/userContext'
import Translations from 'utils/trans'

import { styled } from '@mui/material/styles'

import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

import { uploadEventImage } from '../../../service/admin/events'

import {
  getDownloadURL,
  uploadBytes,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { ImageFilterHdr } from 'mdi-material-ui'
import { toast } from 'react-toastify'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}))
const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center',
  },
}))
const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
}))

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  }
}

const EventStep3 = ({ data, eventId, refreshData }) => {
  const userContext = userAuth()
  const locale = userContext.locale
  const t = Translations(locale)
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [imageFile, setImageFile] = useState(null)
  const [eventAllImages, setEventAllImage] = useState([])
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState(null)

  //Firebase Storgae
  const storage = getStorage()
  const allImagesRef = ref(storage, 'events/' + eventId)
  const imagePath = 'events/' + eventId

  const onChange = (file) => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      setImageFile(files[0])
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  const uploadImage = async () => {
    if (!imageFile || !type) {
      alert('Image cannnot be blank')
      return
    }
    setLoading(true)
    const storageRef = ref(storage, imagePath + `/${imageFile.name}`)
    const task = await uploadBytes(storageRef, imageFile).then((res) =>
      console.log(res.ref),
    )
    const url = await getDownloadURL(storageRef)
    console.log(url, 'Retured URL')
    await uploadEventImage(eventId, url, type)
    toast('image uploaded successfully')
    setLoading(false)
    refreshData(true)
  }

  useEffect(() => {
    /*
    //Function For getting all Image from particaular Path

    const getImageData = async ()=>{
      setLoadding(true)
     await listAll(allImagesRef).then((resp)=>{
        resp.items.forEach((item)=>{
          getDownloadURL(item).then((url)=>{
            setEventAllImage([url])
          })
        })
        setLoadding(false)
        console.log(resp)
      })
    }
    getImageData()

    */

    console.log('data in event step 1', data)
  }, [])

  return (
    <form>
      <Grid container spacing={7}>
        <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between ',
            }}
          >
            {/* <ImgStyled src={imgSrc} alt='Profile Pic' /> */}
            <Box
              sx={{
                paddingLeft: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 20px',
                width: '100%',
              }}
            >
              <Box>
                <InputLabel>{`${t.banner} ${t.type}`}</InputLabel>
                <Select
                  required
                  onChange={(e) => setType(e.target.value)}
                  label="Event Type"
                  defaultValue={type}
                >
                  <MenuItem value="main">{t.main}</MenuItem>
                  <MenuItem value="banner1">{`${t.square} ${t.image} 1`}</MenuItem>
                  <MenuItem value="banner2">{`${t.square} ${t.image} 2`}</MenuItem>
                </Select>
              </Box>
              <Box>
                <ButtonStyled
                  component="label"
                  variant="contained"
                  htmlFor="account-settings-upload-image"
                >
                  {`${t.upload} ${t.event} ${t.images}`}
                  <input
                    type="file"
                    onChange={onChange}
                    accept="image/png, image/jpeg"
                    id="event-upload-image2"
                  />
                </ButtonStyled>
                <Typography variant="body2" sx={{ marginTop: 5 }}>
                  {`${t.allowed} PNG ${t.or} JPEG. ${t.max} ${t.size} 800K.`}
                </Typography>
              </Box>
              <Box>
                <ResetButtonStyled
                  color="success"
                  variant="outlined"
                  onClick={uploadImage}
                >
                  {t.upload}
                </ResetButtonStyled>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={7}>
        <Grid item xs={12} sm={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box
              sx={{
                alignItems: 'center',
                width: '100%',
                position: 'relative',
              }}
            >
              <Typography sx={{ marginBottom: '20px', textAlign: 'center' }}>
                {' '}
                {`${t.main} ${t.banner} ${t.image}`}
              </Typography>
              <p
                style={{ textAlign: 'center', fontSize: '12px', color: 'red' }}
              >
                {' '}
                {t.features}
              </p>

              <Box
                sx={{
                  position: 'relative',
                  height: 350,
                  maxWidth: '769px',
                  margin: 'auto',
                  marginBottom: '20px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                {data.images?.main ? (
                  <Image src={data.images.main} layout="fill" />
                ) : (
                  <Image src="/images/no-image.jpg" layout="fill" />
                )}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  maxWidth: '769px',
                  margin: 'auto',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginRight: '20px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: 150,
                      borderRadius: '12px',
                    }}
                  >
                    {data.images?.banner1 ? (
                      <Image src={data.images.banner1} layout="fill" />
                    ) : (
                      <Image src="/images/no-image.jpg" layout="fill" />
                    )}
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                    >
                      {`${t.square} ${t.image} 1`}
                    </Button>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ position: 'relative', height: 150 }}>
                    {data.images?.banner2 ? (
                      <Image src={data.images.banner2} layout="fill" />
                    ) : (
                      <Image src="/images/no-image.jpg" layout="fill" />
                    )}
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                    >
                      {`${t.square} ${t.image} 2`}
                    </Button>
                  </Box>
                </Box>
              </Box>

              {/* <ImageList sx={{ width: '100%', height: 450 }} cols={2} rowHeight={164}>
                    {!loadding && data.images.map((item,key) => (
                      <ImageListItem key={key}>
                      <img
                        src={`${item}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        loading="lazy"
                      />
                    </ImageListItem>
                    ))}
                  </ImageList> */}
            </Box>
          </Box>
        </Grid>
      </Grid>

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
    </form>
  )
}

export default EventStep3
