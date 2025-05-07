"use strict";
// ** React Imports
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
// import React, { SyntheticEvent, useEffect, useState } from 'react'
// import Tab from '@mui/material/Tab'
// import Card from '@mui/material/Card'
// import TabList from '@mui/lab/TabList'
// import TabPanel from '@mui/lab/TabPanel'
// import Button from '@mui/material/Button'
// import TabContext from '@mui/lab/TabContext'
// import Typography from '@mui/material/Typography'
// import CardContent from '@mui/material/CardContent'
// import TextField from '@mui/material/TextField'
// import axios from 'axios'
// interface Presence {
//     User: string;
// }
// const SaisiePresence = () => {
//     const [value, setValue] = useState<string>('1')
//     const [presence, setPresence] = useState<Presence[]>([]);
//     const [selectedUser, setSelectedUser] = useState<string | null>(null); // État pour stocker l'utilisateur sélectionné
//     const [searchUser, setSearchUser] = useState<string>(''); // État pour stocker l'utilisateur recherché
//     const handleChange = (event: SyntheticEvent, newValue: string) => {
//         setValue(newValue)
//     }
//     useEffect(() => {
//         async function fetchPresence() {
//             try {
//                 const response = await axios.get("http://localhost:5000/Presence");
//                 setPresence(response.data); // Met à jour l'état avec les données obtenues
//             } catch (error) {
//                 console.error('Erreur lors de la récupération des Presences :', error);
//             }
//         }
//         fetchPresence(); // Appel de la fonction pour récupérer les données
//     }, []); // Les crochets vides [] indiquent que ce code s'exécute une seule fois après le rendu initial
//     // Fonction pour afficher les informations de l'utilisateur sélectionné
//     const handleShowUserInfo = (user: string) => {
//         setSelectedUser(user);
//     };
//     // Fonction pour fermer la carte d'informations de l'utilisateur
//     const handleCloseUserInfo = () => {
//         setSelectedUser(null);
//     };
//     // Fonction pour effectuer la recherche de présence par nom d'utilisateur
//     const handleSearch = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/findpresence?user=${searchUser}`);
//             setPresence(response.data); // Met à jour l'état avec les données obtenues après la recherche
//         } catch (error) {
//             console.error('Erreur lors de la recherche de l\'historique de présence :', error);
//         }
//     };
//     return (
//         <Card>
//             <TabContext value={value}>
//                 <TabList onChange={handleChange} aria-label='card navigation example'>
//                     <Tab value='1' label='Valider la decision' />
//                     <Tab value='2' label='Invalider le decision' />
//                 </TabList>
//                 <CardContent>
//                     <TabPanel value='1' sx={{ p: 0 }}>
//                         <TextField
//                             label="Nom de l'utilisateur"
//                             variant="outlined"
//                             value={searchUser}
//                             onChange={(e) => setSearchUser(e.target.value)} // Mettez à jour l'état de la recherche
//                             sx={{ mb: 2 }}
//                         />
//                         <Button variant="contained" onClick={handleSearch}>Rechercher l'historique de présence</Button>
//                         {presence.map((item, index) => (
//                             <div key={index} style={{ marginBottom: '16px', color: '#333', fontFamily: 'Verdana, Geneva, sans-serif' }}>
//                                 <Typography variant='h5' gutterBottom style={{ color: '#007bff', fontFamily: 'Arial, sans-serif', fontSize: '1.2rem' }}>
//                                     Employé: {item.User}
//                                 </Typography>
//                                 <Button variant='contained' onClick={() => handleShowUserInfo(item.User)}>Historique des présences</Button>
//                                 <Button variant='contained' sx={{ ml: 3 }}>Saisir les présences</Button>
//                             </div>
//                         ))}
//                     </TabPanel>
//                 </CardContent>
//             </TabContext>
//             {/* Affichage de la carte d'informations de l'utilisateur */}
//             {selectedUser && (
//                 <Card>
//                     <CardContent>
//                         <Typography variant="h5">Informations de l'utilisateur: {selectedUser}</Typography>
//                         {/* Affichez ici les autres informations de l'utilisateur */}
//                         <Button variant="contained" onClick={handleCloseUserInfo}>Fermer</Button>
//                     </CardContent>
//                 </Card>
//             )}
//         </Card>
//     )
// }
// export default SaisiePresence;
var react_1 = require("react");
var Tab_1 = require("@mui/material/Tab");
var TabList_1 = require("@mui/lab/TabList");
var TabPanel_1 = require("@mui/lab/TabPanel");
var Button_1 = require("@mui/material/Button");
var TabContext_1 = require("@mui/lab/TabContext");
var Typography_1 = require("@mui/material/Typography");
var CardContent_1 = require("@mui/material/CardContent");
var Dialog_1 = require("@mui/material/Dialog"); // Importez le composant Dialog
var DialogTitle_1 = require("@mui/material/DialogTitle");
var DialogContent_1 = require("@mui/material/DialogContent");
var DialogActions_1 = require("@mui/material/DialogActions");
var TextField_1 = require("@mui/material/TextField");
var axios_1 = require("axios");
var formik_1 = require("formik");
var mdi_material_ui_1 = require("mdi-material-ui");
var SaisiePresence = function () {
    var _a = react_1.useState('1'), value = _a[0], setValue = _a[1];
    var _b = react_1.useState([]), presence = _b[0], setPresence = _b[1];
    var _c = react_1.useState(null), selectedUser = _c[0], setSelectedUser = _c[1];
    var _d = react_1.useState(false), openHistoriqueDialog = _d[0], setOpenHistoriqueDialog = _d[1]; // État pour contrôler l'ouverture et la fermeture de la modale d'historique
    var _e = react_1.useState(false), openSaisieDialog = _e[0], setOpenSaisieDialog = _e[1]; // État pour contrôler l'ouverture et la fermeture de la modale de saisie
    var handleChange = function (event, newValue) {
        setValue(newValue);
    };
    var initialValues = {
        NombrePresence: 0,
        Mois: new Date()
    };
    //   function validate(formValues: FormValues): { [key: string]: string } {
    //     const errors: { [key: string]: string } = {};
    //     if (formValues.NombrePresence === "") {
    //       errors.NombrePresence = "Veuillez saisir votre ";
    //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.Email)) {
    //       errors.Email = "Champ invalide";
    //     }
    //     if (formValues.password === "") {
    //       errors.password = "Veuillez saisir votre Mot de passe";
    //     }
    //     return errors;
    //   }
    react_1.useEffect(function () {
        function fetchPresence() {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios_1["default"].get("http://localhost:5000/Presence")];
                        case 1:
                            response = _a.sent();
                            setPresence(response.data);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Erreur lors de la récupération des Presences :', error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        fetchPresence();
    }, []);
    var handleShowHistorique = function (user) {
        setSelectedUser(user);
        setOpenHistoriqueDialog(true);
    };
    var handleCloseHistorique = function () {
        setSelectedUser(null);
        setOpenHistoriqueDialog(false);
    };
    var handleShowSaisie = function (user) {
        setSelectedUser(user);
        setOpenSaisieDialog(true);
    };
    var handleCloseSaisie = function () {
        setSelectedUser(null);
        setOpenSaisieDialog(false);
    };
    var handleSaisiePresences = function () {
        // Logique pour saisir les présences pour l'utilisateur sélectionné
        console.log("Saisir les présences pour l'utilisateur sélectionné :", selectedUser);
        handleCloseSaisie(); // Fermer la modale après la saisie
    };
    var formik = formik_1.useFormik({
        initialValues: initialValues,
        onSubmit: function (formValues) { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].post("http://localhost:5000/Presence/yoldez.hfaiedh+0333@esen.tn?EmailUser=yoldez.hfaiedh+0333@esen.tn", formValues)];
                    case 1:
                        response = _a.sent();
                        console.log(response);
                        if (response.status === 200) {
                            console.log('success');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error('erreur api:', error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); }
    });
    var _f = formik.values, NombrePresence = _f.NombrePresence, Mois = _f.Mois;
    return (react_1["default"].createElement(mdi_material_ui_1.Card, null,
        react_1["default"].createElement(TabContext_1["default"], { value: value },
            react_1["default"].createElement(TabList_1["default"], { onChange: handleChange, "aria-label": 'card navigation example' },
                react_1["default"].createElement(Tab_1["default"], { value: '1', label: 'Historique des presences' }),
                react_1["default"].createElement(Tab_1["default"], { value: '2', label: 'La saisie des presences ' })),
            react_1["default"].createElement(CardContent_1["default"], null,
                react_1["default"].createElement(TabPanel_1["default"], { value: '1', sx: { p: 0 } }, presence.map(function (item, index) { return (react_1["default"].createElement("div", { key: index, style: { marginBottom: '16px', color: '#333', fontFamily: 'Verdana, Geneva, sans-serif' } },
                    react_1["default"].createElement(Typography_1["default"], { variant: 'h5', gutterBottom: true, style: { color: '#007bff', fontFamily: 'Arial, sans-serif', fontSize: '1.2rem' } },
                        "Employ\u00E9: ",
                        item.User),
                    react_1["default"].createElement(Button_1["default"], { variant: 'contained', onClick: function () { return handleShowHistorique(item.User); } }, "Historique des pr\u00E9sences"))); })),
                react_1["default"].createElement(TabPanel_1["default"], { value: '2', sx: { p: 0 } }, presence.map(function (presenceItem, index) { return (react_1["default"].createElement("div", { key: index },
                    react_1["default"].createElement(Typography_1["default"], { variant: 'h4', sx: { marginBottom: 2 } },
                        "User : ",
                        presenceItem.User),
                    react_1["default"].createElement(Button_1["default"], { variant: 'contained', onClick: function () { return handleShowSaisie(presenceItem.User); } }, "Saisir les pr\u00E9sences"))); })))),
        react_1["default"].createElement(Dialog_1["default"], { open: openHistoriqueDialog, onClose: handleCloseHistorique },
            react_1["default"].createElement(DialogTitle_1["default"], null,
                "Historique des pr\u00E9sences de ",
                selectedUser),
            react_1["default"].createElement(DialogContent_1["default"], null),
            react_1["default"].createElement(DialogActions_1["default"], null,
                react_1["default"].createElement(Button_1["default"], { onClick: handleCloseHistorique, variant: "contained" }, "Fermer"))),
        react_1["default"].createElement(Dialog_1["default"], { open: openSaisieDialog, onClose: handleCloseSaisie },
            react_1["default"].createElement(DialogTitle_1["default"], null,
                "Saisie des pr\u00E9sences pour ",
                selectedUser),
            react_1["default"].createElement(DialogContent_1["default"], null,
                react_1["default"].createElement(DialogTitle_1["default"], null,
                    "Saisie des pr\u00E9sences pour ",
                    selectedUser)),
            react_1["default"].createElement(DialogContent_1["default"], null,
                react_1["default"].createElement("form", { method: "Post", onSubmit: formik.handleSubmit },
                    react_1["default"].createElement(TextField_1["default"], { sx: { marginBottom: 4 }, required: true, id: "NombrePresence", variant: "outlined", placeholder: "Nombre de Presence", label: "Nombre de Presence", name: "NombrePresence", fullWidth: true, value: NombrePresence, onChange: formik.handleChange, onBlur: formik.handleBlur }),
                    react_1["default"].createElement(TextField_1["default"], { sx: { marginBottom: 4 }, required: true, id: "Mois", variant: "outlined", placeholder: "Mois", label: "Mois", name: "Mois", fullWidth: true, value: Mois, onChange: formik.handleChange, onBlur: formik.handleBlur }),
                    react_1["default"].createElement(DialogActions_1["default"], null,
                        react_1["default"].createElement(Button_1["default"], { onClick: handleCloseSaisie, variant: "contained" }, "Annuler"),
                        react_1["default"].createElement(Button_1["default"], { type: "submit", variant: "contained", disabled: !formik.isValid }, "Sauvegarder")))))));
};
exports["default"] = SaisiePresence;
