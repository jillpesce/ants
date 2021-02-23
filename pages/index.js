import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/user-context'
import isEmpty from 'lodash/isEmpty'

export default function Home() {
    const { user, userType } = useContext(UserContext)

    useEffect(() => {
        if (userType === 'user') window.location.assign('/user')
        if (userType === 'org') window.location.assign('org')
    }, [userType])

    useEffect(() => {
        if (!user) return window.location.assign('/login')
    }, [user])

    return (
        <div className="loading">
            <p>LOADING...</p>
        </div>
    )
}
