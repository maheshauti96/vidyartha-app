import React, { useState } from 'react'

const ImageGallery = ({schoolSrc}) => {
    const [currImage , setCurrImage] = useState(0)
    const images = ['/new-assets/placeholder.png','/new-assets/books-donated-icon.svg','/new-assets/placeholder.png','/new-assets/placeholder.png','/new-assets/placeholder.png']
    console.log(currImage)
  return (
    <div className='image-gallery'>
        <img className='main-image' src= {images[currImage]} />
        <div className='image-options'>
        {
            images.map((src , index) => (
                <img key={src + "" + index} onClick={() => setCurrImage(index)} src={src} />
            ))
        }
        </div>
    </div>
  )
}

export default ImageGallery