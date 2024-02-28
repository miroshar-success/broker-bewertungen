import formidable from 'formidable-serverless';
import fs from 'fs';
import ApiResponseHandler from '../../apiResponseHandler';
import Error403 from '../../../errors/Error403';
import jwt from 'jsonwebtoken';
import { getConfig } from '../../../config';
import FileStorage from '../../../services/file/fileStorage';

/**
 * Uploads a file to the localhost.
 */
export default async (req, res, next) => {
  if (!req.query.token) {
    return ApiResponseHandler.error(
      req,
      res,
      new Error403(),
    );
  }

  let storage: {
    privateUrl: string;
    maxSizeInBytes: number;
  };

  try {
    storage = jwt.verify(
      req.query.token,
      getConfig().AUTH_JWT_SECRET,
    ) as any;
  } catch (error) {
    console.error(error);
    return ApiResponseHandler.error(
      req,
      res,
      new Error403(),
    );
  }

  let { privateUrl, maxSizeInBytes } = storage;

  const form = new formidable.IncomingForm();

  form.maxFileSize = Number(maxSizeInBytes);

  form.parse(req, function (err, fields, files) {
    const filename = String(fields.filename);
    const fileTempUrl = files.file.path;

    if (!filename) {
      fs.unlinkSync(fileTempUrl);
      return ApiResponseHandler.error(
        req,
        res,
        new Error(`File not found`),
      );
    }

    FileStorage.upload(fileTempUrl, privateUrl)
      .then((downloadUrl) => {
        return ApiResponseHandler.success(
          req,
          res,
          downloadUrl,
        );
      })
      .catch((error) => {
        return ApiResponseHandler.error(req, res, error);
      });
  });

  form.on('error', function (error) {
    return ApiResponseHandler.error(req, res, error);
  });
};
