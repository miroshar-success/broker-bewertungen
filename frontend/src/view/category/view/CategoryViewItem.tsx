import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import selectors from 'src/modules/category/categorySelectors';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import NoViewItem from 'src/view/shared/view/NoViewItem';

function CategoryViewItem(props) {
  const { sidenavColor, darkMode } = selectMuiSettings();
  const hasPermissionToRead = useSelector(
    selectors.selectPermissionToRead,
  );

  const valueAsArray = () => {
    const { value } = props;

    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  const displayableRecord = (record) => {
    if (hasPermissionToRead) {
      return (
        <MDBox key={record.id} mr={1}>
          <MDButton
            component={Link}
            variant="contained"
            color={sidenavColor}
            to={`/admin/category/${record.id}`}
            underline="hover"
            size="large"
          >
            {record.title}
          </MDButton>
        </MDBox>
      );
    }

    return (
      <MDBox key={record.id} mr={1}>
        <MDTypography
          variant="button"
          fontWeight="regular"
          mr={1}
        >
          {record.title}
        </MDTypography>
      </MDBox>
    );
  };

  if (!valueAsArray().length) {
    return <NoViewItem {...props} />;
  }

  return (
    <MDBox
      pt={2}
      sx={{
        position: 'relative',
      }}
    >
      <MDTypography
        variant="caption"
        color={darkMode ? 'text' : 'secondary'}
        fontWeight="regular"
        sx={{
          lineHeight: 1,
          position: 'absolute',
          fontWeight: 400,
          top: 0,
        }}
      >
        {props.label}
      </MDTypography>
      <MDBox display="flex">
        {valueAsArray().map((value) =>
          displayableRecord(value),
        )}
      </MDBox>
    </MDBox>
  );
}

CategoryViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

export default CategoryViewItem;
