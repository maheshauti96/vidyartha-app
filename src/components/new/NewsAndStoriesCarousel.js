import React from 'react'
import CarouselComponent from './CarouselComponent'
import Link from 'next/link'

const NewsAndStoriesCarousel = () => {
    let carouselList = [1,2,3,4,5,6,7,8,9,]
  return (
    <div className='news-and-stories'>
        <h3 className='section-title'>News And Stories</h3>
        <CarouselComponent>
        {
                carouselList.map((el , index) => (
                    <div key={el} className='news-carousel-item'>
                            <img className='main-img' src='/new-assets/placeholder.png' />
                        <div style = {{width : '80%'}}>
                        <h3 className='name'>Lorem Ipsum {el}</h3>
                        <p>
                        Lorem ipsum dolor sit amet. Ut enim debitis sit porro quos aut delectus dolorem aut consequatur sapiente ut soluta libero. Rem enim vitae qui vero velit qui .....
                        </p>
                        </div>
                        <Link href={'/new/news-and-stories/' + index} ><div className='read-more-btn' >Read more</div></Link>
                    </div>
                ))
            }
        </CarouselComponent>
    </div>
  )
}

export default NewsAndStoriesCarousel