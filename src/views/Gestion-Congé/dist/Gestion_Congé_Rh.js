"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var react_1 = require("react");
var axios_1 = require("axios");
var Grid_1 = require("@mui/material/Grid");
var BriefcaseVariantOutline_1 = require("mdi-material-ui/BriefcaseVariantOutline");
var CardGestionConge_Rh_1 = require("src/@core/components/card-statistics/CardGestionConge-Rh");
var material_1 = require("@mui/material");
function GestionDesCongésRh() {
    var _this = this;
    // État pour stocker les demandes de congé
    var _a = react_1.useState([]), demandesConge = _a[0], setDemandesConge = _a[1]; // Provide type annotation
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1]; // État pour gérer le chargement initial
    // Effectue la requête API lors du chargement initial
    react_1.useEffect(function () {
        function fetchDemandesConge() {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios_1["default"].get("http://localhost:5000/demandeconge/EnAttente_DeConfirmation")];
                        case 1:
                            response = _a.sent();
                            setDemandesConge(response.data); // Met à jour l'état avec les données obtenues
                            setLoading(false); // Met à jour l'état loading après récupération des données
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Erreur lors de la récupération des demandes de congé :', error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        fetchDemandesConge(); // Appel de la fonction pour récupérer les données
    }, []); // Les crochets vides [] indiquent que ce code s'exécute une seule fois après le rendu initial
    // Fonction pour valider la décision
    var handleClickValider = function (_id) { return __awaiter(_this, void 0, void 0, function () {
        var updatedDemandes, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // Effectuez votre appel Axios pour valider la décision
                    return [4 /*yield*/, axios_1["default"].post("http://localhost:5000/demandeconge/ValiderDecision/" + _id + "?id=" + _id)];
                case 1:
                    // Effectuez votre appel Axios pour valider la décision
                    _a.sent();
                    updatedDemandes = demandesConge.map(function (demande) {
                        if (demande._id === _id) {
                            return __assign(__assign({}, demande), { statut: 'Acceptée' }); // Mettre à jour le statut de la demande
                        }
                        return demande;
                    });
                    setDemandesConge(updatedDemandes); // Met à jour l'état avec les nouvelles données
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Erreur lors de la validation de la décision :', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleClickInValider = function (_id) { return __awaiter(_this, void 0, void 0, function () {
        var updatedDemandes, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // Effectuez votre appel Axios pour valider la décision
                    return [4 /*yield*/, axios_1["default"].post("http://localhost:5000/demandeconge/InvaliderDecision/" + _id + "?id=" + _id)];
                case 1:
                    // Effectuez votre appel Axios pour valider la décision
                    _a.sent();
                    updatedDemandes = demandesConge.map(function (demande) {
                        if (demande._id === _id) {
                            return __assign(__assign({}, demande), { statut: 'Refusée' }); // Mettre à jour le statut de la demande
                        }
                        return demande;
                    });
                    setDemandesConge(updatedDemandes); // Met à jour l'état avec les nouvelles données
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Erreur lors de la validation de la décision :', error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(Grid_1["default"], { container: true, spacing: 2 }, loading ? ( // Afficher un message de chargement tant que les données sont en cours de chargement
    react_1["default"].createElement(Grid_1["default"], { item: true, xs: 12 },
        react_1["default"].createElement("p", null, "Chargement en cours..."))) : demandesConge.length === 0 ? ( // Afficher un message si aucune demande de congé n'existe
    react_1["default"].createElement(Grid_1["default"], { item: true, xs: 12 },
        react_1["default"].createElement("p", null, "Pas de demande de cong\u00E9 pour le moment."))) : (demandesConge.map(function (demande, index) { return (react_1["default"].createElement(Grid_1["default"], { key: index, item: true, xs: 6 },
        react_1["default"].createElement(CardGestionConge_Rh_1["default"], { id: demande._id, User: demande.User, icon: react_1["default"].createElement(BriefcaseVariantOutline_1["default"], null), typeConge: demande.TypeConge, color: demande.statut === 'En cours' ? 'warning' : (demande.statut === 'Acceptée En attente de confirmation' || demande.statut === 'Refusée En attente de confirmation' || demande.statut === 'Traitée par le Responsable Rh' ? 'Advwarning' : (demande.statut === 'Acceptée' ? 'success' : (demande.statut === 'Refusée' ? 'error' : 'primary'))), NomDemande: demande.NomDemande, NombreJours: demande.NombreJours, Date_debut: demande.Date_debut, Date_fin: demande.Date_fin, Statut: demande.statut }),
        react_1["default"].createElement(material_1.Button, { variant: "contained", color: "primary", sx: { mt: -18, ml: 3 }, onClick: function () { return handleClickValider(demande._id); } }, "Valider la d\u00E9cision"),
        react_1["default"].createElement(material_1.Button, { variant: "contained", color: "primary", sx: { mt: -18, ml: 3 }, onClick: function () { return handleClickValider(demande._id); } }, "Invalider la d\u00E9cision"))); }))));
}
exports["default"] = GestionDesCongésRh;
