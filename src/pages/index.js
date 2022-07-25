
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Image from 'next/image'

import HomeLayout from 'src/@core/layouts/HomeLayout'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Item(props)
{
    console.log(props)
    
return (
        <div style={{borderRadius:'20px',overflow:'hidden'}}>
            <Image
            src={props.item.href}
            alt="Picture of the author"
            width={1140}
            height={400}
            
            />
        </div>
    )
}

function SlideItem1(props){
    console.log(props)
    return(
        <a className='slideItem' href="details">
            <div className='slideItemImage'>
                <Image
                src={props.item.href}
                alt="Picture of the author"
               layout='fill'
                />
            </div>
            <p>{props.item.name}</p>
        </a>
    )
}


function Home(){
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
            {/* <Typography>Where2go.qa Comming Soon</Typography> */}
            <h5 className='font-weight-bolder h5 text-gray-500 mb-2'>Entertainment</h5>
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
                    entertainments.map((item,i) => <SwiperSlide key={i} item={item} ><SlideItem1 item={item}/></SwiperSlide>)
                }
               
            </Swiper>


            <h5 className='font-weight-bolder h5 text-gray-500 mb-2'>Music</h5>
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
                    entertainments.map((item,i) => <SwiperSlide key={i} item={item} ><SlideItem1 item={item}/></SwiperSlide>)
                }
               
            </Swiper>

        </Box>
       
        </>
        

    )
}

Home.getLayout = page => <HomeLayout>{page}</HomeLayout>

export default Home;