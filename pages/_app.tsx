import '../styles/globals.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

import type { AppProps } from 'next/app'
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
