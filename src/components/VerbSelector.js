import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

function VerbSelector({ value, onChange, language }) {
  const { t } = useTranslation();
  const [verbes, setVerbes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetch(`http://localhost:8080/api/verbes?q=${encodeURIComponent(inputValue)}&langue=${language}`)
      .then(res => res.json())
      .then(data => {
        if (!ignore) {
          // Supprime les doublons
          setVerbes([...new Set(data)]);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!ignore) {
          console.error('Erreur lors du chargement des verbes:', err);
          setVerbes([]);
          setLoading(false);
        }
      });
    return () => { ignore = true; };
  }, [inputValue, language]);

  return (
    <Autocomplete
      value={value}
      onChange={(_event, newValue) => {
        // Si newValue est un objet, extraire la string
        if (typeof newValue === 'string') {
          onChange(newValue);
        } else if (newValue && typeof newValue === 'object' && newValue.inputValue) {
          onChange(newValue.inputValue);
        } else if (typeof newValue === 'object' && newValue !== null) {
          onChange(newValue.label || newValue.value || '');
        } else {
          onChange('');
        }
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      options={verbes}
      loading={loading}
      disablePortal
      openOnFocus
      renderInput={(params) => (
        <TextField
          {...params}
          label={t('verbe')}
          variant="outlined"
          fullWidth
          size="medium"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      sx={{
        width: '100%',
        marginBottom: 2,
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#ffffff'
        }
      }}
    />
  );
}


export default VerbSelector;