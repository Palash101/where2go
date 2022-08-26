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
	const [reactArray,setRectArray] = useState([])

	const  [selected, setSelected] = useState([])
	const [mapValue, setMapValue] = useState({
		row:3,
		col:5,
		rowStartPoisition:10,
		rowIncrementPoistionBy:25,
		colStartingPoistion:35,
		colIncrementPoistionBy:25,
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

	},[])


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

	const addReactangle = ()=>{
		const initalSeatValue = {
		row:3,
		col:5,
		rowStartPoisition:10,
		rowIncrementPoistionBy:25,
		colStartingPoistion:15,
		colIncrementPoistionBy:25,
		defaultColor:'red',
		selected:false,
		}

		const reactangleInitalState = {
			height:100,
			width:100,
			x:0,
			y:0,
		}
		if(reactArray.length == 0){
			const seatDots = seatPlanerRender(initalSeatValue)
			const lastArrayFromSeat =seatDots[seatDots.length-1]
			const lastObjectFromLastArray = lastArrayFromSeat[lastArrayFromSeat.length-1]
			const newRectState = {...reactangleInitalState,width:lastObjectFromLastArray.x+50,height:lastObjectFromLastArray.y+50, seatDots:seatDots}
			setRectArray([...reactArray,newRectState])
		}
		else{
			const seatDots = seatPlanerRender(initalSeatValue)
			const lastArrayFromSeat =seatDots[seatDots.length-1]
			const lastObjectFromLastArray = lastArrayFromSeat[lastArrayFromSeat.length-1]

			const newRectState = {...reactangleInitalState,width:lastObjectFromLastArray.x+50,height:lastObjectFromLastArray.y+50,seatDots:seatDots}
			const lastArrayPoisition   = reactArray[reactArray.length-1]
			const newReactPosition = {...newRectState, x:lastArrayPoisition.x+150,y:lastArrayPoisition.y+150}
			setRectArray([...reactArray,newReactPosition])

		}
	

	}





	const seatPlanerRender =  (initalState)=>{
		const rowCount = initalState.row
		const columnCount = initalState.col

		//X axis poisitions
		let rowStartPoisition = initalState.rowStartPoisition
		let rowIncrementPoistionBy = initalState.rowIncrementPoistionBy

		//Y Axis Poistions
		let colStartingPoistion = initalState.colStartingPoistion
		let colIncrementPoistionBy = initalState.colIncrementPoistionBy


		const xelement = []

		for(let i = 0; i <columnCount; i++){
			rowStartPoisition +=rowIncrementPoistionBy

			const yElement = []

			for(let z = 0; z<rowCount; z++){
				colStartingPoistion += colIncrementPoistionBy

				yElement.push({x:rowStartPoisition,y:colStartingPoistion,class:'blankSVG',color:''}
				)
			}
			colStartingPoistion = initalState.colStartingPoistion
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
                    	<Button onClick={addReactangle}>Add reactangle</Button>




                    </Box>
                    </CardContent>
            </Card>
			</Grid>
			<Grid item xs={8} md={8}>
			<UncontrolledReactSVGPanZoom
				ref={Viewer}
				width={500} height={500}
				onZoom={e => console.log('zoom')}
				onPan={e => console.log('pan')}
				onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
			>
				<svg width={617} height={316}>
				<g fillOpacity=".5" strokeWidth="4">
				<rect fill="#40444d" width="100" height="200" rx="5" ry="5" x="400" y="70"></rect>
                    <text x="45%" y="125" width='100%' fill="#fff"
                    font-weight="bold">Stage Text</text>
				{
					reactArray.map((item1,key)=>{
						return(
							<svg  ref={rectSvgRef} style={{ cursor:'grap', border: '1px solid'}}  width={item1.width} height={item1.height} x={item1.x}  y={item1.y}>
							  	<g  className={selectedRect == key? "selectedRect" : ''} onClick={()=>SelectRectangle(key)}>
							  		{
							  			item1.seatDots?.map((item2, key1) => (
			                                item2.map((item3, key2) => (
												<SeatComponent
													color={item3.fill}
													id={`${item3.x}${item3.y}`}
													startingXPosition={item3.x}
													startingYPosition={item3.y}
													key={key2}
													name={item3.name}
													price={item3.price}
													ticketName={item3.ticketName}
													handleClick={() => handleClick(key1, key2)} />
											))
										))
							  		}
							  	</g>

							</svg>
						)
						})
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