import FormLayoutsBasic from 'src/views/form-layouts/FormLayoutsBasic'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'

import {addCategory} from '../../../service/admin/category'
import { useState } from 'react'


function CategoryAdd() {
    const [categoryName,setCategoryName] = useState('')
    const storeCategory = async ()=>{
        
        console.log(categoryName,'submitting')
        await addCategory(categoryName)

    }
    return ( 
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
            <Card>
                <CardHeader title='Add Category' titleTypographyProps={{ variant: 'h6' }} />
                    <CardContent>
                        <form onSubmit={(data)=>console.log(data)}>
                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                <TextField onChange={(e)=>setCategoryName(e.target.value)} fullWidth label='Category Name' placeholder='Ex: Drama, Game, Movie' />
                                </Grid>
                                <Grid item xs={12}>
                                <Button  type='button' onClick={()=>storeCategory()} variant='contained' size='large'>
                                    Submit
                                </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
            </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
     );
}

export default CategoryAdd;