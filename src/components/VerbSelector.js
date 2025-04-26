import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';

function VerbSelector({ value, onChange }) {
  const [verbes, setVerbes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/verbes')
      .then(res => res.json())
      .then(data => {
        setVerbes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement des verbes:', err);
        setLoading(false);
      });
  }, []);
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
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