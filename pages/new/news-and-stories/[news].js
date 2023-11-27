import { useRouter } from 'next/router'
import React from 'react'
import Header from '../../../src/components/new/Header'
import { ArrowBack, ArrowLeft } from '@material-ui/icons'
import Link from 'next/link'
import Footer from '../../../src/components/new/Footer'

const News = () => {
    const router = useRouter()
    const {news} = router.query
    const text = `
    Lorem ipsum dolor sit amet. Ut enim debitis sit porro quos aut delectus dolorem aut consequatur sapiente ut soluta libero. Rem enim vitae qui vero velit qui Lorem ipsum dolor sit amet. Ut enim debitis sit porro quos aut delectus dolorem aut consequatur sapiente ut soluta libero. Rem enim vitae qui vero velit qui Lorem ipsum dolor sit amet. Ut enim debitis sit porro quos aut delectus dolorem aut consequatur sapiente ut soluta libero. Rem enim vitae qui vero velit qui Lorem ipsum dolor sit amet. Ut enim debitis sit porro quos aut delectus dolorem aut 
    Lorem ipsum dolor sit amet. Ut enim debitis sit porro quos aut delectus dolorem aut consequatur sapiente ut soluta libero. Rem enim vitae qui vero velit qui Lorem ipsum dolor sit amet. Ut enim debitis sit porro quos aut delectus dolorem aut consequatur sapiente ut soluta libero. Rem enim vitae qui vero velit qui Lorem ipsum dolor sit amet. Ut enim debitis sit porro quos aut delectus dolorem aut consequatur sapiente ut soluta libero. Rem enim vitae qui vero velit qui Lorem ipsum dolor sit amet. Ut enim debitis sit porro quos aut delectus dolorem aut 
    Lorem ipsum dolor sit amet. Ut enim debitis sit porro quos aut delectus dolorem aut consequatur sapiente ut soluta libero. Rem enim vitae qui vero velit qui Lorem ipsum dolor sit amet. Ut enim debitis sit porro quos aut delectus dolorem aut consequatur sapiente ut soluta libero. Rem enim vitae qui vero velit qui Lorem ipsum dolor sit amet. Ut enim debitis sit porro quos aut delectus dolorem aut consequatur sapiente ut soluta libero. Rem enim vitae qui vero velit qui Lorem ipsum dolor sit amet. Ut enim debitis sit porro quos aut delectus dolorem aut 
    `
  return (
    <div style = {{fontFamily : "Inter"}}>
            <Header/>
        <div className='news-story-item' style={{marginTop : '7rem'}}>
            <Link href= '/news-and-stories' ><ArrowBack/></Link>
            <div className='news-story'>
                <h1>Lorem Ipsum : {news}</h1>
                <img src='/PVG_School.jpg' />
                <p className='news-text'>
                    {text}
                </p>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default News