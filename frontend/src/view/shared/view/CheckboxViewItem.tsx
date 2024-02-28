import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';

function CheckboxViewItem(props) {
  const { sidenavColor } = selectMuiSettings();
  const label =
    Boolean(props.label) &&
    `${props.prefix ? `${props.prefix} ` : ''}${
      props.label
    }`;

  return (
    <MDBox display="flex" justifyContent="flex-start">
      <MDTypography variant="button">
        {props.checked ? (
          <CheckSharpIcon
            fontSize="medium"
            color={sidenavColor}
            fontWeight="bold"
          />
        ) : (
          <RemoveSharpIcon
            fontSize="medium"
            color="secondary"
            fontWeight="regular"
            sx={{
              opacity: 0.5,
            }}
          />
        )}
      </MDTypography>
      {Boolean(label) && (
        <MDTypography
          variant="button"
          fontWeight="regular"
          ml={1}
        >
          {label}
        </MDTypography>
      )}
    </MDBox>
  );
}

CheckboxViewItem.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  prefix: PropTypes.string,
};

export default CheckboxViewItem;
