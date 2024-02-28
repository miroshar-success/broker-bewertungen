import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class MuiService {
  static async find() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/mui`,
    );

    return response.data;
  }

  static async save(mui) {
    const body = {
      mui,
    };

    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.put(
      `/tenant/${tenantId}/mui`,
      body,
    );
    return response.data;
  }
}
