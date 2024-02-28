import { DataTypes } from 'sequelize';
import BrokerCheckboxRepository from '../repositories/brokerCheckboxRepository';
import SequelizeArrayUtils from '../utils/sequelizeArrayUtils';
import SequelizeUtils from '../utils/sequelizeUtils';

export default function (sequelize) {
  const broker_checkbox = sequelize.define(
    'broker_checkbox',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: false,
        primaryKey: true,
      },
      trade_platform: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'trade_platform',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_trade_platform: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_trade_platform',
            ),
          );
        },
      },
      free_demo_account: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'free_demo_account',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_free_demo_account: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_free_demo_account',
            ),
          );
        },
      },
      metatrader_4: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'metatrader_4',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_metatrader_4: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(this, 'text_metatrader_4'),
          );
        },
      },
      metatrader_5: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'metatrader_5',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_metatrader_5: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(this, 'text_metatrader_5'),
          );
        },
      },
      web_platform: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'web_platform',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_web_platform: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(this, 'text_web_platform'),
          );
        },
      },
      mobile_trading_apps: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'mobile_trading_apps',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_mobile_trading_apps: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_mobile_trading_apps',
            ),
          );
        },
      },
      hedging_allowed: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'hedging_allowed',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_hedging_allowed: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_hedging_allowed',
            ),
          );
        },
      },
      additional_trade_tools: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'additional_trade_tools',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_additional_trade_tools: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_additional_trade_tools',
            ),
          );
        },
      },
      automated_trade_possible: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'automated_trade_possible',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_automated_trade_possible: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_automated_trade_possible',
            ),
          );
        },
      },
      api_interfaces: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'api_interfaces',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_api_interfaces: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_api_interfaces',
            ),
          );
        },
      },
      social_trading: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'social_trading',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_social_trading: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_social_trading',
            ),
          );
        },
      },
      rate_alarms: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'rate_alarms',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_rate_alarms: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(this, 'text_rate_alarms'),
          );
        },
      },
      platform_tutorials: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'platform_tutorials',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_platform_tutorials: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_platform_tutorials',
            ),
          );
        },
      },
      layout_saveable: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'layout_saveable',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_layout_saveable: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_layout_saveable',
            ),
          );
        },
      },
      one_click_trading: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'one_click_trading',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_one_click_trading: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_one_click_trading',
            ),
          );
        },
      },
      trade_from_chart: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'trade_from_chart',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_trade_from_chart: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_trade_from_chart',
            ),
          );
        },
      },
      all_positions_closeable: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'all_positions_closeable',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_all_positions_closeable: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_all_positions_closeable',
            ),
          );
        },
      },
      guaranteed_stops: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'guaranteed_stops',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_guaranteed_stops: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_guaranteed_stops',
            ),
          );
        },
      },
      phone_trade_possible: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'phone_trade_possible',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_phone_trade_possible: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_phone_trade_possible',
            ),
          );
        },
      },
      commissions: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'commissions',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_commissions: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(this, 'text_commissions'),
          );
        },
      },
      important_market_spreads: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'important_market_spreads',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_important_market_spreads: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_important_market_spreads',
            ),
          );
        },
      },
      cost_for_overnight: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'cost_for_overnight',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_cost_for_overnight: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_cost_for_overnight',
            ),
          );
        },
      },
      fees_for_deposit_disbursal: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'fees_for_deposit_disbursal',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_fees_for_deposit_disbursal: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_fees_for_deposit_disbursal',
            ),
          );
        },
      },
      free_orderchange: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'free_orderchange',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_free_orderchange: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_free_orderchange',
            ),
          );
        },
      },
      free_depot: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'free_depot',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_free_depot: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(this, 'text_free_depot'),
          );
        },
      },
      no_platform_fees: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'no_platform_fees',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_no_platform_fees: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_no_platform_fees',
            ),
          );
        },
      },
      german_support: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'german_support',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_german_support: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_german_support',
            ),
          );
        },
      },
      contact: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'contact',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_contact: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(this, 'text_contact'),
          );
        },
      },
      daily_trade_help: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'daily_trade_help',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_daily_trade_help: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_daily_trade_help',
            ),
          );
        },
      },
      german_webinar: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'german_webinar',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_german_webinar: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_german_webinar',
            ),
          );
        },
      },
      german_seminar: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'german_seminar',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_german_seminar: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_german_seminar',
            ),
          );
        },
      },
      coachings_available: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'coachings_available',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_coachings_available: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_coachings_available',
            ),
          );
        },
      },
      knowledge_base: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'knowledge_base',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_knowledge_base: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_knowledge_base',
            ),
          );
        },
      },
      tradeable_markets: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'tradeable_markets',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_tradeable_markets: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_tradeable_markets',
            ),
          );
        },
      },
      margin: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'margin',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_margin: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(this, 'text_margin'),
          );
        },
      },
      managed_accounts: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'managed_accounts',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_managed_accounts: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_managed_accounts',
            ),
          );
        },
      },
      instant_execution: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'instant_execution',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_instant_execution: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_instant_execution',
            ),
          );
        },
      },
      positive_slippage_possible: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'positive_slippage_possible',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_positive_slippage_possible: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_positive_slippage_possible',
            ),
          );
        },
      },
      ecn_order_execution: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'ecn_order_execution',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_ecn_order_execution: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_ecn_order_execution',
            ),
          );
        },
      },
      liquidity_prodiver: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'liquidity_prodiver',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_liquidity_prodiver: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_liquidity_prodiver',
            ),
          );
        },
      },
      micro_lots: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'micro_lots',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_micro_lots: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(this, 'text_micro_lots'),
          );
        },
      },
      index_cfd_tradeable_below_point: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'index_cfd_tradeable_below_point',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_index_cfd_tradeable_below_point: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_index_cfd_tradeable_below_point',
            ),
          );
        },
      },
      rate_switch_24_5_index_cfd: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'rate_switch_24_5_index_cfd',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_rate_switch_24_5_index_cfd: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_rate_switch_24_5_index_cfd',
            ),
          );
        },
      },
      no_financial_cost_index_cfd: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'no_financial_cost_index_cfd',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_no_financial_cost_index_cfd: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_no_financial_cost_index_cfd',
            ),
          );
        },
      },
      no_financial_cost_raw_material_cfd: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'no_financial_cost_raw_material_cfd',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_no_financial_cost_raw_material_cfd: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_no_financial_cost_raw_material_cfd',
            ),
          );
        },
      },
      cfd_contracts_automatic_roll: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'cfd_contracts_automatic_roll',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_cfd_contracts_automatic_roll: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_cfd_contracts_automatic_roll',
            ),
          );
        },
      },
      real_stocks_cfd_spreads: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'real_stocks_cfd_spreads',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_real_stocks_cfd_spreads: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_real_stocks_cfd_spreads',
            ),
          );
        },
      },
      dma_stocks: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'dma_stocks',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_dma_stocks: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(this, 'text_dma_stocks'),
          );
        },
      },
      minimal_ordersize_stocks: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'minimal_ordersize_stocks',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_minimal_ordersize_stocks: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_minimal_ordersize_stocks',
            ),
          );
        },
      },
      company: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'company',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_company: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(this, 'text_company'),
          );
        },
      },
      office_in_germany: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'office_in_germany',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_office_in_germany: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_office_in_germany',
            ),
          );
        },
      },
      bonus: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'bonus',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_bonus: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(this, 'text_bonus'),
          );
        },
      },
      regulation_and_deposit_security: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'regulation_and_deposit_security',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_regulation_and_deposit_security: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_regulation_and_deposit_security',
            ),
          );
        },
      },
      reserve_liabiliry: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'reserve_liabiliry',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_reserve_liabiliry: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_reserve_liabiliry',
            ),
          );
        },
      },
      interest_on_deposit: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'interest_on_deposit',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_interest_on_deposit: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_interest_on_deposit',
            ),
          );
        },
      },
      witholding_tax: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'witholding_tax',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_witholding_tax: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_witholding_tax',
            ),
          );
        },
      },
      segregated_accounts: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'segregated_accounts',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_segregated_accounts: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_segregated_accounts',
            ),
          );
        },
      },
      account_currencies: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'account_currencies',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_account_currencies: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_account_currencies',
            ),
          );
        },
      },
      posibilities_for_withdrawals: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'posibilities_for_withdrawals',
            BrokerCheckboxRepository.IMAGE_TYPES,
          );
        },
      },
      text_posibilities_for_withdrawals: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          return BrokerCheckboxRepository._textToArray(
            SequelizeUtils.value(
              this,
              'text_posibilities_for_withdrawals',
            ),
          );
        },
      },
      ip: {
        type: DataTypes.CHAR(39),
        allowNull: false,
        validate: {
          len: [0, 39],
        },
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      modified: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      indexes: [],
      underscored: true,
      timestamps: false,
    },
  );

  broker_checkbox.associate = (models) => {
    models.broker_checkbox.belongsTo(models.broker, {
      as: 'broker',
      constraints: true,
      foreignKey: 'id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };

  return broker_checkbox;
}
