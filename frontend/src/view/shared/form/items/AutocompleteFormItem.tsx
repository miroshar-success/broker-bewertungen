import { i18n } from 'src/i18n';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FormErrors from 'src/view/shared/form/formErrors';
import AsyncSelect from 'react-select/async';
import {
  components as materialUiComponents,
  styles as materialUiStyles,
} from 'src/view/shared/form/items/shared/reactSelectMaterialUi';
import makeStyles from '@mui/styles/makeStyles';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFormContext } from 'react-hook-form';

const AUTOCOMPLETE_SERVER_FETCH_SIZE = 100;

const useStyles = makeStyles(materialUiStyles as any);

function AutocompleteFormItem(props) {
  const {
    errors,
    watch,
    setValue,
    register,
    formState: { touched, isSubmitted },
  } = useFormContext();

  const {
    label,
    name,
    hint,
    placeholder,
    autoFocus,
    externalErrorMessage,
    mode,
    required,
    isClearable,
    fetchFn,
    mapper,
  } = props;

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const originalValue = watch(name);

  const value = () => {
    const { mode } = props;
    if (mode === 'multiple') {
      return valueMultiple();
    } else {
      return valueOne();
    }
  };

  const valueMultiple = () => {
    const { mapper } = props;

    if (originalValue) {
      return originalValue.map((value) =>
        mapper.toAutocomplete(value),
      );
    }

    return [];
  };

  const valueOne = () => {
    const { mapper } = props;

    if (originalValue) {
      return mapper.toAutocomplete(originalValue);
    }

    return null;
  };

  const handleSelect = (value) => {
    if (mode === 'multiple') {
      return handleSelectMultiple(value);
    } else {
      return handleSelectOne(value);
    }
  };

  const handleSelectMultiple = (values) => {
    if (!values) {
      setValue(name, [], {
        shouldValidate: false,
        shouldDirty: true,
      });
      props.onChange && props.onChange([]);
      return;
    }

    const newValue = values.map((value) =>
      mapper.toValue(value),
    );
    setValue(name, newValue, {
      shouldValidate: false,
      shouldDirty: true,
    });
    props.onChange && props.onChange(newValue);
  };

  const handleSelectOne = (value) => {
    if (!value) {
      setValue(name, null, {
        shouldValidate: false,
        shouldDirty: true,
      });
      props.onChange && props.onChange(null);
      return;
    }

    const newValue = mapper.toValue(value);
    setValue(name, newValue, {
      shouldValidate: false,
      shouldDirty: true,
    });
    props.onChange && props.onChange(newValue);
  };

  const handleSearch = async (value) => {
    try {
      const results = await fetchFn(
        value,
        AUTOCOMPLETE_SERVER_FETCH_SIZE,
      );

      return results.map((result) =>
        mapper.toAutocomplete(result),
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  const classes = useStyles();

  const controlStyles = {
    container: (provided) => ({
      ...provided,
      width: '100%',
      marginTop: '16px',
      marginBottom: '8px',
    }),
    control: (provided) => ({
      ...provided,
      borderColor: errorMessage ? 'red' : undefined,
    }),
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <AsyncSelect
        styles={controlStyles}
        classes={classes}
        inputId={name}
        TextFieldProps={{
          label,
          required,
          variant: 'outlined',
          fullWidth: true,
          error: Boolean(errorMessage),
          helperText: errorMessage || hint,
          size: 'small',
          InputLabelProps: {
            shrink: true,
          },
        }}
        components={materialUiComponents}
        defaultOptions={true}
        isMulti={mode === 'multiple' ? true : false}
        loadOptions={handleSearch}
        placeholder={placeholder || ''}
        autoFocus={autoFocus || undefined}
        onChange={handleSelect}
        onBlur={() => props.onBlur && props.onBlur(null)}
        value={value()}
        isClearable={isClearable}
        loadingMessage={() => i18n('autocomplete.loading')}
        noOptionsMessage={() =>
          i18n('autocomplete.noOptions')
        }
      />

      {props.showCreate && props.hasPermissionToCreate ? (
        <IconButton
          style={{
            marginLeft: '16px',
            marginTop: '16px',
            marginBottom: '8px',
            flexShrink: 0,
          }}
          color="secondary"
          onClick={props.onOpenModal}
          size="large"
        >
          <AddIcon />
        </IconButton>
      ) : null}
    </div>
  );
}

AutocompleteFormItem.defaultProps = {
  isClearable: true,
  mode: 'default',
  required: false,
};

AutocompleteFormItem.propTypes = {
  fetchFn: PropTypes.func.isRequired,
  mapper: PropTypes.object.isRequired,
  required: PropTypes.bool,
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  externalErrorMessage: PropTypes.string,
  isClearable: PropTypes.bool,
  showCreate: PropTypes.bool,
  hasPermissionToCreate: PropTypes.bool,
};

export default AutocompleteFormItem;
