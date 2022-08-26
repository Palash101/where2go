// ** React Imports
import { useState,useEffect } from 'react'
import { useRouter } from 'next/router'



// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import CircularProgress from '@mui/material/CircularProgress';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';


// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import SettingsIcon from '@mui/icons-material/Settings';
import Event from '@mui/icons-material/Event';

// ** Events Tabs Imports
import EventStep1 from 'src/views/events/EventStep1'
import EventStep2 from 'src/views/events/EventStep2'
import EventStep3 from 'src/views/events/EventStep3'
import EventStep4 from 'src/views/events/EventStep4'
import EventStep5 from 'src/views/events/EventStep5'
import EventStep6 from 'src/views/events/EventStep6'

import { getEventById } from 'service/admin/events'
import {verifyToken} from '../../../../service/auth'

import {getAllLocations} from 'service/admin/location'
import {getAllCategory} from 'service/admin/category'

import {userAuth} from 'context/userContext'
import Translations from 'utils/trans'
import nookies from "nookies";

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const EventEdit = () => {
  // ** State
  const router = useRouter();
  const [value, setValue] = useState('account')
  const [eventData, setEventData] = useState({});

  const [loading, setLoading] = useState(false);

  const [routerParams, setRouterParams] = useState('');
  const [reloadPage, setReloadPage] = useState(false)

  const [categories,setAllCategory] = useState([])
  const [locations,setAllLocations] = useState([])


  const userContext = userAuth()
  const locale = userContext.locale
  const t =  Translations(locale)


  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const refreshData = ()=>{
    if(reloadPage === true){
      setReloadPage(false)
    }
    if(reloadPage === false){
      setReloadPage(true)
    }
  }

  useEffect(()=>{
    if(router.isReady){
      setLoading(true)
      setRouterParams(router.query.eventId)
      getEventById(router.query.eventId)
        .then(data=>{
          if(!data.err){
            setEventData(data)
            setLoading(false)
            
          }
          else{
            setLoading(false)
          }
      })

    }
  },[router.isReady,reloadPage])


  const getCat =  async()=>{
    const catData =  await getAllCategory()
    const catArray =[];
    catData.docs.forEach(item=>{
    catArray.push({...item.data(),docId:item.id})
   })
    setAllCategory(catArray)
  }

  const getLocation =  async()=>{
    const locationData =  await getAllLocations()
    const locationArray =[];
    locationData.docs.forEach(item=>{
    locationArray.push(item.data())
       })
        setAllLocations(locationArray)
      }


 useEffect(()=>{
   getCat()
   getLocation()

  },[])

  if(!loading){

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Event />
                <TabName>Event Details</TabName>
              </Box>
            }
          />
         <Tab
            value='organizer'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Organizer Details</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Date/Time</TabName>
              </Box>
            }
          />
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImageSearchIcon />
                <TabName>Images</TabName>
              </Box>
            }
          />
          <Tab
            value='ticket'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalActivityIcon />
                <TabName>Tickets</TabName>
              </Box>
            }
          />
          <Tab
            value='setting'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SettingsIcon />
                <TabName>Setting</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
        <EventStep1 
        data={eventData}
        allCategory = {categories}
        allLocation = {locations}
        eventId = {routerParams}
        refreshData = {refreshData}
        />

        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <EventStep2  
          data={eventData}
          eventId = {routerParams}
          refreshData = {refreshData}
          />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='organizer'>
          <EventStep6  
          data={eventData}
          allCategory = {categories}
          allLocation = {locations}
          eventId = {routerParams}
          refreshData = {refreshData}
          />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='info'>
          <EventStep3 
          data={eventData} 
          eventId = {routerParams} 
          refreshData = {refreshData}
          />
          
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='ticket'>
          <EventStep4 
          data={eventData} 
          eventId = {routerParams} 
          refreshData = {refreshData}
          />
          
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='setting'>
          <EventStep5 
          data={eventData} 
          eventId = {routerParams} 
          refreshData = {refreshData}
          />
          
        </TabPanel>

      </TabContext>
    </Card>
  )
}
else{
  return(
    <div>
      
      <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center' }}>
          <CircularProgress />
      </Box>
    </div>
)
}
}

export default EventEdit

export async function getServerSideProps(context) {
  try{
    const cookies = nookies.get(context);
    if(!cookies.user){
      return{
        redirect:{
          permanent:false,
          destination:'/admin/login',
        },
        props:{}
      }

    }
    const userData = await verifyToken(cookies.user);
    console.log(userData,'in index page')
 
   if(userData.userType === 'admin'){
      return{
        props:{user:userData}
      }
    }
    else{
      return{
        redirect:{
          permanent:false,
          destination:'/admin/login',
        },
        props:{}
      }
    }
    

  }
  catch(err){
    return{
      redirect:{
          permanent:false,
          destination:'/admin/login'
        },
      props:{}
    }
  }


}
