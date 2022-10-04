//React Imports
import { useState, useEffect, useRef } from 'react';
//MUI imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';
import { useRouter } from 'next/router';

import BlankLayout from 'src/@core/layouts/BlankLayout';
import SeatComponent from 'src/@core/components/seating/SeatComponent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { CosineWave } from 'mdi-material-ui';
import { getEventBooking } from 'service/admin/events';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Translations from 'utils/trans';
import { userAuth } from 'context/userContext';

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  const wi = {
    innerWidth:innerWidth - 50,
    innerHeight:innerHeight - 50
  }
  return wi;
}


const SeatLayout = (props) => {
  //Hooks
  const Viewer = useRef(null);
  const rectSvgRef = useRef(null);
  const router = useRouter();

  //Inital State
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [rectArray, setRectArray] = useState([]);
  const [booked,setBooked] = useState([])
  const [layoutWidth,setLayoutWidth] = useState(500);
  const [layoutHeight, setLayoutHeight] = useState(500);
  const [scale,setScale] = useState(0.1);
  //Use Effect Seat Layout from props

  const userContext = userAuth()
  const locale = userContext.locale
  const t = Translations(locale)

  useEffect(() => {

    var WH = getWindowSize();
      setLayoutWidth(WH.innerWidth);
      setLayoutHeight(WH.innerHeight);
      console.log(WH.innerWidth,'ww')
    setScale(WH.innerWidth > 460 ? 1 : 0.4);

    console.log(props,'component props');
    var dt = props.date.split(' ')[0];
    getEventBooking(router.query.id,dt).then((data) => {
      console.log(data,'ticket data')
      setBooked(data);
    })


  }, []);


  const renderSeatComponet = (item,key2,key1,key) => {
    if(booked.length){
      var filter =  booked.filter(item4 => item4.name === item.name);
      if(filter.length){
        var item3 = item;
        return(
          <SeatComponent
            color={'#fff'}
            id={`${item3.x}${item3.y}`}
            startingXPosition={item3.x}
            startingYPosition={item3.y}
            className={item3.className}
            key={key2}
            name={item3.name}
            price={item3.price}
            border={item3.border}
            ticketName={item3.ticketName}
            disabled={'disabled'}
            title='Already Booked'
            handleClick={() => props.onCircleClick(key1, key2,key)} />
        )
      }
      else{
          var item3 = item;
          return(
            <SeatComponent
            color={item3.fill}
            id={`${item3.x}${item3.y}`}
            startingXPosition={item3.x}
            startingYPosition={item3.y}
            className={item3.className}
            key={key2}
            name={item3.name}
            price={item3.price}
            border={item3.border}
            ticketName={item3.ticketName}
            disabled={''}
            handleClick={() => props.onCircleClick(key1, key2,key)} />
          
        )
      }
    }
    else{
      var item3 = item;
      return(
        <SeatComponent
        color={item3.fill}
        id={`${item3.x}${item3.y}`}
        startingXPosition={item3.x}
        startingYPosition={item3.y}
        className={item3.className}
        key={key2}
        name={item3.name}
        price={item3.price}
        border={item3.border}
        ticketName={item3.ticketName}
        disabled={''}
        handleClick={() => props.onCircleClick(key1, key2,key)} />
      )
    }
  }


  return (
    <>
      <Grid container>
        {scale > 0.2 && (
        <Grid item xs={12} md={12} sx={{marginBottom:50}}>
          <TransformWrapper 
          initialScale={scale}
          minScale={0.2}
          maxScale={8}
          minPositionY={50}
          maxPositionY={100}
          centerZoomedOut ={false}
          limitToBounds	={false}
          >
            <TransformComponent >
              <Box sx={{
                //  backgroundColor:'#999',
                  width:(layoutWidth > 360) ? layoutWidth - 50 : layoutWidth,
                  height:layoutHeight - 100,
                  marginLeft:'25px',
                  marginTop:'25px',
                  textAlign:'center',
                  alignItems:'center',
                }}>
                  <Box sx={{
                  backgroundColor:(layoutWidth > 360) ? '#000' : 'transparent',
                  width:(layoutWidth > 360) ? layoutWidth - 200 : layoutWidth,
                  height:'800',
                  display:'block',
                  paddingRight:'25px',
                  margin:'auto',

                }}>
                {/* <svg width={layoutWidth > 950 ? 950 : layoutWidth} height={layoutHeight}> */}
                 <svg width={1100} height={800} style={{direction: 'initial'}}> 
                  <g fillOpacity=".5" strokeWidth="4">
                      <rect
                          fill="#40444d"
                          width={750}
                          height="100"
                          rx="5"
                          ry="5"
                          x="100"
                          y="70"
                        ></rect>
                        <text
                          x={450}
                          y="125"
                          width="60"
                          fill="#fff"
                          font-weight="bold"
                        >
                          {t.stage}
                        </text>
                    {
                      props.data && props.data.length && props.data.map((item1,key)=>{
                          return(
                            <svg key={key} ref={rectSvgRef} style={{ cursor:'grap', border: '1px solid'}}  width={item1.width} height={item1.height} x={item1.x}  y={item1.y}>
                                <g>
                                  {
                                    item1.seatDots?.map((item2, key1) => (
                                      item2.map((item3, key2) => (
                                      renderSeatComponet(item3,key2,key1,key)
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
                </Box>
              </Box>
            </TransformComponent>
          </TransformWrapper>
        </Grid>
        )}
      </Grid>

      <Box className="bottomBlock">
        <Accordion
          sx={{
            background: '#7b7b7c',
            color: '#000',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{t.all_tickets}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="ticketList">
              {props.slectedTickets.map((item,key) => (
                <li key={key}>
                  {t.seat} {item.name}
                  <span>{item.price}</span>
                </li>
              ))}
              {!props.slectedTickets.length && (
                <Box sx={{ textAlign: 'center' }}>{t.please_click_seatc}</Box>
              )}
            </ul>
          </AccordionDetails>
        </Accordion>

        <Button
          verient="default"
          sx={{
            background: '#eb9d05',
            color: '#000',
            marginTop: '10px',
            padding: '10px',
            justifyContent: 'space-between',
            width: '100%',
            ':hover':{
              background: '#ffa800',
            }
          }}
          onClick={() => props.click(selected)}
        >
          {t.purchase}
        </Button>
      </Box>
    </>
  );
};

export default SeatLayout;
