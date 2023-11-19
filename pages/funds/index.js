import React from 'react'

import { Box, LinearProgress, TextField } from '@material-ui/core'
import Header from '../../src/components/new/Header'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LandingPageForm from '../../src/components/new/LandingPageForm'
import FundraiserComponent from '../../src/components/new/FundraiserCarousel'
import Footer from '../../src/components/new/Footer'
const Fundraisers = () => {
    let carouselList = [1,2,3,4,5,6,7,8,9,]
    const router = useRouter()
  return (
    <div style={{fontFamily  :"Inter"}}>
        <Header/>
        <div className='fundraisers-page' style={{marginTop : '7rem'}}>
            <LandingPageForm/>
            <FundraiserComponent/>
            
        </div>
        <Footer/>
    </div>
  )
}

export default Fundraisers