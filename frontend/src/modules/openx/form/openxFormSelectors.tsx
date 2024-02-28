import { createSelector } from 'reselect';

const selectRaw = (state) => state.openx.form;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);
const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const openxFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectRecord,
  selectRaw,
};

export default openxFormSelectors;
