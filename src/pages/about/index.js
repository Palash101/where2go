
import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import HomeLayout from 'src/@core/layouts/HomeLayout'


function About() {
    useEffect(async () => {

    }, [])

    return (
        <>
            <Box
                sx={{
                    marginRight: '5rem',
                    marginLeft: '5rem',
                    marginTop: '90px',
                    maxWidth: 1180,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                }}>
                <div className='about-logo'>
                    <img src="/images/logos/logo.png" />
                </div>
                <div className='about-box'>
                    <h1>Experiences Evolved</h1>
                    <p>We believe technology has become an essential element of the modern age. Tech solutions, like mobile apps and online platforms, are now integrated within all fields, and thanks to them, our everyday lives are now less complex and more efficient.</p>
                    <p>Kuwait has a unique social aspect; events, shows, and intellectual forums are held all year-round. These events witness tremendous participation of people from all parts of the country. Throughout the past years, we organized a great number of events and shows, and we noticed something missing. The traditional process of buying tickets and admitting attendees was always unorganized, resulted in long lines, and almost always ended with late admitting. Customers were unhappy.</p>
                    <p>This is where the idea behind Eventat was born. Our creative team worked hard to overcome this challenge and utilize modern technology to come up with an easy and fast solution for booking tickets and admitting attendees with the least amount of time and effort. Our web platform and mobile app are filled with innovative features that we specially designed with event organizers in mind, including seat selection, e-tickets generation, safe online payment, easy e-admitting solutions, and much more. Today, Eventat is Kuwait's leading online platform for e-ticketing and event management solutions.</p>
                </div>
            </Box>

        </>



    )
}

About.getLayout = page => <HomeLayout>{page}</HomeLayout>

export default About;
