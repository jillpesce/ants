import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'

export const UserContext = createContext()

const UserContextProvider = (props) => {
    const [user, setUser] = useState({})
    const [userType, setUserType] = useState()
    const router = useRouter()

    useEffect(() => {
        const uid = localStorage.getItem('uid')
        if (!uid) {
            setUser(null)
        } else if (isEmpty(user)) {
            async function callLoginAsync(uid) {
                const utype = localStorage.getItem('utype')
                await login(utype, uid)
            }
            callLoginAsync(uid)
        }
    }, [])

    function updateUser(u) {
        setUser(u)
    }

    async function login(userType, uid, redirect) {
        if (user && user._id === uid) return
        localStorage.setItem('uid', uid)
        localStorage.setItem('utype', userType)
        const fetchPath = userType == 'user' ? `users/${uid}` : `orgs/${uid}`
        await fetch(`https://ants-senior-design.herokuapp.com/${fetchPath}`)
            .then((resp) => resp.json())
            .then(({ account, err }) => {
                if (err) {
                    console.log('Error getting account', err)
                } else {
                    setUser(account)
                    setUserType(userType)
                    if (redirect) {
                        if (
                            !account.interests.length &&
                            !account.locations.length
                        )
                            router.push('/update')
                        else router.push('/')
                    }
                }
            })
            .catch((err) => {
                console.log('Error logging in', err)
            })
    }

    function logout() {
        setUser({})
        setUserType('')
        localStorage.removeItem('uid')
        localStorage.removeItem('utype')
        router.push('/login')
    }

    return (
        <UserContext.Provider
            value={{ user, userType, updateUser, login, logout }}
        >
            {props.children}
        </UserContext.Provider>
    )
}
export default UserContextProvider
