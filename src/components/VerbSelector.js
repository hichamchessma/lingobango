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
      freeSolo
      disableClearable
      options={verbes}
      loading={loading}
      inputValue={inputValue}
      onInputChange={(_, value) => setInputValue(value)}
      value={value || ''}
      onChange={(_, v) => onChange(v)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t('verbe')}
          variant="outlined"
          fullWidth
          size="medium"
          InputProps={{
            ...params.InputProps,
            style: {
              background: 'rgba(30,40,70,0.18)',
              color: '#f4f4ff',
              border: '1.5px solid #18ff6d',
              borderRadius: 10,
              boxShadow: '0 0 8px #18ff6d44',
              fontWeight: 600,
              fontFamily: 'Orbitron, monospace',
              fontSize: '1.06rem',
              letterSpacing: '0.01em',
              transition: 'all 0.18s',
            },
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          InputLabelProps={{ style: { color: '#caffee', fontWeight: 500, fontSize: '1.07rem'} }}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& input': {
              color: '#fff',
              fontWeight: 600,
              fontFamily: 'Orbitron, monospace',
              background: 'transparent',
            },
            '& .MuiInputBase-root': {
              background: 'rgba(30,40,70,0.18)',
              borderRadius: 10,
              boxShadow: '0 0 8px #18ff6d22',
            },
            '& .MuiAutocomplete-endAdornment': {
              color: '#18ff6d',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: '2px solid #18ff6d',
            },
          }}
        />
      )}
      sx={{
        width: '100%',
        marginBottom: 2,
        background: 'transparent',
        borderRadius: 10,
        boxShadow: 'none',
      }}
    />
  );
}

export default VerbSelector;