import { Box, LinearProgress, Slide, Slider ,linearProgressClasses } from '@material-ui/core'
import React, { useState } from 'react'
import styled from '@material-ui/core'
import CarouselComponent from './CarouselComponent'

const FundraiserComponent = () => {
    let carouselList = [1,2,3,4,5,6,7,8,9,]

      

  return (
    <div className='fundraiser-component' >
        <h3 className='section-title'>Current Fundaraisers</h3>
        <CarouselComponent>
        {
                carouselList.map((el) => (
                    <div className='fundraiser-carousel-item'>
                        <div className='images'>
                            <img className='main-img' src='./new-assets/placeholder.png' />
                            <div className='other-img'>
                                <img src='./new-assets/placeholder.png' />
                                <img src='./new-assets/placeholder.png' />
                                <img src='./new-assets/placeholder.png' />
                            </div>
                        </div>
                        <div style = {{width : '80%'}}>
                        <h3 className='name'>Lorem Ipsum {el}</h3>
                        <p className='address'>Address</p>
                        </div>
                        <div className='progress' style = {{width : '80%'}}>
                            <div>
                                <p>Rs. xxxxx out of Rs. xxxxx</p>
                                <Box sx={{ width: '80%' }} >
                                    <LinearProgress style={{height : '12px' , borderRadius : '6px' , backgroundColor : '#fff' , outline : '1px solid black'}} variant="determinate" value={70} />
                                </Box>
                            </div>
                            <div>
                                <p>Books worth Rs. 3000 have been sent</p>
                                <Box sx={{ width: '80%' }} >
                                    <LinearProgress style={{height : '12px' , borderRadius : '6px' , backgroundColor : '#fff' , outline : '1px solid black'}} variant="determinate" value={70} />
                                </Box>
                            </div>
                        </div>
                        <button className='donate-btn'>Donate</button>
                    </div>
                ))
            }
        </CarouselComponent>
    </div>
  )
}

export default FundraiserComponent