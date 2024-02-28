import { Autocomplete, Icon } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDInput from 'src/mui/components/MDInput';
import MDPagination from 'src/mui/components/MDPagination';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import ScrollTo from 'src/ScrollTo';
import { useEffect, useState } from 'react';

function Pagination(props) {
  const { entriesPerPage, showTotalEntries, pagination } =
    props;
  const { current, pageSize, total } = pagination;

  if (!pageSize) {
    return null;
  }

  const { sidenavColor } = selectMuiSettings();
  const defaultPageSize =
    entriesPerPage?.defaultPageSize || 10;

  let entries: any[];

  entries = entriesPerPage?.entries || [
    '5',
    '10',
    '25',
    '50',
    '100',
  ];

  const onChangeRowsPerPage = (pageSize) => {
    props.onChange({
      current: 1,
      pageSize: pageSize || defaultPageSize,
    });
  };

  const onChangePage = (pageNum) => {
    ScrollTo('list-top-4-pagination');
    if (pageNum === current) {
      return;
    }
    const pageSize = Number(
      props.pagination.pageSize || 10,
    );
    if (pageNum > last) {
      pageNum = last;
    }
    if (pageNum < 1) {
      pageNum = 1;
    }
    props.onChange({
      current: pageNum,
      pageSize,
    });
  };

  const labelDisplayedRows =
    props.labelDisplayedRows ||
    (({ from, to, count }) =>
      i18n(
        'pagination.labelDisplayedRows',
        from,
        to,
        count,
      ));

  const entriesStart = pageSize * (current - 1) + 1;
  const entriesEnd =
    pageSize * current > total ? total : pageSize * current;
  const last = Math.ceil(total / pageSize);
  const canPreviousPage = current > 1;
  const canNextPage = current < last;

  const [pageOptionsCount, setPageOptionsCount] =
    useState(5);

  useEffect(() => {
    const handlePageOptionsCount = () => {
      if (window.innerWidth > 1200) {
        setPageOptionsCount(5);
      } else {
        setPageOptionsCount(3);
      }
    };
    window.addEventListener(
      'resize',
      handlePageOptionsCount,
    );
    handlePageOptionsCount();
    return () =>
      window.removeEventListener(
        'resize',
        handlePageOptionsCount,
      );
  }, []);

  const pageOptionsIndex = Math.ceil(
    current / pageOptionsCount,
  );

  let pageOptionsStart =
    (pageOptionsIndex - 1) * pageOptionsCount + 1;
  let pageOptionsEnd = pageOptionsIndex * pageOptionsCount;
  const offset = Math.floor(
    (pageOptionsEnd + pageOptionsStart - 2 * current) / 2,
  );
  pageOptionsStart -= offset;
  pageOptionsEnd -= offset;
  pageOptionsStart < 1 && (pageOptionsStart = 1);
  pageOptionsEnd > last && (pageOptionsEnd = last);
  if (
    last > pageOptionsCount &&
    pageOptionsEnd - pageOptionsStart + 1 < pageOptionsCount
  ) {
    pageOptionsStart === 1 &&
      (pageOptionsEnd = pageOptionsCount);
    pageOptionsEnd === last &&
      (pageOptionsStart = last - pageOptionsCount + 1);
  }
  if (last <= pageOptionsCount) {
    pageOptionsStart = 1;
    pageOptionsEnd = last;
  }

  const pageOptions = [];

  for (
    let pageOpt = pageOptionsStart;
    pageOpt <= pageOptionsEnd;
    pageOpt++
  ) {
    pageOptions.push(pageOpt);
  }

  const renderPagination = pageOptions.map(
    (option: any) => (
      <MDPagination
        item
        key={option}
        onClick={() => onChangePage(Number(option))}
        active={current === option}
      >
        {option}
      </MDPagination>
    ),
  );

  // Handler for the input to set the pagination index
  const handleInputPagination = ({
    target: { value },
  }: any) =>
    value < 1
      ? onChangePage(1)
      : value > last
      ? onChangePage(last)
      : onChangePage(Number(value));

  // Setting value for the pagination input
  const handleInputPaginationValue = ({
    target: value,
  }: any) => onChangePage(Number(value));

  return (
    <>
      <MDBox
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        p={
          !showTotalEntries && last === 1
            ? 0
            : props.noPadding
            ? 0
            : 3
        }
      >
        {entriesPerPage && (
          <MDBox display="flex" alignItems="center">
            <Autocomplete
              disableClearable
              value={pageSize.toString()}
              options={entries}
              onChange={(event, newValue) => {
                onChangeRowsPerPage(parseInt(newValue, 10));
              }}
              size="small"
              sx={{ width: '5rem' }}
              renderInput={(params) => (
                <MDInput {...params} />
              )}
            />
          </MDBox>
        )}
        {showTotalEntries && total > 0 && (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="secondary"
            >
              {labelDisplayedRows({
                from: entriesStart,
                to: entriesEnd,
                count: total,
              })}
            </MDTypography>
          </MDBox>
        )}
        {last > 1 && (
          <MDPagination
            variant={
              pagination.variant
                ? pagination.variant
                : 'gradient'
            }
            color={
              pagination.color
                ? pagination.color
                : sidenavColor
            }
          >
            <MDPagination
              onClick={() =>
                canPreviousPage && onChangePage(1)
              }
              item
            >
              <Icon sx={{ fontWeight: 'bold' }}>
                first_page
              </Icon>
            </MDPagination>
            <MDPagination
              onClick={() =>
                canPreviousPage && onChangePage(current - 1)
              }
              item
            >
              <Icon sx={{ fontWeight: 'bold' }}>
                chevron_left
              </Icon>
            </MDPagination>
            {renderPagination.length > 6 ? (
              <MDBox mx={1} textAlign="center">
                <MDInput
                  inputProps={{
                    type: 'number',
                    min: 1,
                    max: last,
                    step: 1,
                  }}
                  value={current}
                  onChange={(event: any) => {
                    onChangePage(event.target.value);
                  }}
                  size="small"
                />
              </MDBox>
            ) : (
              renderPagination
            )}
            <MDPagination
              onClick={() =>
                canNextPage && onChangePage(current + 1)
              }
              item
            >
              <Icon sx={{ fontWeight: 'bold' }}>
                chevron_right
              </Icon>
            </MDPagination>
            <MDPagination
              onClick={() =>
                canNextPage && onChangePage(last)
              }
              item
            >
              <Icon sx={{ fontWeight: 'bold' }}>
                last_page
              </Icon>
            </MDPagination>
          </MDPagination>
        )}
      </MDBox>
    </>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  labelDisplayedRows: PropTypes.func,
  entriesPerPage: PropTypes.any,
  showTotalEntries: PropTypes.bool,
  noPadding: PropTypes.bool,
};

export default Pagination;
