import { CardMedia, Grid } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Errors from 'src/modules/shared/error/errors';
import FileUploader from 'src/modules/shared/fileUpload/fileUploader';
import ImageModal from 'src/view/shared/modals/ImageModal';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import DragAndDropUploaderArea from 'src/view/shared/uploaders/DragAndDropUploaderArea';

function ImagesUploader(props) {
  const { sidenavColor } = selectMuiSettings();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<any>(null);

  const value = () => {
    const { value } = props;

    if (!value) {
      return [];
    }

    return Array.isArray(value) ? value : [value];
  };

  const fileList = () => {
    return value().map((item) => ({
      uid: item.id || undefined,
      name: item.name,
      status: 'done',
      url: item.downloadUrl,
    }));
  };

  const handleRemove = (id) => {
    props.onChange(
      value().filter((item) => item.id !== id),
    );
  };

  const handleChange = async (uploads) => {
    if (!uploads || !uploads.length) {
      return;
    }

    const newValue = [...value()];

    setLoading(true);

    for (let i = 0; i < uploads.length; i++) {
      try {
        const file = await FileUploader.upload(uploads[i], {
          storage: props.storage,
          image: true,
        });
        if (!file) {
          continue;
        }
        newValue.push(file);
      } catch (error) {
        console.error(error);
        Errors.showMessage(error);
      }
    }

    setLoading(false);

    props.onChange && props.onChange(newValue);
  };

  const doPreviewImage = (image) => {
    setImage({
      src: image.downloadUrl,
      alt: image.name,
    });
  };

  const doCloseImageModal = () => {
    setImage(null);
  };

  const { max, readonly } = props;

  const renderImage = (item) => {
    return (
      <MDBox>
        <CardMedia
          alt={item.name}
          component="img"
          src={item.downloadUrl}
          sx={{
            borderRadius: 0,
            maxWidth: '100%',
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        <MDBox
          display="flex"
          justifyContent="center"
          gap={1}
          mt={1}
        >
          <MDButton
            onClick={() => doPreviewImage(item)}
            size="small"
            color={sidenavColor}
            iconOnly
          >
            <SearchIcon />
          </MDButton>

          {!readonly && (
            <MDButton
              onClick={() => handleRemove(item.id)}
              size="small"
              color={sidenavColor}
              iconOnly
            >
              <CloseIcon />
            </MDButton>
          )}
        </MDBox>
      </MDBox>
    );
  };

  const renderImages = (images) => {
    return (images || []).map((item) =>
      max === 1 ? (
        <MDBox key={item.id}>{renderImage(item)}</MDBox>
      ) : (
        <Grid key={item.id} xs={3} item>
          {renderImage(item)}
        </Grid>
      ),
    );
  };

  const renderValue = () => {
    const images = value();
    if (!images || !images.length) {
      return null;
    }
    return (
      <MDBox mt={1}>
        {max === 1 ? (
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="baseline"
            gap={1}
          >
            {renderImages(images)}
          </MDBox>
        ) : (
          <Grid spacing={1} container>
            {renderImages(images)}
          </Grid>
        )}
      </MDBox>
    );
  };

  return (
    <div>
      {renderValue()}

      {readonly ||
      (max && fileList().length >= max) ? null : (
        <DragAndDropUploaderArea
          handleChange={handleChange}
          // multiple={max !== 1}
          storage={props.storage}
          types={['jpeg', 'jpg', 'png', 'gif']}
        />
      )}

      {image && (
        <ImageModal
          src={image.src}
          alt={image.alt}
          onClose={() => doCloseImageModal()}
        />
      )}
    </div>
  );
}

ImagesUploader.propTypes = {
  max: PropTypes.number,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  storage: PropTypes.object,
  value: PropTypes.any,
};

export default ImagesUploader;
