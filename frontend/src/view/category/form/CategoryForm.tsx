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
import categoryEnumerators from '../../../modules/category/categoryEnumerators';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import AuthorAutocompleteFormItem from 'src/view/author/autocomplete/AuthorAutocompleteFormItem';
import formActions from 'src/modules/form/formActions';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.category.fields.name'),
    {
      required: true,
      min: 1,
      max: 100,
    },
  ),
  link: yupFormSchemas.string(
    i18n('entities.category.fields.link'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  title: yupFormSchemas.string(
    i18n('entities.category.fields.title'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  author: yupFormSchemas.relationToOne(
    i18n('entities.category.fields.author'),
    {},
  ),

  teaser: yupFormSchemas.string(
    i18n('entities.category.fields.teaser'),
    {
      required: true,
    },
  ),

  description: yupFormSchemas.string(
    i18n('entities.category.fields.description'),
    {
      required: true,
    },
  ),

  target: yupFormSchemas.enumerator(
    i18n('entities.category.fields.target'),
    {
      options: categoryEnumerators.target,
    },
  ),
  activated: yupFormSchemas.boolean(
    i18n('entities.category.fields.activated'),
    {},
  ),
  show_in_navigation: yupFormSchemas.boolean(
    i18n('entities.category.fields.show_in_navigation'),
    {},
  ),
  show_in_footer: yupFormSchemas.boolean(
    i18n('entities.category.fields.show_in_footer'),
    {},
  ),
});

function CategoryForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      link: record.link,
      title: record.title,
      author: record.author,
      teaser: record.teaser,
      description: record.description,
      target: record.target,
      sort: record.sort ?? 0,
      activated: record.activated,
      show_in_navigation: record.show_in_navigation,
      show_in_footer: record.show_in_footer,
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
                name="name"
                label={i18n(
                  'entities.category.fields.name',
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
                  'entities.category.fields.link',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="title"
                label={i18n(
                  'entities.category.fields.title',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <AuthorAutocompleteFormItem
                name="author"
                label={i18n(
                  'entities.category.fields.author',
                )}
                required={false}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <HtmlEditorFormItem
                name="teaser"
                label={i18n(
                  'entities.category.fields.teaser',
                )}
                value={initialValues.teaser}
                required={true}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <HtmlEditorFormItem
                name="description"
                label={i18n(
                  'entities.category.fields.description',
                )}
                value={initialValues.description}
                required={true}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <SelectFormItem
                name="target"
                label={i18n(
                  'entities.category.fields.target',
                )}
                options={categoryEnumerators.target.map(
                  (value) => ({
                    value,
                    label: i18n(
                      `entities.category.enumerators.target.${value}`,
                    ),
                  }),
                )}
                variant="standard"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputNumberFormItem
                name="sort"
                label={i18n(
                  'entities.category.fields.sort',
                )}
                variant="standard"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CheckboxFormItem
                name="activated"
                label={i18n(
                  'entities.category.fields.activated',
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CheckboxFormItem
                name="show_in_navigation"
                label={i18n(
                  'entities.category.fields.show_in_navigation',
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CheckboxFormItem
                name="show_in_footer"
                label={i18n(
                  'entities.category.fields.show_in_footer',
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

export default CategoryForm;
