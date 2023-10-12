import React, { useState } from 'react'

const ImageGallery = ({schoolSrc}) => {
  return (
    <div className='image-gallery'>
        <img className='main-image' src= {schoolSrc} />
    </div>
  )
}

export default ImageGallery