// ** React Imports
import { useState,useEffect } from 'react'
import Image from 'next/image'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress'

import { styled } from '@mui/material/styles'

import DateTimeComponent from './components/DateTimeComponent'
import LocationComponent from './components/LocationComponent'
import ContactComponent from './components/ContactComponent'

import { updateEventById } from 'service/admin/events'

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import {uploadEventImage} from '../../../service/admin/events'

import {
  deleteObject,
  getDownloadURL,
  uploadBytes,
  getStorage,
  listAll,
  ref ,
  uploadBytesResumable,
} from "firebase/storage";
import { ImageFilterHdr } from 'mdi-material-ui'


const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))
const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))
const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))


function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}



const EventStep3 = ({data,eventId,refreshData}) => {
    const [openAlert, setOpenAlert] = useState(true)
    const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
    const [imageFile,setImageFile] = useState(null);
    const [eventAllImages,setEventAllImage]=useState([])
    const [loadding, setLoadding]= useState(false)

    //Firebase Storgae
    const storage = getStorage();
    const allImagesRef = ref(storage,'events/'+eventId)
    const imagePath ='events/'+eventId
  
    

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      setImageFile(files[0])
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  const uploadImage = async ()=>{
    if(!imageFile){
      alert('Image cannnot be blacnk')
      reutrn
    }
    const storageRef = ref(storage,imagePath+`/${imageFile.name}`) 
    const task =  await uploadBytes(storageRef,imageFile).then((res)=>console.log(res.ref))
    const url =  await getDownloadURL(storageRef) 
    console.log(url,'Retured URL')
    await uploadEventImage(eventId,url)
    refreshData(true)
    
  }

  useEffect(()=>{
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
   
    console.log('data in event step 1',data)
  },[])

    return(
        <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload Event Images
                  <input
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='event-upload-image2'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='success' variant='outlined' onClick={uploadImage}>
                  Upload
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>
          </Grid>
          <Grid container spacing={7}>
          <Grid item xs={12} sm={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
          <Box  sx={{ display: 'flex', alignItems: 'center',width:'100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center',width:'100%' }}>
                <ImageList sx={{ width: '100%', height: 450 }} cols={2} rowHeight={164}>
                    {!loadding && data.images.map((item,key) => (
                      <ImageListItem key={key}>
                      <img
                        src={`${item}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        loading="lazy"
                      />
                    </ImageListItem>
                    ))}
                  </ImageList>

              </Box>
            </Box>
          </Grid>
          </Grid>
        </form>

    )
}

export default EventStep3;