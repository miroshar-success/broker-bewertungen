import { Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDButton from 'src/mui/components/MDButton';
import openxEnumerators from '../../../modules/openx/openxEnumerators';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import OpenxAutocompleteFormItem from 'src/view/openx/autocomplete/OpenxAutocompleteFormItem';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import { openxZoneOptions } from 'src/modules/openx/openxUtils';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import formActions from 'src/modules/form/formActions';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
  code: yupFormSchemas.string(
    i18n('entities.openx.fields.code'),
    {
      required: true,
    },
  ),
  noscript: yupFormSchemas.string(
    i18n('entities.openx.fields.noscript'),
    {},
  ),
  zone: yupFormSchemas.enumerator(
    i18n('entities.openx.fields.zone'),
    {
      options: openxEnumerators.zone,
      required: true,
    },
  ),
  activated: yupFormSchemas.boolean(
    i18n('entities.openx.fields.activated'),
    {},
  ),
});

function OpenxForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      code: record.code ?? null,
      noscript: record.noscript ?? null,
      zone: record.zone ?? null,
      activated: record.activated ?? false,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    props.onSubmit(props.record?.id, values);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  const { saveLoading, modal } = props;

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid spacing={2} container>
            <Grid item md={12} xs={12}>
              <TextAreaFormItem
                name="code"
                label={i18n('entities.openx.fields.code')}
                variant="standard"
                required={true}
                autoFocus
                fullWidth
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextAreaFormItem
                name="noscript"
                label={i18n(
                  'entities.openx.fields.noscript',
                )}
                variant="standard"
                required={false}
                fullWidth
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <SelectFormItem
                name="zone"
                label={i18n('entities.openx.fields.zone')}
                options={openxZoneOptions}
                variant="standard"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CheckboxFormItem
                name="activated"
                label={i18n(
                  'entities.openx.fields.activated',
                )}
              />
            </Grid>
          </Grid>
          <FormButtons
            style={{
              flexDirection: modal
                ? 'row-reverse'
                : undefined,
            }}
          >
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

export default OpenxForm;
