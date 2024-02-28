import { RRule } from 'rrule';

const allWeekdays = [
  RRule.MO,
  RRule.TU,
  RRule.WE,
  RRule.TH,
  RRule.FR,
  RRule.SA,
  RRule.SU,
];

export default class DateTimeUtils {
  static NEVER = 'Never';
  static DAILY = 'Daily';
  static WEEKDAYS = 'Weekdays';
  static WEEKENDS = 'Weekends';
  static WEEKLY = 'Weekly';
  static BIWEEKLY = 'Biweekly';
  static MONTHLY = 'Monthly';
  static EVERY3MONTHS = 'Every 3 Months';
  static EVERY6MONTHS = 'Every 6 Months';
  static ANNUALLY = 'Annually';

  static FREQS = {
    Never: RRule.DAILY,
    Daily: RRule.DAILY,
    Weekdays: RRule.DAILY,
    Weekends: RRule.DAILY,
    Weekly: RRule.WEEKLY,
    Biweekly: RRule.WEEKLY,
    Monthly: RRule.MONTHLY,
    'Every 3 Months': RRule.MONTHLY,
    'Every 6 Months': RRule.MONTHLY,
    Annually: RRule.YEARLY,
  };

  static INTERVALS = {
    Never: 1,
    Daily: 1,
    Weekdays: 1,
    Weekends: 1,
    Weekly: 1,
    Biweekly: 2,
    Monthly: 1,
    'Every 3 Months': 3,
    'Every 6 Months': 6,
    Annually: 1,
  };

  static BYWEEKDAY = {
    Never: allWeekdays,
    Daily: allWeekdays,
    Weekdays: [
      RRule.MO,
      RRule.TU,
      RRule.WE,
      RRule.TH,
      RRule.FR,
    ],
    Weekends: [RRule.SA, RRule.SU],
    Weekly: allWeekdays,
    Biweekly: allWeekdays,
    Monthly: allWeekdays,
    'Every 3 Months': allWeekdays,
    'Every 6 Months': allWeekdays,
    Annually: allWeekdays,
  };

  static RecurrenceDates(repeat, dtstart, count = 10) {
    const rule = new RRule({
      freq: DateTimeUtils.FREQS[repeat],
      interval: DateTimeUtils.INTERVALS[repeat],
      count: repeat === DateTimeUtils.NEVER ? 1 : count,
      dtstart,
    });

    return rule.all();
  }
}

export const sleep = (ms: any) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
