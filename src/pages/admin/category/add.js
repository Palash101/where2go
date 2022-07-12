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
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import CardContent from '@mui/material/CardContent'

import {addCategory} from '../../../../service/admin/category'
import { useState } from 'react'


function CategoryAdd() {
    const [categoryName,setCategoryName] = useState('')
    const [status,setStatus] = useState(1)
    const storeCategory = async ()=>{
        console.log(categoryName,'submitting')
        await addCategory(categoryName,status)

    }
    const handleSelectChange = event => {
        setStatus(event.target.value)
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
                                <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Status</InputLabel>
                <Select
                  onChange={handleSelectChange}
                  id='form-layouts-separator-multiple-select'
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='Language' id='select-multiple-language' />}
                >
                  <MenuItem value='1'>Active</MenuItem>
                  <MenuItem value='0'>Block</MenuItem>
                </Select>
              </FormControl>
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