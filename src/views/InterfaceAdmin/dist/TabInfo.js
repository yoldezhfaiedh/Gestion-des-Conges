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
var formik_1 = require("formik"); // Importez useFormik de Formik
var material_1 = require("@mui/material");
var axios_1 = require("axios");
var EditUserDialog = function (_a) {
    var open = _a.open, handleClose = _a.handleClose, user = _a.user;
    var _b = react_1.useState(null), editedUser = _b[0], setEditedUser = _b[1];
    react_1.useEffect(function () {
        if (user) {
            setEditedUser(user);
        }
    }, [user]);
    // Initialisez Formik
    var formik = formik_1.useFormik({
        initialValues: {
            Role: (editedUser === null || editedUser === void 0 ? void 0 : editedUser.Role) || '',
            departement: (editedUser === null || editedUser === void 0 ? void 0 : editedUser.departement) || ''
        },
        onSubmit: function (values) { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!editedUser) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1["default"].put("http://localhost:5000/users/" + editedUser.Email, editedUser)];
                    case 1:
                        response = _a.sent();
                        if (response.status === 200) {
                            handleClose();
                        }
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }
    });
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        if (name) {
            setEditedUser(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), (_a = {}, _a[name] = value, _a)));
            });
        }
    };
    return (react_1["default"].createElement(material_1.Dialog, { open: open, onClose: handleClose },
        react_1["default"].createElement(material_1.DialogTitle, null, "Modifier l'utilisateur"),
        react_1["default"].createElement(material_1.DialogContent, null,
            react_1["default"].createElement("form", { onSubmit: formik.handleSubmit },
                " ",
                react_1["default"].createElement(material_1.Grid, { container: true, spacing: 2 },
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12 },
                        react_1["default"].createElement(material_1.FormControl, { fullWidth: true },
                            react_1["default"].createElement(material_1.InputLabel, null, "Role"),
                            react_1["default"].createElement(material_1.Select, { name: "Role", value: formik.values.Role, onChange: formik.handleChange },
                                react_1["default"].createElement(material_1.MenuItem, { value: "admin" }, "Admin"),
                                react_1["default"].createElement(material_1.MenuItem, { value: "responsable RH" }, "Responsable RH"),
                                react_1["default"].createElement(material_1.MenuItem, { value: "Employe" }, "Employ\u00E9"),
                                react_1["default"].createElement(material_1.MenuItem, { value: "Manager" }, "Manager")))),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12 },
                        react_1["default"].createElement(material_1.FormControl, { fullWidth: true },
                            react_1["default"].createElement(material_1.InputLabel, null, "D\u00E9partement"),
                            react_1["default"].createElement(material_1.Select, { name: "departement" // Utilisez le bon nom d'attribut
                                , value: formik.values.departement, onChange: formik.handleChange },
                                react_1["default"].createElement(material_1.MenuItem, { value: "dep" }, "D\u00E9partement 1"),
                                react_1["default"].createElement(material_1.MenuItem, { value: "de RH" }, "D\u00E9partement 2"),
                                react_1["default"].createElement(material_1.MenuItem, { value: "de" }, "D\u00E9partement 3"),
                                react_1["default"].createElement(material_1.MenuItem, { value: "der" }, "D\u00E9partement 4"))))),
                react_1["default"].createElement(material_1.DialogActions, null,
                    react_1["default"].createElement(material_1.Button, { onClick: handleClose }, "Annuler"),
                    react_1["default"].createElement(material_1.Button, { type: "submit", color: "primary" }, "Enregistrer les modifications"))))));
};
exports["default"] = EditUserDialog;
