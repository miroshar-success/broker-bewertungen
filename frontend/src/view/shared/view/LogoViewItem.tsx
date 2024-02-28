import PropTypes from 'prop-types';
import ImagesUploader from 'src/view/shared/uploaders/ImagesUploader';
import MDTypography from 'src/mui/components/MDTypography';
import MDBox from 'src/mui/components/MDBox';
import NoViewItem from 'src/view/shared/view/NoViewItem';

function LogoViewItem(props) {
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

  if (!valueAsArray().length) {
    return <NoViewItem {...props} />;
  }

  return (
    <MDBox textAlign="center" position="relative">
      <ImagesUploader
        max={1}
        readonly
        value={valueAsArray()}
      />
      <MDBox textAlign="center">
        <MDTypography variant="h5" fontWeight="regular">
          {props.label}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

LogoViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

export default LogoViewItem;
