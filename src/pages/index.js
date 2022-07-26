//React Imports

import { useState } from 'react'
//Material Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Image from 'next/image'

import HomeLayout from 'src/@core/layouts/HomeLayout'
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from 'next/router'
import "swiper/css";

//Service Imports here

import{getHomePageEvent,getCategory} from '../../service/admin/events'
import { useEffect } from 'react'





function Home(navigation){
    const  [allData, setAllData] = useState([]);
    const  [categories, setCategories] = useState([]);
    const router = useRouter();

    useEffect(()=>{
    
        getMainData()

    },[navigation])

    const getMainData =()=>{
        getCategory().then((data)=>{
            setCategories(data)
        })

        getHomePageEvent().then((data) => {
            setAllData(data)
            console.log(data)
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


function SlideItem(item,cat){
    if(item.category === cat.name){
        return(
            <SwiperSlide key={item.event_name} >
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
}

    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            href:'/images/slideimage1.jpg'

        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            href:'/images/bannerImage2.jpg'
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



             {categories.length && 
                categories.map((item,key) => ( 
                    <div>
                         {allData.filter(item2 => item2.category === item.name).length > 0 && (
                            <Typography sx={{fontSize:'20px !important',fontWeight:'bold',color:'#4b535f'}} variant='h5'>{item.name}</Typography>
                      
                       )}
                       
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
                            {allData &&
                                allData.map((item1,i) => SlideItem(item1,item)
                                )
                            }
                            
                        </Swiper>
                    </div>
                 ))
            }



           

        </Box>
       
        </>
        

    )
}

Home.getLayout = page => <HomeLayout>{page}</HomeLayout>

export default Home;