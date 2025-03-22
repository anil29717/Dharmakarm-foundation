import { useCallback, useMemo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import all images at once
const sliderImages = [
  { src: '/Images/sliderimages1.jpg', alt: 'Slide 1' },
  { src: '/Images/silderimages2.jpg', alt: 'Slide 2' },
  { src: '/Images/silderimages3.jpg', alt: 'Slide 3' },
  { src: '/Images/silderimages4.jpg', alt: 'Slide 4' },
  { src: '/Images/silderimages5.jpg', alt: 'Slide 5' },
  { src: '/Images/silderimages6.jpg', alt: 'Slide 6' },
];

const ImageSlider = () => {
  // Custom arrow components using lucide icons
  const NextArrow = useCallback(({ onClick }) => (
    <button 
      onClick={onClick} 
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all"
      aria-label="Next slide"
    >
      <ChevronRight size={24} color="white" />
    </button>
  ), []);

  const PrevArrow = useCallback(({ onClick }) => (
    <button 
      onClick={onClick} 
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all"
      aria-label="Previous slide"
    >
      <ChevronLeft size={24} color="white" />
    </button>
  ), []);

  // Memoize settings to prevent unnecessary re-renders
  const settings = useMemo(() => ({
    autoplay: true,
    autoplaySpeed: 3000, // Slowed down from 1000ms to 3000ms for better user experience
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    lazyLoad: 'ondemand', // Add lazy loading
    fade: true, // Smoother transitions
    pauseOnHover: true,
  }), [NextArrow, PrevArrow]);

  // Use component to render each slide to avoid repetitive code
  const renderSlide = useCallback((image, index) => (
    <div key={index} className="rounded-lg overflow-hidden h-96">
      <div className="h-full w-full group relative">
        <img 
          src={image.src} 
          alt={image.alt} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      </div>
    </div>
  ), []);

  return (
    <div className="mx-auto w-8/12 rounded-lg shadow-lg overflow-hidden">
      <Slider {...settings}>
        {sliderImages.map(renderSlide)}
      </Slider>
    </div>
  );
};

export default ImageSlider;