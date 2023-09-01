import React from 'react'
import Header from '../../src/components/new/Header'
import Footer from '../../src/components/new/Footer'
import ImageGallery from '../../src/components/new/ImageGallery'
import FundInfo from '../../src/components/new/FundInfo'
import CommentsAndFAQs from '../../src/components/new/commentsandfaq/CommentsAndFAQs'
import TopDonors from '../../src/components/new/TopDonors'
import { TextField } from '@material-ui/core'

const FundsPage = () => {
  return (
    <div style={{fontFamily : 'Inter'}}>
        <Header/>
        <div className='section-1'>
        <ImageGallery/>
        <FundInfo/>
        </div>
        <div className='section-2' >
          <CommentsAndFAQs/>
          <TopDonors/>
        </div>
        <Footer/>
    </div>
  )
}

export default FundsPage