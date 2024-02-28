import authAxios from 'src/modules/shared/axios/authAxios';

export default class SitemapService {
  static async refresh(recaptcha) {
    const response = await authAxios.post(
      '/sitemap/refresh',
      {
        recaptcha,
      },
    );
    return response.data;
  }
}
