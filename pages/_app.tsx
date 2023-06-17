import '@/styles/globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import { useEffect, useState } from 'react'

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [isSSR, setIsSSR] = useState(true)
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  if (isSSR) return null

  return (
    <GoogleOAuthProvider clientId={String(process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN)}>
      {getLayout(<Component {...pageProps} />)}
    </GoogleOAuthProvider>
  )
}
