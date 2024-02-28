import { AuthToken } from 'src/modules/auth/authToken';
import { CKEditor } from 'ckeditor4-react';
import { getLanguageCode } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';
import config from 'src/config';
import FormErrors from 'src/view/shared/form/formErrors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import { useSelector } from 'react-redux';
import formSelectors from 'src/modules/form/formSelectors';

interface HtmlEditorFormItemProps {
  name: string;
  label?: string;
  value?: string;
  required?: boolean;
  height: number;
  hideLabel?: boolean;
  externalErrorMessage?: string;
  toolbars?: {
    name: string;
    groups?: string[];
  }[];
}

function HtmlEditorFormItem({
  name,
  label,
  value,
  required,
  height,
  hideLabel,
  externalErrorMessage,
  toolbars,
}: HtmlEditorFormItemProps) {
  const token = AuthToken.get();

  const ckeditorConfig: any = {
    extraPlugins: [
      'iframe',
      'image2',
      'uploadimage',
      'colorbutton',
      'colordialog',
    ],
    extraAllowedContent: 'iframe[*]',
    height,
    resize_minHeight: height,
    resize_maxHeight: height * 2,
    filebrowserUploadUrl: [
      config.backendUrl,
      '/tenant/',
      AuthCurrentTenant.get(),
      '/file/ckeditor',
    ].join(''),
    fileTools_requestHeaders: {
      Authorization: `Bearer ${token}`,
      'Accept-Language': getLanguageCode(),
    },
  };

  if (toolbars) {
    ckeditorConfig.toolbarGroups = toolbars;
  }

  const {
    control: { defaultValuesRef },
    errors,
    formState: { touched, isSubmitted },
    getValues,
    register,
    setValue,
  } = useFormContext();

  const defaultValues = defaultValuesRef.current || {};

  const formValue = name ? getValues(name) : null;

  const getInitialValue = () =>
    ![null, undefined].includes(formValue)
      ? formValue
      : value || defaultValues[name] || '';

  const [curValue, setCurValue] = useState(
    getInitialValue(),
  );

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  useEffect(() => {
    if (name) {
      register({ name });
    }
  }, [register, name]);

  const refresh = useSelector(formSelectors.selectRefresh);

  const [editor, setEditor] = useState(null);

  useEffect(() => {
    editor?.setData(getInitialValue());
    setCurValue(getInitialValue());
  }, [refresh]);

  const { darkMode } = selectMuiSettings();

  const updateValue = (value) => {
    setCurValue(value);
    setValue(name, value, {
      shouldValidate: false,
      shouldDirty: true,
    });
  };

  const onChangeEditor = (evt) => {
    setEditor(evt.editor);
    updateValue(evt.editor?.getData());
  };

  return (
    <MDBox
      pt={!hideLabel && Boolean(label) ? 2 : 0}
      position="relative"
    >
      {!hideLabel && Boolean(label) && (
        <MDTypography
          variant="caption"
          color={darkMode ? 'text' : 'secondary'}
          fontWeight="regular"
          sx={{
            lineHeight: 1,
            position: 'absolute',
            top: 0,
          }}
        >
          {`${label}${required ? ' *' : ''}`}
        </MDTypography>
      )}
      <CKEditor
        initData={curValue}
        config={ckeditorConfig}
        onChange={onChangeEditor}
      />
      {errorMessage && (
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            {errorMessage}
          </MDTypography>
        </MDBox>
      )}
    </MDBox>
  );
}

HtmlEditorFormItem.defaultProps = {
  height: 300,
  hideLabel: false,
  required: false,
  value: '',
};

export default HtmlEditorFormItem;
