import React from 'react'
import CarouselComponent from './CarouselComponent'

const TestimonialCarousel = () => {
    let carouselList = [{val : 1, stars : 3},{val : 2, stars : 4},{val : 3, stars : 1},{val : 4, stars : 2},{val : 5, stars : 5}]
    
  return (
    <div className = 'testimonial-component' >
        <h3 className='section-title'>Testimonials</h3>
        <CarouselComponent>
            {carouselList.map( ({val , stars} , index) => (
                <div key= {index} className='testimonial-item'> 
                    <div className='user-info'>
                        <img className='user-icon' src='./new-assets/testimonial-user.jpeg' />
                        <div className='user-desc'>
                            <p className='user-name' >Lorem Ipsum</p>
                            <p className='user-position'>Principal of City international school</p>
                            <div>
                                {
                                    [0,1,2,3,4].map((index) => {
                                        if(index <= stars-1){
                                            return <img src='./new-assets/filled-star.svg' />
                                        } else {
                                            return <img src='./new-assets/empty-star.svg' />
                                        }

                                    })
                                }
                            </div>
                        </div>
                        
                    </div>
                    <div className='testimonial-content'>
                            <h4 className='test-title'>It was a great experience!!</h4>
                            <p className='test-para'>
                            Lorem ipsum dolor sit amet. Ut enim debitis sit porro quos aut delectus dolorem aut consequatur sapiente ut soluta libero. Rem enim vitae qui vero velit qui accusamus temporibus. Ut nisi voluptas et dolores per

                            Lorem ipsum dolor sit amet. Ut enim debitis sit porro quos aut delectus dolorem aut consequatur sapiente ut soluta libero. Rem enim vitae qui
                            </p>
                        </div>
                </div>
            ))}
        </CarouselComponent>
    </div>
  )
}

export default TestimonialCarousel