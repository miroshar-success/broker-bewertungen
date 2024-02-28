/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { ReactNode } from 'react';

// @mui material components
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import { Theme } from '@mui/material/styles';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';

// Custom styles for the SidenavItem
import {
  item,
  itemContent,
  itemArrow,
} from 'src/mui/shared/Sidenav/styles/sidenavItem';

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
  collapseArrow,
} from 'src/mui/shared/Sidenav/styles/sidenavCollapse';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { ListItemIcon } from '@mui/material';

// Declaring props types for SidenavCollapse
interface Props {
  color?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'dark';
  icon?: any;
  name: string;
  active?: boolean | string;
  nested?: boolean;
  children?: ReactNode;
  open?: boolean;
  [key: string]: any;
}

function SidenavItem({
  color,
  icon,
  name,
  active,
  nested,
  children,
  open,
  ...rest
}: Props): JSX.Element {
  const {
    miniSidenav,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = selectMuiSettings();

  return (
    <>
      <ListItem
        {...rest}
        component="li"
        sx={(theme) =>
          item(theme, {
            active,
            color,
            transparentSidenav,
            whiteSidenav,
            darkMode,
            icon,
          })
        }
      >
        <MDBox
          sx={(theme: Theme): any =>
            itemContent(theme, {
              active,
              miniSidenav,
              name,
              open,
              nested,
              transparentSidenav,
              whiteSidenav,
              darkMode,
              icon,
            })
          }
        >
          {icon ? (
            <ListItemIcon
              sx={(theme) =>
                collapseIconBox(theme, {
                  transparentSidenav,
                  whiteSidenav,
                  darkMode,
                  active,
                  noCollapse: true,
                })
              }
            >
              {typeof icon === 'string' ? (
                <Icon
                  sx={(theme) =>
                    collapseIcon(theme, { active })
                  }
                >
                  {icon}
                </Icon>
              ) : (
                icon
              )}
            </ListItemIcon>
          ) : null}
          <ListItemText
            primary={name}
            sx={(theme) =>
              icon
                ? collapseText(theme, {
                    miniSidenav,
                    transparentSidenav,
                    whiteSidenav,
                    active,
                    noCollapse: true,
                  })
                : null
            }
          />
          {children && (
            <Icon
              component="i"
              sx={(theme) =>
                itemArrow(theme, {
                  open,
                  miniSidenav,
                  transparentSidenav,
                  whiteSidenav,
                  darkMode,
                })
              }
            >
              expand_less
            </Icon>
          )}
        </MDBox>
      </ListItem>
      {children && (
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          {...rest}
        >
          {children}
        </Collapse>
      )}
    </>
  );
}

// Declaring default props for SidenavItem
SidenavItem.defaultProps = {
  color: 'info',
  active: false,
  nested: false,
  children: false,
  open: false,
};

export default SidenavItem;
