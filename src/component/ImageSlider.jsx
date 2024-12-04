import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

import sliderImage1 from '../Images/silderimages1.jpg';
import sliderImage2 from '../Images/silderimages2.jpg';
import sliderImage3 from '../Images/silderimages3.jpg';
import sliderImage4 from '../Images/silderimages4.jpg';
import sliderImage5 from '../Images/silderimages5.jpg';
import sliderImage6 from '../Images/silderimages6.jpg';

const Arrow = styled.div`
  cursor: pointer;
  font-size: 24px;
  color: white;
  z-index: 100;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const RightArrow = styled(Arrow)`
  right: 10px;
`;

const LeftArrow = styled(Arrow)`
  left: 10px;
`;

const ImageSlider = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <RightArrow></RightArrow>,
    prevArrow: <LeftArrow></LeftArrow>,
  };

  return (
    <Slider {...settings} className="mx-auto w-8/12 rounded-lg shadow-lg">
      <div className="hover:scale-105 transition-transform flex rounded-lg justify-center items-center h-96 overflow-hidden"> {/* Fixed height */}
        <img src={sliderImage1} alt="Slide 1" className="w-full h-full object-cover" /> {/* Ensure it fills the container */}
      </div>
      <div className="hover:scale-105 transition-transform flex justify-center rounded-lg items-center h-96 overflow-hidden">
        <img src={sliderImage2} alt="Slide 2" className="w-full h-full object-cover" />
      </div>
      <div className="hover:scale-105 transition-transform flex justify-center rounded-lg items-center h-96 overflow-hidden">
        <img src={sliderImage3} alt="Slide 3" className="w-full h-full object-cover" />
      </div>
      <div className="hover:scale-105 transition-transform flex justify-center rounded-lg items-center h-96 overflow-hidden">
        <img src={sliderImage4} alt="Slide 4" className="w-full h-full object-cover" />
      </div>
      <div className="hover:scale-105 transition-transform flex justify-center  rounded-lg items-center h-96 overflow-hidden">
        <img src={sliderImage5} alt="Slide 5" className="w-full h-full object-cover" />
      </div>
      <div className="hover:scale-105 transition-transform flex justify-center rounded-lg items-center h-96 overflow-hidden">
        <img src={sliderImage6} alt="Slide 6" className="w-full h-full object-cover" />
      </div>
    </Slider>
  );
};

export default ImageSlider;
