import ApiResponseHandler from '../apiResponseHandler';
import Error403 from '../../errors/Error403';
import FileStorage from '../../services/file/fileStorage';
import formidable from 'formidable-serverless';
import fs from 'fs';
import LocalFileStorage from '../../services/file/localhostFileStorage';
import path from 'path';
import slug from 'slug';
import Storage from '../../security/storage';

export default async (req, res, next) => {
  if (!req.currentUser || !req.currentUser.id) {
    throw new Error403();
  }

  if (!req.currentTenant || !req.currentTenant.id) {
    throw new Error403();
  }

  try {
    const form = new formidable.IncomingForm();

    form.maxFileSize = Number(
      Storage.values.ckeditorImages.maxSizeInBytes,
    );

    const folder = Storage.values.ckeditorImages.folder;

    let filename = '';
    let url = '';

    form.parse(req, function (err, fields, files) {
      const fileTempUrl = files.upload.path;

      filename = String(files.upload.name);
      const ext = path.extname(filename);

      const originName = filename.substring(
        0,
        filename.length - ext.length,
      );

      let privateUrl = '';
      let index = 0;

      do {
        filename = slug(`${originName}-${index++}`);
        privateUrl = `${folder}/${filename}${ext}`;
        url = `/files/${privateUrl}`;
      } while (fs.existsSync(LocalFileStorage.internalUrl(privateUrl)));

      FileStorage.upload(fileTempUrl, privateUrl)
        .then(() => {
          return ApiResponseHandler.success(req, res, {
            filename,
            uploaded: true,
            url,
          });
        })
        .catch((error) => {
          return ApiResponseHandler.error(req, res, error);
        });
    });
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
