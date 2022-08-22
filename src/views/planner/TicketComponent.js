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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import ColorPicker from 'material-ui-color-picker'


//Service Imports
import { updateEventData } from '../../../service/admin/events'

import { userAuth } from 'context/userContext'
import Translations from 'utils/trans'


const TicketComponent = (props) => {

	const [color, setColor] = useState('white')
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [rowAlphabets, setRowAlphabet] = useState('')
	const [numeric, setColNumeric] = useState(null)



	const formData = () => {
		const data = {
			color: color,
			name: name,
			price: price,
			rowAlphabets: rowAlphabets,
			numeric: numeric,

		}

		return data
	}

	const ticketForm = () => {
		return (

			<Box className='ticketform'>
				<TextField
					required
					onChange={(e) => setName(e.target.value)}
					sx={{ marginBottom: '10px' }} fullWidth label='Ticket Name' placeholder='Enter event name' />
				{/* <ColorPicker className='colorPicker'
					name="color"
					defaultValue={color}
					onChange={color => setColor(color)}
				/> */}
				  <Select fullWidth onChange={(e)=>setColor(e.target.value)} label='color' placeholder='color' defaultValue={color} >
						<MenuItem value='yellow'>Yellow</MenuItem>
						<MenuItem value='blue'>Blue</MenuItem>
						<MenuItem value='orange'>Orange</MenuItem>
						<MenuItem value='pink'>Pink</MenuItem>
					</Select>
				<TextField
					required
					onChange={(e) => setPrice(e.target.value)}
					fullWidth label='Price' type='number' placeholder='Price' />

				<TextField
					required
					onChange={(e) => setRowAlphabet(e.target.value)}
					sx={{ marginBottom: '10px' }} type='text' fullWidth placeholder="Row Alphabet" />
				<TextField
					required
					onChange={(e) => setColNumeric(e.target.value)}
					sx={{ marginBottom: '10px' }} type='number' fullWidth placeholder="Column number" />
			</Box>


		)
	}


	return (

		<>
			<Dialog open={props.open} onClose={() => props.onClose(false)}>
				<DialogTitle>Ticket</DialogTitle>
				<DialogContent>
					{ticketForm()}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => props.saveData(formData())}>Add</Button>
					<Button onClick={() => props.onClose(false)}>Cancel</Button>
				</DialogActions>
			</Dialog>

		</>


	)

}

export default TicketComponent