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
import formActions from 'src/modules/form/formActions';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
  hash: yupFormSchemas.string(
    i18n('entities.affiliateLink.fields.hash'),
    {
      required: true,
      min: 1,
      max: 100,
    },
  ),
  link: yupFormSchemas.string(
    i18n('entities.affiliateLink.fields.link'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  display_hash: yupFormSchemas.string(
    i18n('entities.affiliateLink.fields.display_hash'),
    {
      required: false,
      min: 1,
      max: 255,
    },
  ),
  meta_data: yupFormSchemas.string(
    i18n('entities.affiliateLink.fields.meta_data'),
    {
      required: false,
      min: 1,
      max: 255,
    },
  ),
});

function AffiliateLinkForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      hash: record.hash,
      link: record.link,
      display_hash: record.display_hash,
      meta_info: record.meta_info,
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
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="hash"
                label={i18n(
                  'entities.affiliateLink.fields.hash',
                )}
                variant="standard"
                required={true}
                autoFocus
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="link"
                label={i18n(
                  'entities.affiliateLink.fields.link',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="display_hash"
                label={i18n(
                  'entities.affiliateLink.fields.display_hash',
                )}
                variant="standard"
                required={false}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="meta_info"
                label={i18n(
                  'entities.affiliateLink.fields.meta_info',
                )}
                variant="standard"
                required={false}
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

export default AffiliateLinkForm;
