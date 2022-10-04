//React Imports
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import React from 'react';

//MUI imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import nookies from 'nookies';

import { createFloorPlan } from 'service/admin/floorPlan';
import SideMenu from 'src/views/planner/SideMenu';
import FooterMenu from 'src/views/planner/FooterMenu';
import ShowTickets from 'src/views/planner/ShowTickets';
import TicketComponent from 'src/views/planner/TicketComponent';
import { toast } from 'react-toastify'
import {
  getEventById,
  updateFloorPlan,
  updateEventTicket,getTicketCollection
} from 'service/admin/events';
import CircularProgress from '@mui/material/CircularProgress';

//Layout Imports

import BlankLayout from 'src/@core/layouts/BlankLayout';
import SeatComponent from 'src/@core/components/seating/SeatComponent';
// import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom'

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  const wi = {
    innerWidth: innerWidth - innerWidth / 4,
    innerHeight: innerHeight - 50,
  };
  return wi;
}

const Seat = () => {
  //Hooks
  const rectSvgRef = useRef(null);
  const Viewer = useRef(null);
  const router = useRouter();

  //Inital State
  const [loading, setLoading] = useState(true);
  const [plannerArray, setPlannerArray] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedRect, setSelectedRect] = useState(null);
  const [myColor, setColor] = useState('black');
  const [planName, setPlanName] = useState('');
  const [showFooter, setShowFooter] = useState(false);
  const [routerParams, setRouterParams] = useState('');
  const [showticketComponent, setShowTicketComponent] = useState(false);

  const [data, setData] = useState({});
  const [ticketModal, setTicketModal] = useState(false);

  const [reactArray, setRectArray] = useState([]);
  const [layoutWidth, setLayoutWidth] = useState(500);
  const [layoutHeight, setLayoutHeight] = useState(500);
  //const [windowSize, setWindowSize] = useState(getWindowSize());
  const [ticketCollectionData,setticketCollectionData] = useState([])
  const [eventId, setEventId] = useState('black');
  const [stage, setStageValue] = useState({
    height: 100,
    width: '50%',
    xStartPoistion: '25%',
    yStartPosition: 70,
    text: 'Stage Text Comes here',
  });

  // Setting Main Data from Firebase if exist
  useEffect(() => {
    
    if (router.isReady) {
      getTicketsData(router.query.eventId)
      setEventId(router.query.eventId)
      var WH = getWindowSize();
      setLayoutWidth(WH.innerWidth);
      setLayoutHeight(WH.innerHeight);

      console.log(WH, 'layoutHeight');

      setLoading(true);
      setRouterParams(router.query.eventId);
      getEventById(router.query.eventId).then((data) => {
        setData(data);
        console.log(data);
        if (data.plan) {
          const parsedData = JSON.parse(data.plan);
          setRectArray(parsedData);
          // setEventData(data)
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    }
  }, [router.isReady]);

  const getTicketsData = async (eventId) => {
    const tickets = await getTicketCollection(eventId)
    const ticketsArray = []
    tickets.docs.forEach((item) => {
      const docId = { docId: item.id }
      const data = Object.assign(docId, item.data())
      ticketsArray.push(data)
    })

    console.log(ticketsArray,'ticketsArray')
    setticketCollectionData(ticketsArray)
    
  }

  console.log(ticketCollectionData);

  //For Increasing Row, Col and X/Y direction space

  const increaseRowColAttribute = (type, value) => {
    if (selectedRect === null) {
      alert('Please select the rect');
      return;
    }
    const selectedArrayIndex = reactArray[selectedRect];
    const seatStateInSelected = selectedArrayIndex.seatState;
    const newSeatState = {
      ...seatStateInSelected,
      [type]: seatStateInSelected[type] + value,
    };

    const newSeatDots = seatPlanerRender(newSeatState);

    const lastArrayFromSeat = newSeatDots[newSeatDots.length - 1];
    const lastObjectFromLastArray =
      lastArrayFromSeat[lastArrayFromSeat.length - 1];

    const newStateOfSelectedIndex = {
      ...selectedArrayIndex,
      seatState: newSeatState,
      seatDots: newSeatDots,
      width: lastObjectFromLastArray.x + 50,
      height: lastObjectFromLastArray.y + 50,
    };
    const reactArrayStateCopy = [...reactArray];
    reactArrayStateCopy[selectedRect] = newStateOfSelectedIndex;
    setRectArray(reactArrayStateCopy);
  };

  //For Decresing Row, Col and X/Y direction space
  const decrementRowColAttribute = (type, value) => {
    if (selectedRect === null) {
      alert('Please select the rect');
      return;
    }
    const selectedArrayIndex = reactArray[selectedRect];
    const seatStateInSelected = selectedArrayIndex.seatState;
    const newSeatState = {
      ...seatStateInSelected,
      [type]: seatStateInSelected[type] - value,
    };

    const newSeatDots = seatPlanerRender(newSeatState);

    const lastArrayFromSeat = newSeatDots[newSeatDots.length - 1];
    const lastObjectFromLastArray =
      lastArrayFromSeat[lastArrayFromSeat.length - 1];

    const newStateOfSelectedIndex = {
      ...selectedArrayIndex,
      seatState: newSeatState,
      seatDots: newSeatDots,
    };
    const reactArrayStateCopy = [...reactArray];
    reactArrayStateCopy[selectedRect] = newStateOfSelectedIndex;
    setRectArray(reactArrayStateCopy);
  };

  //Move up and Down in addition

  const moveReactXY = (type, value) => {
    if (selectedRect === null) {
      alert('Please select the rect');
      return;
    }
    const selectedArrayIndex = reactArray[selectedRect];
    const newSeatState = {
      ...selectedArrayIndex,
      [type]: selectedArrayIndex[type] + value,
    };

    const reactArrayStateCopy = [...reactArray];
    reactArrayStateCopy[selectedRect] = newSeatState;
    setRectArray(reactArrayStateCopy);
  };

  //Move up and Down in subtraction
  const decrementRectXY = (type, value) => {
    if (selectedRect === null) {
      alert('Please select the rect');
      return;
    }
    const selectedArrayIndex = reactArray[selectedRect];
    const newSeatState = {
      ...selectedArrayIndex,
      [type]: selectedArrayIndex[type] - value,
    };

    const reactArrayStateCopy = [...reactArray];
    reactArrayStateCopy[selectedRect] = newSeatState;
    setRectArray(reactArrayStateCopy);
  };

  const handleClick = (coll, roww) => {
    console.log(reactArray);
  };

  const SelectRectangle = (key) => {
    setSelectedRect(key);
    setShowFooter(true);
  };

  const deleteSelectedElement = () => {
    if (selectedRect === null) {
      alert('Please select the rect');
      return;
    }
    const arrayCopy = [...reactArray];
    arrayCopy.splice(selectedRect, 1);
    setRectArray(arrayCopy);
  };

  const addReactangle = () => {
    const initalSeatValue = {
      row: 3,
      col: 5,
      rowStartPoisition: 10,
      rowIncrementPoistionBy: 25,
      colStartingPoistion: 15,
      colIncrementPoistionBy: 25,
      defaultColor: 'red',
      selected: false,
      name: '',
      price: 0,
      ticketName: '',
    };

    const reactangleInitalState = {
      height: 100,
      width: 100,
      x: 0,
      y: 0,
      seatState: initalSeatValue,
    };
    if (reactArray.length == 0) {
      const seatDots = seatPlanerRender(initalSeatValue);
      const lastArrayFromSeat = seatDots[seatDots.length - 1];
      const lastObjectFromLastArray =
        lastArrayFromSeat[lastArrayFromSeat.length - 1];
      const newRectState = {
        ...reactangleInitalState,
        width: lastObjectFromLastArray.x + 50,
        height: lastObjectFromLastArray.y + 50,
        seatDots: seatDots,
      };
      setRectArray([...reactArray, newRectState]);
    } else {
      const seatDots = seatPlanerRender(initalSeatValue);
      const lastArrayFromSeat = seatDots[seatDots.length - 1];
      const lastObjectFromLastArray =
        lastArrayFromSeat[lastArrayFromSeat.length - 1];

      const newRectState = {
        ...reactangleInitalState,
        width: lastObjectFromLastArray.x + 50,
        height: lastObjectFromLastArray.y + 50,
        seatDots: seatDots,
      };
      const lastArrayPoisition = reactArray[reactArray.length - 1];
      const newReactPosition = {
        ...newRectState,
        x: lastArrayPoisition.x + 150,
        y: lastArrayPoisition.y + 150,
      };
      setRectArray([...reactArray, newReactPosition]);
    }
  };

  const addDataInSeatDots = (color, price) => {
    const selectedArrayIndex = reactArray[selectedRect];
    const seatStateInSelected = selectedArrayIndex.seatState;
    const newSeatState = { ...seatStateInSelected, fill: color, price: price };
    const newSeatDots = seatPlanerRender(newSeatState);
    const newStateOfSelectedIndex = {
      ...selectedArrayIndex,
      seatState: newSeatState,
      seatDots: newSeatDots,
    };
    const reactArrayStateCopy = [...reactArray];
    reactArrayStateCopy[selectedRect] = newStateOfSelectedIndex;
    setRectArray(reactArrayStateCopy);
  };

  const saveData = async () => {
    if (planName == '') {
      alert('Please enter Valid Name');
      return;
    }
    await createFloorPlan(planName, JSON.stringify(reactArray)).then((res) =>
      console.log(res)
    );
    console.log(reactArray);
  };

  const updateData = async () => {
    setLoading(true);
    await updateFloorPlan(routerParams, JSON.stringify(reactArray)).then(
      (res) => console.log(res)
    );
    getTicketsData(eventId)
    setLoading(false);
  };

  const seatPlanerRender = (initalState) => {
    const rowCount = initalState.row;
    const columnCount = initalState.col;

    //X axis poisitions
    let rowStartPoisition = initalState.rowStartPoisition;
    let rowIncrementPoistionBy = initalState.rowIncrementPoistionBy;

    //Y Axis Poistions
    let colStartingPoistion = initalState.colStartingPoistion;
    let colIncrementPoistionBy = initalState.colIncrementPoistionBy;

    const xelement = [];

    for (let i = 0; i < columnCount; i++) {
      rowStartPoisition += rowIncrementPoistionBy;

      const yElement = [];

      for (let z = 0; z < rowCount; z++) {
        colStartingPoistion += colIncrementPoistionBy;

        yElement.push({
          x: rowStartPoisition,
          y: colStartingPoistion,
          class: 'blankSVG',
          fill: initalState.fill,
        });
      }
      colStartingPoistion = initalState.colStartingPoistion;
      xelement.push(yElement);
    }
    return xelement;
  };

  const addSeatname = (seatAlpha, seatNumberic, color, price, ticketName) => {
    console.log(reactArray);
    const selectedElement = reactArray[selectedRect];
    const mainSeatDots = selectedElement.seatDots;
    const columnLength = mainSeatDots.length;
    const rowLength = selectedElement.seatDots[0].length;
    let stringUniCode = seatAlpha.charCodeAt(0);
    let rowMaxVal = stringUniCode + rowLength;
    const colMaxVal = parseInt(seatNumberic) + columnLength;

    const seatNameArray = [];
    for (let i = stringUniCode; i < rowMaxVal; i++) {
      const a = [];
      for (let y = seatNumberic; y < colMaxVal; y++) {
        console.log(y, 'y');
        let n = `${String.fromCharCode(i)}${y}`;
        a.push(n);
      }
      seatNameArray.push(a);
    }
    const seatDotsArrayCopy = [...mainSeatDots];
    mainSeatDots.map((arrItem, colkey) => {
      arrItem.map((item, rowKey) => {
        const k = { key1: colkey, key2: rowKey };
        const data = mainSeatDots[colkey][rowKey];
        const name = seatNameArray[rowKey][colkey];
        const updatedData = { ...data, name: name };

        seatDotsArrayCopy[colkey][rowKey] = updatedData;
        seatDotsArrayCopy[colkey][rowKey].fill = color;
        seatDotsArrayCopy[colkey][rowKey].price = price;
        seatDotsArrayCopy[colkey][rowKey].ticketName = ticketName;
        console.log(seatDotsArrayCopy[colkey][rowKey], 'updatedData');
      });
    });

    const updtedelement = { ...selectedElement, seatDots: seatDotsArrayCopy };
    const reactArrcy = [...reactArray];
    reactArrcy[selectedRect] = updtedelement;
    setRectArray(reactArrcy);
  };

  const addTicketsInSelectedElement = () => {
    if (selectedRect === null) {
      alert('Please select the Element');
      return;
    }
    setShowFooter(false);
    setShowTicketComponent(true);
  };

  const updateTicket = (data) => {
    setLoading(true);
    if (data.name && data.color && data.price) {
      const ticketData = {
        name: data.name,
        color: data.color,
        price: data.price,
      };
      updateEventTicket(router.query.eventId, ticketData);
      setLoading(false);
    } else {
      setLoading(false);
      toast('Not a Valid Data or Incomplete Data');
    }
  };

  const updateTicketData = (data, toggle) => {
    setLoading(true);
    if (
      data.rowAlphabets &&
      data.numeric &&
      data.color &&
      data.price &&
      data.name
    ) {
      if (toggle === true) {
        addDataInSeatDots('red', data.price);
        addSeatname(
          data.rowAlphabets,
          data.numeric,
          data.color,
          data.price,
          data.name
        );
        getTicketsData(eventId)
        setShowTicketComponent(false);
        updateData();
        setLoading(false);
      } else {
        addDataInSeatDots('red', data.price);
        addSeatname(
          data.rowAlphabets,
          data.numeric,
          data.color,
          data.price,
          data.name
        );
        getTicketsData(eventId)
        setShowTicketComponent(false);
        updateData();
        updateTicket(data);
        setLoading(false);
      }
    } else {
      toast('All fields are required to fill.');
      setLoading(false);
    }
  };

  console.log('rendering');

  return (
    <>
      <Grid container sx={{ paddingTop: '24px' }}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            backgroundColor: '#000',
            marginTop: '-25px',
          }}
        >
          <SideMenu
            addTicketData={addTicketsInSelectedElement}
            addNewElement={addReactangle}
            deleteSelectedElement={deleteSelectedElement}
            saveData={updateData}
            tickets={ticketCollectionData}
            currency={data.currency}
          />
          {/* {data.tickets && (
            <ShowTickets currency={data.currency} data={data.tickets} />
          )} */}
          {showFooter && (
            <FooterMenu
              decrementRectXY={decrementRectXY}
              moveReactXY={moveReactXY}
              increaseRowColAttribute={increaseRowColAttribute}
              decrementRowColAttribute={decrementRowColAttribute}
            />
          )}
        </Grid>
        {showticketComponent ? (
          <TicketComponent
            open={showticketComponent}
            onClose={setShowTicketComponent}
            saveData={updateTicketData}
            tickets={ticketCollectionData}
            currency={data.currency}
          />
        ) : null}

        <Grid item xs={12} md={9}>
          {/* <UncontrolledReactSVGPanZoom
            SVGBackground="#1f2227"
            ref={Viewer}
            width={800}
            height={600}
            onZoom={(e) => console.log('zoom')}
            onPan={(e) => console.log('pan')}
            onClick={(event) =>
              console.log('click', event.x, event.y, event.originalEvent)
            }
          > */}
          {/*Increase width and height of main rectangle*/}
          <TransformWrapper minScale={0.1} centerZoomedOut={true}>
            <TransformComponent>
              {/* <svg width={layoutWidth} height={layoutHeight}> */}
              <Box
                sx={{
                  backgroundColor: '#888',
                  width: layoutWidth - 50,
                  height: layoutHeight,
                  marginLeft: '25px',
                  marginTop: '25px',
                }}
              >
                <svg width={layoutWidth} height={layoutHeight}>
                  <g fillOpacity=".5" strokeWidth="4">
                    <rect
                      fill="#40444d"
                      width={layoutWidth - 400}
                      height="100"
                      rx="5"
                      ry="5"
                      x="200"
                      y="70"
                    ></rect>
                    <text
                      x={layoutWidth / 2 - 30}
                      y="125"
                      width="60"
                      fill="#fff"
                      font-weight="bold"
                    >
                      Stage
                    </text>
                    {reactArray.map((item1, key) => {
                      return (
                        <svg
                          ref={rectSvgRef}
                          style={{ cursor: 'grap', border: '1px solid' }}
                          width={item1.width}
                          height={item1.height}
                          x={item1.x}
                          y={item1.y}
                        >
                          <g
                            className={
                              selectedRect == key ? 'selectedRect' : ''
                            }
                            onClick={() => SelectRectangle(key)}
                          >
                            {item1.seatDots?.map((item2, key1) =>
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
                                  handleClick={() => handleClick(key1, key2)}
                                />
                              ))
                            )}
                          </g>
                        </svg>
                      );
                    })}
                  </g>
                </svg>
              </Box>
            </TransformComponent>
          </TransformWrapper>

          {/* </UncontrolledReactSVGPanZoom> */}
          {loading === true && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(0 0 0 / 39%)',
                zIndex: 99999999,
                position: 'fixed',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};
Seat.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default Seat;


