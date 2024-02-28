import PropTypes from 'prop-types';
import MDTypography from 'src/mui/components/MDTypography';
import MDBox from 'src/mui/components/MDBox';
import MDInput from 'src/mui/components/MDInput';
import NoViewItem from 'src/view/shared/view/NoViewItem';

function TextViewItem(props) {
  if (
    !props.value &&
    props.value !== 0 &&
    props.value !== false
  ) {
    return <NoViewItem {...props} />;
  }

  const value = `${props.prefix ? `${props.prefix} ` : ''}${
    props.value
  }`;

  return (
    <MDBox>
      <MDInput
        label={props.label}
        variant="standard"
        value={value}
        InputLabelProps={{ shrink: true }}
        multiline={props.multiline}
        rows={props.rows}
        success={props.success}
        error={props.error}
        inputProps={{
          readOnly: true,
        }}
        fullWidth
      />
    </MDBox>
  );
}

TextViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  prefix: PropTypes.string,
  rows: PropTypes.number,
  multiline: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  noData: PropTypes.string,
};

export default TextViewItem;
