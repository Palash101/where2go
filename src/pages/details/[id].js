
import { useState,useEffect } from 'react'

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
import { useRouter } from 'next/router'

import { getEventById } from 'service/admin/events'

function Details(navigation){
    const router = useRouter();
  const id = router.query.id;
  const [item,setItem] = useState({});

  useEffect(()=>{
    if(router.isReady){
        getEventById(router.query.id).then((data)=>{
            console.log(data)
            setItem(data)
        })
    }
},[router.isReady,navigation])


   
return(
        <>
     <Grid container spacing={4} justifyContent="center" sx={{
            marginTop:'60px',
            maxWidth:900,
            marginLeft:'auto',
            marginRight:'auto',
            paddingLeft:'20px',
            paddingRight:'20px',
            paddingBottom:'20px'}}>
        <Grid item xs={12} md={8} sx={{paddingLeft:'0px'}}>
            <div className='detailImage'>
                {item.images && (
                    <img src={item.images.banner1} className='detailImg' />
                )}
            
            </div>
        </Grid>
        <Grid item md={4} xs={12} alignItems="center" sx={{paddingTop:'50px',paddingLeft:'0px'}}>
           <h3 className='detailHeading'>{item.event_name}</h3>
           <Box>
            <div className='catdet'>
                <div className='subDetail'>
                    <span>
                    <Image src='/images/slide1.jpeg' width={50} height={50} style={{borderRadius:'50%'}}/>
                    </span>
                    <h5>Escape Hunt Kuwait Escape Games</h5>
                </div>
                <h6 className='contactLine'>Have a queston? Tap to contact us</h6>
                </div>
           </Box>
           <Box sx={{textAlign:'center',
                    background: '#22262b!important',
                    margin: '25px 0px',
                    padding: '20px',
                    borderRadius: '10px'}}>
                <TodayIcon  sx={{ fontSize: 40,color:'#373c44!important', }}/>
                {item.event_date && item.event_date.map((item1,key) => (
                    <h6 className='dayLine' key={key}>{item1.date} From {item1.from} - {item1.to}</h6>
                ))}
                {item.event_location && (
                    <div className='locbox'>
                        <MapIcon  sx={{ fontSize: 40,color:'#9ca1a8!important', }}/>
                        <h6 className='dayLine2'> {item.event_location}</h6>
                    </div>
                )}
                
           </Box>
           <Button variant="contained" sx={{    background: '#ffe600',
            color: '#1f2227',
            padding: '10px 0px',
            textAlign: 'center',
            display: 'block',
            width: '100%',
            margin: '50px 0px',
            borderRadius: '54px',
            fontSize: '1.25rem',
            fontWeight: 'bold'}}>
               GET TICKETS
               <span style={{    display: 'block',
    fontSize: '12px'}}>from 11 kwd</span>
            </Button>

        </Grid>
        <Grid item xs={12} sx={{paddingLeft:'0px'}}>
            <p className='descPara'><b>Description</b></p>
            <p className='descPara'>{item.description}</p>

        </Grid>
        <Grid item xs={12} sx={{paddingLeft:'0px'}}>
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