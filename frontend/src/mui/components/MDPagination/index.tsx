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

import {
  ReactNode,
  FC,
  forwardRef,
  createContext,
  useContext,
  useMemo,
} from 'react';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';

// Custom styles for MDPagination
import MDPaginationItemRoot from 'src/mui/components/MDPagination/MDPaginationItemRoot';

// The Pagination main context
const Context = createContext<any>(null);

// Declare props types for MDPagination
interface Props {
  item?: boolean;
  variant?: 'gradient' | 'contained';
  color?:
    | 'white'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark';
  size?: 'small' | 'medium' | 'large';
  active?: boolean;
  children: ReactNode;
  [key: string]: any;
}

const MDPagination: FC<Props | any> = forwardRef(
  (
    {
      item,
      variant,
      color,
      size,
      active,
      children,
      ...rest
    },
    ref,
  ) => {
    const context: any = useContext(Context);
    const paginationSize = context
      ? context.size
      : undefined;

    const providerValue = useMemo(
      () => ({
        variant,
        color,
        size,
      }),
      [variant, color, size],
    );

    return (
      <Context.Provider value={providerValue}>
        {item ? (
          <MDPaginationItemRoot
            {...rest}
            ref={ref}
            variant={active ? context.variant : 'outlined'}
            color={active ? context.color : 'secondary'}
            iconOnly
            circular
            ownerState={{
              variant,
              active: false,
              paginationSize,
            }}
          >
            {children}
          </MDPaginationItemRoot>
        ) : (
          <MDBox
            display="flex"
            justifyContent="flex-end"
            flexWrap="wrap"
            alignItems="center"
            sx={{ listStyle: 'none' }}
          >
            {children}
          </MDBox>
        )}
      </Context.Provider>
    );
  },
);

// Declaring default props for MDPagination
MDPagination.defaultProps = {
  item: false,
  variant: 'gradient',
  color: 'info',
  size: 'medium',
  active: false,
};

export default MDPagination;
