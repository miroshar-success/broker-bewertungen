import React from 'react';
import { TableCell, TableSortLabel } from '@mui/material';

function TableCellCustom(props) {
  const {
    sorter,
    onSort,
    name,
    label,
    hasRows,
    children,
    size = 'auto',
    align = 'left',
    ...rest
  } = props;

  const style =
    {
      auto: {},
      sm: {
        width: '80px',
      },
      md: {
        width: '180px',
      },
    }[size] || {};

  if (!hasRows || !onSort) {
    return (
      <TableCell align={align} style={style} {...rest}>
        {children || label || ''}
      </TableCell>
    );
  }

  return (
    <TableCell
      key={name}
      style={style}
      sortDirection={
        sorter.field === name ? sorter.order : false
      }
      align={align}
    >
      <TableSortLabel
        active={sorter.field === name}
        direction={sorter.order}
        onClick={() => onSort(name)}
      >
        {children || label || ''}
      </TableSortLabel>
    </TableCell>
  );
}

export default TableCellCustom;
