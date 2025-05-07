import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  InputAdornment,
  IconButton,
  Collapse,
} from '@mui/material';
import { Magnify, ChevronDown } from 'mdi-material-ui'; // Importez l'icône ChevronDown
import axios from 'axios';

interface Soldes {
  Solde: number;
  Annee: string;
  User: string;
}

const ListeSoldes = () => {
  const [soldes, setSoldes] = useState<Soldes[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedEmail, setExpandedEmail] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/solde/Allsolde');
      if (response.status === 200) {
        // Tri des soldes par année de manière décroissante
        const sortedSoldes = response.data.sort((a: Soldes, b: Soldes) => {
          return new Date(b.Annee).getTime() - new Date(a.Annee).getTime();
        });
        setSoldes(sortedSoldes);
      } else {
        console.error('Erreur lors de la récupération des soldes:', response);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des soldes:', error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Filtrer les soldes triés par année en fonction du terme de recherche
  const filteredSoldes = soldes.filter(solde =>
    solde.User.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtenir les emails uniques
  const uniqueEmails = Array.from(new Set(filteredSoldes.map(solde => solde.User)));

  const handleExpandClick = (email: string) => {
    setExpandedEmail(expandedEmail === email ? null : email);
  };

  return (
    <Container>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TextField
          size="small"
          placeholder="Rechercher par Employé"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Magnify fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Solde</TableCell>
              <TableCell>Année</TableCell>
              <TableCell>Employé</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueEmails.map((email, index) => (
              <React.Fragment key={index}>
                <TableRow onClick={() => handleExpandClick(email)}>
                  <TableCell>{filteredSoldes.find(solde => solde.User === email)?.Solde}</TableCell>
                  <TableCell>{formatDate(filteredSoldes.find(solde => solde.User === email)?.Annee || '')}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => handleExpandClick(email)}>
                      <ChevronDown />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expandedEmail === email} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Table size="small" aria-label="purchases">
                          <TableBody>
                            {filteredSoldes.filter(solde => solde.User === email).map((solde, i) => (
                              <TableRow key={i}>
                                <TableCell>{solde.Solde}</TableCell>
                                <TableCell>{formatDate(solde.Annee)}</TableCell>
                                <TableCell>{solde.User}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListeSoldes;
