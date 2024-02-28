import BrokerAttrs from 'src/view/home/broker/shared/BrokerAttrs';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MDBox from 'src/mui/components/MDBox';
import PropTypes from 'prop-types';

function BrokerCheckbox({ record, field }) {
  const checkField = field.toLowerCase();
  const textField = `text_${checkField}`;
  if (
    !record.checkbox ||
    !record.checkbox[checkField] ||
    !record.checkbox[textField]
  ) {
    return null;
  }
  return (
    <MDBox
      lineHeight={0}
      position="relative"
      fontSize="20px"
    >
      <MDBox
        position="relative"
        my={1}
        pl={3}
        minHeight="20px"
      >
        <MDBox
          display="inline"
          position="absolute"
          left={0}
          top="-0.05rem"
        >
          {record.checkbox[checkField] === 'PRO' ? (
            <CheckCircleIcon color="success" />
          ) : record.checkbox[checkField] === 'CONTRA' ? (
            <CancelIcon color="secondary" />
          ) : null}
        </MDBox>
        <BrokerAttrs
          records={record.checkbox[textField]}
          attrs={{ link: 'url', title: 'text' }}
          noIndent
        />
      </MDBox>
    </MDBox>
  );
}

BrokerCheckbox.propTypes = {
  record: PropTypes.any.isRequired,
  field: PropTypes.string.isRequired,
};

export default BrokerCheckbox;
