import { Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { useForm, FormProvider } from 'react-hook-form';
import { i18n } from 'src/i18n';
import { useState } from 'react';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import TagsFormItem from 'src/view/shared/form/items/TagsFormItem';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import userEnumerators from 'src/modules/user/userEnumerators';
import { yupResolver } from '@hookform/resolvers/yup';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import formActions from 'src/modules/form/formActions';
import { useDispatch } from 'react-redux';

const singleSchema = yup.object().shape({
  email: yupFormSchemas.email(i18n('user.fields.email')),
  roles: yupFormSchemas.stringArray(
    i18n('user.fields.roles'),
    { required: true, min: 1 },
  ),
});

const multipleSchema = yup.object().shape({
  emails: yup
    .array()
    .label(i18n('user.fields.emails'))
    .of(
      yup
        .string()
        .transform((cv, ov) => {
          return ov === '' ? null : cv;
        })
        .email(i18n('user.validations.email'))
        .label(i18n('user.fields.email'))
        .max(255)
        .required(),
    )
    .required()
    .min(1),
  roles: yupFormSchemas.stringArray(
    i18n('user.fields.roles'),
    { required: true, min: 1 },
  ),
});

function UserNewForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const { single, saveLoading, modal } = props;

  const schema = props.single
    ? singleSchema
    : multipleSchema;

  const [initialValues] = useState(() => ({
    emails: [],
    email: '',
    roles: [],
  }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    const { ...data } = values;

    if (data.email) {
      data.emails = [data.email];
      delete data.email;
    }

    props.onSubmit(null, data);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid spacing={2} container>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              {single ? (
                <InputFormItem
                  name="email"
                  label={i18n('user.fields.email')}
                  required={true}
                  variant="standard"
                  autoFocus
                  shrink
                />
              ) : (
                <TagsFormItem
                  name="emails"
                  label={i18n('user.fields.emails')}
                  notFoundContent={i18n(
                    'user.new.emailsHint',
                  )}
                  variant="standard"
                  required={true}
                  shrink
                />
              )}
            </Grid>

            <Grid item lg={7} md={8} sm={12} xs={12}>
              <SelectFormItem
                name="roles"
                label={i18n('user.fields.roles')}
                required={true}
                options={userEnumerators.roles.map(
                  (value) => ({
                    value,
                    label: i18n(`roles.${value}.label`),
                  }),
                )}
                variant="standard"
                mode="multiple"
                shrink
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
              type="submit"
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

export default UserNewForm;
