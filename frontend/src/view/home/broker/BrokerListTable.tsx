import { CardMedia, TableContainer } from '@mui/material';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import actions from 'src/modules/broker/home/brokerHomeActions';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Pagination from 'src/view/shared/table/Pagination';
import RatingListItem from 'src/view/shared/table/RatingListItem';
import selectors from 'src/modules/broker/home/brokerHomeSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

function BrokerListTable(props) {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);

  const loading = findLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'asc'
        ? 'desc'
        : 'asc';

    dispatch(
      actions.doChangeSort({
        field,
        order,
      }),
    );
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  useEffect(() => {
    dispatch(
      actions.doFetch(
        {
          activated: true,
          category: props.category,
        },
        null,
        false,
      ),
    );
    setDispatched(true);
  }, [props.category]);

  return (
    <MDBox my={3}>
      <TableContainer
        id="list-top-4-pagination"
        sx={{ boxShadow: 'none' }}
      >
        <Table>
          <MDBox component="thead">
            <TableRow>
              <DataTableHeadCell sorted={false} px={1}>
                {' '}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} px={1}>
                {i18n(
                  'entities.broker.fields.minimum_deposit',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                px={1}
                onClick={() =>
                  doChangeSort(
                    'broker_rating.overall_reviews',
                  )
                }
                sorted={
                  sorter.field ===
                  'broker_rating.overall_reviews'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.brokerPost.fields.review')}
              </DataTableHeadCell>
              <DataTableHeadCell
                px={1}
                onClick={() =>
                  doChangeSort(
                    'broker_rating.overall_rating',
                  )
                }
                sorted={
                  sorter.field ===
                  'broker_rating.overall_rating'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.brokerPost.fields.rating')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} px={1}>
                {i18n('entities.broker.fields.regulation')}
              </DataTableHeadCell>
              <DataTableHeadCell
                px={1}
                onClick={() => doChangeSort('name')}
                sorted={
                  sorter.field === 'name'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.broker.fields.name')}
              </DataTableHeadCell>
            </TableRow>
          </MDBox>
          <TableBody>
            {dispatched && loading && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <Spinner />
                </DataTableBodyCell>
              </TableRow>
            )}
            {dispatched && !loading && !hasRows && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <MDTypography align="center">
                    {i18n('table.noData')}
                  </MDTypography>
                </DataTableBodyCell>
              </TableRow>
            )}
            {dispatched &&
              !loading &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <DataTableBodyCell width="auto" px={1}>
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
                  </DataTableBodyCell>
                  <DataTableBodyCell width="auto" px={1}>
                    {row.meta?.minimum_deposit}
                  </DataTableBodyCell>
                  <DataTableBodyCell width="auto" px={1}>
                    {row.rating?.overall_reviews}
                  </DataTableBodyCell>
                  <DataTableBodyCell width="auto" px={1}>
                    <RatingListItem
                      precision={0.1}
                      value={
                        row.rating?.overall_rating ?? 0
                      }
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
                  </DataTableBodyCell>
                  <DataTableBodyCell width="auto" px={1}>
                    {(row.regulatory_authorities || [])
                      .map((v) => v.abbreviation)
                      .join(', ')}
                  </DataTableBodyCell>
                  <DataTableBodyCell width="auto" px={1}>
                    <MaterialLink
                      component={Link}
                      to={`/erfahrungsberichte/${row.name_normalized}`}
                      underline="hover"
                    >
                      {`${row.name
                        .replace(/\([\w\d\s]+\)/g, '')
                        .trim()} Erfahrungen`}
                    </MaterialLink>
                  </DataTableBodyCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!loading && hasRows && (
        <MDBox mt={2}>
          <Pagination
            onChange={doChangePagination}
            disabled={loading}
            pagination={pagination}
            noPadding
            entriesPerPage
            showTotalEntries
          />
        </MDBox>
      )}
    </MDBox>
  );
}

export default BrokerListTable;
