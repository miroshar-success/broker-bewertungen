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
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import NavigationAutocompleteFormItem from 'src/view/navigation/autocomplete/NavigationAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import LogoFormItem from 'src/view/shared/form/items/LogoFormItem';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import Storage from 'src/security/storage';
import FieldSetViewItem from 'src/view/shared/view/FieldSetViewItem';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import BrokerAutocompleteFormItem from 'src/view/broker/autocomplete/BrokerAutocompleteFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import formActions from 'src/modules/form/formActions';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
  id: yupFormSchemas.integer(
    i18n('entities.expertAdvisorTest.fields.id'),
    {
      required: true,
      min: 1,
    },
  ),
  name: yupFormSchemas.string(
    i18n('entities.expertAdvisorTest.fields.name'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  deposit: yupFormSchemas.decimal(
    i18n('entities.expertAdvisorTest.fields.deposit'),
    {
      required: true,
      min: 0,
    },
  ),
  start_date: yupFormSchemas.date(
    i18n('entities.expertAdvisorTest.fields.start_date'),
    {},
  ),
  activated: yupFormSchemas.boolean(
    i18n('entities.expertAdvisorTest.fields.activated'),
    {},
  ),
  pdf: yupFormSchemas.boolean(
    i18n('entities.expertAdvisorTest.fields.pdf'),
    {},
  ),
  homepage: yupFormSchemas.string(
    i18n('entities.expertAdvisorTest.fields.homepage'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  meta_keywords: yupFormSchemas.string(
    i18n('entities.expertAdvisorTest.fields.meta_keywords'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  meta_description: yupFormSchemas.string(
    i18n(
      'entities.expertAdvisorTest.fields.meta_description',
    ),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  description: yupFormSchemas.string(
    i18n('entities.expertAdvisorTest.fields.description'),
    {},
  ),
  expert_advisor_test_image: yupFormSchemas.images(
    i18n(
      'entities.expertAdvisorTest.fields.expert_advisor_test_image',
    ),
    {},
  ),
});

function ExpertAdvisorTestForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      id: record.id,
      name: record.name,
      broker: record.broker,
      navigation: record.navigation,
      deposit: record.deposit,
      meta_keywords:
        (record.expert_advisor_test_metas &&
          record.expert_advisor_test_metas[0]
            ?.meta_keywords) ||
        '',
      meta_description:
        (record.expert_advisor_test_metas &&
          record.expert_advisor_test_metas[0]
            ?.meta_description) ||
        '',
      description:
        (record.expert_advisor_test_metas &&
          record.expert_advisor_test_metas[0]
            ?.description) ||
        '',
      homepage:
        (record.expert_advisor_test_metas &&
          record.expert_advisor_test_metas[0]?.homepage) ||
        '',
      expert_advisor_test_image:
        record.expert_advisor_test_image || null,
      activated: record.activated,
      pdf: record.pdf,
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
            <Grid xs={12} item>
              <FieldSetViewItem
                label={i18n(
                  'entities.expertAdvisorTest.fields.general',
                )}
              >
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
                    <InputNumberFormItem
                      name="id"
                      label={i18n(
                        'entities.expertAdvisorTest.fields.id',
                      )}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <InputFormItem
                      name="name"
                      label={i18n(
                        'entities.expertAdvisorTest.fields.name',
                      )}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <BrokerAutocompleteFormItem
                      name="broker"
                      label={i18n(
                        'entities.expertAdvisorTest.fields.broker',
                      )}
                      required={true}
                      showCreate={true}
                      variant="standard"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <NavigationAutocompleteFormItem
                      name="navigation"
                      label={i18n(
                        'entities.expertAdvisorTest.fields.navigation',
                      )}
                      required={true}
                      showCreate={true}
                      variant="standard"
                      withChildren={true}
                      id={props.record?.id || 0}
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <InputFormItem
                      name="deposit"
                      label={i18n(
                        'entities.expertAdvisorTest.fields.deposit',
                      )}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <DatePickerFormItem
                      name="start_date"
                      label={i18n(
                        'entities.expertAdvisorTest.fields.start_date',
                      )}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <CheckboxFormItem
                      name="activated"
                      label={i18n(
                        'entities.expertAdvisorTest.fields.activated',
                      )}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <CheckboxFormItem
                      name="pdf"
                      label={i18n(
                        'entities.expertAdvisorTest.fields.pdf',
                      )}
                    />
                  </Grid>
                </Grid>
              </FieldSetViewItem>
            </Grid>
            <Grid xs={12} item>
              <FieldSetViewItem
                label={i18n(
                  'entities.expertAdvisorTest.fields.metadata',
                )}
              >
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
                    <InputFormItem
                      name="homepage"
                      label={i18n(
                        'entities.expertAdvisorTest.fields.homepage',
                      )}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextAreaFormItem
                      name="meta_keywords"
                      label={i18n(
                        'entities.expertAdvisorTest.fields.meta_keywords',
                      )}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextAreaFormItem
                      name="meta_description"
                      label={i18n(
                        'entities.expertAdvisorTest.fields.meta_description',
                      )}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <HtmlEditorFormItem
                      name="description"
                      label={i18n(
                        'entities.expertAdvisorTest.fields.description',
                      )}
                      value={initialValues.description}
                    />
                  </Grid>
                </Grid>
              </FieldSetViewItem>
            </Grid>
            <Grid xs={12} item>
              <FieldSetViewItem
                label={i18n(
                  'entities.expertAdvisorTest.fields.screenshot',
                )}
              >
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
                    <ImagesFormItem
                      name="expert_advisor_test_image"
                      label={i18n(
                        'entities.expertAdvisorTest.fields.expert_advisor_test_image',
                      )}
                      storage={
                        Storage.values
                          .expert_advisor_test_image
                      }
                    />
                  </Grid>
                </Grid>
              </FieldSetViewItem>
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

export default ExpertAdvisorTestForm;
