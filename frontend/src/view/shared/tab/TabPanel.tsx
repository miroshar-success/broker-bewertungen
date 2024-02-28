import LazyLoad from 'react-lazy-load';
import MDBox from 'src/mui/components/MDBox';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  hideOnly?: boolean;
}

function TabPanel(props: TabPanelProps) {
  const {
    children,
    value,
    index,
    hideOnly = false,
    ...other
  } = props;

  if (value !== index) {
    if (hideOnly) {
      return (
        <MDBox display="none">
          {/* <LazyLoad>{children}</LazyLoad> */}
          {children}
        </MDBox>
      );
    }
    return null;
  }
  return (
    <MDBox>
      {/* <LazyLoad>{children}</LazyLoad> */}
      {children}
    </MDBox>
  );
}

export default TabPanel;
