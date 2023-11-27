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
                <a href='/returnpolicy'>Return Policy</a>
                <a href='/terms'>Terms and Conditions</a>
                <a href='/Shippingpolicy'>Shipping Policy</a>
                <a href='/aboutus'>About us</a>
                <a href='/privacypolicy'>Privacy Policy</a>
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