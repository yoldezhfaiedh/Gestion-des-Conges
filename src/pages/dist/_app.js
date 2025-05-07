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
var head_1 = require("next/head");
var router_1 = require("next/router");
// ** Loader Import
var nprogress_1 = require("nprogress");
// ** Emotion Imports
var react_1 = require("@emotion/react");
// ** Config Imports
var themeConfig_1 = require("src/configs/themeConfig");
// ** Component Imports
var ThemeComponent_1 = require("src/@core/theme/ThemeComponent");
// ** Contexts
var settingsContext_1 = require("src/@core/context/settingsContext");
// ** Utils Imports
var create_emotion_cache_1 = require("src/@core/utils/create-emotion-cache");
// ** React Perfect Scrollbar Style
require("react-perfect-scrollbar/dist/css/styles.css");
var react_2 = require("react");
var auth_utils_1 = require("src/auth.utils");
var AdminLayout_1 = require("src/layouts-Admin/AdminLayout");
var UserLayout_1 = require("src/layouts/UserLayout");
var clientSideEmotionCache = create_emotion_cache_1.createEmotionCache();
// ** Pace Loader
if (themeConfig_1["default"].routingLoader) {
    router_1.Router.events.on('routeChangeStart', function () {
        nprogress_1["default"].start();
    });
    router_1.Router.events.on('routeChangeError', function () {
        nprogress_1["default"].done();
    });
    router_1.Router.events.on('routeChangeComplete', function () {
        nprogress_1["default"].done();
    });
}
// ** Configure JSS & ClassName
var App = function (props) {
    var _a, _b;
    var Component = props.Component, _c = props.emotionCache, emotionCache = _c === void 0 ? clientSideEmotionCache : _c, pageProps = props.pageProps;
    var _d = react_2.useState(''), userRole = _d[0], setUserRole = _d[1]; // Default role
    var handleClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var role, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, auth_utils_1.getUserRole()];
                case 1:
                    role = _a.sent();
                    if (role == "admin") {
                        setUserRole("1");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching user role:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_2.useEffect(function () {
        handleClick();
    }, []);
    react_2.useEffect(function () {
        console.log('userRole:', userRole);
    }, [userRole]);
    console.log(userRole);
    var getLayout = userRole === '1'
        ? (_a = Component.getLayout) !== null && _a !== void 0 ? _a : (function (page) { return React.createElement(AdminLayout_1["default"], null, page); }) : (_b = Component.getLayout) !== null && _b !== void 0 ? _b : (function (page) { return React.createElement(UserLayout_1["default"], null, page); });
    //   // Configure NProgress loader
    if (themeConfig_1["default"].routingLoader) {
        router_1.Router.events.on('routeChangeStart', function () { return nprogress_1["default"].start(); });
        router_1.Router.events.on('routeChangeError', function () { return nprogress_1["default"].done(); });
        router_1.Router.events.on('routeChangeComplete', function () { return nprogress_1["default"].done(); });
    }
    return (
    //     <div>
    //     <button onClick={handleClick}>Fetch User Role</button>
    //   </div>
    React.createElement(react_1.CacheProvider, { value: emotionCache },
        React.createElement(head_1["default"], null,
            React.createElement("title", null, "" + themeConfig_1["default"].templateName),
            React.createElement("meta", { name: 'description', content: "" + themeConfig_1["default"].templateName }),
            React.createElement("meta", { name: 'keywords', content: 'Material Design, MUI, Admin Template, React Admin Template' }),
            React.createElement("meta", { name: 'viewport', content: 'initial-scale=1, width=device-width' })),
        React.createElement(settingsContext_1.SettingsProvider, null,
            React.createElement(settingsContext_1.SettingsConsumer, null, function (_a) {
                var settings = _a.settings;
                return React.createElement(ThemeComponent_1["default"], { settings: settings }, getLayout(React.createElement(Component, __assign({}, pageProps))));
            }))));
};
exports["default"] = App;
