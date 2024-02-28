import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { useForm, FormProvider } from 'react-hook-form';
import { i18n } from 'src/i18n';
import actions from 'src/modules/settings/settingsActions';
import selectors from 'src/modules/settings/settingsSelectors';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import settingsThemeConverter from 'src/modules/settings/settingsThemeConverter';
import ImagesFormItem from '../shared/form/items/ImagesFormItem';
import Storage from 'src/security/storage';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import formActions from 'src/modules/form/formActions';

const schema = yup.object().shape({
  theme: yup
    .string()
    .nullable(true)
    .label(i18n('settings.fields.theme'))
    .required()
    .transform((_, originalValue) => {
      return settingsThemeConverter.toString(originalValue);
    }),
  logos: yupFormSchemas.files(
    i18n('settings.fields.logos'),
    {
      max: 1,
    },
  ),
  backgroundImages: yupFormSchemas.files(
    i18n('settings.fields.backgroundImages'),
    {
      max: 1,
    },
  ),
});

function SettingsForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [
    materialUIColorToolKey,
    setMaterialUIColorToolKey,
  ] = useState(0);

  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );

  const settings = props.settings;

  const [initialValues] = useState(() => {
    return {
      ...(settings || {}),
      theme: settingsThemeConverter.fromString(
        settings && settings.theme,
      ),
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  useEffect(() => {
    form.register({ name: 'theme' });
  }, []);

  const onSubmit = (values) => {
    dispatch(actions.doSave(values));
  };

  const onReset = () => {
    // little hack to reset the uncontrolled component
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    setMaterialUIColorToolKey((prevState) => prevState + 1);
    dispatch(formActions.doRefresh());
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MDBox mb={3}>
            <ImagesFormItem
              name="logos"
              label={i18n('settings.fields.logos')}
              storage={Storage.values.settingsLogos}
              max={1}
            />
          </MDBox>

          <MDBox mb={3}>
            <ImagesFormItem
              name="backgroundImages"
              label={i18n(
                'settings.fields.backgroundImages',
              )}
              storage={
                Storage.values.settingsBackgroundImages
              }
              max={1}
            />
          </MDBox>

          <FormButtons>
            <MDButton
              variant="gradient"
              color={sidenavColor}
              disabled={saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              startIcon={<SaveIcon />}
              size="small"
            >
              {i18n('common.save')}
            </MDButton>

            <MDButton
              variant="outlined"
              color={sidenavColor}
              disabled={saveLoading}
              onClick={onReset}
              type="button"
              startIcon={<UndoIcon />}
              size="small"
            >
              {i18n('common.reset')}
            </MDButton>

            {props.onCancel ? (
              <MDButton
                variant="outlined"
                color={sidenavColor}
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                type="button"
                startIcon={<CloseIcon />}
                size="small"
              >
                {i18n('common.cancel')}
              </MDButton>
            ) : null}
          </FormButtons>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default SettingsForm;
