import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline';
import { Magnify } from 'mdi-material-ui';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import CardCongeRH from 'src/@core/components/card-statistics/CardGestionConge-Rh';
interface conge {
    _id: string;
    userEmail: string;
    TypeConge: {
        Nom: string;
    };
    statut: string;
    NomDemande: string;
    NombreJours: number;
    Date_debut: string;
    Date_fin: string;
}
interface demande {
    _id: string;
    userEmail: string;
    TypeConge: {
        Nom: string;
    };
    statut: string;
    NomDemande: string;
    NombreJours: number;
    Date_debut: string;
    Date_fin: string;
}
function ListeDesCongés() {
    const [conges, setConges] = useState<Conge[]>([]);
    const [demandesConge, setDemandesConge] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('date_fin');
    const [openDialog, setOpenDialogMain] = useState(false);
    const [selectedDemande, setSelectedDemande] = useState(null); // Define selectedDemande state

    // Utilisation de useEffect pour récupérer les demandes de congé initiales
    useEffect(() => {
        async function fetchDemandesConge() {
            try {
                const response = await axios.get(`http://localhost:5000/demandeconge/findall?page=${currentPage}`);
                setDemandesConge(response.data.demandes);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des demandes de congé :', error);
            }
        }
        fetchDemandesConge();
    }, [currentPage]);
    
    // Fonction pour ouvrir la boîte de dialogue modale
    const handleOpenDialog = (demande) => {
        setSelectedDemande(demande);
        setOpenDialogMain(true);
    };
    
    // Fonction pour fermer la boîte de dialogue modale
    const handleCloseDialog = () => {
        setSelectedDemande(null);
        setOpenDialogMain(false);
    };
    
    // Fonction pour passer à la page suivante
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Fonction pour revenir à la page précédente
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Fonction pour effectuer la recherche de congés selon le terme et le filtre choisis
    const fetchConges = async () => {
        try {
            let queryParam = '';

            if (selectedFilter === 'date_fin') {
                queryParam = `date_fin=${searchTerm}`;
            } else if (selectedFilter === 'date_debut') {
                queryParam = `date_Debut=${searchTerm}`;
            } else if (selectedFilter === 'statut') {
                queryParam = `statut=${searchTerm}`;
            } else if (selectedFilter === 'nom') {
                queryParam = `nom=${searchTerm}`;
            } else if (selectedFilter === 'typeConge') {
                queryParam = `typeConge=${searchTerm}`;
            }

            const response = await fetch(`http://localhost:5000/demandeconge/${selectedFilter}/?${queryParam}`);
            if (response.ok) {
                const data = await response.json();
                setConges(data);
            } else {
                console.error('Erreur lors de la récupération des congés :', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des congés :', error);
        }
    };

    // Fonction pour effectuer la recherche lorsque l'utilisateur clique sur le bouton de recherche
    const handleSearch = () => {
        fetchConges();
    };

    // Fonction pour convertir une date ISO en format jj/mm/aaaa
    const convertirDate = (dateISO) => {
        const date = new Date(dateISO);
        const jour = date.getDate().toString().padStart(2, '0');
        const mois = (date.getMonth() + 1).toString().padStart(2, '0');
        const annee = date.getFullYear();
        return `${jour}/${mois}/${annee}`;
    };

    return (
        <div>
            {/* Barre de recherche */}
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                    <Select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        sx={{ marginRight: 1 }}
                    >
                        {/* <MenuItem value="date_fin">Date de reprise</MenuItem>
                        <MenuItem value="date_debut">Date de début</MenuItem> */}
                        <MenuItem value="statut">Statut</MenuItem>
                        <MenuItem value="nom">Nom</MenuItem>
                        {/* <MenuItem value="typeConge">Type de congé</MenuItem> */}
                    </Select>
                    <TextField
                        size="small"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Magnify fontSize="small" />
                                </InputAdornment>
                            )
                        }}
                        placeholder={`Entrez le terme de recherche`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>
                <Button onClick={handleSearch} variant="contained">Rechercher</Button>
            </Box>

            {/* Affichage des congés sous forme de cartes */}
            <Grid container spacing={2}>
                {loading ? (
                    <p>Chargement...</p>
                ) : (
                    searchTerm === '' ? (
                        // Afficher les demandes de congé initiales si aucun terme de recherche n'est saisi
                        demandesConge.map((demande, index) => (
                            <Grid key={index} item xs={6}>
                                <CardCongeRH
                                    User={demande.User.Nom}
                                    icon={<BriefcaseVariantOutline />}
                                    typeConge={demande.TypeConge.Nom}
                                    color={
                                        demande.statut === 'En cours'
                                            ? 'warning'
                                            : demande.statut === 'Acceptée En attente de confirmation' ||
                                              demande.statut === 'Refusée En attente de confirmation' ||
                                              demande.statut === 'Traitée par le Responsable Rh'
                                            ? 'warning'
                                            : demande.statut === 'Acceptée'
                                            ? 'success'
                                            : demande.statut === 'Refusée'
                                            ? 'error'
                                            : 'primary'
                                    }
                                    NomDemande={demande.NomDemande}
                                    NombreJours={demande.NombreJours}
                                    Date_debut={convertirDate(demande.Date_debut)}
                                    Date_fin={convertirDate(demande.Date_fin)}
                                    Statut={demande.statut}
                                />
                                <Button
                                    // variant="contained"
                                    color="primary"
                                    sx={{ mt: -18, ml: 3 }}
                                    onClick={() => handleOpenDialog(demande)}
                                >
                                    Afficher le fichier justificatif
                                </Button>
                            </Grid>
                        ))
                    ) : (
                        // Afficher les congés filtrés par la recherche
                        conges.map((conge, index) => (
                            <Grid key={index} item xs={6}>
                                <CardCongeRH
                                    User={conge.User.Nom}
                                    icon={<BriefcaseVariantOutline />}
                                    typeConge={conge.TypeConge.Nom}
                                    color={
                                        conge.statut === 'En cours'
                                            ? 'warning'
                                            : conge.statut === 'Acceptée En attente de confirmation' ||
                                              conge.statut === 'Refusée En attente de confirmation' ||
                                              conge.statut === 'Traitée par le Responsable Rh'
                                            ? 'warning'
                                            : conge.statut === 'Acceptée'
                                            ? 'success'
                                            : conge.statut === 'Refusée'
                                            ? 'error'
                                            : 'primary'
                                    }
                                    NomDemande={conge.NomDemande}
                                    NombreJours={conge.NombreJours}
                                    Date_debut={convertirDate(conge.Date_debut)}
                                    Date_fin={convertirDate(conge.Date_fin)}
                                    Statut={conge.statut}
                                />
                                <Button
                                    // variant="contained"
                                    color="primary"
                                    sx={{ mt: -18, ml: 3 }}
                                    onClick={() => handleOpenDialog(conge)}
                                >
                                    Afficher le fichier justificatif
                                </Button>
                            </Grid>
                        ))
                    )
                )}
            </Grid>

            {/* Boîte de dialogue modale pour afficher l'image */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Justificatif</DialogTitle>
                <DialogContent>
                    {selectedDemande && (
                        <img
                            src={`http://localhost:5000${selectedDemande.image}`}
                            alt="Image de la demande de congé"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Fermer</Button>
                </DialogActions>
            </Dialog>

            {/* Boutons de pagination */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <Button
                    variant="contained"
                    sx={{ ml: 2, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', fontWeight: 'bold' }}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Page précédente
                </Button>
                <Button
                    variant="contained"
                    sx={{ ml: 2, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', fontWeight: 'bold' }}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Page suivante
                </Button>
            </div>
        </div>
    );
}

export default ListeDesCongés;

