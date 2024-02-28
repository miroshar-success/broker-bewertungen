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
import colors from 'src/mui/assets/theme/base/colors';
import breakpoints from 'src/mui/assets/theme/base/breakpoints';
import typography from 'src/mui/assets/theme/base/typography';
import boxShadows from 'src/mui/assets/theme/base/boxShadows';
import borders from 'src/mui/assets/theme/base/borders';
import globals from 'src/mui/assets/theme/base/globals';

// Material Dashboard 2 PRO React TS Helper Functions
import boxShadow from 'src/mui/assets/theme/functions/boxShadow';
import hexToRgb from 'src/mui/assets/theme/functions/hexToRgb';
import linearGradient from 'src/mui/assets/theme/functions/linearGradient';
import pxToRem from 'src/mui/assets/theme/functions/pxToRem';
import rgba from 'src/mui/assets/theme/functions/rgba';

// Material Dashboard 2 PRO React TS components base styles for @mui material components
import sidenav from 'src/mui/assets/theme/components/sidenav';
import list from 'src/mui/assets/theme/components/list';
import listItem from 'src/mui/assets/theme/components/list/listItem';
import listItemText from 'src/mui/assets/theme/components/list/listItemText';
import card from 'src/mui/assets/theme/components/card';
import cardMedia from 'src/mui/assets/theme/components/card/cardMedia';
import cardContent from 'src/mui/assets/theme/components/card/cardContent';
import button from 'src/mui/assets/theme/components/button';
import iconButton from 'src/mui/assets/theme/components/iconButton';
import input from 'src/mui/assets/theme/components/form/input';
import inputLabel from 'src/mui/assets/theme/components/form/inputLabel';
import inputOutlined from 'src/mui/assets/theme/components/form/inputOutlined';
import textField from 'src/mui/assets/theme/components/form/textField';
import menu from 'src/mui/assets/theme/components/menu';
import menuItem from 'src/mui/assets/theme/components/menu/menuItem';
import switchButton from 'src/mui/assets/theme/components/form/switchButton';
import divider from 'src/mui/assets/theme/components/divider';
import tableContainer from 'src/mui/assets/theme/components/table/tableContainer';
import tableHead from 'src/mui/assets/theme/components/table/tableHead';
import tableCell from 'src/mui/assets/theme/components/table/tableCell';
import linearProgress from 'src/mui/assets/theme/components/linearProgress';
import breadcrumbs from 'src/mui/assets/theme/components/breadcrumbs';
import slider from 'src/mui/assets/theme/components/slider';
import avatar from 'src/mui/assets/theme/components/avatar';
import tooltip from 'src/mui/assets/theme/components/tooltip';
import appBar from 'src/mui/assets/theme/components/appBar';
import tabs from 'src/mui/assets/theme/components/tabs';
import tab from 'src/mui/assets/theme/components/tabs/tab';
import stepper from 'src/mui/assets/theme/components/stepper';
import step from 'src/mui/assets/theme/components/stepper/step';
import stepConnector from 'src/mui/assets/theme/components/stepper/stepConnector';
import stepLabel from 'src/mui/assets/theme/components/stepper/stepLabel';
import stepIcon from 'src/mui/assets/theme/components/stepper/stepIcon';
import select from 'src/mui/assets/theme/components/form/select';
import formControlLabel from 'src/mui/assets/theme/components/form/formControlLabel';
import formLabel from 'src/mui/assets/theme/components/form/formLabel';
import checkbox from 'src/mui/assets/theme/components/form/checkbox';
import radio from 'src/mui/assets/theme/components/form/radio';
import autocomplete from 'src/mui/assets/theme/components/form/autocomplete';
import flatpickr from 'src/mui/assets/theme/components/flatpickr';
import container from 'src/mui/assets/theme/components/container';
import popover from 'src/mui/assets/theme/components/popover';
import buttonBase from 'src/mui/assets/theme/components/buttonBase';
import icon from 'src/mui/assets/theme/components/icon';
import svgIcon from 'src/mui/assets/theme/components/svgIcon';
import link from 'src/mui/assets/theme/components/link';
import dialog from 'src/mui/assets/theme/components/dialog';
import dialogTitle from 'src/mui/assets/theme/components/dialog/dialogTitle';
import dialogContent from 'src/mui/assets/theme/components/dialog/dialogContent';
import dialogContentText from 'src/mui/assets/theme/components/dialog/dialogContentText';
import dialogActions from 'src/mui/assets/theme/components/dialog/dialogActions';

export default createTheme({
  direction: 'rtl',
  breakpoints: { ...breakpoints },
  palette: { ...colors },
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
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
