import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import MDButton from 'src/mui/components/MDButton';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.brokerPost.fields.name'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  email: yupFormSchemas.email(
    i18n('entities.brokerPost.fields.email'),
    {
      min: 1,
      max: 255,
    },
  ),
  rating: yupFormSchemas.integer(
    i18n('entities.brokerPost.fields.rating'),
    {
      min: 0,
      max: 5,
    },
  ),
  created: yupFormSchemas.datetime(
    i18n('entities.brokerPost.fields.created'),
  ),
  review: yupFormSchemas.string(
    i18n('entities.brokerPost.fields.review'),
    {
      required: true,
    },
  ),
});

function BrokerPostForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      email: record.email || '',
      rating: record.rating,
      created: record.created || '',
      review: record.review,
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
              <InputFormItem
                name="name"
                label={i18n(
                  'entities.brokerPost.fields.name',
                )}
                variant="standard"
                required={true}
                autoFocus
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputFormItem
                name="email"
                label={i18n(
                  'entities.brokerPost.fields.email',
                )}
                variant="standard"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputNumberFormItem
                name="rating"
                label={i18n(
                  'entities.brokerPost.fields.rating',
                )}
                variant="standard"
                size={'5'}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <DatePickerFormItem
                name="created"
                label={i18n(
                  'entities.brokerPost.fields.created',
                )}
                variant="standard"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <HtmlEditorFormItem
                name="review"
                label={i18n(
                  'entities.brokerPost.fields.review',
                )}
                value={initialValues.review}
                required={true}
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

export default BrokerPostForm;
