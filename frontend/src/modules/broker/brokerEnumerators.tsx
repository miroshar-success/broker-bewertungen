const brokerEnumerators = {
  upside: {
    type: ['UPSIDE', 'DOWNSIDE'],
  },
  meta: {
    broker_type: [
      'DMA',
      'ECN',
      'ECN_AND_MT4',
      'MM',
      'MM_AND_MT4',
      'MARKET_MAKER_AND_STP',
      'MT4',
      'STP',
      'STP_AND_MT4',
      'BITCOIN_EXCHANGE',
    ],
    withholding_tax: [
      'WITHHOLDING_TAX_1',
      'WITHHOLDING_TAX_2',
    ],
  },
  checkbox: {
    image_type: ['NONE', 'PRO', 'CONTRA'],
  },
  order_type: {
    type: [
      'Fill Or Kill (FOK)',
      'Limit Buy',
      'Limit Order',
      'Limit Sell',
      'Market Order',
      'One Cancels Other (OCO)',
      'Stop Buy',
      'Stop Sell',
      'Stoploss',
      'Stoploss (garantiert)',
      'Take Profit',
      'Trailing Stop',
    ],
  },
  minimum_trading_unit: {
    minimum_trading_unit: [
      'Mini-Lots (0,1 Lot)',
      'Micro-Lots (0,01 Lot)',
    ],
  },
};

export default brokerEnumerators;
