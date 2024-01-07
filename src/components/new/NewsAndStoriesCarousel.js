import React from 'react'
import CarouselComponent from './CarouselComponent'
import Link from 'next/link'

const NewsAndStoriesCarousel = ({data}) => {
    console.log(Object.keys(data))
  return (
    <div className='news-and-stories'>
        <h3 className='section-title'>News And Stories</h3>
        <CarouselComponent>
        {
                Object.keys(data).map((title , index) => (
                    <div key={title} className='news-carousel-item'>
                            <img width='320px' height='180px' className='main-img' src={`/news-and-stories-images/${title}/${data[title].images[0]}`} />
                        <div style = {{width : '80%'}}>
                        <h3 className='name'>{data[title].name}</h3>
                        
                        </div>
                        <Link href={'/news-and-stories/' + title} ><div className='read-more-btn' >Read more</div></Link>
                    </div>
                ))
            }
        </CarouselComponent>
    </div>
  )
}

export default NewsAndStoriesCarousel