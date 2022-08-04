
import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import HomeLayout from 'src/@core/layouts/HomeLayout'


function Terms() {
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
                <div className='para-text'>
                    <h3>Terms of Use</h3>
                    <p>This Terms of use has been compiled to better serve those who are concerned with how their 'Personally Identifiable Information' (PII) is being used online. PII, as described in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.
                    </p>
                    <p>What personal information do we collect from the people that visit our blog, website or app?
                    </p>

                    <p>When do we collect information?
                    </p>
                    <p>
                        We collect information from you when you register on our site, place an order, subscribe to a newsletter, fill out a form, Open a Support Ticket or enter information on our site.
                    </p>
                    <p>
                        How do we use your information?
                    </p>
                    <p>
                        We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:
                    </p>
                    <ul>
                        <li>
                            To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.
                        </li>
                        <li>
                            To administer a contest, promotion, survey or other site feature.
                        </li>
                        <li>
                            To quickly process your transactions.
                        </li>
                        <li>
                            To ask for ratings and reviews of services or products
                        </li>
                    </ul>
                    <p>
                        To follow up with them after correspondence (live chat, email or phone inquiries)
                    </p>
                    <p>How do we protect your information?
                    </p>
                    <p>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible.
                    </p>
                    <p>
                        We use regular Malware Scanning.
                    </p>
                    <p>
                        Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.
                    </p>

                    <p>Contacting Us</p>
                    <p>If there are any questions regarding this privacy policy, you may contact us using the information below.
                    </p>
                    <p>13th floor, Mazaya Tower 1, Khalid ibn Alwaleed Street
                    </p>
                    <p>Sharq,</p>
                    <p>Kuwait</p>
                    <p>info@eventat.com</p>
                    <p>+965 22050004</p>

                    <p>Last Edited on 2017-01-08</p>
                </div>
            </Box>

        </>



    )
}

Terms.getLayout = page => <HomeLayout>{page}</HomeLayout>

export default Terms;
