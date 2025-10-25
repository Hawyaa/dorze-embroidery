import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carousel.module.css";

function CarouselEffect() {
  return (
    <div className={classes.carouselContainer}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
        dynamicHeight={false}
        stopOnHover={false}
        interval={3000}
      >
        {img.map((imageItemLink, index) => {
          return (
            <img
              key={index}
              src={imageItemLink}
              alt="carousel"
              className={classes.carouselImage}
            />
          );
        })}
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  );
}

export default CarouselEffect;
