import { CardMedia } from '@mui/material';
import { useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDTypography from 'src/mui/components/MDTypography';

export function BrandLogo(props) {
  const { darkMode } = selectMuiSettings();
  const logoUrl = useSelector(authSelectors.selectLogoUrl);
  const brand = darkMode
    ? resources.brand.dark
    : resources.brand.white;
  return (
    <>
      <MDTypography
        variant="h4"
        fontWeight="regular"
        color="white"
      >
        {i18n('app.title')}
      </MDTypography>
      {/* <CardMedia
        src={logoUrl ? logoUrl : brand}
        component="img"
        sx={{
          maxWidth: '100%',
          width: props.width ? props.width : 'auto',
          margin: 0,
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      /> */}
    </>
  );
}

const resources = {
  brand: {
    white: '/images/vor-dark.svg',
    dark: '/images/vor-dark.svg',
  },
};
