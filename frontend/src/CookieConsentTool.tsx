import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CookieConsent from 'react-cookie-consent';
import CookieConsentModal from 'src/CookieConsentModal';
import darkColors from 'src/mui/assets/theme-dark/base/colors';
import dBorders from 'src/mui/assets/theme-dark/base/borders';
import dBoxShadows from 'src/mui/assets/theme-dark/base/boxShadows';
import lBorders from 'src/mui/assets/theme/base/borders';
import lBoxShadows from 'src/mui/assets/theme/base/boxShadows';
import lightColors from 'src/mui/assets/theme/base/colors';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function CookieConsentTool({ darkMode }) {
  const [visible, setVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const btnStyle = {
    background: darkMode
      ? darkColors.info.main
      : lightColors.info.main,
    color: 'white',
    fontSize: '1rem',
    borderRadius: darkMode
      ? dBorders.borderRadius.sm
      : lBorders.borderRadius.sm,
    display: 'block',
    width: '100%',
    margin: 0,
  };

  const onClose = () => setModalVisible(false);

  if (!visible) {
    return null;
  }
  return (
    <MDBox>
      <CookieConsent
        location="bottom"
        buttonText="Alles akzeptieren"
        declineButtonText="Alles ablehnen"
        cookieName="broker-consent-cookie"
        style={{
          background: darkMode
            ? darkColors.dark.main
            : lightColors.white.main,
          color: 'inherit',
          boxShadow: darkMode
            ? dBoxShadows.lg
            : lBoxShadows.lg,
          borderRadius: darkMode
            ? dBorders.borderRadius.md
            : lBorders.borderRadius.md,
          fontSize: '1rem',
          zIndex: '+99999',
          padding: '16px',
          paddingRight: '32px',
        }}
        buttonStyle={btnStyle}
        declineButtonStyle={{
          ...btnStyle,
          marginTop: '16px',
        }}
        expires={150}
        enableDeclineButton
        flipButtons
      >
        <MDTypography variant="body1" fontWeight="bold">
          Datenschutz auf dieser Seite
        </MDTypography>
        <MDTypography variant="body2" fontWeight="regular">
          Wir erheben und verarbeiten Ihre Daten auf dieser
          Website, um besser zu verstehen, wie sie verwendet
          wird. Sie können allen oder ausgewählten
          Verwendungszwecken zustimmen oder alle ablehnen.
          Weitere Informationen finden Sie in unserer
          Datenschutzerklärung.
        </MDTypography>
        <MDButton
          onClick={() => setVisible(false)}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          size="small"
          iconOnly
        >
          <CloseIcon />
        </MDButton>
        <MDBox display="flex">
          {/* <MDTypography
            variant="body2"
            fontWeight="regular"
            color="info"
            sx={{
              cursor: 'pointer',
            }}
          >
            Einzelheiten der Einwilligung
          </MDTypography> */}
          <MDTypography
            onClick={() => setModalVisible(true)}
            variant="body2"
            fontWeight="regular"
            color="info"
            sx={{
              cursor: 'pointer',
            }}
          >
            Datenschutzerklärung
          </MDTypography>
        </MDBox>
      </CookieConsent>
      {modalVisible && (
        <CookieConsentModal onClose={onClose} />
      )}
    </MDBox>
  );
}

CookieConsentTool.defaultProps = {
  darkMode: false,
};

CookieConsentTool.propTypes = {
  darkMode: PropTypes.bool,
};

export default CookieConsentTool;
