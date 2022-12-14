import { FluidContainer, ButtonOutline, Card } from '@makinox/makinox-ui';
import { Fragment, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { useSheet } from '../../../../common/contexts/sheetContext';

const Hero = () => {
  const { languageKeys, languageTuples, sheetTitles } = useSheet();
  const t = useTranslations();

  const totalData = useMemo(() => {
    const languageValues = Object.values(languageTuples || {});
    const totalTranslationsByLang = languageValues[0] ? Object.values(languageValues[0]).length : 0;

    const totalTranslations: Array<string> = [];
    languageValues.map((languageValue) => {
      const valueKeys = Object.values(languageValue);
      valueKeys.map((value) => totalTranslations.push(value));
    });
    const totalEmptyTranslation = totalTranslations.filter((value) => value && value.length === 0).length;

    return { totalTranslations: totalTranslations.length, totalTranslationsByLang, totalEmptyTranslation };
  }, [languageTuples]);

  return (
    <section className={`flex flex-col ${FluidContainer()}`} style={{ marginTop: '20px' }}>
      <div className="flex justify-around">
        <div>
          <article className={Card()} style={{ margin: '10px 0' }}>
            <div className="card-header">
              <h6 className="headline6">{t('INDEX_HOW_MANY')}</h6>
              <span className="subtitle1">
                {languageKeys[0]?.map((lang, index) => (
                  <Fragment key={index}>
                    <span style={{ margin: '0 2px' }}>{lang}</span>
                  </Fragment>
                ))}
              </span>
            </div>
          </article>

          <article className={Card()} style={{ margin: '10px 0' }}>
            <div className="card-header">
              <h6 className="headline6">{t('INDEX_AVAILABLE')}</h6>
              <span className="subtitle1">
                {sheetTitles.map((titles, index) => (
                  <span key={index} style={{ margin: '0 1px' }}>
                    {titles}
                  </span>
                ))}
              </span>
            </div>
          </article>

          <div className="flex flex-col justify-left">
            {sheetTitles.map((titles) => (
              <Link key={titles} href={`sheet/${titles}`}>
                <button className={ButtonOutline()} style={{ margin: '5px 0' }}>
                  {t('INDEX_GO_TO')} {titles}
                </button>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <article className={Card()} style={{ margin: '10px 0' }}>
            <div className="card-header">
              <h6 className="headline6">{t('INDEX_TOTAL_TRANSLATIONS')}</h6>
              <span className="subtitle1">{totalData.totalTranslations}</span>
            </div>
          </article>
          <article className={Card()} style={{ margin: '10px 0' }}>
            <div className="card-header">
              <h6 className="headline6">{t('INDEX_TOTAL_BY_LANGUAGE')}</h6>
              <span className="subtitle1">{totalData.totalTranslationsByLang}</span>
            </div>
          </article>
          <article className={Card()} style={{ margin: '10px 0' }}>
            <div className="card-header">
              <h6 className="headline6">{t('INDEX_TOTAL_EMPTY')}</h6>
              <span className="subtitle1">{totalData.totalEmptyTranslation}</span>
            </div>
          </article>
          <div className="flex justify-left">
            <Link href="/add">
              <button className={ButtonOutline()}>{t('INDEX_ADD_MORE')}</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
