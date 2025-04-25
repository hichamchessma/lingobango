import React from "react";

const pronouns = [
  "Je",
  "Tu",
  "Il/Elle/On",
  "Nous",
  "Vous",
  "Ils/Elles"
];

const mockConjugations = [
  "suis",
  "es",
  "est",
  "sommes",
  "êtes",
  "sont"
];

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "0 auto", padding: 24 }}>
      <h1>Lingobango</h1>
      <h2>Conjugaison du verbe "être" (Présent)</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
        <tbody>
          {pronouns.map((pronom, idx) => (
            <tr key={pronom}>
              <td style={{ padding: 8, fontWeight: 600 }}>{pronom}</td>
              <td style={{ padding: 8 }}>{mockConjugations[idx]}</td>
              <td style={{ padding: 8 }}>
                <button title="Écouter" onClick={() => speak(`${pronom} ${mockConjugations[idx]}`)}>
                  🔊
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginBottom: 16 }}>
        <button disabled>← Synonymes</button>
        <button style={{ float: "right" }} disabled>Homonymes →</button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <button disabled>↑ Passé</button>
        <button style={{ float: "right" }} disabled>Futur ↓</button>
      </div>
      <div style={{ background: "#e3f2fd", borderRadius: 8, padding: 12, marginTop: 24 }}>
        Aujourd'hui, vous avez appris à conjuguer le verbe <b>être</b> au <b>présent</b> pour tous les pronoms !
      </div>
    </div>
  );
}

function speak(text) {
  if (window.speechSynthesis) {
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Synthèse vocale non supportée sur ce navigateur.");
  }
}
