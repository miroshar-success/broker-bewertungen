import { getConfig } from '../../config';

const aws = require('aws-sdk');

const s3 = new aws.S3({
  accessKeyId: getConfig().AWS_ACCESS_KEY_ID,
  secretAccessKey: getConfig().AWS_SECRET_ACCESS_KEY,
  region: getConfig().AWS_REGION,
});

export default class AWSStorage {
  /**
   * Creates a signed upload URL that enables
   * the frontend to upload directly to S3 in a
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

    const Conditions: Array<any> = [];

    if (maxSizeInBytes) {
      Conditions.push([
        'content-length-range',
        0,
        maxSizeInBytes,
      ]);
    }

    let publicUrl;

    const Fields: any = { key: privateUrl };

    if (publicRead) {
      Fields.acl = 'public-read';
      Conditions.push({ acl: 'public-read' });
      publicUrl = await this.downloadUrl(
        privateUrl,
        publicRead,
      );
    }

    const policy = await s3.createPresignedPost({
      Bucket: getConfig().FILE_STORAGE_BUCKET,
      Fields,
      Expires: tokenExpiresAt,
      Conditions,
    });

    return {
      ...policy,
      publicUrl,
    };
  }

  /**
   * Returns a signed download URL
   */
  static async downloadUrl(privateUrl, publicRead) {
    if (publicRead) {
      return `https://${
        getConfig().FILE_STORAGE_BUCKET
      }.s3.amazonaws.com/${privateUrl}`;
    }

    const params = {
      Key: privateUrl,
      Bucket: getConfig().FILE_STORAGE_BUCKET,
    };

    return await s3.getSignedUrlPromise(
      'getObject',
      params,
    );
  }
}
