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





//Layout Imports

import BlankLayout from 'src/@core/layouts/BlankLayout'
import SeatComponent from 'src/@core/components/seating/SeatComponent';
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';


function Seat() {

    //Hooks
    const Viewer = useRef(null);

    //Inital State
    const [loading, setLoading] = useState(false);
    const [plannerArray, setPlannerArray] = useState([])

    const [selected, setSelected] = useState([])
    const [myColor, setColor] = useState('black')

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



    useEffect(() => {
        const planner = seatPlanerRender()
        setPlannerArray(planner)
    }, [mapValue.row, mapValue.col,
    mapValue.rowIncrementPoistionBy,
    mapValue.colIncrementPoistionBy,
    mapValue.colStartingPoistion,
    mapValue.rowStartingPoistion,
    ])


    const getElementFromArray = () => {

    }

    const addNewRow = () => {
        setMapValue((currentState) => {
            return {
                ...currentState,
                row: currentState.row + 1
            }
        })
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
        const copyArray = [...plannerArray];
        const data = copyArray[coll][roww]
        // const newData = { ...data, class: 'SelectedSVG',fill:'green' }
        const newData = { ...data,fill:myColor }
        copyArray[coll][roww] = newData;
        setPlannerArray(copyArray)
        setSelected([...selected, { col: coll, row: roww }])
        console.log(plannerArray)

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




    console.log('rendering')

    const seatPlanerRender = () => {
        const rowCount = mapValue.row
        const columnCount = mapValue.col

        //X axis poisitions
        const rowStartPoisition = mapValue.rowStartPoisition
        const rowIncrementPoistionBy = mapValue.rowIncrementPoistionBy

        //Y Axis Poistions
        const colStartingPoistion = mapValue.colStartingPoistion
        const colIncrementPoistionBy = mapValue.colIncrementPoistionBy


        const xelement = []

        for (let i = 0; i < columnCount; i++) {
            rowStartPoisition += rowIncrementPoistionBy

            const yElement = []

            for (let z = 0; z < rowCount; z++) {
                colStartingPoistion += colIncrementPoistionBy

                yElement.push({ x: rowStartPoisition, y: colStartingPoistion, color: 'grey' }
                )
            }
            colStartingPoistion = mapValue.colStartingPoistion
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
                                    type='button' onClick={() => addNewRow()} variant='contained' color='secondary' size='small'>
                                    AddRow By 1
                                </Button>
                            </li>
                            <li>
                                <Button
                                    type='button' onClick={() => addNewCol()} variant='contained' color='secondary' size='small'>
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
                        ref={Viewer}
                        width={'100%'} height={1300}
                        onClick={event => console.log(event.x, event.y, event)}>

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
                                    plannerArray.map((item, key) => (
                                        item.map((item1, key1) => (
                                            <SeatComponent
                                                color={item1.fill}
                                                className={item1.class}
                                                id={item1.x + "" + item1.y}
                                                startingXPosition={item1.x}
                                                startingYPosition={item1.y}
                                                key={key1}
                                                handleClick={() => handleClick(key, key1)} />
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

export default Seat;

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
  