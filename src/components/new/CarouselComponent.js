import React from 'react'

const CarouselComponent = ({children}) => {
    
  return (
    <div>
        <div className='carousel-parent'>
            <div style={{width : '100vw' ,  overflow : 'hidden'}}>
        <div className='carousel-container'>
            {children}
        </div>
            </div>
        </div>
    </div>
  )
}

export default CarouselComponent