import {
  Box,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { i18n } from '../../i18n';
import MaterialLink from '@mui/material/Link';
import RatingViewItem from '../shared/RatingViewItem';
import React from 'react';

function BrokerListTable({ rows, ...props }) {
  return (
    <Box my={3}>
      <TableContainer
        id="list-top-4-pagination"
        sx={{ boxShadow: 'none' }}
      >
        <Table>
          <Box component="thead">
            <TableRow>
              <TableCell> </TableCell>
              <TableCell>
                {i18n(
                  'entities.broker.fields.minimum_deposit',
                )}
              </TableCell>
              <TableCell>
                {i18n('entities.brokerPost.fields.review')}
              </TableCell>
              <TableCell>
                {i18n('entities.brokerPost.fields.rating')}
              </TableCell>
              <TableCell>
                {i18n('entities.broker.fields.regulation')}
              </TableCell>
              <TableCell>
                {i18n('entities.broker.fields.name')}
              </TableCell>
            </TableRow>
          </Box>
          <TableBody>
            {(!rows || !rows.length) && (
              <TableRow>
                <TableCell align="center" colSpan={100}>
                  <Typography align="center">
                    {i18n('table.noData')}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <MaterialLink
                    href={row.meta?.homepage}
                    target="_blank"
                    underline="hover"
                  >
                    <CardMedia
                      component="img"
                      image={
                        row.broker_image_broker_logo[0]
                          ?.downloadUrl
                      }
                      alt={row.name}
                      sx={{
                        margin: 0,
                        borderRadius: 0,
                        width: 115,
                        height: 45,
                      }}
                    />
                  </MaterialLink>
                </TableCell>
                <TableCell>
                  {row.meta?.minimum_deposit}
                </TableCell>
                <TableCell>
                  {row.rating?.overall_reviews}
                </TableCell>
                <TableCell>
                  <RatingViewItem
                    precision={0.1}
                    value={row.rating?.overall_rating ?? 0}
                    emptyIcon={
                      <img
                        src="/images/star-grey.png"
                        height="16px"
                        alt="star-grey"
                      />
                    }
                    icon={
                      <img
                        src="/images/star-fill.png"
                        height="16px"
                        alt="star-fill"
                      />
                    }
                  />
                </TableCell>
                <TableCell>
                  {(row.regulatory_authorities || [])
                    .map((v) => v.abbreviation)
                    .join(', ')}
                </TableCell>
                <TableCell>
                  <MaterialLink
                    href={`/erfahrungsberichte/${row.name_normalized}`}
                    underline="hover"
                  >
                    {`${row.name
                      .replace(/\([\w\d\s]+\)/g, '')
                      .trim()} Erfahrungen`}
                  </MaterialLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default BrokerListTable;
