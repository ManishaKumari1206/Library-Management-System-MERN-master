import React from 'react'
import './Footer.css'

import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TelegramIcon from '@material-ui/icons/Telegram';
import InstagramIcon from '@material-ui/icons/Instagram';

function Footer() {
    return (
        <div className='footer'>
            <div>
                <div className='footer-data'>
                    {/* UPDATED CLASS NAME: CONTACT-DETAIL */}
                    <div className="CONTACT-DETAIL">
                        <h1>Contact Us</h1>
                        <p>Librarian</p>
                        <p>Government School</p>
                        <p>Visakhapatnam-530041</p>
                        <p>Andhra Pradesh</p>
                        <p>India</p>
                        <p><b>Email:</b>manisha123@gmail.com</p>
                    </div>
                    {/* UPDATED CLASS NAME: LIBRARY-DETAIL */}
                    <div className='LIBRARY-DETAIL'>
                        <h1>Librarian</h1>
                        <p>LIBRARY EBOOK</p>
                        <p>Education</p>
                        <p>Contact: +91 7676768787</p>
                    </div>
                </div>
                <div className="contact-social" >
                    {/* Twitter Blue: #1DA1F2 or rgb(29, 161, 242) */}
                    <a href='#home' className='social-icon'>
                        <TwitterIcon style={{ fontSize: 40, color: "#1DA1F2" }} />
                    </a>

                    {/* LinkedIn Blue: #0077B5 or rgb(0, 119, 181) */}
                    <a href='#home' className='social-icon'>
                        <LinkedInIcon style={{ fontSize: 40, color: "#0077B5" }} />
                    </a>

                    {/* Telegram Blue: #0088CC or rgb(0, 136, 204) */}
                    <a href='#home' className='social-icon'>
                        <TelegramIcon style={{ fontSize: 40, color: "#0088CC" }} />
                    </a>

                    {/* Instagram uses a gradient, but a common representative color is Purple/Pink: #E4405F or rgb(228, 64, 95) */}
                    <a href='#home' className='social-icon'>
                        <InstagramIcon style={{ fontSize: 40, color: "#E4405F" }} />
                    </a>
                </div>
            </div>
            <div className='copyright-details'>
                <p className='footer-copyright'>&#169; 2025 copyright all right reserved<br /><span>Designed By Manisha Kumari</span></p>
            </div>
        </div>
    )
}

export default Footer