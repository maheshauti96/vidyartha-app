import React from 'react'
import Header from '../src/components/new/Header'
import LandingPageForm from '../src/components/new/LandingPageForm'
import Analytics from '../src/components/new/Analytics'
import FundraiserComponent from '../src/components/new/FundraiserCarousel'
import DonationSteps from '../src/components/new/DonationSteps'
import CarouselComponent from '../src/components/new/CarouselComponent'
import NewsAndStoriesCarousel from '../src/components/new/NewsAndStoriesCarousel'
import TestimonialCarousel from '../src/components/new/TestimonialCarousel'
import FAQ from '../src/components/new/FAQ'
import Footer from '../src/components/new/Footer'

const newLandingPage = () => {
  return (
    <div style = {{fontFamily : 'Inter' , width : '100vw'}}>
      <div>
      <Header/>
      </div>
        <img className='landingpage-banner-image' src = '/header-image.svg' />
        <LandingPageForm/>
        <Analytics/>
        <FundraiserComponent/>
        <DonationSteps/>
        <NewsAndStoriesCarousel/>
        <TestimonialCarousel/>
        <FAQ/>

        <Footer/>
    </div>
  )
}

export default newLandingPage