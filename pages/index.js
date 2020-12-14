import Head from 'next/head'
import { useContext, useEffect } from 'react'
import { UserContext } from '../contexts/user-context'
import isEmpty from 'lodash/isEmpty'

export default function Home() {
    const { user, userType, logout } = useContext(UserContext)

    useEffect(() => {
        if (!user) window.location.assign('/login')
    })

    if (!user) return (<div/>)

    return (
        <div>
            <h1>Home page</h1>
            <p> Welcome {userType}, {user.username} </p>
            <button onClick={logout}>Log out</button>
        </div>
    )
}
