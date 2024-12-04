"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { homeBanner } from "../../utils/homebanner-data";
import { initFlowbite } from "flowbite";

export default function Banner() {
  useEffect(() => {
    initFlowbite();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % homeBanner.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + homeBanner.length) % homeBanner.length
    );
  };

  return (
    <div
      id="default-carousel"
      className="relative h-[70vh] w-full lg:h-screen"
      data-carousel="slide"
    >
      <div className="relative h-screen overflow-hidden">
        {homeBanner.map((banner, index) => (
          <div
            key={index}
            className={`relative w-full duration-700 ease-in-out ${
              index === currentIndex ? "block" : "hidden"
            }`}
            data-carousel-item
          >
            {/* Mobile Banner */}
            <Image
              src={banner.mobileBannerUrl}
              className="absolute left-1/2 top-1/2 h-[70vh] w-full -translate-x-1/2 lg:hidden"
              alt={banner.bannerText}
              width={600}
              height={500}
              loading="eager" // Makes it load as soon as possible
              priority // Preloads the image for better performance
              placeholder="blur" // LQIP for smoother loading experience
              blurDataURL={banner.mobileBannerUrl} // Placeholder image for blur effect
            />
            {/* Desktop Banner */}
            <Image
              src={banner.bannerUrl}
              className="absolute left-1/2 top-1/2 hidden h-screen w-full -translate-x-1/2 lg:block"
              alt={banner.bannerText}
              width={600}
              height={500}
              loading="eager" // Makes it load as soon as possible
              priority // Preloads the image for better performance
              placeholder="blur" // LQIP for smoother loading experience
              blurDataURL={banner.bannerUrl} // Placeholder image for blur effect
            />

            <div className="absolute flex h-screen w-full flex-col items-center justify-center p-4 text-center text-white">
              <h2 className="text-4xl font-bold lg:text-5xl">
                {banner.bannerText}
              </h2>
              <p className="py-8 text-xl lg:w-7/12">{banner.bannerPara}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel controls */}
      {/* <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4">
        <button
          className="bg-gray-700 text-white p-2 rounded-full"
          onClick={handlePrev}
        >
          &lt;
        </button>
        <button
          className="bg-gray-700 text-white p-2 rounded-full"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div> */}
    </div>
  );
}
