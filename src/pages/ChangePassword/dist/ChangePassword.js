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
var Box_1 = require("@mui/material/Box");
var TextField_1 = require("@mui/material/TextField");
var formik_1 = require("formik");
var Button_1 = require("@mui/material/Button");
var material_1 = require("@mui/material");
var router_1 = require("next/router");
var axios_1 = require("axios");
var CustomToast_1 = require("src/@core/components/Alerts/CustomToast");
var BlankLayout_1 = require("src/@core/layouts/BlankLayout");
var FooterIllustration_1 = require("src/views/pages/auth/FooterIllustration");
var styles_1 = require("@mui/material/styles");
var Card_1 = require("@mui/material/Card");
var react_hot_toast_1 = require("react-hot-toast");
var Card = styles_1.styled(Card_1["default"])(function (_a) {
    var _b;
    var theme = _a.theme;
    return (_b = {},
        _b[theme.breakpoints.up('sm')] = { width: '28rem' },
        _b);
});
var LinkStyled = styles_1.styled('a')(function (_a) {
    var theme = _a.theme;
    return ({
        fontSize: '0.875rem',
        textDecoration: 'none',
        color: theme.palette.primary.main
    });
});
var ChangePassword = function () {
    var theme = styles_1.useTheme();
    var router = router_1.useRouter();
    var notify = function (message) {
        react_hot_toast_1.toast(message);
    };
    var initialValues = {
        Email: ''
    };
    var validate = function (values) {
        var errors = {};
        if (!values.Email) {
            errors.Email = 'Champ obligatoire';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
            errors.Email = 'Champ invalide';
        }
        return errors;
    };
    var formik = formik_1.useFormik({
        initialValues: initialValues,
        validate: validate,
        onSubmit: function (formValues) { return __awaiter(void 0, void 0, void 0, function () {
            var res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].post('http://localhost:5000/auth/reset-request', formValues)];
                    case 1:
                        res = _a.sent();
                        if (res.status === 200) {
                            notify('Veuillez vérifier votre boîte mail');
                        }
                        else {
                            notify('Une erreur est survenue');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        notify('Une erreur est survenue');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); }
    });
    var Email = formik.values.Email;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(CustomToast_1["default"], null),
        react_1["default"].createElement(Box_1["default"], { className: 'content-center' },
            react_1["default"].createElement(Card, { sx: { zIndex: 1 } },
                react_1["default"].createElement(material_1.CardContent, { sx: { padding: theme.spacing(12, 9, 7) + " !important" } },
                    react_1["default"].createElement(Box_1["default"], { sx: { mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                        react_1["default"].createElement(material_1.Typography, { variant: 'h6', sx: {
                                ml: 3,
                                lineHeight: 1,
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                fontSize: '1.5rem !important'
                            } }, "R\u00E9cup\u00E9ration du mot de passe")),
                    react_1["default"].createElement(Box_1["default"], { sx: { mb: 6 } },
                        react_1["default"].createElement(material_1.Typography, { variant: 'h5', sx: { fontWeight: 600, marginBottom: 1.5 } })),
                    react_1["default"].createElement("form", { noValidate: true, autoComplete: 'off', onSubmit: formik.handleSubmit },
                        react_1["default"].createElement(TextField_1["default"], { sx: { marginBottom: 4 }, required: true, id: "Email", variant: "outlined", placeholder: "Email", label: "Email", name: "Email", fullWidth: true, value: Email, onChange: formik.handleChange, onBlur: formik.handleBlur, error: formik.touched.Email && Boolean(formik.errors.Email), helperText: formik.touched.Email && formik.errors.Email }),
                        react_1["default"].createElement(Button_1["default"], { type: 'submit', fullWidth: true, size: 'large', variant: 'contained', sx: { marginBottom: 7 }, disabled: !formik.isValid }, "Envoyer un Email de r\u00E9cup\u00E9ration")))),
            react_1["default"].createElement(FooterIllustration_1["default"], null))));
};
ChangePassword.getLayout = function (page) { return react_1["default"].createElement(BlankLayout_1["default"], null, page); };
exports["default"] = ChangePassword;
