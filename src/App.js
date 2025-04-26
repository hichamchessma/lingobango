import React from "react";
import Conjugaison from "./Conjugaison";

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "0 auto", padding: 24 }}>
      <h1>Lingobango</h1>
      <Conjugaison />
    </div>
  );
}
