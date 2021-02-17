import Head from 'next/head'
import '../styles/index.scss'
import '../components/styles/index.scss'

import { useEffect } from 'react'
import UserContextProvider from '../contexts/user-context'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>Ants</title>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css"
                />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <UserContextProvider>
                <Component {...pageProps} />
            </UserContextProvider>
        </>
    )
}

export default MyApp
