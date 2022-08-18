import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { GoogleOAuthProvider } from '@react-oauth/google';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
        <Component {...pageProps} />
      </GoogleOAuthProvider>
  )
}

export default MyApp
