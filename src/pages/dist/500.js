"use strict";
// // ** React Imports
// import { ReactNode } from 'react'
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
// // ** Next Import
// import Link from 'next/link'
// // ** MUI Components
// import Button from '@mui/material/Button'
// import { styled } from '@mui/material/styles'
// import Typography from '@mui/material/Typography'
// import Box, { BoxProps } from '@mui/material/Box'
// // ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'
// // ** Demo Imports
// import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'
// // ** Styled Components
// const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
//   [theme.breakpoints.down('md')]: {
//     width: '90vw'
//   }
// }))
// const Img = styled('img')(({ theme }) => ({
//   marginBottom: theme.spacing(10),
//   [theme.breakpoints.down('lg')]: {
//     height: 450,
//     marginTop: theme.spacing(10)
//   },
//   [theme.breakpoints.down('md')]: {
//     height: 400
//   },
//   [theme.breakpoints.up('lg')]: {
//     marginTop: theme.spacing(13)
//   }
// }))
// const TreeIllustration = styled('img')(({ theme }) => ({
//   left: 0,
//   bottom: '5rem',
//   position: 'absolute',
//   [theme.breakpoints.down('lg')]: {
//     bottom: 0
//   }
// }))
// const Error500 = () => {
//   return (
//     <Box className='content-center'>
//       <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
//         <BoxWrapper>
//           <Typography variant='h1'>500</Typography>
//           <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
//             Internal server error 👨🏻‍💻
//           </Typography>
//           <Typography variant='body2'>Oops, something went wrong!</Typography>
//         </BoxWrapper>
//         <Img height='487' alt='error-illustration' src='/images/pages/500.png' />
//         <Link passHref href='/'>
//           <Button component='a' variant='contained' sx={{ px: 5.5 }}>
//             Back to Home
//           </Button>
//         </Link>
//       </Box>
//       <FooterIllustrations image={<TreeIllustration alt='tree' src='/images/pages/tree-3.png' />} />
//     </Box>
//   )
// }
// Error500.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
// export default Error500
var react_1 = require("react");
var AdapterDateFnsV3_1 = require("@mui/x-date-pickers/AdapterDateFnsV3");
var LocalizationProvider_1 = require("@mui/x-date-pickers/LocalizationProvider");
var StaticDatePicker_1 = require("@mui/x-date-pickers/StaticDatePicker");
var PickersDay_1 = require("@mui/x-date-pickers/PickersDay");
var Dialog_1 = require("@mui/material/Dialog");
var DialogTitle_1 = require("@mui/material/DialogTitle");
var DialogContent_1 = require("@mui/material/DialogContent");
var DialogContentText_1 = require("@mui/material/DialogContentText");
var DialogActions_1 = require("@mui/material/DialogActions");
var Button_1 = require("@mui/material/Button");
var date_fns_1 = require("date-fns");
function Calendar() {
    var _this = this;
    var _a = react_1.useState([]), selectedDates = _a[0], setSelectedDates = _a[1]; // State for selected dates
    var _b = react_1.useState([]), markedDates = _b[0], setMarkedDates = _b[1]; // State for marked dates
    var _c = react_1.useState(false), dialogOpen = _c[0], setDialogOpen = _c[1]; // State for dialog visibility
    var _d = react_1.useState(''), dateDetails = _d[0], setDateDetails = _d[1]; // State for date details
    var handleDateSelection = function (date) {
        setSelectedDates(function (prevDates) {
            var index = prevDates.findIndex(function (prevDate) { return prevDate.getTime() === date.getTime(); });
            if (index === -1) {
                return __spreadArrays(prevDates, [date]);
            }
            else {
                return prevDates.filter(function (prevDate) { return prevDate.getTime() !== date.getTime(); });
            }
        });
        fetchDateDetails(date); // Fetch details for the selected date
    };
    var handleOpenDialog = function () {
        setDialogOpen(true);
    };
    var handleCloseDialog = function () {
        setDialogOpen(false);
    };
    var fetchMarkedDates = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('http://localhost:5000/dates/marked')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    setMarkedDates(data.map(function (item) { return new Date(item.date); }));
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching marked dates from backend:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var fetchDateDetails = function (date) { return __awaiter(_this, void 0, void 0, function () {
        var formattedDate, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    formattedDate = date.toISOString().split('T')[0];
                    return [4 /*yield*/, fetch("http://localhost:5000/dates/details?date=" + formattedDate)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch date details');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    setDateDetails(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error fetching date details from backend:', error_2);
                    setDateDetails(''); // Réinitialiser les détails en cas d'erreur
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        fetchMarkedDates();
    }, []);
    var saveSelectedDates = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch('http://localhost:5000/Dates/marked-dates', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ dates: selectedDates })
                        })];
                case 1:
                    response = _a.sent();
                    // Handle backend response if needed
                    setMarkedDates(function (prevMarkedDates) { return __spreadArrays(prevMarkedDates, selectedDates); });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Error sending selected dates to backend:', error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var isDateMarked = function (date) {
        return markedDates.some(function (markDate) { return date_fns_1.isSameDay(markDate, date); });
    };
    var customDayRenderer = function (date, selectedDays, pickersDayProps) {
        var selected = selectedDays.some(function (day) { return date_fns_1.isSameDay(day, date); });
        return (react_1["default"].createElement(PickersDay_1.PickersDay, __assign({}, pickersDayProps, { selected: selected })));
    };
    return (react_1["default"].createElement(LocalizationProvider_1.LocalizationProvider, { dateAdapter: AdapterDateFnsV3_1.AdapterDateFns },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(StaticDatePicker_1.StaticDatePicker, { orientation: 'portrait', value: selectedDates, onChange: handleDateSelection, date: null, renderDay: customDayRenderer }),
            react_1["default"].createElement(Button_1["default"], { onClick: handleOpenDialog }, "Show Details"),
            react_1["default"].createElement(Button_1["default"], { onClick: saveSelectedDates }, "Save Marked Dates")),
        react_1["default"].createElement(Dialog_1["default"], { open: dialogOpen, onClose: handleCloseDialog },
            react_1["default"].createElement(DialogTitle_1["default"], null, "Les employ\u00E9s ayant pris un cong\u00E9 \u00E0 cette date"),
            react_1["default"].createElement(DialogContent_1["default"], null,
                react_1["default"].createElement(DialogContentText_1["default"], null, dateDetails && dateDetails.map(function (item, index) { return (react_1["default"].createElement("div", { key: index },
                    react_1["default"].createElement("div", null,
                        "User Emails: ",
                        item.userEmails))); }))),
            react_1["default"].createElement(DialogActions_1["default"], null,
                react_1["default"].createElement(Button_1["default"], { onClick: handleCloseDialog, autoFocus: true }, "Close")))));
}
exports["default"] = Calendar;
