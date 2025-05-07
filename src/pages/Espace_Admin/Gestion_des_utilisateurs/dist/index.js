"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Card_1 = require("@mui/material/Card");
var Box_1 = require("@mui/material/Box");
var TabList_1 = require("@mui/lab/TabList");
var TabPanel_1 = require("@mui/lab/TabPanel");
var TabContext_1 = require("@mui/lab/TabContext");
var styles_1 = require("@mui/material/styles");
var Tab_1 = require("@mui/material/Tab");
// ** Icons Imports
var AccountOutline_1 = require("mdi-material-ui/AccountOutline");
var AccountGroup_1 = require("mdi-material-ui/AccountGroup");
var ListUsers_1 = require("../../../views/InterfaceAdmin/ListUsers");
// ** Third Party Styles Imports
require("react-datepicker/dist/react-datepicker.css");
var Ajout_users_1 = require("src/views/InterfaceAdmin/Ajout_users");
// import Navigation from '../@core/layouts/components/vertical/navigation'
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
var AccountSettings = function () {
    // ** State
    var _a = react_1.useState('Ajout_users'), value = _a[0], setValue = _a[1];
    var handleChange = function (event, newValue) {
        setValue(newValue);
    };
    return (React.createElement(Card_1["default"], null,
        React.createElement(TabContext_1["default"], { value: value },
            React.createElement(TabList_1["default"], { onChange: handleChange, "aria-label": 'account-settings tabs', sx: { borderBottom: function (theme) { return "1px solid " + theme.palette.divider; } } },
                React.createElement(Tab, { value: 'Ajout_users', label: React.createElement(Box_1["default"], { sx: { display: 'flex', alignItems: 'center' } },
                        React.createElement(AccountOutline_1["default"], null),
                        React.createElement(TabName, null, "Ajouter des utilisateurs")) }),
                React.createElement(Tab, { value: 'Liste', label: React.createElement(Box_1["default"], { sx: { display: 'flex', alignItems: 'center' } },
                        React.createElement(AccountGroup_1["default"], null),
                        React.createElement(TabName, null, "Liste des Utilisateurs")) })),
            React.createElement(TabPanel_1["default"], { sx: { p: 0 }, value: 'Ajout_users' },
                React.createElement(Ajout_users_1["default"], null)),
            React.createElement(TabPanel_1["default"], { sx: { p: 0 }, value: 'Liste' },
                React.createElement(ListUsers_1["default"], null)),
            React.createElement(TabPanel_1["default"], { sx: { p: 0 }, value: 'User' },
                React.createElement(ListUsers_1["default"], null)))));
};
exports["default"] = AccountSettings;
