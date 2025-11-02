import React from 'react'
import './ImageSlider.css'
import { Carousel } from 'react-bootstrap'

function ImageSlider() {
    return (
        <div className='slider'>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="https://cdn.pixabay.com/photo/2018/07/11/16/53/book-3531412_1280.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Start Your Reading Journey</h3>
                        <p>Discover a world of stories, knowledge, and adventure waiting inside every book.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src="https://cdn.pixabay.com/photo/2016/08/31/09/06/silhouette-1632912_1280.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Discover New Ideas</h3>
                        <p>Dive into diverse topics and find inspiration within our extensive library resources.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://cdn.pixabay.com/photo/2017/04/23/11/03/books-2253569_1280.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Knowledge at Your Fingertips</h3>
                        <p>Access a wealth of information and endless learning opportunities.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default ImageSlider
