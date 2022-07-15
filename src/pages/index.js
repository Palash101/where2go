
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Image from 'next/image'

import HomeLayout from 'src/@core/layouts/HomeLayout'


function Item(props)
{
    console.log(props)
    return (
            <Image
            src={props.item.href}
            alt="Picture of the author"
            width={1140}
            height={400}
            />
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
    return(
        <>
        <Box
        sx={{
            marginRight:'5rem',
            marginLeft:'5rem',
            marginTop:'2rem'
        }}>
             <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
            </Carousel>
            <Typography>Where2go.qa Comming Soon</Typography>

        </Box>
        </>
        

    )
}

Home.getLayout = page => <HomeLayout>{page}</HomeLayout>

export default Home;