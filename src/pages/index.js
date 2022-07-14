
import Typography from '@mui/material/Typography'
import HomeLayout from 'src/@core/layouts/HomeLayout'


function Home(){
    return(
        <>
        <Typography>Where2go.qa Comming Soon</Typography>
        </>
        

    )
}

Home.getLayout = page => <HomeLayout>{page}</HomeLayout>

export default Home;