import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Head from "next/head";
import {RecoilRoot} from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
    const [isSSR, setIsSSR] = useState(true);

    useEffect(() => {
        setIsSSR(false);
    }, []);

    if (isSSR) return null;

  return (
      <>
          {/*<Head>*/}
          {/*    <title>Instagram | Dontrell Dev</title>*/}
          {/*    <link rel="icon" href="/favicon.ico" />*/}
          {/*</Head>*/}


          <Head>
              <title>Instagram | Dontrell Dev</title>
              <link rel="shortcut icon" href="/favicon.png" />
              <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
              <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png"/>
              <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png"/>
          </Head>

          <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
              <RecoilRoot>
                  <Component {...pageProps} />
              </RecoilRoot>
          </GoogleOAuthProvider>
      </>


  )
}

export default MyApp;
