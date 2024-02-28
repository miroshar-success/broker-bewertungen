import { getConfig } from '../../config';

import { Storage } from '@google-cloud/storage';

let bucket;

if (getConfig().GOOGLE_CLOUD_PLATFORM_CREDENTIALS) {
  const serviceAccount = JSON.parse(
    getConfig().GOOGLE_CLOUD_PLATFORM_CREDENTIALS,
  );

  bucket = new Storage({
    projectId: serviceAccount.project_id,
    credentials: serviceAccount,
  }).bucket(getConfig().FILE_STORAGE_BUCKET);
} else {
  bucket = new Storage().bucket(
    getConfig().FILE_STORAGE_BUCKET,
  );
}

export default class GoogleCloudFileStorage {
  /**
   * Creates a signed upload URL that enables
   * the frontend to upload directly to GCS in a
   * secure way
   */
  static async uploadCredentials(
    privateUrl,
    maxSizeInBytes,
    publicRead,
    tokenExpiresAt,
  ) {
    const expires =
      tokenExpiresAt || Date.now() + 10 * 60 * 1000;

    const file = bucket.file(privateUrl);

    const conditions: Array<any> = [];
    const fields: any = {};

    if (maxSizeInBytes) {
      conditions.push([
        'content-length-range',
        0,
        maxSizeInBytes,
      ]);
    }

    let publicUrl;

    if (publicRead) {
      fields.acl = 'public-read';
      publicUrl = await this.downloadUrl(
        privateUrl,
        publicRead,
      );
    }

    const [policy] = await file.generateSignedPostPolicyV4({
      expires,
      virtualHostedStyle: true,
      conditions,
      fields,
    });

    return {
      ...policy,
      publicUrl,
    };
  }

  /**
   * Returns a signed download URL.
   */
  static async downloadUrl(
    privateUrl,
    publicRead,
    tokenExpiresAt?,
  ) {
    if (publicRead) {
      return `https://storage.googleapis.com/${
        getConfig().FILE_STORAGE_BUCKET
      }/${privateUrl}`;
    }

    tokenExpiresAt =
      tokenExpiresAt || Date.now() + 1000 * 60 * 60;

    const response = await bucket
      .file(privateUrl)
      .getSignedUrl({
        action: 'read',
        expires: tokenExpiresAt,
        version: 'v4',
      });

    if (response && response[0]) {
      return response[0];
    }

    return response;
  }
}
