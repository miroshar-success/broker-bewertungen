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
import navigationEnumerators from '../../../modules/navigation/navigationEnumerators';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import NavigationAutocompleteFormItem from 'src/view/navigation/autocomplete/NavigationAutocompleteFormItem';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import { navigationTypeOptions } from 'src/modules/navigation/navigationUtils';
import formActions from 'src/modules/form/formActions';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
  parent: yupFormSchemas.relationToOne(
    i18n('entities.navigation.fields.parent'),
    {},
  ),
  name: yupFormSchemas.string(
    i18n('entities.navigation.fields.name'),
    {
      required: true,
      min: 1,
      max: 100,
    },
  ),
  link: yupFormSchemas.string(
    i18n('entities.navigation.fields.link'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  title: yupFormSchemas.string(
    i18n('entities.navigation.fields.title'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  target: yupFormSchemas.enumerator(
    i18n('entities.navigation.fields.target'),
    {
      options: navigationEnumerators.target,
    },
  ),
  activated: yupFormSchemas.boolean(
    i18n('entities.navigation.fields.activated'),
    {},
  ),
  show_user_logged_in: yupFormSchemas.boolean(
    i18n('entities.navigation.fields.show_user_logged_in'),
    {},
  ),
  show_in_navigation: yupFormSchemas.boolean(
    i18n('entities.navigation.fields.show_in_navigation'),
    {},
  ),
  type: yupFormSchemas.enumerator(
    i18n('entities.navigation.fields.type'),
    {
      options: navigationEnumerators.type,
    },
  ),
});

function NavigationForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      link: record.link,
      title: record.title,
      target: record.target,
      sort: record.sort ?? 0,
      activated: record.activated,
      show_user_logged_in: record.show_user_logged_in,
      show_in_navigation: record.show_in_navigation,
      type: record.type ?? 'NONE',
      parent: record.parent,
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
              <NavigationAutocompleteFormItem
                name="parent"
                label={i18n(
                  'entities.navigation.fields.parent',
                )}
                required={false}
                showCreate={true}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}></Grid>
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="name"
                label={i18n(
                  'entities.navigation.fields.name',
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
                  'entities.navigation.fields.link',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="title"
                label={i18n(
                  'entities.navigation.fields.title',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <SelectFormItem
                name="target"
                label={i18n(
                  'entities.navigation.fields.target',
                )}
                options={navigationEnumerators.target.map(
                  (value) => ({
                    value,
                    label: i18n(
                      `entities.navigation.enumerators.target.${value}`,
                    ),
                  }),
                )}
                variant="standard"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <SelectFormItem
                name="type"
                label={i18n(
                  'entities.navigation.fields.type',
                )}
                options={navigationTypeOptions}
                variant="standard"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputNumberFormItem
                name="sort"
                label={i18n(
                  'entities.navigation.fields.sort',
                )}
                variant="standard"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CheckboxFormItem
                name="activated"
                label={i18n(
                  'entities.navigation.fields.activated',
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CheckboxFormItem
                name="show_user_logged_in"
                label={i18n(
                  'entities.navigation.fields.show_user_logged_in',
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CheckboxFormItem
                name="show_in_navigation"
                label={i18n(
                  'entities.navigation.fields.show_in_navigation',
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

export default NavigationForm;
