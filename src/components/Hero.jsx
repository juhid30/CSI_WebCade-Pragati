// import React, { useState } from 'react';
// import Slider from 'react-slick';

// const Hero = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const images = [
//     'img1.jpg',
//     'img2.jpg',
//     // Add more image URLs here
//   ];

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//     afterChange: (currentSlide) => setCurrentSlide(currentSlide),
//   };

//   const handleSlideChange = (currentSlide) => {
//     setCurrentSlide(currentSlide);
//   };

//   return (
//     <div className="hero-container">
//       <Slider {...sliderSettings} afterChange={handleSlideChange}>
//         {images.map((image, index) => (
//           <div key={index}>
//             <img src={image} alt={`Hero image ${index + 1}`} className="hero-image" />
//           </div>
//         ))}
//       </Slider>

//       <div className="hero-content">
//         <h1>Welcome to Our Website</h1>
//         <p>This is a captivating hero section with sliding images.</p>
//         <button className="hero-button">Learn More</button>
//       </div>
//     </div>
//   );
// };

// export default Hero;