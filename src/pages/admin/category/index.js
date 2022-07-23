
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Chip from '@mui/material/Chip'
import { useRouter } from 'next/router'



import {getAllCategory} from '../../../../service/admin/category'

function CategoryList() {
    const[allCategory ,setAllCategory] =  useState([])

    useEffect(()=>{
      const getData =  async()=>{
        const catData =  await getAllCategory()
        const catArray =[];
        catData.docs.forEach(item=>{
        catArray.push(item.data())
       })
        setAllCategory(catArray)
      }
      getData()
      

    },[])

    const renderStatusChip = (status,color) =>{
      return(
        <div>
          <span 
          style={{
            padding: "4px 10px",
            borderRadius:"12px",
            backgroundColor:color,
            color:"#fdfdfd",
            fontSize:"12px"
        }}>{status}</span>
        </div>
      )
    }


    return ( 
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Event Categories' titleTypographyProps={{ variant: 'h6' }} />
            
          </Card>
          <TableContainer sx={{marginTop:'10px'}} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Category Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align='right'>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCategory.map(row => (
                  <TableRow
                    key={row.name}
                    sx={{
                      '&:last-of-type td, &:last-of-type th': {
                        border: 0
                      }
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.status == 1 ? renderStatusChip('Active','#56ca00'):renderStatusChip('Block','#ff4c51')}
                    </TableCell>
                  
                    <TableCell align='right'>Edit</TableCell>
                  </TableRow>

                ))}
              </TableBody>
            </Table>
         </TableContainer>
      </Grid>
     );
}

export default CategoryList;