import { CircularProgress } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

interface SpinnerProps {
  size?: number;
}

function Spinner({ size }: SpinnerProps) {
  const { sidenavColor } = selectMuiSettings();
  return (
    <div
      style={{
        width: '100%',
        marginTop: size / 2 + 'px',
        marginBottom: size / 2 + 'px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress color={sidenavColor} size={size} />
    </div>
  );
}

Spinner.defaultProps = {
  size: 40,
};

export default Spinner;
