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
import Icon from '@mui/material/Icon';
import { Theme } from '@mui/material/styles';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';

// for MUI 2 Dashboard
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

// Declaring props types for DataTableHeadCell
interface Props {
  width?: string | number;
  children: ReactNode;
  sorted?: false | 'none' | 'asce' | 'asc' | 'desc';
  align?: 'left' | 'right' | 'center';
  noWrap?: true | false;
  [key: string]: any;
}

function DataTableHeadCell({
  width,
  children,
  sorted = false,
  align,
  noWrap,
  ...rest
}: Props): JSX.Element {
  const { darkMode } = selectMuiSettings();

  return (
    <MDBox
      component="th"
      width={width}
      py={1.5}
      px={3}
      sx={({
        palette: { light },
        borders: { borderWidth },
      }: Theme) => ({
        borderBottom: `${borderWidth[1]} solid ${light.main}`,
      })}
      {...rest}
    >
      <MDBox
        {...rest}
        position="relative"
        textAlign={align}
        color={darkMode ? 'white' : 'secondary'}
        opacity={0.7}
        sx={({
          typography: { size, fontWeightBold },
        }: Theme) => ({
          fontSize: size.xxs,
          fontWeight: fontWeightBold,
          textTransform: 'uppercase',
          cursor: sorted && 'pointer',
          userSelect: sorted && 'none',
          whiteSpace: noWrap ? 'nowrap' : null,
          pr: sorted && align !== 'right' ? 2 : 0,
          pl: sorted && align === 'right' ? 2 : 0,
        })}
      >
        {children}
        {sorted && (
          <MDBox
            position="absolute"
            top={0}
            right={align !== 'right' ? '16px' : 0}
            left={align === 'right' ? '-5px' : 'unset'}
            sx={({ typography: { size } }: any) => ({
              fontSize: size.lg,
            })}
          >
            <MDBox
              position="absolute"
              top={-6}
              color={
                sorted === 'asce' || sorted === 'asc'
                  ? 'text'
                  : 'secondary'
              }
              opacity={
                sorted === 'asce' || sorted === 'asc'
                  ? 1
                  : 0.5
              }
            >
              <Icon>arrow_drop_up</Icon>
            </MDBox>
            <MDBox
              position="absolute"
              top={0}
              color={
                sorted === 'desc' ? 'text' : 'secondary'
              }
              opacity={sorted === 'desc' ? 1 : 0.5}
            >
              <Icon>arrow_drop_down</Icon>
            </MDBox>
          </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
}

// Declaring default props for DataTableHeadCell
DataTableHeadCell.defaultProps = {
  width: 'auto',
  sorted: 'none',
  align: 'left',
  noWrap: false,
};

export default DataTableHeadCell;
