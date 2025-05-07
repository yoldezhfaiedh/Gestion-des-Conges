"use strict";
// import React, { useEffect, useState } from 'react';
// import { Container, Box, Button, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, InputAdornment, TextField } from '@mui/material';
// import axios from 'axios';
// import { Magnify } from 'mdi-material-ui';
// import EditUserDialog from 'src/views/InterfaceAdmin/EditUser';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// interface User {
//   id: number;
//   Nom: string;
//   Prenom: string;
//   Email: string;
//   Role: string;
//   isActive: boolean;
// }
// const Liste = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
//   const [selectedUserForEdit, setSelectedUserForEdit] = useState<User | null>(null)
//   useEffect(() => {
//     fetchData();
//   }, []);
// const fetchData = async () => {
//   try {
//     const response = await axios.get("http://localhost:5000/users", {
//       // headers: {
//       //   Authorization: `Bearer ${token}`
//       // }
//     });
//     if (response.status === 200) {
//       setUsers(response.data);
//     }
//   } catch (error) {
//     console.error('Erreur lors de la récupération des utilisateurs:', error);
//   }
// };
//   const handleBlockUnblock = async (Email: string, isActive: boolean) => {
//     try {
//       const response = await axios.post(
//         isActive ? "http://localhost:5000/users/block" : "http://localhost:5000/users/unblock",
//         { Email }
//       );
//       if (response.status === 200) {
//         setUsers(prevUsers =>
//           prevUsers.map(user => {
//             if (user.Email === Email) {
//               return { ...user, isActive: !isActive };
//             }
//             return user;
//           })
//         );
//       }
//     } catch (error) {
//       console.error('Erreur :', error);
//     }
//   };
//   const handleButtonClick = (Email: string, isActive: boolean) => {
//     handleBlockUnblock(Email, isActive);
//     setUsers(prevUsers =>
//       prevUsers.map(user => {
//         if (user.Email === Email) {
//           return { ...user, isActive: !isActive };
//         }
//         return user;
//       })
//     );
//   };
//   const handleDelete = async (email: string) => {
//     try {
//       const response = await axios.delete(`http://localhost:5000/users/${email}`);
//       if (response.status === 200) {
//         setUsers(prevUsers => prevUsers.filter(user => user.Email !== email));
//       }
//     } catch (error) {
//       console.error(`Erreur lors de la suppression de l'utilisateur ${email}:`, error);
//     }
//   };
//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };
//   const filteredUsers = Array.isArray(users) ? 
//   users.filter(user => user.Nom.toLowerCase().includes(searchTerm.toLowerCase())) : [];
//   const openEditDialog = (user: User) => {
//     setSelectedUserForEdit(user);
//     setIsEditDialogOpen(true);
//   };
//   const closeEditDialog = () => {
//     setIsEditDialogOpen(false);
//     setSelectedUserForEdit(null);
//   };
//   return (
//     <Container>
//       <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
//           <TextField
//             size='small'
//             sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 }  }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position='start' >
//                   <Magnify fontSize='small' />
//                 </InputAdornment>
//               )
//             }}
//             placeholder="Rechercher par Nom"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//         </Box>
//       </Box>
//       <Box>
//         <Box p="4" display="flex" justifyContent="space-between" marginTop="15px">
//           {/* <Typography variant="h4" fontWeight="bold">
//             Liste des Utilisateurs
//           </Typography> */}
//         </Box>
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 700 }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Nom</TableCell>
//                 <TableCell>Prénom</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Role</TableCell>
//                 <TableCell>Statut</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredUsers.map((user, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{user.Nom}</TableCell>
//                   <TableCell>{user.Prenom}</TableCell>
//                   <TableCell>{user.Email}</TableCell>
//                   <TableCell>{user.Role}</TableCell>
//                   <TableCell>{user.isActive ? 'Actif' : 'Inactif'}</TableCell>
//                   <TableCell>
//                   <Button onClick={() => handleButtonClick(user.Email, user.isActive)}>
//                       {user.isActive ? 'Bloquer' : 'Débloquer'}
//                     </Button>
//                     <Button onClick={() => openEditDialog(user)}>Modifier</Button>
//                     <Button onClick={() => handleDelete(user.Email)}>Supprimer</Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//       <EditUserDialog open={isEditDialogOpen} handleClose={closeEditDialog} user={selectedUserForEdit} />
//     </Container>
//   );
// };
// export default Liste;
var react_1 = require("react");
var axios_1 = require("axios");
var Grid_1 = require("@mui/material/Grid");
var BriefcaseVariantOutline_1 = require("mdi-material-ui/BriefcaseVariantOutline");
var CardInfo_tsx_1 = require("src/@core/components/card-statistics/CardInfo.tsx");
function InfoPerso() {
    var _a = react_1.useState([]), Users = _a[0], setUsers = _a[1]; // Corrected type annotation
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    react_1.useEffect(function () {
        function fetchUsers() {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios_1["default"].get("http://localhost:5000/Users")];
                        case 1:
                            response = _a.sent();
                            setUsers(response.data);
                            setLoading(false);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Erreur lors de la récupération des utilisateurs :', error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        fetchUsers();
    }, []);
    return (react_1["default"].createElement(Grid_1["default"], { container: true, spacing: 2 }, loading ? (react_1["default"].createElement(Grid_1["default"], { item: true, xs: 12 },
        react_1["default"].createElement("p", null, "Chargement en cours..."))) : Users.length === 0 ? (react_1["default"].createElement(Grid_1["default"], { item: true, xs: 12 },
        react_1["default"].createElement("p", null, "Pas de profil."))) : (Users.map(function (userInfo, index) { return ( // Renamed User to userInfo
    react_1["default"].createElement(Grid_1["default"], { key: index, item: true, xs: 6 },
        react_1["default"].createElement(CardInfo_tsx_1["default"], { Nom: userInfo.Nom, Prenom: userInfo.Prenom, icon: react_1["default"].createElement(BriefcaseVariantOutline_1["default"], null), color: 'primary', Email: userInfo.Email, Departement: userInfo.Departement, Role: '' }))); }))));
}
exports["default"] = InfoPerso;
