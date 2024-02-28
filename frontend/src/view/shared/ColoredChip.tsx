import React from 'react';
import { Chip } from '@mui/material';

function ColoredChip(props) {
  const { color, label, style: inheritedStyle } = props;

  const backgroundColors = {
    green: '#28a745',
    red: '#dc3545',
    yellow: '#ffc107',
  };

  const textColors = {
    green: '#fff',
    red: '#fff',
    yellow: '#fff',
  };

  const style = color
    ? {
        backgroundColor: backgroundColors[color],
        color: textColors[color],
        ...inheritedStyle,
      }
    : { ...inheritedStyle };

  return <Chip size="small" style={style} label={label} />;
}

export default ColoredChip;
