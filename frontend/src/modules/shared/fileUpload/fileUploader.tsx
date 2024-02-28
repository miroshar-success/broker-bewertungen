import { i18n } from 'src/i18n';
import { v4 as uuid } from 'uuid';
import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';
import axios from 'axios';
import filesize from 'filesize';

export default class FileUploader {
  static validate(file, config) {
    if (!config) {
      return;
    }

    if (config.image) {
      if (!file.type.startsWith('image')) {
        throw new Error(i18n('fileUploader.image'));
      }
    }

    if (
      config.storage.maxSizeInBytes &&
      file.size > config.storage.maxSizeInBytes
    ) {
      const size = filesize.partial({
        base: 2,
        standard: 'jedec',
      });
      throw new Error(
        i18n(
          'fileUploader.size',
          size(config.storage.maxSizeInBytes),
        ),
      );
    }

    const extension = extractExtensionFrom(file.name);

    if (
      config.formats &&
      config.formats.length > 0 &&
      !config.formats.find(
        (v) => v.toLowerCase() === extension.toLowerCase(),
      )
    ) {
      throw new Error(
        i18n(
          'fileUploader.formats',
          config.formats.join(', '),
        ),
      );
    }
  }

  static async upload(file, config) {
    try {
      this.validate(file, config);
    } catch (error) {
      return Promise.reject(error);
    }

    const extension = extractExtensionFrom(file.name);
    const id = uuid();
    const filename = `${id}.${extension}`;

    const { uploadCredentials, downloadUrl, privateUrl } =
      await this.fetchFileCredentials(filename, config);

    await this.uploadToServer(file, uploadCredentials);

    return {
      id: id,
      name: file.name,
      sizeInBytes: file.size,
      publicUrl:
        uploadCredentials && uploadCredentials.publicUrl
          ? uploadCredentials.publicUrl
          : null,
      privateUrl,
      downloadUrl,
      new: true,
    };
  }

  static async fetchFileCredentials(filename, config) {
    const tenantId = AuthCurrentTenant.get();

    const { data } = await authAxios.get(
      `/tenant/${tenantId}/file/credentials`,
      {
        params: {
          filename: filename,
          storageId: config.storage.id,
        },
      },
    );

    return data;
  }

  static async uploadToServer(file, uploadCredentials) {
    try {
      const url = uploadCredentials.url;
      const formData = new FormData();

      for (const [key, value] of Object.entries(
        uploadCredentials.fields || {},
      )) {
        formData.append(key, value as string);
      }
      formData.append('file', file);

      return axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export function extractExtensionFrom(filename) {
  if (!filename) {
    return null;
  }

  const regex = /(?:\.([^.]+))?$/;
  const exec = regex.exec(filename);

  if (!exec) {
    return null;
  }

  return exec[1].toLowerCase();
}

export function extractNameFrom(filename) {
  if (!filename) {
    return null;
  }

  return filename.substring(0, filename.lastIndexOf('.'));
}
