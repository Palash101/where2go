import FormLayoutsBasic from 'src/views/form-layouts/FormLayoutsBasic'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import CardContent from '@mui/material/CardContent'
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch';




import { useRouter } from 'next/router'


import {addCategory} from '../../../../service/admin/category'
import { useState } from 'react'


function CategoryAdd() {
    const router  = useRouter()


    const [categoryName,setCategoryName] = useState('')
    const [status,setStatus] = useState(1)
    const [loading,setLoading] = useState(false)
    const [snackState,setSnackState] = useState({
      open: false,
      vertical: 'top',
      horizontal: 'right',
      message:'asdasd'
    })

    const { vertical, horizontal, open,message } = snackState;

    const handleClose = () => {
      setSnackState({ ...snackState, open: false });
    };
  

    //Firebase Store Category
    const storeCategory = async ()=>{
        if(categoryName === ''|| status === ''){
          alert('Please enter Valid data')
          return;
        }
        setLoading(true)
        console.log(categoryName,'submitting')
        await addCategory(categoryName,status).then((res)=>{
          console.log(res,'ress')
          handleMessage()
          setLoading(false)
          router.push('/admin/category')
        })
        

    }
    const handleMessage = (msg) => () => {
      console.log(msg,'hdling adasd')
      setSnackState({ open: true,...snackState });
    };


    return ( 
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
            <Card>
           
                <CardHeader title='Add Category' titleTypographyProps={{ variant: 'h6' }} />
                    <CardContent>
                        <form >
                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                <TextField required onChange={(e)=>setCategoryName(e.target.value)} fullWidth label='Category Name' placeholder='Ex: Drama, Game, Movie' />
                                <FormControl sx={{marginTop:'20px'}} fullWidth>
                <InputLabel  id='form-layouts-separator-multiple-select-label'>Status</InputLabel>
                <Select
                  onChange={(e)=>setStatus(e.target.value)}
                  id='form-layouts-separator-multiple-select'
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='Language' id='select-multiple-language' />}
                  required
                >
                  <MenuItem value='1'>Active</MenuItem>
                  <MenuItem value='0'>Block</MenuItem>
                </Select>
              </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                <Button 
                                disabled={loading}
                                  type='button' onClick={storeCategory} variant='contained' size='large'>
                                    Submit
                                </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
            </Card>
        </Grid>
        {loading &&(
          <CircularProgress 
          sx={{
            position:'absolute',
            right:'40%',
            top:'50%',

          }}/>
              )}
          <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={3000}
          onClose={handleClose}
          open={open}
          message={message}
          severity="success" 
          key={vertical + horizontal}
        />
      </Grid>
    </DatePickerWrapper>
     );
}

export default CategoryAdd;