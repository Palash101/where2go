// ** React Imports
import { useState } from 'react'
import { useEffect } from 'react'
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


// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import EventStep1 from 'src/views/events/EventStep1'
import EventStep2 from 'src/views/events/EventStep2'
import EventStep3 from 'src/views/events/EventStep2'

import { getEventById } from 'service/admin/events'

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

const AccountSettings = () => {
  // ** State
  const router = useRouter();
  const [value, setValue] = useState('account')
  const [eventData, setEventData] = useState({});
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [routerParams, setRouterParams] = useState('');


  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(()=>{
    if(router.isReady){
      setLoading(true)
      setRouterParams(router.query.eventId)
      getEventById(router.query.eventId)
        .then(data=>{
          if(!data.err){
            console.log('Seeting upd data state')
            setEventData(data)
            setLoading(false)
          }
          else{
            setError(true)
            setErrorMsg(data.err)
            setLoading(false)
          }
        console.log('data in event Page',data)
      })

    }
  },[router.isReady])

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
                <AccountOutline />
                <TabName>Event Details</TabName>
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
                <InformationOutline />
                <TabName>Images</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
        <EventStep1 
        data={eventData}
        eventId = {routerParams}
        />

        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <EventStep2  
          data={eventData}
          eventId = {routerParams}
          />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='info'>
          <EventStep3 />
          data={eventData} 
          eventId = {routerParams} 
        </TabPanel>
      </TabContext>
    </Card>
  )
}
else{
  return(

    <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center' }}>
    <CircularProgress />
</Box>
)
}
}

export default AccountSettings
