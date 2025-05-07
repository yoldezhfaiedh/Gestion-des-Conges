"use strict";
exports.__esModule = true;
// ** React Imports
var react_1 = require("react");
// ** MUI Imports
var Box_1 = require("@mui/material/Box");
var Card_1 = require("@mui/material/Card");
var TabList_1 = require("@mui/lab/TabList");
var TabPanel_1 = require("@mui/lab/TabPanel");
var TabContext_1 = require("@mui/lab/TabContext");
var styles_1 = require("@mui/material/styles");
var Tab_1 = require("@mui/material/Tab");
// ** Icons Imports
var AccountOutline_1 = require("mdi-material-ui/AccountOutline");
var LockOpenOutline_1 = require("mdi-material-ui/LockOpenOutline");
var InformationOutline_1 = require("mdi-material-ui/InformationOutline");
// ** Third Party Styles Imports
require("react-datepicker/dist/react-datepicker.css");
var PresenceByUser_1 = require("src/views/InfoConge/PresenceByUser");
var Cong_ByUser_1 = require("src/views/InfoConge/Cong\u00E9ByUser");
var SoldeByUser_1 = require("src/views/InfoConge/SoldeByUser");
var Tab = styles_1.styled(Tab_1["default"])(function (_a) {
    var _b;
    var theme = _a.theme;
    return (_b = {},
        _b[theme.breakpoints.down('md')] = {
            minWidth: 100
        },
        _b[theme.breakpoints.down('sm')] = {
            minWidth: 67
        },
        _b);
});
var TabName = styles_1.styled('span')(function (_a) {
    var _b;
    var theme = _a.theme;
    return (_b = {
            lineHeight: 1.71,
            fontSize: '0.875rem',
            marginLeft: theme.spacing(2.4)
        },
        _b[theme.breakpoints.down('md')] = {
            display: 'none'
        },
        _b);
});
var AutresInfos = function () {
    // ** State
    var _a = react_1.useState('HistoriqueConges'), value = _a[0], setValue = _a[1];
    var handleChange = function (event, newValue) {
        setValue(newValue);
    };
    return (React.createElement(Card_1["default"], null,
        React.createElement(TabContext_1["default"], { value: value },
            React.createElement(TabList_1["default"], { onChange: handleChange, "aria-label": 'account-settings tabs', sx: { borderBottom: function (theme) { return "1px solid " + theme.palette.divider; } } },
                React.createElement(Tab, { value: 'HistoriqueConges', label: React.createElement(Box_1["default"], { sx: { display: 'flex', alignItems: 'center' } },
                        React.createElement(AccountOutline_1["default"], null),
                        React.createElement(TabName, null, "Historique Conges")) }),
                React.createElement(Tab, { value: 'HistoriquePresence', label: React.createElement(Box_1["default"], { sx: { display: 'flex', alignItems: 'center' } },
                        React.createElement(LockOpenOutline_1["default"], null),
                        React.createElement(TabName, null, "Historique Presences")) }),
                React.createElement(Tab, { value: 'SoldeByUser', label: React.createElement(Box_1["default"], { sx: { display: 'flex', alignItems: 'center' } },
                        React.createElement(InformationOutline_1["default"], null),
                        React.createElement(TabName, null, "SoldeByUser")) })),
            React.createElement(TabPanel_1["default"], { sx: { p: 0 }, value: 'HistoriqueConges' },
                React.createElement(Cong_ByUser_1["default"], null)),
            React.createElement(TabPanel_1["default"], { sx: { p: 0 }, value: 'HistoriquePresence' },
                React.createElement(PresenceByUser_1["default"], null)),
            React.createElement(TabPanel_1["default"], { sx: { p: 0 }, value: 'SoldeByUser' },
                React.createElement(SoldeByUser_1["default"], null)))));
};
exports["default"] = AutresInfos;
