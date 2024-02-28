import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import selectors from 'src/modules/user/userSelectors';
import MaterialLink from '@mui/material/Link';
import {
  getUserAvatar,
  getUserNameOrEmailPrefix,
} from 'src/modules/utils';
import { Avatar } from '@mui/material';

function UserListItem(props) {
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

  const label = (record) =>
    getUserNameOrEmailPrefix(record);

  const displayableRecord = (record) => {
    if (hasPermissionToRead) {
      return (
        <div key={record.id}>
          <MaterialLink
            display="flex"
            component={Link}
            to={`/admin/user/${record.id}`}
            underline="hover"
            textTransform="capitalize"
            alignItems="center"
          >
            <Avatar
              src={getUserAvatar(record)}
              sx={{ mr: 1 }}
            />
            {label(record)}
          </MaterialLink>
        </div>
      );
    }

    return <div key={record.id}>{label(record)}</div>;
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

UserListItem.propTypes = {
  value: PropTypes.any,
};

export default UserListItem;
