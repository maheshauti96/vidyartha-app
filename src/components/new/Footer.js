import { TextareaAutosize } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Form from '../Form'

const Footer = ({ orgCode }) => {
    const [href, setHref] = useState(null);
    const orgPath = orgCode || '';
    useEffect(() => {
        setHref(window.location.href);
    }, [])
  return (
    <footer className='footer'>
        <div className='footer-details'>
            <span className='logo'>
                <img src='/new-assets/vidyartha-white.svg' />
                <p className='logo-title'>Vidyartha</p>
            </span>
            <div className='links' >
                <a href={`/${orgPath}/returnpolicy`}>Return Policy</a>
                <a href={`/${orgPath}/terms`}>Terms and Conditions</a>
                <a href={`/${orgPath}/Shippingpolicy`}>Shipping Policy</a>
                <a href={`/${orgPath}/aboutus`}>About us</a>
                <a href={`/${orgPath}/privacypolicy`}>Privacy Policy</a>
            </div>
            <div className='socials' >
            <a href={`whatsapp://send?text=Help me to Support this campaign ${href}`} data-action="share/whatsapp/share">
                <img src='/whatsapp.png' />
            </a>
            <a href={`instagram://send?text=Help me to Support this campaign ${href}`}
                                data-action="share/instagram/share">
                                    <img src="/instagram.png" alt="instagram" />
                                </a>                                

                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${href}`} rel="noopener noreferrer" target="_blank">
                                    <img src="/facebook.png" alt="facebook" />
                                </a>
            </div>
        </div>
        <div className='contact-us'>
            <h4 className='title'>Contact Us</h4>
            <Form/>
        </div>
    </footer>
  )
}

export default Footer