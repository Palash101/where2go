// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-toastify'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import Slider from '@mui/material/Slider'
import RemoveIcon from '@mui/icons-material/Remove'

//Service Imports
import { updateEventData } from '../../../service/admin/events'

import { userAuth } from 'context/userContext'
import Translations from 'utils/trans'

const FooterMenu = (props) => {
  return (
    <Box
      sx={{
        // position: 'fixed',
        backgroundColor: '#000',
        // top: '500px',
        // right: '5px',
        // zIndex: '9999',
        height: '112px',
        width: 'calc(100% - 35px)',
        borderRadius: '5px',
        boxShadow: '0px 0px 2px 0px #aa5656',
        margin:5,
        paddingTop:1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: '5px',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            height: '95px',
            alignContent: 'space-between',
          }}
        >
          <Box
            sx={{
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <AddIcon
              onClick={() => props.increaseRowColAttribute('row', 1)}
              sx={{
                fontSize: '20px',
                cursor: 'pointer',
                marginInline: '10px',
                backgroundColor: '#ffffff12',
                borderRadius: '50%',
              }}
            />
            <Typography sx={{ fontSize: '12px' }}>
              <img
                src="/images/ico/insertr.png"
                style={{ width: '20px', height: '20px' }}
              />
            </Typography>
            <RemoveIcon
              onClick={() => props.decrementRowColAttribute('row', 1)}
              sx={{
                fontSize: '20px',
                cursor: 'pointer',
                marginInline: '10px',
                backgroundColor: '#ffffff12',
                borderRadius: '50%',
              }}
            />
          </Box>

          <Box
            sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}
          >
            <AddIcon
              onClick={() =>
                props.increaseRowColAttribute('rowIncrementPoistionBy', 10)
              }
              sx={{
                fontSize: '20px',
                cursor: 'pointer',
                marginInline: '10px',
                backgroundColor: '#ffffff12',
                borderRadius: '50%',
              }}
            />
            <Typography sx={{ fontSize: '12px' }}>
              <img
                src="/images/ico/spaceh.png"
                style={{ width: '20px', height: '20px' }}
              />
            </Typography>
            <RemoveIcon
              onClick={() =>
                props.decrementRowColAttribute('rowIncrementPoistionBy', 10)
              }
              sx={{
                fontSize: '20px',
                cursor: 'pointer',
                marginInline: '10px',
                backgroundColor: '#ffffff12',
                borderRadius: '50%',
              }}
            />
          </Box>
          <Box
            sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}
          >
            <AddIcon
              onClick={() => props.rotatel('row', 1)}
              sx={{
                fontSize: '20px',
                cursor: 'pointer',
                marginInline: '10px',
                backgroundColor: '#ffffff12',
                borderRadius: '50%',
              }}
            />
            <Typography sx={{ fontSize: '12px' }}>
              <img
                src="/images/ico/rotatel.png"
                style={{ width: '20px', height: '20px' }}
              />
            </Typography>
            <RemoveIcon
              onClick={() => props.rotatel('row', 1)}
              sx={{
                fontSize: '20px',
                cursor: 'pointer',
                marginInline: '10px',
                backgroundColor: '#ffffff12',
                borderRadius: '50%',
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            position:'relative',
            height: '80px',
            width: '80px',
            borderRadius: '50%',
            backgroundColor: '#ff3d00',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0px 0px 4px 2px white',
          }}
        >
          <Box
            className="updown"
            sx={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              top: '-5px',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '30px', height: '30px', overflow: 'hidden',marginBottom: '14px' }}>
              <ArrowDropUpIcon
                sx={{ width: '60px', height: '60px', cursor: 'pointer', marginTop: '-14px' }}
                onClick={() => props.decrementRectXY('y', 10)}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '30px', height: '30px', overflow: 'hidden',marginTop: '14px' }}>
              <ArrowDropDownIcon
                sx={{ width: '60px', height: '60px', cursor: 'pointer', marginTop: '-14px' }}
                onClick={() => props.moveReactXY('y', 10)}
              />
            </Box>
          </Box>

          <Box
            className="leftright"
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              top: '22px',
            }}
          ><Box sx={{ display: 'flex', justifyContent: 'center', width: '30px', height: '30px', overflow: 'hidden' , marginRight: '14px' }}>
              <ArrowLeftIcon
                sx={{ width: '60px', height: '60px', cursor: 'pointer', marginTop: '-14px' }}
                onClick={() => props.decrementRectXY('x', 10)}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '30px', height: '30px', overflow: 'hidden', marginLeft: '14px' }}>
              <ArrowRightIcon
                sx={{ width: '60px', height: '60px', cursor: 'pointer', marginTop: '-14px' }}
                onClick={() => props.moveReactXY('x', 10)}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'grid',
            height: '95px',
            alignContent: 'space-between',
          }}
        >
          <Box
            sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}
          >
            <AddIcon
              onClick={() => props.increaseRowColAttribute('col', 1)}
              sx={{
                fontSize: '20px',
                cursor: 'pointer',
                marginInline: '10px',
                backgroundColor: '#ffffff12',
                borderRadius: '50%',
              }}
            />
            <Typography sx={{ fontSize: '12px' }}>
              <img
                src="/images/ico/insertc.png"
                style={{ width: '20px', height: '20px' }}
              />
            </Typography>
            <RemoveIcon
              onClick={() => props.decrementRowColAttribute('col', 1)}
              sx={{
                fontSize: '20px',
                cursor: 'pointer',
                marginInline: '10px',
                backgroundColor: '#ffffff12',
                borderRadius: '50%',
              }}
            />
          </Box>
          <Box
            sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}
          >
            <AddIcon
              onClick={() =>
                props.increaseRowColAttribute('colIncrementPoistionBy', 10)
              }
              sx={{
                fontSize: '20px',
                cursor: 'pointer',
                marginInline: '10px',
                backgroundColor: '#ffffff12',
                borderRadius: '50%',
              }}
            />
            <Typography sx={{ fontSize: '12px' }}>
              <img
                src="/images/ico/spacev.png"
                style={{ width: '20px', height: '20px' }}
              />
            </Typography>
            <RemoveIcon
              onClick={() =>
                props.decrementRowColAttribute('colIncrementPoistionBy', 10)
              }
              sx={{
                fontSize: '20px',
                cursor: 'pointer',
                marginInline: '10px',
                backgroundColor: '#ffffff12',
                borderRadius: '50%',
              }}
            />
          </Box>
          <Box
            sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}
          >
            <AddIcon
              onClick={() => props.increaseRow('row', 1)}
              sx={{
                fontSize: '20px',
                cursor: 'pointer',
                marginInline: '10px',
                backgroundColor: '#ffffff12',
                borderRadius: '50%',
              }}
            />
            <Typography sx={{ fontSize: '12px' }}>
              <img
                src="/images/ico/rotater.png"
                style={{ width: '20px', height: '20px' }}
              />
            </Typography>
            <RemoveIcon
              onClick={() => props.decreaseRow('row', 1)}
              sx={{
                fontSize: '20px',
                cursor: 'pointer',
                marginInline: '10px',
                backgroundColor: '#ffffff12',
                borderRadius: '50%',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default FooterMenu
