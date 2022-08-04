import * as React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

 function Footer() {
  const router = useRouter();

  useEffect(() => {
    
  },[router])

  return (
    <>
      <div className='footer'>
        <p>Copyright © 2022. All Rights Reserved.</p>
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