import { TextareaAutosize } from '@material-ui/core'
import React from 'react'

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
            <h3 className='title' >Contact Us</h3>
            <form className='contact-us-form' >
                <input name='name' type='text' placeholder='Name' />
                <input name='email' type= 'email'  placeholder='Email' />
                <TextareaAutosize placeholder='Message' variant="outlined" size="lg" minRows={4}/>
                <button>Submit</button>
            </form>
        </div>
    </footer>
  )
}

export default Footer