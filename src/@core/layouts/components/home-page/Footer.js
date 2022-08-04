import * as React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Translations from 'utils/trans';
import { userAuth } from 'context/userContext';


 function Footer() {
  const router = useRouter();

  const userContext = userAuth()
  const locale = userContext.locale
  const t =  Translations(locale)

  useEffect(() => {
    
  },[router])

  return (
    <>
      <div className='footer'>
        <p>{t.copyright} © 2022. {t.allRightReserved}</p>
    </div>
    <div className='mobile-footer'>
      <ul>
        <li className={router.pathname === '/' ? 'active' : ''} onClick={() => router.push('/')}>
          <StarBorderIcon></StarBorderIcon>
          <p>Featured</p>
        </li>
        <li className={router.pathname === '/browse' ? 'active' : ''} onClick={() => router.push('/browse')}>
          <ContentPasteSearchIcon></ContentPasteSearchIcon>
          <p>Events</p>
        </li>
        <li className={router.pathname === '/my-tickets' ? 'active' : ''} onClick={() => router.push('/my-tickets')}>
          <LocalActivityIcon></LocalActivityIcon>
          <p>My Tickets</p>
        </li>
      </ul>
    </div>
    </>
  
  );
}

export default Footer;