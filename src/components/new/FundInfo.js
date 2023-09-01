import React, { useState } from 'react'
import { Box , Input, LinearProgress, TextField } from '@material-ui/core'

const FundInfo = ({ schoolInfo ,raisedAmount , requiredAmount , progress}) => {
    const [amount , setAmount] = useState()
    return (
        <div className='fund-info'>
            <div className='fund-title new-classname-for-funds' >
                <h1 style={{textAlign : 'center'}} className='fund-name'>India International School</h1>
                <div className='fund-links' >
                    <a><img src='/new-assets/share-icon.svg' /></a>
                    <a><img src='/whatsapp.png' /></a>
                    <a><img src='/facebook.png' /></a>
                    <a><img src='/instagram.png' /></a>
                </div>
                
            </div>
            <p className='address' >West Delhi , India</p>
            <div className='progress-container'>
            <div className='fund-progress'>
                <p>Rs. {7000} raised out of Rs. {10000}</p>
                <Box sx={{ width: '80%' }} >
                    <LinearProgress style={{ height: '12px', borderRadius: '6px', backgroundColor: '#fff', outline: '1px solid black' }} variant="determinate" value={70} />
                </Box>
            </div>
            <div className='fund-progress'>
                <p>Books worth Rs. 3000 have been sent</p>
                <Box sx={{ width: '80%' }} >
                    <LinearProgress style={{ height: '12px', borderRadius: '6px', backgroundColor: '#fff', outline: '1px solid black' }} variant="determinate" value={30} />
                </Box>
            </div>
            </div>
            <form className='donate-form'>
                <TextField fullWidth variant='outlined' label = "Name" required />
                <TextField fullWidth variant='outlined' label = "Email" required />
                <div className='amount-options'>
                    <span onClick={() => {setAmount(1000)}}>Rs. 1000</span>
                    <span onClick={() => {setAmount(1500)}}>Rs. 1500</span>
                    <span onClick={() => {setAmount(2000)}}>Rs. 2000</span>
                </div>
                <TextField variant='outlined' label = "Amount" fullWidth  onChange={e => {setAmount(e.target.value)}} required type='number' />
                <button type='submit'>Donate</button>
            </form>
        </div>
    )
}

export default FundInfo