import React from "react";
import Slider from "react-slick";
import "./style.css";

import img1 from "../../assets/slider/slider1.jpg";
import img2 from "../../assets/slider/slider2.jpg";
import img3 from "../../assets/slider/slider3.jpg";

function ImageSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div><img src={img1} alt="slide1" /></div>
        <div><img src={img2} alt="slide2" /></div>
        <div><img src={img3} alt="slide3" /></div>
      </Slider>
    </div>
  );
}

export default ImageSlider;
