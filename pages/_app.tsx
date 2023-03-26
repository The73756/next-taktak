import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [isSSR, setIsSSR] = useState(true);
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={'' + process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}>
      {getLayout(<Component {...pageProps} />)}
    </GoogleOAuthProvider>
  );
}
