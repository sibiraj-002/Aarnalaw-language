"use client"
import React, { useContext } from 'react';
import { LanguageContext } from "../../app/context/LanguageContext";

export default function Banner({ title }) {
  const { language, translations } = useContext(LanguageContext);
  return (
    <div className="relative h-[600px] md:bg-[url('/insights/InsightsBanner.jpg')] bg-[url('/insights/InsightsMobileBanner.jpg')] bg-cover bg-center">
      <div className="absolute bottom-0 flex h-[50vh] w-full items-center justify-center">
        <h1 className="text-5xl font-bold tracking-wide text-white bg-black/50 p-4">
          {translations.aarnaNewsTitle.aarnaNews}
        </h1>
      </div>
    </div>
  );
}
