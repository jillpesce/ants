import '../components/styles/Header.css'

import { useEffect } from 'react'
import UserContextProvider from '../contexts/user-context'

function MyApp({ Component, pageProps }) {
    return (
        <UserContextProvider>
            <Component {...pageProps}/>
        </UserContextProvider>
    )
}

export default MyApp
