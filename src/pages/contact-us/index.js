
import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import HomeLayout from 'src/@core/layouts/HomeLayout'
import Grid from '@mui/material/Grid';
import Link from 'next/link';

function ContactUs() {
    useEffect(async () => {

    }, [])

    return (
        <>
             <Box sx={{
            marginRight: '5rem',
            marginLeft: '5rem',
            marginTop: '200px',
            marginBottom: '100px',
            maxWidth: 1180,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '20px',
            background: '#40bed2',
            borderRadius: '14px',
            fontSize: '14px',
        }}>
            <Grid container spacing={5} sx={{}}>
                <Grid item xs={12} md={3} sx={{}}>
                    <img src='/images/contact.jpeg' style={{width: '100%'}}/>
                </Grid>
                <Grid item xs={12} md={9} sx={{}}>
                    <div className='contact-content'>
                        <h3>Get in touch</h3>
                        <p>If you have any questions, comments or suggestions you would like to share, email us at <Link href='mailto:support@where2go.com'>support@where2go.com</Link></p>
                    </div>
                </Grid>
            </Grid>

        </Box>

        </>



    )
}

ContactUs.getLayout = page => <HomeLayout>{page}</HomeLayout>

export default ContactUs;
