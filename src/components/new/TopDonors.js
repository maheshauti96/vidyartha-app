import { EmojiEventsOutlined } from '@material-ui/icons'
import React, { useState } from 'react'

const TopDonors = () => {
    const [donors  ,setDonors] = useState({num : 2 , clicked : false})
    console.log(donors)
    const donorsList = [1,2,3,4,5,6,7]
  return (
    <div className='top-donors'>
        <h3 className='title'><EmojiEventsOutlined />Top Donors</h3>
        <div className='donors-list'>{
            donorsList.map((val , index) => ( index < donors.num ?   (
                <div className='donors'>
                    <img className='donor-img' src='/new-assets/testimonial-user.jpeg' /> 
                    <div>
                        <p className='amount'>Rs. 1200</p>
                        <p className='user'> By Lorem Ipsum</p>
                    </div>
                </div>
            ) : null ))
        }</div>

        <button className='view-all' onClick={() => {setDonors(prev => {
            if(prev.num === 2) {
                return { num : donorsList.length , clicked : true}
            }

            else {
                return { num : 2 , clicked : false}
            }
        })}}>View {donors.clicked ? "less" : "more"}</button>
    </div>
  )
}

export default TopDonors