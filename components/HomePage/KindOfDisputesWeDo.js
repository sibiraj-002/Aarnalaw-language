"use client"
import React, { useState, useEffect, useRef, useContext } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; // Import styles for react-multi-carousel
import { LanguageContext } from "../../app/context/LanguageContext";

const KindOfDisputes = () => {
  const sliderRef = useRef(null);
  const { language, translations } = useContext(LanguageContext);

  // State to track screen size 
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Update screen size state on component mount
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Adjust 1024px for desktop threshold
    };

    handleResize(); // Initialize on mount
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up the event listener
    };
  }, []);

  // Carousel responsive settings
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="py-8 px-4 md:mx-10">
      <h2 className="text-center text-2xl font-semibold text-custom-red mb-6">
        {translations.disputes.disputesTitle}
      </h2>
      <Carousel
        responsive={responsive}
        ref={sliderRef}
        infinite={true}
        showDots={false}
        arrows={false} // Disable arrows
        autoPlay={true} // Enable auto-slide
        autoPlaySpeed={3000} // Set the auto-slide interval (in milliseconds)
      >
        {translations.disputesDetails.map((items, index) => (
          <div
            key={index}
            className="border border-red-400 py-10 text-center rounded-lg shadow-md m-5"
          >
            <h3 className="text-blue-900 font-medium text-lg">{items.name}</h3>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default KindOfDisputes;
