import React from "react";
import Conjugaison from "./Conjugaison";

export default function App() {
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
      <h1 style={{ 
        color: "#1976d2",
        marginBottom: "32px",
        fontSize: "2.5rem",
        fontWeight: "bold"
      }}>Lingobango</h1>
      <Conjugaison />
    </div>
  );
}
