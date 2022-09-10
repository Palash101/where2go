// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

const ShowTickets = (props) => {
  useEffect(() => {
    console.log(props.data, 'tickets')
  }, [])

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 0,
        top: '70px',
        maxWidth: '323px',
        width: '100%',
      }}
    >
      <ul className="prlist">
        {props.data.map((item1, key) => (
          <li key={key} style={{ margin: '20px 10px' }}>
            <Box>
              <span
                className="circleList"
                style={{ backgroundColor: item1.color }}
              ></span>{' '}
              {item1.name}
            </Box>
            <Box>
              {item1.price} {props.currency}
            </Box>
          </li>
        ))}
      </ul>
    </Box>
  )
}

export default ShowTickets
