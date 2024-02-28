import React from 'react';
import PropTypes from 'prop-types';
import { rgbToHex, useTheme } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import * as colors from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Radio from '@mui/material/Radio';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import Slider from '@mui/material/Slider';
import { i18n } from 'src/i18n';
import { Box } from '@mui/material';

const defaults = {
  primary: '#2196f3',
  secondary: '#f50057',
};
const hues = Object.keys(colors).slice(1, 17);
const shades = [
  900,
  800,
  700,
  600,
  500,
  400,
  300,
  200,
  100,
  50,
  'A700',
  'A400',
  'A200',
  'A100',
];

const styles = (theme) => ({
  colorPicker: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  radio: {
    padding: 0,
  },
  radioIcon: {
    width: 48,
    height: 48,
  },
  radioIconSelected: {
    width: 48,
    height: 48,
    border: '1px solid white',
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swatch: {
    width: 192,
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  slider: {
    width: 'calc(100% - 80px)',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  colorBar: {
    marginTop: theme.spacing(2),
  },
  colorSquare: {
    width: 64,
    height: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginLeft: theme.spacing(1),
  },
});

function MaterialUIColorTool(props) {
  const { classes, onChange, defaultValue } = props;
  const theme = useTheme();

  const safeDefaultValue = (defaultValue) => {
    if (
      !defaultValue ||
      !defaultValue.primary ||
      !defaultValue.secondary
    ) {
      return defaults;
    }

    return defaultValue;
  };

  const [state, setState] = React.useState({
    primary: safeDefaultValue(defaultValue).primary,
    secondary: safeDefaultValue(defaultValue).secondary,
    primaryInput: safeDefaultValue(defaultValue).primary,
    secondaryInput:
      safeDefaultValue(defaultValue).secondary,
    primaryHue: 'blue',
    secondaryHue: 'pink',
    primaryShade: 4,
    secondaryShade: 11,
  });

  const handleChangeColor = (name) => (event) => {
    const isRgb = (string) =>
      /rgb\([0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\)/i.test(
        string,
      );

    const isHex = (string) =>
      /^#?([0-9a-f]{3})$|^#?([0-9a-f]){6}$/i.test(string);

    let {
      target: { value: color },
    } = event;

    setState((prevState) => ({
      ...prevState,
      [`${name}Input`]: color,
    }));

    let isValidColor = false;

    if (isRgb(color)) {
      isValidColor = true;
    } else if (isHex(color)) {
      isValidColor = true;
      if (color.indexOf('#') === -1) {
        color = `#${color}`;
      }
    }

    if (isValidColor) {
      setState((prevState) => ({
        ...prevState,
        [name]: color,
      }));

      onChange({
        primary: state['primary'],
        secondary: state['secondary'],
        [name]: color,
      });
    }
  };

  const handleChangeHue = (name) => (event) => {
    const {
      target: { value: hue },
    } = event;
    const color =
      colors[hue][shades[state[`${name}Shade`]]];

    setState({
      ...state,
      [`${name}Hue`]: hue,
      [name]: color,
      [`${name}Input`]: color,
    });

    onChange({
      primary: state['primary'],
      secondary: state['secondary'],
      [name]: color,
    });
  };

  const handleChangeShade = (name) => (event, shade) => {
    const color =
      colors[state[`${name}Hue`]][shades[shade]];
    setState({
      ...state,
      [`${name}Shade`]: shade,
      [name]: color,
      [`${name}Input`]: color,
    });

    onChange({
      primary: state['primary'],
      secondary: state['secondary'],
      [name]: color,
    });
  };

  const colorBar = (color) => {
    const background = theme.palette.augmentColor({
      color: {
        main: color,
      },
    });

    return (
      <Grid container className={classes.colorBar}>
        {['dark', 'main', 'light'].map((key) => (
          <div
            className={classes.colorSquare}
            style={{ backgroundColor: background[key] }}
            key={key}
          >
            <Typography
              variant="caption"
              style={{
                color: theme.palette.getContrastText(
                  background[key],
                ),
              }}
            >
              {rgbToHex(background[key])}
            </Typography>
          </div>
        ))}
      </Grid>
    );
  };

  const colorPicker = (intent) => {
    const intentInput = state[`${intent}Input`];
    const intentShade = state[`${intent}Shade`];
    const color = state[`${intent}`];

    return (
      <Box className={classes.colorPicker}>
        <Typography gutterBottom variant="h6">
          {i18n(`settings.fields.${intent}`)}
        </Typography>
        <Input
          id={intent}
          value={intentInput}
          onChange={handleChangeColor(intent)}
          fullWidth
        />
        <div className={classes.sliderContainer}>
          <Typography id={`${intent}ShadeSliderLabel`}>
            {i18n('settings.fields.shade')}:
          </Typography>
          <Slider
            className={classes.slider}
            value={intentShade}
            min={0}
            max={13}
            step={1}
            onChange={handleChangeShade(intent)}
            aria-labelledby={`${intent}ShadeSliderLabel`}
          />
          <Typography>{shades[intentShade]}</Typography>
        </div>
        <div className={classes.swatch}>
          {hues.map((hue) => {
            const shade =
              intent === 'primary'
                ? shades[state.primaryShade]
                : shades[state.secondaryShade];
            const backgroundColor = colors[hue][shade];

            return (
              <Tooltip
                placement="right"
                title={hue}
                key={hue}
              >
                <Radio
                  className={classes.radio}
                  color="default"
                  checked={
                    state[intent] === backgroundColor
                  }
                  onChange={handleChangeHue(intent)}
                  value={hue}
                  name={intent}
                  aria-labelledby={`tooltip-${intent}-${hue}`}
                  icon={
                    <div
                      className={classes.radioIcon}
                      style={{ backgroundColor }}
                    />
                  }
                  checkedIcon={
                    <div
                      className={classes.radioIconSelected}
                      style={{ backgroundColor }}
                    >
                      <CheckIcon style={{ fontSize: 30 }} />
                    </div>
                  }
                  size="small"
                />
              </Tooltip>
            );
          })}
        </div>
        {colorBar(color)}
      </Box>
    );
  };

  return (
    <Box display="flex" flexWrap="wrap">
      {colorPicker('primary')}
      {colorPicker('secondary')}
    </Box>
  );
}

MaterialUIColorTool.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
};

export default withStyles(styles)(MaterialUIColorTool);
