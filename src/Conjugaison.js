import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, IconButton, Button, Box, Alert, CircularProgress, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VerbSelector from './components/VerbSelector';
import TimeSelector from './components/TimeSelector';

function Conjugaison() {
  const [verbe, setVerbe] = useState('etre');
  const [temps, setTemps] = useState('present');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showSynonymes, setShowSynonymes] = useState(false);
  const [showAntonymes, setShowAntonymes] = useState(false);

  const [synonymes, setSynonymes] = useState([]);
  const [antonymes, setAntonymes] = useState([]);
  const [loadingSynonyms, setLoadingSynonyms] = useState(false);
  const [loadingAntonyms, setLoadingAntonyms] = useState(false);

  useEffect(() => {
    if (showSynonymes) {
      setLoadingSynonyms(true);
      fetch(`http://localhost:8080/api/synonymes?verbe=${verbe}`)
        .then(res => res.json())
        .then(data => setSynonymes(data))
        .catch(err => console.error('Erreur lors du chargement des synonymes:', err))
        .finally(() => setLoadingSynonyms(false));
    }
  }, [verbe, showSynonymes]);

  useEffect(() => {
    if (showAntonymes) {
      setLoadingAntonyms(true);
      fetch(`http://localhost:8080/api/antonymes?verbe=${verbe}`)
        .then(res => res.json())
        .then(data => setAntonymes(data))
        .catch(err => console.error('Erreur lors du chargement des antonymes:', err))
        .finally(() => setLoadingAntonyms(false));
    }
  }, [verbe, showAntonymes]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/conjugaison?verbe=${verbe}&temps=${temps}`)
      .then(res => {
        if (!res.ok) throw new Error('Erreur API: ' + res.status);
        return res.json();
      })
      .then(setData)
      .catch(setError);
  }, [verbe, temps]);

  if (error) return (
    <Alert severity="error" sx={{ mt: 2 }}>
      Une erreur s'est produite : {error.message}
    </Alert>
  );

  if (!data) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <CircularProgress />
      <Typography sx={{ ml: 2 }}>Chargement des conjugaisons...</Typography>
    </Box>
  );

  // Liste explicite des temps
  const tempsDisponibles = [
    { label: 'Passé', value: 'passe' },
    { label: 'Présent', value: 'present' },
    { label: 'Futur', value: 'futur' }, // futur n'est pas encore implémenté côté backend
  ];

  return (
    <>
      <Box sx={{ maxWidth: 500, width: '100%', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2, p: 1 }}>
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', width: '100%' }}>
          <Box sx={{ flex: 1.5, minWidth: 180, maxWidth: 350 }}>
            <VerbSelector value={verbe} onChange={setVerbe} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 120, maxWidth: 180 }}>
            <TimeSelector value={temps} onChange={setTemps} />
          </Box>
        </Box>

        <Paper elevation={3} sx={{ 
          p: 2, 
          borderRadius: 2,
          backgroundColor: '#ffffff',
          mb: 1
        }}>
          <Typography variant="h6" sx={{ 
            textAlign: 'center', 
            mb: 2, 
            fontWeight: 'bold',
            color: '#1976d2',
            fontSize: '1.1rem'
          }}>
            Conjugaison du verbe {data.verbe} ({data.temps})
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableBody>
                {data.pronoms.map((pronom, idx) => (
                  <TableRow key={pronom} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      width: '30%',
                      fontSize: '1rem',
                      color: '#2196f3',
                      py: 0.5
                    }}>
                      {pronom}
                    </TableCell>
                    <TableCell sx={{ fontSize: '1rem', py: 0.5 }}>{data.conjugaisons[idx]}</TableCell>
                    <TableCell align="right" sx={{ width: '10%' }}>
                      <IconButton 
                        title="Écouter" 
                        disabled
                        sx={{ '&.Mui-disabled': { color: '#bdbdbd' }, p: 0.5 }}
                      >
                        <VolumeUpIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 1 }}>
          <Button
            variant={showSynonymes ? "contained" : "outlined"}
            onClick={() => {setShowSynonymes(s => !s); setShowAntonymes(false);}}
            sx={{ 
              minWidth: '100px',
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '0.95rem',
              py: 0.5
            }}
          >
            {showSynonymes ? "Cacher Synonymes" : "Synonymes"}
          </Button>
          <Button
            variant={showAntonymes ? "contained" : "outlined"}
            onClick={() => {setShowAntonymes(a => !a); setShowSynonymes(false);}}
            sx={{ 
              minWidth: '100px',
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '0.95rem',
              py: 0.5
            }}
          >
            {showAntonymes ? "Cacher Contraires" : "Contraires"}
          </Button>
        </Box>

        {(showSynonymes || showAntonymes) && (
          <Paper elevation={2} sx={{ p: 1.5, borderRadius: 2, backgroundColor: '#ffffff', mb: 1 }}>
            {showSynonymes && (
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 1, color: '#1976d2', fontSize: '1rem' }}>Synonymes</Typography>
                {loadingSynonyms ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={18} />
                    <Typography sx={{ fontSize: '0.95rem' }}>Chargement des synonymes...</Typography>
                  </Box>
                ) : synonymes.length > 0 ? (
                  <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.4 }}>
                    {synonymes.join(' • ')}
                  </Typography>
                ) : (
                  <Typography sx={{ color: '#666', fontSize: '0.95rem' }}>Aucun synonyme trouvé</Typography>
                )}
              </Box>
            )}

            {showAntonymes && (
              <Box sx={{ mt: showSynonymes ? 1.5 : 0 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, color: '#1976d2', fontSize: '1rem' }}>Contraires</Typography>
                {loadingAntonyms ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={18} />
                    <Typography sx={{ fontSize: '0.95rem' }}>Chargement des contraires...</Typography>
                  </Box>
                ) : antonymes.length > 0 ? (
                  <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.4 }}>
                    {antonymes.join(' • ')}
                  </Typography>
                ) : (
                  <Typography sx={{ color: '#666', fontSize: '0.95rem' }}>Aucun contraire trouvé</Typography>
                )}
              </Box>
            )}
          </Paper>
        )}

        <Paper elevation={2} sx={{ 
          p: 1.5, 
          borderRadius: 2, 
          backgroundColor: '#e8f5e9',
          textAlign: 'center',
          fontSize: '0.95rem'
        }}>
          <Typography variant="subtitle1" sx={{ color: '#2e7d32', fontSize: '1rem' }}>
            Félicitations ! Vous avez appris à conjuguer le verbe <strong>{data.verbe}</strong> au <strong>{data.temps}</strong> !
          </Typography>
        </Paper>
      </Box>
    </>
  );
}

export default Conjugaison;
