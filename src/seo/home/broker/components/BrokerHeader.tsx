import { Grid } from '@mui/material';
import { i18n } from '../../../i18n';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ImageView from '../../shared/ImageView';
import OverallRating from '../shared/OverallRating';
import React from 'react';
import Typography from '@mui/material/Typography';

function BrokerHeader({ record }) {
  return (
    <Box py={2}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: record.name,
            brand: record.name,
            logo: record.broker_image_broker_detail_logo[0]
              .downloadUrl,
            image:
              record.broker_image_broker_detail_logo[0]
                .downloadUrl,
            review: {
              '@type': 'Review',
              reviewBody: record.meta?.teaser || '',
              author: [
                {
                  '@type': 'Person',
                  name: record.author?.name,
                  url: record.author?.link,
                },
              ],
            },
            sku: record.name_normalized,
            offers: { '@type': 'Demand' },
            description:
              record.meta?.teaser ||
              `Erfahrungen von ${record.name}`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: Number(
                record.rating?.overall_rating || 0,
              ).toFixed(2),
              worstRating: 1,
              bestRating: 5,
              ratingCount: record.rating?.overall_reviews,
            },
          }),
        }}
      />
      <Typography variant="h1" mb={2}>
        {`${record.name} Erfahrungen und Test`}
      </Typography>
      <Grid spacing={3} alignItems="stretch" container>
        <Grid md={6} xs={12} item>
          <ImageView
            value={record.broker_image_broker_detail_logo}
            alt={record.name}
            sx={{
              width: {
                xs: '100%',
                sm: undefined,
              },
              height: {
                xs: undefined,
                sm: '100%',
              },
            }}
          />
        </Grid>
        <Grid md={6} xs={12} item>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-end"
            gap={{ xs: 1, md: 1.5, lg: 2 }}
          >
            <OverallRating record={record} />
            <Button
              variant="contained"
              href={record.meta?.homepage}
              color="info"
              target="_blank"
              fullWidth
            >
              {i18n(
                'entities.broker.text.nowTo',
                record.name,
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BrokerHeader;
