import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import MaterialLink from '@mui/material/Link';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@mui/material/Typography';

function AuthorView(props) {
  const { value } = props;
  if (!value) {
    return null;
  }
  return (
    <>
      <Box display="flex" gap={3}>
        {value.author_image && value.author_image[0] && (
          <Avatar
            alt={value.name}
            src={value.author_image[0]?.downloadUrl}
            sx={{ width: 96, height: 96 }}
          />
        )}
        <Box>
          <Typography variant="h4">
            <MaterialLink
              href={value.link}
              target="_blank"
              underline="hover"
            >
              {`Über ${value.name}`}
            </MaterialLink>
          </Typography>
          <Typography
            variant="body2"
            color="text"
            fontWeight="regular"
          >
            {value.description}
          </Typography>
          <Typography
            variant="body2"
            color="text"
            fontWeight="bold"
          >
            <MaterialLink
              href={value.link}
              target="_blank"
              underline="hover"
            >
              {`Mehr über ${value.name}`}
            </MaterialLink>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

AuthorView.propTypes = {
  value: PropTypes.object,
};

export default AuthorView;
