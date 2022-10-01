import { useState , useEffect } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import CircularProgress from '@mui/material/CircularProgress'
import ImageSearchIcon from '@mui/icons-material/ImageSearch'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'
import MUIDataTable from 'mui-datatables'
import { getUserById , getUserBooking } from 'service/admin/users'
import { useRouter } from 'next/router'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel';
import { userUpdate } from  'service/admin/users'
import { toast } from 'react-toastify'
function UserDetail() {

  const [value, setValue] = useState('')
  const [userData, setUserData] = useState({})
  const [userBooking, setUserBooking] = useState([])
  const router = useRouter()
  const [status, setStatus] = useState('')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
   
    if (router.isReady) {
      ;(async () => {
        // setLoading(true)
        await getUserById(router.query.id).then((data) => {
          if (!data.err) {
            console.log(data)
            setUserData(data)
            // setlocationName(data.name)
            setStatus(data.status)
            // setLoading(false)
          } else {
            // setLoading(false)
            console.log(data.message)
          }
        })
        await getUserBooking(router.query.id).then((data) => {
          if (!data.err) {
            console.log(data)
            setUserBooking(data)
            // setlocationName(data.name)
           //  setStatus(data.status)
            // setLoading(false)
          } else {
            // setLoading(false)
            console.log(data.message)
          }
        })
      })()
    }
  }, [router.isReady])

  console.log('userBooking',userBooking)

  const TransactionsData = [
    {
      transId: 'AA20NF-3NNF939-2N3-2',
      paymentMethod: 'Master',
      amount: '200QAR',
      date: '12 Aug 2022',
    },
    {
      transId: 'AA20NF-3NNF939-2N3-2',
      paymentMethod: 'Master',
      amount: '200QAR',
      date: '12 Aug 2022',
    },
    {
      transId: 'AA20NF-3NNF939-2N3-2',
      paymentMethod: 'Master',
      amount: '200QAR',
      date: '12 Aug 2022',
    },
    {
      transId: 'AA20NF-3NNF939-2N3-2',
      paymentMethod: 'Master',
      amount: '200QAR',
      date: '12 Aug 2022',
    },
    {
      transId: 'AA20NF-3NNF939-2N3-2',
      paymentMethod: 'Master',
      amount: '200QAR',
      date: '12 Aug 2022',
    },
    {
      transId: 'AA20NF-3NNF939-2N3-2',
      paymentMethod: 'Master',
      amount: '200QAR',
      date: '12 Aug 2022',
    },
    {
      transId: 'AA20NF-3NNF939-2N3-2',
      paymentMethod: 'Master',
      amount: '200QAR',
      date: '12 Aug 2022',
    },
    {
      transId: 'AA20NF-3NNF939-2N3-2',
      paymentMethod: 'Master',
      amount: '200QAR',
      date: '12 Aug 2022',
    },
    {
      transId: 'AA20NF-3NNF939-2N3-2',
      paymentMethod: 'Master',
      amount: '200QAR',
      date: '12 Aug 2022',
    },
    {
      transId: 'AA20NF-3NNF939-2N3-2',
      paymentMethod: 'Master',
      amount: '200QAR',
      date: '12 Aug 2022',
    },
  ]

  const options = {
    filterType: 'checkbox',
  }

  const columns = [
    {
      name: 'date',
      label: 'Date',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'eventLocation',
      label: 'Location',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'eventName.en',
      label: 'Event',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'total',
      label: 'Amount',

      options: {
        filter: false,
        sort: false,
      },
    },
    
  ]

   console.log('userData',status)
   const toggleChange = async (e) => {
    var id = router.query.id;
    
      // setChecked(e.target.checked)
      if (e.target.checked === false) {
         setStatus(0)
        
        await userUpdate(id, 0).then((res) =>
          toast('Status updated successfully'),
        )
        // setLoading(false)
        // refreshData()
      } else {
         setStatus(1)
        await userUpdate(id, 1).then((res) =>
          toast('Status updated successfully'),
        )
        // setLoading(false)
        // refreshData()
      }
   
  };

  return (
    <>
      <Card>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12}>
            <CardContent
              sx={{
                padding: (theme) =>
                  `${theme.spacing(3.25, 5.75, 6.25)} !important`,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
             
                <Typography variant="h6" sx={{ marginBottom: 3.5 }}>
                  User Details
                </Typography>
                {status ? (
         <Typography color={'aqua'} variant="h6" sx={{ marginBottom: 3.5 }}>
         Active
       </Typography>
      ) : (
        <Typography color={'error'} variant="h6" sx={{ marginBottom: 3.5 }}>
                  Block
                </Typography>
      )}
               

                
              </Box>

              

<FormControlLabel
          control={
            <Switch
            onChange={(e) => {
                toggleChange(e);
             }}
             checked={status == 1 ? true : ''}
             id={userData.id}
             value={userData.status} 
            />
          }
          label={status == 1 ? 'Active' : 'Block'}
        />


              <Divider sx={{ marginTop: 0.5, marginBottom: 6.75 }} />
              <Box>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="p">
                      Customer Name: Not available
                    </Typography>
                    {/* <Typography display="inline-block" variant="p">
                      SignUp Date/Time: {new Date(userData.created_at * 1000).toString() }
                    </Typography> */}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="p">
                      Mobile Number: {userData.phoneNumber}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <Divider sx={{ marginTop: 6.75, marginBottom: 6.75 }} />
      <Card>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="card navigation example">
            <Tab value="1" label="Booking List" />
            <Tab value="2" label="Transactions/Invoice" />
          </TabList>
          <CardContent>
            <TabPanel value="1" sx={{ p: 0 }}>
              <MUIDataTable
                title={'Order List'}
                data={userBooking}
                columns={columns}
                options={options}
              />
            </TabPanel>
            <TabPanel value="2" sx={{ p: 0 }}>
              <MUIDataTable
                title={'Transactions List'}
                data={userBooking}
                columns={columns}
                options={options}
              />
            </TabPanel>
          </CardContent>
        </TabContext>
      </Card>
    </>
  )
}
export default UserDetail


