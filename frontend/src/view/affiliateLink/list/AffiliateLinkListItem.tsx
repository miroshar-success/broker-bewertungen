import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MaterialLink from '@mui/material/Link';

import { useSelector } from 'react-redux';
import selectors from 'src/modules/affiliateLink/affiliateLinkSelectors';

function AffiliateLinkListItem(props) {
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
        <div key={record.id}>
          <MaterialLink
            component={Link}
            to={`/admin/affiliate-link/${record.id}`}
            underline="hover"
          >
            {record.link}
          </MaterialLink>
        </div>
      );
    }

    return <div key={record.id}>{record.link}</div>;
  };

  if (!valueAsArray().length) {
    return null;
  }

  return (
    <>
      {valueAsArray().map((value) =>
        displayableRecord(value),
      )}
    </>
  );
}

AffiliateLinkListItem.propTypes = {
  value: PropTypes.any,
};

export default AffiliateLinkListItem;
