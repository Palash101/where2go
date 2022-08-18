//React Imports
import { useState, useEffect, useRef } from 'react'



//MUI imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@mui/material/Button'
import nookies from "nookies";

import {createFloorPlan} from 'service/admin/floorPlan'






//Layout Imports

import BlankLayout from 'src/@core/layouts/BlankLayout'
import SeatComponent from 'src/@core/components/seating/SeatComponent';
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';


function Seat() {

    //Hooks
    const rectSvgRef = useRef(null);

    //Inital State
    const [loading, setLoading] = useState(false);
    const [plannerArray, setPlannerArray] = useState([])

    const [selected, setSelected] = useState([])
    const [selectedRect, setSelectedRect] = useState(null)
    const [myColor, setColor] = useState('black')
    const [planName, setPlanName] = useState('')


    const [reactArray,setRectArray] = useState([])


    const [mapValue, setMapValue] = useState({
        row: 30,
        col: 40,
        rowStartPoisition: 120,
        rowIncrementPoistionBy: 20,
        colStartingPoistion: 230,
        colIncrementPoistionBy: 30,
        defaultColor: 'red',
        selected: false,
        stage: {
            height: 100,
            width: '50%',
            xStartPoistion: '25%',
            yStartPosition: 70,
            color: 'green'
        }
    })

    const areaType = {
        circle: 'circle',
        reactangle: 'reactangle'
    }
    const color = 'red';



    // useEffect(() => {
    //     const planner = seatPlanerRender()
    //     setPlannerArray(planner)
    // }, [mapValue.row, mapValue.col,
    // mapValue.rowIncrementPoistionBy,
    // mapValue.colIncrementPoistionBy,
    // mapValue.colStartingPoistion,
    // mapValue.rowStartingPoistion,
    // ])


    useEffect(()=>{
    	

    },[])


    const updateMousePos =(rectSVG)=>{
    	rectSVG.on("mousemove",()=>{
    		let point =d3.mouse(rectSvgRef.current)
    		console.log(point)


    	})

    }



    const addNewRowCol = (type,value) => {
    	if(selectedRect === null){
    		alert('Please select the rect')
    		return
    	}
    	const selectedArrayIndex = reactArray[selectedRect]
    	const seatStateInSelected = selectedArrayIndex.seatState
    	const newSeatState = {...seatStateInSelected,[type]:seatStateInSelected[type] + value}

    	const newSeatDots = seatPlanerRender(newSeatState)

    	const lastArrayFromSeat =newSeatDots[newSeatDots.length-1]
		const lastObjectFromLastArray = lastArrayFromSeat[lastArrayFromSeat.length-1]

    	const newStateOfSelectedIndex = {...selectedArrayIndex,seatState:newSeatState,seatDots:newSeatDots,width:lastObjectFromLastArray.x+50,height:lastObjectFromLastArray.y+50}
    	const reactArrayStateCopy = [...reactArray]
    	reactArrayStateCopy[selectedRect] = newStateOfSelectedIndex
    	setRectArray(reactArrayStateCopy)
    }


    const moveReactXY = (type,value) =>{
    	if(selectedRect === null){
    		alert('Please select the rect')
    		return
    	}
    	const selectedArrayIndex = reactArray[selectedRect]
    	const newSeatState = {...selectedArrayIndex,[type]:selectedArrayIndex[type] + value}

    	const reactArrayStateCopy = [...reactArray]
    	reactArrayStateCopy[selectedRect] = newSeatState
    	setRectArray(reactArrayStateCopy)

    }

    const decrementReactXY = (type,value) =>{
    	if(selectedRect === null){
    		alert('Please select the rect')
    		return
    	}
    	const selectedArrayIndex = reactArray[selectedRect]
    	const newSeatState = {...selectedArrayIndex,[type]:selectedArrayIndex[type] - value}

    	const reactArrayStateCopy = [...reactArray]
    	reactArrayStateCopy[selectedRect] = newSeatState
    	setRectArray(reactArrayStateCopy)

    }



const decrementState = (type,value) => {
    	if(selectedRect === null){
    		alert('Please select the rect')
    		return
    	}
    	const selectedArrayIndex = reactArray[selectedRect]
    	const seatStateInSelected = selectedArrayIndex.seatState
    	const newSeatState = {...seatStateInSelected,[type]:seatStateInSelected[type] - value}

    	const newSeatDots = seatPlanerRender(newSeatState)

    	const lastArrayFromSeat =newSeatDots[newSeatDots.length-1]
		const lastObjectFromLastArray = lastArrayFromSeat[lastArrayFromSeat.length-1]

    	const newStateOfSelectedIndex = {...selectedArrayIndex,seatState:newSeatState,seatDots:newSeatDots}
    	const reactArrayStateCopy = [...reactArray]
    	reactArrayStateCopy[selectedRect] = newStateOfSelectedIndex
    	setRectArray(reactArrayStateCopy)
    }





    const handleClick = (coll, roww) => {
    	console.log(reactArray)
        // const copyArray = [...plannerArray];
        // const data = copyArray[coll][roww]
        // // const newData = { ...data, class: 'SelectedSVG',fill:'green' }
        // const newData = { ...data,fill:myColor }
        // copyArray[coll][roww] = newData;
        // setPlannerArray(copyArray)
        // setSelected([...selected, { col: coll, row: roww }])
        // console.log(plannerArray)

    }

    const deleteItems = () => {
        if (selected.length > 0) {
            const copyArray = [...plannerArray];
            for (let i = 0; i < selected.length; i++) {
                const index = selected[i]
                console.log(index, 'unbbd')
                const a = copyArray[index.col]
                a.splice(index.row, 1)
            }
            setPlannerArray(copyArray)
            setSelected([])
        }
        else {
            alert('Please select slot to get it delete')

        }
    }



    const refreshStateToInital = () => {
        setMapValue((currentState) => {
            return {
                ...currentState,
                rowIncrementPoistionBy: currentState.rowIncrementPoistionBy + 10
            }
        })

    }

    const SelectRectangle = (key)=>{
    	setSelectedRect(key)
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
			seatState:initalSeatValue
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


	const fillColour = () =>{
		console.log(reactArray);
		const selectedArrayIndex = reactArray[selectedRect]
    	const seatStateInSelected = selectedArrayIndex.seatState
    	const newSeatState = {...seatStateInSelected,fill:myColor}
    	const newSeatDots = seatPlanerRender(newSeatState)
    	const newStateOfSelectedIndex = {...selectedArrayIndex,seatState:newSeatState,seatDots:newSeatDots}
    	const reactArrayStateCopy = [...reactArray]
    	reactArrayStateCopy[selectedRect] = newStateOfSelectedIndex
    	setRectArray(reactArrayStateCopy)

	}


	const saveData = async()=>{
		if(planName == ''){
			alert('Please enter Valid Name')
			return
		}
		 await createFloorPlan(planName,JSON.stringify(reactArray)).then((res)=>console.log(res))
		console.log(reactArray)

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

				yElement.push({x:rowStartPoisition,y:colStartingPoistion,class:'blankSVG',fill:initalState.fill}
				)
			}
			colStartingPoistion = initalState.colStartingPoistion
			xelement.push(yElement)	
		}
		return xelement
	}

