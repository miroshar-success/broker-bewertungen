/**
=========================================================
* Material Dashboard 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { createTheme } from '@mui/material/styles';
// import Fade from "@mui/material/Fade";

// Material Dashboard 2 PRO React TS Base Styles
import colors from 'src/mui/assets/theme-dark/base/colors';
import breakpoints from 'src/mui/assets/theme-dark/base/breakpoints';
import typography from 'src/mui/assets/theme-dark/base/typography';
import boxShadows from 'src/mui/assets/theme-dark/base/boxShadows';
import borders from 'src/mui/assets/theme-dark/base/borders';
import globals from 'src/mui/assets/theme-dark/base/globals';

// Material Dashboard 2 PRO React TS Helper Functions
import boxShadow from 'src/mui/assets/theme-dark/functions/boxShadow';
import hexToRgb from 'src/mui/assets/theme-dark/functions/hexToRgb';
import linearGradient from 'src/mui/assets/theme-dark/functions/linearGradient';
import pxToRem from 'src/mui/assets/theme-dark/functions/pxToRem';
import rgba from 'src/mui/assets/theme-dark/functions/rgba';

// Material Dashboard 2 PRO React TS components base styles for @mui material components
import appBar from 'src/mui/assets/theme-dark/components/appBar';
import autocomplete from 'src/mui/assets/theme-dark/components/form/autocomplete';
import avatar from 'src/mui/assets/theme-dark/components/avatar';
import breadcrumbs from 'src/mui/assets/theme-dark/components/breadcrumbs';
import button from 'src/mui/assets/theme-dark/components/button';
import buttonBase from 'src/mui/assets/theme-dark/components/buttonBase';
import card from 'src/mui/assets/theme-dark/components/card';
import cardContent from 'src/mui/assets/theme-dark/components/card/cardContent';
import cardMedia from 'src/mui/assets/theme-dark/components/card/cardMedia';
import checkbox from 'src/mui/assets/theme-dark/components/form/checkbox';
import container from 'src/mui/assets/theme-dark/components/container';
import dialog from 'src/mui/assets/theme-dark/components/dialog';
import dialogActions from 'src/mui/assets/theme-dark/components/dialog/dialogActions';
import dialogContent from 'src/mui/assets/theme-dark/components/dialog/dialogContent';
import dialogContentText from 'src/mui/assets/theme-dark/components/dialog/dialogContentText';
import dialogTitle from 'src/mui/assets/theme-dark/components/dialog/dialogTitle';
import divider from 'src/mui/assets/theme-dark/components/divider';
import flatpickr from 'src/mui/assets/theme-dark/components/flatpickr';
import formControlLabel from 'src/mui/assets/theme-dark/components/form/formControlLabel';
import formLabel from 'src/mui/assets/theme-dark/components/form/formLabel';
import icon from 'src/mui/assets/theme-dark/components/icon';
import iconButton from 'src/mui/assets/theme-dark/components/iconButton';
import input from 'src/mui/assets/theme-dark/components/form/input';
import inputLabel from 'src/mui/assets/theme-dark/components/form/inputLabel';
import inputOutlined from 'src/mui/assets/theme-dark/components/form/inputOutlined';
import linearProgress from 'src/mui/assets/theme-dark/components/linearProgress';
import link from 'src/mui/assets/theme-dark/components/link';
import list from 'src/mui/assets/theme-dark/components/list';
import listItem from 'src/mui/assets/theme-dark/components/list/listItem';
import listItemText from 'src/mui/assets/theme-dark/components/list/listItemText';
import menu from 'src/mui/assets/theme-dark/components/menu';
import menuItem from 'src/mui/assets/theme-dark/components/menu/menuItem';
import popover from 'src/mui/assets/theme-dark/components/popover';
import radio from 'src/mui/assets/theme-dark/components/form/radio';
import select from 'src/mui/assets/theme-dark/components/form/select';
import sidenav from 'src/mui/assets/theme-dark/components/sidenav';
import slider from 'src/mui/assets/theme-dark/components/slider';
import step from 'src/mui/assets/theme-dark/components/stepper/step';
import stepConnector from 'src/mui/assets/theme-dark/components/stepper/stepConnector';
import stepIcon from 'src/mui/assets/theme-dark/components/stepper/stepIcon';
import stepLabel from 'src/mui/assets/theme-dark/components/stepper/stepLabel';
import stepper from 'src/mui/assets/theme-dark/components/stepper';
import svgIcon from 'src/mui/assets/theme-dark/components/svgIcon';
import switchButton from 'src/mui/assets/theme-dark/components/form/switchButton';
import tab from 'src/mui/assets/theme-dark/components/tabs/tab';
import tableCell from 'src/mui/assets/theme-dark/components/table/tableCell';
import tableContainer from 'src/mui/assets/theme-dark/components/table/tableContainer';
import tableHead from 'src/mui/assets/theme-dark/components/table/tableHead';
import tabs from 'src/mui/assets/theme-dark/components/tabs';
import textField from 'src/mui/assets/theme-dark/components/form/textField';
import tooltip from 'src/mui/assets/theme-dark/components/tooltip';

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors, mode: 'dark' },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...flatpickr,
        ...container,
      },
    },
    MuiAppBar: { ...appBar },
    MuiAutocomplete: { ...autocomplete },
    MuiAvatar: { ...avatar },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiButton: { ...button },
    MuiButtonBase: { ...buttonBase },
    MuiCard: { ...card },
    MuiCardContent: { ...cardContent },
    MuiCardMedia: { ...cardMedia },
    MuiCheckbox: { ...checkbox },
    MuiDialog: { ...dialog },
    MuiDialogActions: { ...dialogActions },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogTitle: { ...dialogTitle },
    MuiDivider: { ...divider },
    MuiDrawer: { ...sidenav },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiIcon: { ...icon },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiLinearProgress: { ...linearProgress },
    MuiLink: { ...link },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiOutlinedInput: { ...inputOutlined },
    MuiPopover: { ...popover },
    MuiRadio: { ...radio },
    MuiSelect: { ...select },
    MuiSlider: { ...slider },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepIcon: { ...stepIcon },
    MuiStepLabel: { ...stepLabel },
    MuiStepper: { ...stepper },
    MuiSvgIcon: { ...svgIcon },
    MuiSwitch: { ...switchButton },
    MuiTab: { ...tab },
    MuiTableCell: { ...tableCell },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTabs: { ...tabs },
    MuiTextField: { ...textField },
    MuiTooltip: { ...tooltip },
  },
});
