import { UserContext } from '../contexts/user-context'
import { useContext, useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import styles from './styles/Login.module.css'

export default function Login() {
    const { user, login } = useContext(UserContext)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [userType, setUserType] = useState()
    const [err, setErr] = useState()

    useEffect(() => {
        if (!isEmpty(user)) window.location.assign('/')
    }, [user])

    async function submit(e) {
        e.preventDefault()
        if (!username) {
            setErr('Please enter your username')
        } else if (!password) {
            setErr('Please enter your password')
        } else if (!userType) {
            setErr('Please choose account type')
        } else {
            const resp = await fetch(
                'https://ants-senior-design.herokuapp.com/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        password,
                        userType,
                    }),
                }
            )
            const { account, err } = await resp.json()
            if (err) {
                console.log('Error logging in', err)
                setErr(err.message)
            } else {
                login(userType, account._id, true)
            }
        }
    }

    return (
        <div>
            <h1 className={styles.ants}>Welcome to Ants!</h1>
            <h3>Log In</h3>
            <a href="/signup">Don't have an account? Sign up here.</a>
            <br />
            <br />
            <form>
                <label>Username:</label>
                <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                <br />
                <br />
                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <br />
                <br />
                <label>Account Type</label>
                <br />
                <input
                    type="radio"
                    id="user"
                    name="account"
                    value="user"
                    onChange={() => setUserType('user')}
                />
                <label>User</label>
                <br />
                <input
                    type="radio"
                    id="org"
                    name="account"
                    value="org"
                    onChange={() => setUserType('org')}
                />
                <label>Organization</label>
                <br />
                <br />
                {err && (
                    <>
                        <p>{err}</p>
                        <br />
                    </>
                )}
                <button onClick={(e) => submit(e)}>Log in</button>
            </form>
        </div>
    )
}
