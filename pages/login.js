import { UserContext } from '../contexts/user-context'
import { useContext, useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'

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
        <div className="login">
            <div className="login-left">
                <h1 className="ants">Welcome, Ant.</h1>
            </div>
            <div className="login-right">
                <form>
                    <div className="field">
                        <label className="label">Username:</label>
                        <input
                            className="input"
                            type="text"
                            onChange={(e) => {
                                setErr('')
                                setUsername(e.target.value)
                            }}
                        ></input>
                    </div>

                    <div className="field">
                        <label className="label">Password:</label>
                        <input
                            className="input"
                            type="password"
                            onChange={(e) => {
                                setErr('')
                                setPassword(e.target.value)
                            }}
                        ></input>
                    </div>

                    <label className="label">Account Type</label>
                    <div class="buttons has-addons">
                        <button
                            class={
                                userType === 'user'
                                    ? 'button yellow is-small'
                                    : 'button is-small'
                            }
                            onClick={(e) => {
                                e.preventDefault()
                                setErr('')
                                setUserType('user')
                            }}
                        >
                            Volunteer
                        </button>
                        <button
                            class={
                                userType === 'org'
                                    ? 'button yellow is-small'
                                    : 'button is-small'
                            }
                            onClick={(e) => {
                                e.preventDefault()
                                setErr('')
                                setUserType('org')
                            }}
                        >
                            Organization
                        </button>
                    </div>

                    {err && <p className="error">{err}</p>}

                    <button
                        className="button purple is-rounded"
                        onClick={submit}
                    >
                        Log in
                    </button>
                    <a href="/signup">Don't have an account? Sign up here.</a>
                </form>
            </div>
        </div>
    )
}
