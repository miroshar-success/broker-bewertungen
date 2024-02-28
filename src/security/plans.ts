import { getConfig } from '../config';

class Plans {
  static get values() {
    return {
      free: 'free',
      growth: 'growth',
      enterprise: 'enterprise',
    };
  }

  static selectPlanByStripePriceId(stripePriceId) {
    const growthStripePriceId =
      getConfig().PLAN_STRIPE_PRICES_GROWTH;
    const enterpriseStripePriceId =
      getConfig().PLAN_STRIPE_PRICES_ENTERPRISE;

    if (growthStripePriceId === stripePriceId) {
      return Plans.values.growth;
    }

    if (enterpriseStripePriceId === stripePriceId) {
      return Plans.values.enterprise;
    }

    return Plans.values.free;
  }

  static selectStripePriceIdByPlan(plan) {
    if (plan === Plans.values.growth) {
      return getConfig().PLAN_STRIPE_PRICES_GROWTH;
    }

    if (plan === Plans.values.enterprise) {
      return getConfig().PLAN_STRIPE_PRICES_ENTERPRISE;
    }

    return null;
  }

  /**
   * When the plan is:
   * - active: The plan will be active.
   * - cancel_at_period_end: The plan will remain active until the end of the period.
   * - error: The plan will remain active, but a warning message will be displayed to the user.
   * - canceled: The workspace plan will change to Free.
   */
  static selectPlanStatus(stripePlan) {
    if (!stripePlan) {
      return 'canceled';
    }

    const { status, cancel_at_period_end } = stripePlan;

    if (status === 'active') {
      if (cancel_at_period_end) {
        return 'cancel_at_period_end';
      }

      return 'active';
    }

    if (
      status === 'canceled' ||
      status === 'incomplete_expired'
    ) {
      return 'canceled';
    }

    return 'error';
  }

  /**
   * If the plan exists and it is not marked
   * to cancel, the tenant can't be destroyed,
   * because future charges might occur
   */
  static allowTenantDestroy(plan, planStatus) {
    if (plan === Plans.values.free) {
      return true;
    }

    return planStatus === 'cancel_at_period_end';
  }
}

export default Plans;
