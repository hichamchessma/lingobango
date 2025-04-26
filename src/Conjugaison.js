import React, { useEffect, useState } from 'react';

function Conjugaison() {
  const [verbe] = useState('etre'); // Fixé à "etre" pour la démo, peut être rendu dynamique
  const [temps, setTemps] = useState('present');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showSynonymes, setShowSynonymes] = useState(false);
  const [showHomonymes, setShowHomonymes] = useState(false);

  // Données mock pour synonymes/homonymes
  const synonymes = ["exister", "demeurer", "subsister"];
  const homonymes = ["était", "étai", "étay"];

  useEffect(() => {
    fetch(`http://localhost:8080/api/conjugaison?verbe=${verbe}&temps=${temps}`)
      .then(res => {
        if (!res.ok) throw new Error('Erreur API: ' + res.status);
        return res.json();
      })
      .then(setData)
      .catch(setError);
  }, [verbe, temps]);

  if (error) return <div>Erreur: {error.message}</div>;
  if (!data) return <div>Chargement...</div>;

  // Liste explicite des temps
  const tempsDisponibles = [
    { label: 'Passé', value: 'passe' },
    { label: 'Présent', value: 'present' },
    { label: 'Futur', value: 'futur' }, // futur n'est pas encore implémenté côté backend
  ];

  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Conjugaison du verbe {data.verbe} ({data.temps})</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
        <tbody>
          {data.pronoms.map((pronom, idx) => (
            <tr key={pronom}>
              <td style={{ padding: 8, fontWeight: 600 }}>{pronom}</td>
              <td style={{ padding: 8 }}>{data.conjugaisons[idx]}</td>
              <td style={{ padding: 8 }}>
                {/* Bouton d'écoute désactivé pour l'instant */}
                <button title="Écouter" disabled>🔊</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => {setShowSynonymes(s => !s); setShowHomonymes(false);}}>
          {showSynonymes ? "Cacher Synonymes" : "← Synonymes"}
        </button>
        <button style={{ float: "right" }} onClick={() => {setShowHomonymes(h => !h); setShowSynonymes(false);}}>
          {showHomonymes ? "Cacher Homonymes" : "Homonymes →"}
        </button>
      </div>
      {showSynonymes && (
        <div style={{ marginBottom: 12, background: '#fffde7', borderRadius: 8, padding: 8 }}>
          <b>Synonymes :</b> {synonymes.join(', ')}
        </div>
      )}
      {showHomonymes && (
        <div style={{ marginBottom: 12, background: '#fce4ec', borderRadius: 8, padding: 8 }}>
          <b>Homonymes :</b> {homonymes.join(', ')}
        </div>
      )}
      <div style={{ marginBottom: 16, display: 'flex', gap: 8, justifyContent: 'center' }}>
        {tempsDisponibles.map(t => (
          <button
            key={t.value}
            onClick={() => setTemps(t.value)}
            disabled={temps === t.value}
            style={temps === t.value ? { fontWeight: 'bold', background: '#bbdefb' } : {}}
          >{t.label}</button>
        ))}
      </div>
      <div style={{ background: "#e3f2fd", borderRadius: 8, padding: 12, marginTop: 24 }}>
        Aujourd'hui, vous avez appris à conjuguer le verbe <b>{data.verbe}</b> au <b>{data.temps}</b> pour tous les pronoms !
      </div>
    </div>
  );
}

export default Conjugaison;
