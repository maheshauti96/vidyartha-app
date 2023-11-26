import { TextareaAutosize } from '@material-ui/core'
import React from 'react'
import Form from '../Form'

const Footer = () => {
  return (
    <footer className='footer'>
        <div className='footer-details'>
            <span className='logo'>
                <img src='/new-assets/vidyartha-white.svg' />
                <p className='logo-title'>Vidyartha</p>
            </span>
            <div className='links' >
                <a href='/new-landing-page'>Return Policy</a>
                <a href='/new-landing-page'>Terms and Conditions</a>
                <a href='/new-landing-page'>Shipping Policy</a>
                <a href='/new-landing-page'>About us</a>
                <a href='/new-landing-page'>Privacy Policy</a>
            </div>
            <div className='socials' >
            <a href='/new-landing-page'>
                <img src='/whatsapp.png' />
            </a>
            <a href='/new-landing-page'>
                <img src='/facebook.png' />
            </a>
            <a href='/new-landing-page'>
                <img src='/instagram.png' />
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