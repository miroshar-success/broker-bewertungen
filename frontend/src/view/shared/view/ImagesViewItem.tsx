import PropTypes from 'prop-types';
import React from 'react';
import ImagesUploader from 'src/view/shared/uploaders/ImagesUploader';
import { Typography } from '@mui/material';
import MDTypography from 'src/mui/components/MDTypography';
import MDBox from 'src/mui/components/MDBox';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import NoViewItem from 'src/view/shared/view/NoViewItem';

function ImagesViewItem(props) {
  const { darkMode } = selectMuiSettings();
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
    <MDBox position="relative">
      <MDTypography
        variant="caption"
        color={darkMode ? 'text' : 'secondary'}
        fontWeight="regular"
	lineHeight={1}
	position="absolute"
	top="0"
      >
        {props.label}
      </MDTypography>
      <ImagesUploader readonly value={valueAsArray()} />
    </MDBox>
  );
}

ImagesViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

export default ImagesViewItem;
