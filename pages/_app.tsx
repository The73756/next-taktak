import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Header } from '@/modules/Header';
import { Sidebar } from '@/modules/Sidebar';

export default function App({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={'' + process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}>
      <div className="m-auto overflow-hidden xl:w-[1400px]">
        <Header />
        <div className="flex gap-6 md:gap-20">
          <div className="h-[92vh] overflow-hidden xl:overflow-auto">
            <Sidebar />
          </div>
          <div className="videos mt-4 flex h-[88vh] flex-1 flex-col gap-10 overflow-auto">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
