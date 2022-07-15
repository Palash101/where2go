
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip'
import MUIDataTable from "mui-datatables";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';



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
  name: "event_type",
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
  	customBodyRender:(value, tableMeta, updateValue)=>{
  		return(
        <>
        <EditIcon
        onClick={()=>handleClickRowEdit(value, tableMeta)}
        sx={{color:'#9155fb',cursor:'pointer', marginRight:'10px'}}
        ></EditIcon>
        <RemoveRedEyeIcon 
        onClick={handleClickRowEdit}
        sx={{color:'#3100f5',cursor:'pointer',}}
        />
        </>
  			)
  	}
   
  }
 },
];
    const[allEvents,setAllEventData] =  useState([])
    const options = {
  filterType: 'checkbox',
};

const handleClickRowEdit=(value, tableMeta)=>{
	console.log({value, tableMeta})
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
          <MUIDataTable
			  title={"Event List"}
			  data={allEvents}
			  columns={columns}
			  options={options}
			/>
      </Grid>
     );
}

export default EventList;