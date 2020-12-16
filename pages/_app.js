import './styles/App.css'

import 'bootstrap/dist/css/bootstrap.css'


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
