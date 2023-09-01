import React from 'react'
import DonationTimeline from './DonationTimeline'

const DonationSteps = () => {
  return (
    <div className='donation-steps'>
      <h3 className='section-title'>Donate in four simple steps</h3>
      <div className='donation-steps-container'>
      <DonationTimeline/>
      <div className='mobile-image' >
        <img src='./phone.png' />
      </div>
      </div>
    </div>
  )
}

export default DonationSteps