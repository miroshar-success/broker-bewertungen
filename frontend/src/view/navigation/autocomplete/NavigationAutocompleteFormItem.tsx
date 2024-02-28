import { useEffect, useState } from 'react';
import NavigationService from 'src/modules/navigation/navigationService';
import NavigationFormModal from 'src/view/navigation/form/NavigationFormModal';
import AutocompleteInMemoryFormItem from 'src/view/shared/form/items/AutocompleteInMemoryFormItem';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import selectors from 'src/modules/navigation/navigationSelectors';
import { Box } from '@mui/material';

function NavigationAutocompleteFormItem(props) {
  const {
    autoFocus,
    label,
    margin,
    mode,
    name,
    required,
    rerender: parentRerender,
    shrink,
    size,
    variant,
  } = props;

  const { setValue, getValues } = useFormContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [rerender, setRerender] = useState(0);

  const hasPermissionToCreate = useSelector(
    selectors.selectPermissionToCreate,
  );

  const doCloseModal = () => {
    setModalVisible(false);
  };

  const doOpenModal = () => {
    setModalVisible(true);
  };

  const doCreateSuccess = (record) => {
    const { name, mode } = props;

    if (mode && mode === 'multiple') {
      setValue(
        name,
        [...(getValues()[name] || []), record],
        { shouldValidate: false, shouldDirty: true },
      );
    } else {
      setValue(name, record, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }

    setRerender(rerender + 1);

    doCloseModal();
  };

  const fetchFn = (value, limit) => {
    return NavigationService.listAutocomplete(
      value,
      limit,
      !!props.withChildren,
      props.part,
      props.id,
    );
  };

  const mapper = {
    toAutocomplete(originalValue) {
      if (!originalValue) {
        return null;
      }

      const value = originalValue.id;
      let label = originalValue.label;
      let parent = originalValue.parent;

      if (originalValue.name) {
        label = originalValue.name;
      }
      if (originalValue.parent_id) {
        parent = originalValue.parent_id;
      }

      return {
        key: value,
        value,
        label,
        parent,
        hasChildren: originalValue.hasChildren,
      };
    },

    toValue(originalValue) {
      if (!originalValue) {
        return null;
      }

      return {
        id: originalValue.value,
        label: originalValue.label,
        parent: originalValue.parent,
        hasChildren: originalValue.hasChildren,
      };
    },
  };

  useEffect(() => {
    setRerender(rerender + 1);
  }, [parentRerender]);

  return (
    <>
      <AutocompleteInMemoryFormItem
        {...props}
        fetchFn={fetchFn}
        mapper={mapper}
        onOpenModal={doOpenModal}
        hasPermissionToCreate={hasPermissionToCreate}
        rerender={rerender}
        renderOption={(props, option) => (
          <Box
            component="li"
            {...props}
            {...{ key: `${option.value}-${option.parent}` }}
          >
            {option.label}
          </Box>
        )}
        groupBy={
          props.withChildren
            ? (option) => option.parent.label
            : null
        }
        getOptionDisabled={
          props.withChildren
            ? (option) => !!option.hasChildren
            : null
        }
      />

      {modalVisible && (
        <NavigationFormModal
          onClose={doCloseModal}
          onSuccess={doCreateSuccess}
        />
      )}
    </>
  );
}

export default NavigationAutocompleteFormItem;
