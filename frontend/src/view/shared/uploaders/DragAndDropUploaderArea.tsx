import { FileUploader } from 'react-drag-drop-files';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import darkColors from 'src/mui/assets/theme-dark/base/colors';
import Errors from 'src/modules/shared/error/errors';
import filesize from 'filesize';
import lightColors from 'src/mui/assets/theme/base/colors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function DragAndDropUploaderArea(props) {
  const { sidenavColor, darkMode } = selectMuiSettings();
  const colors = darkMode ? darkColors : lightColors;

  const {
    handleChange,
    hoverTitle,
    multiple,
    name,
    onTypeError,
    storage,
    types,
  } = props;

  const size = filesize.partial({
    base: 2,
    standard: 'jedec',
  });

  const fnOnTypeError = (err) => {
    Errors.showMessage(
      new Error(
        i18n('fileUploader.formats', types.join(', ')),
      ),
    );
  };

  return (
    <MDBox my={1}>
      <FileUploader
        handleChange={handleChange}
        hoverTitle={hoverTitle}
        multiple={multiple}
        name={name}
        onTypeError={onTypeError || fnOnTypeError}
        types={types}
      >
        <MDBox
          textAlign="center"
          p={2}
          sx={{
            border: `2px dashed ${colors[sidenavColor].main}`,
            cursor: 'pointer',
          }}
        >
          <MDTypography
            display="block"
            variant="button"
            fontWeight="regular"
            color={sidenavColor}
          >
            <CloudUploadIcon fontSize="large" />
            <br />
            {i18n('fileUploader.placeholder.title')}
            {storage && storage.maxSizeInBytes && (
              <>
                <br />
                {i18n(
                  'fileUploader.placeholder.size',
                  size(storage.maxSizeInBytes),
                )}
              </>
            )}
          </MDTypography>
        </MDBox>
      </FileUploader>
    </MDBox>
  );
}

DragAndDropUploaderArea.defaultProps = {
  multiple: true,
  name: '~~~files',
};

DragAndDropUploaderArea.propTypes = {
  handleChange: PropTypes.func.isRequired,
  hoverTitle: PropTypes.string,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  onTypeError: PropTypes.func,
  storage: PropTypes.any,
  types: PropTypes.arrayOf(PropTypes.string),
};

export default DragAndDropUploaderArea;
