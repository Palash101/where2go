
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Image from 'next/image'
import Grid from '@mui/material/Grid';
import TodayIcon from '@mui/icons-material/Today';
import MapIcon from '@mui/icons-material/Map';
import HomeLayout from 'src/@core/layouts/HomeLayout'
import { borderTop } from '@mui/system'
import { auto } from '@popperjs/core'


function Details(){
    
   
return(
        <>
     <Grid container spacing={4} justifyContent="center" sx={{
            marginTop:'60px',
            maxWidth:1180,
            marginLeft:'auto',
            marginRight:'auto',
            paddingLeft:'20px',
            paddingRight:'20px',
            paddingBottom:'20px'}}>
        <Grid item xs={12} md={7}>
            <div className='detailImage'>
            <Image src='/images/slide1.jpeg' layout='fill' />
            </div>
        </Grid>
        <Grid item md={5} xs={12} alignItems="center" sx={{paddingTop:'50px'}}>
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
           <Box sx={{textAlign:'center',
                    background: '#22262b!important',
                    margin: '25px 0px',
                    padding: '20px',
                    borderRadius: '10px'}}>
                <TodayIcon  sx={{ fontSize: 40,color:'#373c44!important', }}/>
                <h6 className='dayLine'>Everyday From 10:00 AM - 01:00 AM</h6>
                <MapIcon  sx={{ fontSize: 40,color:'#9ca1a8!important', }}/>
                <h6 className='dayLine2'> Al Bida’a, Arjan Albida'a, Al Ta’awn street, near Movenpick Hotel and Resort, Kuwait </h6>
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
        <Grid item xs={12}>
            <p className='descPara'><b>Description</b></p>
            <p className='descPara'>Survive Now... Cry Later! STOP THE SABOTAGE AND SAVE YOUR COLLEAGUES! You have 60 minutes to prevent an explosion that would cause molten steel to destroy the neighborhood! (Escape Game/Hero mode) Escape Hunt Kuwait The Ultimate Live Escape Game Step into a new world! Get locked in and clued up! Beat the time and break out! Challenge yourself and your team (2-7) players in one of our adventures Immersive Themes. Testing your skills against time (60 minutes). Find keys, hidden passages and objects, combine them to solve the riddles and puzzles, for one goal only "To Escape the Room and Solve the Mystery! Games for Adults ...Book Now!</p>

        </Grid>
        <Grid item xs={12} >
            <Box sx={{ marginBottom: '25px',
                        background: '#c6cbd1',
                        width: '100%',
                        height: '1px',
                        opacity: '0.3'}}></Box>
                    <p className='descPara'><b> Terms & Conditions</b></p>
                <ul>
                    <li>
                        <p className='descPara'>Bookings are made for groups of 2 to 7 players only</p>
                    </li>
                    <li>
                        <p className='descPara'>Games for adults, ages 8 to 11 must be accompanied by an adult</p>
                    </li>
                    <li>
                        <p className='descPara'>Working hours from 10:00 AM - 01:00 AM</p>
                    </li>
                </ul>
            
            </Grid>

        </Grid>
        
        
        </>
        

    )
}

Details.getLayout = page => <HomeLayout>{page}</HomeLayout>

export default Details;