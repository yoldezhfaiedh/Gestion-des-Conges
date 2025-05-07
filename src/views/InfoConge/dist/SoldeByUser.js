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
var Card_1 = require("@mui/material/Card");
var Typography_1 = require("@mui/material/Typography");
var CardContent_1 = require("@mui/material/CardContent");
var styles_1 = require("@mui/material/styles");
// Styled component for the triangle shaped background image
var TriangleImg = styles_1.styled('img')({
    right: 0,
    bottom: 0,
    height: 170,
    position: 'absolute'
});
// Styled component for the trophy image
var TrophyImg = styles_1.styled('img')({
    right: 36,
    bottom: 150,
    height: 98,
    position: 'absolute'
});
var SoldeByUser = function () {
    var theme = styles_1.useTheme();
    var _a = react_1.useState(null), soldeData = _a[0], setSoldeData = _a[1];
    react_1.useEffect(function () {
        var fetchSoldeData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch('http://localhost:5000/solde/all')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        setSoldeData(data);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching solde data:', error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchSoldeData();
    }, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null, soldeData ? (soldeData.map(function (solde, index) { return (react_1["default"].createElement(Card_1["default"], { key: index, sx: { position: 'relative', mb: 3 } },
        react_1["default"].createElement(CardContent_1["default"], null,
            react_1["default"].createElement(Typography_1["default"], { variant: 'h5', sx: { my: 3, letterSpacing: '0.25px' } }, "Votre solde de cong\u00E9 est de :"),
            react_1["default"].createElement(Typography_1["default"], { variant: 'h5', sx: { color: 'primary.main' } },
                solde.Solde,
                " Jours"),
            react_1["default"].createElement(Typography_1["default"], { variant: 'h6', sx: { my: 3, color: 'secondary.main' } },
                "Cette allocation est pour l'ann\u00E9e : ",
                solde.Annee),
            react_1["default"].createElement(TriangleImg, { alt: 'triangle background', src: "/images/misc/" + (theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png') }),
            react_1["default"].createElement(TrophyImg, { alt: 'trophy', src: '/images/pages/tanit.png' })))); })) : (react_1["default"].createElement(Typography_1["default"], null, "Loading..."))));
};
exports["default"] = SoldeByUser;
