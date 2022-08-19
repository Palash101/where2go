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
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Slider from '@mui/material/Slider';
import RemoveIcon from '@mui/icons-material/Remove';


//Service Imports
import {updateEventData} from '../../../service/admin/events'

import {userAuth} from 'context/userContext'
import Translations from 'utils/trans'


const FooterMenu = (props) => {
return(

	<Box 
	sx={{position:'absolute',backgroundColor:"#000920",bottom:'50%',right:'50%',zIndex:'9999',height:'100px',width:'400px'}}>

	<Box sx={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
		<Box sx={{display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'space-between'}}>
			<Box sx={{flexDirection:'row',display:'flex',alignItems:'center',width:'100%',justifyContent:'space-between'}}>
				<AddIcon onClick={()=>props.increaseRow('row',1)} sx={{fontSize:'20px',cursor:'pointer'}}/>
				<Typography sx={{fontSize:'12px'}}>Row</Typography>
				<RemoveIcon onClick={()=>props.decreaseRow('row',1)} sx={{fontSize:'20px',cursor:'pointer'}}/>
		    </Box>
			
			<Box sx={{flexDirection:'row',display:'flex',alignItems:'center'}}>
				<AddIcon onClick={()=>props.increaseRow('row',1)} sx={{fontSize:'20px',cursor:'pointer'}}/>
				<Typography sx={{fontSize:'12px'}}>Horizontal Space</Typography>
				<RemoveIcon onClick={()=>props.decreaseRow('row',1)} sx={{fontSize:'20px',cursor:'pointer'}}/>
	    	</Box>

		</Box>
		<Box 
		sx={{height:'100px',width:'100px',borderRadius:'50%',backgroundColor:'red',display:'flex',flexDirection:'column',alignItems:'center'}}>
		<Box sx={{height:'33%'}}>
			<ArrowDropUpIcon sx={{fontSize:'60px',cursor:'pointer'}}
			onClick={()=>props.MoveUp('y',10)}/>
		</Box>
		
		<Box sx={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
			<ArrowLeftIcon sx={{fontSize:'60px',cursor:'pointer'}}
			onClick={()=>props.MoveLeft('x',10)}/>
			<ArrowRightIcon sx={{fontSize:'60px',cursor:'pointer'}}
			onClick={()=>props.MoveRight('x',10)}/>
		</Box>
		<Box sx={{height:'33%'}}>
		<ArrowDropDownIcon sx={{fontSize:'80px',cursor:'pointer'}}
			onClick={()=>props.MoveDown('y',10)}/>
		</Box>
		</Box>
		<Box>
		<Box sx={{flexDirection:'row',display:'flex',alignItems:'center'}}>
					<AddIcon onClick={()=>props.increaseCol('col',1)} sx={{fontSize:'20px',cursor:'pointer'}}/>
					<Typography sx={{fontSize:'12px'}}>Col</Typography>
					<RemoveIcon onClick={()=>props.decreaseCol('col',1)} sx={{fontSize:'20px',cursor:'pointer'}}/>
    			</Box>
    			<Box sx={{flexDirection:'row',display:'flex',alignItems:'center'}}>
					<AddIcon onClick={()=>props.increaseCol('col',1)} sx={{fontSize:'20px',cursor:'pointer'}}/>
					<Typography sx={{fontSize:'12px'}}>Vertical Space</Typography>
					<RemoveIcon onClick={()=>props.decreaseCol('col',1)} sx={{fontSize:'20px',cursor:'pointer'}}/>
    			</Box>
		

		</Box>
	</Box>



	</Box>


	)
}

export default FooterMenu;