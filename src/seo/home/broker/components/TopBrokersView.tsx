import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import CircleNumber from '../../shared/CircleNumber';
import ImageView from '../../shared/ImageView';
import MaterialLink from '@mui/material/Link';
import OverallRating from '../shared/OverallRating';
import React from 'react';
import Typography from '@mui/material/Typography';
import { AspectRatio } from 'react-aspect-ratio';

function TopBrokersView({ rows = [] }) {
  return (
    <>
      <Grid spacing={2} container>
        {rows.map((row: any, idx) => (
          <Grid key={row.id} xs={12} item>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
            >
              <CircleNumber>{idx + 1}</CircleNumber>
              <Box
                display="flex"
                flexGrow={1}
                flexDirection="row"
                flexWrap="wrap"
                alignItems="center"
                gap={2}
              >
                <MaterialLink
                  flexShrink={0}
                  href={row.meta?.homepage}
                  target="_blank"
                >
                   <AspectRatio ratio="15/7" style={{ maxWidth: '100%' }}>
                    <ImageView
                      value={
                        row.broker_image_broker_detail_logo
                      }
                      alt={row.name}
                      sx={{
                        height: '70px',
                        objectFit: 'contain',
                      }}
                    />
                   </AspectRatio>
                  </MaterialLink>
                  <AspectRatio ratio="15/7" style={{ maxWidth: '100%' }}>

                <ImageView
                  value={
                    row.broker_image_broker_regulation_image
                  }
                  alt={row.name}
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    height: '60px',
                    objectFit: 'contain',
                  }}
                />
                   </AspectRatio>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <OverallRating
                    record={row}
                    size={32}
                    hideDescription
                    hidePercent
                  />
                  <Typography
                    variant="button"
                    color="text"
                    fontWeight="regular"
                    mt={0.5}
                    lineHeight={1}
                  >
                    <MaterialLink
                      href={`/erfahrungsberichte/${row.name_normalized}`}
                      underline="hover"
                    >
                      {`${row.rating?.overall_reviews} Erfahrungsberichte lesen`}
                    </MaterialLink>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

TopBrokersView.propTypes = {};

export default TopBrokersView;
