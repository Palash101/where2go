import { useEffect, useState } from "react"
import MUIDataTable from 'mui-datatables'
import Grid from '@mui/material/Grid'
import objectTranslation from 'utils/objectTransaltion';

import {getAllBookings} from 'service/admin/booking'

const BookingList = ()=>{
    const [allBookings, setAllBookingsData] = useState([]);


    const options = {
        filterType: 'checkbox',
      }
    const columns = [
        {
          name: 'date',
          label: 'Event Date',
          options: {
            filter: false,
            sort: true,
          },
        },
        {
          name: 'eventName',
          label: 'Event Name',
          options: {
            filter: true,
            sort: true,
          },
        },
        {
            name: 'userName',
            label: 'User Name',
            options: {
              filter: true,
              sort: true,
            },
          },
      ]

    useEffect(async () => {
        const bookingData = await getAllBookings()
        const bookingArray = []
        console.log(bookingData,'bookingData')
        bookingData.docs.forEach((item) => {
          const docId = { docId: item.id }
          const { eventName,cartDetail } = item.data()
          const tansEventName = objectTranslation(eventName)
          const event_data = { ...item.data(),docId:docId,eventName:tansEventName,userName:cartDetail.name  }
          bookingArray.push(event_data)
        })
        setAllBookingsData(bookingArray)
      }, [])
    
    return(
        <Grid item xs={12}>
        <MUIDataTable
          title={'Booking List'}
          data={allBookings}
          columns={columns}
          options={options}
        />
      </Grid>
    )
    
}

export default BookingList