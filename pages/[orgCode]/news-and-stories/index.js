import React from 'react'
import NewsAndStoriesCarousel from '../../../src/components/new/NewsAndStoriesCarousel'
import Header from '../../../src/components/new/Header'
import Footer from '../../../src/components/new/Footer'
import data from './data.json'

const NewsAndStories = () => {
  return (
    <div style = {{fontFamily : "Inter"}}>
        <Header/>
        <div className='news-and-stories-page' style={{marginTop : '7rem'}}>
            <NewsAndStoriesCarousel data = {data}/>
        </div>
        <Footer/>
    </div>
  )
}

export default NewsAndStories