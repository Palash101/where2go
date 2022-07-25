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
    const router = useRouter();

    useEffect(()=>{
    
        getMainData()

    },[navigation])

    const getMainData =()=>{
         var adata = [];
        getCategory().then((data)=>{
            for(var i = 0;i<data.length;i++){
                var dt = data[i];
                getHomePageEvent(dt.name).then((data1)=>{
                    console.log(data1)
                        adata.push(data1)
                });
            }
        })
        console.log(adata.length,'adata')
        setAllData(adata)

    }


    function Item(props)
{
    
return (
        <div style={{borderRadius:'20px',overflow:'hidden'}} className='bannerImage'>
            <Image
            src={props.item.href}
            alt="Picture of the author"
            layout='fill'
            
            />
        </div>
    )
}


function renderImage(item){
    if(item.href){
        return(
            <Image
            src={item.href}
            alt="Picture of the author"
           layout='fill'
            />
        )
    }
    else if(item.images){
        return(
            <Image
            src={item.images.banner1}
            alt="Picture of the author"
           layout='fill'
            />
        )
    }
    else{
        return(
            <Image
            src='/images/slide2.jpeg'
            alt="Picture of the author"
           layout='fill'
            />
        )
    }
}

function SlideItem1(props){
    return(
        <div className='slideItem' onClick={() => router.push({
            pathname: '/details/[id]',
            query: { id: props.item.name},
          })}>
            <div className='slideItemImage'>
               {renderImage(props.item)}
            </div>
            <p>{props.item.name}</p>
        </div>
    )
}

function SlideItem(props){
    return(
        <div className='slideItem' onClick={() => router.push({
            pathname: '/details/[id]',
            query: { id: props.item.event_name},
          })}>
            <div className='slideItemImage'>
               {renderImage(props.item)}
            </div>
            <p>{props.item.event_name}</p>
        </div>
    )
}
    console.log(allData,'aasdata ')

    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            href:'/images/slideimge1.jpg'

        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            href:'/images/bannerImage2.jpg'
        }
    ]
    
    var entertainments = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            href:'/images/slide1.jpeg'

        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            href:'/images/slide2.jpeg'
        },
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            href:'/images/slide3.jpeg'

        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            href:'/images/slide4.jpeg'
        },
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            href:'/images/slide1.jpeg'

        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            href:'/images/slide2.jpeg'
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


            {/*{allData.length && 
                allData.map((item,key) => ( */}
                    <div>
                        <Typography sx={{fontSize:'20px !important',fontWeight:'bold',color:'#4b535f'}} variant='h5'>Entertainment</Typography>
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={30}
                            className="mySwiper"
                            breakpoints={{
                                "@0.00": {
                                slidesPerView: 1,
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
                            {
                                entertainments.map((item1,i) => <SwiperSlide key={i} item={item1} ><SlideItem1 item={item1}/></SwiperSlide>)
                            }
                        
                        </Swiper>
                    </div>
                {/* ))
            } */}

             {allData.length && 
                allData.map((item,key) => ( 
                    <div>
                        <Typography sx={{fontSize:'20px !important',fontWeight:'bold',color:'#4b535f'}} variant='h5'>{item.label}</Typography>
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={30}
                            className="mySwiper"
                            breakpoints={{
                                "@0.00": {
                                slidesPerView: 1,
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
                            {item.value &&
                                item.value.map((item1,i) => <SwiperSlide key={i} item={item1} ><SlideItem item={item1}/></SwiperSlide>)
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