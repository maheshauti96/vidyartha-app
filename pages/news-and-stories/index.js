import React from 'react'
import NewsAndStoriesCarousel from '../../src/components/new/NewsAndStoriesCarousel'
import Header from '../../src/components/new/Header'
import Footer from '../../src/components/new/Footer'

const NewsAndStories = () => {
  return (
    <div style = {{fontFamily : "Inter"}}>
        <Header/>
        <div className='news-and-stories-page' style={{marginTop : '7rem'}}>
            <NewsAndStoriesCarousel/>
        </div>
        <Footer/>
    </div>
  )
}

export default NewsAndStories