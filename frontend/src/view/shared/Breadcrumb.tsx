import React from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumbs,
  Typography,
  Link as MaterialLink,
} from '@mui/material';

const isLink = (item) => {
  return item.length > 1;
};

function Breadcrumb(props) {
  return (
    <Breadcrumbs>
      {props.items.map((item) => {
        if (isLink(item)) {
          return (
            <MaterialLink
              key={item[0]}
              color="inherit"
              component={Link}
              to={item[1]}
              underline="hover"
            >
              {item[0]}
            </MaterialLink>
          );
        }

        return (
          <Typography key={item[0]} color="textPrimary">
            {item[0]}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
}

export default Breadcrumb;
