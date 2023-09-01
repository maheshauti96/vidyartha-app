import React from 'react'

import { Box, LinearProgress, TextField } from '@material-ui/core'
import Header from '../../src/components/new/Header'
import Link from 'next/link'

const Fundraisers = () => {
    let carouselList = [1,2,3,4,5,6,7,8,9,]
  return (
    <div style={{fontFamily  :"Inter"}}>
        <Header/>
        <div className='fundraisers-page' style={{marginTop : '7rem'}}>
            <h1>Help us to donate books to your school library</h1>
            <form className='donate-form'>
                <TextField className='text-field' label='Find your city' fullWidth variant='outlined' />
                <TextField className='text-field' label='Find your school' fullWidth variant='outlined' />
                <button>Donate</button>
            </form>
            
            <div className='fundraiser-grid'>
            {
                carouselList.map((el , index) => (
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
                        <Link href = {'/new-funds-page/' + index}><button className='donate-btn'>Donate</button></Link>
                    </div>
                ))
            }
            </div>
        </div>
    </div>
  )
}

export default Fundraisers