function changeRow(e){
    console.log(e.target.value)
    setMapValue({
        ...mapValue,
        row:e.target.value
    })
}
function changeCol(e){
    console.log(e.target.value)
    setMapValue({
        ...mapValue,
        col:e.target.value
    })
}


console.log('rendering')

    return (
        <>

            <Grid container >
                <Grid item xs={12} md={3}>
                   
                        <h3 className='seatHeader'>Welcome to floar plannner</h3>
                        <ul className='seatList'>
                            <li>
                                <p> Seat: {selected.length}</p>
                            </li>
                            <li>
                                <p>Selected Row Count: 
                                    <input type='number' className='rowinput' value={mapValue.row} min='0' max='30' onChange={(e) => changeRow(e)}  />
                                    </p>
                            </li>
                            <li>
                                <p> Column Count: 
                                <input type='number' className='rowinput' value={mapValue.col} min='0' max='40' onChange={(e) => changeCol(e)}  />
                                   
                                </p>
                            </li>
                            </ul>
                            <h3 className='seatHeader'>Layout Actions</h3>
                            <ul className='seatList'>
                            <li>
                                <Button
                                    type='button' onClick={() => addReactangle()} variant='contained' color='secondary' size='small'>
                                    Add reactangle
                                </Button>
                            </li>
                            <li>
                            <div>

                                <Button
                                    type='button' onClick={() => addNewRowCol('row',1)} variant='contained' color='secondary' size='small'>
                                     +
                                </Button>
                                <span>Row</span>

                                <Button
                                    type='button' onClick={() => decrementState('row',1)} variant='contained' color='secondary' size='small'>
                                     -
                                </Button>
                            </div>
                            </li>
                            <li>
                            <div>

                                <Button
                                    type='button' onClick={() => addNewRowCol('col',1)} variant='contained' color='secondary' size='small'>
                                     +
                                </Button>
                                <span>Column</span>

                                <Button
                                    type='button' onClick={() => decrementState('col',1)} variant='contained' color='secondary' size='small'>
                                     -
                                </Button>
                            </div>

                            </li>
                           
                            <li>
                            <div>

                                <Button
                                    type='button' onClick={() => addNewRowCol('rowIncrementPoistionBy',10)} variant='contained' color='secondary' size='small'>
                                     +
                                </Button>
                                <span>Horizontal Space</span>

                                <Button
                                    type='button' onClick={() => decrementState('rowIncrementPoistionBy',10)} variant='contained' color='secondary' size='small'>
                                     -
                                </Button>
                            </div>
                                
                            </li>
                            <li>
                            	<div>

                                <Button
                                    type='button' onClick={() => addNewRowCol('colIncrementPoistionBy',10)} variant='contained' color='secondary' size='small'>
                                     +
                                </Button>
                                <span>Vertical Space</span>

                                <Button
                                    type='button' onClick={() => decrementState('colIncrementPoistionBy',10)} variant='contained' color='secondary' size='small'>
                                     -
                                </Button>
                            </div>

                                
                            </li>
                            <li>
                            <div>

                                <Button
                                    type='button' onClick={() => moveReactXY('y',10)} variant='contained' color='secondary' size='small'>
                                     +
                                </Button>
                                <span>Move vertically</span>

                                <Button
                                    type='button' onClick={() => decrementReactXY('y',10)} variant='contained' color='secondary' size='small'>
                                     -
                                </Button>
                            </div>
                               
                            </li>
                            <li>
                            <div>

                                <Button
                                    type='button' onClick={() => moveReactXY('x',10)} variant='contained' color='secondary' size='small'>
                                     +
                                </Button>
                                <span>Move Horizontaly</span>

                                <Button
                                    type='button' onClick={() => decrementReactXY('x',10)} variant='contained' color='secondary' size='small'>
                                     -
                                </Button>
                            </div>
                               
                            </li>
                            <li>
                            <p style={{marginTop:10,marginBottom:10,}}>Delete or UnDo</p>
                                <div>
                                    <Button
                                        type='button' onClick={() =>setColor('#24262b')} variant={myColor === '#24262b' ? 'contained' :'outlined'} color='secondary' size='small'>
                                        Delete
                                    </Button>
                                    <Button
                                        style={{marginLeft:10}}
                                        type='button' onClick={() => setColor('black')} variant={myColor === 'black' ? 'contained' :'outlined'} color='secondary' size='small'>
                                        Undo
                                    </Button>
                                </div>
                               
                            </li>
                            <li>
                                <p>Color</p>
                                <div className='colors'>
                                    <a style={{backgroundColor:'red'}} color='red' className={myColor === 'red' ? 'active':'notactive'} onClick={() => setColor('red')}></a>
                                    <a style={{backgroundColor:'green'}} color='green'  className={myColor === 'green' ? 'active':'notactive'} onClick={() => setColor('green')}></a>
                                    <a style={{backgroundColor:'blue'}} color='blue'  className={myColor === 'blue' ? 'active':'notactive'} onClick={() => setColor('blue')}></a>
                                    <a style={{backgroundColor:'yellow'}} color='yellow'  className={myColor === 'yellow' ? 'active':'notactive'} onClick={() => setColor('yellow')}></a>
                                    <a style={{backgroundColor:'black'}} color='black'  className={myColor === 'black' ? 'active':'notactive'} onClick={() => setColor('black')}></a>
                                    <a style={{backgroundColor:'purple'}} color='purple'  className={myColor === 'purple' ? 'active':'notactive'} onClick={() => setColor('purple')}></a>
                                    <a style={{backgroundColor:'orange'}} color='orange'  className={myColor === 'orange' ? 'active':'notactive'} onClick={() => setColor('orange')}></a>

                               
                                </div>
                            </li>
                            <li>
                            	<Button
                                    type='button' onClick={() => fillColour()} variant='contained' color='secondary' size='small'>
                                     fill color
                                </Button>

                            </li>
                            <li>
                            <input type="text" onChange={(e)=>setPlanName(e.target.value)} />
                            </li>
                            <li>
                            <Button
                                    type='button' onClick={() => saveData()} variant='contained' color='secondary' size='small'>
                                     Save Data
                                </Button>
                            </li>

                        </ul>

                </Grid>
                <Grid item xs={12} md={9}>
                    <UncontrolledReactSVGPanZoom
                    SVGBackground='#24262b'
                        width={'100%'} height={1300}
                        >

                        <svg width="100%" height="100%" fill="#24262b" >
                            <g fill="black" >

                                {/* <rect fill="#40444d" width={mapValue.stage.width} height={mapValue.stage.height} rx="5" ry="5" x={mapValue.stage.xStartPoistion} y="70"></rect>
                                <text x="120" y="50" font-size="35" fill="white">Stage Text</text>
                                 */}
                                	<svg>
                                    <rect fill="#40444d" width={mapValue.stage.width} height={mapValue.stage.height} rx="5" ry="5" x={mapValue.stage.xStartPoistion} y="70"></rect>
                                        <text x="45%" y="125" width='100%' fill="#fff"
                                            font-weight="bold">Stage Text</text>
                                    </svg>
                                    {
							  		reactArray.map((item1,key)=>{

							  			return(

							  			<svg  ref={rectSvgRef} style={{ cursor:'grap', border: '1px solid'}}  width={item1.width} height={item1.height} x={item1.x}  y={item1.y}>

							  			<g className={selectedRect == key? "selectedRect" : ''} onClick={()=>SelectRectangle(key)}>
							  			{
							  				item1.seatDots?.map((item2, key1) => (
			                                        item2.map((item3, key2) => (
			                                            <SeatComponent
			                                                color={item3.fill}
			                                                id={`${item3.x}${item3.y}`}
			                                                startingXPosition={item3.x}
			                                                startingYPosition={item3.y}
			                                                key={key2}
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

export default Seat;
