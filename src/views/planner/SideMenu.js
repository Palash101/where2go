// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ShowTickets from './ShowTickets';
import { useRouter } from 'next/router';
import Router from 'next/router'

const SideMenu = (props) => {
  const router = useRouter();
  return (
    <Box sx={{ marginTop: '53px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          // position: 'fixed',
          // paddingLeft:'20px',
          padding: '50px 20px 20px 20px',
          // paddingLeft: 'calc(8.33% - 51px)',
        }}
      >


    <div style={{marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%'}}>
          <label style={{display:'block',marginBottom:20,}} >
           
          <input type="radio" name="selected" value={'true'} checked={props.boxSelected === 'true'} onChange={(e) => props.setBoxSelected(e.target.value)} style={{width:20,height:20,float:'left'}}/>
          Box Selection 
          </label>
          <label style={{display:'block'}} >
          <input type="radio" name="selected" value={'false'} checked={props.boxSelected === 'false'} onChange={(e) => props.setBoxSelected(e.target.value)} style={{width:20,height:20,float:'left'}}/>
          Circle Selection 
          </label>
        </div>


        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
            marginBottom: '20px',
          }}
        >
          <Box
            sx={{
              marginBottom: '10px',
              border: '1px solid #888',
              borderRadius: '6px',
              height: '70px',
              width: '70px',
              textAlign: 'center',
              paddingTop: '10px',
            }}
          >
            <AddIcon
              sx={{ fontSize: '50px', cursor: 'pointer' }}
              onClick={props.addNewElement}
            />
          </Box>
          <Box
            sx={{
              marginBottom: '10px',
              border: '1px solid #888',
              borderRadius: '6px',
              height: '70px',
              width: '70px',
              textAlign: 'center',
              paddingTop: '15px',
            }}
          >
            <DeleteIcon
              sx={{ fontSize: '40px', cursor: 'pointer' }}
              onClick={props.deleteSelectedElement}
            />
          </Box>
          <Box
            sx={{
              marginBottom: '10px',
              border: '1px solid #888',
              borderRadius: '6px',
              height: '70px',
              width: '70px',
              textAlign: 'center',
              paddingTop: '15px',
            }}
          >
            <ConfirmationNumberIcon
              sx={{ fontSize: '40px', cursor: 'pointer' }}
              onClick={props.addTicketData}
            />
          </Box>
        </Box>

        {props.tickets.tickets && (
          <ShowTickets currency={props.currency} data={props.tickets.tickets} />
        )}

        {/* <Box className="placer" sx={{ marginBlock: '150%' }}></Box> */}
        <Box sx={{ marginBottom: '10px', marginTop: '10px' }}>
          <Button onClick={props.saveData} variant="contained">
            Save Data
          </Button>
        </Box>
        <Box>
          <Button onClick={() => Router.back()} variant="contained">
            Go Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SideMenu;
