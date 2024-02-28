import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import config from 'src/config';
import FormErrors from 'src/view/shared/form/formErrors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';

function ReCaptchaV2FormItem(props) {
  const { darkMode } = selectMuiSettings();
  const { externalErrorMessage, name, recaptchaRef } =
    props;

  const {
    errors,
    formState: { touched, isSubmitted },
    register,
    setValue,
  } = useFormContext();

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  return (
    <>
      <MDBox
        display="flex"
        justifyContent="center"
        width="100%"
      >
        <ReCAPTCHA
          onChange={(value) => {
            setValue(name, value, {
              shouldValidate: false,
              shouldDirty: true,
            });
          }}
          ref={recaptchaRef}
          sitekey={config.reCaptchaV2SiteKey}
          theme={darkMode ? 'dark' : 'light'}
        />
      </MDBox>
      {errorMessage && (
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
            textAlign="center"
          >
            {errorMessage}
          </MDTypography>
        </MDBox>
      )}
    </>
  );
}

ReCaptchaV2FormItem.defaultProps = {
  name: 'recaptcha',
  recaptchaRef: null,
};

ReCaptchaV2FormItem.propTypes = {
  externalErrorMessage: PropTypes.string,
  name: PropTypes.string,
  recaptchaRef: PropTypes.any,
};

export default ReCaptchaV2FormItem;
