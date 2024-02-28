import TenantRepository from '../database/repositories/tenantRepository';
import TenantUserRepository from '../database/repositories/tenantUserRepository';
import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import PermissionChecker from './user/permissionChecker';
import Permissions from '../security/permissions';
import Error404 from '../errors/Error404';
import { getConfig } from '../config';
import Roles from '../security/roles';
import SettingsService from './settingsService';
import Plans from '../security/plans';
import { IServiceOptions } from './IServiceOptions';

export default class TenantService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  /**
   * Creates the default tenant or joins the default with
   * roles passed.
   * If default roles are empty, the admin will have to asign the roles
   * to new users.
   */
  async createOrJoinDefault({ roles }, transaction) {
    const tenant = await TenantRepository.findDefault({
      ...this.options,
      transaction,
    });

    if (tenant) {
      const tenantUser =
        await TenantUserRepository.findByTenantAndUser(
          tenant.id,
          this.options.currentUser.id,
          {
            ...this.options,
            transaction,
          },
        );

      // In this situation, the user has used the invitation token
      // and it is already part of the tenant
      if (tenantUser) {
        return;
      }

      return await TenantUserRepository.create(
        tenant,
        this.options.currentUser,
        roles,
        { ...this.options, transaction },
      );
    }

    let record = await TenantRepository.create(
      { name: 'default', url: 'default' },
      {
        ...this.options,
        transaction,
      },
    );

    await SettingsService.findOrCreateDefault({
      ...this.options,
      currentTenant: record,
      transaction,
    });

    await TenantUserRepository.create(
      record,
      this.options.currentUser,
      [Roles.values.admin],
      {
        ...this.options,
        transaction,
      },
    );
  }

  async joinWithDefaultRolesOrAskApproval(
    { roles, tenantId },
    { transaction },
  ) {
    const tenant = await TenantRepository.findById(
      tenantId,
      {
        ...this.options,
        transaction,
      },
    );

    const tenantUser =
      await TenantUserRepository.findByTenantAndUser(
        tenant.id,
        this.options.currentUser.id,
        {
          ...this.options,
          transaction,
        },
      );

    if (tenantUser) {
      // If found the invited tenant user via email
      // accepts the invitation
      if (tenantUser.status === 'invited') {
        return await TenantUserRepository.acceptInvitation(
          tenantUser.invitationToken,
          {
            ...this.options,
            transaction,
          },
        );
      }

      // In this case the tenant user already exists
      // and it's accepted or with empty permissions
      return;
    }

    return await TenantUserRepository.create(
      tenant,
      this.options.currentUser,
      roles,
      { ...this.options, transaction },
    );
  }

  // In case this user has been invited
  // but havent used the invitation token
  async joinDefaultUsingInvitedEmail(transaction) {
    const tenant = await TenantRepository.findDefault({
      ...this.options,
      transaction,
    });

    if (!tenant) {
      return;
    }

    const tenantUser =
      await TenantUserRepository.findByTenantAndUser(
        tenant.id,
        this.options.currentUser.id,
        {
          ...this.options,
          transaction,
        },
      );

    if (!tenantUser || tenantUser.status !== 'invited') {
      return;
    }

    return await TenantUserRepository.acceptInvitation(
      tenantUser.invitationToken,
      {
        ...this.options,
        transaction,
      },
    );
  }

  async create(data) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      if (getConfig().TENANT_MODE === 'single') {
        const count = await TenantRepository.count(null, {
          ...this.options,
          transaction,
        });

        if (count > 0) {
          throw new Error400(
            this.options.language,
            'tenant.exists',
          );
        }
      }

      let record = await TenantRepository.create(data, {
        ...this.options,
        transaction,
      });

      await SettingsService.findOrCreateDefault({
        ...this.options,
        currentTenant: record,
        transaction,
      });

      await TenantUserRepository.create(
        record,
        this.options.currentUser,
        [Roles.values.admin],
        {
          ...this.options,
          transaction,
        },
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async update(id, data) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      let record = await TenantRepository.findById(id, {
        ...this.options,
        transaction,
        currentTenant: { id },
      });

      new PermissionChecker({
        ...this.options,
        currentTenant: { id },
      }).validateHas(Permissions.values.tenantEdit);

      record = await TenantRepository.update(id, data, {
        ...this.options,
        transaction,
        currentTenant: record,
      });

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async updatePlanUser(
    id,
    planStripeCustomerId,
    planUserId,
  ) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      await TenantRepository.updatePlanUser(
        id,
        planStripeCustomerId,
        planUserId,
        {
          ...this.options,
          transaction,
          currentTenant: { id },
          bypassPermissionValidation: true,
        },
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async updatePlanToFree(planStripeCustomerId) {
    return this.updatePlanStatus(
      planStripeCustomerId,
      Plans.values.free,
      'active',
    );
  }

  async updatePlanStatus(
    planStripeCustomerId,
    plan,
    planStatus,
  ) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      await TenantRepository.updatePlanStatus(
        planStripeCustomerId,
        plan,
        planStatus,
        {
          ...this.options,
          transaction,
          bypassPermissionValidation: true,
        },
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async destroyAll(ids) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      for (const id of ids) {
        const tenant = await TenantRepository.findById(id, {
          ...this.options,
          transaction,
          currentTenant: { id },
        });

        new PermissionChecker({
          ...this.options,
          currentTenant: tenant,
        }).validateHas(Permissions.values.tenantDestroy);

        if (
          !Plans.allowTenantDestroy(
            tenant.plan,
            tenant.planStatus,
          )
        ) {
          throw new Error400(
            this.options.language,
            'tenant.planActive',
          );
        }

        await TenantRepository.destroy(id, {
          ...this.options,
          transaction,
          currentTenant: { id },
        });
      }

      await SequelizeRepository.commitTransaction(
        transaction,
      );
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async findById(id, options?) {
    options = options || {};

    return TenantRepository.findById(id, {
      ...this.options,
      ...options,
    });
  }

  async findByUrl(url, options?) {
    options = options || {};

    return TenantRepository.findByUrl(url, {
      ...this.options,
      ...options,
    });
  }

  async findAllAutocomplete(search, limit) {
    return TenantRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return TenantRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async acceptInvitation(
    token,
    forceAcceptOtherEmail = false,
  ) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      const tenantUser =
        await TenantUserRepository.findByInvitationToken(
          token,
          {
            ...this.options,
            transaction,
          },
        );

      if (!tenantUser || tenantUser.status !== 'invited') {
        throw new Error404();
      }

      const isNotCurrentUserEmail =
        tenantUser.user.id !== this.options.currentUser.id;

      if (!forceAcceptOtherEmail && isNotCurrentUserEmail) {
        throw new Error400(
          this.options.language,
          'tenant.invitation.notSameEmail',
          tenantUser.user.email,
          this.options.currentUser.email,
        );
      }

      await TenantUserRepository.acceptInvitation(token, {
        ...this.options,
        currentTenant: { id: tenantUser.tenant.id },
        transaction,
      });

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return tenantUser.tenant;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      throw error;
    }
  }

  async declineInvitation(token) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      const tenantUser =
        await TenantUserRepository.findByInvitationToken(
          token,
          {
            ...this.options,
            transaction,
          },
        );

      if (!tenantUser || tenantUser.status !== 'invited') {
        throw new Error404();
      }

      await TenantUserRepository.destroy(
        tenantUser.tenant.id,
        this.options.currentUser.id,
        {
          ...this.options,
          transaction,
          currentTenant: { id: tenantUser.tenant.id },
        },
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      throw error;
    }
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await TenantRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
