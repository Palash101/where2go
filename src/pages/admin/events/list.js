
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Chip from '@mui/material/Chip'
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button'



import {getAllEvents} from '../../../../service/admin/events'

function EventList() {
	const columns = [
 {
  name: "event_name",
  label: "Event Name",
  options: {
   filter: true,
   sort: true,
  }
 },
 {
  name: "eventType",
  label: "Event Type",
  options: {
   filter: true,
   sort: true,
  }
 },
  {
  name: "Action",
  label: "Action",
  options: {
  	customBodyRender:()=>{
  		return(
  			<Button onClick={handleClickRowEdit} variant="outlined" color="secondary">
                Edit
              </Button>
  			)
  	}
   
  }
 },
];
    const[allEvents,setAllEventData] =  useState([])
    const options = {
  filterType: 'checkbox',
};

const handleClickRowEdit=()=>{
	console.log('Row Clicked')
}

    useEffect(async ()=>{
       const eventData =  await getAllEvents()
       const eventArray =[];
       eventData.docs.forEach(item=>{
        eventArray.push(item.data())
       })
       setAllEventData(eventArray)
       console.log(allEvents,'eventData Array')


    },[])

    const renderStatusChip = (status,color) =>{
      return(
        <div>
          <span 
          style={{
            padding: "4px 10px",
            borderRadius:"12px",
            backgroundColor:color,
            color:"#fdfdfd",
            fontSize:"12px"
        }}>{status}</span>
        </div>
      )
    }


    return ( 
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Event Categories' titleTypographyProps={{ variant: 'h6' }} />
            <MUIDataTable
			  title={"Employee List"}
			  data={allEvents}
			  columns={columns}
			  options={options}
			/>
            
          </Card>
      </Grid>
     );
}

export default EventList;