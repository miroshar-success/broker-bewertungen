import ExporterSchema from 'src/modules/shared/exporter/exporterSchema';
import { Excel } from 'src/modules/shared/excel/excel';
import mapKeys from 'lodash/mapKeys';

export default class Exporter {
  schema: ExporterSchema;
  excelFileName: string;

  constructor(fields, excelFileName) {
    this.schema = new ExporterSchema(fields);
    this.excelFileName = excelFileName;
  }

  transformAndExportAsExcelFile(rows) {
    const exportableData = rows.map((row) => {
      const rowCasted = this.schema.cast(row);
      return this._makeNameHeadersIntoLabels(rowCasted);
    });

    return Excel.exportAsExcelFile(
      exportableData,
      this.schema.labels,
      this.excelFileName + '_' + new Date().getTime(),
    );
  }

  _makeNameHeadersIntoLabels(row) {
    return mapKeys(row, (value, key) => {
      return this.schema.labelOf(key);
    });
  }
}
