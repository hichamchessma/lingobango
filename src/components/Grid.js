import React from 'react';
import Cube3D from './Cube3D';

export default function Grid() {
  const pronouns = ["Je", "N/A", "Tu", "N/A", "Il/Elle/On", "N/A", "Nous", "N/A", "Vous", "N/A", "Ils/Elles", "N/A"];

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      width: 'fit-content',
      background: 'transparent', /* Plus de bande noire */
      margin: 'auto',
      justifyContent: 'center'
    }}>
      {pronouns.map((word, index) => (
        <Cube3D key={index} word={word} />
      ))}
    </div>
  );
}
