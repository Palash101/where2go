// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-toastify'
import Image from 'next/image'

//Service Imports
import { updateOrganizer } from '../../../service/admin/events'

import { userAuth } from 'context/userContext'
import Translations from 'utils/trans'

import {
  getDownloadURL,
  uploadBytes,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'

const EventStep6 = ({
  data,
  eventId,
  refreshData,
  allCategory,
  allLocation,
}) => {
  const userContext = userAuth()
  const locale = userContext.locale
  const t = Translations(locale)

  const [name, setName] = useState(data.organizer ? data.organizer.name : '')
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [imageFile, setImageFile] = useState(null)
  const [email, setEmail] = useState(data.organizer ? data.organizer.email : '')
  const [phone, setPhone] = useState(data.organizer ? data.organizer.phone : '')
  const [detail, setDetail] = useState(
    data.organizer ? data.organizer.detail : '',
  )
  const [loading, setLoading] = useState(false)

  const storage = getStorage()
  const allImagesRef = ref(storage, 'events/' + eventId)
  const imagePath = 'events/organizer/' + eventId

  const updateData = async () => {
    if (name && email && phone && detail) {
      setLoading(true)
      const contactData = {
        name: name,
        image: imgSrc,
        email: email,
        phone: phone,
        detail: detail,
      }
      console.log(contactData, 'contactData')
      await updateOrganizer(eventId, contactData, locale).then((res) =>
        toast('Details updated successfully'),
      )
      refreshData()
      setLoading(false)
    } else {
      toast('Please fill all the infromation of organizer')
    }
  }

  useEffect(() => {
    console.log(data.organizer)
    if (data.organizer) {
      if (data.organizer.hasOwnProperty('image')) {
        setImgSrc(data.organizer.image)
      }
    }
  }, [locale])

  const onChange = (file) => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      setImageFile(files[0])
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
      uploadImage(files[0])
    }
  }

  const uploadImage = async (file) => {
    setLoading(true)
    const storageRef = ref(storage, imagePath + `/${file.name}`)
    const task = await uploadBytes(storageRef, file).then((res) =>
      console.log(res.ref),
    )
    const url = await getDownloadURL(storageRef)
    setImgSrc(url)
    setLoading(false)
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Box
              sx={{
                position: 'relative',
                width: 100,
                height: 100,
                borderRadius: '150px',
                overflow: 'hidden',
                margin: '20px auto',
              }}
            >
              {imgSrc !== '/images/avatars/1.png' ? (
                <Image src={imgSrc} layout="fill" />
              ) : (
                <Image src="/images/no-image.jpg" layout="fill" />
              )}
            </Box>
            <input
              type="file"
              onChange={onChange}
              accept="image/png, image/jpeg"
              id="event-upload-image2"
              style={{ position: 'absolute', opacity: 0, padding: '3px' }}
            />
            <span className="uploadbtn">Upload Profile Image</span>
          </Box>

          <Grid item xs={12} sm={12}>
            <TextField
              onChange={(e) => setName(e.target.value)}
              fullWidth
              label="Organizer Name"
              defaultValue={name}
              placeholder="Enter organizer name"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              label="Organizer email"
              defaultValue={email}
              placeholder="Enter organizer email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              label="Organizer Phone number"
              defaultValue={phone}
              placeholder="Enter phone number"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              onChange={(e) => setDetail(e.target.value)}
              fullWidth
              label="Organizer contact details"
              defaultValue={detail}
              placeholder="Enter organizer detail"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={updateData}
              variant="contained"
              sx={{ marginRight: 3.5 }}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
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
    </CardContent>
  )
}

export default EventStep6
