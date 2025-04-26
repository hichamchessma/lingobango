import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const tempsDisponibles = [
  { label: 'Passé', value: 'passe' },
  { label: 'Présent', value: 'present' },
  { label: 'Futur', value: 'futur' }
];

function TimeSelector({ value, onChange }) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(event, newValue) => {
        if (newValue !== null) {
          onChange(newValue);
        }
      }}
      aria-label="temps de conjugaison"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 2,
        '& .MuiToggleButton-root': {
          '&.Mui-selected': {
            backgroundColor: '#bbdefb',
            '&:hover': {
              backgroundColor: '#90caf9'
            }
          }
        }
      }}
    >
      {tempsDisponibles.map((temps) => (
        <ToggleButton
          key={temps.value}
          value={temps.value}
          aria-label={temps.label}
        >
          {temps.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default TimeSelector;