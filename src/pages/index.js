//React Imports

import { useState } from 'react'
//Material Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import Image from 'next/image'

import HomeLayout from 'src/@core/layouts/HomeLayout'
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from 'next/router'
import "swiper/css";
import { RecaptchaVerifier } from "firebase/auth";

//utils import
import Translations from '../../utils/trans'

//Service Imports here

import{getHomePageEvent} from '../../service/admin/events'
import { useEffect } from 'react'
import {auth} from '../../service/main'





function Home(navigation){
    const  [allData, setAllData] = useState([]);
    const  [loading, setLoading] = useState(true);
    const router = useRouter();
    const { locale } = router
    const t =  Translations(locale)
    console.log('local',t)


    useEffect(()=>{
    
        getMainData()

    },[navigation])

    const getMainData =()=>{
        getHomePageEvent().then((data) => {
            setAllData(data)
            setLoading(false)
            console.log(data,'alldt')
        })

    }


function Item(props)
{
    
return (
        <div style={{borderRadius:'20px',overflow:'hidden',backgroundImage:'url('+props.item.href+')'}} className='bannerImage'>
            {/* <img
            src={props.item.href}
            alt="Picture of the author"
            className='sliderImage'
            
            /> */}
        </div>
    )
}

const arSlide = () =>{
    if(locale === 'ar'){
        return {marginLeft: '50px !important',
        marginRight: '0px !important'}
    }
}


function renderImage(item){
    if(item.href){
        return(
            <img
            src={item.href}
            alt="Picture of the author"
            className='itemImage1'
            />
        )
    }
    else if(item.images){
        return(
            <img
            src={item.images.banner1}
            alt="Picture of the author"
            className='itemImage1'
            />
        )
    }
    else{
        return(
            <img
            src='/images/logos/logo.png'
            alt="Picture of the author"
            className='itemImage'
            />
        )
    }
}


function SlideItem(item,i){
        return(
            <SwiperSlide key={i} style={locale === 'ar' ? {marginLeft: '50px !important',
                marginRight: '0px !important'}:{marginRight: '50px !important',
                marginLeft: '0px !important'}} >
                <div className='slideItem' onClick={() => router.push({
                    pathname: '/details/[id]',
                    query: { id: item.id},
                    })}>
                    <div className='slideItemImage'>
                        {renderImage(item)}
                    </div>
                    <p>{item.event_name}</p>
                </div>
             </SwiperSlide>
        )
}

    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            href:'/images/b1.jpeg'

        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            href:'/images/b2.jpeg'
        },
        {
            name: "Random Name #3",
            description: "Hello World!",
            href:'/images/b3.jpeg'
        }
    ]


    
  

return(
        <>
        <Box
        sx={{
            marginRight:'5rem',
            marginLeft:'5rem',
            marginTop:'90px',
            maxWidth:1180,
            marginLeft:'auto',
            marginRight:'auto',
            paddingLeft:'20px',
            paddingRight:'20px',
        }}>
             <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
            </Carousel>



             {allData.length > 0 && 
                allData.map((item,key) => ( 
                    <div>
                        
                        <Typography sx={{fontSize:'20px !important',fontWeight:'bold',color:'#4b535f'}} variant='h5'>{item.key}</Typography>
                       
                        <Swiper
                            slidesPerView={4}
                             spaceBetween={30}
                            className="mySwiper"
                            breakpoints={{
                                "@0.00": {
                                slidesPerView: 2,
                                 spaceBetween: 10,
                                },
                                "@0.75": {
                                slidesPerView: 2,
                                 spaceBetween: 20,
                                },
                                "@1.00": {
                                slidesPerView: 3,
                                spaceBetween: 40,
                                },
                                "@1.50": {
                                slidesPerView: 4,
                                 spaceBetween: 50,
                                },
                            }}
                        >
                            {item.data &&
                                item.data.map((item1,i) => SlideItem(item1,i)
                                )
                            }
                            
                        </Swiper>
                    </div>
                 ))
            }



           

        </Box>
        {loading === true && (
            <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center',backgroundColor: 'rgb(0 0 0 / 39%)',zIndex: 99999999,position: 'fixed',left: 0,
              right: 0,
              top: 0,
              bottom: 0, }}>
                  <CircularProgress />
              </Box>
            )}
        </>
        

    )
}

Home.getLayout = page => <HomeLayout>{page}</HomeLayout>

export default Home;