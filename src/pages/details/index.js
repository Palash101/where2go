
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Image from 'next/image'
import Grid from '@mui/material/Grid';

import HomeLayout from 'src/@core/layouts/HomeLayout'


function Details(){
    
   
return(
        <>
     <Grid container spacing={4} justifyContent="center" sx={{marginRight:'5rem',
            marginLeft:'5rem',
            marginTop:'60px',
            maxWidth:1180,
            marginLeft:'auto',
            marginRight:'auto',
            paddingLeft:'20px',
            paddingRight:'20px',
            paddingBottom:'20px'}}>
        <Grid item xs={7}>
            <div className='detailImage'>
            <Image src='/images/slide1.jpeg' width={523} height={523} />
            </div>
        </Grid>
        <Grid item xs={5} alignItems="center" sx={{paddingTop:'50px'}}>
           <h3 className='detailHeading'>Steel Mill Meltdown Escape Game</h3>
           <Box>
                <div className='subDetail'>
                    <span>
                    <Image src='/images/slide1.jpeg' width={50} height={50} style={{borderRadius:'50%'}}/>
                    </span>
                    <h5>Escape Hunt Kuwait Escape Games</h5>
                </div>
                <h6 className='contactLine'>Have a queston? Tap to contact us</h6>
           </Box>
           <Box>

           </Box>
           <Button variant="contained" sx={{    background: '#ffe600',
    color: '#000',
    padding: '20px',
    textAlign: 'center',
    display: 'block',
    width: '100%',
    margin: '50px 0px',
    borderRadius: '54px',
    fontSize: '22px',
    fontWeight: 'bold'}}>
               GET TICKETS
               <span style={{    display: 'block',
    fontSize: '12px'}}>from 11 kwd</span>
            </Button>

        </Grid>
        </Grid>
        </>
        

    )
}

Details.getLayout = page => <HomeLayout>{page}</HomeLayout>

export default Details;