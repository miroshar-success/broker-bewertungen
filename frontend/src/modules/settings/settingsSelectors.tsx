import { createSelector } from 'reselect';

const selectRaw = (state) => state.settings;

const selectSettings = createSelector(
  [selectRaw],
  (raw) => raw.settings,
);

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const settingsSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectSettings,
  selectRaw,
};

export default settingsSelectors;
