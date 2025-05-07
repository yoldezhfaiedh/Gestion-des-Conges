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
var Box_1 = require("@mui/material/Box");
var TextField_1 = require("@mui/material/TextField");
var formik_1 = require("formik");
var Button_1 = require("@mui/material/Button");
var material_1 = require("@mui/material");
var link_1 = require("next/link");
var InputLabel_1 = require("@mui/material/InputLabel");
var OutlinedInput_1 = require("@mui/material/OutlinedInput");
var IconButton_1 = require("@mui/material/IconButton");
var EyeOffOutline_1 = require("mdi-material-ui/EyeOffOutline");
var InputAdornment_1 = require("@mui/material/InputAdornment");
var Visibility_1 = require("@mui/icons-material/Visibility");
var router_1 = require("next/router");
var cookies_next_1 = require("cookies-next");
var styles_1 = require("@mui/material/styles");
var Card_1 = require("@mui/material/Card");
var FormControl_1 = require("@mui/material/FormControl");
var BlankLayout_1 = require("src/@core/layouts/BlankLayout");
var FooterIllustration_1 = require("src/views/pages/auth/FooterIllustration");
var axios_1 = require("axios");
var CustomToast_1 = require("src/@core/components/Alerts/CustomToast");
var auth_utils_1 = require("src/auth.utils");
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
var FormControl = styles_1.styled(FormControl_1["default"])({
    width: '100%'
});
var LoginPage = function () {
    var _a = react_1.useState({
        password: '',
        showPassword: false
    }), values = _a[0], setValues = _a[1];
    var _b = react_1.useState(""), userRole = _b[0], setUserRole = _b[1]; // Default role
    var theme = styles_1.useTheme();
    var router = router_1.useRouter();
    var handleMouseDownPassword = function (event) {
        event.preventDefault();
    };
    var handleClickShowPassword = function () {
        setValues(__assign(__assign({}, values), { showPassword: !values.showPassword }));
    };
    var notify = function (message) {
        react_hot_toast_1["default"](message);
    };
    var initialValues = {
        Email: "",
        password: ""
    };
    var validate = function (values) {
        var errors = {};
        if (!values.Email) {
            errors.Email = ('Champ obligatoire');
        }
        else if (values.Email !== 'superadmin') {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
                errors.Email = ('Champ invalide');
            }
        }
        if (!values.password) {
            errors.password = ('Champ obligatoire');
        }
        return errors;
    };
    var handleClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var role, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, auth_utils_1.getUserRole()];
                case 1:
                    role = _a.sent();
                    setUserRole(role); // Set retrieved role
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error retrieving user role:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        handleClick();
    }, []);
    react_1.useEffect(function () {
        console.log('userRole:', userRole);
    }, [userRole]);
    var formik = formik_1.useFormik({
        initialValues: initialValues,
        onSubmit: function (formValues) { return __awaiter(void 0, void 0, void 0, function () {
            var res, role, error_2, axiosError;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"]({
                                url: "http://localhost:5000/auth/login",
                                method: 'POST',
                                data: formValues,
                                headers: { 'content-type': 'application/json' }
                            })];
                    case 1:
                        res = _c.sent();
                        if (res.status === 200) {
                            cookies_next_1.deleteCookie('token');
                            cookies_next_1.setCookie('token', res.data.token, { maxAge: 3600 * 24 });
                            role = res.data.user.Role;
                            if (role === 'admin' || role === 'Manager' || role === 'Responsable Rh' || role === 'Employe') {
                                cookies_next_1.deleteCookie('token');
                                cookies_next_1.setCookie('token', res.data.token, { maxAge: 3600 * 24 });
                                router.push('/');
                                //   setTimeout(() => {
                                //   window.location.reload();
                                // }, 500);
                            }
                        }
                        else {
                            notify('Une erreur est survenue');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _c.sent();
                        axiosError = error_2;
                        if (((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                            notify('Cet utilisateur doit changer son mot de passe');
                            // router.push({
                            //   pathname: '/reset-password',
                            //   query: { email: formik.values.email }
                            // });
                        }
                        else if ((_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.data) {
                            notify('Identifiants invalides');
                        }
                        else {
                            notify('Une erreur est survenue');
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        validate: validate
    });
    var _c = formik.values, Email = _c.Email, password = _c.password;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(CustomToast_1["default"], null),
        react_1["default"].createElement(Box_1["default"], { className: 'content-center' },
            react_1["default"].createElement(Card, { sx: { zIndex: 1 } },
                react_1["default"].createElement(material_1.CardContent, { sx: { padding: function (theme) { return theme.spacing(12, 9, 7) + " !important"; } } },
                    react_1["default"].createElement(Box_1["default"], { sx: { mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                        react_1["default"].createElement(material_1.Typography, { variant: 'h6', sx: {
                                ml: 3,
                                lineHeight: 1,
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                fontSize: '1.5rem !important'
                            } }, "Connexion")),
                    react_1["default"].createElement(Box_1["default"], { sx: { mb: 6 } },
                        react_1["default"].createElement(material_1.Typography, { variant: 'h5', sx: { fontWeight: 600, marginBottom: 1.5 } }, "Welcome ! \uD83D\uDC4B\uD83C\uDFFB")),
                    react_1["default"].createElement("form", { noValidate: true, autoComplete: 'off', onSubmit: formik.handleSubmit },
                        react_1["default"].createElement(TextField_1["default"], { sx: { marginBottom: 4 }, required: true, id: "Email", variant: "outlined", placeholder: "Email", label: "Email", name: "Email", fullWidth: true, value: Email, onChange: formik.handleChange, onBlur: formik.handleBlur, error: formik.touched.Email && Boolean(formik.errors.Email), helperText: formik.touched.Email && formik.errors.Email }),
                        react_1["default"].createElement(FormControl, { fullWidth: true },
                            react_1["default"].createElement(InputLabel_1["default"], null, "Password"),
                            react_1["default"].createElement(OutlinedInput_1["default"], { sx: { marginTop: 3, marginBottom: 4 }, required: true, placeholder: "Password", style: { marginLeft: '10px', width: "100%" }, label: 'Password', id: 'password', onChange: formik.handleChange, onBlur: formik.handleBlur, value: password, error: formik.touched.password && Boolean(formik.errors.password), type: values.showPassword ? 'text' : 'password', endAdornment: react_1["default"].createElement(InputAdornment_1["default"], { position: 'end' },
                                    react_1["default"].createElement(IconButton_1["default"], { edge: 'end', onClick: handleClickShowPassword, onMouseDown: handleMouseDownPassword, "aria-label": 'toggle password visibility' }, values.showPassword ? react_1["default"].createElement(Visibility_1["default"], null) : react_1["default"].createElement(EyeOffOutline_1["default"], null))) })),
                        react_1["default"].createElement(Box_1["default"], { sx: { mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' } },
                            react_1["default"].createElement(link_1["default"], { passHref: true, href: '/ChangePassword' },
                                react_1["default"].createElement(LinkStyled, null, "Mot de passe oubli\u00E9?"))),
                        react_1["default"].createElement(Button_1["default"], { type: 'submit', fullWidth: true, size: 'large', variant: 'contained', sx: { marginBottom: 7 }, disabled: !formik.isValid }, "Login")))),
            react_1["default"].createElement(FooterIllustration_1["default"], null))));
};
LoginPage.getLayout = function (page) { return react_1["default"].createElement(BlankLayout_1["default"], null, page); };
exports["default"] = LoginPage;
/**const handleLinkClick = async (e) => {
   e.preventDefault();

   try {
     const response = await axios.post(
       process.env.NEXT_PUBLIC_HOSTAPI2,
       { headers: { 'Content-Type': 'application/json' } }
     );

     if (response.status === 200) {
       console.log('Réponse réussie:', response.data);
       // Faites quelque chose avec la réponse réussie

     } else if (response.status === 201) {
       CustomToast({ message: ('Une erreur est survenue'), type: 'error' })
       console.log('Token:', response.data.token);
     }
   } catch (error) {
     console.error('Erreur API:', error);
   }
 };*/
