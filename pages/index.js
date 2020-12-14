import Head from 'next/head'
import { useContext, useEffect } from 'react'
import { UserContext } from '../contexts/user-context'
import isEmpty from 'lodash/isEmpty'

export default function Home() {
    const { user, userType, logout, fetching } = useContext(UserContext)

    useEffect(() => {
        if (!fetching && isEmpty(user)) window.location.assign('/login')
    }, [])

    return (
        <div>
            <h1>Home page</h1>
            <p> Welcome {userType}, {user.username} </p>
            <button onClick={logout}>Log out</button>
        </div>
    )
}
