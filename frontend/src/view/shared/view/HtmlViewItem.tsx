import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import parse from 'html-react-parser';

function HtmlViewItem(props) {
  const { value, label } = props;
  const { darkMode } = selectMuiSettings();
  return (
    <MDBox pt={2} position="relative">
      <MDTypography
        variant="caption"
        color={darkMode ? 'text' : 'secondary'}
        fontWeight="regular"
        lineHeight={1}
        position="absolute"
        top="0"
      >
        {label}
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular">
        {parse(value)}
      </MDTypography>
    </MDBox>
  );
}

export default HtmlViewItem;
