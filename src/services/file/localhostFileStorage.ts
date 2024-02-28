import { getConfig } from '../../config';
import {
  ensureDirectoryExistence,
  getRealPath,
} from '../../utils/pathUtils';
import Error403 from '../../errors/Error403';
import jwt from 'jsonwebtoken';
import mv from 'mv';
import os from 'os';
import path from 'path';

/**
 * The directory where the files should be uploaded.
 * Change this to a persisted folder.
 */

const UPLOAD_DIR =
  getRealPath(getConfig().FILE_STORAGE_PATH) || os.tmpdir();

export default class LocalFileStorage {
  /**
   * Creates a signed upload URL that enables
   * the frontend to upload directly to the server in a
   * secure way.
   */
  static async uploadCredentials(
    privateUrl,
    maxSizeInBytes,
    publicRead,
    tokenExpiresAt,
  ) {
    const expires =
      tokenExpiresAt || Date.now() + 10 * 60 * 1000;

    const token = jwt.sign(
      { privateUrl, maxSizeInBytes },
      getConfig().AUTH_JWT_SECRET,
      { expiresIn: expires },
    );

    return {
      url: `${
        getConfig().BACKEND_URL
      }/file/upload?token=${token}`,
    };
  }

  static internalUrl(privateUrl) {
    return path.join(UPLOAD_DIR, privateUrl);
  }

  /**
   * Handles the upload to the server.
   */
  static async upload(fileTempUrl, privateUrl) {
    const internalUrl = this.internalUrl(privateUrl);
    if (!isPathInsideUploadDir(internalUrl)) {
      throw new Error403();
    }
    ensureDirectoryExistence(internalUrl);
    return new Promise((resolve, reject) => {
      mv(fileTempUrl, internalUrl, (err) => {
        if (err) {
          reject(err);
          return;
        }

        return this.downloadUrl(privateUrl)
          .then(resolve)
          .catch(reject);
      });
    });
  }

  /**
   * Return the download URL of the file from this server.
   */
  static async downloadUrl(privateUrl) {
    return `${
      getConfig().BACKEND_URL
    }/file/download?privateUrl=${privateUrl}`;
  }

  /**
   * Downloads the file.
   */
  static async download(privateUrl) {
    let finalPath = this.internalUrl(privateUrl);
    if (!isPathInsideUploadDir(finalPath)) {
      throw new Error403();
    }
    return finalPath;
  }
}

function isPathInsideUploadDir(privateUrl) {
  const uploadUrlWithSlash = UPLOAD_DIR.endsWith(path.sep)
    ? UPLOAD_DIR
    : `${UPLOAD_DIR}${path.sep}`;
  return privateUrl.indexOf(uploadUrlWithSlash) === 0;
}
