"use client"
import React, { useContext } from 'react';
import { LanguageContext } from "../../app/context/LanguageContext";

export default function Banner({ title }) {
  const { language, translations } = useContext(LanguageContext);
  const getTitle = () => {
    switch (title) {
      case "insight":
        return "Insights";
      case "aarna-news":
        return "Aarna News";
      case "publication":
        return "Publication";
      case "podcast":
        return "Podcast";
      default:
        return "Aarna Law"; // Fallback title if input is not recognized
    }
  };

  return (
    <div className="relative h-[600px] md:bg-[url('/insights/InsightsBanner.jpg')] bg-[url('/insights/InsightsMobileBanner.jpg')] bg-cover bg-center">
      <div className="absolute bottom-0 flex h-[50vh] w-full items-center justify-center">
        <h1 className="text-5xl font-bold tracking-wide text-white  bg-black/50 p-4">
          {/* {getTitle()} */}
          {translations.insightsTitle.insights} 
        </h1>
      </div>
    </div>
  );
}
