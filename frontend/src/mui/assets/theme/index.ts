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
import { createTheme } from '@mui/material';

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
import appBar from 'src/mui/assets/theme/components/appBar';
import autocomplete from 'src/mui/assets/theme/components/form/autocomplete';
import avatar from 'src/mui/assets/theme/components/avatar';
import breadcrumbs from 'src/mui/assets/theme/components/breadcrumbs';
import button from 'src/mui/assets/theme/components/button';
import buttonBase from 'src/mui/assets/theme/components/buttonBase';
import card from 'src/mui/assets/theme/components/card';
import cardContent from 'src/mui/assets/theme/components/card/cardContent';
import cardMedia from 'src/mui/assets/theme/components/card/cardMedia';
import checkbox from 'src/mui/assets/theme/components/form/checkbox';
import container from 'src/mui/assets/theme/components/container';
import dialog from 'src/mui/assets/theme/components/dialog';
import dialogActions from 'src/mui/assets/theme/components/dialog/dialogActions';
import dialogContent from 'src/mui/assets/theme/components/dialog/dialogContent';
import dialogContentText from 'src/mui/assets/theme/components/dialog/dialogContentText';
import dialogTitle from 'src/mui/assets/theme/components/dialog/dialogTitle';
import divider from 'src/mui/assets/theme/components/divider';
import flatpickr from 'src/mui/assets/theme/components/flatpickr';
import formControlLabel from 'src/mui/assets/theme/components/form/formControlLabel';
import formLabel from 'src/mui/assets/theme/components/form/formLabel';
import icon from 'src/mui/assets/theme/components/icon';
import iconButton from 'src/mui/assets/theme/components/iconButton';
import input from 'src/mui/assets/theme/components/form/input';
import inputLabel from 'src/mui/assets/theme/components/form/inputLabel';
import inputOutlined from 'src/mui/assets/theme/components/form/inputOutlined';
import linearProgress from 'src/mui/assets/theme/components/linearProgress';
import link from 'src/mui/assets/theme/components/link';
import list from 'src/mui/assets/theme/components/list';
import listItem from 'src/mui/assets/theme/components/list/listItem';
import listItemText from 'src/mui/assets/theme/components/list/listItemText';
import menu from 'src/mui/assets/theme/components/menu';
import menuItem from 'src/mui/assets/theme/components/menu/menuItem';
import popover from 'src/mui/assets/theme/components/popover';
import radio from 'src/mui/assets/theme/components/form/radio';
import select from 'src/mui/assets/theme/components/form/select';
import sidenav from 'src/mui/assets/theme/components/sidenav';
import slider from 'src/mui/assets/theme/components/slider';
import step from 'src/mui/assets/theme/components/stepper/step';
import stepConnector from 'src/mui/assets/theme/components/stepper/stepConnector';
import stepIcon from 'src/mui/assets/theme/components/stepper/stepIcon';
import stepLabel from 'src/mui/assets/theme/components/stepper/stepLabel';
import stepper from 'src/mui/assets/theme/components/stepper';
import svgIcon from 'src/mui/assets/theme/components/svgIcon';
import switchButton from 'src/mui/assets/theme/components/form/switchButton';
import tab from 'src/mui/assets/theme/components/tabs/tab';
import tableCell from 'src/mui/assets/theme/components/table/tableCell';
import tableContainer from 'src/mui/assets/theme/components/table/tableContainer';
import tableHead from 'src/mui/assets/theme/components/table/tableHead';
import tabs from 'src/mui/assets/theme/components/tabs';
import textField from 'src/mui/assets/theme/components/form/textField';
import tooltip from 'src/mui/assets/theme/components/tooltip';

export default createTheme({
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
