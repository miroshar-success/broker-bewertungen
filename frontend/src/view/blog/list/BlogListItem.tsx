import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import MaterialLink from '@mui/material/Link';

import { useSelector } from 'react-redux';
import selectors from 'src/modules/blog/blogSelectors';

function BlogListItem(props) {
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
            to={`/admin/blog/${record.id}`}
            underline="hover"
          >
            {record.name}
          </MaterialLink>
        </div>
      );
    }

    return <div key={record.id}>{record.name}</div>;
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

BlogListItem.propTypes = {
  value: PropTypes.any,
};

export default BlogListItem;
