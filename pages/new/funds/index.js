import React from 'react'

import { Box, LinearProgress, TextField } from '@material-ui/core'
import Header from '../../../src/components/new/Header'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LandingPageForm from '../../../src/components/new/LandingPageForm'
import FundraiserComponent from '../../../src/components/new/FundraiserCarousel'
import Footer from '../../../src/components/new/Footer'
const Fundraisers = () => {
    let carouselList = [1,2,3,4,5,6,7,8,9,]
    const router = useRouter()
    async function getResultsForCampaigns(){
      try {
        let response = await fetch('https://shastradaan.ap-south-1.elasticbeanstalk.com/shastradaan/place/?offset=10&paged=true&pageNumber=2 &pageSize=15&sort.sorted=true')
        let data = await response.json()
        console.log(data)
      }catch(err){
        console.log(err)
      }
    }
  return (
    <div style={{fontFamily  :"Inter"}}>
        <Header/>
        <div className='fundraisers-page' style={{marginTop : '7rem'}}>
            <button onClick={getResultsForCampaigns}>CHECK RESULTS</button>
            <LandingPageForm/>
            <FundraiserComponent/>
            
        </div>
        <Footer/>
    </div>
  )
}

export default Fundraisers