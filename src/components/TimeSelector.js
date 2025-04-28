import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';

const tempsDisponibles = [
  { labelKey: 'passe', value: 'passe' },
  { labelKey: 'present', value: 'present' },
  { labelKey: 'futur', value: 'futur' }
];

function TimeSelector({ value, onChange }) {
  const { t } = useTranslation();
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
          minWidth: 90,
          paddingLeft: 2,
          paddingRight: 2,
          fontSize: '0.97rem',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
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
          aria-label={t(temps.labelKey)}
        >
          {t(temps.labelKey)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default TimeSelector;