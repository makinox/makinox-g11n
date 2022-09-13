import { getEnvData, getInitializedSheet, readSheet, SheetResult } from '@g11n-core/generator';
import { GeneralRestError } from '../../common/types';

export default function getInitialData(_, res) {
  getInitializedSheet()
    .then(async (initializedSheet) => {
      const evnviromentData = getEnvData();
      const sheetTitles = evnviromentData.googleSheetDefaultTitles;
      const { languageKeys, languageTuples } = await readSheet(initializedSheet);

      res.status(200).json({ sheetTitles, languageKeys, languageTuples, error: false });
    })
    .catch(() => res.status(403).json({ message: 'Not found', error: true }));
}

export type GetInitialDataType = {
  sheetTitles: Array<string>;
  languageKeys: string[][];
  languageTuples: SheetResult;
} & Pick<GeneralRestError, 'error'>;

export type GetInitialDataResponse = GetInitialDataType | GeneralRestError;