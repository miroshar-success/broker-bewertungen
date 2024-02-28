import {
  EXCEL_EXTENSION,
  EXCEL_TYPE,
} from 'src/modules/shared/excel/excel';
import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import AddIcon from '@mui/icons-material/Add';
import { red } from '@mui/material/colors';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';

export default (selectors, actions) => {
  function ImporterForm() {
    const { sidenavColor } = selectMuiSettings();
    const input = useRef<any>();
    const dispatch = useDispatch();

    const errorMessage: string = useSelector(
      selectors.selectErrorMessage,
    );

    const handleChange = (event) => {
      const files = event.target.files;

      if (!files || !files.length) {
        return;
      }

      let file = files[0];

      dispatch(actions.doReadFile(file));
    };

    return (
      <MDBox px={3} pb={3}>
        <FormWrapper style={{ paddingLeft: 0 }}>
          <MDButton
            component="label"
            variant="gradient"
            color={sidenavColor}
            startIcon={<AddIcon />}
            onClick={() => input.current.click()}
            size="small"
          >
            {i18n('fileUploader.upload')}
          </MDButton>
          <input
            style={{ display: 'none' }}
            accept={`${EXCEL_TYPE}, ${EXCEL_EXTENSION}`}
            type="file"
            onChange={handleChange}
            ref={input}
          />
          <div style={{ color: red[500] }}>
            {errorMessage}
          </div>
        </FormWrapper>
      </MDBox>
    );
  }

  return ImporterForm;
};
