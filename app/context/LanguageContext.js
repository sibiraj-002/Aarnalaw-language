"use client";

import { createContext, useState, useEffect } from "react";
import translations from "../../public/locales/index"; // Ensure correct path based on project structure

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translationsData, setTranslationsData] = useState(translations.en);

  useEffect(() => {
    setTranslationsData(translations[language] || translations.en);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: translationsData }}>
      {children}
    </LanguageContext.Provider> 
  );
};
