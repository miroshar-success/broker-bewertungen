import { i18n } from 'src/i18n';
import openxEnumerators from 'src/modules/openx/openxEnumerators';

export const openxZoneOptions = openxEnumerators.zone.map(
  (value) => ({
    value,
    label: i18n(`entities.openx.enumerators.zone.${value}`),
  }),
);
