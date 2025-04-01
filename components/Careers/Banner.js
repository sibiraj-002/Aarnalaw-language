"use client"
import React, { useContext } from 'react';
import { LanguageContext } from "../../app/context/LanguageContext";

export default function Banner() {
  const { language, translations } = useContext(LanguageContext);

  return (
    <div className="relative h-[600px] md:bg-[url('/Careers/CareersBanner.jpg')] bg-[url('/Careers/CareersMobileBanner.jpg')] bg-cover bg-center">
      <div className="absolute bottom-0 flex h-[50vh] w-full items-center justify-center">
        <h1 className="text-5xl font-bold text-white bg-black/50 p-4">{translations.careersTitle.careers}</h1>
      </div>
    </div>
  );
}
