import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class NavigationService {
  static async update(id, data) {
    const body = {
      id,
      data,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.put(
      `/tenant/${tenantId}/navigation/${id}`,
      body,
    );

    return response.data;
  }

  static async destroyAll(ids) {
    const params = {
      ids,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.delete(
      `/tenant/${tenantId}/navigation`,
      {
        params,
      },
    );

    return response.data;
  }

  static async create(data) {
    const body = {
      data,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.post(
      `/tenant/${tenantId}/navigation`,
      body,
    );

    return response.data;
  }

  static async import(values, importHash) {
    const body = {
      data: values,
      importHash,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.post(
      `/tenant/${tenantId}/navigation/import`,
      body,
    );

    return response.data;
  }

  static async find(id) {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/navigation/${id}`,
    );

    return response.data;
  }

  static async list(filter, orderBy, limit, offset) {
    const params = {
      filter,
      orderBy,
      limit,
      offset,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/navigation`,
      {
        params,
      },
    );

    return response.data;
  }

  static async forexStrategy() {
    const response = await authAxios.get(
      `/navigation/forex-strategy`,
    );
    return response.data;
  }

  static async forexSchool() {
    const response = await authAxios.get(
      `/navigation/forex-school`,
    );
    return response.data;
  }

  static async mostRead() {
    const response = await authAxios.get(
      `/navigation/most-read`,
    );
    return response.data;
  }

  static async home() {
    const response = await authAxios.get(`/navigation`);
    return response.data;
  }

  static async listAutocomplete(
    query,
    limit,
    withChildren = false,
    part = null,
    id = null,
  ) {
    const params = {
      query,
      limit,
      withChildren,
      part,
      id,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/navigation/autocomplete`,
      {
        params,
      },
    );

    return response.data;
  }
}
