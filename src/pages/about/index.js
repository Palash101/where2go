import { useState, useEffect } from 'react'

import { userAuth } from 'context/userContext'
import Translations from 'utils/trans'

import Box from '@mui/material/Box'
import HomeLayout from 'src/@core/layouts/HomeLayout'

function About() {

  const userContext = userAuth()
  const locale = userContext.locale
  const t = Translations(locale)

  useEffect(async () => { }, [])

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
        }}
      >
        <div className="about-logo">
          <img src="/images/logos/logo.png" />
        </div>
        <div className="about-box">
          <h1>{`${t.experiences} ${t.evolved}`}</h1>
          <p>
            {t.aboutpera1}
          </p>
          <p>
            {t.aboutpera2}
          </p>
          <p>
            {t.aboutpera3}
          </p>
        </div>
      </Box>
    </>
  )
}

About.getLayout = (page) => <HomeLayout>{page}</HomeLayout>

export default About
