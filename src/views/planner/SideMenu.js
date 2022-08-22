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
import {toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

//Service Imports
import {updateEventData} from '../../../service/admin/events'

import {userAuth} from 'context/userContext'
import Translations from 'utils/trans'
import { useRouter } from 'next/router'


const SideMenu = (props) => {
	const router = useRouter();
return(

	<Box sx={{marginTop:'40%'}}>
		<Box sx={{display:'flex',alignItems:'center',flexDirection:'column',position: 'fixed',paddingLeft: 'calc(8.33% - 51px)'}}>
			<Box sx={{marginBottom:'10px'}}>
				<AddIcon sx={{fontSize:'50px',cursor:'pointer'}}
				onClick = {props.addNewElement}
				/>
			</Box>
			<Box sx={{marginBottom:'10px'}}>
				<DeleteIcon sx={{fontSize:'40px',cursor:'pointer'}}
				onClick = {props.deleteSelectedElement}
				/>
			</Box>
			<Box sx={{marginBottom:'10px'}}>
				<ConfirmationNumberIcon sx={{fontSize:'40px',cursor:'pointer'}} 
				onClick = {props.addTicketData}/>
			</Box>
			<Box className='placer' sx={{marginBlock:'150%'}}></Box>
			<Box sx={{marginBottom:'10px'}}>

			<Button onClick={() => router.back()}>Back</Button>
			<Button onClick={props.saveData}>Save Data</Button>
				
			</Box>
		</Box>
	</Box>
	)
}

export default SideMenu;