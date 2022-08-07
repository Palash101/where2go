
import Grid from '@mui/material/Grid'

import { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip'
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button'
import Link from '@mui/material/Link';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useRouter } from 'next/router'
import {verifyToken} from '../../../../service/auth'
import nookies from "nookies";


import {getAllEvents} from '../../../../service/admin/events'

function EventList() {
	const router = useRouter()
	const[allEvents,setAllEventData] =  useState([])
    const options = {
	  filterType: 'checkbox',
	};

	const columns = [
	 {
	  name: "event_name",
	  label: "Event Name",
	  options: {
	   filter: false,
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
	  name: "docId",
	  label: "Action",

	  options: {
	  	filter:false,
	  	sort: false,
	  	customBodyRender:(value, tableMeta, updateValue)=>{
	  		return(
	        <>
	        <EditIcon
	        onClick={()=>handleEditEvent(value)}
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
	    

const handleClickRowEdit=(value, tableMeta)=>{
	console.log({value, tableMeta})
}
const handleEditEvent=(value)=>{
	router.push('/admin/events/'+value)
}

    useEffect(async ()=>{
       const eventData =  await getAllEvents()
       const eventArray =[];
       eventData.docs.forEach(item=>{
       	const docId = {docId:item.id}
       	const data = Object.assign(docId,item.data());
        eventArray.push(data)
       })
       setAllEventData(eventArray)

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
  