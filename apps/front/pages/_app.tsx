import '@makinox/makinox-ui/dist/index.css';
import { NextIntlProvider } from 'next-intl';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
import '../styles/colors.css';
import { SheetProvider } from '../common/contexts/sheetContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <SheetProvider>
        <Component {...pageProps} />
      </SheetProvider>
    </NextIntlProvider>
  );
};

export default MyApp;
