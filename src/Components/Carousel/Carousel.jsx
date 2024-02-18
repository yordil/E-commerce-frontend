import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import {img} from './data'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import classes from './Carousel.module.css'
const CarouselEffect = () => {
  return (
		<>
			<Carousel
				autoPlay={true}
				infiniteLoop={true}
				showThumbs={false}
				showIndicators={false}
			>
				{img.map((image, index) => (
					<div key={index}>
						<img src={image} alt="carousel" />
					</div>
				))}
			</Carousel>
			<div className={classes.hero_img}></div>
		</>
	);
}

export default CarouselEffect
