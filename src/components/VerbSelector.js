import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';

function VerbSelector({ value, onChange }) {
  const [verbes, setVerbes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetch(`http://localhost:8080/api/verbes?q=${encodeURIComponent(inputValue)}`)
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
  }, [inputValue]);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      options={verbes}
      loading={loading}
      disablePortal
      openOnFocus
      renderInput={(params) => (
        <TextField
          {...params}
          label="Verbe"
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