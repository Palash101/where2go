//React Imports
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'




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
import SideMenu from 'src/views/planner/SideMenu'
import FooterMenu from 'src/views/planner/FooterMenu'
import TicketComponent from 'src/views/planner/TicketComponent'

import { getEventById,updateFloorPlan } from 'service/admin/events'





//Layout Imports

import BlankLayout from 'src/@core/layouts/BlankLayout'
import SeatComponent from 'src/@core/components/seating/SeatComponent';
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';


function Seat() {

    //Hooks
    const rectSvgRef = useRef(null);
    const router = useRouter();

    //Inital State
    const [loading, setLoading] = useState(false);
    const [plannerArray, setPlannerArray] = useState([])
    const [selected, setSelected] = useState([])
    const [selectedRect, setSelectedRect] = useState(null)
    const [myColor, setColor] = useState('black')
    const [planName, setPlanName] = useState('')
    // const [seatAlpha,setSeatAlpha]= useState(null)
    // const [seatNumberic,setSeatNumberic]= useState(null)
    const [routerParams, setRouterParams] = useState('');
    const [showticketComponent,setShowTicketComponent] = useState(false);


    const [ticketModal,setTicketModal]=useState(false)

    const [reactArray,setRectArray] = useState([])


    const [stage, setStageValue] = useState({
        height: 100,
        width: '50%',
        xStartPoistion: '25%',
        yStartPosition: 70,
        text:'Stage Text Comes here'
    })


     useEffect(()=>{
    if(router.isReady){
      setLoading(true)
      setRouterParams(router.query.eventId)
      getEventById(router.query.eventId)
        .then(data=>{
          if(data.plan){
            console.log(data.plan)
            const parsedData = JSON.parse(data.plan)
          	setRectArray(parsedData)
            // setEventData(data)
            setLoading(false)
            
          }
          else{
            setLoading(false)
          }
      })

    }
  },[router.isReady])


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

    const decrementRectXY = (type,value) =>{
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

    const deleteSelectedElement = ()=>{
        console.log('deleting')
    }

    // const addTicketsInSelectedElement = ()=>{
    //     console.log('selected element')
    // }


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
        name:''
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

    const updateData = async()=>{
        await updateFloorPlan(routerParams,JSON.stringify(reactArray)).then((res)=>console.log(res))

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



const addSeatname = (seatAlpha,seatNumberic)=>{
    console.log(reactArray)
    const selectedElement = reactArray[selectedRect]
    const mainSeatDots = selectedElement.seatDots
    const columnLength = mainSeatDots.length ;
    const rowLength =selectedElement.seatDots[0].length ;
    let stringUniCode = seatAlpha.charCodeAt(0);
    let rowMaxVal = stringUniCode+rowLength;
    const colMaxVal = parseInt(seatNumberic)+columnLength;

    const seatNameArray = []
    for(let i=stringUniCode; i<rowMaxVal; i++){
        const a = []
        for(let y=seatNumberic;y<colMaxVal;y++){
            console.log(y,'y')
            let n = `${String.fromCharCode(i)}${y}`
            a.push(n)
        }
        seatNameArray.push(a)
    }
    const seatDotsArrayCopy = [...mainSeatDots]
    mainSeatDots.map((arrItem,colkey)=>{
        arrItem.map((item,rowKey)=>{
            const k = {key1:colkey,key2:rowKey}
            const data = mainSeatDots[colkey][rowKey]
            const name  = seatNameArray[rowKey][colkey]
            const updatedData = {...data,name:name}
            seatDotsArrayCopy[colkey][rowKey]=updatedData;
        })


    })
    const updtedelement = {...selectedElement,seatDots:seatDotsArrayCopy}
    const reactArrcy = [...reactArray]
    reactArrcy[selectedRect] =updtedelement
    setRectArray(reactArrcy)
}

const addTicketsInSelectedElement =()=>{
    if(selectedRect === null){
            alert('Please select the Element')
            return
        }
    setShowTicketComponent(true)
}


const updateTicketData = (data)=>{
    console.log(data,'ticketdata')

}


console.log('rendering')

    return (
        <>
        <FooterMenu 
        MoveUp={decrementRectXY}
        MoveRight={moveReactXY}
        MoveLeft={decrementRectXY}
        MoveDown={moveReactXY}
        increaseRow={addNewRowCol}
        decreaseRow={decrementState}
        increaseCol={addNewRowCol}
        decreaseCol={decrementState}
        // increaseXSpace={}
        // decraseXSpace={}
        // increaseYSpace={}
        // decraseYSpace={}
        />

        <Grid container >
            <Grid item xs={12} md={2}>
            <SideMenu 
            addTicketData={addTicketsInSelectedElement}
            addNewElement={addReactangle}
            deleteSelectedElement = {deleteSelectedElement}
            saveData={updateData}
                />
            
    

            </Grid>
            {showticketComponent ? 
             <TicketComponent 
             open={showticketComponent}
             onClose={setShowTicketComponent}
             saveData ={updateTicketData}

             

                /> : null}

                <Grid item xs={12} md={10}>
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
                                    <rect fill="#40444d" width={stage.width} height={stage.height} rx="5" ry="5" x={stage.xStartPoistion} y="70"></rect>
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
                                                            name={item3.name}
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
