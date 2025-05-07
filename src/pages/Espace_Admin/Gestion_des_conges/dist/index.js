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
var LockOpenOutline_1 = require("mdi-material-ui/LockOpenOutline");
var InformationOutline_1 = require("mdi-material-ui/InformationOutline");
// ** Demo Tabs Imports
var EditUser_1 = require("../../../views/InterfaceAdmin/EditUser");
var ListUsers_1 = require("../../../views/InterfaceAdmin/ListUsers");
var Activite_users_1 = require("../../../views/InterfaceAdmin/Activite_users");
// ** Third Party Styles Imports
require("react-datepicker/dist/react-datepicker.css");
var pages_1 = require("src/pages");
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
    var _a = react_1.useState('ListeDesCongés'), value = _a[0], setValue = _a[1];
    var handleChange = function (event, newValue) {
        setValue(newValue);
    };
    return (React.createElement(Card_1["default"], null,
        React.createElement(TabContext_1["default"], { value: value },
            React.createElement(TabList_1["default"], { onChange: handleChange, "aria-label": 'account-settings tabs', sx: { borderBottom: function (theme) { return "1px solid " + theme.palette.divider; } } },
                React.createElement(Tab, { value: 'ListeDesCong\u00E9s', label: React.createElement(Box_1["default"], { sx: { display: 'flex', alignItems: 'center' } },
                        React.createElement(AccountOutline_1["default"], null),
                        React.createElement(TabName, null, "ListeDesCong\u00E9s")) }),
                React.createElement(Tab, { value: 'Liste', label: React.createElement(Box_1["default"], { sx: { display: 'flex', alignItems: 'center' } },
                        React.createElement(LockOpenOutline_1["default"], null),
                        React.createElement(TabName, null, "Liste")) }),
                React.createElement(Tab, { value: 'User', label: React.createElement(Box_1["default"], { sx: { display: 'flex', alignItems: 'center' } },
                        React.createElement(LockOpenOutline_1["default"], null),
                        React.createElement(TabName, null, "User")) }),
                React.createElement(Tab, { value: 'info', label: React.createElement(Box_1["default"], { sx: { display: 'flex', alignItems: 'center' } },
                        React.createElement(InformationOutline_1["default"], null),
                        React.createElement(TabName, null, "Info")) })),
            React.createElement(TabPanel_1["default"], { sx: { p: 0 }, value: 'ListeDesCong\u00E9s' },
                React.createElement(pages_1["default"], null)),
            React.createElement(TabPanel_1["default"], { sx: { p: 0 }, value: 'Liste' },
                React.createElement(Activite_users_1["default"], null)),
            React.createElement(TabPanel_1["default"], { sx: { p: 0 }, value: 'User' },
                React.createElement(ListUsers_1["default"], null)),
            React.createElement(TabPanel_1["default"], { sx: { p: 0 }, value: 'info' },
                React.createElement(EditUser_1["default"], null)))));
};
exports["default"] = AccountSettings;
