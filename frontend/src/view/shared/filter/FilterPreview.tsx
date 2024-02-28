import React from 'react';
import Chip from '@mui/material/Chip';
import { i18n } from 'src/i18n';
import { Stack } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDTypography from 'src/mui/components/MDTypography';
import MDBox from 'src/mui/components/MDBox';

export default function FilterPreview(props) {
  const { sidenavColor } = selectMuiSettings();

  const { values, renders, onRemove } = props;

  const itemsNotEmpty = Object.keys(values || {})
    .map((key) => {
      if (!renders[key]) {
        return {
          value: null,
        };
      }

      return {
        key: key,
        label: renders[key].label,
        value: renders[key].render(values[key]),
      };
    })
    .filter(
      (item) =>
        item.value ||
        item.value === 0 ||
        item.value === false,
    );

  if (!itemsNotEmpty.length || props.expanded) {
    return (
      <MDTypography variant="h6" color="text">
        {i18n('common.filters')}
      </MDTypography>
    );
  }

  return (
    <MDBox display="flex" alignItems="center" gap={1}>
      <MDTypography variant="h6" color="text">
        {i18n('common.filters')}:
      </MDTypography>
      <MDBox
        display="flex"
        alignItems="center"
        flexGrow={1}
        flexWrap="wrap"
        gap={1}
      >
        {itemsNotEmpty.map((item) => (
          <Chip
            key={item.key}
            color={sidenavColor}
            label={`${item.label}: ${item.value}`}
            size="small"
            onDelete={
              onRemove
                ? () => onRemove(item.key)
                : undefined
            }
          />
        ))}
      </MDBox>
    </MDBox>
  );
}
