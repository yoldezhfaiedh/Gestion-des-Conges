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
var Box_1 = require("@mui/material/Box");
var Card_1 = require("@mui/material/Card");
var Avatar_1 = require("@mui/material/Avatar");
var Typography_1 = require("@mui/material/Typography");
var CardHeader_1 = require("@mui/material/CardHeader");
var CardContent_1 = require("@mui/material/CardContent");
var HistoriquePresence = function () {
    var _a = react_1.useState([]), data = _a[0], setData = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    react_1.useEffect(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].get('http://localhost:5000/presence')];
                    case 1:
                        response = _a.sent();
                        setData(response.data);
                        setLoading(false);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching data:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    var getAvatarText = function (month) {
        // Map the numeric month to its equivalent text representation
        switch (month) {
            case 1:
                return 'Janvier';
            case 2:
                return 'Février';
            case 3:
                return 'Mars';
            case 4:
                return 'Avril';
            case 5:
                return 'Mai';
            case 6:
                return 'Juin';
            case 7:
                return 'Juillet';
            case 8:
                return 'Août';
            case 9:
                return 'Septembre';
            case 10:
                return 'Octobre';
            case 11:
                return 'Novembre';
            case 12:
                return 'Décembre';
            default:
                return ''; // Handle the default case
        }
    };
    var getFormattedDate = function (date) {
        return date.toLocaleString('fr-FR', { year: 'numeric', month: 'long' });
    };
    return (react_1["default"].createElement(Card_1["default"], null,
        react_1["default"].createElement(CardHeader_1["default"], { title: 'Vos Pr\u00E9sences', titleTypographyProps: { sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } } }),
        react_1["default"].createElement(CardContent_1["default"], { sx: { pt: function (theme) { return theme.spacing(2) + " !important"; } } }, loading ? (react_1["default"].createElement(Typography_1["default"], null, "Loading...")) : (data.map(function (item, index) { return (react_1["default"].createElement(Box_1["default"], { key: index, sx: {
                display: 'flex',
                alignItems: 'center',
                marginBottom: index !== data.length - 1 ? '5.875px' : '0' // Corrected marginBottom value
            } },
            react_1["default"].createElement(Avatar_1["default"], { sx: {
                    width: 60,
                    height: 60,
                    marginRight: 3,
                    fontSize: '1rem',
                    color: 'common.white',
                    backgroundColor: "#ffc107"
                } },
                getAvatarText(new Date(item.Mois).getMonth() + 1),
                " "),
            react_1["default"].createElement(Typography_1["default"], { variant: "subtitle1" },
                "En ",
                react_1["default"].createElement("strong", null, getFormattedDate(new Date(item.Mois))),
                " vous avez cumul\u00E9 une pr\u00E9sence de  ",
                react_1["default"].createElement("strong", null,
                    " ",
                    item.NombrePresence,
                    " "),
                " jours"))); })))));
};
exports["default"] = HistoriquePresence;
