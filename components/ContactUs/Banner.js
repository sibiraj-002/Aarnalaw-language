"use client"
import React, { useContext } from 'react';
import { LanguageContext } from "../../app/context/LanguageContext";

export default function Banner() {
  const { language, translations } = useContext(LanguageContext);

  return (
    <div className="relative h-[600px] md:bg-[url('/contactUs/ContactBanner.jpg')] bg-[url('/contactUs/ContactMobileBanner.jpg')] bg-cover bg-center">
      <div className="absolute bottom-0 flex h-[50vh] w-full items-center justify-center">
        <h1 className="text-5xl font-bold text-white bg-black/50 p-4"> {translations.contactUsTitle.contactUs} </h1>
      </div>
    </div>
  );
}
