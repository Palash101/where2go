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
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';

import BlankLayout from 'src/@core/layouts/BlankLayout'
import SeatComponent from 'src/@core/components/seating/SeatComponent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography'


const SeatLayout = (props) => {

    //Hooks
    const Viewer = useRef(null);
    const rectSvgRef = useRef(null);
    //Inital State
    const [loading, setLoading] = useState(false);
    const [plannerArray, setPlannerArray] = useState([])
    const [selected, setSelected] = useState([])
    const [myColor, setColor] = useState('green')
    const [mapValue, setMapValue] = useState({
        row: 30,
        col: 35,
        rowStartPoisition: 120,
        rowIncrementPoistionBy: 30,
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
        console.log(props.data.plan)
        const planner = seatPlanerRender()
            setPlannerArray(planner)
        }, [mapValue.row, mapValue.col,
        mapValue.rowIncrementPoistionBy,
        mapValue.colIncrementPoistionBy,
        mapValue.colStartingPoistion,
        mapValue.rowStartingPoistion,
    ])


    const handleClick = (coll, roww) => {
      console.log(coll,roww)
        const arr = selected.filter(item => item.row === roww && item.col === coll);

       if(!arr.length){
        const copyArray = [...plannerArray];
        const data = copyArray[coll][roww]
        // const newData = { ...data, class: 'SelectedSVG',fill:'green' }
        const newData = { ...data,fill:myColor }
        copyArray[coll][roww] = newData;
        setPlannerArray(copyArray)
        setSelected([...selected, { col: coll, row: roww }])
        console.log(selected)
       }
       else{
        const copyArray = [...plannerArray];
        const data = copyArray[coll][roww]
        const newData = { ...data,fill:'black' }
        copyArray[coll][roww] = newData;
        setPlannerArray(copyArray)

        var newselected = [];
         selected.map(item => {
          if(item.row === roww && item.col === coll){

          }
          else{
            newselected.push(item)
          }

        });
        setSelected(newselected)
        console.log(selected)
       }
        

    }

  





    console.log('rendering')

    const seatPlanerRender = () => {
        const rowCount = mapValue.row
        const columnCount = mapValue.col

        //X axis poisitions
        var rowStartPoisition1 = mapValue.rowStartPoisition
        const rowIncrementPoistionBy = mapValue.rowIncrementPoistionBy

        //Y Axis Poistions
        var colStartingPoistion = mapValue.colStartingPoistion
        const colIncrementPoistionBy = mapValue.colIncrementPoistionBy


        const xelement = []

        for (let i = 0; i < columnCount; i++) {
            rowStartPoisition1 += rowIncrementPoistionBy

            const yElement = []

            for (let z = 0; z < rowCount; z++) {
                colStartingPoistion += colIncrementPoistionBy

                yElement.push({ x: rowStartPoisition1, y: colStartingPoistion, color: 'grey' }
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


const puchaseClick = () => {
  
}

    return (
        <>

            <Grid container >
                
                <Grid item xs={12} md={12}>
                    <UncontrolledReactSVGPanZoom
                    SVGBackground='#24262b'
                        ref={Viewer}
                        width={'100%'} height={1300}
                        onClick={event => console.log(event.x, event.y, event)}>

                        <svg width="100%" height="100%" fill="#24262b" >
                            <g fill="black" >

                               
                                  <svg>
                                    <rect fill="#40444d" width={mapValue.stage.width} height={mapValue.stage.height} rx="5" ry="5" x={mapValue.stage.xStartPoistion} y="70"></rect>
                                        <text x="45%" y="125" width='100%' fill="#fff"
                                            font-weight="bold">Stage Text</text>
                                    </svg>

                                {/* {
                                    plannerArray.map((item, key) => (
                                        item.map((item1, key1) => (
                                            <SeatComponent
                                                border={item1.fill === 'green' ? 'white' : 'black'}
                                                color={item1.fill}
                                                className={item1.class}
                                                id={`${item1.x}${item1.y}`}
                                                startingXPosition={item1.x}
                                                startingYPosition={item1.y}
                                                key={key1}
                                                handleClick={() => handleClick(key, key1)} />
                                        ))
                                    ))

                                } */}

{props.data && props.data.plan && props.data.plan.map((item1,key)=>{

                                        return(

                                        <svg  width={item1.width} height={item1.height} x={item1.x}  y={item1.y}>

                                        <g>
                                        {
                                            item1.seatDots?.map((item2, key1) => (
                                                  item2.map((item3, key2) => (
                                                      <SeatComponent
                                                          color={item3.fill}
                                                          id={`${item3.x}${item3.y}`}
                                                          startingXPosition={item3.x}
                                                          startingYPosition={item3.y}
                                                          key={key2}
                                                         />
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

               <Box sx={{position: 'fixed',
                    zIndex: 99,
                    bottom: '10px',
                    left: 0,
                    right: 0,
                    maxWidth: '600px',
                    background: '#ddd',
                    borderRadius: '8px',
                    margin: 'auto',
                    padding: '10px'}} >
             <Accordion sx={{
                        background: '#7b7b7c',
                         color: '#000'}}>
            <AccordionSummary

              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>All Tickets</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul className="ticketList">
              {selected.map((item) => (
                 <li>
                 Seat {item.row}-{item.col}
                 <span>7000 KWD</span>
                 </li>
                ))
              }
              {!selected.length && (
                <Box sx={{textAlign:'center'}}>No any ticket selected</Box>
                )}
              </ul>
            </AccordionDetails>
          </Accordion>
   

               <Button verient='default' sx={{background: '#eb9d05',
                                                color: '#000',
                                                marginTop:'10px',
                                                padding: '10px',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                                }} onClick={() => puchaseClick()}>Purchase</Button>
            </Box>

        </>
    )



}

export default SeatLayout;
