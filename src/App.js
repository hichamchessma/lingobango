import React, { useState, useEffect } from "react";
import Conjugaison from "./Conjugaison";
import LanguageSelector from "./components/LanguageSelector";
import "./i18n";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("lingobango-lang") || "fr"
  );

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lingobango-lang", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div style={{ 
      fontFamily: "Roboto, sans-serif", 
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <div style={{ alignSelf: "flex-end", marginBottom: 8 }}>
        <LanguageSelector language={language} onChange={handleLanguageChange} />
      </div>
      <h1 style={{ 
        color: "#1976d2",
        marginBottom: "32px",
        fontSize: "2.5rem",
        fontWeight: "bold"
      }}>{t('title')}</h1>
      <Conjugaison language={language} />
    </div>
  );
}
