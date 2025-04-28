import React from "react";

const LANGUAGES = [
  { code: "fr", label: "Français", flag: "/flags/fr.png" },
  { code: "en", label: "English", flag: "/flags/us.png" },
  { code: "es", label: "Español", flag: "/flags/es.png" }
];

export default function LanguageSelector({ language, onChange }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          style={{
            background: language === lang.code ? "#e3f2fd" : "transparent",
            border: language === lang.code ? "2px solid #1976d2" : "1px solid #ccc",
            borderRadius: 6,
            padding: "4px 10px 4px 6px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            outline: "none",
            boxShadow: language === lang.code ? "0 0 6px #1976d2aa" : "none",
            transition: "all 0.15s"
          }}
          aria-label={lang.label}
        >
          <img src={lang.flag} alt={lang.label} style={{ width: 22, height: 16, marginRight: 7, borderRadius: 2, border: "1px solid #ddd" }} />
          <span style={{ fontWeight: language === lang.code ? 700 : 400, color: language === lang.code ? "#1976d2" : "#222", fontSize: 15 }}>{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
