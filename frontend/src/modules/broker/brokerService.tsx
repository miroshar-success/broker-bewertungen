import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class BrokerService {
  static async update(id, data) {
    const body = {
      id,
      data,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.put(
      `/tenant/${tenantId}/broker/${id}`,
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
      `/tenant/${tenantId}/broker`,
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
      `/tenant/${tenantId}/broker`,
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
      `/tenant/${tenantId}/broker/import`,
      body,
    );

    return response.data;
  }

  static async find(id) {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/broker/${id}`,
    );

    return response.data;
  }

  static async view(url) {
    const response = await authAxios.post('/broker', {
      url: url.replace(/^\/erfahrungsberichte\//g, ''),
    });

    return response.data;
  }

  static async comparable() {
    const response = await authAxios.get(
      `/broker/comparable`,
    );

    return response.data;
  }

  static async featured() {
    const response = await authAxios.get(
      `/broker/featured`,
    );

    return response.data;
  }

  static async top() {
    const response = await authAxios.get(`/broker/top`);

    return response.data;
  }

  static async home(filter, orderBy, limit, offset) {
    const params = {
      filter,
      orderBy,
      limit,
      offset,
    };

    const response = await authAxios.get(`/broker`, {
      params,
    });

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
      `/tenant/${tenantId}/broker`,
      {
        params,
      },
    );

    return response.data;
  }

  static async listAutocomplete(
    query,
    limit,
    useLink = false,
  ) {
    const params = {
      query,
      limit,
      useLink,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/broker/autocomplete`,
      {
        params,
      },
    );

    return response.data;
  }
}
