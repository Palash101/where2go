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
import { toast } from 'react-toastify';
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
import { updateEventData } from '../../../service/admin/events'

import { userAuth } from 'context/userContext'
import Translations from 'utils/trans'


const FooterMenu = (props) => {
	return (

		<Box
			sx={{ position: 'absolute', backgroundColor: "#000920", bottom: '53%', left: 'calc(57.67% - 200px)', zIndex: '9999', height: '100px', width: '400px', borderRadius: '5px', boxShadow: '0px 0px 2px 0px #aa5656' }}>

			<Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
					<Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
						<AddIcon onClick={() => props.increaseRow('row', 1)} sx={{ fontSize: '20px', cursor: 'pointer' }} />
						<Typography sx={{ fontSize: '12px' }}><svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="10.1746" cy="20.3904" r="4.5" fill="white" />
							<circle cx="36.1746" cy="19.3904" r="4.5" fill="white" />
							<path d="M29.8552 21.1668C30.441 20.581 30.441 19.6313 29.8552 19.0455L20.3092 9.49954C19.7234 8.91375 18.7737 8.91375 18.1879 9.49954C17.6021 10.0853 17.6021 11.0351 18.1879 11.6209L26.6732 20.1061L18.1879 28.5914C17.6021 29.1772 17.6021 30.127 18.1879 30.7127C18.7737 31.2985 19.7234 31.2985 20.3092 30.7127L29.8552 21.1668ZM17.7721 21.6061H28.7945V18.6061H17.7721V21.6061Z" fill="white" />
						</svg>

						</Typography>
						<RemoveIcon onClick={() => props.decreaseRow('row', 1)} sx={{ fontSize: '20px', cursor: 'pointer' }} />
					</Box>

					<Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
						<AddIcon onClick={() => props.increaseRow('row', 1)} sx={{ fontSize: '20px', cursor: 'pointer' }} />
						<Typography sx={{ fontSize: '12px' }}>Horizontal Space</Typography>
						<RemoveIcon onClick={() => props.decreaseRow('row', 1)} sx={{ fontSize: '20px', cursor: 'pointer' }} />
					</Box>
					<Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
						<AddIcon onClick={() => props.increaseRow('row', 1)} sx={{ fontSize: '20px', cursor: 'pointer' }} />
						<Typography sx={{ fontSize: '12px' }}>L-rotet</Typography>
						<RemoveIcon onClick={() => props.decreaseRow('row', 1)} sx={{ fontSize: '20px', cursor: 'pointer' }} />
					</Box>

				</Box>
				{/* <Box 
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
		<ArrowDropDownIcon sx={{fontSize:'60px',cursor:'pointer'}}
			onClick={()=>props.MoveDown('y',10)}/>
		</Box>
		</Box> */}
				<Box
					sx={{ height: '100px', width: '100px', borderRadius: '50%', backgroundColor: '#ff3d00', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Box className='updown' sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', top: '-10px' }}>
						<ArrowDropUpIcon sx={{ fontSize: '60px', cursor: 'pointer' }}
							onClick={() => props.MoveUp('y', 10)} />
						<ArrowDropDownIcon sx={{ fontSize: '60px', cursor: 'pointer' }}
							onClick={() => props.MoveDown('y', 10)} />
					</Box>

					<Box className='leftright' sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: '20%' }}>
						<ArrowLeftIcon sx={{ fontSize: '60px', cursor: 'pointer' }}
							onClick={() => props.MoveLeft('x', 10)} />
						<ArrowRightIcon sx={{ fontSize: '60px', cursor: 'pointer' }}
							onClick={() => props.MoveRight('x', 10)} />
					</Box>
				</Box>
				<Box>
					<Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
						<AddIcon onClick={() => props.increaseCol('col', 1)} sx={{ fontSize: '20px', cursor: 'pointer' }} />
						<Typography sx={{ fontSize: '12px' }}><svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="20.5" cy="9.5" r="4.5" transform="rotate(90 20.5 9.5)" fill="white" />
							<circle cx="21.5" cy="35.5" r="4.5" transform="rotate(90 21.5 35.5)" fill="white" />
							<path d="M19.7236 29.1806C20.3094 29.7664 21.2591 29.7664 21.8449 29.1806L31.3909 19.6347C31.9767 19.0489 31.9767 18.0991 31.3909 17.5133C30.8051 16.9276 29.8553 16.9276 29.2695 17.5133L20.7843 25.9986L12.299 17.5133C11.7132 16.9276 10.7634 16.9276 10.1777 17.5133C9.59188 18.0991 9.59188 19.0489 10.1777 19.6347L19.7236 29.1806ZM19.2843 17.0975L19.2843 28.1199H22.2843L22.2843 17.0975H19.2843Z" fill="white" />
						</svg>
						</Typography>
						<RemoveIcon onClick={() => props.decreaseCol('col', 1)} sx={{ fontSize: '20px', cursor: 'pointer' }} />
					</Box>
					<Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
						<AddIcon onClick={() => props.increaseCol('col', 1)} sx={{ fontSize: '20px', cursor: 'pointer' }} />
						<Typography sx={{ fontSize: '12px' }}>Vertical Space</Typography>
						<RemoveIcon onClick={() => props.decreaseCol('col', 1)} sx={{ fontSize: '20px', cursor: 'pointer' }} />
					</Box>
					<Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
						<AddIcon onClick={() => props.increaseRow('row', 1)} sx={{ fontSize: '20px', cursor: 'pointer' }} />
						<Typography sx={{ fontSize: '12px' }}>R-test</Typography>
						<RemoveIcon onClick={() => props.increaseXSpace('rowIncrementPoistionBy', 10)} sx={{ fontSize: '20px', cursor: 'pointer' }} />
					</Box>


				</Box>
			</Box>



		</Box>


	)
}

export default FooterMenu;