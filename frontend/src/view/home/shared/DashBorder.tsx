import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import dColors from 'src/mui/assets/theme-dark/base/colors';
import lColors from 'src/mui/assets/theme/base/colors';
import MDBox from 'src/mui/components/MDBox';

interface DashBorderProps {
  borderTop?: boolean;
  borderRight?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  children?: any;
  [key: string]: any;
}

function DashBorder({
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  children,
  ...props
}: DashBorderProps) {
  const { darkMode } = selectMuiSettings();
  const colors = darkMode ? dColors : lColors;
  const border = `1px dashed ${colors.inputBorderColor}`;
  return (
    <MDBox
      borderTop={borderTop ? border : null}
      borderRight={borderRight ? border : null}
      borderBottom={borderBottom ? border : null}
      borderLeft={borderLeft ? border : null}
      {...props}
    >
      {children}
    </MDBox>
  );
}

export default DashBorder;
