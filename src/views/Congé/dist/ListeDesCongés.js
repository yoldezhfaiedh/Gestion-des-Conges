"use strict";
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
var CardConge_1 = require("src/@core/components/card-statistics/CardConge");
var material_1 = require("@mui/material");
var mdi_material_ui_1 = require("mdi-material-ui");
function ListeDesCongés() {
    var _this = this;
    var _a = react_1.useState([]), demandesConge = _a[0], setDemandesConge = _a[1];
    var _b = react_1.useState(1), currentPage = _b[0], setCurrentPage = _b[1];
    var _c = react_1.useState(1), totalPages = _c[0], setTotalPages = _c[1];
    var _d = react_1.useState(true), loading = _d[0], setLoading = _d[1];
    var _e = react_1.useState([]), conges = _e[0], setConges = _e[1];
    var _f = react_1.useState(''), searchTerm = _f[0], setSearchTerm = _f[1];
    var _g = react_1.useState('date_fin'), selectedFilter = _g[0], setSelectedFilter = _g[1];
    react_1.useEffect(function () {
        function fetchDemandesConge() {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios_1["default"].get("http://localhost:5000/demandeconge/findall?page=" + currentPage)];
                        case 1:
                            response = _a.sent();
                            setDemandesConge(response.data.demandes);
                            setTotalPages(response.data.totalPages);
                            setLoading(false);
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
        fetchDemandesConge();
    }, [currentPage]);
    var handleNextPage = function () {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    var handlePrevPage = function () {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    var fetchConges = function () { return __awaiter(_this, void 0, void 0, function () {
        var queryParam, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    queryParam = '';
                    if (selectedFilter === 'date_fin') {
                        queryParam = "date_fin=" + searchTerm;
                    }
                    else if (selectedFilter === 'date_Debut') {
                        queryParam = "date_Debut=" + searchTerm;
                    }
                    else if (selectedFilter === 'statut') {
                        queryParam = "statut=" + searchTerm;
                    }
                    else if (selectedFilter === 'Nom') {
                        queryParam = "Nom=" + searchTerm;
                    }
                    else if (selectedFilter === 'TypeConge') {
                        queryParam = "TypeConge=" + searchTerm;
                    }
                    return [4 /*yield*/, fetch("http://localhost:5000/demandeconge/" + selectedFilter + "/?" + queryParam)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    setConges(data);
                    return [3 /*break*/, 4];
                case 3:
                    console.error('Erreur lors de la récupération des congés:', response.statusText);
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.error('Erreur lors de la récupération des congés:', error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleSearch = function () {
        fetchConges();
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(material_1.Box, { sx: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
            react_1["default"].createElement(material_1.Box, { sx: { mr: 2, display: 'flex', alignItems: 'center' } },
                react_1["default"].createElement(material_1.Select, { value: selectedFilter, onChange: function (e) { return setSelectedFilter(e.target.value); }, sx: { marginRight: 1 } },
                    react_1["default"].createElement(material_1.MenuItem, { value: "date_fin" }, "Date de fin"),
                    react_1["default"].createElement(material_1.MenuItem, { value: "date_Debut" }, "Date de D\u00E9but"),
                    react_1["default"].createElement(material_1.MenuItem, { value: "statut" }, "Statut"),
                    react_1["default"].createElement(material_1.MenuItem, { value: "Nom" }, "Nom"),
                    react_1["default"].createElement(material_1.MenuItem, { value: "typeConge" }, "Type de Cong\u00E9")),
                react_1["default"].createElement(material_1.TextField, { size: 'small', sx: { '& .MuiOutlinedInput-root': { borderRadius: 4 } }, InputProps: {
                        startAdornment: (react_1["default"].createElement(material_1.InputAdornment, { position: 'start' },
                            react_1["default"].createElement(mdi_material_ui_1.Magnify, { fontSize: 'small' })))
                    }, placeholder: "2024-10-17", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); } })),
            react_1["default"].createElement(material_1.Button, { onClick: handleSearch, variant: "contained" }, "Rechercher")),
        react_1["default"].createElement(Grid_1["default"], { container: true, spacing: 2 }, loading ? (react_1["default"].createElement("p", null, "Loading...")) : (searchTerm === '' ? ( // Si aucun terme de recherche n'est saisi, affiche les congés normalement
        demandesConge.map(function (demande, index) { return (react_1["default"].createElement(Grid_1["default"], { key: index, item: true, xs: 6 },
            react_1["default"].createElement(CardConge_1["default"], { User: demande.User, icon: react_1["default"].createElement(BriefcaseVariantOutline_1["default"], null), typeConge: demande.TypeConge, color: demande.statut === 'En cours'
                    ? 'warning'
                    : demande.statut === 'Acceptée En attente de confirmation' ||
                        demande.statut === 'Refusée En attente de confirmation' ||
                        demande.statut === 'Traitée par le Responsable Rh'
                        ? 'Advwarning'
                        : demande.statut === 'Acceptée'
                            ? 'success'
                            : demande.statut === 'Refusée'
                                ? 'error'
                                : 'primary', NomDemande: demande.NomDemande, NombreJours: demande.NombreJours, Date_debut: demande.Date_debut, Date_fin: demande.Date_fin, Statut: demande.statut }))); })) : (
        // Sinon, affiche les congés correspondant à la recherche
        conges.map(function (conge, index) { return (react_1["default"].createElement(Grid_1["default"], { key: index, item: true, xs: 6 },
            react_1["default"].createElement(CardConge_1["default"], { User: conge.User, icon: react_1["default"].createElement(BriefcaseVariantOutline_1["default"], null), typeConge: conge.TypeConge, color: conge.statut === 'En cours'
                    ? 'warning'
                    : conge.statut === 'Acceptée En attente de confirmation' ||
                        conge.statut === 'Refusée En attente de confirmation' ||
                        conge.statut === 'Traitée par le Responsable Rh'
                        ? 'Advwarning'
                        : conge.statut === 'Acceptée'
                            ? 'success'
                            : conge.statut === 'Refusée'
                                ? 'error'
                                : 'primary', NomDemande: conge.NomDemande, NombreJours: conge.NombreJours, Date_debut: conge.Date_debut, Date_fin: conge.Date_fin, Statut: conge.statut }))); })))),
        react_1["default"].createElement("div", { style: { display: 'flex', justifyContent: 'flex-end', marginTop: '10px' } },
            react_1["default"].createElement(material_1.Button, { variant: "contained", sx: { ml: 2, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', fontWeight: 'bold' }, onClick: handlePrevPage, disabled: currentPage === 1 }, "Previous Page"),
            react_1["default"].createElement(material_1.Button, { variant: "contained", sx: { ml: 2, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', fontWeight: 'bold' }, onClick: handleNextPage, disabled: currentPage === totalPages }, "Next Page"))));
}
exports["default"] = ListeDesCongés;
