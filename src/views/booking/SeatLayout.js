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

  //Use Effect Seat Layout from props

  useEffect(() => {
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
        <Grid item xs={12} md={12}>
          <UncontrolledReactSVGPanZoom
            SVGBackground="#1f2227"
            ref={Viewer}
            width={1270}
            height={600}
            // onZoom={(e) => console.log('zoom')}
            // onPan={(e) => console.log('pan')}
            // onClick={(event) =>
            //   console.log('click', event.x, event.y, event.originalEvent)
            // }
          >
            {/*Increase width and height of main rectangle*/}

            <svg width={1500} height={2000}>
              <g fillOpacity=".5" strokeWidth="4">
                <rect
                  fill="#40444d"
                  width="800"
                  height="100"
                  rx="5"
                  ry="5"
                  x="400"
                  y="70"
                ></rect>
                <text
                  x="800"
                  y="125"
                  width="100"
                  fill="#fff"
                  font-weight="bold"
                >
                  Stage
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
          </UncontrolledReactSVGPanZoom>
        </Grid>
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
            <Typography>All Tickets</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="ticketList">
              {props.slectedTickets.map((item,key) => (
                <li key={key}>
                  Seat {item.name}
                  <span>{item.price}</span>
                </li>
              ))}
              {!props.slectedTickets.length && (
                <Box sx={{ textAlign: 'center' }}>Please select seat by clicking on circle</Box>
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
          Purchase
        </Button>
      </Box>
    </>
  );
};

export default SeatLayout;
