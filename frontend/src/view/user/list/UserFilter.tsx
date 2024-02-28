import {
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UndoIcon from '@mui/icons-material/Undo';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import actions from 'src/modules/user/list/userListActions';
import selectors from 'src/modules/user/list/userListSelectors';
import userEnumerators from 'src/modules/user/userEnumerators';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import FilterWrapper, {
  FilterButtons,
} from 'src/view/shared/styles/FilterWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import FilterAccordion from 'src/view/shared/filter/FilterAccordion';
import MDBox from 'src/mui/components/MDBox';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDButton from 'src/mui/components/MDButton';
import formActions from 'src/modules/form/formActions';

const schema = yup.object().shape({
  fullName: yupFilterSchemas.string(
    i18n('user.fields.fullName'),
  ),
  email: yupFilterSchemas.email(i18n('user.fields.email')),
  role: yupFilterSchemas.enumerator(
    i18n('user.fields.role'),
  ),
  status: yupFilterSchemas.enumerator(
    i18n('user.fields.status'),
  ),
});

const previewRenders = {
  fullName: {
    label: i18n('user.fields.fullName'),
    render: filterRenders.generic(),
  },
  email: {
    label: i18n('user.fields.email'),
    render: filterRenders.generic(),
  },
  role: {
    label: i18n('user.fields.role'),
    render: (value) =>
      value ? i18n(`roles.${value}.label`) : null,
  },
  status: {
    label: i18n('user.fields.status'),
    render: filterRenders.enumerator('user.status'),
  },
};

const emptyValues = {
  fullName: null,
  email: null,
  role: null,
  status: null,
};

function UserFilter(props) {
  const { sidenavColor } = selectMuiSettings();
  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'onSubmit',
  });

  useEffect(() => {
    dispatch(
      actions.doFetch(
        schema.cast(initialValues),
        initialValues,
      ),
    );
    // eslint-disable-next-line
  }, [dispatch]);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    dispatch(actions.doFetch(values, rawValues, false));
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const onRemove = (key) => {
    form.setValue(key, emptyValues[key]);
    return form.handleSubmit(onSubmit)();
  };

  const { loading } = props;

  return (
    <FilterWrapper>
      <FilterAccordion
        expanded={expanded}
        onChange={(event, isExpanded) =>
          setExpanded(isExpanded)
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="secondary" />}
        >
          <FilterPreview
            values={rawFilter}
            renders={previewRenders}
            expanded={expanded}
            onRemove={onRemove}
          />
        </AccordionSummary>
        <AccordionDetails>
          <FormProvider {...form}>
            <MDBox
              component="form"
              role="form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <Grid container spacing={2}>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name={'email'}
                    label={i18n('user.fields.email')}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name={'fullName'}
                    label={i18n('user.fields.fullName')}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <SelectFormItem
                    name={'role'}
                    label={i18n('user.fields.role')}
                    options={userEnumerators.roles.map(
                      (value) => ({
                        value,
                        label: i18n(`roles.${value}.label`),
                      }),
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <SelectFormItem
                    name={'status'}
                    label={i18n('user.fields.status')}
                    options={userEnumerators.status.map(
                      (value) => ({
                        value,
                        label: i18n(`user.status.${value}`),
                      }),
                    )}
                    variant="standard"
                  />
                </Grid>
              </Grid>
              <FilterButtons>
                <MDButton
                  size="small"
                  variant="gradient"
                  color={sidenavColor}
                  type="submit"
                  disabled={loading}
                  startIcon={<SearchIcon />}
                >
                  {i18n('common.search')}
                </MDButton>

                <MDButton
                  size="small"
                  variant="outlined"
                  color={sidenavColor}
                  type="button"
                  onClick={onReset}
                  disabled={loading}
                  startIcon={<UndoIcon />}
                >
                  {i18n('common.reset')}
                </MDButton>
              </FilterButtons>
            </MDBox>
          </FormProvider>
        </AccordionDetails>
      </FilterAccordion>
    </FilterWrapper>
  );
}

export default UserFilter;
