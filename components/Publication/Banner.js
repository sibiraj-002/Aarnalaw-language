"use client"
import React, { useContext } from 'react';
import { LanguageContext } from "../../app/context/LanguageContext";

export default function Banner({ title }) {
  const { language, translations } = useContext(LanguageContext);

  const getTitle = () => {
    switch (title) {
      case "insight":
        return "Insight";
      case "aarna-news":
        return "Aarna News";
      case "publication":
        return "Publications";
      case "podcast":
        return "Podcasts";
      default:
        return "Aarna Law"; // Fallback title if input is not recognized
    }
  };

  return (
    <div className="relative h-[600px] bg-[url('/insights/InsightsMobileBanner.jpg')] bg-cover bg-center md:bg-[url('/insights/InsightsBanner.jpg')]">
      <div className="absolute bottom-0 flex h-[50vh] w-full items-center justify-center">
        <h1 className="bg-black/50 p-4  text-2xl font-bold tracking-wide text-white md:text-5xl">
          {/* {getTitle()} */}

          {translations.publicationsTitle.publications}
        </h1>
      </div>
    </div>
  );
}
