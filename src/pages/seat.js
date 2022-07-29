//React Imports
import { useState,useEffect,useRef } from 'react'



//MUI imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@mui/material/Button'






//Layout Imports

import BlankLayout from 'src/@core/layouts/BlankLayout'
import  SeatComponent from 'src/@core/components/seating/SeatComponent';
import {UncontrolledReactSVGPanZoom} from 'react-svg-pan-zoom';


function Seat (){

	//Hooks
	const Viewer = useRef(null);

	//Inital State
	const [loading,setLoading] = useState(false);
	const [plannerArray,setPlannerArray] = useState([])

	const  [selected, setSelected] = useState([])
	const [mapValue, setMapValue] = useState({
		row:3,
		col:5,
		rowStartPoisition:120,
		rowIncrementPoistionBy:20,
		colStartingPoistion:230,
		colIncrementPoistionBy:30,
		defaultColor:'red',
		selected:false,
		stage:{
			height:100,
			width:200,
			xStartPoistion:350,
			yStartPosition:70,
			color:'green'
		}
	})

	const areaType = {
		circle:'circle',
		reactangle:'reactangle'
	}
	const color = 'red';



	useEffect(()=>{
		const planner =  seatPlanerRender()
		setPlannerArray(planner)
	},[mapValue.row,mapValue.col,
	mapValue.rowIncrementPoistionBy,
	mapValue.colIncrementPoistionBy,
	mapValue.colStartingPoistion,
	mapValue.rowStartingPoistion,
	])


	const getElementFromArray =()=>{

	}

	const addNewRow = ()=>{
		setMapValue((currentState)=>{
			return{
				...currentState,
				row:currentState.row+1
			}
		})
	}

	const addNewCol = ()=>{
		setMapValue((currentState)=>{
			return{
				...currentState,
				col:currentState.col+1
			}
		})
	}
	const increaseXSpace = ()=>{
		setMapValue((currentState)=>{
			return{
				...currentState,
				rowIncrementPoistionBy:currentState.rowIncrementPoistionBy+10
			}
		})
	}
	const increaseYSpace = ()=>{
		setMapValue((currentState)=>{
			return{
				...currentState,
				colIncrementPoistionBy:currentState.colIncrementPoistionBy+15
			}
		})

	}

	const shiftXAxis = () =>{
		setMapValue((currentState)=>{
			return{
				...currentState,
			rowStartPoisition:currentState.rowStartPoisition+10

			}
			

		})

	}

	const shiftYAxis = () =>{
		setMapValue((currentState)=>{
			return{
				...currentState,
			colStartingPoistion:currentState.colStartingPoistion+10

			}
			

		})

	}



	const handleClick = (coll,roww)=>{
		const copyArray = [...plannerArray];
		const data = copyArray[coll][roww]
		const newData = {...data,class:'SelectedSVG'}
		copyArray[coll][roww] = newData;
		setPlannerArray(copyArray)
		setSelected([...selected,{col:coll,row:roww}])
		console.log(plannerArray)

	}

	const deleteItems = () =>{
		if(selected.length>0){
			const copyArray = [...plannerArray];
			for(let i =0 ; i < selected.length;i++){
				const index = selected[i]
				console.log(index,'unbbd')
				const a = copyArray[index.col]
				a.splice(index.row, 1)
			}
			setPlannerArray(copyArray)
			setSelected([])
		}
		else{
			alert('Please select slot to get it delete')

		}
	}



	const refreshStateToInital = ()=>{
		setMapValue((currentState)=>{
			return{
				...currentState,
				rowIncrementPoistionBy:currentState.rowIncrementPoistionBy+10
			}
		})

	}




console.log('rendering')

	const seatPlanerRender =  ()=>{
		const rowCount = mapValue.row
		const columnCount = mapValue.col

		//X axis poisitions
		const rowStartPoisition = mapValue.rowStartPoisition
		const rowIncrementPoistionBy = mapValue.rowIncrementPoistionBy

		//Y Axis Poistions
		const colStartingPoistion = mapValue.colStartingPoistion
		const colIncrementPoistionBy = mapValue.colIncrementPoistionBy


		const xelement = []

		for(let i = 0; i <columnCount; i++){
			rowStartPoisition +=rowIncrementPoistionBy

			const yElement = []

			for(let z = 0; z<rowCount; z++){
				colStartingPoistion += colIncrementPoistionBy

				yElement.push({x:rowStartPoisition,y:colStartingPoistion,class:'blankSVG',color:''}
				)
			}
			colStartingPoistion = mapValue.colStartingPoistion
			xelement.push(yElement)	
		}
		return xelement
	}



	return(
		<>

		<Grid container spacing={6}>
			<Grid item xs={4} md={4}>
			 <Card>
                <CardHeader title='Planner Actions' titleTypographyProps={{ variant: 'h6' }} />
                	<p> Seat: {selected.length}</p>
                	<p>Selected Row Count: {mapValue.row}</p>
                	<p> Column Count: {mapValue.col}</p>
                    <CardContent>
                    <Box>
                    	<Button 
                          type='button' onClick={()=>addNewRow()} variant='contained' size='large'>
                            AddRow By 1
                        </Button>
                        <Button 
                          type='button' onClick={()=>addNewCol()} variant='contained' size='large'>
                            Add Column By 1
                        </Button>

                        <Button 
                          type='button' onClick={deleteItems} variant='contained' size='large'>
                            Delete Item
                        </Button>

                        <Button 
                          type='button' onClick={increaseXSpace} variant='contained' size='large'>
                            Incearase X Axis Space
                        </Button>

                        <Button 
                          type='button' onClick={increaseYSpace} variant='contained' size='large'>
                            Incearase Y Axis Di
                        </Button>

                        
                        <Button 
                          type='button' onClick={shiftYAxis} variant='contained' size='large'>
                            Shift Y Axis
                        </Button>
                        <Button 
                          type='button' onClick={shiftXAxis} variant='contained' size='large'>
                            Shift X Axis
                        </Button>






                    </Box>
                    </CardContent>
            </Card>
			</Grid>
			<Grid item xs={8} md={8}>
				<UncontrolledReactSVGPanZoom
				 	ref={Viewer}
			        width={800} height={650}
			        onClick={event => console.log(event.x, event.y, event)}>

			 	<svg width="100%" height="100%" fill="blue" >
			 		<g fill="blue" stroke="green" >
				  <rect fill="#5B5F6B" width={mapValue.stage.width} height={mapValue.stage.height} rx="5" ry="5" x={mapValue.stage.xStartPoistion}  y="70"></rect>
				  	{ 
				  		plannerArray.map((item,key)=>(	
				  		item.map((item1,key1)=>(
				  		<SeatComponent 
				  		color={color}
				  		className={item1.class} 
				  		id ={item1.x+""+item1.y} 
				  		startingXPosition={item1.x} 
				  		startingYPosition={item1.y} 
				  		key={key1} 
				  		handleClick ={()=>handleClick(key,key1)} />
				  		))	
				  	))

				  	}
				  	</g>
				</svg>
	 	
	 		</UncontrolledReactSVGPanZoom>

			</Grid>
		</Grid>

		</>
		)

	

}
Seat.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Seat