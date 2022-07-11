
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

import {getAllCategory} from '../../../service/admin/category'

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: value => value.toLocaleString('en-US')
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: value => value.toLocaleString('en-US')
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: value => value.toFixed(2)
    }
  ]

function CategoryList() {
    const[allCategory ,setAllCategory] =  useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage)
    }
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value)
      setPage(0)
    }
    
    useEffect(async ()=>{
       const allCat =  await getAllCategory()
       allCat.docs.forEach(item=>{
        console.log(item)
        setAllCategory([...allCategory,item.data()])
       })
       console.log(allCategory)

    },[])
    return ( 
        <Grid item xs={12}>
        <Card>
          <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                    <TableRow>
                        <TableCell>
                        Category Name
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allCategory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    return (
                        <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                        {columns.map(column => {
                            const value = row[column.id]

                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                            )
                        })}
                        </TableRow>
                    )
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={allCategory.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
        </Card>
      </Grid>
     );
}

export default CategoryList;