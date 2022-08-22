
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import HomeLayout from 'src/@core/layouts/HomeLayout'
import { useRouter } from 'next/router'
import moment from "moment";
import { getEventById } from 'service/admin/events'
import { useTheme } from '@mui/material';


function BookingsDetails(navigation) {
    const router = useRouter();
    const propDate = router.query.date;
    const [item, setItem] = useState({});
    const [itemNew, setItemNew] = useState({});
    const theme = useTheme()
    const [exist, setExist] = useState(false)
  
  
 
    useEffect(async() => {
        if (router.isReady) {
            


            getEventById(router.query.id).then((data) => {
              
                var arr = [];
                data.tickets.map(item2 => {
                    item2.qty = JSON.parse(item2.min_booking);
                    arr.push(item2)
                });
                data.tickets = arr;
                console.log(data,'booking')
                setItemNew(data)
                data.event_date.map(item1 => {
                    if (propDate === item1.date) {
                        setExist(true)
                    }
                });
               
            })
        }
    }, [router.isReady, navigation])

    console.log(exist)

    const handlePriceClick = () => {
        setPriceOpen(true)
    }

    return (
        <>
            <Box sx={{
                marginTop: '65px',
                left: 0,
                right: 0,
                background: `${theme.palette.background.default1}`,
                zIndex: 9,
                textAlign: 'center'
            }}>
                <Grid container spacing={4} justifyContent="center" sx={{}}>
                    <Grid item xs={12} md={6} sx={{}}>
                        <h3 className='detailHeading'>{item.event_name}</h3>
                    </Grid>
                   
                </Grid>
            </Box>

         
            <Box sx={{position: 'absolute',
                    zIndex: 9,
                    margin: '15px',
                    border: '3px solid #8d8d8d',
                    padding: '5px 21px',
                    borderRadius: '20px',
                    background: '#000',
                    fontSize: '14px'}} onClick={handlePriceClick}>
                Ticket Prices
            </Box>


        

        </>


    )
}

BookingsDetails.getLayout = page => <HomeLayout>{page}</HomeLayout>

export default BookingsDetails;