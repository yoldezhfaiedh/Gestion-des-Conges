import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getUserRole } from 'src/auth.utils';

// Création du contexte pour UserRoleContext
export const UserRoleContext = createContext({
    userRole: '',
    loading: false,
});

// Définition des types pour UserRoleProvider
interface UserRoleProviderProps {
    children: ReactNode;  // Typification explicite de `children`
}

// Composant UserRoleProvider pour gérer l'état du contexte
export const UserRoleProvider = ({ children }: UserRoleProviderProps) => {
    const [userRole, setUserRole] = useState('');
    const [loading, setLoading] = useState(false);

    // Fonction pour récupérer le rôle de l'utilisateur
    const fetchUserRole = async () => {
        try {
            console.log("Début de fetchUserRole");
            const role = await getUserRole();
            console.log("Rôle récupéré :", role);
            setUserRole(role);
        } catch (error) {
            console.error("Erreur lors de la récupération du rôle de l'utilisateur :", error);
        } finally {
            setLoading(false);
            console.log("Fin de fetchUserRole, chargement terminé");
        }
    };
    

    // Utilisation d'un useEffect pour charger le rôle de l'utilisateur lorsque le composant est monté
    useEffect(() => {
        fetchUserRole();
    }, []);

    // Fournir le contexte UserRoleContext avec `userRole` et `loading`
    return (
        <UserRoleContext.Provider value={{ userRole, loading }}>
            {loading ? <div>Chargement...</div> : children}
        </UserRoleContext.Provider>
    );
};
