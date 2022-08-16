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
// import { D3DragEvent, drag } from "d3-drag";
import * as d3 from 'd3';






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
    	

    },[selectedRect])


    const updateMousePos =(rectSVG)=>{
    	rectSVG.on("mousemove",()=>{
    		let point =d3.mouse(rectSvgRef.current)
    		console.log(point)


    	})

    }







    const getElementFromArray = () => {

    }

    // const addNewRow = () => {
    //     setMapValue((currentState) => {
    //         return {
    //             ...currentState,
    //             row: currentState.row + 1
    //         }
    //     })
    // }


    const addNewRowCol = (type) => {
    	if(selectedRect === null){
    		alert('Please select the rect')
    		return
    	}
    	console.log(reactArray)
    	const selectedArrayIndex = reactArray[selectedRect]
    	const seatStateInSelected = selectedArrayIndex.seatState
    	const newSeatState = {...seatStateInSelected,[type]:seatStateInSelected[type] + 1}

    	const newSeatDots = seatPlanerRender(newSeatState)

    	const lastArrayFromSeat =newSeatDots[newSeatDots.length-1]
		const lastObjectFromLastArray = lastArrayFromSeat[lastArrayFromSeat.length-1]

    	const newStateOfSelectedIndex = {...selectedArrayIndex,seatState:newSeatState,seatDots:newSeatDots,width:lastObjectFromLastArray.x+50,height:lastObjectFromLastArray.y+50}
    	console.log(newStateOfSelectedIndex);
    	const reactArrayStateCopy = [...reactArray]
    	reactArrayStateCopy[selectedRect] = newStateOfSelectedIndex
    	console.log(reactArrayStateCopy)
    	setRectArray(reactArrayStateCopy)
    }



    const addNewCol = () => {
        setMapValue((currentState) => {
            return {
                ...currentState,
                col: currentState.col + 1
            }
        })
    }
    const increaseXSpace = () => {
        setMapValue((currentState) => {
            return {
                ...currentState,
                rowIncrementPoistionBy: currentState.rowIncrementPoistionBy + 10
            }
        })
    }
    const increaseYSpace = () => {
        setMapValue((currentState) => {
            return {
                ...currentState,
                colIncrementPoistionBy: currentState.colIncrementPoistionBy + 15
            }
        })

    }

    const shiftXAxis = () => {
        setMapValue((currentState) => {
            return {
                ...currentState,
                rowStartPoisition: currentState.rowStartPoisition + 10

            }


        })

    }

    const shiftYAxis = () => {
        setMapValue((currentState) => {
            return {
                ...currentState,
                colStartingPoistion: currentState.colStartingPoistion + 10

            }


        })

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
    	console.log('Selected rectangle')
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
                                <Button
                                    type='button' onClick={() => addNewRowCol('row')} variant='contained' color='secondary' size='small'>
                                    Add Row By 1
                                </Button>
                            </li>
                            <li>
                                <Button
                                    type='button' onClick={() => addNewRowCol('col')} variant='contained' color='secondary' size='small'>
                                    Add Column By 1
                                </Button>
                            </li>
                           
                            <li>
                                <Button
                                    type='button' onClick={increaseXSpace} variant='contained' color='secondary' size='small'>
                                    Incearase X Axis Space
                                </Button>
                            </li>
                            <li>
                                <Button
                                    type='button' onClick={increaseYSpace} variant='contained' color='secondary' size='small'>
                                    Incearase Y Axis Di
                                </Button>
                            </li>
                            <li>
                                <Button
                                    type='button' onClick={shiftYAxis} variant='contained' color='secondary' size='small'>
                                    Shift Y Axis
                                </Button>
                            </li>
                            <li>
                                <Button
                                    type='button' onClick={shiftXAxis} variant='contained' color='secondary' size='small'>
                                    Shift X Axis
                                </Button>
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

							  			<svg  ref={rectSvgRef} style={{ border: '1px solid'}}  width={item1.width} height={item1.height} x={item1.x}  y={item1.y}>
							  										  			<circle  cx="50%" cy="15" r="5" />

							  			<g className={selectedRect == key? "selectedRect" : ''} onClick={()=>SelectRectangle(key)}>
							  			{
							  				item1.seatDots?.map((item2, key1) => (
			                                        item2.map((item3, key2) => (
			                                            <SeatComponent
			                                                color={item3.fill}
			                                                className={item3.class}
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
