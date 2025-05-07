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
var material_1 = require("@mui/material");
var EyeOutline_1 = require("mdi-material-ui/EyeOutline");
var EyeOffOutline_1 = require("mdi-material-ui/EyeOffOutline");
var formik_1 = require("formik");
var router_1 = require("next/router");
var axios_1 = require("axios");
var Ajout_users = function () {
    var _a = react_1.useState({
        password: '',
        password2: '',
        showPassword: false,
        showPassword2: false
    }), values = _a[0], setValues = _a[1];
    var handlePasswordChange = function (prop) { return function (event) {
        var _a;
        setValues(__assign(__assign({}, values), (_a = {}, _a[prop] = event.target.value, _a)));
    }; };
    var handleClickShowPassword = function () {
        setValues(__assign(__assign({}, values), { showPassword: !values.showPassword }));
    };
    var handleMouseDownPassword = function (event) {
        event.preventDefault();
    };
    var handleConfirmChange = function (prop) { return function (event) {
        var _a;
        setValues(__assign(__assign({}, values), (_a = {}, _a[prop] = event.target.value, _a)));
    }; };
    var handleClickShowConfirmPassword = function () {
        setValues(__assign(__assign({}, values), { showPassword2: !values.showPassword2 }));
    };
    var handleMouseDownConfirmPassword = function (event) {
        event.preventDefault();
    };
    var initialValues = {
        Email: '',
        password: '',
        Nom: '',
        Prenom: '',
        Role: null,
        NomDepartement: null
    };
    function validate(formValues) {
        var errors = {};
        if (formValues.Nom === '') {
            errors.Nom = 'Veuillez saisir le nom';
        }
        if (formValues.Role === null) {
            errors.Role = 'Veuillez saisir le rôle';
        }
        if (formValues.Prenom === '') {
            errors.Prenom = 'Veuillez saisir le prénom';
        }
        return errors;
    }
    var formik = formik_1.useFormik({
        initialValues: initialValues,
        onSubmit: function (values) { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].post("http://localhost:5000/auth/register", values, { headers: { 'Content-Type': 'application/json' } })];
                    case 1:
                        response = _a.sent();
                        if (response.status === 201) {
                            console.log('Réponse réussie:', response.data);
                            router_1["default"].push('/500');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Erreur API:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        validate: validate
    });
    var _b = formik.values, Nom = _b.Nom, Prenom = _b.Prenom, Email = _b.Email, password = _b.password, Role = _b.Role, NomDepartement = _b.NomDepartement;
    var roles = [
        {
            value: "admin",
            label: "Admin"
        },
        {
            value: "responsable RH",
            label: "Responsable HR"
        },
        {
            value: "Employe",
            label: "Employe"
        },
        {
            value: "Manager",
            label: "Manager"
        },
    ];
    var departements = [
        {
            value: "marketing",
            label: "marketing"
        },
        {
            value: "responsable RH",
            label: "Responsable HR"
        },
        {
            value: "Employe",
            label: "Employe"
        },
        {
            value: "Manager",
            label: "Manager"
        },
    ];
    return (react_1["default"].createElement(material_1.Card, null,
        react_1["default"].createElement(material_1.CardHeader, { title: 'Ajouter un utilisateur', titleTypographyProps: { variant: 'h6' } }),
        react_1["default"].createElement(material_1.Divider, { sx: { margin: 0 } }),
        react_1["default"].createElement("form", { method: "POST", onSubmit: formik.handleSubmit },
            react_1["default"].createElement(material_1.CardContent, null,
                react_1["default"].createElement(material_1.Grid, { container: true, spacing: 5 },
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12 },
                        react_1["default"].createElement(material_1.Typography, { variant: 'body2', sx: { fontWeight: 600 } }, "1. Account Details")),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, sm: 6 },
                        react_1["default"].createElement(material_1.TextField, { fullWidth: true, type: 'Email', id: 'Email', label: 'Email', placeholder: 'Email', value: Email, onChange: formik.handleChange, onBlur: formik.handleBlur })),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, sm: 6 },
                        react_1["default"].createElement(material_1.FormControl, { fullWidth: true },
                            react_1["default"].createElement(material_1.InputLabel, null, "Password"),
                            react_1["default"].createElement(material_1.OutlinedInput, { onChange: formik.handleChange, onBlur: formik.handleBlur, label: 'Password', value: password, id: 'password', type: values.showPassword ? 'text' : 'password', endAdornment: react_1["default"].createElement(material_1.InputAdornment, { position: 'end' },
                                    react_1["default"].createElement(material_1.IconButton, { edge: 'end', onClick: handleClickShowPassword, onMouseDown: handleMouseDownPassword, "aria-label": 'toggle password visibility' }, values.showPassword ? react_1["default"].createElement(EyeOutline_1["default"], null) : react_1["default"].createElement(EyeOffOutline_1["default"], null))) }))),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12 },
                        react_1["default"].createElement(material_1.Divider, { sx: { marginBottom: 0 } })),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12 },
                        react_1["default"].createElement(material_1.Typography, { variant: 'body2', sx: { fontWeight: 600 } }, "2. Personal Info")),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, sm: 6 },
                        react_1["default"].createElement(material_1.TextField, { fullWidth: true, label: 'Nom', placeholder: 'Nom', id: "Nom", value: Nom, onChange: formik.handleChange, onBlur: formik.handleBlur })),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, sm: 6 },
                        react_1["default"].createElement(material_1.TextField, { fullWidth: true, label: 'Prenom', placeholder: 'Prenom', id: "Prenom", value: Prenom, onChange: formik.handleChange, onBlur: formik.handleBlur })),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, sm: 6 },
                        react_1["default"].createElement(material_1.FormControl, { fullWidth: true },
                            react_1["default"].createElement(material_1.InputLabel, { id: 'Role' }, "Role"),
                            react_1["default"].createElement(material_1.Select, { id: "Role", value: Role, name: "Role", onChange: function (event) { return formik.setFieldValue("Role", event.target.value); } }, roles.map(function (option) { return (react_1["default"].createElement(material_1.MenuItem, { key: option.value, value: option.value }, option.label)); })))),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, sm: 6 },
                        react_1["default"].createElement(material_1.FormControl, { fullWidth: true },
                            react_1["default"].createElement(material_1.InputLabel, { id: 'NomDepartement' }, "Departement"),
                            react_1["default"].createElement(material_1.Select, { id: "NomDepartement", value: NomDepartement, name: "NomDepartement", onChange: function (event) { return formik.setFieldValue("NomDepartement", event.target.value); } }, departements.map(function (option) { return (react_1["default"].createElement(material_1.MenuItem, { key: option.value, value: option.value }, option.label)); })))))),
            react_1["default"].createElement(material_1.Divider, { sx: { margin: 0 } }),
            react_1["default"].createElement(material_1.CardActions, null,
                react_1["default"].createElement(material_1.Button, { size: 'large', type: 'submit', sx: { mr: 2 }, variant: 'contained' }, "Submit"),
                react_1["default"].createElement(material_1.Button, { size: 'large', color: 'secondary', variant: 'outlined' }, "Cancel")))));
};
exports["default"] = Ajout_users;
